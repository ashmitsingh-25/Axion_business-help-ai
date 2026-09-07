import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  description?: string;
  badge?: string;
}

export function StatCard({
  title,
  value,
  change,
  trend = "up",
  icon: Icon,
  description,
  badge,
}: StatCardProps) {
  return (
    <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/20 backdrop-blur-2xl transition-all duration-200 relative overflow-hidden group shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_10px_30px_-10px_rgba(0,0,0,0.5)]">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs text-zinc-400 font-medium tracking-wide">{title}</span>
          <div className="text-2xl font-extrabold text-white tracking-tight font-sans">{value}</div>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-200 group-hover:text-white transition-colors shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-white/10">
        {change && (
          <div className="flex items-center gap-1 font-semibold text-zinc-200">
            {trend === "up" ? (
              <TrendingUp className="w-3.5 h-3.5 text-zinc-200" />
            ) : trend === "down" ? (
              <TrendingDown className="w-3.5 h-3.5 text-zinc-400" />
            ) : null}
            <span>{change}</span>
          </div>
        )}

        {description && <span className="text-zinc-400 text-[11px]">{description}</span>}
        {badge && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/10 font-bold">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
