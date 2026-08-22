import readinessArticle from "../content/geo-notes/01-is-this-task-ready-for-ai.md?raw";
import handoffArticle from "../content/geo-notes/02-how-to-hand-off-an-ai-workflow-safely.md?raw";
import nurseLeaderPrivacyArticle from "../content/geo-notes/03-what-should-a-nurse-leader-never-put-into-ai.md?raw";
import workflowTestingArticle from "../content/geo-notes/04-how-to-test-an-ai-workflow.md?raw";
import humanAuthorityArticle from "../content/geo-notes/05-what-should-never-be-automated-with-ai.md?raw";
import workflowRoiArticle from "../content/geo-notes/06-how-to-calculate-small-team-ai-roi.md?raw";
import { renderArticleMarkdown } from "../utils/articleMarkdown";

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
  lastReviewed?: string;
  directAnswer?: string;
  hub?: {
    topic: "choose" | "operate" | "lead";
    question: string;
  };
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
    title: "How Do You Hand Off an AI Workflow Safely?",
    seoTitle: "How to Hand Off an AI Workflow Safely",
    excerpt:
      "Use Run, Stop, Recover, and Own to hand an AI-assisted process to another person without leaving critical knowledge in the builder's head.",
    summary:
      "Hand off an AI workflow only after the new owner can run it, recognize when to stop, recover without creating duplicate actions, and explain who remains accountable.",
    directAnswer:
      "Hand off an AI workflow only after the new owner can run it, recognize when to stop, recover without creating duplicate actions, and explain who remains accountable. Give that person a one-page operating record, then watch them complete a normal case and a failure drill without help from the builder.",
    answerHeading: "Run. Stop. Recover. Own.",
    keyPoints: [
      "Give the operator one page naming the approved inputs, AI step, human check, output, stop rules, fallback, evidence, and owners.",
      "Make the operator demonstrate a normal case and a failure case without quiet rescue from the builder.",
      "Check whether an outside action already happened before any retry.",
      "Retest after changes to the model, tool, data, integration, reviewer, or consequence.",
    ],
    tags: ["AI workflow handoff", "workflow documentation", "operational resilience"],
    hub: {
      topic: "operate",
      question: "How do you hand off an AI workflow safely?",
    },
    image: {
      src: "/media/notes/workflow-handoff.png",
      alt: "AI workflow handoff diagram showing run, stop, recover, and own as four required operator capabilities",
      width: 1200,
      height: 630,
    },
    readingTime: "9 min read",
    datePublished: "2026-07-25",
    dateModified: "2026-08-21",
    lastReviewed: "2026-08-20",
    related: {
      title: "Done-for-You AI Setup",
      href: "/services/done-for-you/",
    },
    ctaHeading: "Make the workflow usable without the builder standing beside it.",
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
    sections: [],
    articleBodyHtml: renderArticleMarkdown(handoffArticle),
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
  {
    status: "published",
    slug: "is-this-task-ready-for-ai",
    number: "06",
    category: "Using AI at work",
    title: "Is This Task Ready for AI? Use This 7-Question Assessment",
    seoTitle: "Is This Task Ready for AI? 7 Questions",
    excerpt:
      "Use seven practical questions to decide whether a work task is ready for a small, supervised AI pilot or should stay manual.",
    summary:
      "A task is ready for an AI pilot when the result is clear, the inputs are permitted, a person can verify the output, and the team can stop and finish safely without the tool.",
    directAnswer:
      "A task is ready for an AI pilot when the result is clear, the inputs are permitted, a person can verify the output, and the team can stop and finish safely without the tool. If the data permission, human owner, failure boundary, or fallback is unclear, the task is not ready yet.",
    answerHeading: "Check the result, inputs, owner, human review, stop rule, and fallback.",
    keyPoints: [
      "Start with a specific repeated task and an observable finished result.",
      "Confirm that every input is permitted for the exact tool, account, and purpose.",
      "Name the person who reviews the evidence and can reject the result.",
      "Keep a tested manual path and a clear pilot end date.",
    ],
    tags: ["AI workflow assessment", "AI readiness", "responsible AI"],
    hub: {
      topic: "choose",
      question: "Is this task ready for AI?",
    },
    image: {
      src: "/og-keith-staggers-v2.png",
      alt: "Keith Staggers: practical AI training, one-to-one help, and done-for-you solutions.",
      width: 1200,
      height: 630,
    },
    readingTime: "8 min read",
    datePublished: "2026-08-21",
    dateModified: "2026-08-21",
    lastReviewed: "2026-08-20",
    related: {
      title: "Workflow readiness check",
      href: "/workflow-readiness/",
    },
    ctaHeading: "Check one real task before adding another tool.",
    primaryCtaLabel: "Use the free readiness check",
    showCallout: false,
    relatedNoteSlugs: ["what-should-never-be-automated-with-ai", "ai-workflow-handoff-run-stop-recover"],
    resources: [
      {
        title: "Use the seven-question workflow readiness check",
        href: "/workflow-readiness/",
        context: "Answer seven plain questions in the browser. No email is required.",
      },
      {
        title: "Use the ten-case workflow testing worksheet",
        href: "/workflow-testing-template/",
        context: "Test normal work, missing information, restricted input, failures, and the manual fallback.",
      },
    ],
    sections: [],
    articleBodyHtml: renderArticleMarkdown(readinessArticle),
  },
  {
    status: "published",
    slug: "what-should-a-nurse-leader-never-put-into-ai",
    number: "08",
    category: "AI for nurse leaders",
    title: "What Should a Nurse Leader Never Put Into an AI Tool?",
    seoTitle: "What Nurse Leaders Should Never Put Into AI",
    excerpt:
      "A practical privacy boundary for nurse leaders: what not to paste, upload, record, or connect to an unapproved AI tool.",
    summary:
      "Never enter patient information, confidential workforce data, credentials, internal records, or other restricted material into an AI tool that is not approved for that information and purpose.",
    directAnswer:
      "Never paste, upload, record, or connect patient information, confidential workforce data, credentials, internal records, or other restricted material to an AI tool that your organization has not approved for that information and purpose. Even in an approved system, use only the minimum information permitted, keep required human review, and follow your organization's privacy, security, legal, clinical, and records policies.",
    answerHeading: "Use the approved tool and minimum permitted information, or stop.",
    keyPoints: [
      "Removing a name does not automatically make a real patient or employee story safe to use.",
      "Approval must cover the exact tool, account, information, and purpose.",
      "Use synthetic examples, public information, or an approved de-identification process when possible.",
      "Report an accidental disclosure through the designated organizational channel.",
    ],
    tags: ["AI for nurse leaders", "healthcare privacy", "responsible AI"],
    hub: {
      topic: "lead",
      question: "What should a nurse leader never put into an AI tool?",
    },
    image: {
      src: "/og-keith-staggers-v2.png",
      alt: "Keith Staggers: practical AI training, one-to-one help, and done-for-you solutions.",
      width: 1200,
      height: 630,
    },
    readingTime: "9 min read",
    datePublished: "2026-08-21",
    dateModified: "2026-08-21",
    lastReviewed: "2026-08-20",
    related: {
      title: "Practical AI training",
      href: "/services/training/",
    },
    ctaHeading: "Teach the privacy boundary before teaching the tool.",
    primaryCtaLabel: "See practical AI training",
    showCallout: false,
    relatedNoteSlugs: ["what-should-never-be-automated-with-ai", "the-monday-morning-test"],
    resources: [
      {
        title: "Explore practical AI training",
        href: "/services/training/",
        context: "Hands-on team training with safe sample information and a clear human decision point.",
      },
      {
        title: "Read all practical AI articles",
        href: "/notes/",
        context: "Question-led guidance for choosing, operating, and leading AI-assisted work.",
      },
    ],
    sections: [],
    articleBodyHtml: renderArticleMarkdown(nurseLeaderPrivacyArticle),
  },
  {
    status: "published",
    slug: "how-to-test-an-ai-workflow-before-your-team-uses-it",
    number: "09",
    category: "Using AI at work",
    title: "How Do You Test an AI Workflow Before Your Team Relies on It?",
    seoTitle: "How to Test an AI Workflow Before Team Use",
    excerpt:
      "Run a ten-case test with sample information, defined acceptance criteria, human review, failure cases, and a manual fallback before an AI workflow reaches real work.",
    summary:
      "Test an AI workflow against a written baseline and at least ten representative cases, including missing data, conflicting instructions, restricted input, rejected output, partial failure, and the manual fallback.",
    directAnswer:
      "Test an AI workflow against a written baseline and at least ten representative cases, including missing data, conflicting instructions, restricted input, a rejected output, a partial failure, and the manual fallback. Use sample information with outside actions disabled, record evidence for every result, and require a named person to make the go, revise, or stop decision.",
    answerHeading: "Use a baseline, ten representative cases, and a named decision owner.",
    keyPoints: [
      "Write pass criteria before seeing the model's output.",
      "Include normal cases, missing or conflicting inputs, restricted information, rejection, and failure recovery.",
      "Disable messages, charges, publications, and other outside actions during testing.",
      "Keep the evidence and let a named person decide whether to go, revise, or stop.",
    ],
    tags: ["AI workflow testing", "AI evaluation", "responsible AI"],
    hub: {
      topic: "operate",
      question: "How do you test an AI workflow before your team relies on it?",
    },
    image: {
      src: "/media/notes/sn-07-manual-fallback-1200x630.png",
      alt: "Five-step fallback drill used as part of an AI workflow test",
      width: 1200,
      height: 630,
    },
    readingTime: "10 min read",
    datePublished: "2026-08-21",
    dateModified: "2026-08-21",
    lastReviewed: "2026-08-20",
    related: {
      title: "10-Example AI Process Testing Worksheet",
      href: "/workflow-testing-template/",
    },
    ctaHeading: "Test the workflow before real work depends on it.",
    primaryCtaLabel: "Use the testing worksheet",
    showCallout: false,
    relatedNoteSlugs: ["ai-workflow-handoff-run-stop-recover", "practice-the-manual-fallback"],
    resources: [
      {
        title: "Use the ten-case workflow testing worksheet",
        href: "/workflow-testing-template/",
        context: "Record expected behavior, observed results, evidence, and the final decision in the browser.",
      },
      {
        title: "See if the task is ready for AI",
        href: "/workflow-readiness/",
        context: "Check the task definition, data permission, human owner, stop rule, and fallback before testing.",
      },
    ],
    sections: [],
    articleBodyHtml: renderArticleMarkdown(workflowTestingArticle),
  },
  {
    status: "published",
    slug: "what-should-never-be-automated-with-ai",
    number: "10",
    category: "Using AI at work",
    title: "What Should Never Be Automated With AI?",
    seoTitle: "What Should Never Be Automated With AI?",
    excerpt:
      "Keep people in control of high-impact decisions, irreversible actions, restricted information, and work that cannot be verified, contested, or safely recovered.",
    summary:
      "Never give AI unsupervised final authority over high-impact decisions, restricted-data access, or irreversible actions when a mistake could affect a person's health, safety, rights, employment, money, or ability to appeal.",
    directAnswer:
      "Never give AI unsupervised final authority over high-impact decisions, restricted-data access, or irreversible actions when a mistake could affect a person's health, safety, rights, employment, money, or ability to appeal. AI may assist with a bounded step, but a qualified person must control the decision, verify the evidence, stop the process, explain the outcome, and provide a workable path for correction.",
    answerHeading: "Keep people in control of high-impact, restricted, and irreversible work.",
    keyPoints: [
      "Do not give AI final authority over decisions that materially affect a person.",
      "Do not automate a consequence that cannot be verified, stopped, contested, or recovered safely.",
      "Keep restricted information inside approved systems and purposes.",
      "Use AI only for bounded assistance when a qualified person owns the decision.",
    ],
    tags: ["human oversight", "responsible AI", "AI automation"],
    hub: {
      topic: "choose",
      question: "What should never be automated with AI?",
    },
    image: {
      src: "/og-keith-staggers-v2.png",
      alt: "Keith Staggers: practical AI training, one-to-one help, and done-for-you solutions.",
      width: 1200,
      height: 630,
    },
    readingTime: "9 min read",
    datePublished: "2026-08-21",
    dateModified: "2026-08-21",
    lastReviewed: "2026-08-20",
    related: {
      title: "Workflow readiness check",
      href: "/workflow-readiness/",
    },
    ctaHeading: "Name the human decision before automating the step.",
    primaryCtaLabel: "Use the readiness check",
    showCallout: false,
    relatedNoteSlugs: ["is-this-task-ready-for-ai", "what-should-a-nurse-leader-never-put-into-ai"],
    resources: [
      {
        title: "Use the workflow readiness check",
        href: "/workflow-readiness/",
        context: "Decide whether a task has a suitable result, approved information, human owner, and safe fallback.",
      },
      {
        title: "Use the ten-case workflow testing worksheet",
        href: "/workflow-testing-template/",
        context: "Test rejection, stop, duplicate, failure, and manual-path cases before real use.",
      },
    ],
    sections: [],
    articleBodyHtml: renderArticleMarkdown(humanAuthorityArticle),
  },
  {
    status: "published",
    slug: "how-to-calculate-small-team-ai-workflow-roi",
    number: "11",
    category: "Using AI at work",
    title: "How Do You Calculate the ROI of an AI Workflow for a Small Team?",
    seoTitle: "How to Calculate Small-Team AI Workflow ROI",
    excerpt:
      "Compare the full AI-assisted process with a measured baseline, including review, correction, training, maintenance, tool cost, quality, and risk.",
    summary:
      "Calculate AI workflow ROI by comparing the complete approved process with the current baseline, then subtracting licenses, setup, review, correction, training, maintenance, monitoring, and expected failure costs from the measurable benefit.",
    directAnswer:
      "Calculate AI workflow ROI by comparing the complete approved process with the current baseline, then subtracting licenses, setup, review, correction, training, maintenance, monitoring, and expected failure costs from the measurable benefit. Report time released as capacity, not cash savings, unless the business can show how that capacity reduced cost, increased contribution margin, avoided spending, or created additional completed work.",
    answerHeading: "Measure the complete process, not only the AI step.",
    keyPoints: [
      "Measure the current process before changing it.",
      "Include review, correction, training, maintenance, monitoring, and expected failure costs.",
      "Separate time released from actual cash savings or contribution margin.",
      "Use a bounded pilot and a named go, revise, or stop decision.",
    ],
    tags: ["AI ROI", "AI workflow measurement", "small business AI"],
    hub: {
      topic: "choose",
      question: "How do you calculate the ROI of an AI workflow for a small team?",
    },
    image: {
      src: "/og-keith-staggers-v2.png",
      alt: "Keith Staggers: practical AI training, one-to-one help, and done-for-you solutions.",
      width: 1200,
      height: 630,
    },
    readingTime: "10 min read",
    datePublished: "2026-08-21",
    dateModified: "2026-08-21",
    lastReviewed: "2026-08-20",
    related: {
      title: "One-to-one AI working session",
      href: "/services/coaching/",
    },
    ctaHeading: "Measure one repeated task before buying more software.",
    primaryCtaLabel: "Work through one task with Keith",
    showCallout: false,
    relatedNoteSlugs: ["is-this-task-ready-for-ai", "how-to-test-an-ai-workflow-before-your-team-uses-it"],
    resources: [
      {
        title: "Book a one-to-one AI working session",
        href: "/services/coaching/",
        context: "Work through one real task or stuck project in a 60-minute paid session.",
      },
      {
        title: "See if the task is ready for AI",
        href: "/workflow-readiness/",
        context: "Confirm the result, owner, permitted information, human check, and fallback before calculating a pilot return.",
      },
    ],
    sections: [],
    articleBodyHtml: renderArticleMarkdown(workflowRoiArticle),
  },
];

export const publishedNotes = notes.filter((note) => note.status === "published");
