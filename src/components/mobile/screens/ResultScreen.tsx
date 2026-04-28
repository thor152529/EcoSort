import { StatusBar } from "../StatusBar";
import { BottomNav } from "../BottomNav";
import { ChevronLeft, Sparkles, Recycle, AlertCircle, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function ResultScreen() {
  const { t } = useI18n();
  return (
    <div className="relative h-full bg-background pb-24">
      <div className="bg-gradient-hero text-primary-foreground rounded-b-[2rem] pb-8 relative overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-30" />
        <StatusBar dark />
        <div className="relative flex items-center justify-between px-6 pt-2">
          <button className="h-10 w-10 rounded-full bg-primary-foreground/15 backdrop-blur flex items-center justify-center">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <p className="text-sm font-medium opacity-80">AI Detection</p>
          <div className="h-10 w-10" />
        </div>

        <div className="relative px-6 mt-5 flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-primary-foreground/15 backdrop-blur flex items-center justify-center text-3xl border border-primary-foreground/20">🥤</div>
          <div>
            <p className="text-xs opacity-70 uppercase tracking-wider">{t("detected")}</p>
            <h2 className="text-xl font-bold font-display">Plastic Bottle</h2>
            <div className="flex items-center gap-1 mt-1">
              <Sparkles className="h-3 w-3 text-accent" />
              <span className="text-xs opacity-80">{t("confidence")}:</span>
              <span className="text-xs font-bold text-accent font-mono">98.4%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-6 space-y-3">
        {/* Category card */}
        <div className="bg-card rounded-2xl shadow-soft p-5 border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-plastic flex items-center justify-center">
                <Recycle className="h-6 w-6 text-plastic-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="font-bold">{t("plastic")} • Recyclable</p>
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold">PET 1</div>
          </div>
        </div>

        {/* Bin recommendation */}
        <div className="bg-gradient-mint rounded-2xl p-5 border border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{t("disposeIn")}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🟦</div>
              <div>
                <p className="font-bold text-foreground">Blue Bin</p>
                <p className="text-xs text-muted-foreground">{t("smartBin")}</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-primary" />
          </div>
        </div>

        {/* Tips */}
        <div className="bg-card rounded-2xl p-4 border border-border">
          <div className="flex gap-2 items-start">
            <AlertCircle className="h-4 w-4 text-accent-foreground/70 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">Rinse the bottle and remove the cap before disposal. Crushing reduces volume by 70%.</p>
          </div>
        </div>

        {/* Reward */}
        <div className="bg-gradient-primary text-primary-foreground rounded-2xl p-4 flex items-center justify-between shadow-glow">
          <div>
            <p className="text-xs opacity-80">{t("earn")}</p>
            <p className="text-2xl font-bold font-display">+15 {t("points")}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">★</div>
        </div>
      </div>

      <BottomNav active="scan" />
    </div>
  );
}