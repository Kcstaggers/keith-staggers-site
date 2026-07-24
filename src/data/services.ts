export type Service = {
  num: string;
  slug: string;
  title: string;
  blurb: string;
  pricing: string;
  lastModified: string;
  // Landing page fields
  seoTitle: string;
  seoDescription: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  audience: string[];
  deliverables: { name: string; detail: string }[];
  process: { step: string; detail: string }[];
  faqs: { question: string; answer: string }[];
  ctaPrompt: string;
};

export const services: Service[] = [
  {
    num: "01",
    slug: "done-for-you",
    title: "AI Workflow Install Sprint",
    blurb:
      "One repeated job turned into a tested, documented AI-assisted workflow in a client-owned path. You own the system and the human decision stays visible.",
    pricing: "Projects from $2,500",
    lastModified: "2026-07-23",
    seoTitle: "AI Workflow Consulting for Small Teams",
    seoDescription:
      "Turn one repeated job into a tested, documented AI-assisted workflow in a client-owned path. Projects from $2,500.",
    headline: "One repeated job.",
    headlineAccent: "One working system your team can own.",
    intro:
      "Buy this when repeated work keeps living in inboxes, notes, copied prompts, or one person's memory. I map the job, build the smallest useful workflow in your stack, test it against an agreed finish line, and hand it over with documentation and a recovery path.",
    audience: [
      "Consultants, creators, educators, and small service teams with one repeated operational job",
      "Leaders who know the outcome but do not have an internal workflow builder",
      "Teams willing to test with synthetic or approved redacted material",
      "Buyers who can own the production accounts, subscriptions, data connections, and final decisions",
    ],
    deliverables: [
      { name: "Workflow map and boundary", detail: "The current job, owner, input, finish line, AI role, human check, and manual fallback written clearly." },
      { name: "Installed working system", detail: "The smallest complete workflow built inside a client-owned path whenever possible." },
      { name: "Test evidence", detail: "A ten-case golden set, results, known limits, stop conditions, and recovery checks." },
      { name: "Documented handoff", detail: "Quick start, full operating procedure, recorded walkthrough, owner training, and fourteen days of stabilization." },
    ],
    process: [
      { step: "Fit", detail: "Name one repeated job, who owns it, what goes in, and what finished means." },
      { step: "Scope", detail: "Fix the workflow, human check, exclusions, timeline, client responsibilities, and price in writing." },
      { step: "Build and prove", detail: "Review the smallest complete loop and test it against the agreed cases before expansion." },
      { step: "Own it", detail: "Run, check, stop, and recover the workflow without Keith controlling the screen." },
    ],
    faqs: [
      {
        question: "What kind of workflow fits an Install Sprint?",
        answer:
          "One repeated job with a clear owner, recognizable inputs, a finish line, and a named human check. A broad request to automate a department is not ready until one job is isolated.",
      },
      {
        question: "Will the system live in my accounts?",
        answer:
          "The preferred path is client-owned accounts, subscriptions, and data connections. The handoff is designed so your team can run, stop, and recover the workflow without Keith controlling the screen.",
      },
      {
        question: "What material can be used during the build?",
        answer:
          "Testing starts with synthetic or specifically approved redacted material. Protected, confidential, credential, and restricted data should not be submitted through the public inquiry form.",
      },
      {
        question: "What happens after handoff?",
        answer:
          "You receive the operating procedure, recorded walkthrough, owner training, known limits, recovery steps, and fourteen days of stabilization.",
      },
    ],
    ctaPrompt: "Name the repeated job, who owns it, and what finished means. I will tell you whether it is ready for an install sprint.",
  },
  {
    num: "02",
    slug: "coaching",
    title: "AI Jumpstart",
    blurb:
      "One hour on your actual workflow, business problem, or stuck project. Leave with a first solution, a roadmap, and a starter prompt pack.",
    pricing: "$250 · 60 minutes",
    lastModified: "2026-07-23",
    seoTitle: "One-to-One AI Workflow Coaching",
    seoDescription:
      "Work directly with Keith Staggers for one hour on an AI workflow or project. Leave with a recording, written roadmap, and starter prompt pack. $250.",
    headline: "Bring one stuck workflow.",
    headlineAccent: "Leave with the first working version.",
    intro:
      "Buy this when there are too many tools, no clear first move, and an actual project waiting. We work the problem live, identify what AI can assist and what stays human, then leave with a working start and an ordered next-step plan.",
    audience: [
      "Leaders who need a safe first AI workflow",
      "Professionals with one repeated task that keeps stealing time",
      "Builders with an AI project that has stalled",
      "Small teams deciding what to do themselves and what to hire out",
    ],
    deliverables: [
      { name: "Workflow diagnosis", detail: "We identify the repeated work, friction, risk, and actual outcome." },
      { name: "Live build", detail: "We create the first useful prompt, workflow, or prototype together." },
      { name: "Recording and roadmap", detail: "A session recording, three ordered next steps, named tools, and clear DIY and done-for-you boundaries." },
      { name: "Starter prompt pack", detail: "A small set of prompts tailored to the problem we worked." },
    ],
    process: [
      { step: "Book", detail: "Bring one workflow, business problem, or stuck project." },
      { step: "Work", detail: "Sixty minutes, screens shared, focused on the real task." },
      { step: "Roadmap", detail: "Receive the written plan and starter prompt pack within 48 hours." },
    ],
    faqs: [
      {
        question: "What should I bring?",
        answer:
          "Bring one real workflow, business problem, or stuck project and enough nonconfidential context to work on it. A focused problem produces a better hour than a general tour of AI tools.",
      },
      {
        question: "Is this a tool demonstration?",
        answer:
          "No. The session is built around your actual task. We identify the useful AI role, keep the human decisions visible, and build the first working move together.",
      },
      {
        question: "What do I receive afterward?",
        answer:
          "You receive the session recording, a written roadmap with three ordered next steps, and a small starter prompt pack tailored to the problem.",
      },
      {
        question: "Is this the right format for a team?",
        answer:
          "AI Jumpstart is a one-to-one working session. Teams that need a shared method, exercises, and follow-up should use the training offer.",
      },
    ],
    ctaPrompt: "Bring the workflow or project that keeps circling. Leave with a working first move.",
  },
  {
    num: "03",
    slug: "training",
    title: "AI Training",
    blurb:
      "Hands-on training built around real work. Teams practice with synthetic or approved material and leave with a repeatable playbook.",
    pricing: "Public cohort $179 · Team workshops from $3,500",
    lastModified: "2026-07-23",
    seoTitle: "Practical AI Training for Leaders and Teams",
    seoDescription:
      "Hands-on AI training for nurse leaders, operations teams, educators, administrators, and small teams. Build responsible workflows using practical guardrails.",
    headline: "A workshop should change",
    headlineAccent: "the next workday.",
    intro:
      "Buy training when capable people are experimenting alone, repeating the same mistakes, or avoiding AI because nobody has connected it to their real work. We choose the tasks first, use synthetic or approved material, build live, and leave with a playbook.",
    audience: [
      "Nurse leaders and healthcare teams who need practical, responsible adoption",
      "Operations and administrative teams carrying repeated work",
      "Education and professional-development teams building internal capability",
      "Small organizations that need a shared method before buying more tools",
    ],
    deliverables: [
      { name: "Hands-on working session", detail: "Participants build during the session. This is not a product tour or AI overview." },
      { name: "Three mapped workflows", detail: "The team applies the method to tasks selected before the session." },
      { name: "Playbook and prompt patterns", detail: "Reusable inputs, checks, guardrails, and handoff steps for the chosen work." },
      { name: "30-day follow-up", detail: "A structured check so the workflows survive outside the demonstration." },
    ],
    process: [
      { step: "Scope", detail: "Identify the repeated work, approved tools, audience, and operating boundaries." },
      { step: "Prepare", detail: "Build exercises, synthetic examples, and checks around the selected workflows." },
      { step: "Build live", detail: "Participants work through the method with direct coaching." },
      { step: "Embed", detail: "Leave with documented systems and a clear next-use plan." },
    ],
    faqs: [
      {
        question: "Is this a general AI overview?",
        answer:
          "No. Participants work through selected tasks during the session. The goal is a repeatable habit and playbook, not a product tour or a folder of slides.",
      },
      {
        question: "Can the workshop use examples from our work?",
        answer:
          "Yes, when the examples are synthetic or specifically approved for the session. The scope identifies the permitted material, approved tools, and human checks before exercises are built.",
      },
      {
        question: "What does the team leave with?",
        answer:
          "The team leaves with three mapped workflows, reusable prompt and check patterns, documented boundaries, and a structured thirty-day follow-up.",
      },
      {
        question: "Are public and private formats available?",
        answer:
          "Yes. Public cohort seats are $179. Private team workshops start at $3,500 and are scoped around the audience, selected work, and operating boundaries.",
      },
    ],
    ctaPrompt: "Tell me what work the team keeps repeating. I will show you what a practical session can change.",
  },
  {
    num: "04",
    slug: "speaking",
    title: "Speaking",
    blurb:
      "Practical talks on AI adoption, leadership, responsible workflows, and reinvention from someone doing the work now.",
    pricing: "Keynotes from $3,500",
    lastModified: "2026-07-23",
    seoTitle: "Practical AI Speaker for Leaders and Teams",
    seoDescription:
      "Book Keith Staggers to speak on practical AI adoption, leadership, responsible workflows, and professional reinvention. Keynotes from $3,500.",
    headline: "The story earns the room.",
    headlineAccent: "The framework earns the next move.",
    intro:
      "I speak from three careers where judgment matters: 21 years as a Baltimore detective, 11 years in nursing, and years building AI applications and production systems. The story earns attention. The practical framework gives people something useful to do next.",
    audience: [
      "Healthcare conferences that need AI made concrete for leaders and clinicians",
      "Leadership teams navigating adoption, verification, and responsibility",
      "Nursing associations and professional-development events",
      "Organizations exploring reinvention, second careers, and practical resilience",
    ],
    deliverables: [
      { name: "Keynote", detail: "A 45 to 60 minute talk tailored to the room and event outcome." },
      { name: "Fireside or Q&A", detail: "A moderated format where the audience can push into the practical questions." },
      { name: "Workshop add-on", detail: "Pair the talk with a working session for a smaller leadership group." },
      { name: "Custom angle", detail: "Practical AI, leadership, responsible adoption, or reinvention shaped to the room." },
    ],
    process: [
      { step: "Call", detail: "Fifteen minutes on the event, audience, and desired outcome." },
      { step: "Tailor", detail: "The examples, stories, and action framework are shaped to the room." },
      { step: "Deliver", detail: "On stage or virtual, with simple production requirements." },
    ],
    faqs: [
      {
        question: "What speaking formats are available?",
        answer:
          "Formats include a forty-five to sixty-minute keynote, a moderated fireside or Q&A, and a workshop add-on for a smaller group.",
      },
      {
        question: "What topics does Keith speak about?",
        answer:
          "Core topics are practical AI adoption, responsible workflows, leadership, professional reinvention, and the judgment required to finish useful work.",
      },
      {
        question: "Can the session be delivered virtually?",
        answer:
          "Yes. Speaking can be delivered on stage or virtually. The format and production requirements are fixed during the event call.",
      },
      {
        question: "Is the talk tailored to the audience?",
        answer:
          "Yes. The event, audience, desired outcome, examples, stories, and action framework are discussed before the talk is finalized.",
      },
    ],
    ctaPrompt: "Tell me about the event and the room. I will tell you the practical angle I would bring.",
  },
];
