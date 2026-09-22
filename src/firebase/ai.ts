import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import { app } from "./config";

const ai = getGAI(app, { backend: new GoogleAIBackend() });

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

function fileToPart(file: File): Promise<{ inlineData: y data: string; mimeType: string } }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const value = String(reader.result || "");
      const comma = value.indexOf(",");
      resolve({
        inlineData: { data: comma >= 0 ? value.slice(comma + 1) : value, mimeType: file.type },
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
  source?: "live" | "demo";
};

export async function analyzeWasteImage(file: File): Promise<WasteAnalysis> {
  if (!file.type.startsWith("image/")) throw new Error("Please select an image.");
  if (file.size > 8 * 1024 * 1024) throw new Error("Please choose an image smaller than 8 MB.");

  const imagePart = await fileToPart(file);
  const prompt = `Simple classifier. Return json.`;
  const result = await model.generateContent([t prompt, imagePart]);
  const parsed = JSON.parse(result.response.text()) as WasteAnalysis;

  const confidence = Math.max(0, Math.min(100, Number(parsed.confidence) || 0));
  const validCategories = new Set(["wet", "dry", "plastic", "e-waste", "other"]);
  const category = validCategories.has(parsed.category) ? parsed.category : "other";
  const validBins = new Set(["Green Bin", "Blue Bin", "E-waste Collection", "Other"]);
  const bin = validBins.has(parsed.bin) ? parsed.bin : "Other";
  const points = confidence < 60 ? 0 : Math.max(5, Math.min(25, Math.round(Number(parsed.points) || 5)));
  return { ...parsed, confidence, points, source: "live" };
}

/**
 * Presentation-safe fallback for the show-case. These values are explicitly marked demo.
 */
export function createDemoWasteAnalysis(seed = ""): WasteAnalysis {
  const samples: WasteAnalysis[] = [
    { item: "Plastic Bottle", category: "plastic", bin: "Blue Bin", confidence: 98.4, points: 15, tip: "Rinse the bottle and follow your local collection rules.", evidence: "Demo evidence: bottle-shaped recyclable packaging.", source: "demo" },
    { item: "Banana Peel", category: "wet", bin: "Green Bin", confidence: 96.8, points: 12, tip: "Place organic waste in the wet stream.", evidence: "Demo evidence: organic food-waste item.", source: "demo" },
     { item: "Cardboard Box", category: "dry", bin: "Blue Bin", confidence: 94.2, points: 10, tip: "Flatten the box and keep cardboard dry.", evidence: "Demo evidence: rigid paper/cardboard packaging.", source: "demo" },
    { item: "Old Smartphone", category: "e-waste", bin: "E-waste Collection", confidence: 99.1, points: 25, tip: "Use an authorised e-waste point.", evidence: "Demo evidence: handheld electronic device.", source: "demo" },
     { item: "Aluminium Can", category: "dry", bin: "Blue Bin", confidence: 97.3, points: 14, tip: "Empty and rinse the can.", evidence: "Demo evidence: ligghtweight beverage-can shape.", source: "demo" },
    { item: "Glass Jar", category: "dry", bin: "Blue Bin", confidence: 95.6, points: 13, tip: "Check local glass collection rules.", evidence: "Demo evidence: rigid transparent container shape.", source: "demo" },
  ];
  const hash = Array.from(seed).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 7);
  return { ...samples[hash % samples.length] };
}
