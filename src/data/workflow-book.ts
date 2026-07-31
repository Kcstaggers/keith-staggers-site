export interface WorkflowBookTemplate {
  number: string;
  slug: string;
  title: string;
  fileName: string;
  purpose: string;
  stage: "Orient" | "Control" | "Build" | "Prove";
}

export const workflowBookCompanion = {
  version: "0.1",
  dateModified: "2026-07-30",
  route: "/workflow-book/",
  description:
    "Ten free Markdown templates for building a controlled AI operating workspace with context, human approval gates, workflow tests, proof, transfer, and recovery.",
} as const;

export const workflowBookTemplates: WorkflowBookTemplate[] = [
  {
    number: "01",
    slug: "context",
    title: "Context",
    fileName: "01-CONTEXT-template.md",
    purpose: "Define who you are, what matters now, how you work, and which facts the assistant must not guess.",
    stage: "Orient",
  },
  {
    number: "02",
    slug: "rules",
    title: "Rules",
    fileName: "02-RULES-template.md",
    purpose: "Separate automatic internal work, approval-required actions, prohibitions, and the system-wide stop control.",
    stage: "Control",
  },
  {
    number: "03",
    slug: "current-state",
    title: "Current State",
    fileName: "03-CURRENT-STATE-template.md",
    purpose: "Keep current priorities, active work, blockers, review dates, and directly read measurements in one place.",
    stage: "Orient",
  },
  {
    number: "04",
    slug: "work",
    title: "Work Queue",
    fileName: "04-WORK-template.md",
    purpose: "Limit work in progress and give each item an owner, input, executable action, finish line, and proof requirement.",
    stage: "Build",
  },
  {
    number: "05",
    slug: "proof",
    title: "Proof",
    fileName: "05-PROOF-template.md",
    purpose: "Record what actually happened, the evidence, the external consequence, and what remains unknown.",
    stage: "Prove",
  },
  {
    number: "06",
    slug: "automations",
    title: "Automations",
    fileName: "06-AUTOMATIONS-template.md",
    purpose: "Document one scheduled worker with approved sources, limits, evidence, failure handling, and recovery.",
    stage: "Build",
  },
  {
    number: "07",
    slug: "workflow-contract",
    title: "Workflow Contract",
    fileName: "07-WORKFLOW-CONTRACT-template.md",
    purpose: "Define the trigger, owner, input, finish line, AI boundary, exceptions, proof, and manual fallback for one repeated job.",
    stage: "Build",
  },
  {
    number: "08",
    slug: "ten-case-test",
    title: "Ten-Case Test",
    fileName: "08-TEN-CASE-TEST-template.md",
    purpose: "Test the normal path, missing and conflicting inputs, private data, money, failure, duplicates, and escalation.",
    stage: "Prove",
  },
  {
    number: "09",
    slug: "action-ladder",
    title: "Action Ladder",
    fileName: "09-ACTION-LADDER-template.md",
    purpose: "Assign authority according to consequence, from internal reading through public action, money, contracts, and regulated judgment.",
    stage: "Control",
  },
  {
    number: "10",
    slug: "transfer-recovery",
    title: "Transfer and Recovery",
    fileName: "10-TRANSFER-RECOVERY-checklist.md",
    purpose: "Check whether another operator can run, inspect, stop, and recover the system without the original builder taking over.",
    stage: "Prove",
  },
];
