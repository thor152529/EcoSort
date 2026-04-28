import { ReactNode } from "react";

export function PhoneFrame({ children, label, glow = false }: { children: ReactNode; label?: string; glow?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-4 group">
      <div className="relative">
        {glow && (
          <div className="absolute -inset-6 bg-gradient-hero opacity-30 blur-3xl rounded-[3rem] -z-10 animate-gradient-shift" style={{ backgroundSize: "200% 200%" }} />
        )}
        <div className="phone-frame transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-premium">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground/90 rounded-b-2xl z-50" />
          <div className="h-full w-full overflow-y-auto scrollbar-hide bg-background">
            {children}
          </div>
        </div>
      </div>
      {label && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border shadow-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <p className="text-xs font-semibold font-mono text-foreground/80">{label}</p>
        </div>
      )}
    </div>
  );
}