import Link from "next/link";
import { Layers, ShieldCheck, Cpu, Database, Terminal, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-850 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Axion</span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400 max-w-sm">
              The intelligent business operations and decision platform. Converting enterprise telemetry into deterministic, automated business decisions.
            </p>
            <div className="text-xs text-zinc-400 font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Positioning: From Data → Intelligence → Action</span>
            </div>
          </div>

          {/* Col 2: Modules */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Core Modules
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Smart Returns & Exchange
                </Link>
              </li>
              <li>
                <Link href="/inventory" className="hover:text-white transition-colors">
                  Demand & Inventory Copilot
                </Link>
              </li>
              <li>
                <Link href="/expenses" className="hover:text-white transition-colors">
                  AI Expense Policy Auditor
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  Business Decision Copilot
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Architecture & AI */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Decision Stack
            </div>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-zinc-400">
                <Cpu className="w-3.5 h-3.5 text-zinc-300" />
                <span>Anthropic Claude SDK</span>
              </li>
              <li className="flex items-center gap-1.5 text-zinc-400">
                <Database className="w-3.5 h-3.5 text-zinc-400" />
                <span>Prisma ORM + PostgreSQL</span>
              </li>
              <li className="flex items-center gap-1.5 text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-300" />
                <span>Enterprise RAG Policy Engine</span>
              </li>
              <li className="flex items-center gap-1.5 text-zinc-400">
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                <span>Next.js 14 Serverless Routes</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Platform
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Operations Console
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  Risk & Pricing Monitor
                </Link>
              </li>
              <li>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Deploy to Vercel</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-zinc-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>© 2026 Axion Technologies Inc. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>Powered by Claude 3.5 Sonnet & Next.js</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span>Enterprise Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
