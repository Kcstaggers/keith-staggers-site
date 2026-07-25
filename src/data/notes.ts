export type StudioNote = {
  status: "draft" | "published";
  slug: string;
  number: string;
  category: string;
  title: string;
  seoTitle: string;
  excerpt: string;
  summary: string;
  answerHeading: string;
  keyPoints: string[];
  tags: string[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  readingTime: string;
  datePublished: string;
  dateModified: string;
  related: {
    title: string;
    href: string;
  };
  ctaHeading: string;
  primaryCtaLabel: string;
  relatedNoteSlugs: string[];
  resources: Array<{
    title: string;
    href: string;
    context: string;
  }>;
  sections: Array<{
    heading: string;
    paragraphs: string[];
  }>;
};

export const notes: StudioNote[] = [
  {
    status: "published",
    slug: "the-finishing-problem",
    number: "01",
    category: "AI practice",
    title: "Most people do not have an AI problem. They have a finishing problem.",
    seoTitle: "The AI Finishing Problem",
    excerpt:
      "More prompts will not rescue a process with no finish line. The advantage is knowing what done looks like, then building backward from there.",
    summary:
      "AI creates useful leverage only after the purpose, audience, deadline, and standard are clear. Define the finish line first, then use AI inside a loop of making, judging, revising, and shipping.",
    answerHeading: "Define finished before you generate.",
    keyPoints: [
      "Define the purpose, audience, deadline, and standard before generating more options.",
      "Work backward from where the finished asset must land.",
      "Keep human taste and judgment inside the make, judge, revise, and ship loop.",
    ],
    tags: ["AI workflows", "creative production", "finishing systems"],
    image: {
      src: "/media/notes/the-finishing-problem.png",
      alt: "Finish loop diagram showing define, make, judge, and ship for AI-assisted work",
      width: 1200,
      height: 630,
    },
    readingTime: "4 min read",
    datePublished: "2026-07-11",
    dateModified: "2026-07-25",
    related: {
      title: "The Finish Loop",
      href: "/finish-loop/",
    },
    ctaHeading: "Turn the unfinished work into a finish line.",
    primaryCtaLabel: "Finish the project",
    relatedNoteSlugs: ["ai-workflow-handoff-run-stop-recover", "the-monday-morning-test"],
    resources: [
      {
        title: "Use The Finish Loop",
        href: "/finish-loop/",
        context: "A field system for defining done, making, judging, and shipping.",
      },
      {
        title: "Check a workflow first",
        href: "/workflow-readiness/",
        context: "Seven questions for deciding whether a repeated job is ready to scope.",
      },
    ],
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
    status: "published",
    slug: "the-monday-morning-test",
    number: "02",
    category: "Team training",
    title: "AI training should change Monday morning.",
    seoTitle: "AI Training That Changes Monday Morning",
    excerpt:
      "If nobody uses anything the next day, the session was entertainment. Good training ends with a working habit, not a folder full of slides.",
    summary:
      "Practical AI training should change one real task on the next workday. Teams need to practice on work they already own, leave with one repeatable process, and know the boundaries they should not cross.",
    answerHeading: "Make one workday different.",
    keyPoints: [
      "A polished demonstration is not evidence that a team can use the method.",
      "Train on real work with synthetic or specifically approved material.",
      "End with one task, one repeatable process, and one clear boundary for the next workday.",
    ],
    tags: ["AI training", "team adoption", "responsible AI"],
    image: {
      src: "/media/notes/the-monday-morning-test.png",
      alt: "Practical AI training diagram showing real work, practice, guardrails, and next use",
      width: 1200,
      height: 630,
    },
    readingTime: "3 min read",
    datePublished: "2026-07-11",
    dateModified: "2026-07-25",
    related: {
      title: "AI training workshops",
      href: "/services/training/",
    },
    ctaHeading: "Build training around the work that comes next.",
    primaryCtaLabel: "Plan the training",
    relatedNoteSlugs: ["ai-workflow-handoff-run-stop-recover", "three-careers-one-standard"],
    resources: [
      {
        title: "Explore practical AI training",
        href: "/services/training/",
        context: "Hands-on sessions built around approved or synthetic work.",
      },
      {
        title: "Check workflow readiness",
        href: "/workflow-readiness/",
        context: "Use the seven-question check before turning a training example into a system.",
      },
    ],
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
          "The fastest way to make AI useful is to bring it close to a real workflow. Use synthetic or specifically approved examples shaped around the documents, decisions, and constraints the team faces every week. Generic examples teach a feature. Realistic practice teaches judgment without exposing material that does not belong in the room.",
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
    status: "published",
    slug: "three-careers-one-standard",
    number: "03",
    category: "Reinvention",
    title: "Three careers. One standard.",
    seoTitle: "Three Careers, One Operating Standard",
    excerpt:
      "Detective, nurse leader, creator. The titles changed. The real work stayed the same: read the room, find the pattern, use the tool, finish the job.",
    summary:
      "Career changes do not erase the skills that came before them. Observation, judgment, clear communication, and follow-through connect Keith Staggers' work in investigation, nursing leadership, and AI production.",
    answerHeading: "Carry the operating standard forward.",
    keyPoints: [
      "Reinvention carries forward the skills your earlier work trained you to use.",
      "The durable standard matters more than any one job title.",
      "A new tool can change the output without erasing the person responsible for it.",
    ],
    tags: ["professional reinvention", "leadership", "creative production"],
    image: {
      src: "/media/notes/three-careers-one-standard.png",
      alt: "Three-career diagram connecting detective work, nurse leadership, and AI creation",
      width: 1200,
      height: 630,
    },
    readingTime: "4 min read",
    datePublished: "2026-07-11",
    dateModified: "2026-07-25",
    related: {
      title: "Keynotes and speaking",
      href: "/services/speaking/",
    },
    ctaHeading: "Turn the throughline into a useful room.",
    primaryCtaLabel: "Bring Keith in",
    relatedNoteSlugs: ["the-finishing-problem", "one-idea-six-content-jobs"],
    resources: [
      {
        title: "Read Keith's full story",
        href: "/about/",
        context: "The public career arc and the operating method that connects it.",
      },
      {
        title: "Review the work record",
        href: "/proof/",
        context: "Independent builds, books, and finished production with bounded claims.",
      },
      {
        title: "Explore speaking",
        href: "/services/speaking/",
        context: "Practical talks on adoption, leadership, responsible workflows, and reinvention.",
      },
    ],
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
  {
    status: "published",
    slug: "ai-workflow-handoff-run-stop-recover",
    number: "04",
    category: "Workflow ownership",
    title: "A workflow is not finished until someone else can run, stop, and recover it.",
    seoTitle: "AI Workflow Handoff: Run, Stop, and Recover",
    excerpt:
      "A working demo is still builder-dependent until another capable person can run it, recognize a stop condition, use the manual path, and recover from failure.",
    summary:
      "An AI-assisted workflow is ready for handoff only when a new owner can complete the normal path, stop an unsafe or incomplete run, use the manual fallback, and restore the process without the builder taking over.",
    answerHeading: "Test the owner, stop, and recovery paths.",
    keyPoints: [
      "Name the owner, approved inputs, finish line, and verification step in one short map.",
      "Write stop conditions as observable events, not vague cautions.",
      "Keep a usable manual fallback and recovery path beside the automated one.",
      "Require a reverse demonstration where the new owner runs, stops, and recovers the workflow.",
    ],
    tags: ["AI workflow handoff", "workflow documentation", "operational resilience"],
    image: {
      src: "/media/notes/workflow-handoff.png",
      alt: "AI workflow handoff diagram showing run, stop, recover, and own as four required operator capabilities",
      width: 1200,
      height: 630,
    },
    readingTime: "7 min read",
    datePublished: "2026-07-25",
    dateModified: "2026-07-25",
    related: {
      title: "AI Workflow Install Sprint",
      href: "/services/done-for-you/",
    },
    ctaHeading: "Make the workflow usable without its builder.",
    primaryCtaLabel: "Start with fit questions",
    relatedNoteSlugs: ["the-finishing-problem", "the-monday-morning-test"],
    resources: [
      {
        title: "Review the Install Sprint",
        href: "/services/done-for-you/",
        context: "A tested, documented workflow delivered through a client-owned path.",
      },
      {
        title: "Check workflow readiness",
        href: "/workflow-readiness/",
        context: "Confirm the job has an owner, finish line, test cases, and safe operating path.",
      },
      {
        title: "See the public build record",
        href: "/proof/",
        context: "Bounded evidence from independent builds and finished production.",
      },
    ],
    sections: [
      {
        heading: "Completion belongs to the next operator.",
        paragraphs: [
          "A builder can make almost any system look ready while standing beside it. They know which input is clean, which button matters, which warning can be ignored, and how to repair the run when the happy path breaks. That knowledge can hide inside the person instead of the workflow.",
          "The handoff test changes the definition of done. A workflow is not finished because the builder can demonstrate it. It is finished when the person who owns the work can use it without the builder quietly steering from the next chair. For a solo operator, that person may be future you returning after a month away.",
        ],
      },
      {
        heading: "Start with a one-page operating map.",
        paragraphs: [
          "The map should name the trigger, owner, permitted inputs, AI job, human decision, finish line, output location, and next use. One page is enough when every label is concrete. A long manual cannot rescue a process whose basic ownership is unclear.",
          "Write this map for the person doing the work, not for the person who built the automation. Replace system nicknames with plain actions. Link the approved source location. State where the finished asset appears. If the operator has to remember an unwritten sequence, the handoff is still incomplete.",
        ],
      },
      {
        heading: "Make stop conditions observable.",
        paragraphs: [
          "Be careful is not a stop condition. Missing source, unexpected file type, conflicting instruction, failed acceptance check, unavailable destination, and unapproved input are conditions an operator can recognize. Each one needs a visible state and a next action.",
          "The useful question is not whether the system can fail. It will. The useful question is whether the person using it can tell that it failed before the output becomes ordinary work. A quiet guess is more dangerous than a visible stop because it asks the operator to trust appearance instead of evidence.",
        ],
      },
      {
        heading: "Keep the manual path beside the automated one.",
        paragraphs: [
          "A fallback is not a sentence that says do it manually. It is the actual short path for finishing the job when the model, integration, account, or reviewer is unavailable. The operator should know where the source lives, which template to use, what must be checked, and where the result belongs.",
          "This path protects continuity and also exposes bad automation. If the manual process is faster, clearer, or safer for most cases, the automated version may not deserve to become the default. The fallback gives the owner a real comparison instead of forcing every job through the newest path.",
        ],
      },
      {
        heading: "Teach recovery, not only restart.",
        paragraphs: [
          "Restarting from the beginning can duplicate a message, overwrite a record, or leave two versions of the same output. Recovery begins by showing what already happened. The operator needs a run record, a known output location, and a way to tell whether an external consequence occurred.",
          "Then document the safe choice: resume from a verified checkpoint, move the item to manual handling, or close the failed run and begin again. The exact path depends on the system. The principle is stable. Never make a person guess whether the first attempt already crossed the line.",
        ],
      },
      {
        heading: "Use a reverse demonstration as acceptance.",
        paragraphs: [
          "At handoff, the new owner shares the screen and the builder stays quiet. The owner completes one normal run, explains the verification step, triggers or identifies a stop condition, uses the fallback, and walks through recovery. Questions are recorded and the instructions are corrected after the attempt.",
          "This is stronger than asking whether the documentation makes sense. People often understand a page while reading it and still discover a missing assumption during use. The reverse demonstration turns those assumptions into visible repair work before the workflow carries real volume.",
        ],
      },
      {
        heading: "The publishing workflow for this Note is the example.",
        paragraphs: [
          "This Studio Note begins as one reviewed content record and one image. The site generator turns that record into the article page, Notes archive, homepage entry, RSS item, sitemap entry, social metadata, and AI-readable text. The human decision is approval of the exact public copy and image. The automated job is consistent production, not editorial authority.",
          "The operating map names the files, the approved source, the canonical URL, and the release checks. A verifier confirms titles, descriptions, structured data, internal references, image dimensions, index rules, RSS coverage, and sitemap coverage before a release can pass. The manual path is editing the same content record and running the checks locally. Recovery starts by checking the public URL and deployment record before retrying anything.",
          "A future operator should be able to publish an approved Note from that record, recognize a failed gate, stop the release, and prove what reached production. If that still requires undocumented knowledge from the builder, this workflow is not finished either.",
        ],
      },
    ],
  },
  {
    status: "published",
    slug: "one-idea-six-content-jobs",
    number: "05",
    category: "Content systems",
    title: "One finished idea can do six different content jobs.",
    seoTitle: "Repurpose One Idea Into Six Content Jobs",
    excerpt:
      "Useful content repurposing starts with one finished source, gives each channel a different job, and keeps approval and provenance attached to every public version.",
    summary:
      "Repurpose one evidence-backed source by adapting the lesson to the role of each channel. Keep the website Note canonical, write every version natively, and require exact approval before any social, newsletter, or visual item is published.",
    answerHeading: "Keep one source. Change the job.",
    keyPoints: [
      "Finish and verify one canonical source before creating channel versions.",
      "Give LinkedIn, Facebook, Instagram, X, newsletter, and YouTube different roles.",
      "Preserve the claim source, approval state, visual record, date, and public proof for every item.",
      "Measure each channel by the useful next action it was designed to support.",
    ],
    tags: ["content repurposing", "content workflow", "creator operations"],
    image: {
      src: "/media/notes/one-idea-six-content-jobs.png",
      alt: "Content system diagram showing one canonical source adapted into LinkedIn, Facebook, Instagram, X, newsletter, and YouTube jobs",
      width: 1200,
      height: 630,
    },
    readingTime: "7 min read",
    datePublished: "2026-07-25",
    dateModified: "2026-07-25",
    related: {
      title: "The Finish Loop",
      href: "/finish-loop/",
    },
    ctaHeading: "Build one source worth carrying across the week.",
    primaryCtaLabel: "Finish the source",
    relatedNoteSlugs: ["the-finishing-problem", "three-careers-one-standard"],
    resources: [
      {
        title: "Read all Studio Notes",
        href: "/notes/",
        context: "The canonical archive for Keith's practical AI and production writing.",
      },
      {
        title: "Use The Finish Loop",
        href: "/finish-loop/",
        context: "Define, make, judge, revise, and ship the source before multiplying versions.",
      },
      {
        title: "Review the finished-work record",
        href: "/proof/",
        context: "Public evidence for the work behind the content rather than unsupported outcomes.",
      },
    ],
    sections: [
      {
        heading: "Repurposing begins after the source is finished.",
        paragraphs: [
          "Turning a loose thought into six drafts is not a content system. It is six places for the same uncertainty to spread. The source needs a clear claim, verified facts, a useful structure, and a finish line before the channel work begins.",
          "For this system, a Studio Note is the strongest canonical source when the idea needs a durable explanation. A finished build record, a public video, or a released product can also lead when it carries the evidence. The source is where the complete version lives and where later corrections begin.",
        ],
      },
      {
        heading: "Canonical does not mean copied everywhere.",
        paragraphs: [
          "The source protects the full argument and the evidence. The channel version earns attention in the language and format people expect there. Copying the same caption across every platform ignores why somebody opened that platform in the first place.",
          "Adapt the idea, not the facts. The central claim, limits, and source record stay stable. The hook, pacing, example, visual, and call to action may change because each version has a different job. If a shorter version cannot preserve an important limit, it should point to the source or not run.",
        ],
      },
      {
        heading: "LinkedIn teaches the professional lesson.",
        paragraphs: [
          "LinkedIn should contain a complete native lesson, not a teaser that withholds the useful part. Lead with the work problem, show the method or decision, name the limit, and give the reader one move they can use. One link to the canonical Note is enough when deeper context helps.",
          "The professional version should connect the idea to adoption, leadership, production, or workflow ownership. It does not need a résumé paragraph or an invented business result. Authority comes from making the decision clearer and showing the operating logic behind it.",
        ],
      },
      {
        heading: "Facebook and Instagram carry different kinds of context.",
        paragraphs: [
          "Facebook earns the fuller personal bridge when a real story explains why the idea matters. The audience may know the music, the books, or an earlier chapter of the work. The post can connect that history to the current method without forcing a business pitch into every memory.",
          "Instagram needs visual proof. A process clip, diagram, before-and-after asset, or concise carousel can carry the idea. If the source has nothing worth seeing, the system should skip Instagram instead of putting a paragraph on a portrait and calling it visual content.",
        ],
      },
      {
        heading: "X isolates the insight. The newsletter installs the habit.",
        paragraphs: [
          "X works when one sentence carries a useful distinction, or when a short thread earns each next post. It does not need the full setup from LinkedIn. The strongest line may be the rule, the exception, or the mistake that changed the process.",
          "The newsletter has a different promise. It enters an inbox, so it should give the reader one workflow, one guardrail, and one action. The canonical Note can hold the full system. The email should make one part easier to use this week.",
        ],
      },
      {
        heading: "YouTube demonstrates only what can be shown safely.",
        paragraphs: [
          "A short video should reveal a decision, a visible step, or a finished artifact. A longer demonstration belongs only when the screen can be shown without employer data, private material, secrets, staged customer claims, or a fake result. A script cannot manufacture proof the source does not contain.",
          "The video version needs its own opening, on-screen text, visual sequence, and close. Reading the Note into a camera may preserve the words, but it usually wastes the job video can do: let the viewer see the process move.",
        ],
      },
      {
        heading: "Approval and provenance travel with every version.",
        paragraphs: [
          "Each draft should retain the source moment, claim evidence, channel, exact copy, visual record when present, target time, approval state, and final public proof. If the copy or image changes after approval, that item returns to review. Approval of a text post does not approve a visual package.",
          "This is where automation helps without taking over editorial judgment. It can create the channel-specific files, check required fields, move exact approved items into a queue, and log the public URL. It cannot decide that silence means yes, invent a result, or turn one approval into permission for every derivative.",
        ],
      },
      {
        heading: "This Note is the bounded example.",
        paragraphs: [
          "The source idea is simple: one finished idea can perform different jobs without becoming six unrelated messages. The canonical version is this Note. A LinkedIn adaptation would teach the professional content-system lesson. Facebook would need a genuine personal bridge. Instagram would use the six-job diagram. X would isolate one rule. The newsletter would give one reusable workflow. YouTube would demonstrate the queue only if the screen contains no private material.",
          "Not every version has to publish. Each one must earn its place, pass its own approval rule, and preserve the source boundary. The useful measure is not how many channels received something. It is whether each published version completed the job it was designed to do without weakening the truth of the original.",
        ],
      },
    ],
  },
];

export const publishedNotes = notes.filter((note) => note.status === "published");
