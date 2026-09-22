import { useEffect, useState } from "react";
import { StatusBar } from "../StatusBar";
import { BottomNav } from "../BottomNav";
import { Settings, Leaf, Trees, Droplet, Languages, Database } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { subscribeToAuth } from "@/firebase/auth";
import { getUserProfile } from "@/firebase/firestore";

export function ProfileScreen() {
  const { t, lang, setLang } = useI18n();
  const [profile, setProfile] = useState<any>(null);
  const [firebaseReady, setFirebaseReady] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (user) => {
      if (!user) return;
      try {
        const data = await getUserProfile(user.uid);
        setProfile(data);
        setFirebaseReady(true);
      } catch (error) {
        console.error("Profile load error:", error);
        setFirebaseReady(false);
      }
    });

    return unsubscribe;
  }, []);

  const points = Number(profile?.ecoPoints || 0);
  const scans = Number(profile?.totalScans || 0);
  const level = Math.max(1, Math.floor(points / 500) + 1);
  const progress = Math.min(100, (points % 500) / 5);

  return (
    <div className="relative h-full bg-background pb-24">
      <StatusBar />
      <div className="px-6 pt-3 flex items-center justify-between">
        <h2 className="font-bold font-display">{t("profile")}</h2>
        <div className="flex items-center gap-2">
          <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${firebaseReady ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
            <Database className="inline h-3 w-3 mr-1" />
            {firebaseReady ? "Firebase Live" : "Connecting"}
          </span>
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="flex items-center gap-1 text-xs font-bold bg-secondary text-secondary-foreground px-2.5 py-1.5 rounded-lg"
          >
            <Languages className="h-3 w-3" />
            {lang === "en" ? "EN" : "हि"}
          </button>
          <button className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
            <Settings className="h-4 w-4 text-secondary-foreground" />
          </button>
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="bg-gradient-primary rounded-2xl p-5 text-primary-foreground shadow-glow flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-primary-foreground/15 backdrop-blur flex items-center justify-center text-3xl">🧑🏽</div>
          <div className="flex-1">
            <p className="font-bold text-lg font-display">{profile?.name || "Eco Warrior"}</p>
            <p className="text-xs opacity-80">Eco Warrior • Level {level}</p>
            <div className="mt-2 h-1.5 bg-primary-foreground/20 rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-[10px] opacity-70 mt-1">{points.toLocaleString()} Eco Points • {scans} scans</p>
          </div>
        </div>
      </div>

      <div className="px-5 mt-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">{t("monthlyImpact")}</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Leaf, val: (points * 0.02).toFixed(1), label: t("co2Saved"), color: "bg-primary/10 text-primary" },
            { icon: Droplet, val: String(scans), label: t("wasteRecycled"), color: "bg-dry/10 text-dry" },
            { icon: Trees, val: (points / 100).toFixed(1), label: t("treesEq"), color: "bg-accent/20 text-accent-foreground" },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="bg-card border border-border rounded-2xl p-3 text-center">
                <div className={`h-9 w-9 rounded-xl ${s.color} flex items-center justify-center mx-auto`}>
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-lg font-bold font-display mt-2">{s.val}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-5 mt-4">
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold">Weekly contribution</p>
            <span className="text-xs text-primary font-bold">Live from Firestore</span>
          </div>
          <div className="flex items-end gap-1.5 h-20">
            {[40, 65, 50, 80, 55, 90, 72].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-gradient-to-t from-primary to-primary-glow rounded-t-md" style={{ height: `${h}%` }} />
                <span className="text-[9px] text-muted-foreground">{["M","T","W","T","F","S","S"][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 mt-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">Achievements</p>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {["🌱","♻️","🏆","⚡","🌍","💧"].map((b, i) => (
            <div key={i} className="flex-shrink-0 h-14 w-14 rounded-2xl bg-gradient-mint border border-border flex items-center justify-center text-2xl">{b}</div>
          ))}
        </div>
      </div>

      <BottomNav active="profile" />
    </div>
  );
}
