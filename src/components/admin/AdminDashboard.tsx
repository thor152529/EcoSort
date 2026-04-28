import { useMemo } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area, PieChart, Pie, Cell, CartesianGrid } from "recharts";
import { Recycle, Users, AlertTriangle, TrendingUp, Leaf, MapPin, ArrowUp, ArrowDown, Filter, Download, Bell, Search, Wind, Building2, Target, Trophy, GraduationCap, Sparkles } from "lucide-react";

const trend = [
  { d: "Mon", wet: 240, dry: 180, plastic: 120, ewaste: 40 },
  { d: "Tue", wet: 310, dry: 220, plastic: 150, ewaste: 60 },
  { d: "Wed", wet: 280, dry: 260, plastic: 180, ewaste: 55 },
  { d: "Thu", wet: 350, dry: 240, plastic: 200, ewaste: 80 },
  { d: "Fri", wet: 410, dry: 300, plastic: 230, ewaste: 90 },
  { d: "Sat", wet: 380, dry: 280, plastic: 210, ewaste: 70 },
  { d: "Sun", wet: 320, dry: 260, plastic: 190, ewaste: 65 },
];

const areas = [
  { name: "Sector 12", waste: 4820, change: 12 },
  { name: "Banjara Hills", waste: 4310, change: -4 },
  { name: "Indiranagar", waste: 3995, change: 8 },
  { name: "Koramangala", waste: 3640, change: 22 },
  { name: "Whitefield", waste: 3120, change: -2 },
  { name: "HSR Layout", waste: 2840, change: 5 },
];

const pieData = [
  { name: "Wet", value: 42, color: "hsl(var(--wet))" },
  { name: "Dry", value: 28, color: "hsl(var(--dry))" },
  { name: "Plastic", value: 22, color: "hsl(var(--plastic))" },
  { name: "E-waste", value: 8, color: "hsl(var(--ewaste))" },
];

const complaints = [
  { id: "#C-2841", area: "Sector 12", issue: "Bin overflow near park", time: "12m ago", status: "Open", priority: "high" },
  { id: "#C-2840", area: "Indiranagar", issue: "Missed pickup schedule", time: "1h ago", status: "In Progress", priority: "med" },
  { id: "#C-2839", area: "Koramangala", issue: "E-waste not collected", time: "3h ago", status: "Open", priority: "high" },
  { id: "#C-2838", area: "HSR Layout", issue: "Damaged smart bin sensor", time: "5h ago", status: "Resolved", priority: "low" },
];

const communities = [
  { name: "IIT Bombay", type: "College", icon: GraduationCap, pts: 184820, growth: 18 },
  { name: "Prestige Lakeside", type: "Apartment", icon: Building2, pts: 84820, growth: 12 },
  { name: "Indiranagar Ward", type: "Community", icon: Users, pts: 248820, growth: 22 },
  { name: "BITS Pilani", type: "College", icon: GraduationCap, pts: 162310, growth: 9 },
];

