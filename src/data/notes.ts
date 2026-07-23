export type StudioNote = {
  slug: string;
  number: string;
  category: string;
  title: string;
  excerpt: string;
  readingTime: string;
  service: {
    title: string;
    slug: string;
  };
  nextStep: {
    heading: string;
    detail: string;
    label: string;
    href: string;
  };
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
};

export const notes: StudioNote[] = [
  {
    slug: "the-finishing-problem",
    number: "01",
    category: "AI practice",
    title: "Most people do not have an AI problem. They have a finishing problem.",
    excerpt:
      "More prompts will not rescue a process with no finish line. The advantage is knowing what done looks like, then building backward from there.",
    readingTime: "4 min read",
    service: {
      title: "AI Workflow Install Sprint",
      slug: "done-for-you",
    },
    nextStep: {
      heading: "Check the workflow before you build it.",
      detail: "Use the free seven-question readiness check to see whether the work has a clear owner, finish line, human approval point, and safe path.",
      label: "Run the free readiness check",
      href: "/workflow-readiness/",
    },
    sections: [
      {
        heading: "The tool is rarely the bottleneck.",
        paragraphs: [
          "People collect prompts, subscriptions, and half-finished experiments. Then they blame the technology when nothing leaves the building. The problem is usually simpler. Nobody decided what finished means.",
          "A finished thing has a purpose, an audience, a deadline, and a standard. Without those four decisions, AI creates more options. Options feel productive right up until they become another folder you never open.",
        ],
      },
      {
        heading: "Start with the last mile.",
        paragraphs: [
          "Before I make anything, I ask where it has to land. Is this a video that needs to hold attention for thirty seconds? A keynote that needs one idea people repeat the next day? A campaign that needs to make the next action obvious? The destination changes the work.",
          "Then I work backward. What has to be true for this to ship? Which decisions require taste? Which steps can AI accelerate? Which parts need a human to notice when the work is technically correct but emotionally dead?",
        ],
      },
      {
        heading: "Build a finish loop.",
        paragraphs: [
          "A useful creative system is not generate, generate, generate. It is define, make, judge, revise, ship. That loop works for an image, a film, a book, or a business offer. The tools will change. The discipline will not.",
          "The people who win with AI will not be the people who touch the most software. They will be the people who can recognize a strong idea, protect it from distraction, and finish the job.",
        ],
      },
    ],
  },
  {
    slug: "the-monday-morning-test",
    number: "02",
    category: "Team training",
    title: "AI training should change Monday morning.",
    excerpt:
      "If nobody uses anything the next day, the session was entertainment. Good training ends with a working habit, not a folder full of slides.",
    readingTime: "3 min read",
    service: {
      title: "AI training workshops",
      slug: "training",
    },
    nextStep: {
      heading: "Put this to work on your next Monday.",
      detail: "The September 16 cohort is built for nurse managers, assistant managers, and charge nurses who want hands-on practice, not another tool tour.",
      label: "See the Sept 16 cohort",
      href: "/frontline-nurse-leader/",
    },
    sections: [
      {
        heading: "A good demo can still be bad training.",
        paragraphs: [
          "AI demonstrations are easy to make impressive. A polished output appears in seconds and everybody leans forward. Then Monday arrives, the real work returns, and the team does exactly what it did before.",
          "That gap matters. Inspiration has value, but a business cannot measure applause. It can measure time saved, work completed, mistakes avoided, and ideas that made it into the world.",
        ],
      },
      {
        heading: "Train on the work people already own.",
        paragraphs: [
          "The fastest way to make AI useful is to bring it into a real workflow. Use the documents, decisions, and constraints the team faces every week. Generic examples teach a feature. Real examples teach judgment.",
          "People also need permission to ask basic questions and room to make a mess. A workshop should make the technology less mysterious without pretending it is harmless or automatic. Clear guardrails create confidence. Hype creates hesitation later.",
        ],
      },
      {
        heading: "Pass the Monday morning test.",
        paragraphs: [
          "Every person should leave knowing one task they will do differently, one repeatable process they can use, and one boundary they should not cross. That is enough to create momentum.",
          "Training works when the next ordinary workday feels different. The goal is not to turn everyone into an AI expert. The goal is to help capable people become more capable at the work that already matters.",
        ],
      },
    ],
  },
  {
    slug: "three-careers-one-standard",
    number: "03",
    category: "Reinvention",
    title: "Three careers. One standard.",
    excerpt:
      "Detective, nurse leader, creator. The titles changed. The real work stayed the same: read the room, find the pattern, use the tool, finish the job.",
    readingTime: "4 min read",
    service: {
      title: "Keynotes and speaking",
      slug: "speaking",
    },
    nextStep: {
      heading: "See the record behind the reinvention.",
      detail: "The proof page puts the apps, build checks, healthcare books, and independent portfolio boundaries in one place.",
      label: "Open the proof page",
      href: "/proof/",
    },
    sections: [
      {
        heading: "Reinvention is not erasure.",
        paragraphs: [
          "People talk about changing careers like you walk into the new life empty-handed. I never did. Police work taught me to observe before I spoke, separate evidence from noise, and write clearly enough that somebody else could act.",
          "Nursing taught me that expertise means very little if you cannot stay useful when the room gets tense. It taught me to explain complicated things to people who did not have time for a lecture.",
        ],
      },
      {
        heading: "The throughline was the real career.",
        paragraphs: [
          "Now I make music, books, images, and films with AI in the process. That looks like a hard turn from the outside. It does not feel like one from here. I am still reading the room. I am still finding the pattern. I am still choosing the right tool and carrying the work across the line.",
          "The job title was never the whole identity. The standard was. Curiosity, composure, judgment, and follow-through survived every transition because those qualities belonged to me, not the uniform.",
        ],
      },
      {
        heading: "Carry the evidence forward.",
        paragraphs: [
          "If you are starting again, do not ask what part of your past you need to hide. Ask what your past trained you to notice that other people miss. That is not baggage. It is your unfair advantage.",
          "A new tool can change what you produce. A new chapter can change where you produce it. Neither one gets to erase the person who learned how to do hard things before the opportunity arrived.",
        ],
      },
    ],
  },
];
