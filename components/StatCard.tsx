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
    <div className="p-5 rounded-2xl bg-ocean-900/40 border border-ocean-300/15 hover:border-ocean-300/30 hover:bg-ocean-800/50 backdrop-blur-2xl transition-all duration-300 relative overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(94,234,212,0.12)] hover:-translate-y-1 hover:shadow-[0_25px_65px_rgba(0,0,0,0.45),0_0_25px_rgba(32,201,166,0.15)]">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs text-ocean-200/70 font-medium tracking-wide">{title}</span>
          <div className="text-2xl font-extrabold text-white tracking-tight font-sans mt-0.5">{value}</div>
        </div>
        <div className="p-2.5 rounded-xl bg-ocean-500/10 border border-ocean-300/20 text-ocean-300 group-hover:text-white group-hover:bg-ocean-500/20 transition-all shadow-[inset_0_1px_0_0_rgba(94,234,212,0.15)]">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-ocean-300/10">
        {change && (
          <div className="flex items-center gap-1 font-semibold text-ocean-100">
            {trend === "up" ? (
              <TrendingUp className="w-3.5 h-3.5 text-ocean-300" />
            ) : trend === "down" ? (
              <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
            ) : null}
            <span className={trend === "up" ? "text-ocean-200" : trend === "down" ? "text-rose-300" : "text-ocean-200"}>{change}</span>
          </div>
        )}

        {description && <span className="text-ocean-200/60 text-[11px] truncate max-w-[160px]">{description}</span>}
        {badge && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-ocean-500/15 text-ocean-200 border border-ocean-300/25 font-bold">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

