import { Link } from "react-router-dom";
import { Leaf, ArrowRight, Sparkles, Languages, Recycle, Trophy, MapPin, Truck, User, Camera, Award, Building2, Wind, BarChart3, Target, Globe2, ShieldCheck, Zap } from "lucide-react";
import { PhoneFrame } from "@/components/mobile/PhoneFrame";
import { ScanScreen } from "@/components/mobile/screens/ScanScreen";
import { ResultScreen } from "@/components/mobile/screens/ResultScreen";
import { RewardsScreen } from "@/components/mobile/screens/RewardsScreen";
import { MapScreen } from "@/components/mobile/screens/MapScreen";
import { PickupScreen } from "@/components/mobile/screens/PickupScreen";
import { ProfileScreen } from "@/components/mobile/screens/ProfileScreen";
import { SustainabilityScreen } from "@/components/mobile/screens/SustainabilityScreen";
import { useI18n } from "@/lib/i18n";

const Index = () => {
  const { t, lang, setLang } = useI18n();

  const screens = [
    { node: <ScanScreen />, label: "Scan", icon: Camera },
    { node: <ResultScreen />, label: "AI Result + Bin", icon: Recycle },
    { node: <SustainabilityScreen />, label: "Sustainability + SDG 11", icon: Leaf },
    { node: <RewardsScreen />, label: "Rewards", icon: Trophy },
    { node: <MapScreen />, label: "Recycling Map", icon: MapPin },
    { node: <PickupScreen />, label: "Pickup", icon: Truck },
    { node: <ProfileScreen />, label: "Profile + Impact", icon: User },
  ];

  const wowFeatures = [
    { icon: Target, title: "Sustainability Score", desc: "Live 0–100 score across air, water and waste impact.", tone: "bg-primary/10 text-primary" },
    { icon: Wind, title: "Carbon Tracker", desc: "Real-time CO₂e prevented through accurate segregation.", tone: "bg-dry/10 text-dry" },
    { icon: Building2, title: "SDG 11 Indicator", desc: "Maps every action to UN Sustainable Cities goal.", tone: "bg-sdg11/10 text-sdg11" },
    { icon: BarChart3, title: "Smart Analytics", desc: "Ward-level dashboards for ULBs and municipalities.", tone: "bg-plastic/10 text-plastic" },
    { icon: Award, title: "Eco Badges & Levels", desc: "Streaks, milestones and rewards keep citizens hooked.", tone: "bg-accent/20 text-accent-foreground" },
    { icon: Globe2, title: "Community Leagues", desc: "Colleges, apartments and wards compete in real time.", tone: "bg-wet/10 text-wet" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 bg-background/70 backdrop-blur-2xl border-b border-border/60">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-bold font-display leading-none">{t("appName")}</p>
              <p className="text-[10px] text-muted-foreground">{t("tagline")}</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold bg-secondary text-secondary-foreground px-3 py-2 rounded-xl hover:bg-secondary/70 transition"
            >
              <Languages className="h-3.5 w-3.5" />
              {lang === "en" ? "EN / हिंदी" : "हिंदी / EN"}
            </button>
            <Link to="/admin" className="text-xs font-bold bg-gradient-primary text-primary-foreground px-4 py-2 rounded-xl inline-flex items-center gap-1.5 shadow-soft hover:shadow-glow transition-all hover:scale-105">
              {t("admin")} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-60" />
        <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl animate-float" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-accent/25 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl lg:text-7xl font-bold font-display leading-[1.02] tracking-tight text-balance">
              The smartest way to <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">recycle India</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              {t("appName")} uses on-device AI to classify waste in milliseconds, gamifies civic action with rewards, and gives every municipality a live operations console aligned to <span className="font-semibold text-foreground">UN SDG 11</span>.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#preview" className="group px-6 py-3.5 rounded-2xl bg-gradient-primary text-primary-foreground font-bold text-sm inline-flex items-center gap-2 shadow-glow hover:shadow-elevated hover:-translate-y-0.5 transition-all">
                {t("launchApp")} <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/admin" className="px-6 py-3.5 rounded-2xl bg-card border border-border font-bold text-sm inline-flex items-center gap-2 hover:bg-secondary hover:-translate-y-0.5 transition-all">
                <BarChart3 className="h-4 w-4" /> Municipal Console
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-4 gap-4 max-w-xl">
              {[
                { v: "98.4%", l: "AI accuracy" },
                { v: "142", l: "Wards live" },
                { v: "84K+", l: "Citizens" },
                { v: "2.8M", l: "kg diverted" },
              ].map((s) => (
                <div key={s.l} className="border-l-2 border-primary/30 pl-3">
                  <p className="text-2xl lg:text-3xl font-bold font-display bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">{s.v}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 font-medium">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating phone preview */}
          <div className="relative flex justify-center animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="relative animate-float">
              <PhoneFrame glow>
                <SustainabilityScreen />
              </PhoneFrame>
            </div>
            {/* Floating callouts */}
            <div className="absolute top-10 -left-2 lg:-left-12 bg-card border border-border rounded-2xl shadow-elevated p-3 flex items-center gap-2 animate-float" style={{ animationDelay: "1s" }}>
              <div className="h-9 w-9 rounded-xl bg-gradient-sdg11 flex items-center justify-center">
                <Building2 className="h-4 w-4 text-sdg11-foreground" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold">SDG 11</p>
                <p className="text-xs font-bold font-display">64% achieved</p>
              </div>
            </div>
            <div className="absolute bottom-20 -right-2 lg:-right-10 bg-card border border-border rounded-2xl shadow-elevated p-3 flex items-center gap-2 animate-float" style={{ animationDelay: "2s" }}>
              <div className="h-9 w-9 rounded-xl bg-gradient-carbon flex items-center justify-center">
                <Wind className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold">CO₂ saved</p>
                <p className="text-xs font-bold font-display text-primary">142.6 kg</p>
              </div>
            </div>
          </div>
        </div>

        {/* Logo strip */}
        <div className="relative border-y border-border/60 bg-secondary/20 py-5 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-between gap-6 text-xs uppercase tracking-wider text-muted-foreground font-bold">
            <span>Aligned with</span>
            <span className="inline-flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" /> UN SDG 11</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Swachh Bharat</span>
            <span className="inline-flex items-center gap-1.5"><Globe2 className="h-3.5 w-3.5" /> Smart Cities Mission</span>
            <span className="inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5" /> On-device AI</span>
            <span className="inline-flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" /> Built with Gemini</span>
          </div>
        </div>
      </section>

      {/* WOW Features */}
      <section className="relative py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary">The WOW Factor</p>
            <h2 className="text-4xl lg:text-5xl font-bold font-display mt-3 text-balance">Built for impact, designed to delight.</h2>
            <p className="text-muted-foreground mt-4 text-lg">Every feature ties back to a measurable environmental outcome.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {wowFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="group relative bg-card border border-border rounded-3xl p-6 hover:shadow-elevated hover:-translate-y-1 transition-all overflow-hidden">
                  <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/15 transition-colors" />
                  <div className={`relative h-12 w-12 rounded-2xl ${f.tone} flex items-center justify-center`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="relative mt-4 font-bold font-display text-lg">{f.title}</h3>
                  <p className="relative mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All screens preview */}
      <section id="preview" className="bg-gradient-mint py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="relative text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary">The Citizen App</p>
            <h2 className="text-4xl lg:text-5xl font-bold font-display mt-3 text-balance">From scan to impact in 5 seconds.</h2>
            <p className="text-muted-foreground mt-4 text-lg">Seven beautifully crafted screens. Multi-language. Built for India.</p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
            {screens.map((s) => (
              <PhoneFrame key={s.label} label={s.label}>
                {s.node}
              </PhoneFrame>
            ))}
          </div>
        </div>
      </section>

      {/* Admin teaser */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary">Municipal Console</p>
            <h2 className="text-4xl lg:text-5xl font-bold font-display mt-3 text-balance">A command center for cleaner cities.</h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Real-time waste analytics, area heatmaps, complaint SLAs, citizen leagues and SDG 11 tracking — all in a single, beautifully designed console for every ULB.
            </p>
            <ul className="mt-7 grid grid-cols-2 gap-3 text-sm">
              {["Waste analytics", "Area heatmap", "Complaint SLAs", "Citizen reports", "SDG 11 tracker", "Carbon offset", "Community leagues", "Export CSV"].map((f) => (
                <li key={f} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> <span className="font-medium">{f}</span>
                </li>
              ))}
            </ul>
            <Link to="/admin" className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-primary text-primary-foreground font-bold text-sm shadow-glow hover:shadow-elevated hover:-translate-y-0.5 transition-all">
              Open dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative rounded-[1.75rem] overflow-hidden border border-border shadow-premium bg-card">
            <div className="h-9 bg-secondary border-b border-border flex items-center gap-1.5 px-4">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-wet/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
              <span className="ml-3 text-[10px] font-mono text-muted-foreground">ecosort.gov.in/admin</span>
            </div>
            <div className="aspect-[16/10] bg-gradient-to-br from-secondary via-card to-secondary p-5 grid grid-cols-3 gap-2.5">
              {[Recycle, Trophy, MapPin, Truck, Leaf, User].map((I, i) => (
                <div key={i} className="bg-card rounded-xl p-3 border border-border flex flex-col gap-2 hover:shadow-soft transition">
                  <div className="flex items-center justify-between">
                    <I className="h-4 w-4 text-primary" />
                    <span className="text-[8px] font-bold text-primary">+{Math.floor(Math.random() * 30)}%</span>
                  </div>
                  <div className="h-1.5 w-2/3 bg-secondary rounded-full" />
                  <div className="h-6 bg-gradient-to-r from-primary/40 to-accent/40 rounded-md" />
                  <div className="flex gap-1 items-end h-8">
                    {[40, 70, 50, 80, 60, 90].map((h, j) => (
                      <div key={j} className="flex-1 bg-gradient-to-t from-primary/60 to-primary/30 rounded-sm" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="relative rounded-[2rem] bg-gradient-hero text-primary-foreground p-10 lg:p-16 overflow-hidden shadow-premium">
            <div className="absolute inset-0 dot-bg opacity-20" />
            <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent/30 blur-3xl" />
            <div className="relative grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2">
                <p className="text-xs uppercase tracking-[0.2em] font-bold opacity-80">Ready to scale</p>
                <h2 className="text-3xl lg:text-5xl font-bold font-display mt-3 leading-tight text-balance">Cleaner cities start with one scan.</h2>
                <p className="mt-4 text-base opacity-90 max-w-2xl">Join 84,000+ citizens and 142 wards already segregating smarter with EcoSort.</p>
              </div>
              <div className="flex lg:justify-end">
                <a href="#preview" className="px-6 py-3.5 rounded-2xl bg-accent text-accent-foreground font-bold text-sm inline-flex items-center gap-2 shadow-elevated hover:scale-105 transition">
                  Try the demo <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 bg-secondary/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-wrap justify-between items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Leaf className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <p className="font-semibold">© 2025 EcoSort • Built for Google Solution Challenge</p>
          </div>
          <p>Made with 🌱 for cleaner Indian cities</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
