export interface ClientToolOption {
  label: string;
  value: string;
  scores?: Record<string, number>;
}

export interface ClientToolQuestion {
  id: string;
  title: string;
  help: string;
  options: ClientToolOption[];
}

export interface ClientToolOutcome {
  label: string;
  title: string;
  summary: string;
  flow: [string, string, string];
  steps: [string, string, string];
  caution: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ClientToolConfig {
  slug: string;
  title: string;
  description: string;
  studioLabel: string;
  studioHref: string;
  ogImage: string;
  ogImageAlt: string;
  noindex: boolean;
  intro: {
    eyebrow: string;
    title: string;
    summary: string;
    duration: string;
  };
  colors: {
    background: string;
    text: string;
    muted: string;
    rule: string;
    accent: string;
    action: string;
  };
  questions: ClientToolQuestion[];
  criticalGates: Array<{
    questionId: string;
    passValue: string;
  }>;
  resultOrder: string[];
  outcomes: Record<string, ClientToolOutcome>;
  gatedOutcome: ClientToolOutcome;
}

export interface ClientToolScore {
  outcomeKey: string;
  scores: Record<string, number>;
  gated: boolean;
}

const HEX_COLOR = /^#[0-9a-f]{6}$/i;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const unique = (values: string[]) => new Set(values).size === values.length;

const isSafeHref = (value: string) => {
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

export function validateClientToolConfig(tool: ClientToolConfig) {
  const fail = (message: string): never => {
    throw new Error(`Invalid client tool ${tool.slug || "(missing slug)"}: ${message}`);
  };

  if (!SLUG.test(tool.slug)) fail("slug must be lower-case kebab-case");
  if (!tool.title.trim() || !tool.description.trim()) fail("title and description are required");
  if (!tool.studioLabel.trim() || !isSafeHref(tool.studioHref)) fail("brand label or destination is invalid");
  if (!tool.ogImage.startsWith("/")) fail("social image must use an internal absolute path");
  if (!tool.ogImageAlt.trim()) fail("social image alt text is required");
  if (tool.questions.length < 1 || tool.questions.length > 8) fail("use one to eight questions");
  if (tool.resultOrder.length < 3 || tool.resultOrder.length > 4) fail("use three or four result paths");
  if (!unique(tool.resultOrder)) fail("result keys must be unique");
  if (!unique(tool.questions.map((question) => question.id))) fail("question IDs must be unique");

  const resultKeys = new Set(tool.resultOrder);
  const outcomeKeys = Object.keys(tool.outcomes);
  if (outcomeKeys.length !== resultKeys.size || outcomeKeys.some((key) => !resultKeys.has(key))) {
    fail("outcomes must exactly match result order");
  }

  for (const [name, color] of Object.entries(tool.colors)) {
    if (!HEX_COLOR.test(color)) fail(`${name} must be a six-digit hex color`);
  }

  for (const question of tool.questions) {
    if (!question.id.trim() || !question.title.trim() || question.options.length < 2) {
      fail(`question ${question.id || "(missing ID)"} is incomplete`);
    }
    if (!unique(question.options.map((option) => option.value))) {
      fail(`question ${question.id} has duplicate option values`);
    }
    for (const option of question.options) {
      for (const [key, score] of Object.entries(option.scores ?? {})) {
        if (!resultKeys.has(key)) fail(`question ${question.id} scores unknown result ${key}`);
        if (!Number.isFinite(score) || score < 0) fail(`question ${question.id} has an invalid score`);
      }
    }
  }

  const questionsById = new Map(tool.questions.map((question) => [question.id, question]));
  for (const gate of tool.criticalGates) {
    const question = questionsById.get(gate.questionId);
    if (!question) {
      fail(`gate references unknown question ${gate.questionId}`);
      continue;
    }
    if (!question.options.some((option) => option.value === gate.passValue)) {
      fail(`gate ${gate.questionId} has an invalid pass value`);
    }
  }

  for (const outcome of [...Object.values(tool.outcomes), tool.gatedOutcome]) {
    if (!isSafeHref(outcome.ctaHref)) fail(`outcome ${outcome.title} has an invalid call-to-action URL`);
  }

  return tool;
}

export function scoreClientTool(
  tool: ClientToolConfig,
  answers: Record<string, string | undefined>,
): ClientToolScore {
  const scores = Object.fromEntries(tool.resultOrder.map((key) => [key, 0]));

  for (const question of tool.questions) {
    const option = question.options.find((candidate) => candidate.value === answers[question.id]);
    for (const [key, score] of Object.entries(option?.scores ?? {})) {
      scores[key] += score;
    }
  }

  const gatesReady = tool.criticalGates.every(
    (gate) => answers[gate.questionId] === gate.passValue,
  );
  const winner = tool.resultOrder.reduce(
    (best, key) => (scores[key] > scores[best] ? key : best),
    tool.resultOrder[0],
  );

  return {
    outcomeKey: gatesReady ? winner : "gated",
    scores,
    gated: !gatesReady,
  };
}

const workflowOptions = (
  weight: number,
  labels: [string, string, string, string],
): ClientToolOption[] =>
  (["followup", "content", "documents", "research"] as const).map(
    (value, index) => ({ label: labels[index], value, scores: { [value]: weight } }),
  );

export const clientTools: ClientToolConfig[] = [
  {
    slug: "first-ai-workflow",
    title: "First AI Task Finder",
    description:
      "Answer seven questions to choose one repeatable task AI can help draft, organize, or check first, while a person makes the final decision.",
    studioLabel: "Keith Staggers Studio",
    studioHref: "/",
    ogImage: "/media/client-tool-pilot/first-ai-workflow-share.png",
    ogImageAlt: "First AI Task Finder showing three steps: choose a repeated task, get a practical plan, and keep human approval.",
    noindex: true,
    intro: {
      eyebrow: "A two-minute decision tool",
      title: "Find the first repetitive task AI should help with.",
      summary:
        "Choose between client follow-up, content, recurring documents, and research. Seven questions return one safe starting plan.",
      duration: "7 questions · about 2 minutes · no account",
    },
    colors: {
      background: "#050608",
      text: "#f4f6fb",
      muted: "#a8abb7",
      rule: "#303542",
      accent: "#2851ff",
      action: "#ff604d",
    },
    questions: [
      {
        id: "pileup",
        title: "Which bottleneck costs you the most momentum?",
        help: "Choose the delay that creates the biggest drag in a normal week.",
        options: workflowOptions(4, [
          "Good conversations go cold before the next message",
          "Useful expertise stays trapped in notes and conversations",
          "People wait for summaries, briefs, or handoffs",
          "Decisions stall while someone gathers and compares information",
        ]),
      },
      {
        id: "repeat",
        title: "Which job has the clearest repeatable trigger?",
        help: "Pick the work that starts from a recognizable event or input.",
        options: workflowOptions(3, [
          "A call ends, an inquiry arrives, or a check-in becomes due",
          "A question, voice note, or rough idea is ready to shape",
          "A meeting, form, or source packet needs a finished document",
          "A choice appears and the same evidence must be collected",
        ]),
      },
      {
        id: "value",
        title: "Which result would matter most in the next 30 days?",
        help: "Choose the finished output with the clearest near-term payoff.",
        options: workflowOptions(4, [
          "More timely, relevant client or prospect follow-up",
          "One strong idea turned into useful published content",
          "Consistent documents another person can use right away",
          "A sourced comparison that helps someone decide faster",
        ]),
      },
      {
        id: "source",
        title: "Which useful source material already exists?",
        help: "A strong first workflow begins with inputs you already trust.",
        options: [
          {
            label: "Lead lists, call notes, or client history",
            value: "followup",
            scores: { followup: 2 },
          },
          {
            label: "Voice notes, client questions, talks, or rough outlines",
            value: "content",
            scores: { content: 2 },
          },
          {
            label: "Templates, meeting notes, forms, or source documents",
            value: "documents",
            scores: { documents: 2 },
          },
          {
            label: "Trusted websites, product options, or decision criteria",
            value: "research",
            scores: { research: 2 },
          },
        ],
      },
      {
        id: "draft",
        title: "Which draft can one person judge most consistently?",
        help: "Choose the output with a clear reviewer and an obvious finish line.",
        options: workflowOptions(3, [
          "A message checked against the relationship and next step",
          "A useful piece checked for voice, truth, and relevance",
          "A document checked against required sections and source facts",
          "A brief checked for source quality, gaps, and tradeoffs",
        ]),
      },
      {
        id: "approval",
        title: "Can one person review the result before it is used?",
        help: "The first workflow needs a named human decision, not blind automation.",
        options: [
          { label: "Yes, the reviewer and decision are clear", value: "yes" },
          { label: "Not yet", value: "no" },
        ],
      },
      {
        id: "safety",
        title: "Can the job use approved information and a manual fallback?",
        help: "Choose yes only if sensitive material can stay out and the old process still works when needed.",
        options: [
          { label: "Yes, the safe path is clear", value: "yes" },
          { label: "Not yet", value: "no" },
        ],
      },
    ],
    criticalGates: [
      { questionId: "approval", passValue: "yes" },
      { questionId: "safety", passValue: "yes" },
    ],
    resultOrder: ["followup", "content", "documents", "research"],
    outcomes: {
      followup: {
        label: "Your best first build",
        title: "Start with repeatable client follow-up.",
        summary:
          "The opportunity is turning one known client event into a timely, reviewable response without rebuilding the message every time.",
        flow: [
          "One defined trigger",
          "one reviewable follow-up draft",
          "one human-approved message",
        ],
        steps: [
          "Choose one trigger: a new inquiry, completed call, or overdue check-in.",
          "Give AI a fixed source packet: notes, offer facts, boundaries, and the next useful action.",
          "Have one person approve every message before it is sent.",
        ],
        caution:
          "Do not automate sending first. Automate the draft, checks, and handoff.",
        ctaLabel: "Tell Keith about this task",
        ctaHref: "/project-fit/?source=first-ai-workflow-finder",
      },
      content: {
        label: "Your best first build",
        title: "Start by turning one idea into useful content.",
        summary:
          "You already have useful knowledge. The opportunity is turning one source idea into a reviewable piece of content without rebuilding the process every time.",
        flow: [
          "One source note",
          "one useful article or video script",
          "three supporting posts",
        ],
        steps: [
          "Choose one repeatable source: a voice note, client question, or rough outline.",
          "Create one fixed brief for audience, claim boundaries, voice, and final format.",
          "Keep a human approval step before anything is published.",
        ],
        caution:
          "Do not automate publishing first. Automate the draft and quality checks.",
        ctaLabel: "Tell Keith about this task",
        ctaHref: "/project-fit/?source=first-ai-workflow-finder",
      },
      documents: {
        label: "Your best first build",
        title: "Start with a recurring document and handoff.",
        summary:
          "Your best opening is converting known source material into a consistent document that another person can review and use.",
        flow: [
          "Approved source material",
          "one structured draft",
          "one accepted handoff",
        ],
        steps: [
          "Choose one recurring output: a summary, brief, report, checklist, or handoff.",
          "Lock the required sections, source hierarchy, and facts that must be verified.",
          "Test the workflow against normal examples and known exceptions before use.",
        ],
        caution:
          "Do not let AI invent missing facts. Stop and ask when the source is incomplete.",
        ctaLabel: "Tell Keith about this task",
        ctaHref: "/project-fit/?source=first-ai-workflow-finder",
      },
      research: {
        label: "Your best first build",
        title: "Start with a sourced research brief.",
        summary:
          "The opportunity is turning a repeated question and trusted sources into a comparable brief, while keeping the final judgment with a person.",
        flow: [
          "One decision question",
          "one sourced comparison",
          "one human judgment",
        ],
        steps: [
          "Name the decision, the allowed sources, and the date the evidence must be current.",
          "Use one comparison format for options, tradeoffs, missing facts, and confidence.",
          "Require a person to verify sources and make the final decision.",
        ],
        caution:
          "Do not automate the decision. Automate collection, comparison, and missing-source flags.",
        ctaLabel: "Tell Keith about this task",
        ctaHref: "/project-fit/?source=first-ai-workflow-finder",
      },
    },
    gatedOutcome: {
      label: "Your safest first move",
      title: "Define the safe lane before you build.",
      summary:
        "The opportunity may be real, but the workflow is not ready until one person owns the final check and the job has an approved-data path with a manual fallback.",
      flow: [
        "Name the reviewer",
        "define approved inputs",
        "preserve the manual path",
      ],
      steps: [
        "Name the person who accepts, rejects, or corrects the result.",
        "List what information may be used and what must stay out.",
        "Write the manual fallback before adding automation.",
      ],
      caution:
        "A fast unsafe workflow is not a useful workflow. Close these two gates first.",
      ctaLabel: "Use the free workflow guide",
      ctaHref: "/ai-workflow-guide.pdf",
    },
  },
];

export const clientToolBySlug = new Map(
  clientTools.map((tool) => [tool.slug, validateClientToolConfig(tool)]),
);

if (clientToolBySlug.size !== clientTools.length) {
  throw new Error("Client tool slugs must be unique");
}
