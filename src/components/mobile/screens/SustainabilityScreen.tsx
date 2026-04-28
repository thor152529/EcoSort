import { StatusBar } from "../StatusBar";
import { BottomNav } from "../BottomNav";
import { Leaf, Wind, Droplets, TreePine, Target, TrendingUp, Building2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function SustainabilityScreen() {
  const { t } = useI18n();
  const score = 87;
  const sdgProgress = 64;

  return (
    <div className="relative h-full bg-background pb-24">
      <StatusBar />

      {/* Header */}
      <div className="px-6 pt-3 pb-2 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">{t("yourImpact")}</p>
          <h2 className="text-xl font-bold font-display">{t("sustainability")}</h2>
        </div>
        <div className="px-2.5 py-1 bg-primary/10 rounded-full flex items-center gap-1">
          <TrendingUp className="h-3 w-3 text-primary" />
          <span className="text-[10px] font-bold text-primary">+12%</span>
        </div>
      </div>

      {/* Sustainability Score Ring */}
      <div className="px-5 mt-3">
        <div className="relative bg-gradient-sustain rounded-3xl p-5 text-primary-foreground shadow-glow overflow-hidden">
          <div className="absolute -top-8 -right-8 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
          <div className="relative flex items-center gap-4">
            <div className="relative h-24 w-24 flex-shrink-0">
              <div className="absolute inset-0 ring-conic rounded-full animate-spin-slow opacity-80" />
              <div className="absolute inset-1 rounded-full bg-foreground/30 backdrop-blur-md" />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-bold font-display leading-none">{score}</p>
                <p className="text-[9px] opacity-80 uppercase tracking-wider">/ 100</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-wider opacity-80">{t("sustainabilityScore")}</p>
              <p className="text-lg font-bold font-display leading-tight mt-0.5">Excellent</p>
              <p className="text-[10px] opacity-80 mt-1 leading-snug">Top 8% in your city. Keep segregating to unlock Champion tier.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Carbon footprint reduction */}
      <div className="px-5 mt-3">
        <div className="bg-gradient-carbon rounded-3xl p-5 text-primary-foreground relative overflow-hidden">
          <div className="absolute right-3 top-3 opacity-20">
            <Wind className="h-16 w-16" />
          </div>
          <p className="text-[10px] uppercase tracking-wider opacity-80">{t("carbonReduced")}</p>
          <div className="flex items-baseline gap-1 mt-1">
            <p className="text-4xl font-bold font-display">142.6</p>
            <p className="text-sm opacity-80">kg CO₂e</p>
          </div>
          <p className="text-[10px] opacity-80 mt-1">{t("pollution")} this month</p>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="flex justify-between text-[10px] opacity-80 mb-1">
              <span>Goal: 200 kg</span>
              <span className="font-bold">71%</span>
            </div>
            <div className="h-2 bg-primary-foreground/15 rounded-full overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 bg-accent rounded-full shimmer" style={{ width: "71%" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Equivalents */}
      <div className="px-5 mt-3 grid grid-cols-3 gap-2">
        {[
          { icon: TreePine, val: "6.4", lbl: "Trees grown", tone: "bg-primary/10 text-primary" },
          { icon: Droplets, val: "2,140", lbl: "Litres water", tone: "bg-dry/10 text-dry" },
          { icon: Wind, val: "412", lbl: "km not driven", tone: "bg-accent/20 text-accent-foreground" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-card border border-border rounded-2xl p-3">
              <div className={`h-8 w-8 rounded-lg ${s.tone} flex items-center justify-center`}>
                <Icon className="h-4 w-4" />
              </div>
              <p className="mt-2 text-base font-bold font-display leading-tight">{s.val}</p>
              <p className="text-[9px] text-muted-foreground leading-tight">{s.lbl}</p>
            </div>
          );
        })}
      </div>

      {/* SDG 11 Card */}
      <div className="px-5 mt-3">
        <div className="bg-card border border-border rounded-3xl p-4 shadow-soft overflow-hidden relative">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-sdg11 flex items-center justify-center flex-shrink-0 shadow-soft">
              <Building2 className="h-6 w-6 text-sdg11-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sdg11/10 text-sdg11">UN SDG 11</span>
                <Target className="h-3 w-3 text-sdg11" />
              </div>
              <p className="font-bold text-sm font-display mt-1 leading-tight">{t("sustainableCities")}</p>
              <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">Your contribution to building inclusive, safe & resilient cities</p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 h-2.5 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-sdg11 rounded-full transition-all" style={{ width: `${sdgProgress}%` }} />
            </div>
            <span className="text-xs font-bold font-mono text-sdg11">{sdgProgress}%</span>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border">
            {[
              { lbl: "Clean air", v: 78 },
              { lbl: "Waste mgmt", v: 84 },
              { lbl: "Green cover", v: 41 },
            ].map((m) => (
              <div key={m.lbl}>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-muted-foreground">{m.lbl}</span>
                  <span className="text-[9px] font-bold">{m.v}%</span>
                </div>
                <div className="h-1 bg-secondary rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-sdg11 rounded-full" style={{ width: `${m.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Impact Report mini-chart */}
      <div className="px-5 mt-3">
        <div className="bg-card border border-border rounded-3xl p-4 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{t("impactReport")}</p>
              <p className="text-sm font-bold font-display">6-month CO₂ trend</p>
            </div>
            <Leaf className="h-4 w-4 text-primary" />
          </div>
          <div className="flex items-end gap-1.5 h-16 mt-2">
            {[45, 62, 58, 78, 88, 100].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gradient-to-t from-primary via-primary-glow to-accent rounded-t-md transition-all hover:opacity-80"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[8px] text-muted-foreground">{["N","D","J","F","M","A"][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="impact" />
    </div>
  );
}