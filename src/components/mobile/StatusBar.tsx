import { Signal, Wifi, BatteryFull } from "lucide-react";

export function StatusBar({ dark = false }: { dark?: boolean }) {
  const cls = dark ? "text-primary-foreground" : "text-foreground";
  return (
    <div className={`flex items-center justify-between px-6 pt-2 pb-1 text-xs font-semibold ${cls}`}>
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <Signal className="h-3 w-3" />
        <Wifi className="h-3 w-3" />
        <BatteryFull className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}