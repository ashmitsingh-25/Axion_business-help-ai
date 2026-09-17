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
    <div className="group relative rounded-2xl bg-ocean-900/40 p-6 border border-ocean-300/15 hover:border-ocean-300/35 hover:bg-ocean-800/50 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(94,234,212,0.12)] hover:-translate-y-1 hover:shadow-[0_25px_65px_rgba(0,0,0,0.45),0_0_30px_rgba(32,201,166,0.15)]">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-ocean-500/10 text-ocean-300 border border-ocean-300/20 shadow-[inset_0_1px_0_0_rgba(94,234,212,0.15)] group-hover:bg-ocean-500/20 group-hover:text-white transition-all">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
              <p className="text-xs text-ocean-200/60">{subtitle}</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full border bg-ocean-500/15 text-ocean-200 border-ocean-300/25 font-mono">
            {badge}
          </span>
        </div>

        {/* Workflow Diagram */}
        <div className="my-5 p-3.5 rounded-xl bg-ocean-950/70 border border-ocean-300/10">
          <div className="text-[10px] font-mono uppercase text-ocean-300 tracking-wider mb-2.5 flex items-center justify-between font-bold">
            <span>Agentic Execution Flow</span>
            <Sparkles className="w-3 h-3 text-ocean-300" />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {workflow.map((stg, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-ocean-900/60 border border-ocean-300/10 flex flex-col items-center justify-center relative hover:border-ocean-300/25 transition-colors"
              >
                <div className="text-[10px] font-bold text-ocean-100">{stg.label}</div>
                <div className="text-[9px] text-ocean-200/60 mt-0.5 leading-tight">{stg.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Example Interaction Box */}
        <div className="space-y-2 text-xs">
          <div className="p-3.5 rounded-xl bg-ocean-950/70 border border-ocean-300/10">
            <div className="text-[10px] font-semibold text-ocean-300/80 uppercase tracking-wider mb-1 font-mono">
              {exampleInteraction.inputLabel}
            </div>
            <p className="text-ocean-200/90 font-mono text-[11px] leading-relaxed">
              "{exampleInteraction.inputText}"
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-ocean-500/10 border border-ocean-300/25 shadow-[inset_0_1px_0_0_rgba(94,234,212,0.15)]">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-ocean-200 font-mono">
                {exampleInteraction.outputLabel}
              </span>
              {exampleInteraction.tagText && (
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-ocean-400/20 text-ocean-200 border border-ocean-300/30 font-bold">
                  {exampleInteraction.tagText}
                </span>
              )}
            </div>
            <p className="text-white text-[11px] leading-relaxed font-sans font-medium">
              {exampleInteraction.outputText}
            </p>
          </div>
        </div>
      </div>

      {/* Action footer */}
      <div className="mt-6 pt-4 border-t border-ocean-300/10 flex items-center justify-between">
        <span className="text-xs text-ocean-200/60 font-mono">Autonomous Decisioning</span>
        <Link
          href={href}
          className="flex items-center gap-1.5 text-xs font-semibold text-ocean-200 hover:text-white group-hover:translate-x-1 transition-all"
        >
          <span>Open Module</span>
          <ArrowRight className="w-3.5 h-3.5 text-ocean-300" />
        </Link>
      </div>
    </div>
  );
}

