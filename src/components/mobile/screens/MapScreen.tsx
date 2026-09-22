import { StatusBar } from "../StatusBar";
import { BottomNav } from "../BottomNav";
import { Recycle, Smartphone, Leaf, Package, Info } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function MapScreen() {
  const { t } = useI18n();
  const guides = [
    { icon: Recycle, title: "Plastic & recyclable packaging", bin: "Blue Bin", note: "Keep items empty and follow your local collection rules." },
    { icon: Leaf, title: "Food & organic waste", bin: "Green Bin", note: "Keep organic waste separate from dry recyclables." },
    { icon: Smartphone, title: "Electronics, chargers & batteries", bin: "E-waste Collection", note: "Use an authorised e-waste collection point." },
    { icon: Package, title: "Paper & cardboard", bin: "Dry / Blue stream", note: "Keep paper and cardboard clean and dry." },
  ];
  return (
    <div className="relative h-full bg-background pb-24">
      <StatusBar />
      <div className="px-6 pt-3"><p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Disposal Guide</p><h2 className="text-xl font-bold font-display">Where should it go?</h2><p className="text-[10px] text-muted-foreground mt-1">Quick guidance for the categories EcoSort currently supports.</p></div>
      <div className="px-5 mt-4 space-y-2.5">
        {guides.map((g) => { const Icon=g.icon; return <div key={g.title} className="bg-card border border-border rounded-2xl p-4 flex items-start gap-3"><div className="h-11 w-11 rounded-xl bg-gradient-mint flex items-center justify-center flex-shrink-0"><Icon className="h-5 w-5 text-primary" /></div><div className="flex-1"><p className="text-sm font-semibold">{g.title}</p><p className="text-xs font-bold text-primary mt-1">{g.bin}</p><p className="text-[9px] text-muted-foreground mt-1 leading-relaxed">{g.note}</p></div></div>; })}
      </div>
      <div className="px-5 mt-3"><div className="rounded-2xl bg-secondary/70 border border-border p-3 flex gap-2"><Info className="h-4 w-4 text-primary flex-shrink-0" /><p className="text-[9px] text-muted-foreground">Live location search is not enabled in this prototype, so EcoSort does not show fabricated distances, ratings or recycling-centre locations.</p></div></div>
      <BottomNav active="map" />
    </div>
  );
}
