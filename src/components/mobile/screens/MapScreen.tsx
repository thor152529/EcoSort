import { StatusBar } from "../StatusBar";
import { BottomNav } from "../BottomNav";
import { MapPin, Navigation, Search, Star } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function MapScreen() {
  const { t } = useI18n();
  const centers = [
    { name: "GreenCycle Hub", dist: "0.8 km", rating: 4.8, type: "All waste", x: "30%", y: "35%" },
    { name: "E-Waste Point", dist: "1.4 km", rating: 4.6, type: "E-waste only", x: "65%", y: "55%" },
    { name: "Compost Center", dist: "2.1 km", rating: 4.5, type: "Wet waste", x: "45%", y: "70%" },
  ];
  return (
    <div className="relative h-full bg-background pb-24">
      <StatusBar />
      {/* Mock map */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-secondary">
        <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="roads" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 0 30 L 60 30" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
              <path d="M 30 0 L 30 60" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#roads)" />
          <path d="M 0 200 Q 200 150 380 220" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M 50 0 Q 100 300 50 600" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" opacity="0.4" />
          <circle cx="190" cy="280" r="80" fill="hsl(var(--primary) / 0.15)" />
          <circle cx="320" cy="450" r="60" fill="hsl(var(--accent) / 0.15)" />
        </svg>

        {/* Pins */}
        {centers.map((c, i) => (
          <div key={i} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: c.x, top: c.y }}>
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary animate-pulse-ring" />
              <div className="relative h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow border-2 border-card">
                <MapPin className="h-5 w-5 text-primary-foreground" fill="currentColor" />
              </div>
            </div>
          </div>
        ))}

        {/* You */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-4 w-4 rounded-full bg-accent border-2 border-card shadow-glow" />
        </div>
      </div>

      {/* Search overlay */}
      <div className="relative px-5 pt-2 z-10">
        <div className="bg-card rounded-2xl shadow-elevated px-4 py-3 flex items-center gap-3 border border-border">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input className="flex-1 bg-transparent text-sm outline-none" placeholder={t("nearbyCenters")} />
          <Navigation className="h-4 w-4 text-primary" />
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="absolute bottom-20 left-0 right-0 bg-card rounded-t-3xl border-t border-border shadow-elevated px-5 pt-3 pb-3">
        <div className="h-1 w-12 rounded-full bg-border mx-auto mb-3" />
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{t("nearbyCenters")}</p>
        <div className="space-y-2 max-h-44 overflow-y-auto scrollbar-hide">
          {centers.map((c) => (
            <div key={c.name} className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary">
              <div className="h-10 w-10 rounded-xl bg-gradient-mint flex items-center justify-center">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{c.name}</p>
                <p className="text-[10px] text-muted-foreground">{c.type} • {c.dist}</p>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Star className="h-3 w-3 text-accent fill-accent" /> {c.rating}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="map" />
    </div>
  );
}