import { useMemo } from "react";
import { StatusBar } from "../StatusBar";
import { BottomNav } from "../BottomNav";
import { Trophy, Flame, Gift, Crown, Lock, Recycle, ScanLine } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const HISTORY_KEY = "ecosort-demo-history";

export function RewardsScreen() {
  const { t } = useI18n();
  const history = useMemo(() => {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); } catch { return []; }
  }, []);
  const points = history.reduce((sum: number, item: any) => sum + Number(item.points || 0), 0);
  const scans = history.length;
  const level = Math.max(1, Math.floor(points / 100) + 1);
  const streak = scans;
  const badges = [
    { e: "🌱", n: "First Scan", earned: scans >= 1 },
    { e: "♻️", n: "Recycler", earned: scans >= 3 },
    { e: "🏆", n: "100 Points", earned: points >= 100 },
    { e: "⚡", n: "5 Scans", earned: scans >= 5 },
    { e: "🌍", n: "500 Points", earned: points >= 500 },
    { e: "💎", n: "1000 Points", earned: points >= 1000 },
  ];
  return (
    <div className="relative h-full bg-background pb-24">
      <div className="bg-gradient-hero text-primary-foreground pb-10 rounded-b-[2rem]">
        <StatusBar dark />
        <div className="px-6 pt-2">
          <p className="text-[10px] uppercase tracking-wider opacity-80 font-bold">{t("rewards")}</p>
          <h2 className="text-xl font-bold font-display">Your Eco Progress</h2>
        </div>
        <div className="px-6 mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-primary-foreground/10 border border-primary-foreground/10 p-4">
            <Trophy className="h-5 w-5 text-accent" />
            <p className="text-3xl font-bold font-display mt-2">{points}</p>
            <p className="text-[10px] opacity-70">Eco Points earned</p>
          </div>
          <div className="rounded-2xl bg-primary-foreground/10 border border-primary-foreground/10 p-4">
            <ScanLine className="h-5 w-5 text-accent" />
            <p className="text-3xl font-bold font-display mt-2">{scans}</p>
            <p className="text-[10px] opacity-70">Completed scans</p>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-5 space-y-3 relative">
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-card rounded-2xl p-3 border border-border shadow-soft"><Flame className="h-4 w-4 text-wet" /><p className="text-lg font-bold mt-1"> {streak}</p><p className="text-[9px] text-muted-foreground">Scan streak</p></div>
          <div className="bg-card rounded-2xl p-3 border border-border shadow-soft"><Gift className="h-4 w-4 text-plastic" /><p className="text-lg font-bold mt-1">{badges.filter(b => b.earned).length}</p><p className="text-[9px] text-muted-foreground">Badges</p></div>
          <div className="bg-card rounded-2xl p-3 border border-border shadow-soft"><Crown className="h-4 w-4 text-accent-foreground/70" /><p className="text-lg font-bold mt-1">L{level}</p><p className="text-[9px] text-muted-foreground">Level</p></div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center justify-between mb-3"><p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Eco Badges</p><span className="text-[10px] text-primary font-bold">{badges.filter(b => b.earned).length} / {badges.length}</span></div>
          <div className="grid grid-cols-3 gap-3">
            {badges.map((b) => <div key={b.n} className={`text-center ${!b.earned ? "opacity-40" : ""}`}><div className={`h-12 w-12 mx-auto rounded-2xl flex items-center justify-center text-xl ${b.earned ? "bg-gradient-mint border border-accent/40" : "bg-muted border border-border"}`}>{b.earned ? b.e : <Lock className="h-4 w-4 text-muted-foreground" />}</div><p className="text-[8px] font-semibold mt-1">{b.n}</p></div>)}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-4">
          <div className="flex items-center gap-2 mb-2"><Recycle className="h-4 w-4 text-primary" /><p className="font-semibold text-xs">Recent earned points</p></div>
          {history.length === 0 ? <p className="text-[10px] text-muted-foreground">Scan a waste item to start earning points.</p> : <div className="space-y-2">{history.slice(0, 5).map((item: any, i: number) => <div key={i} className="flex items-center justify-between rounded-xl bg-secondary/60 px-3 py-2"><div><p className="text-[10px] font-semibold">{item.item}</p><p className="text-[8px] text-muted-foreground">{item.at || "Recent scan"}</p></div><span className="text-xs font-bold text-primary">+{item.points}</span></div>)}</div>}
        </div>
      </div>
      <BottomNav active="rewards" />
    </div>
  );
}
