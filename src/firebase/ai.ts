import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import { app } from "./config";

const ai = getAI(app, { backend: new GoogleAIBackend() });

const responseSchema = {
  type: "object",
  properties: {
    item: { type: "string" },
    category: { type: "string", enum: ["wet", "dry", "plastic", "e-waste", "other"] },
    bin: { type: "string", enum: ["Green Bin", "Blue Bin", "E-waste Collection", "Other"] },
    confidence: { type: "number" },
    points: { type: "integer" },
    tip: { type: "string" },
    evidence: { type: "string" },
  },
  required: ["item", "category", "bin", "confidence", "points", "tip", "evidence"],
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
        inlineData: { data: comma >= 0 ? value.slice(comma + 1) : value, mimeType: file.type || "image/jpeg" },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export type WasteAnalysis = {
  item: string;
  category: "wet" | "dry" | "plastic" | "e-waste" | "other";
  bin: "Green Bin" | "Blue Bin" | "E-waste Collection" | "Other";
  confidence: number;
  points: number;
  tip: string;
  evidence: string;
};

export async function analyzeWasteImage(file: File): Promise<WasteAnalysis> {
  if (!file.type.startsWith("image/")) throw new Error("Please select an image.");
  if (file.size > 8 * 1024 * 1024) throw new Error("Please choose an image smaller than 8 MB.");

  const imagePart = await fileToPart(file);
  const prompt = `You are a waste-image classifier, not a general chatbot.
Only classify what is visually supported by the supplied image.

Rules:
1. Never invent an object that is not visibly present.
2. If the image is blurry, empty, too dark, contains no clear waste item, or you cannot confidently identify the item, return item "Unclear image", category "other", bin "Other", confidence <= 35, points 0, and a short explanation.
3. Do not use general world knowledge to claim an exact material when the image cannot establish it.
4. Confidence is your visual confidence, 0-100. It is not a probability guarantee.
5. Points must be 0 when confidence is below 60; otherwise use 5-25.
6. Evidence must describe only visible evidence, for example "transparent bottle-shaped container with cap".
7. Give conservative disposal advice. If local rules may differ, say so.

Classify into exactly one category:
wet = food/organic
dry = paper/cardboard/general dry waste
plastic = visibly plastic packaging/bottles
e-waste = visibly electronic devices, batteries, chargers or cables
other = unclear/non-waste/not safely classifiable

Return JSON matching the schema only.`;

  const result = await model.generateContent([prompt, imagePart]);
  const parsed = JSON.parse(result.response.text()) as WasteAnalysis;

  const confidence = Math.max(0, Math.min(100, Number(parsed.confidence) || 0));
  const validCategories = new Set(["wet", "dry", "plastic", "e-waste", "other"]);
  const category = validCategories.has(parsed.category) ? parsed.category : "other";
  const validBins = new Set(["Green Bin", "Blue Bin", "E-waste Collection", "Other"]);
  const bin = validBins.has(parsed.bin) ? parsed.bin : "Other";
  const points = confidence < 60 ? 0 : Math.max(5, Math.min(25, Math.round(Number(parsed.points) || 5)));

  if (confidence < 60 || category === "other") {
    return {
      item: "Unclear image",
      category: "other",
      bin: "Other",
      confidence,
      points: 0,
      tip: "Please retake the photo with the waste item clearly visible. Check local collection guidance before disposal.",
      evidence: parsed.evidence || "The image does not provide enough reliable visual evidence.",
    };
  }

  return {
    item: parsed.item || "Unclear item",
    category,
    bin,
    confidence,
    points,
    tip: parsed.tip || "Follow local waste collection guidance.",
    evidence: parsed.evidence || "Visual evidence recorded by the classifier.",
  };
}
