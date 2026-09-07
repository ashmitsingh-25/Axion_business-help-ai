"use client";

import { CheckCircle2, Loader2, Circle } from "lucide-react";

export interface StepItem {
  id: string;
  title: string;
  description?: string;
  status: "complete" | "active" | "pending" | "failed";
}

interface WorkflowStepperProps {
  steps: StepItem[];
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function WorkflowStepper({
  steps,
  orientation = "horizontal",
  className = "",
}: WorkflowStepperProps) {
  if (orientation === "vertical") {
    return (
      <div className={`space-y-4 ${className}`}>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <div key={step.id} className="relative flex items-start gap-3">
              {!isLast && (
                <div
                  className={`absolute left-3.5 top-7 bottom-0 w-[2px] -mb-4 ${
                    step.status === "complete" ? "bg-white/40" : "bg-white/5"
                  }`}
                />
              )}

              <div className="relative z-10 flex-shrink-0 mt-0.5">
                {step.status === "complete" && (
                  <CheckCircle2 className="w-7 h-7 text-zinc-100 bg-zinc-900 border border-white/20 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.15)]" />
                )}
                {step.status === "active" && (
                  <div className="w-7 h-7 rounded-full bg-white/10 border-2 border-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  </div>
                )}
                {step.status === "pending" && (
                  <Circle className="w-7 h-7 text-zinc-700 bg-zinc-950 rounded-full" />
                )}
              </div>

              <div className="flex-1 pb-2">
                <div className="text-xs font-semibold text-white tracking-wide">{step.title}</div>
                {step.description && (
                  <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <div className="flex items-center min-w-[500px] justify-between relative py-2">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center text-center px-2">
                <div className="mb-2">
                  {step.status === "complete" && (
                    <div className="w-7 h-7 rounded-full bg-white/10 border border-white/30 flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.15)]">
                      <CheckCircle2 className="w-4 h-4 text-zinc-100" />
                    </div>
                  )}
                  {step.status === "active" && (
                    <div className="w-7 h-7 rounded-full bg-white/10 border-2 border-white flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.25)]">
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    </div>
                  )}
                  {step.status === "pending" && (
                    <div className="w-7 h-7 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-[11px] text-zinc-500 font-mono font-bold">
                      {index + 1}
                    </div>
                  )}
                </div>
                <div className="text-[11px] font-semibold text-zinc-200 whitespace-nowrap">
                  {step.title}
                </div>
                {step.description && (
                  <span className="text-[9px] text-zinc-400 mt-0.5 line-clamp-1">
                    {step.description}
                  </span>
                )}
              </div>

              {!isLast && (
                <div className="flex-1 h-[2px] bg-white/5 mx-2 relative -top-3">
                  <div
                    className={`h-full transition-all duration-300 ${
                      step.status === "complete" ? "bg-white/40 w-full" : "w-0"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
