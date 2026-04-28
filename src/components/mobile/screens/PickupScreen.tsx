import { StatusBar } from "../StatusBar";
import { BottomNav } from "../BottomNav";
import { Truck, Calendar, Package, Smartphone, Sofa, Tv, ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function PickupScreen() {
  const { t } = useI18n();
  const types = [
    { icon: Smartphone, label: "Phones", color: "bg-ewaste text-ewaste-foreground" },
    { icon: Tv, label: "TVs", color: "bg-plastic text-plastic-foreground" },
    { icon: Sofa, label: "Furniture", color: "bg-wet text-wet-foreground" },
    { icon: Package, label: "Other", color: "bg-dry text-dry-foreground" },
  ];
  return (
    <div className="relative h-full bg-background pb-24">
      <StatusBar />
      <div className="px-6 pt-3">
        <p className="text-xs text-muted-foreground">{t("pickup")}</p>
        <h2 className="text-2xl font-bold font-display">{t("requestPickup")}</h2>
        <p className="text-xs text-muted-foreground mt-1">{t("largeWaste")}</p>
      </div>

      <div className="px-5 mt-5 space-y-4">
        {/* Hero card */}
        <div className="bg-gradient-hero rounded-2xl p-5 text-primary-foreground shadow-glow relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 opacity-20">
            <Truck className="h-32 w-32" />
          </div>
          <p className="text-xs opacity-80">Free pickup</p>
          <h3 className="text-xl font-bold font-display mt-1">Schedule in 60 seconds</h3>
          <p className="text-xs opacity-80 mt-1 max-w-[180px]">Earn 50+ bonus points per pickup</p>
          <button className="mt-4 px-4 py-2 bg-accent text-accent-foreground rounded-xl text-sm font-bold inline-flex items-center gap-1">
            {t("book")} <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Categories */}
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Item type</p>
          <div className="grid grid-cols-4 gap-2">
            {types.map((tp) => {
              const Icon = tp.icon;
              return (
                <button key={tp.label} className="flex flex-col items-center gap-1.5 p-3 bg-card border border-border rounded-2xl hover:shadow-soft">
                  <div className={`h-10 w-10 rounded-xl ${tp.color} flex items-center justify-center`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-medium">{tp.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-sm">{t("schedule")}</p>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {["Tue", "Wed", "Thu", "Fri"].map((d, i) => (
              <button key={d} className={`flex flex-col items-center py-2 rounded-xl border ${i === 1 ? "bg-primary text-primary-foreground border-primary" : "border-border"}`}>
                <span className="text-[10px] opacity-70">{d}</span>
                <span className="text-base font-bold">{14 + i}</span>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {["10 AM", "1 PM", "4 PM"].map((s, i) => (
              <button key={s} className={`text-xs py-2 rounded-xl ${i === 0 ? "bg-secondary text-primary font-semibold" : "bg-muted text-muted-foreground"}`}>{s}</button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active="map" />
    </div>
  );
}