import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "hi";

const dict = {
  en: {
    appName: "EcoSort",
    tagline: "Smart Waste Segregation",
    scan: "Scan", result: "Result", bins: "Bins", rewards: "Rewards",
    map: "Map", pickup: "Pickup", profile: "Profile",
    scanItem: "Scan a waste item", pointCamera: "Point camera at the waste",
    detected: "Detected", confidence: "Confidence", disposeIn: "Dispose in",
    earn: "You earned", points: "points",
    leaderboard: "Leaderboard", thisMonth: "This month",
    nearbyCenters: "Nearby Recycling Centers",
    requestPickup: "Request Pickup", largeWaste: "Large Waste & E-waste",
    monthlyImpact: "Monthly Environmental Impact",
    co2Saved: "CO₂ Saved", wasteRecycled: "Waste Recycled", treesEq: "Trees Equivalent",
    home: "Home", admin: "Admin Dashboard", launchApp: "Launch App",
    wet: "Wet Waste", dry: "Dry Waste", plastic: "Plastic", ewaste: "E-Waste",
    smartBin: "Smart Bin Recommendation",
    book: "Book Pickup", schedule: "Schedule",
    sustainability: "Sustainability", sustainabilityScore: "Sustainability Score",
    carbonReduced: "Carbon Reduced", sdgGoal: "SDG 11 Progress",
    sustainableCities: "Sustainable Cities & Communities",
    impactReport: "Impact Report", milestones: "Milestones",
    community: "Community", colleges: "Colleges", apartments: "Apartments",
    ecoBadges: "Eco Badges", level: "Level", nextLevel: "Next level in",
    yourImpact: "Your impact this month",
    streak: "Day streak", rewardsAvailable: "Rewards available",
    pollution: "Pollution prevented",
  },
  hi: {
    appName: "इकोसॉर्ट",
    tagline: "स्मार्ट कचरा पृथक्करण",
    scan: "स्कैन", result: "परिणाम", bins: "डिब्बे", rewards: "पुरस्कार",
    map: "मानचित्र", pickup: "पिकअप", profile: "प्रोफ़ाइल",
    scanItem: "कचरा वस्तु स्कैन करें", pointCamera: "कैमरे को कचरे की ओर रखें",
    detected: "पहचाना गया", confidence: "विश्वास", disposeIn: "इसमें डालें",
    earn: "आपने अर्जित किए", points: "अंक",
    leaderboard: "लीडरबोर्ड", thisMonth: "इस महीने",
    nearbyCenters: "नज़दीकी पुनर्चक्रण केंद्र",
    requestPickup: "पिकअप अनुरोध", largeWaste: "बड़ा कचरा और ई-कचरा",
    monthlyImpact: "मासिक पर्यावरण प्रभाव",
    co2Saved: "CO₂ बचाया", wasteRecycled: "पुनर्चक्रित कचरा", treesEq: "पेड़ समतुल्य",
    home: "होम", admin: "व्यवस्थापक डैशबोर्ड", launchApp: "ऐप खोलें",
    wet: "गीला कचरा", dry: "सूखा कचरा", plastic: "प्लास्टिक", ewaste: "ई-कचरा",
    smartBin: "स्मार्ट बिन सुझाव",
    book: "पिकअप बुक करें", schedule: "अनुसूची",
    sustainability: "सततता", sustainabilityScore: "सततता स्कोर",
    carbonReduced: "कार्बन कम किया", sdgGoal: "SDG 11 प्रगति",
    sustainableCities: "सतत शहर और समुदाय",
    impactReport: "प्रभाव रिपोर्ट", milestones: "उपलब्धियां",
    community: "समुदाय", colleges: "कॉलेज", apartments: "अपार्टमेंट",
    ecoBadges: "इको बैज", level: "स्तर", nextLevel: "अगला स्तर",
    yourImpact: "इस महीने आपका प्रभाव",
    streak: "दिन स्ट्रीक", rewardsAvailable: "पुरस्कार उपलब्ध",
    pollution: "प्रदूषण रोका",
  },
} as const;

type Key = keyof typeof dict["en"];

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string }>({
  lang: "en", setLang: () => {}, t: (k) => k,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = (k: Key) => dict[lang][k] ?? dict.en[k];
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);