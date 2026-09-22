import { useMemo } from "react";
import { StatusBar } from "../StatusBar";
import { BottomNav } from "../BottomNav";
import { Leaf, Wind, Droplets, TreePine, Target, ScanLine } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const HISTORY_KEY = "ecosort-demo-history";

export function SustainabilityScreen() {
  const { t } = useI18n();
  const history = useMemo(() => {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); } catch { return []; }
  }, []);
  const points = history.reduce((sum: number, item: any) => sum + Number(item.points || 0), 0);
  const scans = history.length;
  const score = Math.min(100, scans * 10 + Math.min(40, Math.round(points / 10)));
  const estimatedCarbon = (points * 0.02).toFixed(2);
  const progress = Math.min(100, points / 10);

  return (
    <div className="relative h-full bg-background pb-24">
      <StatusBar />
      <div className="px-6 pt-3 pb-2">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">{t("yourImpact")}</p>
        <h2 className="text-xl font-bold font-display">{t("sustainability")}</h2>
      </div>

      <div className="px-5 mt-3">
        <div className="relative bg-gradient-sustain rounded-3xl p-5 text-primary-foreground shadow-glow overflow-hidden">
          <div className="relative flex items-center gap-4">
            <div className="relative h-24 w-24 flex-shrink-0">
              <div className="absolute inset-0 ring-conic rounded-full opacity-80" />
              <div className="absolute inset-1 rounded-full bg-foreground/30 backdrop-blur-md" />
              <div className="absolute inset-0 flex flex-col items-center justify-center"><p className="text-3xl font-bold font-display leading-none">{score}</p><p className="text-[9px] opacity-80">/ 100</p></div>
            </div>
            <div className="flex-1"><p className="text-[10px] uppercase tracking-wider opacity-80">Eco activity score</p><p className="text-lg font-bold font-display mt-0.5">{scans ? "Building momentum" : "Start your first scan"}</p><p className="text-[9px] opacity-75 mt-1">Calculated only from scans and points recorded by this prototype.</p></div>
          </div>
        </div>
      </div>

      <div className="px-5 mt-3">
        <div className="bg-card border border-border rounded-3xl p-5">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Estimated CO₂e equivalent</p>
          <div className="flex items-baseline gap-1 mt-1"><p className="text-4xl font-bold font-display">{estimatedCarbon}</p><p className="text-sm text-muted-foreground">kg</p></div>
          <p className="text-[9px] text-muted-foreground mt-1">Prototype estimate: Eco Points × 0.02. Not a measured environmental impact.</p>
          <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} /></div>
        </div>
      </div>

      <div className="px-5 mt-3 grid grid-cols-3 gap-2">
        {[{ icon: ScanLine, val: scans, lbl: "Scans" }, { icon: Leaf, val: points, lbl: "Eco Points" }, { icon: Wind, val: estimatedCarbon, lbl: "kg CO₂e est." }].map((s, i) => { const Icon=s.icon; return <div key={i} className="bg-card border border-border rounded-2xl p-3"><div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Icon className="h-4 w-4" /></div><p className="mt-2 text-base font-bold font-display">{s.val}</p><p className="text-[9px] text-muted-foreground">{s.lbl}</p></div>; })}
      </div>

      <div className="px-5 mt-3">
        <div className="bg-card border border-border rounded-3xl p-4">
          <div className="flex items-start gap-3"><div className="h-11 w-11 rounded-2xl bg-gradient-sdg11 flex items-center justify-center"><Target className="h-5 w-5" /></div><div><span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary">UN SDG 11</span><p className="font-bold text-sm mt-1">Sustainable Cities & Communities</p><p className="text-[10px] text-muted-foreground mt-0.5">EcoSort is designed to support better household waste segregation. This screen reports your prototype activity, not city-level SDG progress.</p></div></div>
        </div>
      </div>

      <BottomNav active="impact" />
    </div>
  );
}
