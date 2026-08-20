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
  showCallout?: boolean;
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
  articleBodyHtml?: string;
};

export const notes: StudioNote[] = [
  {
    status: "published",
    slug: "the-finishing-problem",
    number: "01",
    category: "Finishing projects",
    title: "Why AI keeps giving you more drafts instead of a finished result.",
    seoTitle: "How to Finish AI-Assisted Projects",
    excerpt:
      "AI can create ideas quickly, but it cannot decide what finished means for you. Choose the result first, then use AI to help you reach it.",
    summary:
      "Before asking AI for more options, decide the purpose, audience, deadline, and quality standard. Then use AI to help make, review, revise, and finish the work.",
    answerHeading: "Decide what finished looks like before asking AI for more.",
    keyPoints: [
      "Write down the purpose, audience, deadline, and quality standard before generating more options.",
      "Start with where the finished work needs to be used or published.",
      "Let AI help with drafts while you choose, edit, and approve the final result.",
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
    ctaHeading: "Choose one project and decide what finished looks like.",
    primaryCtaLabel: "Finish the project",
    relatedNoteSlugs: ["ai-workflow-handoff-run-stop-recover", "the-monday-morning-test"],
    resources: [
      {
        title: "Use The Finish Loop",
        href: "/finish-loop/",
        context: "A $49 do-it-yourself toolkit for choosing, finishing, and releasing a creative project.",
      },
      {
        title: "See if a task is ready for AI",
        href: "/workflow-readiness/",
        context: "Answer seven plain questions before you spend money or add another tool.",
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
    title: "How to make AI training useful on the next workday.",
    seoTitle: "How to Make AI Training Useful at Work",
    excerpt:
      "If nobody uses anything the next day, the session was entertainment. Good training ends with a working habit, not a folder full of slides.",
    summary:
      "Practical AI training should change one real task on the next workday. Teams need to practice on work they already own, leave with one repeatable process, and know the boundaries they should not cross.",
    answerHeading: "Make one workday different.",
    keyPoints: [
      "A polished demonstration does not prove that a team can use AI afterward.",
      "Practice on familiar tasks using sample information with no real people or private records.",
      "End with one task people can repeat and one clear safety rule for the next workday.",
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
        context: "Hands-on sessions built around familiar tasks and safe sample information.",
      },
      {
        title: "See if a task is ready for AI",
        href: "/workflow-readiness/",
        context: "Use the seven-question check before turning a training example into a daily process.",
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
          "The fastest way to make AI useful is to connect it to a task people already know. Use sample information with no real people or private records, shaped around the documents and decisions the team sees every week. Generic examples teach a feature. Familiar practice teaches people how to use it responsibly.",
          "People also need permission to ask basic questions and room to make mistakes. A workshop should make the technology less mysterious without pretending it is harmless or automatic. Clear safety rules create confidence. Hype creates hesitation later.",
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
    title: "What a detective, nurse leader, and AI builder have in common.",
    seoTitle: "From Detective to Nurse Leader to AI Builder",
    excerpt:
      "Keith's job titles changed, but the useful skills did not: observe carefully, explain clearly, use the right tool, and finish the job.",
    summary:
      "Career changes do not erase the skills that came before them. Observation, judgment, clear communication, and follow-through connect Keith Staggers' work in investigation, nursing leadership, and AI production.",
    answerHeading: "Carry useful skills into the next career.",
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
    ctaHeading: "Give your audience a practical story about reinvention and change.",
    primaryCtaLabel: "Book Keith to speak",
    relatedNoteSlugs: ["the-finishing-problem", "one-idea-six-content-jobs"],
    resources: [
      {
        title: "Read Keith's full story",
        href: "/about/",
        context: "Keith's career story and the practical skills that connect each chapter.",
      },
      {
        title: "See examples of Keith's work",
        href: "/proof/",
        context: "Independent AI projects, client work, books, and finished creative projects.",
      },
      {
        title: "Explore speaking",
        href: "/services/speaking/",
        context: "Practical talks about using AI at work, leadership, responsibility, and reinvention.",
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
    category: "Using AI at work",
    title: "How to know an AI process is ready for someone else to use.",
    seoTitle: "How to Hand Off an AI Process to Your Team",
    excerpt:
      "A demonstration is not enough. Another person must be able to use the process, know when to stop, return to the manual method, and handle a failure.",
    summary:
      "An AI-assisted process is ready for a team only when the person responsible can use it without the builder, recognize a problem, stop safely, finish the task manually, and restore the process.",
    answerHeading: "Make sure another person can use it and handle a failure.",
    keyPoints: [
      "Write a one-page guide naming the person responsible, the allowed information, a good result, and the required check.",
      "List clear events that mean the process must stop instead of saying only 'be careful.'",
      "Keep the manual way to finish the task available beside the AI-assisted version.",
      "Have the new owner demonstrate that they can use it, stop it, and handle a failure.",
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
      title: "Done-for-You AI Setup",
      href: "/services/done-for-you/",
    },
    ctaHeading: "Make the process usable without Keith standing beside it.",
    primaryCtaLabel: "Tell Keith about your task",
    relatedNoteSlugs: ["the-finishing-problem", "the-monday-morning-test"],
    resources: [
      {
        title: "See the done-for-you AI setup",
        href: "/services/done-for-you/",
        context: "Keith builds and tests one repetitive task in tools and accounts your team controls.",
      },
      {
        title: "See if a task is ready for AI",
        href: "/workflow-readiness/",
        context: "Confirm that the task has a responsible person, a clear result, test examples, and a backup plan.",
      },
      {
        title: "Use the ten-case testing worksheet",
        href: "/workflow-testing-template/",
        context: "Test normal work, mistakes, safety stops, duplicate work, human rejection, and the manual backup plan.",
      },
      {
        title: "See examples of Keith's work",
        href: "/proof/",
        context: "Plain-English records of independent AI projects and finished work.",
      },
    ],
    sections: [
      {
        heading: "The real test is whether the next person can use it.",
        paragraphs: [
          "A builder can make almost any AI process look ready while standing beside it. The builder already knows which information to use, which button matters, and how to fix a problem. That knowledge may exist only in the builder's head.",
          "The process is ready only when the person responsible for the task can use it without quiet help from the builder. For someone working alone, that person may be you returning to the process a month later.",
        ],
      },
      {
        heading: "Write a one-page guide.",
        paragraphs: [
          "The guide should name what starts the task, who is responsible, what information is allowed, what AI does, what a person checks, what a good result looks like, and where that result goes.",
          "Write for the person doing the work. Replace project nicknames with plain actions. Link to the correct source. State where the finished item appears. If someone has to remember an unwritten step, the guide is not complete.",
        ],
      },
      {
        heading: "Write clear rules for when to stop.",
        paragraphs: [
          "Saying 'be careful' is not enough. A missing source, unexpected file, conflicting instruction, failed check, unavailable destination, or unapproved input is a specific event a person can recognize. Each event needs a clear next action.",
          "Every AI process can fail. The important question is whether the person using it can recognize the failure before using the result. A visible stop is safer than a quiet guess.",
        ],
      },
      {
        heading: "Keep the manual process available.",
        paragraphs: [
          "The backup plan must explain how to finish the task when the AI tool, connection, account, or reviewer is unavailable. The person should know where the source lives, which template to use, what to check, and where to save the result.",
          "The manual process also provides an honest comparison. If it is faster, clearer, or safer for most cases, the AI-assisted version may not deserve to become the default.",
        ],
      },
      {
        heading: "Explain what to do after a failure.",
        paragraphs: [
          "Starting over can send a duplicate message, overwrite a record, or create two versions of the same result. Begin by checking what already happened and where the first result went.",
          "Then choose the safe action: continue from a confirmed step, finish the task manually, or close the failed attempt and begin again. Never make a person guess whether the first attempt already changed something outside the tool.",
        ],
      },
      {
        heading: "Have the new owner demonstrate it.",
        paragraphs: [
          "The new owner should share the screen while the builder stays quiet. They complete a normal task, explain the required check, identify a reason to stop, use the manual backup, and explain what they would do after a failure.",
          "This is more useful than asking whether the instructions make sense. Missing assumptions become visible during use, while there is still time to correct the guide.",
        ],
      },
      {
        heading: "This website article follows the same rule.",
        paragraphs: [
          "This article begins as one approved content record and one image. The website then uses that record to create the article page, article list, homepage link, RSS update, sitemap entry, social preview, and AI-readable text. A person approves the public message. Automation handles the repeated publishing steps.",
          "A future operator should be able to publish an approved article, recognize a failed check, stop the release, and confirm what reached the public website. If that still requires undocumented knowledge from the builder, the process is not ready.",
        ],
      },
    ],
  },
  {
    status: "published",
    slug: "one-idea-six-content-jobs",
    number: "05",
    category: "Content marketing",
    title: "How to turn one strong idea into content for six channels.",
    seoTitle: "How to Repurpose One Idea Across Six Channels",
    excerpt:
      "Finish and verify one strong source first. Then adapt it for each channel without changing the facts or copying the same post everywhere.",
    summary:
      "Use one accurate website article or finished project as the main source. Give LinkedIn, Facebook, Instagram, X, email, and YouTube different versions, and approve each public item before it is published.",
    answerHeading: "Keep one accurate source. Adapt the message for each channel.",
    keyPoints: [
      "Finish and verify one main source before creating versions for other channels.",
      "Give LinkedIn, Facebook, Instagram, X, newsletter, and YouTube different roles.",
      "Keep the fact source, approval, visual, date, and public link with every item.",
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
    ctaHeading: "Finish one strong source before creating six more posts.",
    primaryCtaLabel: "Finish the source",
    relatedNoteSlugs: ["the-finishing-problem", "three-careers-one-standard"],
    resources: [
      {
        title: "Read all articles and guides",
        href: "/notes/",
        context: "Keith's main archive of practical writing about AI, work, and finishing projects.",
      },
      {
        title: "Use The Finish Loop",
        href: "/finish-loop/",
        context: "Choose, make, review, revise, and finish the source before creating more versions.",
      },
      {
        title: "See examples of Keith's work",
        href: "/proof/",
        context: "Independent AI projects, client work, books, and finished creative projects.",
      },
    ],
    sections: [
      {
        heading: "Finish the main source first.",
        paragraphs: [
          "Turning a loose thought into six drafts creates six places for confusion to spread. Finish one strong source with a clear point, checked facts, a useful structure, and a defined ending before adapting it for other channels.",
          "A website article works well when the idea needs a full explanation. A finished project, public video, or released product can also be the main source. Keep the complete version in one place so later corrections begin there.",
        ],
      },
      {
        heading: "Do not copy the same post everywhere.",
        paragraphs: [
          "The main source protects the full explanation and the facts. Each channel needs the language and format people expect there. Copying the same caption across every platform ignores why someone opened that platform.",
          "Adapt the presentation, not the facts. The main point and important limits stay the same. The opening, pacing, example, visual, and next action can change because each channel has a different job.",
        ],
      },
      {
        heading: "LinkedIn teaches the professional lesson.",
        paragraphs: [
          "LinkedIn should contain a complete useful lesson, not a teaser that withholds the important part. Lead with a familiar work problem, explain the choice, name the limit, and give the reader one action they can use. One link to the full article is enough when more context helps.",
          "The professional version should connect the idea to using AI at work, leadership, or production. It does not need a résumé paragraph or an invented business result. Credibility comes from making the decision clearer and explaining why it works.",
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
          "The newsletter has a different promise. It enters an inbox, so it should give the reader one repeatable process, one safety rule, and one action. The full article can hold the complete explanation. The email should make one part easier to use this week.",
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
        heading: "Keep the source and approval with every version.",
        paragraphs: [
          "Each draft should keep a link to the fact source, the channel, exact words, visual when present, planned time, approval, and final public link. If the words or image change after approval, the item must be reviewed again. Approval of a text post does not approve a visual post.",
          "Automation can create files for each channel, check required information, place exact approved items in a queue, and record the public link. It cannot treat silence as approval, invent a result, or turn approval of one item into permission for every later version.",
        ],
      },
      {
        heading: "This article is the example.",
        paragraphs: [
          "The main idea is simple: one finished idea can do different jobs without becoming six unrelated messages. This article is the full source. LinkedIn would teach the professional lesson. Facebook would need a real personal connection. Instagram would use the diagram. X would isolate one rule. The newsletter would give one repeatable action. YouTube would demonstrate the process only if the screen contained no private material.",
          "Not every version needs to be published. The useful measure is not the number of channels. It is whether each published version did its intended job without weakening the truth of the original.",
        ],
      },
    ],
  },
  {
    status: "published",
    slug: "practice-the-manual-fallback",
    number: "07",
    category: "Using AI at work",
    title: "Test the manual fallback before it fails",
    seoTitle: "Test the manual fallback before it fails",
    excerpt:
      "Use this five-minute drill to check how your team stops an AI-assisted process, finishes safely, avoids a duplicate action, and resumes with a named owner.",
    summary:
      "When an AI-assisted process fails, “do it manually” is not enough. A usable fallback is a short, written path that tells one person when to stop, what to check, how to finish the work safely, what to record, and when the normal process can resume.",
    answerHeading: "Practice the fallback with every outside action turned off.",
    keyPoints: [],
    tags: ["AI workflow fallback", "operational resilience", "manual process"],
    image: {
      src: "/media/notes/sn-07-manual-fallback-1200x630.png",
      alt: "Five-step fallback drill: stop, check whether the outside action already happened, finish through the manual path, record the exception, and resume only after the owner approves.",
      width: 1200,
      height: 630,
    },
    readingTime: "8 min read",
    datePublished: "2026-08-18",
    dateModified: "2026-08-18",
    related: {
      title: "Workflow readiness check",
      href: "/workflow-readiness/",
    },
    ctaHeading: "Check one repeated job",
    primaryCtaLabel: "Use the free workflow readiness check",
    showCallout: false,
    relatedNoteSlugs: ["ai-workflow-handoff-run-stop-recover"],
    resources: [],
    sections: [],
    articleBodyHtml: `
      <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">When an AI-assisted process fails, “do it manually” is not enough. A usable fallback is a short, written path that tells one person when to stop, what to check, how to finish the work safely, what to record, and when the normal process can resume.</p>
      <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-16">The fastest way to find out whether that path works is to practice it for five minutes with sample information and every outside action turned off.</p>

      <section>
        <p class="font-mono text-[10px] tracking-[0.18em] uppercase text-cobalt-text mb-4">01</p>
        <h2 class="serif text-[clamp(30px,3.6vw,46px)] leading-[1.04] tracking-[-0.02em] mb-7">Start with a failure people already recognize</h2>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">Imagine a small team uses an AI tool to turn weekly project notes into a follow-up email and action list. The normal process looks simple:</p>
        <ol class="mb-6 list-decimal space-y-3 pl-6 text-[17px] leading-[1.7] text-paper/90">
          <li>A manager adds the meeting notes.</li>
          <li>AI drafts the email and action list.</li>
          <li>A person checks the facts, owners, and dates.</li>
          <li>The approved email is sent.</li>
          <li>The team records that the follow-up went out.</li>
        </ol>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">Now the tool times out after step three.</p>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">Did the email send before the screen failed? Is the draft saved? If the manager starts over, will the team receive two messages? Can another person find the latest checked version?</p>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90">Those questions are the fallback. “Write the email yourself” answers only one of them.</p>
      </section>

      <section class="mt-16 border-t border-rule/70 pt-12">
        <p class="font-mono text-[10px] tracking-[0.18em] uppercase text-cobalt-text mb-4">02</p>
        <h2 class="serif text-[clamp(30px,3.6vw,46px)] leading-[1.04] tracking-[-0.02em] mb-7">A fallback has five jobs</h2>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">A fallback is the safe alternative used when the normal process cannot finish. It should fit on one page and answer five ordinary questions.</p>
        <div class="mb-8 overflow-x-auto border border-rule">
          <table class="w-full border-collapse text-left text-[15px] leading-[1.6]">
            <thead class="bg-panel text-paper">
              <tr><th class="border-b border-rule px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em]">Job</th><th class="border-b border-rule px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em]">Question the operator needs answered</th></tr>
            </thead>
            <tbody class="text-paper-dim">
              <tr><td class="border-b border-rule px-4 py-3 text-paper">Stop</td><td class="border-b border-rule px-4 py-3">What exact failure means I should stop the normal process?</td></tr>
              <tr><td class="border-b border-rule px-4 py-3 text-paper">Check</td><td class="border-b border-rule px-4 py-3">How do I confirm what already happened?</td></tr>
              <tr><td class="border-b border-rule px-4 py-3 text-paper">Finish</td><td class="border-b border-rule px-4 py-3">What short manual path completes the essential work?</td></tr>
              <tr><td class="border-b border-rule px-4 py-3 text-paper">Record</td><td class="border-b border-rule px-4 py-3">Where do I note what happened and what I did?</td></tr>
              <tr><td class="px-4 py-3 text-paper">Resume</td><td class="px-4 py-3">Who decides the normal process is safe to use again?</td></tr>
            </tbody>
          </table>
        </div>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">For the project-email example, the path could be:</p>
        <ul class="mb-6 list-disc space-y-3 pl-6 text-[17px] leading-[1.7] text-paper/90">
          <li>Stop after a timeout or missing confirmation. Do not press send again.</li>
          <li>Check the sent folder, the message record, and the approved draft location.</li>
          <li>If nothing was sent, copy the checked draft into the ordinary email tool and send it once.</li>
          <li>Record the time, recipient list, final file, and whether the manual path was used.</li>
          <li>Let the named process owner decide when the AI-assisted route resumes.</li>
        </ul>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90">The point is not to create a thick emergency manual. It is to remove the next dangerous guess.</p>
      </section>

      <section class="mt-16 border-t border-rule/70 pt-12">
        <p class="font-mono text-[10px] tracking-[0.18em] uppercase text-cobalt-text mb-4">03</p>
        <h2 class="serif text-[clamp(30px,3.6vw,46px)] leading-[1.04] tracking-[-0.02em] mb-7">Practice with every consequence turned off</h2>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">A consequence is an outside result such as sending an email, updating a customer record, publishing a page, or creating a charge. During the drill, disable those actions. Use sample names, a practice mailbox or unsent draft, and a test record that cannot affect real work.</p>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-10">Then run this five-minute drill.</p>

        <h3 class="mb-5 mt-10 serif text-[26px] leading-tight text-paper">Minute 1: Name the failure</h3>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">Tell the operator the AI step is unavailable. Do not explain the workaround yet.</p>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">Ask: “What tells you to stop?”</p>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-8">The answer should point to something visible, such as a timeout, missing confirmation, or failed status. “It looks wrong” is too vague.</p>

        <h3 class="mb-5 mt-10 serif text-[26px] leading-tight text-paper">Minute 2: Check for a partial run</h3>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">Create one partial-run case. In the sample, the draft exists, but the operator does not know whether the email was sent.</p>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">Ask the operator to check the place that proves the outside action. A spinner or success message is not enough. For email, the proof might be the sent folder and message record. For a published page, it might be the live public URL. For a payment, it would be the payment provider’s completed transaction record.</p>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-8">This check matters because retrying before you know what happened can create a duplicate.</p>

        <h3 class="mb-5 mt-10 serif text-[26px] leading-tight text-paper">Minute 3: Use the manual path</h3>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">Have the operator complete only the essential work through the approved ordinary tool.</p>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">In the sample, they open the checked draft in the regular email tool, confirm the recipient list, and stop before the practice email is sent. The drill proves the path without contacting anyone.</p>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-8">If the fallback depends on a password, permission, file, or person the operator cannot access, the fallback is not runnable yet.</p>

        <h3 class="mb-5 mt-10 serif text-[26px] leading-tight text-paper">Minute 4: Record the exception</h3>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">Ask the operator to record four facts:</p>
        <ul class="mb-6 list-disc space-y-3 pl-6 text-[17px] leading-[1.7] text-paper/90">
          <li>what failed;</li>
          <li>what evidence they checked;</li>
          <li>which path they used;</li>
          <li>what remains unfinished.</li>
        </ul>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-8">Do not copy private source material into the record. The record should explain the state of the work, not duplicate the sensitive input.</p>

        <h3 class="mb-5 mt-10 serif text-[26px] leading-tight text-paper">Minute 5: Decide how normal work resumes</h3>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">The person doing the fallback should not have to guess when the AI-assisted route is safe again.</p>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90">Name the owner who reviews the failure, confirms the fix, and authorizes the next normal run. If nobody owns that decision, the team will either avoid the process forever or restart it too soon.</p>
      </section>

      <section class="mt-16 border-t border-rule/70 pt-12">
        <p class="font-mono text-[10px] tracking-[0.18em] uppercase text-cobalt-text mb-4">04</p>
        <h2 class="serif text-[clamp(30px,3.6vw,46px)] leading-[1.04] tracking-[-0.02em] mb-7">Test the duplicate case on purpose</h2>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">The most useful fallback test is often not a total outage. It is a partial run where one step may have succeeded.</p>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">Use at least two practice cases:</p>
        <ol class="mb-6 list-decimal space-y-3 pl-6 text-[17px] leading-[1.7] text-paper/90">
          <li><strong>Nothing happened.</strong> The AI tool failed before creating the draft.</li>
          <li><strong>Something may have happened.</strong> The draft exists, and the outside action is uncertain.</li>
        </ol>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">The second case forces the operator to check evidence before retrying. That is what protects customers, coworkers, and the business from duplicate messages, repeated updates, or accidental charges.</p>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90">If the only instruction is “try again,” the process has no real recovery path.</p>
      </section>

      <section class="mt-16 border-t border-rule/70 pt-12">
        <p class="font-mono text-[10px] tracking-[0.18em] uppercase text-cobalt-text mb-4">05</p>
        <h2 class="serif text-[clamp(30px,3.6vw,46px)] leading-[1.04] tracking-[-0.02em] mb-7">What a passing drill looks like</h2>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">The fallback passes when a person who did not design the process can:</p>
        <ul class="mb-6 list-disc space-y-3 pl-6 text-[17px] leading-[1.7] text-paper/90">
          <li>recognize the stop signal;</li>
          <li>find the evidence of what already happened;</li>
          <li>complete the essential work without the AI step;</li>
          <li>avoid a duplicate outside action;</li>
          <li>record the exception without copying restricted information; and</li>
          <li>name who decides when normal work resumes.</li>
        </ul>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">Any hesitation is useful evidence. Fix the page, permission, label, or ownership gap while the practice run is harmless.</p>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90">A written fallback is still only a claim until somebody else can follow it. This is the same reason an AI workflow is not finished until another person can <a href="/notes/ai-workflow-handoff-run-stop-recover/" class="text-cobalt-text underline decoration-rule underline-offset-4 hover:text-paper">run, stop, and recover it</a>.</p>
      </section>

      <section class="mt-16 border-t border-rule/70 pt-12">
        <p class="font-mono text-[10px] tracking-[0.18em] uppercase text-cobalt-text mb-4">06</p>
        <h2 class="serif text-[clamp(30px,3.6vw,46px)] leading-[1.04] tracking-[-0.02em] mb-7">Check one repeated job</h2>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">Choose one repeated job your team already uses. Ask what happens if the AI step or connected tool is unavailable for ten minutes.</p>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90 mb-6">If the answer depends on memory, one unavailable person, or pressing retry and hoping, the next step is not more automation. Write and practice the short manual path first.</p>
        <p class="serif text-[18px] lg:text-[20px] leading-[1.72] text-paper/90"><a href="/workflow-readiness/" class="text-cobalt-text underline decoration-rule underline-offset-4 hover:text-paper">Use the free workflow readiness check</a> to see whether the job has a named owner, approved information, a human decision, and a usable fallback. If the work is ready for outside help, Keith offers <a href="/services/done-for-you/" class="text-cobalt-text underline decoration-rule underline-offset-4 hover:text-paper">done-for-you AI setup for repeated team tasks</a>.</p>
      </section>
    `,
  },
];

export const publishedNotes = notes.filter((note) => note.status === "published");
