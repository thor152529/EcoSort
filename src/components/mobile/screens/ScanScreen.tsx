import { useState } from "react";
import { StatusBar } from "../StatusBar";
import { BottomNav } from "../BottomNav";
import { Zap, Image as ImageIcon, ScanLine, Sparkles, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ensureAuthenticatedUser } from "@/firebase/auth";
import { saveWasteScan } from "@/firebase/firestore";
import { toast } from "sonner";

export function ScanScreen() {
  const { t } = useI18n();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleScan = async () => {
    if (saving) return;
    setSaving(true);
    setSaved(false);

    try {
      const user = await ensureAuthenticatedUser();
      await saveWasteScan(user.uid, "Plastic Bottle", 15, "Blue Bin", 0.984);
      setSaved(true);
      toast.success("Scan saved! +15 Eco Points");
    } catch (error) {
      console.error(error);
      toast.error("Firebase is not ready yet. Enable Anonymous Sign-in and Firestore.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative h-full bg-gradient-to-b from-foreground via-foreground to-primary/90 text-primary-foreground pb-24 overflow-hidden">
      <StatusBar dark />
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
          <div className="h-28 w-28 rounded-2xl bg-accent/20 backdrop-blur-md border-2 border-accent flex items-center justify-center text-5xl animate-float shadow-glow">🥤</div>
        </div>

        {["top-4 left-4 border-l-2 border-t-2", "top-4 right-4 border-r-2 border-t-2", "bottom-4 left-4 border-l-2 border-b-2", "bottom-4 right-4 border-r-2 border-b-2"].map((c) => (
          <div key={c} className={`absolute h-8 w-8 border-accent rounded-lg ${c}`} />
        ))}

        <div className="absolute left-4 right-4 top-12 h-0.5 bg-accent shadow-glow animate-scan rounded-full" />
        <div className="absolute left-4 right-4 top-12 h-12 bg-gradient-to-b from-accent/30 to-transparent animate-scan rounded-md blur-sm" />

        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 bg-foreground/70 backdrop-blur rounded-xl px-3 py-2 border border-primary-foreground/10">
          <ScanLine className="h-3.5 w-3.5 text-accent animate-pulse" />
          <span className="text-[11px] font-medium">{saved ? "Saved to Firebase" : t("pointCamera")}</span>
          {saved ? <CheckCircle2 className="h-3.5 w-3.5 text-accent ml-auto" /> : <span className="ml-auto text-[10px] font-mono text-accent">98.4%</span>}
        </div>
      </div>

      <div className="absolute bottom-24 left-0 right-0 flex items-center justify-around px-10">
        <button className="h-11 w-11 rounded-2xl bg-primary-foreground/10 backdrop-blur border border-primary-foreground/10 flex items-center justify-center">
          <ImageIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={handleScan}
          disabled={saving}
          className="relative h-16 w-16 rounded-full bg-accent flex items-center justify-center shadow-glow disabled:opacity-60"
          aria-label="Save waste scan"
        >
          <span className="absolute inset-0 rounded-full bg-accent animate-pulse-ring" />
          <div className="h-12 w-12 rounded-full border-[3px] border-foreground bg-accent flex items-center justify-center text-[10px] font-bold text-accent-foreground">
            {saving ? "..." : "SCAN"}
          </div>
        </button>
        <button className="h-11 w-11 rounded-2xl bg-accent/20 backdrop-blur border border-accent/40 flex items-center justify-center text-[10px] font-bold text-accent">
          AI
        </button>
      </div>

      <BottomNav active="scan" />
    </div>
  );
}
