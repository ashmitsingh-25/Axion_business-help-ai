"use client";

import { UserCheck, Shield, Terminal } from "lucide-react";

export type UserRole = "EXECUTIVE" | "CISO" | "ANALYST";

interface RoleViewSelectorProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function RoleViewSelector({ currentRole, onRoleChange }: RoleViewSelectorProps) {
  const roles = [
    {
      id: "EXECUTIVE" as const,
      label: "Executive Board",
      subtitle: "Financial Exposure & Investments",
      icon: UserCheck,
    },
    {
      id: "CISO" as const,
      label: "CISO & Risk Lead",
      subtitle: "Controls & Risk Drivers",
      icon: Shield,
    },
    {
      id: "ANALYST" as const,
      label: "Security Analyst",
      subtitle: "CVEs & Raw Telemetry",
      icon: Terminal,
    },
  ];

  return (
    <div className="flex items-center gap-1.5 bg-ocean-950/80 p-1.5 rounded-2xl border border-ocean-300/15 backdrop-blur-md">
      {roles.map((r) => {
        const Icon = r.icon;
        const isActive = currentRole === r.id;
        return (
          <button
            key={r.id}
            onClick={() => onRoleChange(r.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs transition-all ${
              isActive
                ? "bg-ocean-400 text-ocean-950 font-bold shadow-md shadow-ocean-400/20"
                : "text-ocean-200/70 hover:text-white hover:bg-ocean-800/60 font-medium"
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? "text-ocean-950" : "text-ocean-300"}`} />
            <span>{r.label}</span>
          </button>
        );
      })}
    </div>
  );
}

