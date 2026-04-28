import { useState } from "react";
import { StatusBar } from "../StatusBar";
import { BottomNav } from "../BottomNav";
import { Trophy, Flame, Gift, Crown, GraduationCap, Building2, Users, Sparkles, Lock } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type Tab = "you" | "colleges" | "apartments" | "communities";

export function RewardsScreen() {
  const { t } = useI18n();
  const [tab, setTab] = useState<Tab>("you");

  const data: Record<Tab, { name: string; pts: number; rank: number; av: string; you?: boolean; sub: string }[]> = {
    you: [
      { name: "Priya S.", pts: 4820, rank: 1, av: "👩🏽", sub: "Champion" },
      { name: "Arjun M.", pts: 4310, rank: 2, av: "👨🏻", sub: "Eco Hero" },
      { name: "You", pts: 3995, rank: 3, av: "🧑🏽", you: true, sub: "Eco Warrior" },
      { name: "Neha K.", pts: 3640, rank: 4, av: "👩🏻", sub: "Eco Warrior" },
      { name: "Rohan T.", pts: 3120, rank: 5, av: "👨🏽", sub: "Recycler" },
    ],
    colleges: [
      { name: "IIT Bombay", pts: 184820, rank: 1, av: "🎓", sub: "12,400 students" },
      { name: "BITS Pilani", pts: 162310, rank: 2, av: "🎓", sub: "9,800 students" },
      { name: "Your College", pts: 148995, rank: 3, av: "🏛️", you: true, sub: "8,200 students" },
      { name: "NIT Trichy", pts: 132640, rank: 4, av: "🎓", sub: "7,100 students" },
      { name: "VIT Vellore", pts: 121120, rank: 5, av: "🎓", sub: "11,300 students" },
    ],
    apartments: [
      { name: "Prestige Lakeside", pts: 84820, rank: 1, av: "🏢", sub: "1,240 homes" },
      { name: "Sobha Dream", pts: 72310, rank: 2, av: "🏢", sub: "980 homes" },
      { name: "Your Society", pts: 68995, rank: 3, av: "🏘️", you: true, sub: "640 homes" },
      { name: "Brigade Gateway", pts: 62640, rank: 4, av: "🏢", sub: "820 homes" },
      { name: "Mantri Espana", pts: 58120, rank: 5, av: "🏢", sub: "510 homes" },
    ],
    communities: [
      { name: "Indiranagar", pts: 248820, rank: 1, av: "🌆", sub: "Ward 81" },
      { name: "Koramangala", pts: 232310, rank: 2, av: "🌆", sub: "Ward 76" },
      { name: "Your Ward", pts: 198995, rank: 3, av: "🌳", you: true, sub: "Ward 65" },
      { name: "HSR Layout", pts: 182640, rank: 4, av: "🌆", sub: "Ward 92" },
      { name: "Whitefield", pts: 161120, rank: 5, av: "🌆", sub: "Ward 84" },
    ],
  };

  const leaders = data[tab];
  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "you", label: "You", icon: Trophy },
    { id: "colleges", label: t("colleges"), icon: GraduationCap },
    { id: "apartments", label: t("apartments"), icon: Building2 },
    { id: "communities", label: t("community"), icon: Users },
  ];

  const badges = [
    { e: "🌱", n: "Sprout", earned: true },
    { e: "♻️", n: "Recycler", earned: true },
    { e: "🏆", n: "Champion", earned: true },
    { e: "⚡", n: "Streak", earned: true },
    { e: "🌍", n: "Planet", earned: false },
    { e: "💎", n: "Elite", earned: false },
  ];

  return (
    <div className="relative h-full bg-background pb-24">
      <div className="bg-gradient-hero text-primary-foreground pb-12 rounded-b-[2rem] relative overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-30" />
        <StatusBar dark />
        <div className="relative px-6 pt-2 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider opacity-80 font-bold">{t("rewards")}</p>
            <h2 className="text-xl font-bold font-display">{t("leaderboard")}</h2>
          </div>
          <div className="flex items-center gap-1 bg-primary-foreground/15 backdrop-blur px-2.5 py-1 rounded-full">
            <Sparkles className="h-3 w-3 text-accent" />
            <span className="text-[10px] font-bold">3,995 pts</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="relative px-4 mt-3 flex gap-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tb) => {
            const Icon = tb.icon;
            const active = tab === tb.id;
            return (
              <button
                key={tb.id}
                onClick={() => setTab(tb.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-bold whitespace-nowrap transition-all ${
                  active ? "bg-accent text-accent-foreground shadow-glow" : "bg-primary-foreground/10 text-primary-foreground/80"
                }`}
              >
                <Icon className="h-3 w-3" />
                {tb.label}
              </button>
            );
          })}
        </div>

        {/* Podium */}
        <div className="relative px-6 mt-4 flex items-end gap-3 justify-center">
          {[
            { ...leaders[1], h: "h-16" },
            { ...leaders[0], h: "h-24" },
            { ...leaders[2], h: "h-12" },
          ].map((p) => (
            <div key={p.name} className="flex flex-col items-center flex-1 min-w-0">
              <div className="relative">
                <div className={`h-11 w-11 rounded-full bg-card text-xl flex items-center justify-center border-2 ${p.rank === 1 ? "border-accent shadow-glow" : "border-primary-foreground/30"}`}>
                  {p.av}
                </div>
                {p.rank === 1 && <Crown className="absolute -top-3.5 left-1/2 -translate-x-1/2 h-4 w-4 text-accent fill-accent" />}
              </div>
              <p className="text-[10px] font-bold mt-1 truncate max-w-full">{p.name}</p>
              <p className="text-[9px] opacity-80 font-mono">{p.pts.toLocaleString()}</p>
              <div className={`w-full ${p.h} bg-primary-foreground/15 backdrop-blur rounded-t-xl mt-1.5 flex items-start justify-center pt-1.5 border-t-2 ${p.rank === 1 ? "border-accent" : "border-primary-foreground/30"}`}>
                <span className="text-base font-bold font-display">{p.rank}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 -mt-7 space-y-3 relative">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-card rounded-2xl p-3 border border-border shadow-soft">
            <Flame className="h-4 w-4 text-wet" />
            <p className="text-lg font-bold mt-1 font-display leading-none">28</p>
            <p className="text-[9px] text-muted-foreground mt-0.5">{t("streak")}</p>
          </div>
          <div className="bg-card rounded-2xl p-3 border border-border shadow-soft">
            <Gift className="h-4 w-4 text-plastic" />
            <p className="text-lg font-bold mt-1 font-display leading-none">12</p>
            <p className="text-[9px] text-muted-foreground mt-0.5">Rewards</p>
          </div>
          <div className="bg-card rounded-2xl p-3 border border-border shadow-soft">
            <Trophy className="h-4 w-4 text-accent-foreground/70" />
            <p className="text-lg font-bold mt-1 font-display leading-none">L7</p>
            <p className="text-[9px] text-muted-foreground mt-0.5">{t("level")}</p>
          </div>
        </div>

        {/* Eco Badges */}
        <div className="bg-card rounded-2xl border border-border p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{t("ecoBadges")}</p>
            <span className="text-[10px] text-primary font-bold">4 / 6</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {badges.map((b) => (
              <div key={b.n} className={`flex-shrink-0 flex flex-col items-center gap-0.5 ${!b.earned && "opacity-40"}`}>
                <div className={`relative h-12 w-12 rounded-2xl flex items-center justify-center text-xl ${b.earned ? "bg-gradient-mint border border-accent/40" : "bg-muted border border-border"}`}>
                  {b.earned ? b.e : <Lock className="h-4 w-4 text-muted-foreground" />}
                </div>
                <span className="text-[8px] font-semibold">{b.n}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard list */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="px-4 py-2.5 flex items-center justify-between border-b border-border">
            <p className="font-semibold text-xs">{t("thisMonth")}</p>
            <Trophy className="h-3.5 w-3.5 text-accent-foreground/70" />
          </div>
          {leaders.map((l) => (
            <div key={l.name} className={`flex items-center gap-3 px-4 py-2.5 ${l.you ? "bg-gradient-to-r from-primary/10 to-transparent border-l-2 border-primary" : ""}`}>
              <span className={`w-5 text-[10px] font-bold ${l.rank <= 3 ? "text-accent-foreground" : "text-muted-foreground"}`}>#{l.rank}</span>
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-base">{l.av}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate">{l.name}</p>
                <p className="text-[9px] text-muted-foreground">{l.sub}</p>
              </div>
              <p className="text-xs font-bold text-primary font-mono">{l.pts.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="rewards" />
    </div>
  );
}