function StatCard({ icon: Icon, label, value, delta, tone }: any) {
  const up = delta >= 0;
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-soft hover:shadow-elevated hover:-translate-y-0.5 transition-all relative overflow-hidden group">
      <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors" />
      <div className="flex items-start justify-between">
        <div className={`relative h-11 w-11 rounded-xl flex items-center justify-center ${tone}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className={`relative text-xs font-bold inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full ${up ? "text-primary bg-primary/10" : "text-destructive bg-destructive/10"}`}>
          {up ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
          {Math.abs(delta)}%
        </span>
      </div>
      <p className="relative mt-4 text-3xl font-bold font-display">{value}</p>
      <p className="relative text-xs text-muted-foreground mt-1 font-medium">{label}</p>
    </div>
  );
}

function Heatmap() {
  // 7x14 grid
  const cells = useMemo(() => Array.from({ length: 7 * 14 }, () => Math.random()), []);
  return (
    <div className="grid grid-cols-14 gap-1" style={{ gridTemplateColumns: "repeat(14, minmax(0, 1fr))" }}>
      {cells.map((v, i) => (
        <div
          key={i}
          className="aspect-square rounded-md"
          style={{ background: `hsl(var(--primary) / ${0.08 + v * 0.85})` }}
          title={`Intensity ${(v * 100).toFixed(0)}%`}
        />
      ))}
    </div>
  );
}

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Topbar */}
      <header className="sticky top-0 z-30 bg-card/70 backdrop-blur-2xl border-b border-border">
        <div className="px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-bold font-display text-base leading-none">EcoSort</p>
              <p className="text-[10px] text-muted-foreground">Municipal Console</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-secondary rounded-xl px-3 py-2 w-80">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search areas, complaints, citizens..." className="bg-transparent outline-none text-sm flex-1" />
          </div>
          <div className="flex items-center gap-2">
            <button className="h-9 w-9 rounded-xl bg-secondary flex items-center justify-center relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full" />
            </button>
            <div className="h-9 w-9 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center text-xs font-bold">MS</div>
          </div>
        </div>
      </header>

      <main className="px-6 lg:px-10 py-8 space-y-6 max-w-[1400px] mx-auto">
        {/* Heading */}
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">Overview</p>
            <h1 className="text-3xl font-bold font-display mt-1">Waste Operations — Bengaluru</h1>
            <p className="text-sm text-muted-foreground">Real-time analytics across 142 wards • Live updates</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 text-xs font-semibold rounded-xl border border-border bg-card inline-flex items-center gap-1.5"><Filter className="h-3.5 w-3.5" /> Last 7 days</button>
            <button className="px-3 py-2 text-xs font-semibold rounded-xl bg-gradient-primary text-primary-foreground inline-flex items-center gap-1.5 shadow-soft hover:shadow-glow transition"><Download className="h-3.5 w-3.5" /> Export</button>
          </div>
        </div>

        {/* WOW row: SDG 11 + Carbon Offset + Sustainability score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-gradient-sdg11 text-sdg11-foreground rounded-2xl p-5 relative overflow-hidden shadow-soft">
            <div className="absolute -right-6 -top-6 opacity-20"><Building2 className="h-32 w-32" /></div>
            <div className="relative">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-sdg11-foreground/20">UN SDG 11</span>
                <Target className="h-3 w-3" />
              </div>
              <p className="text-xs uppercase tracking-wider opacity-80 mt-2">Sustainable Cities</p>
              <p className="text-4xl font-bold font-display mt-1">64<span className="text-xl opacity-80">%</span></p>
              <div className="mt-3 h-2 bg-sdg11-foreground/20 rounded-full overflow-hidden">
                <div className="h-full bg-sdg11-foreground rounded-full" style={{ width: "64%" }} />
              </div>
              <p className="text-[10px] opacity-80 mt-2">+8% vs last quarter • Goal 2030: 90%</p>
            </div>
          </div>

          <div className="bg-gradient-carbon text-primary-foreground rounded-2xl p-5 relative overflow-hidden shadow-soft">
            <div className="absolute -right-6 -top-6 opacity-20"><Wind className="h-32 w-32" /></div>
            <div className="relative">
              <p className="text-xs uppercase tracking-wider opacity-80">Carbon Offset (city-wide)</p>
              <div className="flex items-baseline gap-1 mt-1">
                <p className="text-4xl font-bold font-display">1,284</p>
                <p className="text-sm opacity-80">tonnes CO₂e</p>
              </div>
              <p className="text-[10px] opacity-80 mt-1">≈ 56,000 trees planted equivalent</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[{ l: "Air", v: 78 }, { l: "Water", v: 84 }, { l: "Land", v: 71 }].map((m) => (
                  <div key={m.l}>
                    <div className="text-[9px] opacity-80 flex justify-between"><span>{m.l}</span><span className="font-bold">{m.v}%</span></div>
                    <div className="h-1 bg-primary-foreground/20 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${m.v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-primary text-primary-foreground rounded-2xl p-5 relative overflow-hidden shadow-soft">
            <div className="absolute -right-6 -top-6 opacity-20"><Sparkles className="h-32 w-32" /></div>
            <div className="relative flex items-center gap-4">
              <div className="relative h-20 w-20 flex-shrink-0">
                <div className="absolute inset-0 ring-conic rounded-full animate-spin-slow opacity-90" />
                <div className="absolute inset-1 rounded-full bg-foreground/40 backdrop-blur" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold font-display leading-none">87</p>
                  <p className="text-[8px] opacity-80 uppercase tracking-wider">/ 100</p>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-wider opacity-80">City Sustainability Score</p>
                <p className="text-lg font-bold font-display mt-0.5">Excellent</p>
                <p className="text-[10px] opacity-80 mt-1 leading-snug">Bengaluru ranks #3 nationally among smart cities for waste mgmt.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Recycle} label="Tonnes processed" value="2,847" delta={14} tone="bg-primary/10 text-primary" />
          <StatCard icon={Users} label="Active citizens" value="84.2K" delta={9} tone="bg-dry/10 text-dry" />
          <StatCard icon={TrendingUp} label="Recycling rate" value="68.4%" delta={6} tone="bg-accent/20 text-accent-foreground" />
          <StatCard icon={AlertTriangle} label="Open complaints" value="142" delta={-12} tone="bg-destructive/10 text-destructive" />
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold font-display">Waste category trend</p>
                <p className="text-xs text-muted-foreground">Daily collection in tonnes</p>
              </div>
              <div className="flex gap-3 text-[11px]">
                {[["Wet","wet"],["Dry","dry"],["Plastic","plastic"],["E-waste","ewaste"]].map(([n,c]) => (
                  <span key={n} className="inline-flex items-center gap-1.5"><span className={`h-2 w-2 rounded-full bg-${c}`} />{n}</span>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={trend}>
                <defs>
                  {["wet","dry","plastic","ewaste"].map((k) => (
                    <linearGradient key={k} id={`g-${k}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={`hsl(var(--${k}))`} stopOpacity={0.5} />
                      <stop offset="100%" stopColor={`hsl(var(--${k}))`} stopOpacity={0} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="d" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="wet" stroke="hsl(var(--wet))" fill="url(#g-wet)" strokeWidth={2} />
                <Area type="monotone" dataKey="dry" stroke="hsl(var(--dry))" fill="url(#g-dry)" strokeWidth={2} />
                <Area type="monotone" dataKey="plastic" stroke="hsl(var(--plastic))" fill="url(#g-plastic)" strokeWidth={2} />
                <Area type="monotone" dataKey="ewaste" stroke="hsl(var(--ewaste))" fill="url(#g-ewaste)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-soft">
            <p className="font-semibold font-display">Recycling composition</p>
            <p className="text-xs text-muted-foreground">By category (this month)</p>
            <div className="h-[200px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3}>
                    {pieData.map((p, i) => <Cell key={i} fill={p.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {pieData.map((p) => (
                <div key={p.name} className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: p.color }} />{p.name}</span>
                  <span className="font-semibold">{p.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Heatmap + Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-semibold font-display inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> High-waste zone heatmap</p>
                <p className="text-xs text-muted-foreground">14 days × 7 zones — intensity = tonnage</p>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                Low
                <div className="h-2 w-24 rounded-full" style={{ background: "linear-gradient(90deg, hsl(var(--primary) / 0.1), hsl(var(--primary)))" }} />
                High
              </div>
            </div>
            <Heatmap />
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-soft">
            <p className="font-semibold font-display">Top areas</p>
            <p className="text-xs text-muted-foreground mb-3">Generation this week (kg)</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={areas} layout="vertical" margin={{ left: 8 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} width={90} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="waste" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Citizen participation + Complaints */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-2xl p-5 shadow-soft">
            <p className="font-semibold font-display">Citizen participation</p>
            <p className="text-xs text-muted-foreground mb-3">Daily active scans</p>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="d" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="wet" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div><p className="text-lg font-bold font-display">84.2K</p><p className="text-[10px] text-muted-foreground">Active</p></div>
              <div><p className="text-lg font-bold font-display">+9%</p><p className="text-[10px] text-muted-foreground">Growth</p></div>
              <div><p className="text-lg font-bold font-display">3.4</p><p className="text-[10px] text-muted-foreground">Avg/day</p></div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-card border border-border rounded-2xl shadow-soft overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between border-b border-border">
              <div>
                <p className="font-semibold font-display">Complaint management</p>
                <p className="text-xs text-muted-foreground">{complaints.filter(c => c.status !== "Resolved").length} open • SLA 24h</p>
              </div>
              <button className="text-xs font-semibold text-primary">View all</button>
            </div>
            <div className="divide-y divide-border">
              {complaints.map((c) => (
                <div key={c.id} className="px-5 py-3 flex items-center gap-4 hover:bg-secondary/40">
                  <div className={`h-2 w-2 rounded-full ${c.priority === "high" ? "bg-destructive" : c.priority === "med" ? "bg-wet" : "bg-primary"}`} />
                  <span className="text-xs font-mono text-muted-foreground w-16">{c.id}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{c.issue}</p>
                    <p className="text-[11px] text-muted-foreground">{c.area} • {c.time}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                    c.status === "Resolved" ? "bg-primary/10 text-primary" :
                    c.status === "In Progress" ? "bg-dry/10 text-dry" :
                    "bg-destructive/10 text-destructive"
                  }`}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Smart leaderboard */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold font-display inline-flex items-center gap-2"><Trophy className="h-4 w-4 text-accent-foreground" /> Smart community leaderboard</p>
              <p className="text-xs text-muted-foreground">Top contributors across colleges, apartments and wards</p>
            </div>
            <div className="flex gap-1">
              {["All", "Colleges", "Apartments", "Wards"].map((t, i) => (
                <button key={t} className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {communities.map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={c.name} className="border border-border rounded-xl p-4 hover:shadow-soft transition relative overflow-hidden">
                  <span className="absolute top-3 right-3 text-[9px] font-bold px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">#{i + 1}</span>
                  <div className="h-10 w-10 rounded-xl bg-gradient-mint border border-border flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="mt-3 text-sm font-bold font-display">{c.name}</p>
                  <p className="text-[10px] text-muted-foreground">{c.type}</p>
                  <div className="mt-2 flex items-end justify-between">
                    <p className="text-lg font-bold font-display text-primary font-mono">{(c.pts / 1000).toFixed(1)}K</p>
                    <span className="text-[10px] font-bold text-primary inline-flex items-center"><ArrowUp className="h-3 w-3" />{c.growth}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Areas table */}
        <div className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <p className="font-semibold font-display">Area-wise waste generation</p>
            <p className="text-xs text-muted-foreground">Sorted by volume this week</p>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-xs text-muted-foreground">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">Area</th>
                <th className="text-left px-5 py-3 font-semibold">Volume (kg)</th>
                <th className="text-left px-5 py-3 font-semibold">Recycled</th>
                <th className="text-left px-5 py-3 font-semibold">Trend</th>
                <th className="text-left px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {areas.map((a) => (
                <tr key={a.name} className="border-t border-border hover:bg-secondary/30">
                  <td className="px-5 py-3 font-semibold">{a.name}</td>
                  <td className="px-5 py-3 font-mono">{a.waste.toLocaleString()}</td>
                  <td className="px-5 py-3">{Math.round(a.waste * 0.68).toLocaleString()} kg</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold ${a.change >= 0 ? "text-primary" : "text-destructive"}`}>
                      {a.change >= 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}{Math.abs(a.change)}%
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${a.change > 15 ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>
                      {a.change > 15 ? "Action needed" : "On track"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}