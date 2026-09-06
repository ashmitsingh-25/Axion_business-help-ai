// Rich Mock Seed Data for Axion Intelligent Business Platform

export const MOCK_ORDERS = [
  {
    id: "ord_88219",
    orderNumber: "ORD-88219",
    customerName: "Aarav Sharma",
    customerEmail: "aarav.sharma@example.com",
    customerTier: "VIP",
    orderDate: "2026-08-28T10:30:00Z",
    totalAmount: 6499,
    status: "DELIVERED",
    items: [
      {
        sku: "SHOE-RUN-42",
        title: "Axion Velocity Pro Running Shoes (Cobalt Blue)",
        size: "UK 9",
        color: "Cobalt Blue",
        price: 6499,
        quantity: 1,
        returnWindowDays: 30,
        inStockAlternatives: ["UK 9.5", "UK 10"],
      },
    ],
  },
  {
    id: "ord_91044",
    orderNumber: "ORD-91044",
    customerName: "Priya Sundaram",
    customerEmail: "priya.s@example.com",
    customerTier: "GOLD",
    orderDate: "2026-08-30T14:15:00Z",
    totalAmount: 12999,
    status: "DELIVERED",
    items: [
      {
        sku: "AUDIO-NC-409",
        title: "Apex ANC Pro Wireless Headphones",
        size: "Standard",
        color: "Midnight Black",
        price: 12999,
        quantity: 1,
        returnWindowDays: 15,
        inStockAlternatives: [],
      },
    ],
  },
  {
    id: "ord_77103",
    orderNumber: "ORD-77103",
    customerName: "Devendra Patel",
    customerEmail: "dev.patel99@example.com",
    customerTier: "STANDARD",
    orderDate: "2026-08-15T09:00:00Z",
    totalAmount: 3299,
    status: "DELIVERED",
    items: [
      {
        sku: "APPAREL-MERINO-02",
        title: "Merino Wool Breathable Pullover",
        size: "L",
        color: "Heather Gray",
        price: 3299,
        quantity: 1,
        returnWindowDays: 14,
        inStockAlternatives: ["XL"],
      },
    ],
  },
];

export const MOCK_INVENTORY_SKUS = [
  {
    id: "sku_409",
    sku: "SKU-409",
    name: "Apex ANC Pro Wireless Headphones",
    category: "Consumer Audio",
    currentStock: 180,
    unitCost: 4800,
    sellingPrice: 12999,
    dailySalesRate: 20.0,
    daysToStockout: 9.0, // Product runs out in 9 days!
    reorderPoint: 220,
    reorderQuantity: 350,
    safetyStock: 80,
    status: "CRITICAL" as const,
    salesTrend: [18, 19, 21, 20, 22, 19, 24, 20, 23, 21, 22, 20, 25, 20],
    suppliers: [
      {
        id: "sup_a",
        name: "Supplier A (Shenzhen Precision Audio)",
        leadTimeDays: 14,
        unitCost: 4500,
        minOrderQuantity: 500,
        reliabilityScore: 0.88,
        isPreferred: false,
      },
      {
        id: "sup_b",
        name: "Supplier B (Bangalore FastTech Electronics)",
        leadTimeDays: 4,
        unitCost: 4750,
        minOrderQuantity: 250,
        reliabilityScore: 0.98,
        isPreferred: true,
      },
    ],
  },
  {
    id: "sku_102",
    sku: "SKU-102",
    name: "Axion Velocity Pro Running Shoes",
    category: "Footwear & Sports",
    currentStock: 450,
    unitCost: 2100,
    sellingPrice: 6499,
    dailySalesRate: 15.0,
    daysToStockout: 30.0,
    reorderPoint: 300,
    reorderQuantity: 400,
    safetyStock: 100,
    status: "HEALTHY" as const,
    salesTrend: [14, 15, 13, 16, 15, 14, 17, 15, 16, 14, 15, 18, 15, 16],
    suppliers: [
      {
        id: "sup_c",
        name: "Supplier Alpha Footwear",
        leadTimeDays: 10,
        unitCost: 2050,
        minOrderQuantity: 300,
        reliabilityScore: 0.94,
        isPreferred: true,
      },
      {
        id: "sup_d",
        name: "Supplier Beta Sole Works",
        leadTimeDays: 7,
        unitCost: 2200,
        minOrderQuantity: 200,
        reliabilityScore: 0.91,
        isPreferred: false,
      },
    ],
  },
  {
    id: "sku_305",
    sku: "SKU-305",
    name: "Urban Hydro-Shield Commuter Backpack",
    category: "Luggage & Gear",
    currentStock: 64,
    unitCost: 1400,
    sellingPrice: 4299,
    dailySalesRate: 8.0,
    daysToStockout: 8.0,
    reorderPoint: 90,
    reorderQuantity: 200,
    safetyStock: 30,
    status: "LOW_STOCK" as const,
    salesTrend: [6, 7, 8, 8, 9, 8, 7, 8, 9, 10, 8, 7, 9, 8],
    suppliers: [
      {
        id: "sup_e",
        name: "Apex Gear Craft Ltd",
        leadTimeDays: 6,
        unitCost: 1350,
        minOrderQuantity: 150,
        reliabilityScore: 0.95,
        isPreferred: true,
      },
      {
        id: "sup_f",
        name: "Global Pack Express",
        leadTimeDays: 3,
        unitCost: 1480,
        minOrderQuantity: 100,
        reliabilityScore: 0.96,
        isPreferred: false,
      },
    ],
  },
  {
    id: "sku_512",
    sku: "SKU-512",
    name: "Ultra-Fast 100W GaN Charging Hub",
    category: "Accessories",
    currentStock: 310,
    unitCost: 850,
    sellingPrice: 2899,
    dailySalesRate: 11.0,
    daysToStockout: 28.1,
    reorderPoint: 200,
    reorderQuantity: 300,
    safetyStock: 60,
    status: "HEALTHY" as const,
    salesTrend: [10, 11, 10, 12, 11, 13, 11, 10, 12, 11, 14, 10, 12, 11],
    suppliers: [
      {
        id: "sup_g",
        name: "PowerVolt Components",
        leadTimeDays: 8,
        unitCost: 820,
        minOrderQuantity: 250,
        reliabilityScore: 0.92,
        isPreferred: true,
      },
    ],
  },
];

