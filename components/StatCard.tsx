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
    <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 relative overflow-hidden group shadow-md">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs text-zinc-400 font-medium tracking-wide">{title}</span>
          <div className="text-2xl font-extrabold text-white tracking-tight font-sans">{value}</div>
        </div>
        <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-blue-400 group-hover:text-blue-300 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-zinc-850">
        {change && (
          <div className="flex items-center gap-1 font-semibold text-blue-400">
            {trend === "up" ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : trend === "down" ? (
              <TrendingDown className="w-3.5 h-3.5 text-zinc-400" />
            ) : null}
            <span>{change}</span>
          </div>
        )}

        {description && <span className="text-zinc-400 text-[11px]">{description}</span>}
        {badge && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
