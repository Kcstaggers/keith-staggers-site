export type Service = {
  num: string;
  slug: string;
  title: string;
  blurb: string;
  pricing: string;
  lastModified: string;
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
  directBooking?: {
    url: string;
    priceUsd: string;
    durationMinutes: number;
  };
};

export const services: Service[] = [
  {
    num: "01",
    slug: "done-for-you",
    title: "Done-for-You AI Setup",
    blurb:
      "Keith takes one task your team repeats and builds a practical AI-assisted process for it. He tests it, documents it, and teaches your team how to use it.",
    pricing: "Projects from $2,500",
    lastModified: "2026-07-31",
    seoTitle: "Done-for-You AI Automation for Small Teams",
    seoDescription:
      "Keith Staggers builds a tested AI-assisted process for one repetitive task, documents it, and teaches your team how to run it. Projects from $2,500.",
    headline: "Make one repetitive task easier.",
    headlineAccent: "Keith builds the solution for you.",
    intro:
      "Choose this service when your team keeps copying the same information, rewriting the same document, or depending on one person to remember every step. Keith builds the simplest useful solution in tools your team controls, tests it with you, and provides clear instructions.",
    audience: [
      "Leaders and small teams with one task that wastes time every week",
      "Consultants, creators, educators, and service businesses that repeat the same steps",
      "Teams willing to test with sample information that contains no private or restricted records",
      "Organizations that can provide the person, tools, and accounts needed to run the final setup",
    ],
    deliverables: [
      {
        name: "A plain task plan",
        detail: "A short explanation of what happens now, what AI will help with, what a person must check, and what a good result looks like.",
      },
      {
        name: "A working setup",
        detail: "A complete first version built in your team's own accounts and tools whenever possible.",
      },
      {
        name: "Test results",
        detail: "Ten realistic tests showing what worked, what failed, when the process must stop, and what still needs a person's decision.",
      },
      {
        name: "Instructions and team training",
        detail: "A quick-start guide, full instructions, a recorded walkthrough, owner training, and fourteen days of support after delivery.",
      },
    ],
    process: [
      { step: "Choose the task", detail: "Describe one repeated task, who does it, what information starts it, and what a good result looks like." },
      { step: "Agree on the project", detail: "Keith confirms what will be built, what will not be built, the timeline, your responsibilities, and the price in writing." },
      { step: "Build and test", detail: "Keith creates the smallest complete version and checks it against the agreed examples before adding more." },
      { step: "Teach your team", detail: "The person who owns the task learns how to use it, check it, stop it, and return to the manual process if something fails." },
    ],
    faqs: [
      {
        question: "What kind of task is a good fit?",
        answer:
          "A good task repeats, has a clear owner, starts with recognizable information, and produces a result that a person can check. Examples include recurring reports, follow-up drafts, content preparation, and routine document work.",
      },
      {
        question: "Will the setup use my team's accounts?",
        answer:
          "Yes, whenever possible. The goal is to build in accounts and tools your team controls so you are not dependent on Keith after the project ends.",
      },
      {
        question: "What information can we use during testing?",
        answer:
          "Testing begins with sample information that contains no real people, private records, passwords, or restricted material. Do not submit confidential information through the public inquiry form.",
      },
      {
        question: "What happens after the setup is delivered?",
        answer:
          "You receive written instructions, a recorded walkthrough, training for the person who owns the task, a list of known limits, and fourteen days of support.",
      },
    ],
    ctaPrompt: "Tell me which task wastes time, how it works today, and what you want instead. I will tell you whether a done-for-you setup makes sense.",
  },
  {
    num: "02",
    slug: "coaching",
    title: "One-to-One AI Working Session",
    blurb:
      "Bring one task, business problem, or stuck project. Work with Keith for 60 minutes and leave with a useful first version and a written next-step plan.",
    pricing: "$250 · 60 minutes",
    lastModified: "2026-08-09",
    seoTitle: "One-to-One AI Help with Keith Staggers",
    seoDescription:
      "Work directly with Keith Staggers for 60 minutes on one real task or AI project. Leave with a useful first version and receive a written next-step plan. $250.",
    headline: "Bring one real problem.",
    headlineAccent: "Leave with a useful first version.",
    intro:
      "Choose this session when you have a real task to solve but do not know which tool to use or what to do first. Keith works on the task with you, shows where AI can help, and gives you a short plan for what to do next.",
    audience: [
      "Leaders who want practical help with their first useful AI task",
      "Professionals losing time to one repetitive task",
      "Creators or builders whose project has stalled",
      "Small teams deciding what they can do themselves and what they need built",
    ],
    deliverables: [
      { name: "A clear diagnosis", detail: "Keith helps identify what is wasting time, what result matters, and where AI could help." },
      { name: "A live first version", detail: "You create the first useful prompt, process, or prototype together during the session." },
      { name: "Written summary and next-step plan", detail: "Within 48 hours, you receive a written summary, three ordered next steps, and the tools needed to continue." },
      { name: "A small prompt pack", detail: "You receive a focused set of prompts written for the problem you worked on." },
    ],
    process: [
      { step: "Bring one problem", detail: "Share one task, business problem, or stuck project before the session." },
      { step: "Work together", detail: "Spend 60 minutes sharing screens and working on the real task." },
      { step: "Continue with a plan", detail: "Receive a written summary, prompts, and three ordered next steps within 48 hours." },
    ],
    faqs: [
      {
        question: "What should I bring?",
        answer:
          "Bring one real task or project and enough nonconfidential information to work on it. A focused problem produces a more useful hour than a general tour of AI tools.",
      },
      {
        question: "Is this a demonstration of AI products?",
        answer:
          "No. The session focuses on your task. Keith helps you decide what AI can do, what you must check, and how to create the first useful version.",
      },
      {
        question: "What do I receive afterward?",
        answer:
          "Within 48 hours, you receive a written summary, a plan with three ordered next steps, and a small set of prompts tailored to your problem. The session is not recorded automatically. No one should start a recording unless everyone expressly agrees before it begins.",
      },
      {
        question: "Is this the right option for a team?",
        answer:
          "This is a one-to-one working session. Choose team training when several people need shared practice, examples, and follow-up support.",
      },
      {
        question: "How do booking, cancellation, and rescheduling work?",
        answer:
          "Answer three short questions and pay $250 to reserve the session. Cancel at least one business day before the scheduled start for a full refund. Later cancellations and no-shows are not refundable. You may use Cal.com to reschedule before the scheduled start. If Keith cancels, choose a full refund or a rescheduled time.",
      },
      {
        question: "Is a specific result guaranteed?",
        answer:
          "No. The session includes the 60 minutes of work and the stated follow-up, but it cannot guarantee a business, financial, or technical result.",
      },
    ],
    ctaPrompt: "Tell me which task or project is stuck. We will work on one useful first version together.",
    directBooking: {
      url: "https://cal.com/keith-staggers-rpphlg/one-to-one-ai-working-session",
      priceUsd: "250",
      durationMinutes: 60,
    },
  },
  {
    num: "03",
    slug: "training",
    title: "Practical AI Training",
    blurb:
      "Hands-on training using recognizable work. Your team practices with safe sample information and leaves knowing what AI can help with and what people must still check.",
    pricing: "Public class $179 · Team workshops from $3,500",
    lastModified: "2026-07-31",
    seoTitle: "Practical AI Training for Leaders and Teams",
    seoDescription:
      "Hands-on AI training for nurse leaders, operations teams, educators, administrators, and small teams. Practice on real-world tasks using safe sample information.",
    headline: "AI training should be useful",
    headlineAccent: "on the next workday.",
    intro:
      "Choose training when people are experimenting alone, making the same mistakes, or avoiding AI because no one has connected it to their work. Participants practice during the session and leave with clear examples, safety rules, and a guide they can use again.",
    audience: [
      "Nurse leaders and healthcare teams learning to use AI responsibly",
      "Operations and administrative teams carrying repetitive work",
      "Education and professional-development teams building practical skills",
      "Small organizations that want shared rules before buying more tools",
    ],
    deliverables: [
      { name: "Hands-on practice", detail: "Participants work during the session. This is not a product tour or a presentation filled with theory." },
      { name: "Three familiar tasks", detail: "The team applies the lesson to tasks selected before the session." },
      { name: "A reusable guide", detail: "Participants receive example prompts, required checks, safety rules, and clear steps for the chosen work." },
      { name: "A 30-day follow-up", detail: "Keith checks what people used, what got stuck, and what should change after the training." },
    ],
    process: [
      { step: "Choose the work", detail: "Identify the audience, approved tools, and tasks people should be able to handle after the session." },
      { step: "Prepare safe examples", detail: "Keith creates exercises using sample information with no real people or private records." },
      { step: "Practice together", detail: "Participants work through the selected tasks with direct help from Keith." },
      { step: "Use it again", detail: "The team leaves with written instructions and a clear plan for the next workday." },
    ],
    faqs: [
      {
        question: "Is this a general introduction to AI?",
        answer:
          "No. Participants practice selected tasks during the session. The goal is to help people do useful work, not simply show them a list of tools.",
      },
      {
        question: "Can the workshop use examples from our work?",
        answer:
          "Yes, when those examples are safe and specifically approved. Exercises use sample information with no real people or private records unless another source is explicitly cleared in advance.",
      },
      {
        question: "What does the team receive?",
        answer:
          "The team receives three task examples, reusable prompts, required checks, written safety rules, and a structured 30-day follow-up.",
      },
      {
        question: "Are public and private options available?",
        answer:
          "Yes. Public class seats are $179. Private team workshops start at $3,500 and are planned around the audience, selected tasks, and workplace rules.",
      },
    ],
    ctaPrompt: "Tell me what your team needs to do more easily after the training. I will recommend the right format.",
  },
  {
    num: "04",
    slug: "speaking",
    title: "AI Speaking for Leaders and Teams",
    blurb:
      "Practical talks about using AI safely at work, leading through change, and changing careers without losing what you already know.",
    pricing: "Keynotes from $3,500",
    lastModified: "2026-07-31",
    seoTitle: "Practical AI Speaker for Leaders and Teams",
    seoDescription:
      "Book Keith Staggers to speak about using AI safely at work, leadership, and changing careers without losing what you already know. Keynotes from $3,500.",
    headline: "Give your audience a practical way",
    headlineAccent: "to understand AI and change.",
    intro:
      "Keith speaks from three careers where careful decisions matter: 21 years as a Baltimore detective, more than a decade in nursing, and years building with AI. His talks use familiar stories and clear examples so the audience leaves knowing what to do next.",
    audience: [
      "Healthcare conferences that want AI explained clearly for leaders and clinicians",
      "Leadership teams working through new technology and responsibility",
      "Nursing associations and professional-development events",
      "Organizations discussing reinvention, second careers, and practical resilience",
    ],
    deliverables: [
      { name: "Keynote", detail: "A 45 to 60 minute talk tailored to the audience and the result the event needs." },
      { name: "Fireside conversation or Q&A", detail: "A moderated format where the audience can ask practical questions." },
      { name: "Workshop add-on", detail: "Pair the talk with a smaller hands-on session for leaders or teams." },
      { name: "A topic shaped to the room", detail: "Choose practical AI, responsible use, leadership, or professional reinvention." },
    ],
    process: [
      { step: "Discuss the event", detail: "Spend 15 minutes on the audience, format, and result you want." },
      { step: "Shape the talk", detail: "Keith selects the stories, examples, and actions that fit the room." },
      { step: "Deliver", detail: "The talk can be delivered on stage or online with simple production needs." },
    ],
    faqs: [
      {
        question: "What speaking formats are available?",
        answer:
          "Options include a 45 to 60 minute keynote, a moderated fireside conversation or Q&A, and a smaller hands-on workshop.",
      },
      {
        question: "What topics does Keith speak about?",
        answer:
          "Core topics include using AI in real work, responsible AI use, leadership, professional reinvention, and the discipline required to finish useful work.",
      },
      {
        question: "Can the talk be delivered online?",
        answer:
          "Yes. Talks can be delivered on stage or online. The format and production needs are confirmed during the event conversation.",
      },
      {
        question: "Will the talk be tailored to our audience?",
        answer:
          "Yes. Keith discusses the audience, desired result, examples, and stories before finalizing the talk.",
      },
    ],
    ctaPrompt: "Tell me about the event, the audience, and what you want people to understand or do afterward.",
  },
];
