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
                    step.status === "complete" ? "bg-ocean-400/60" : "bg-ocean-300/10"
                  }`}
                />
              )}

              <div className="relative z-10 flex-shrink-0 mt-0.5">
                {step.status === "complete" && (
                  <CheckCircle2 className="w-7 h-7 text-ocean-300 bg-ocean-950 border border-ocean-300/30 rounded-full shadow-[0_0_12px_rgba(32,201,166,0.3)]" />
                )}
                {step.status === "active" && (
                  <div className="w-7 h-7 rounded-full bg-ocean-500/20 border-2 border-ocean-300 flex items-center justify-center shadow-[0_0_15px_rgba(94,234,212,0.4)]">
                    <Loader2 className="w-4 h-4 text-ocean-200 animate-spin" />
                  </div>
                )}
                {step.status === "pending" && (
                  <Circle className="w-7 h-7 text-ocean-800 bg-ocean-950 rounded-full border border-ocean-300/10" />
                )}
              </div>

              <div className="flex-1 pb-2">
                <div className="text-xs font-semibold text-white tracking-wide">{step.title}</div>
                {step.description && (
                  <p className="text-[11px] text-ocean-200/60 mt-0.5 leading-relaxed">
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
                    <div className="w-7 h-7 rounded-full bg-ocean-500/20 border border-ocean-300/40 flex items-center justify-center shadow-[0_0_12px_rgba(32,201,166,0.25)]">
                      <CheckCircle2 className="w-4 h-4 text-ocean-300" />
                    </div>
                  )}
                  {step.status === "active" && (
                    <div className="w-7 h-7 rounded-full bg-ocean-500/30 border-2 border-ocean-300 flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(94,234,212,0.4)]">
                      <Loader2 className="w-4 h-4 text-ocean-100 animate-spin" />
                    </div>
                  )}
                  {step.status === "pending" && (
                    <div className="w-7 h-7 rounded-full bg-ocean-950 border border-ocean-300/15 flex items-center justify-center text-[11px] text-ocean-400/50 font-mono font-bold">
                      0{index + 1}
                    </div>
                  )}
                </div>
                <div className="text-[11px] font-semibold text-ocean-100 whitespace-nowrap">
                  {step.title}
                </div>
                {step.description && (
                  <span className="text-[9px] text-ocean-200/60 mt-0.5 line-clamp-1 font-mono">
                    {step.description}
                  </span>
                )}
              </div>

              {!isLast && (
                <div className="flex-1 h-[2px] bg-ocean-900/80 mx-2 relative -top-3">
                  <div
                    className={`h-full transition-all duration-300 ${
                      step.status === "complete" ? "bg-ocean-400/60 w-full" : "w-0"
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

