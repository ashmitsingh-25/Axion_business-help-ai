import { PrismaClient } from "@prisma/client";
import {
  MOCK_ORDERS,
  MOCK_INVENTORY_SKUS,
  MOCK_EXPENSES,
  MOCK_POLICIES,
  MOCK_RISKS,
  MOCK_PRICING_INSIGHTS,
  MOCK_CYBER_ASSETS,
  MOCK_SECURITY_CONTROLS,
} from "../lib/mock-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Axion Database Seeding...");

  // 1. Seed Policies
  for (const policy of MOCK_POLICIES) {
    await prisma.policyDocument.upsert({
      where: { id: policy.id },
      update: {},
      create: {
        id: policy.id,
        title: policy.title,
        category: policy.category,
        content: policy.content,
        version: "3.2",
        rules: [],
      },
    });
  }

  // 2. Seed Orders
  for (const order of MOCK_ORDERS) {
    await prisma.order.upsert({
      where: { orderNumber: order.orderNumber },
      update: {},
      create: {
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerTier: order.customerTier,
        totalAmount: order.totalAmount,
        status: order.status,
        items: order.items,
      },
    });
  }

  // 3. Seed Inventory & Suppliers
  for (const sku of MOCK_INVENTORY_SKUS) {
    const item = await prisma.inventoryItem.upsert({
      where: { sku: sku.sku },
      update: {},
      create: {
        id: sku.id,
        sku: sku.sku,
        name: sku.name,
        category: sku.category,
        currentStock: sku.currentStock,
        unitCost: sku.unitCost,
        sellingPrice: sku.sellingPrice,
        dailySalesRate: sku.dailySalesRate,
        daysToStockout: sku.daysToStockout,
        reorderPoint: sku.reorderPoint,
        reorderQuantity: sku.reorderQuantity,
        safetyStock: sku.safetyStock,
        status: sku.status,
      },
    });

    for (const sup of sku.suppliers) {
      await prisma.supplier.upsert({
        where: { id: sup.id },
        update: {},
        create: {
          id: sup.id,
          name: sup.name,
          inventoryItemId: item.id,
          leadTimeDays: sup.leadTimeDays,
          unitCost: sup.unitCost,
          minOrderQuantity: sup.minOrderQuantity,
          reliabilityScore: sup.reliabilityScore,
          isPreferred: sup.isPreferred,
        },
      });
    }
  }

  // 4. Seed Expenses
  for (const exp of MOCK_EXPENSES) {
    await prisma.expenseClaim.upsert({
      where: { claimNumber: exp.claimNumber },
      update: {},
      create: {
        id: exp.id,
        claimNumber: exp.claimNumber,
        employeeName: exp.employeeName,
        employeeRole: exp.employeeRole,
        department: exp.department,
        vendor: exp.vendor,
        category: exp.category,
        amount: exp.amount,
        currency: exp.currency,
        date: new Date(exp.date),
        receiptUrl: exp.receiptUrl,
        status: exp.status,
        confidence: exp.confidence,
        policyLimit: exp.policyLimit,
        violations: exp.violations,
        reasoning: exp.reasoning,
        policyReference: exp.policyReference,
      },
    });
  }

  // 5. Seed Risks
  for (const risk of MOCK_RISKS) {
    await prisma.riskAlert.upsert({
      where: { id: risk.id },
      update: {},
      create: {
        id: risk.id,
        title: risk.title,
        department: risk.department,
        severity: risk.severity,
        description: risk.description,
        suggestedAction: risk.suggestedAction,
        resolved: false,
      },
    });
  }

  // 6. Seed Pricing
  for (const prc of MOCK_PRICING_INSIGHTS) {
    await prisma.pricingInsight.upsert({
      where: { id: prc.id },
      update: {},
      create: {
        id: prc.id,
        sku: prc.sku,
        productName: prc.productName,
        currentPrice: prc.currentPrice,
        recommendedPrice: prc.recommendedPrice,
        competitorAvg: prc.competitorAvg,
        elasticityScore: prc.elasticityScore,
        projectedDemand: prc.projectedDemand,
        projectedRevenue: prc.projectedRevenue,
        reasoning: prc.reasoning,
      },
    });
  }

  // 7. Seed Cyber Assets
  for (const asset of MOCK_CYBER_ASSETS) {
    await prisma.cyberAsset.upsert({
      where: { id: asset.id },
      update: {},
      create: {
        id: asset.id,
        name: asset.name,
        assetType: asset.assetType,
        businessUnit: asset.businessUnit,
        criticalityScore: asset.criticalityScore,
        technicalRiskScore: asset.technicalRiskScore,
        internetExposed: asset.internetExposed,
        environment: asset.environment,
        ipOrHost: asset.ipOrHost,
        dataSensitivity: asset.dataSensitivity,
        revenueDependency: asset.revenueDependency,
        downtimeCostPerHour: asset.downtimeCostPerHour,
        dataBreachPotential: asset.dataBreachPotential,
        incidentProbability: asset.incidentProbability,
        controlEffectiveness: asset.controlEffectiveness,
        owner: asset.owner,
        status: asset.status,
      },
    });
  }

  // 8. Seed Security Controls
  for (const ctrl of MOCK_SECURITY_CONTROLS) {
    await prisma.securityControl.upsert({
      where: { code: ctrl.code },
      update: {},
      create: {
        id: ctrl.id,
        code: ctrl.code,
        name: ctrl.name,
        category: ctrl.category,
        coveragePercent: ctrl.coveragePercent,
        effectivenessPercent: ctrl.effectivenessPercent,
        associatedRiskEal: ctrl.associatedRiskEal,
        potentialRiskReduction: ctrl.potentialRiskReduction,
        annualCost: ctrl.annualCost,
        status: ctrl.status,
        owner: ctrl.owner,
      },
    });
  }

  console.log("✅ Axion Database Seeded Successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

