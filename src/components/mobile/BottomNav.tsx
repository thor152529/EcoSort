import { Camera, Trophy, MapPin, User, Leaf } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function BottomNav({ active = "scan" }: { active?: string }) {
  const { t } = useI18n();
  const items = [
    { id: "scan", icon: Camera, label: t("scan") },
    { id: "impact", icon: Leaf, label: t("sustainability") },
    { id: "rewards", icon: Trophy, label: t("rewards") },
    { id: "map", icon: MapPin, label: t("map") },
    { id: "profile", icon: User, label: t("profile") },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-2">
      <div className="bg-card/90 backdrop-blur-xl border border-border rounded-[1.75rem] px-2 py-2 flex justify-around shadow-elevated">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = it.id === active;
          return (
            <button
              key={it.id}
              className="relative flex flex-col items-center gap-0.5 px-2 py-1 rounded-2xl transition-all"
            >
              {isActive && (
                <span className="absolute inset-0 bg-gradient-primary rounded-2xl shadow-glow" />
              )}
              <div className={`relative p-1.5 rounded-xl transition-colors ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`}>
                <Icon className="h-[18px] w-[18px]" strokeWidth={2.4} />
              </div>
              <span className={`relative text-[9px] font-bold transition-colors ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}