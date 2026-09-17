import Link from "next/link";
import { Layers, ShieldCheck, Cpu, Database, Terminal, ArrowUpRight, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ocean-950/80 border-t border-ocean-300/15 backdrop-blur-2xl text-ocean-200/70 text-sm relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-ocean-500/30 to-ocean-700/50 border border-ocean-300/30 flex items-center justify-center text-ocean-200 font-bold shadow-[0_0_15px_rgba(32,201,166,0.2)]">
                <Layers className="w-4 h-4 text-ocean-300" />
              </div>
              <span className="text-lg font-black text-white tracking-tight font-sans">Axion</span>
            </div>
            <p className="text-xs leading-relaxed text-ocean-200/70 max-w-sm">
              The intelligent business operations and decision platform. Converting enterprise telemetry into deterministic, automated business decisions floating over deep real-time intelligence.
            </p>
            <div className="text-xs text-ocean-300 font-mono flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ocean-400 animate-pulse" />
              <span>Positioning: From Data → Intelligence → Action → Optimized Investment</span>
            </div>
          </div>

          {/* Col 2: Modules */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Core Modules
            </div>
            <ul className="space-y-2 text-xs">
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

          {/* Col 3: Architecture & AI */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Decision Stack
            </div>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-ocean-200/70">
                <Cpu className="w-3.5 h-3.5 text-ocean-300" />
                <span>Anthropic Claude SDK</span>
              </li>
              <li className="flex items-center gap-1.5 text-ocean-200/70">
                <Database className="w-3.5 h-3.5 text-ocean-300" />
                <span>Prisma ORM + PostgreSQL</span>
              </li>
              <li className="flex items-center gap-1.5 text-ocean-200/70">
                <ShieldCheck className="w-3.5 h-3.5 text-ocean-300" />
                <span>Enterprise RAG Policy Engine</span>
              </li>
              <li className="flex items-center gap-1.5 text-ocean-200/70">
                <Terminal className="w-3.5 h-3.5 text-ocean-300" />
                <span>Next.js 14 Serverless Routes</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Platform
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="hover:text-ocean-300 transition-colors">
                  Operations Console
                </Link>
              </li>
              <li>
                <Link href="/cyber-risk/investments" className="hover:text-ocean-300 transition-colors">
                  Investment Optimizer
                </Link>
              </li>
              <li>
                <Link href="/cyber-risk/compliance" className="hover:text-ocean-300 transition-colors">
                  Compliance Frameworks
                </Link>
              </li>
              <li>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-ocean-300 transition-colors flex items-center gap-1"
                >
                  <span>Deploy to Vercel</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-ocean-300/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ocean-200/50">
          <div>© 2026 Axion Technologies Inc. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span className="text-ocean-300/80">Powered by Claude 3.5 Sonnet & Next.js</span>
            <span className="w-1 h-1 rounded-full bg-ocean-500" />
            <span>Enterprise Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

