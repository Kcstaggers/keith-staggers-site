export const humanApprovalGate = {
  name: "Human Approval Gate Kit",
  version: "1.0",
  dateCreated: "2026-08-21",
  datePublished: "2026-08-22",
  dateModified: "2026-08-22",
  definition:
    "A human approval gate is a controlled decision point where a named, qualified person checks defined evidence against written criteria before an AI-assisted output may change, send, publish, charge, authorize, or otherwise affect real work.",
  citation:
    "Staggers K. The Human Approval Gate: A Practical Guide to Keeping a Person at the Decision Point in AI-Assisted Work. Version 1.0. Keith Staggers Studio; 2026.",
  clear: [
    {
      letter: "C",
      title: "Consequence held",
      description: "No real-world action occurs before the gate.",
    },
    {
      letter: "L",
      title: "Listed reviewer",
      description: "A named, qualified person owns the decision.",
    },
    {
      letter: "E",
      title: "Evidence checked",
      description: "The reviewer inspects defined evidence, not polish alone.",
    },
    {
      letter: "A",
      title: "Allowed outcomes",
      description: "Accept, revise, reject, and escalate stay available.",
    },
    {
      letter: "R",
      title: "Record and recovery",
      description: "The decision, exact version, reason, and safe response are recorded.",
    },
  ],
  testCases: [
    ["HAG-01", "Routine draft", "Normal operation"],
    ["HAG-02", "Missing owner", "Undefined accountability"],
    ["HAG-03", "Private-data marker", "Sensitive input"],
    ["HAG-04", "Unsupported claim", "Factual fabrication"],
    ["HAG-05", "Conflicting details", "Ambiguous source"],
    ["HAG-06", "High-impact recommendation", "Reviewer mismatch"],
    ["HAG-07", "Duplicate external action", "Idempotency failure"],
    ["HAG-08", "Reviewer rejects", "Override pressure"],
    ["HAG-09", "Tool outage", "Failure recovery"],
    ["HAG-10", "Post-approval change", "Version drift"],
  ],
  files: {
    guide: "/resources/human-approval-gate/human-approval-gate-practitioner-guide-v1.0.pdf",
    worksheet: "/resources/human-approval-gate/human-approval-gate-worksheet-v1.0.pdf",
    csv: "/resources/human-approval-gate/human-approval-gate-test-cases-v1.0.csv",
    json: "/resources/human-approval-gate/human-approval-gate-test-cases-v1.0.json",
    schema: "/resources/human-approval-gate/human-approval-gate-test-cases-v1.0.schema.json",
    guideSource: "/resources/human-approval-gate/human-approval-gate-practitioner-guide-v1.0.md",
    facilitator: "/resources/human-approval-gate/human-approval-gate-facilitator-notes-v1.0.md",
    citation: "/resources/human-approval-gate/CITATION.cff",
    license: "/resources/human-approval-gate/LICENSE.txt",
    checksums: "/resources/human-approval-gate/SHA256SUMS.txt",
    bundle: "/resources/human-approval-gate/human-approval-gate-kit-v1.0.zip",
  },
} as const;
