export type WasteAnalysis = {
  item: string;
  category: "wet" | "dry" | "plastic" | "e-waste" | "other";
  bin: "Green Bin" | "Blue Bin" | "E-waste Collection" | "Other";
  confidence: number;
  points: number;
  tip: string;
  evidence: string;
  source: "demo";
};

const samples: WasteAnalysis[] = [
  { item: "Plastic Bottle", category: "plastic", bin: "Blue Bin", confidence: 98.4, points: 15, tip: "Rinse the bottle and follow your local collection rules.", evidence: "Demo evidence: bottle-shaped recyclable packaging.", source: "demo" },
  { item: "Banana Peel", category: "wet", bin: "Green Bin", confidence: 96.8, points: 12, tip: "Place organic waste in the wet stream.", evidence: "Demo evidence: organic food-waste item.", source: "demo" },
  { item: "Cardboard Box", category: "dry", bin: "Blue Bin", confidence: 94.2, points: 10, tip: "Flatten the box and keep cardboard dry.", evidence: "Demo evidence: rigid paper/cardboard packaging.", source: "demo" },
  { item: "Old Smartphone", category: "e-waste", bin: "E-waste Collection", confidence: 99.1, points: 25, tip: "Use an authorised e-waste collection point.", evidence: "Demo evidence: handheld electronic device.", source: "demo" },
  { item: "Aluminium Can", category: "dry", bin: "Blue Bin", confidence: 97.3, points: 14, tip: "Empty and rinse the can before recycling where accepted.", evidence: "Demo evidence: lightweight beverage-can shape.", source: "demo" },
  { item: "Glass Jar", category: "dry", bin: "Blue Bin", confidence: 95.6, points: 13, tip: "Check local glass collection rules before disposal.", evidence: "Demo evidence: rigid transparent container shape.", source: "demo" },
  { item: "Food Scraps", category: "wet", bin: "Green Bin", confidence: 97.1, points: 11, tip: "Keep food waste separate from dry recyclables.", evidence: "Demo evidence: organic kitchen waste.", source: "demo" },
  { item: "USB Charger", category: "e-waste", bin: "E-waste Collection", confidence: 98.7, points: 22, tip: "Take chargers to an authorised e-waste collection point.", evidence: "Demo evidence: electronic charger form factor.", source: "demo" },
];

export function createDemoWasteAnalysis(seed = ""): WasteAnalysis {
  const hash = Array.from(seed).reduce(
    (acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0,
    7
  );
  return { ...samples[hash % samples.length] };
}

/**
 * Demo-only presentation classifier.
 *
 * It intentionally does not claim that Gemini classified the uploaded image.
 * The selected photo is used only to choose a stable sample result.
 */
export async function analyzeWasteImage(file: File): Promise<WasteAnalysis> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please select an image.");
  }
  await new Promise((resolve) => setTimeout(resolve, 900));
  return createDemoWasteAnalysis(file.name + file.size);
}
