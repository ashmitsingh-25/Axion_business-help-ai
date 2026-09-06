import Link from "next/link";
import { ArrowRight, LucideIcon, Sparkles } from "lucide-react";

interface WorkflowStage {
  label: string;
  detail: string;
}

interface ModuleCardProps {
  title: string;
  subtitle: string;
  badge: string;
  icon: LucideIcon;
  href: string;
  workflow: WorkflowStage[];
  exampleInteraction: {
    inputLabel: string;
    inputText: string;
    outputLabel: string;
    outputText: string;
    tagText?: string;
  };
}

export function ModuleCard({
  title,
  subtitle,
  badge,
  icon: Icon,
  href,
  workflow,
  exampleInteraction,
}: ModuleCardProps) {
  return (
    <div className="group relative rounded-2xl bg-zinc-900/80 p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-lg">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
              <p className="text-xs text-zinc-400">{subtitle}</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full border bg-zinc-950 text-zinc-300 border-zinc-800 font-mono">
            {badge}
          </span>
        </div>

        {/* Workflow Diagram */}
        <div className="my-5 p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80">
          <div className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider mb-2.5 flex items-center justify-between font-bold">
            <span>Agentic Execution Flow</span>
            <Sparkles className="w-3 h-3 text-blue-400" />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {workflow.map((stg, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center relative"
              >
                <div className="text-[10px] font-bold text-zinc-200">{stg.label}</div>
                <div className="text-[9px] text-zinc-400 mt-0.5 leading-tight">{stg.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Example Interaction Box */}
        <div className="space-y-2 text-xs">
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-850">
            <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              {exampleInteraction.inputLabel}
            </div>
            <p className="text-zinc-300 font-mono text-[11px] leading-relaxed">
              "{exampleInteraction.inputText}"
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-300">
                {exampleInteraction.outputLabel}
              </span>
              {exampleInteraction.tagText && (
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-950 text-blue-300 border border-blue-500/30 font-bold">
                  {exampleInteraction.tagText}
                </span>
              )}
            </div>
            <p className="text-zinc-100 text-[11px] leading-relaxed font-sans font-medium">
              {exampleInteraction.outputText}
            </p>
          </div>
        </div>
      </div>

      {/* Action footer */}
      <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
        <span className="text-xs text-zinc-400">Autonomous Decisioning</span>
        <Link
          href={href}
          className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 group-hover:translate-x-1 transition-all"
        >
          <span>Open Module</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
