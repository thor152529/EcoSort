import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Leaf, Settings, ShieldCheck, ScanLine, Recycle, Trophy, MapPin, User, Sparkles, ChevronRight } from "lucide-react";
import { ScanScreen } from "@/components/mobile/screens/ScanScreen";
import { SustainabilityScreen } from "@/components/mobile/screens/SustainabilityScreen";
import { RewardsScreen } from "@/components/mobile/screens/RewardsScreen";
import { MapScreen } from "@/components/mobile/screens/MapScreen";
import { ProfileScreen } from "@/components/mobile/screens/ProfileScreen";
import { useI18n } from "@/lib/i18n";

type Tab = "scan" | "impact" | "rewards" | "map" | "profile";

const tabs: { id: Tab; label: string; icon: any }[] = [
  { id: "scan", label: "Scan", icon: ScanLine },
  { id: "impact", label: "Impact", icon: Leaf },
  { id: "rewards", label: "Rewards", icon: Trophy },
  { id: "map", label: "Guide", icon: MapPin },
  { id: "profile", label: "Profile", icon: User },
];

function getTab(): Tab {
  const value = window.location.hash.replace("#/", "").replace("#", "") as Tab;
  return tabs.some((tab) => tab.id === value) ? value : "scan";
}

function AppHome({ onOpen }: { onOpen: (tab: Tab) => void }) {
  const history = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("ecosort-demo-history") || "[]"); } catch { return []; }
  }, []);
  const points = history.reduce((sum: number, item: any) => sum + Number(item.points || 0), 0);

  return (
    <div className="min-h-screen bg-[#eef8f1]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] bg-background shadow-2xl">
        <div className="sticky top-0 z-30 border-b border-border bg-background/95 px-5 py-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-display text-lg font-bold leading-none">EcoSort</p>
                <p className="mt-1 text-[10px] text-muted-foreground">Smart waste segregation</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
                <Bell className="h-4 w-4" />
              </button>
              <Link to="/admin" className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-soft" title="Admin">
                <Settings className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <main className="px-5 pb-8 pt-5">
          <div className="rounded-[1.75rem] bg-gradient-hero p-5 text-primary-foreground shadow-glow">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-75">Good to see you</p>
                <h1 className="mt-1 font-display text-2xl font-bold">Sort smarter. ♻️</h1>
                <p className="mt-1 text-xs leading-relaxed opacity-80">Take a photo of waste and get a clear disposal guide.</p>
              </div>
              <div className="rounded-2xl bg-primary-foreground/10 p-3">
                <Recycle className="h-6 w-6 text-accent" />
              </div>
            </div>
            <button onClick={() => onOpen("scan")} className="mt-4 flex w-full items-center justify-between rounded-2xl bg-accent px-4 py-3 text-left text-accent-foreground shadow-elevated">
              <span className="flex items-center gap-2 text-sm font-bold"><ScanLine className="h-4 w-4" /> Scan waste</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button onClick={() => onOpen("rewards")} className="rounded-2xl border border-border bg-card p-4 text-left shadow-soft">
              <Trophy className="h-5 w-5 text-accent-foreground" />
              <p className="mt-2 text-2xl font-bold font-display">{points}</p>
              <p className="text-[10px] text-muted-foreground">Eco Points</p>
            </button>
            <button onClick={() => onOpen("impact")} className="rounded-2xl border border-border bg-card p-4 text-left shadow-soft">
              <Leaf className="h-5 w-5 text-primary" />
              <p className="mt-2 text-2xl font-bold font-display">{history.length}</p>
              <p className="text-[10px] text-muted-foreground">Scans completed</p>
            </button>
          </div>

          <div className="mt-4 rounded-2xl border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-bold">Transparent prototype</p>
                <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">EcoSort only displays activity that is actually recorded. Location, municipal analytics and environmental impact are not presented as live data unless a real source is connected.</p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="px-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Quick access</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[
                ["impact", "Impact", Leaf],
                ["rewards", "Rewards", Trophy],
                ["map", "Guide", MapPin],
              ].map(([id, label, Icon]: any) => (
                <button key={id} onClick={() => onOpen(id)} className="rounded-2xl border border-border bg-card p-3 text-left">
                  <Icon className="h-4 w-4 text-primary" />
                  <p className="mt-2 text-[10px] font-semibold">{label}</p>
                </button>
              ))}
            </div>
          </div>
        </main>

        <div className="px-5 pb-5">
          <p className="text-center text-[9px] text-muted-foreground">EcoSort • Working prototype • Built for Solution Challenge</p>
        </div>
      </div>
    </div>
  );
}

function AppShell({ tab, setTab }: { tab: Tab; setTab: (tab: Tab) => void }) {
  const screens: Record<Tab, React.ReactNode> = {
    scan: <ScanScreen />,
    impact: <SustainabilityScreen />,
    rewards: <RewardsScreen />,
    map: <MapScreen />,
    profile: <ProfileScreen />,
  };

  useEffect(() => {
    const handleHash = () => setTab(getTab());
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [setTab]);

  return (
    <div className="min-h-screen bg-[#eef8f1]">
      <div className="mx-auto min-h-screen w-full max-w-[480px] bg-background shadow-2xl">
        {screens[tab]}
      </div>
    </div>
  );
}

const Index = () => {
  const [tab, setTab] = useState<Tab>(getTab);
  const [home, setHome] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const value = window.location.hash;
      if (!value || value === "#home") setHome(true);
      else { setHome(false); setTab(getTab()); }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const openTab = (next: Tab) => {
    setHome(false);
    setTab(next);
    window.location.hash = next;
  };

  return home ? <AppHome onOpen={openTab} /> : <AppShell tab={tab} setTab={setTab} />;
};

export default Index;
