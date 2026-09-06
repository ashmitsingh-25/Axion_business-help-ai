# Axion — Intelligent Business Operations & Decision Platform

> **Positioning:** *"From Data → Intelligence → Action."*

Axion is an enterprise-grade intelligent business operations and decision platform that unifies fragmented departmental data into a single autonomous decision layer. Powered by **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, **Prisma ORM with PostgreSQL**, and **Anthropic Claude 3.5 Sonnet**, Axion automates high-stakes decisions across returns, inventory forecasting, expense compliance, and executive business intelligence.

---

## 🌟 Key Modules & Capabilities

1. **Smart Returns & Exchange Copilot (`/returns`)**
   - Autonomous intake & policy evaluation of return requests.
   - Evaluates customer tiers (VIP/Gold), item conditions, and fraud risk scores.
   - Converts potential cash refunds into retained revenue with automated **1-Click Size Exchanges** (e.g. *Axion Velocity Pro UK 9 → UK 9.5 exchange*).

2. **Demand & Inventory Copilot (`/inventory`)**
   - Real-time sales velocity tracking and statistical days-to-stockout forecasting.
   - Automated multi-supplier comparative optimization (e.g. *Product X runs out in 9 days; Supplier A's 14-day lead time triggers stockout, automatically route 350 units to Supplier B with 4-day lead time*).

3. **AI Expense Policy Auditor (`/expenses`)**
   - Automated 100% receipt and claim compliance against RAG-grounded corporate policies.
   - Instant detection of spending cap overruns (e.g. *Grand Hyatt Mumbai ₹18,400 claimed vs ₹12,000 Tier-1 city cap → flagged with ₹6,400 variance*).

4. **Business Intelligence & Decision Copilot (`/insights`)**
   - Natural language business inquiry powered by Claude 3.5 Sonnet.
   - Strictly structured 5-stage synthesis: **Detect → Investigate → Assess → Recommend → Alert** (e.g. *"Why did sales fall this month?"*).
   - Live cross-department **Risk Detector Feed** and **AI Dynamic Pricing Optimizer**.

5. **Executive Overview Dashboard (`/dashboard`)**
   - Cross-module telemetry, real-time KPI metrics, retained GMV tracking, and recent autonomous decision audit logs.

---

## 🏗️ Architecture & Tech Stack

| Component | Technology | Description |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) | React Server & Client Components, Route Handlers |
| **Language** | TypeScript | Fully typed interfaces, strict mode |
| **Styling** | Tailwind CSS + Glassmorphism | Dark/light SaaS aesthetic with custom glow accents |
| **Database & ORM** | Prisma ORM + PostgreSQL | Works with Neon, Vercel Postgres, Supabase, or Local DB |
| **AI Agent Layer** | Anthropic Claude SDK (`@anthropic-ai/sdk`) | Multi-agent structured reasoning with deterministic fallbacks |
| **RAG Policy Engine** | Semantic Policy Retrieval | RAG policy grounding (gated by `ENABLE_VECTOR_RAG`) |
| **Deployment** | Vercel | Zero-config serverless deployment out of the box |

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx                    # Root layout with fonts, Navbar, and Footer
│   ├── page.tsx                      # High-impact marketing & landing page
│   ├── globals.css                   # Global Tailwind CSS and glassmorphic styling
│   ├── dashboard/page.tsx            # Executive Overview Console
│   ├── returns/page.tsx              # Smart Returns & Exchange Copilot UI
│   ├── inventory/page.tsx            # Demand & Inventory Copilot UI
│   ├── expenses/page.tsx             # AI Expense Policy Auditor UI
│   ├── insights/page.tsx             # Business Intelligence, Chat Copilot & Risk Feed
│   └── api/
│       ├── returns/decide/route.ts   # Returns decision engine (serverless)
│       ├── inventory/forecast/route.ts # Inventory velocity & supplier engine
│       ├── expenses/analyze/route.ts # Expense audit & policy RAG engine
│       └── insights/query/route.ts   # Business Copilot 5-stage reasoning engine
├── components/
│   ├── Navbar.tsx                    # Responsive navigation with active status
│   ├── Footer.tsx                    # Platform footer & architecture links
│   ├── ModuleCard.tsx                # Showcase card with workflow diagrams
│   ├── WorkflowStepper.tsx           # Multi-step agent workflow visualizer
│   ├── ChatPanel.tsx                 # 5-stage Business Decision Copilot chat
│   ├── RiskFeed.tsx                  # Real-time cross-department risk monitor
│   ├── PricingCard.tsx               # AI Dynamic Pricing Optimizer card
│   └── StatCard.tsx                  # Executive KPI metric widget
├── lib/
│   ├── anthropic.ts                  # Anthropic Claude SDK client & agent methods
│   ├── prisma.ts                     # Prisma ORM singleton client
│   ├── forecasting.ts                # Demand velocity & supplier trade-off algorithms
│   ├── policy-rag.ts                 # Policy retrieval & semantic RAG engine
│   ├── mock-data.ts                  # Rich seeded enterprise dataset
│   ├── types.ts                      # TypeScript type definitions
│   └── utils.ts                      # Styling and formatting utility helpers
├── prisma/
│   ├── schema.prisma                 # PostgreSQL database schema
│   └── seed.ts                       # Realistic database seeding script
├── .env.example                      # Environment variables template
└── README.md
```

---

## 🚀 Local Quickstart Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your credentials:
```env
ANTHROPIC_API_KEY="sk-ant-api03-..."
DATABASE_URL="postgresql://postgres:password@localhost:5432/axion_db?schema=public"
```
*(Note: Axion includes built-in smart mock fallbacks. If no API key or DB is provided, the platform runs in full Demo Mode without crashing!)*

### 3. Initialize & Seed Database (Optional for Live DB)
```bash
npx prisma db push
npx prisma db seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploying to Vercel

Axion is built to be deployed to Vercel with zero extra configuration:

1. **Push to GitHub / GitLab / Bitbucket**:
   ```bash
   git init
   git add .
   git commit -m "feat: Initial Axion platform release"
   git push origin main
   ```
2. **Import into Vercel**:
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Select your Axion repository.
3. **Set Environment Variables in Vercel Project Settings**:
   - `ANTHROPIC_API_KEY`: Your Anthropic Claude API Key.
   - `DATABASE_URL`: Your PostgreSQL connection string (e.g. from Vercel Postgres or Neon).
4. **Deploy**:
   - Click **Deploy**. Vercel will automatically build the Next.js App Router application with serverless route handlers.

---

## 🛡️ License

Built with pride by the Axion Technologies team. Enterprise confidential & proprietary.
