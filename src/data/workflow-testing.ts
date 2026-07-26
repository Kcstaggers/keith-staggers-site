export type WorkflowTestCase = {
  number: string;
  name: string;
  purpose: string;
  expected: string;
};

export const workflowTestCases: WorkflowTestCase[] = [
  {
    number: "01",
    name: "Normal path",
    purpose: "Use a representative, complete input that the workflow should handle every day.",
    expected: "The workflow produces a complete result that meets the finish line and is ready for the named human review.",
  },
  {
    number: "02",
    name: "Missing input",
    purpose: "Remove one required source, field, attachment, or instruction.",
    expected: "The workflow stops, requests the missing input, or uses the manual path. It does not invent the missing information.",
  },
  {
    number: "03",
    name: "Unusual but valid input",
    purpose: "Use an allowed example with a different length, format, order, or vocabulary.",
    expected: "The workflow handles the allowed variation or flags it clearly without changing required facts.",
  },
  {
    number: "04",
    name: "Conflicting information",
    purpose: "Provide two approved sources that disagree on a fact or instruction.",
    expected: "The conflict is surfaced for a human decision. The workflow does not quietly choose one source.",
  },
  {
    number: "05",
    name: "Ambiguous or poor-quality input",
    purpose: "Use a safe example that is incomplete, unclear, noisy, or hard to interpret.",
    expected: "Uncertainty stays visible. The workflow asks for clarification, marks the limit, or moves to the manual path.",
  },
  {
    number: "06",
    name: "Restricted input",
    purpose: "Use a synthetic marker that represents prohibited, private, or unapproved material. Do not use real restricted data.",
    expected: "The workflow blocks or removes the restricted material before processing or transmission and tells the operator what to do next.",
  },
  {
    number: "07",
    name: "Tool or model unavailable",
    purpose: "Simulate an outage, timeout, expired session, or unavailable integration.",
    expected: "The run stops without losing source material or causing an unseen external action, and the manual fallback remains usable.",
  },
  {
    number: "08",
    name: "Duplicate run",
    purpose: "Run the same approved case twice or repeat the final action.",
    expected: "The workflow prevents a duplicate message, record, charge, or file, or makes the duplicate unmistakably visible before use.",
  },
  {
    number: "09",
    name: "Human rejection",
    purpose: "Have the named reviewer reject an output and record the reason.",
    expected: "The rejection is preserved and routed for revision. The workflow cannot treat a rejected result as approved.",
  },
  {
    number: "10",
    name: "Manual recovery",
    purpose: "Stop after a partial run, inspect what already happened, then finish through the documented manual path.",
    expected: "The owner can verify prior effects, avoid duplication, complete the work manually, and restore the normal workflow without the builder taking over.",
  },
];
