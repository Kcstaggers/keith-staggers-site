export interface WorkflowBookTemplate {
  number: string;
  slug: string;
  title: string;
  fileName: string;
  purpose: string;
  stage: "Understand" | "Set rules" | "Build" | "Test";
}

export const workflowBookCompanion = {
  version: "0.1",
  dateModified: "2026-07-31",
  route: "/workflow-book/",
  description:
    "Ten free text templates for organizing AI work, recording important approvals, testing results, and planning what to do when something fails.",
} as const;

export const workflowBookTemplates: WorkflowBookTemplate[] = [
  {
    number: "01",
    slug: "context",
    title: "Context",
    fileName: "01-CONTEXT-template.md",
    purpose: "Define who you are, what matters now, how you work, and which facts the assistant must not guess.",
    stage: "Understand",
  },
  {
    number: "02",
    slug: "rules",
    title: "Rules",
    fileName: "02-RULES-template.md",
    purpose: "Write down what AI may do automatically, what needs a person's approval, what is prohibited, and how to stop all activity.",
    stage: "Set rules",
  },
  {
    number: "03",
    slug: "current-state",
    title: "Current State",
    fileName: "03-CURRENT-STATE-template.md",
    purpose: "Keep current priorities, active work, blockers, review dates, and directly read measurements in one place.",
    stage: "Understand",
  },
  {
    number: "04",
    slug: "work",
    title: "Work Queue",
    fileName: "04-WORK-template.md",
    purpose: "Limit active work and give each item a responsible person, starting information, next action, clear result, and required evidence.",
    stage: "Build",
  },
  {
    number: "05",
    slug: "proof",
    title: "Proof",
    fileName: "05-PROOF-template.md",
    purpose: "Record what actually happened, the evidence, the external consequence, and what remains unknown.",
    stage: "Test",
  },
  {
    number: "06",
    slug: "automations",
    title: "Scheduled Tasks",
    fileName: "06-AUTOMATIONS-template.md",
    purpose: "Document one scheduled task, including its approved sources, limits, evidence, failure handling, and restart steps.",
    stage: "Build",
  },
  {
    number: "07",
    slug: "workflow-contract",
    title: "Repeated Task Plan",
    fileName: "07-WORKFLOW-CONTRACT-template.md",
    purpose: "Define what starts one repeated task, who owns it, what information it uses, what AI may do, what a good result looks like, and how to finish manually.",
    stage: "Build",
  },
  {
    number: "08",
    slug: "ten-case-test",
    title: "Ten-Example Test",
    fileName: "08-TEN-CASE-TEST-template.md",
    purpose: "Test normal work, missing and conflicting information, private data, money, failures, duplicates, and situations that require a person.",
    stage: "Test",
  },
  {
    number: "09",
    slug: "action-ladder",
    title: "Approval Levels",
    fileName: "09-ACTION-LADDER-template.md",
    purpose: "Decide which actions AI may take and which require a person, especially public actions, money, contracts, identity, and professional decisions.",
    stage: "Set rules",
  },
  {
    number: "10",
    slug: "transfer-recovery",
    title: "Team Handoff and Failure Plan",
    fileName: "10-TRANSFER-RECOVERY-checklist.md",
    purpose: "Check whether another person can use, inspect, stop, and restore the process without the original builder taking over.",
    stage: "Test",
  },
];
