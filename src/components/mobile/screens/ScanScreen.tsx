import { useRef, useState } from "react";
import { StatusBar } from "../StatusBar";
import { BottomNav } from "../BottomNav";
import { Zap, Image as ImageIcon, ScanLine, Sparkles, CheckCircle2, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ensureAuthenticatedUser } from "@/firebase/auth";
import { saveWasteScan } from "@/firebase/firestore";
import { analyzeWasteImage, type WasteAnalysis } from "@/firebase/ai";
import { toast } from "sonner";

export function ScanScreen() {
  const { t } = useI18n();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [analysis, setAnalysis] = useState<WasteAnalysis | null>(null);

  const handleImage = async (file?: File) => {
    if (!file || saving) return;
    setSaving(true);
    setSaved(false);
    setAnalysis(null);

    try {
      const result = await analyzeWasteImage(file);
      const user = await ensureAuthenticatedUser();
      await saveWasteScan(user.uid, result.item, result.points, result.bin, result.confidence / 100);
      setAnalysis(result);
      setSaved(true);
      toast.success(`AI detected ${result.item} • +${result.points} Eco Points`);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "AI scan failed. Check Firebase AI Logic setup.");
    } finally {
      setSaving(false);
    }
  };

  const handleScan = () => fileInputRef.current?.click();

  return (
    <div className="relative h-full bg-gradient-to-b from-foreground via-foreground to-primary/90 text-primary-foreground pb-24 overflow-hidden">
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

      <div className="px-6 pt-3 pb-2 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-accent" />
            <p className="text-[10px] opacity-80 uppercase tracking-wider font-bold">EcoSort AI</p>
          </div>
          <h2 className="text-lg font-bold font-display">{t("scanItem")}</h2>
        </div>
        <button className="h-9 w-9 rounded-full bg-primary-foreground/10 flex items-center justify-center backdrop-blur border border-primary-foreground/10">
          <Zap className="h-4 w-4 text-accent" />
        </button>
      </div>

      <div className="mx-5 mt-3 relative aspect-[3/4] rounded-3xl overflow-hidden bg-foreground/60 border border-primary-foreground/20 shadow-elevated">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-foreground/40 to-accent/20" />
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-28 w-28 rounded-2xl bg-accent/20 backdrop-blur-md border-2 border-accent flex items-center justify-center text-5xl animate-float shadow-glow">
            {analysis ? "♻️" : "🥤"}
          </div>
        </div>

        {["top-4 left-4 border-l-2 border-t-2", "top-4 right-4 border-r-2 border-t-2", "bottom-4 left-4 border-l-2 border-b-2", "bottom-4 right-4 border-r-2 border-b-2"].map((c) => (
          <div key={c} className={`absolute h-8 w-8 border-accent rounded-lg ${c}`} />
        ))}

        <div className="absolute left-4 right-4 top-12 h-0.5 bg-accent shadow-glow animate-scan rounded-full" />
        <div className="absolute left-4 right-4 top-12 h-12 bg-gradient-to-b from-accent/30 to-transparent animate-scan rounded-md blur-sm" />

        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 bg-foreground/70 backdrop-blur rounded-xl px-3 py-2 border border-primary-foreground/10">
          {saving ? <Loader2 className="h-3.5 w-3.5 text-accent animate-spin" /> : saved ? <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> : <ScanLine className="h-3.5 w-3.5 text-accent animate-pulse" />}
          <span className="text-[11px] font-medium">
            {saving ? "Analyzing with Gemini..." : saved ? "Saved to Firebase" : t("pointCamera")}
          </span>
          <span className="ml-auto text-[10px] font-mono text-accent">
            {analysis ? `${analysis.confidence.toFixed(1)}% visual confidence` : "AI"}
          </span>
        </div>
      </div>

      {analysis && (
        <div className="mx-5 mt-3 rounded-2xl bg-card text-foreground p-4 shadow-elevated border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">AI Detection</p>
              <p className="text-lg font-bold font-display">{analysis.item}</p>
              <p className="text-xs text-muted-foreground capitalize">{analysis.category} • {analysis.bin}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">Evidence: {analysis.evidence}</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-primary">+{analysis.points}</p>
              <p className="text-[10px] text-muted-foreground">Eco Points</p>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{analysis.tip}</p>
          {analysis.points === 0 && (
            <p className="mt-2 text-[11px] font-semibold text-amber-700">No points awarded because the image was not reliable enough to classify.</p>
          )}
        </div>
      )}

      <div className="absolute bottom-24 left-0 right-0 flex items-center justify-around px-10">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="h-11 w-11 rounded-2xl bg-primary-foreground/10 backdrop-blur border border-primary-foreground/10 flex items-center justify-center"
          aria-label="Choose image"
        >
          <ImageIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleScan}
          disabled={saving}
          className="relative h-16 w-16 rounded-full bg-accent flex items-center justify-center shadow-glow disabled:opacity-60"
          aria-label="Scan waste"
        >
          <span className="absolute inset-0 rounded-full bg-accent animate-pulse-ring" />
          <div className="h-12 w-12 rounded-full border-[3px] border-foreground bg-accent flex items-center justify-center text-[10px] font-bold text-accent-foreground">
            {saving ? "..." : "SCAN"}
          </div>
        </button>
        <button
          type="button"
          onClick={handleScan}
          className="h-11 w-11 rounded-2xl bg-accent/20 backdrop-blur border border-accent/40 flex items-center justify-center text-[10px] font-bold text-accent"
        >
          AI
        </button>
      </div>

      <BottomNav active="scan" />
    </div>
  );
}
