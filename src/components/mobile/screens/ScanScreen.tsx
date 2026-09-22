import { useRef, useState } from "react";
import { StatusBar } from "../StatusBar";
import { BottomNav } from "../BottomNav";
import { Image as ImageIcon, ScanLine, Sparkles, CheckCircle2, Loader2, Camera, RotateCcw, ShieldCheck, History, Award, Recycle, ChevronRight } from "lucide-react";
import { ensureAuthenticatedUser } from "@/firebase/auth";
import { saveWasteScan } from "@/firebase/firestore";
import { analyzeWasteImage, createDemoWasteAnalysis, type WasteAnalysis } from "@/firebase/ai";
import { toast } from "sonner";

type HistoryItem = WasteAnalysis & { at: string };
const HISTORY_KEY = "ecosort-demo-history";

function readHistory(): HistoryItem[] {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); } catch { return []; }
}

function categoryTone(category: WasteAnalysis["category"]) {
  if (category === "plastic") return "bg-plastic/10 text-plastic";
  if (category === "wet") return "bg-wet/10 text-wet";
  if (category === "e-waste") return "bg-ewaste/10 text-ewaste";
  return "bg-dry/10 text-dry";
}

export function ScanScreen() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [analysis, setAnalysis] = useState<WasteAnalysis | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(readHistory);
  const [status, setStatus] = useState("Ready to scan");
  const [demoItem, setDemoItem] = useState("Plastic Bottle");

  const handleImage = async (file?: File) => {
    if (!file || saving) return;
    setSaving(true); setSaved(false); setAnalysis(null); setStatus("Analyzing image...");
    setPreview(URL.createObjectURL(file));

    try {
      const result: WasteAnalysis = await analyzeWasteImage(file);

      setAnalysis(result);

      try {
        const user = await ensureAuthenticatedUser();
        await saveWasteScan(user.uid, result.item, result.points, result.bin, result.confidence / 100);
        setStatus("Saved to Firebase");
      } catch (error) {
        console.warn("Firebase save unavailable; storing demo history locally.", error);
        const item = { ...result, at: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
        const next = [item, ...history].slice(0, 5);
        setHistory(next);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
        setStatus("Saved locally for demo");
      }

      setSaved(true);
      toast.success((result.source === "demo" ? "Demo result" : "AI result") + ": " + result.item + " • +" + result.points + " Eco Points");
    } catch (error) {
      console.error(error);
      setStatus("Scan failed");
      toast.error(error instanceof Error ? error.message : "Scan failed.");
    } finally {
      setSaving(false);
    }
  };

  const reset = () => {
    setAnalysis(null); setPreview(null); setSaved(false); setStatus("Ready to scan");
  };

  return (
    <div className="relative min-h-full bg-gradient-to-b from-foreground via-foreground to-primary/90 text-primary-foreground pb-24 overflow-y-auto">
      <StatusBar dark />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        capture="environment"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          void handleImage(file);
          event.currentTarget.value = "";
        }}
      />

      <div className="px-5 pt-3 pb-2 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5"><Sparkles className="h-3 w-3 text-accent" /><p className="text-[10px] opacity-80 uppercase tracking-[0.16em] font-bold">EcoSort AI</p></div>
          <h2 className="text-xl font-bold font-display">Smart Waste Scanner</h2>
          <p className="text-[10px] opacity-60 mt-0.5">Scan • classify • dispose • earn</p>
        </div>
        <button type="button" onClick={toggleDemo} className="flex flex-col items-center gap-0.5 rounded-xl bg-primary-foreground/10 border border-primary-foreground/15 px-2.5 py-2 backdrop-blur">
          <Zap className="h-3.5 w-3.5 text-accent" />
          <span className="text-[8px] font-bold">${demoMode ? "DEMO" : "LIVE"}</span>
        </button>
      </div>

      <div className="mx-5 mt-2 rounded-2xl bg-accent/10 border border-accent/20 px-3 py-2.5 flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-accent flex-shrink-0" />
        <div>
          <p className="text-[10px] font-bold">Working Demo Mode</p>
          <p className="text-[9px] opacity-65 leading-snug">The uploaded photo is displayed, and the selected scenario controls the demo result. Live image AI is not enabled yet.</p>
        </div>
      </div>

      <div className="mx-5 mt-3 relative aspect-[3/4] max-h-[390px] rounded-[2rem] overflow-hidden bg-foreground/60 border border-primary-foreground/20 shadow-premium">
        {preview ? <img src={preview} alt="Selected waste" className="absolute inset-0 h-full w-full object-cover opacity-70" /> : <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-foreground/50 to-accent/20" />}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-foreground/20" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          {!preview && <div className="h-28 w-28 rounded-[2rem] bg-accent/15 backdrop-blur-md border-2 border-accent/80 flex items-center justify-center text-5xl shadow-glow animate-float">♻️</div>}
          {preview && saving && <Loader2 className="h-12 w-12 text-accent animate-spin" />}
        </div>
        {saving && <div className="absolute left-4 right-4 top-1/2 h-0.5 bg-accent shadow-glow animate-scan rounded-full" />}
        <div className="absolute left-3 right-3 bottom-3 flex items-center gap-2 bg-foreground/75 backdrop-blur-xl rounded-xl px-3 py-2.5 border border-primary-foreground/10">
          {saving ? <Loader2 className="h-3.5 w-3.5 text-accent animate-spin" /> : saved ? <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> : <ScanLine className="h-3.5 w-3.5 text-accent" />}
          <span className="text-[10px] font-semibold">{status}</span>
          <span className="ml-auto text-[9px] font-mono text-accent">{analysis ? (analysis.source === "demo" ? "DEMO SCENARIO" : analysis.confidence.toFixed(1) + "% confidence") : "READY"}</span>
        </div>
      </div>

      {analysis && (
        <div className="mx-5 mt-3 rounded-[1.5rem] bg-card text-foreground shadow-premium border border-border overflow-hidden animate-fade-in-up">
          <div className="bg-gradient-primary text-primary-foreground p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="h-3 w-3 text-accent" />
                  <p className="text-[9px] uppercase tracking-[0.16em] opacity-75 font-bold">AI Detection</p>
                  <span className="px-1.5 py-0.5 rounded-full bg-primary-foreground/15 text-[8px] font-bold">${analysis.source === "demo" ? "DEMO RESULT" : "LIVE"}</span>
                </div>
                <p className="text-xl font-bold font-display">{analysis.item}</p>
                <p className="text-[10px] opacity-75 mt-0.5">Visual classification • {analysis.category}</p>
              </div>
              <div className="text-right"><p className="text-3xl font-bold font-display text-accent">+{analysis.points}</p><p className="text-[9px] opacity-75">Eco Points</p></div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-2xl bg-secondary/60 border border-border p-3"><p className="text-[9px] uppercase tracking-wider text-muted-foreground">Category</p><p className={`mt-1 inline-flex px-2 py-1 rounded-lg text-[10px] font-bold capitalize ${categoryTone(analysis.category)}`}>{analysis.category}</p></div>
              <div className="rounded-2xl bg-secondary/60 border border-border p-3"><p className="text-[9px] uppercase tracking-wider text-muted-foreground">Dispose in</p><p className="mt-1 text-sm font-bold">{analysis.bin}</p></div>
            </div>

            <div className="rounded-2xl border border-border p-3">
              <div className="flex items-center justify-between"><p className="text-[10px] font-bold">Confidence</p><p className="text-[10px] font-bold text-primary">{analysis.confidence.toFixed(1)}%</p></div>
              <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${analysis.confidence}%` }} /></div>
              <p className="text-[9px] text-muted-foreground mt-1.5">${analysis.source === "demo" ? "Demo scenario selected by the presenter — not an image-model confidence." : "Live visual confidence — not a guaranteed probability."}</p>
            </div>

            <div className="rounded-2xl bg-secondary/50 p-3 flex items-start gap-2"><Recycle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" /><div><p className="text-[10px] font-bold">Why this result?</p><p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">{analysis.evidence}</p></div></div>
            <div className="rounded-2xl bg-gradient-mint p-3 border border-primary/10"><p className="text-[10px] font-bold text-primary">Disposal tip</p><p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">{analysis.tip}</p></div>

            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={reset} className="rounded-xl bg-secondary text-secondary-foreground py-2.5 text-[10px] font-bold inline-flex items-center justify-center gap-1.5"><RotateCcw className="h-3.5 w-3.5" /> Scan again</button>
              <button type="button" onClick={() => toast.success("Result shared from EcoSort")} className="rounded-xl bg-primary text-primary-foreground py-2.5 text-[10px] font-bold inline-flex items-center justify-center gap-1.5"><ChevronRight className="h-3.5 w-3.5" /> Continue</button>
            </div>
          </div>
        </div>
      )}

      {!analysis && (
        <>
          <div className="mx-5 mt-3 rounded-2xl bg-primary-foreground/8 border border-primary-foreground/10 p-3">\n            <div className="flex items-center justify-between gap-2"><div><p className="text-[10px] font-bold">Demo scenario</p><p className="text-[8px] opacity-55">Choose what is actually visible in the photo.</p></div><select value={demoItem} onChange={(e) => setDemoItem(e.target.value)} className="max-w-[145px] rounded-xl bg-primary-foreground/10 border border-primary-foreground/15 px-2 py-2 text-[9px] font-semibold outline-none"><option>Plastic Bottle</option><option>Banana Peel</option><option>Cardboard Box</option><option>Old Smartphone</option><option>Aluminium Can</option><option>Glass Jar</option><option>Food Scraps</option><option>USB Charger</option></select></div>\n          </div>\n          <div className="mx-5 mt-3 grid grid-cols-3 gap-2">
            {[{ icon: Camera, title: "Photo", sub: "Camera ready" }, { icon: Recycle, title: "5 bins", sub: "Smart routing" }, { icon: Award, title: "25 pts", sub: "Max / scan" }].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="rounded-2xl bg-primary-foreground/8 border border-primary-foreground/10 p-2.5 text-center"><Icon className="h-4 w-4 text-accent mx-auto" /><p className="text-[10px] font-bold mt-1">{title}</p><p className="text-[8px] opacity-55">{sub}</p></div>
            ))}
          </div>
          <div className="mx-5 mt-3 rounded-2xl bg-primary-foreground/8 border border-primary-foreground/10 p-3">
            <div className="flex items-center gap-2"><History className="h-4 w-4 text-accent" /><p className="text-[10px] font-bold">Recent demo scans</p><span className="ml-auto text-[8px] opacity-50">{history.length}/5</span></div>
            {history.length === 0 ? <p className="text-[9px] opacity-55 mt-2">Your first scan will appear here.</p> : <div className="mt-2 space-y-1.5">{history.slice(0, 3).map((item, i) => (
              <div key={`${item.at}-${i}`} className="flex items-center gap-2 rounded-xl bg-primary-foreground/5 px-2.5 py-2"><div className="h-7 w-7 rounded-lg bg-accent/15 flex items-center justify-center"><Recycle className="h-3.5 w-3.5 text-accent" /></div><div className="flex-1 min-w-0"><p className="text-[9px] font-bold truncate">{item.item}</p><p className="text-[8px] opacity-50">{item.at} • ${item.source === "demo" ? "Demo" : "Live"}</p></div><span className="text-[9px] font-bold text-accent">+{item.points}</span></div>
            ))}</div>}
          </div>
        </>
      )}

      <div className="px-5 mt-3 pb-3 flex items-center justify-around">
        <button type="button" onClick={() => fileInputRef.current?.click()} className="h-11 w-11 rounded-2xl bg-primary-foreground/10 backdrop-blur border border-primary-foreground/10 flex items-center justify-center" aria-label="Choose image"><ImageIcon className="h-4 w-4" /></button>
        <button type="button" onClick={() => fileInputRef.current?.click()} disabled={saving} className="relative h-[68px] w-[68px] rounded-full bg-accent flex items-center justify-center shadow-glow disabled:opacity-60" aria-label="Scan waste"><span className="absolute inset-0 rounded-full bg-accent animate-pulse-ring" /><div className="h-[52px] w-[52px] rounded-full border-[3px] border-foreground bg-accent flex items-center justify-center text-[10px] font-bold text-accent-foreground">{saving ? "..." : "SCAN"}</div></button>
        <button type="button" onClick={() => toast("Tip: use good lighting and place one item in the frame.")} className="h-11 w-11 rounded-2xl bg-accent/20 backdrop-blur border border-accent/40 flex items-center justify-center text-accent"><Sparkles className="h-4 w-4" /></button>
      </div>

      <BottomNav active="scan" />
    </div>
  );
}