export const MOCK_EXPENSES = [
  {
    id: "exp_101",
    claimNumber: "EXP-2026-891",
    employeeName: "Rohan Varma",
    employeeRole: "Senior Enterprise Account Executive",
    department: "Sales & Client Success",
    vendor: "Grand Hyatt Mumbai",
    category: "ACCOMMODATION",
    amount: 18400,
    currency: "INR",
    date: "2026-09-02",
    receiptUrl: "/receipts/hotel_hyatt_mumbai.pdf",
    status: "flagged" as const,
    confidence: 0.97,
    policyLimit: 12000,
    violations: [
      {
        rule: "Tier-1 Metro Accommodation Cap",
        severity: "HIGH" as const,
        description: "Claimed ₹18,400 per night exceeds the corporate standard cap of ₹12,000 for Senior Executives without pre-approval from VP Finance.",
      },
      {
        rule: "Mini-bar / Ancillary Charges",
        severity: "MEDIUM" as const,
        description: "Itemized receipt shows ₹2,400 in personal lounge/mini-bar expenses which are non-reimbursable.",
      },
    ],
    reasoning: "Hotel expense of ₹18,400 exceeds Tier-1 metro policy limit of ₹12,000 by ₹6,400 (53.3% variance). Flagged for manager exception approval or reduction to policy cap.",
    policyReference: "Travel & Expense Policy v3.2 (Section 4.1 - Domestic Lodging Caps)",
  },
  {
    id: "exp_102",
    claimNumber: "EXP-2026-892",
    employeeName: "Ananya Deshmukh",
    employeeRole: "Lead Cloud Infrastructure Engineer",
    department: "Engineering",
    vendor: "Datadog Cloud Monitoring",
    category: "SOFTWARE",
    amount: 82000,
    currency: "INR",
    date: "2026-09-01",
    receiptUrl: "/receipts/datadog_invoice.pdf",
    status: "approved" as const,
    confidence: 0.99,
    policyLimit: 100000,
    violations: [],
    reasoning: "Monthly pre-approved recurring infrastructure tooling invoice matching procurement purchase order PO-66321.",
    policyReference: "Procurement & SaaS Policy v2.0 (Section 2.3 - Cloud Tooling)",
  },
  {
    id: "exp_103",
    claimNumber: "EXP-2026-893",
    employeeName: "Vikram Malhotra",
    employeeRole: "Regional Logistics Manager",
    department: "Operations",
    vendor: "Blue Dart Express Logistics",
    category: "LOGISTICS",
    amount: 34500,
    currency: "INR",
    date: "2026-09-04",
    receiptUrl: "/receipts/bluedart_freight.pdf",
    status: "approved" as const,
    confidence: 0.96,
    policyLimit: 50000,
    violations: [],
    reasoning: "Urgent inventory transfer between Delhi hub and Bangalore fulfillment center within operational contingency budget.",
    policyReference: "Supply Chain Operations Budget Handbook 2026",
  },
];

