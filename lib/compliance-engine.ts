// Axion Multi-Framework Compliance & Evidence Audit Engine
// Cross-mappings for NIST CSF 2.0, ISO/IEC 27001:2022, CIS Controls v8, RBI CSF, and SEBI CSCRF

import {
  ComplianceFrameworkItem,
  ComplianceEvidenceItem,
  MultiFrameworkMappingRow,
} from "./types";
import {
  MOCK_COMPLIANCE_FRAMEWORKS,
  MOCK_COMPLIANCE_EVIDENCE,
  MOCK_MULTI_FRAMEWORK_MAPPINGS,
} from "./mock-data";

/**
 * Get all supported compliance frameworks with compliance scores
 */
export function getComplianceFrameworks(): ComplianceFrameworkItem[] {
  return MOCK_COMPLIANCE_FRAMEWORKS;
}

/**
 * Get specific compliance framework by code
 */
export function getComplianceFrameworkByCode(code: string): ComplianceFrameworkItem | undefined {
  return MOCK_COMPLIANCE_FRAMEWORKS.find(
    (fw) => fw.code.toLowerCase() === code.toLowerCase()
  );
}

/**
 * Get Multi-Framework Control Mappings
 */
export function getMultiFrameworkMappings(): MultiFrameworkMappingRow[] {
  return MOCK_MULTI_FRAMEWORK_MAPPINGS;
}

/**
 * Get Compliance Evidence Trails
 */
export function getComplianceEvidence(frameworkCode?: string): ComplianceEvidenceItem[] {
  if (!frameworkCode || frameworkCode === "ALL") {
    return MOCK_COMPLIANCE_EVIDENCE;
  }
  return MOCK_COMPLIANCE_EVIDENCE.filter(
    (ev) => ev.frameworkCode.toLowerCase() === frameworkCode.toLowerCase()
  );
}

/**
 * Generate structured Executive Compliance & Audit Brief
 */
export function generateExecutiveComplianceBrief(frameworkCode: string = "ALL"): {
  title: string;
  generatedAt: string;
  frameworkSummary: Array<{ name: string; score: number; status: string }>;
  keyFindings: string[];
  immediateRemediationActions: string[];
} {
  const summaries = MOCK_COMPLIANCE_FRAMEWORKS.map((fw) => ({
    name: fw.name,
    score: fw.complianceScorePercent,
    status: fw.status,
  }));

  return {
    title: "Axion Enterprise Cyber Compliance & Regulatory Audit Brief",
    generatedAt: new Date().toISOString(),
    frameworkSummary: summaries,
    keyFindings: [
      "MFA coverage verified at 92% across all corporate and infrastructure endpoints (Compliant with NIST PR.AC-1 & ISO A.9.4.2).",
      "Database & storage volume encryption at 95% with quarterly KMS key rotation (Compliant with RBI Sec-3.1 & SEBI CSCRF-4.1).",
      "Patch Management is partially compliant at 61% due to 3 open critical CVEs on non-production cluster nodes.",
      "Network microsegmentation for Payment Database cluster is at 42% (Deficiency flagged under CIS Control 12).",
    ],
    immediateRemediationActions: [
      "Fund ₹8L automated patching pipeline to lift CIS Control 7 compliance from 61% to 94%.",
      "Deploy Zero Trust microsegmentation for payment database subnet to meet RBI Sec-1.2 mandate.",
      "Issue hardware FIDO2 tokens to remaining 18 infrastructure administrators.",
    ],
  };
}
