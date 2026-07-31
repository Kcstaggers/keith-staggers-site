export type WorkflowTestCase = {
  number: string;
  name: string;
  purpose: string;
  expected: string;
};

export const workflowTestCases: WorkflowTestCase[] = [
  {
    number: "01",
    name: "Normal task",
    purpose: "Use a complete example that the process should handle on an ordinary day.",
    expected: "The process produces a complete result that meets the written standard and is ready for the responsible person to check.",
  },
  {
    number: "02",
    name: "Missing input",
    purpose: "Remove one required source, field, attachment, or instruction.",
    expected: "The process stops, requests the missing information, or returns to the manual method. It does not invent what is missing.",
  },
  {
    number: "03",
    name: "Unusual but valid input",
    purpose: "Use an allowed example with a different length, format, order, or vocabulary.",
    expected: "The process handles the allowed variation or flags it clearly without changing required facts.",
  },
  {
    number: "04",
    name: "Conflicting information",
    purpose: "Provide two approved sources that disagree on a fact or instruction.",
    expected: "The conflict is shown to a person. The process does not quietly choose one source.",
  },
  {
    number: "05",
    name: "Ambiguous or poor-quality input",
    purpose: "Use a safe example that is incomplete, unclear, noisy, or hard to interpret.",
    expected: "The uncertainty stays visible. The process asks for clarification, marks the limit, or returns to the manual method.",
  },
  {
    number: "06",
    name: "Restricted input",
    purpose: "Use a made-up marker that represents prohibited, private, or unapproved material. Do not use real restricted information.",
    expected: "The process blocks or removes the restricted material before using or sending it and tells the person what to do next.",
  },
  {
    number: "07",
    name: "Tool or model unavailable",
    purpose: "Simulate an outage, timeout, expired session, or unavailable integration.",
    expected: "The process stops without losing the source or causing a hidden outside action, and the manual method still works.",
  },
  {
    number: "08",
    name: "Duplicate run",
    purpose: "Run the same approved case twice or repeat the final action.",
    expected: "The process prevents a duplicate message, record, charge, or file, or clearly warns the person before it is used.",
  },
  {
    number: "09",
    name: "Human rejection",
    purpose: "Have the named reviewer reject an output and record the reason.",
    expected: "The rejection and reason are saved for revision. The process cannot treat a rejected result as approved.",
  },
  {
    number: "10",
    name: "Finish manually after a failure",
    purpose: "Stop after part of the task is complete, check what already happened, then finish using the written manual steps.",
    expected: "The person responsible can check what already happened, avoid duplicates, finish manually, and restore the normal process without the builder taking over.",
  },
];
