import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassPanel({ children, className, hover = false }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl",
        "dark:border-white/[0.08] dark:bg-white/[0.04] dark:shadow-[0_8px_40px_rgba(0,0,0,0.45)]",
        hover &&
          "transition-all duration-500 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_16px_48px_rgba(0,0,0,0.18)] dark:hover:border-white/15",
        className
      )}
    >
      {children}
    </div>
  );
}
