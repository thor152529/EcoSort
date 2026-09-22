import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import { app } from "./config";

const ai = getAI(app, { backend: new GoogleAIBackend() });

const responseSchema = {
  type: "object",
  properties: {
    item: { type: "string" },
    category: { type: "string", enum: ["wet", "dry", "plastic", "e-waste", "other"] },
    bin: { type: "string" },
    confidence: { type: "number" },
    points: { type: "number" },
    tip: { type: "string" },
  },
  required: ["item", "category", "bin", "confidence", "points", "tip"],
};

const model = getGenerativeModel(ai, {
  model: "gemini-3.8-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema,
  },
});

function fileToPart(file: File): Promise<{ inlineData: { data: string; mimeType: string } }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const value = String(reader.result || "");
      const comma = value.indexOf(",");
      resolve({
        inlineData: {
          data: comma >= 0 ? value.slice(comma + 1) : value,
          mimeType: file.type || "image/jpeg",
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export type WasteAnalysis = {
  item: string;
  category: "wet" | "dry" | "plastic" | "e-waste" | "other";
  bin: string;
  confidence: number;
  points: number;
  tip: string;
};

export async function analyzeWasteImage(file: File): Promise<WasteAnalysis> {
  if (!file.type.startsWith("image/")) throw new Error("Please select an image.");
  if (file.size > 8 * 1024 * 1024) throw new Error("Please choose an image smaller than 8 MB.");

  const imagePart = await fileToPart(file);
  const prompt = `You are EcoSort, an AI waste-segregation assistant for India.
Analyze the supplied waste image and return ONLY the requested JSON schema.

Choose exactly one category:
wet = food or organic waste
dry = paper, cardboard or general dry waste
plastic = plastic packaging or bottles
e-waste = electronics, batteries, chargers, phones or cables
other = unclear or none of the above

Use a practical bin recommendation such as Green Bin, Blue Bin, E-waste Collection, or Other.
Confidence must be a number from 0 to 100.
Points must be an integer from 5 to 25 based on the category and confidence.
The tip must be a short, safe disposal instruction.
If the image is unclear, use category "other" and explain that the item should be checked locally.`;

  const result = await model.generateContent([prompt, imagePart]);
  const parsed = JSON.parse(result.response.text()) as WasteAnalysis;

  return {
    item: parsed.item || "Unknown item",
    category: parsed.category || "other",
    bin: parsed.bin || "Check local collection",
    confidence: Math.max(0, Math.min(100, Number(parsed.confidence) || 0)),
    points: Math.max(5, Math.min(25, Math.round(Number(parsed.points) || 5))),
    tip: parsed.tip || "Follow your local waste collection guidance.",
  };
}