export const MOCK_POLICIES = [
  {
    id: "pol_travel_01",
    title: "Axion Corporate Travel & Expense Policy v3.2",
    category: "TRAVEL_EXPENSE",
    content: `AXION ENTERPRISE REIMBURSEMENT POLICY (Effective Q3 2026)
1. ACCOMMODATION:
   - Tier-1 Metro Cities (Mumbai, Delhi-NCR, Bangalore): Max ₹12,000 per night inclusive of taxes for Senior Managers and Directors. Max ₹8,500 for Individual Contributors.
   - Tier-2 Cities (Pune, Hyderabad, Chennai, Kolkata): Max ₹8,000 per night.
   - Non-reimbursable: Mini-bar charges, in-room movies, spa, dry cleaning under 4 nights stay.
2. MEALS & CLIENT ENTERTAINMENT:
   - Daily Meal Allowance during travel: Max ₹2,500 per day.
   - Client Entertainment Dinner: Max ₹5,000 per attendee, itemized tax invoice mandatory.
3. FLIGHTS & RAIL:
   - Domestic Travel: Economy class standard on all sectors under 5 hours.
4. SOFTWARE & SUBSCRIPTIONS:
   - Requires IT and Department Head pre-approval. Single items over ₹25,000 require purchase order PO match.`,
  },
  {
    id: "pol_returns_01",
    title: "Customer Returns & Exchange Operational Standard v2.1",
    category: "RETURNS_REFUNDS",
    content: `AXION RETURNS & EXCHANGE DECISION MATRIX
1. SIZING & FIT ISSUES:
   - VIP and Gold Tier customers: Offer instant one-click size exchange with priority zero-wait shipping.
   - If unworn with tags attached within 30 days: Approve exchange immediately. If size is in stock, reserve unit immediately.
2. DEFECTS & DAMAGE:
   - Escalate if claim exceeds ₹15,000 or customer has >3 defect claims in 60 days.
   - Otherwise issue direct replacement with free reverse pickup.
3. REFUND VS EXCHANGE RETENTION:
   - Promote size exchange or store credit + 5% bonus credit over cash refund to maintain retained revenue.`,
  },
];

export const MOCK_RISKS = [
  {
    id: "risk_01",
    title: "SKU-409 Stockout Imminent in 9 Days",
    department: "INVENTORY" as const,
    severity: "CRITICAL" as const,
    description: "Apex ANC Headphones daily velocity increased to 20 units/day. Current stock (180 units) will deplete by Sept 15.",
    suggestedAction: "Trigger emergency purchase order of 350 units with Supplier B (Bangalore FastTech) with 4-day lead time to prevent stockout.",
    impactScore: 94,
    timestamp: "12 mins ago",
  },
  {
    id: "risk_02",
    title: "Expense Policy Overrun Spikes in Sales Dept",
    department: "FINANCE" as const,
    severity: "HIGH" as const,
    description: "3 recent Mumbai travel accommodation claims exceed the ₹12,000 corporate ceiling by an average of 42%.",
    suggestedAction: "Enforce automated pre-trip booking integration with corporate rate partner portal.",
    impactScore: 78,
    timestamp: "45 mins ago",
  },
  {
    id: "risk_03",
    title: "Rising Return Rate on Velocity Pro UK 9",
    department: "CUSTOMER_OPS" as const,
    severity: "MEDIUM" as const,
    description: "Return rate spiked from 4.2% to 11.8% citing 'Runs small compared to standard sizing'.",
    suggestedAction: "Update product page sizing advisory to 'Order 0.5 size up' and auto-recommend UK 9.5 for exchanges.",
    impactScore: 68,
    timestamp: "2 hours ago",
  },
  {
    id: "risk_04",
    title: "Freight Carrier Delay in North Corridor",
    department: "SUPPLY_CHAIN" as const,
    severity: "LOW" as const,
    description: "Regional transit times extended by 24-36 hours due to monsoon weather advisories.",
    suggestedAction: "Auto-adjust promise delivery dates in checkout by +1 business day.",
    impactScore: 42,
    timestamp: "5 hours ago",
  },
];

export const MOCK_PRICING_INSIGHTS = [
  {
    id: "prc_01",
    sku: "SKU-409",
    productName: "Apex ANC Pro Wireless Headphones",
    currentPrice: 12999,
    recommendedPrice: 13999,
    competitorAvg: 14499,
    elasticityScore: 0.62,
    projectedDemand: "-3.5% volume, +8.1% revenue",
    projectedRevenue: "+₹1,82,000/mo net margin",
    confidenceScore: 92,
    reasoning: "High customer sentiment (4.8/5) and low price elasticity (0.62) allows a ₹1,000 upward calibration while remaining ₹500 below key market rival.",
  },
  {
    id: "prc_02",
    sku: "SKU-102",
    productName: "Axion Velocity Pro Running Shoes",
    currentPrice: 6499,
    recommendedPrice: 6199,
    competitorAvg: 6299,
    elasticityScore: 1.45,
    projectedDemand: "+18.2% volume, +11.4% gross revenue",
    projectedRevenue: "+₹94,000/mo margin",
    confidenceScore: 88,
    reasoning: "High price elasticity (1.45). A modest 4.6% discount captures volume in the competitive sports segment.",
  },
];
