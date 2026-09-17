import Link from "next/link";
import { Layers, ShieldCheck, Cpu, Database, Terminal, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ocean-950/80 border-t border-ocean-300/15 backdrop-blur-2xl text-ocean-200/70 text-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-ocean-500/30 to-ocean-700/50 border border-ocean-300/30 flex items-center justify-center text-ocean-200 font-bold shadow-[0_0_15px_rgba(32,201,166,0.2)]">
                <Layers className="w-4 h-4 text-ocean-300" />
              </div>
              <span className="text-base font-black text-white tracking-tight font-sans">AXION</span>
            </div>
            <p className="text-xs leading-relaxed text-ocean-200/60 max-w-xs">
              Autonomous decision and cyber risk intelligence layer for modern enterprise operations.
            </p>
          </div>

          {/* Col 2: Modules */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">
              Core Modules
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-ocean-300 transition-colors">
                  Overview Console
                </Link>
              </li>
              <li>
                <Link href="/cyber-risk" className="hover:text-ocean-300 transition-colors">
                  Cyber Risk Intelligence
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-ocean-300 transition-colors">
                  Decision Copilot
                </Link>
              </li>
              <li>
                <Link href="/inventory" className="hover:text-ocean-300 transition-colors">
                  Demand & Inventory
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-ocean-300 transition-colors">
                  Smart Exchange
                </Link>
              </li>
              <li>
                <Link href="/expenses" className="hover:text-ocean-300 transition-colors">
                  AI Expense Auditor
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Cyber Risk Direct Views */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">
              Cyber Risk Views
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/cyber-risk?role=EXECUTIVE#executive-view" className="hover:text-ocean-300 transition-colors">
                  Executive Board View
                </Link>
              </li>
              <li>
                <Link href="/cyber-risk?role=CISO#ciso-view" className="hover:text-ocean-300 transition-colors">
                  CISO Command
                </Link>
              </li>
              <li>
                <Link href="/cyber-risk/investments" className="hover:text-ocean-300 transition-colors">
                  Investment Optimizer
                </Link>
              </li>
              <li>
                <Link href="/cyber-risk/compliance" className="hover:text-ocean-300 transition-colors">
                  Compliance Matrix
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Decision Stack */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">
              Decision Stack
            </div>
            <ul className="space-y-1.5 text-xs text-ocean-200/60">
              <li className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-ocean-300" />
                <span>Claude 3.5 Sonnet SDK</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-ocean-300" />
                <span>Prisma ORM & PostgreSQL</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-ocean-300" />
                <span>0/1 Knapsack ROSI Engine</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-ocean-300/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-ocean-200/50">
          <div>© 2026 Axion Technologies. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ocean-400" />
            <span className="text-ocean-300">Claude 3.5 Sonnet Connected</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
