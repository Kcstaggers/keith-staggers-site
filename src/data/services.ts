export type Service = {
  num: string;
  slug: string;
  title: string;
  blurb: string;
  pricing: string;
  // Landing page fields
  seoTitle: string;
  seoDescription: string;
  headline: string;
  headlineAccent: string;
  intro: string;
  audience: string[];
  deliverables: { name: string; detail: string }[];
  process: { step: string; detail: string }[];
  ctaPrompt: string;
};

export const services: Service[] = [
  {
    num: "01",
    slug: "done-for-you",
    title: "Done-for-you",
    blurb:
      "Brand imagery, album covers, social content, AI video, ghost-writing. Produced end to end. You bring the brief, I bring the body of work.",
    pricing: "Projects from $2,500",
    seoTitle: "AI Content Production — Done-for-You Creative Services",
    seoDescription:
      "Hire Keith Staggers to produce your brand imagery, AI video, album covers, social content, or ghost-written book — end to end. 50+ albums and 1,000+ images of proof. Projects from $2,500.",
    headline: "You bring the brief.",
    headlineAccent: "I bring the body of work.",
    intro:
      "Most people hire an agency, wait three months, and get three concepts. I work alone with an AI production stack I've spent years sharpening — fifty albums, three books, and a thousand images deep. That means agency-grade output at solo-operator speed, with one person accountable for every pixel.",
    audience: [
      "Founders and small businesses who need a real visual identity without an agency retainer",
      "Podcasters and creators who need cover art, thumbnails, and social kits that ship weekly",
      "Musicians who want album art and promo video that matches the sound",
      "Experts sitting on a book they'll never have time to write themselves",
    ],
    deliverables: [
      { name: "Brand imagery", detail: "Portraiture, product scenes, campaign visuals — directed, not generated-and-prayed-for." },
      { name: "AI video", detail: "Short films, promos, and social loops, storyboarded and edited to broadcast pace." },
      { name: "Cover art & social kits", detail: "Album covers, podcast art, episode templates your team can reuse." },
      { name: "Ghost-writing", detail: "Books, newsletters, and thought-leadership in your voice. Three of my own published, so I know the road." },
    ],
    process: [
      { step: "Brief", detail: "A 15-minute call. You talk, I take notes, you get a fixed quote within 48 hours." },
      { step: "First pass", detail: "Real work, not mood boards — usually within a week." },
      { step: "Direction", detail: "Two structured revision rounds. You point, I adjust." },
      { step: "Delivery", detail: "Final files, source assets, and the usage rights in writing." },
    ],
    ctaPrompt: "Tell me what you need made. The quote is free and the call is 15 minutes.",
  },
  {
    num: "02",
    slug: "coaching",
    title: "Coaching",
    blurb:
      "1:1 sessions for creators ready to build their own catalog. Workflow, taste, the hard part nobody on YouTube shows you.",
    pricing: "$250 / 60-min session",
    seoTitle: "AI Creator Coaching — 1:1 Sessions with a Working AI Artist",
    seoDescription:
      "1:1 AI coaching from Keith Staggers — a creator with 50+ albums, 3 books, and 1,000+ AI images actually shipped. Learn the workflow, the tools, and the taste. $250 per session.",
    headline: "Stop watching tutorials.",
    headlineAccent: "Start shipping a catalog.",
    intro:
      "YouTube will teach you which buttons to press. It won't teach you taste, sequencing, or how to finish — and finishing is the entire game. I've shipped fifty albums and three books with these tools. In an hour, I can usually see exactly where your workflow is leaking and fix it on the call.",
    audience: [
      "Creators who've played with AI tools but have nothing finished to show for it",
      "Musicians and writers who want a repeatable release pipeline, not a one-off",
      "Professionals building a side catalog around a day job — I built mine between night shifts",
      "Anyone whose output looks like everyone else's and wants to find their own lane",
    ],
    deliverables: [
      { name: "Workflow audit", detail: "We walk through how you actually work and find the leaks." },
      { name: "Live build", detail: "We make something real on the call — a track, a cover, a chapter outline." },
      { name: "Tool stack", detail: "The specific tools I use daily, and which hyped ones to skip." },
      { name: "Follow-up notes", detail: "A written recap with your next three moves, so the session doesn't evaporate." },
    ],
    process: [
      { step: "Book", detail: "Pick a slot. Come with one thing you want to make or fix." },
      { step: "Work", detail: "60 minutes, screens shared, hands on the tools." },
      { step: "Ship", detail: "You leave with something concrete and a plan for the next piece." },
    ],
    ctaPrompt: "One session. Bring the project you're stuck on.",
  },
  {
    num: "03",
    slug: "training",
    title: "Training",
    blurb:
      "Workshops for teams and organizations in healthcare, small business, ops, anyone that wants to actually use AI without losing the plot.",
    pricing: "Half-day workshops from $4,000",
    seoTitle: "AI Training Workshops for Teams — Healthcare, Ops & Small Business",
    seoDescription:
      "Hands-on AI workshops for healthcare teams, operations, and small businesses, led by Keith Staggers — former detective, working nurse, and full-time AI creator. Half-day sessions from $4,000.",
    headline: "Your team doesn't need an AI policy deck.",
    headlineAccent: "It needs working hands.",
    intro:
      "I'm not a consultant who read about AI. I'm a nurse who used it on real shifts and a creator who built a full catalog with it. My workshops put your people's actual work on the screen — their documentation, their reports, their content — and leave them with workflows they use the next morning. Healthcare teams are my home turf; the method works anywhere work gets written down.",
    audience: [
      "Healthcare teams drowning in documentation, education materials, and committee work",
      "Small businesses that can't hire a marketing department but compete with companies that have one",
      "Operations and admin teams doing repetitive writing a model should draft first",
      "Leadership groups that need a grounded view of what AI can and can't do — without vendor spin",
    ],
    deliverables: [
      { name: "Half-day workshop", detail: "Hands-on, built around your team's real tasks. No generic demos." },
      { name: "Workflow playbook", detail: "Written, specific to your org, usable the next day." },
      { name: "Guardrails", detail: "Privacy, accuracy, and when not to use the model — especially in clinical settings." },
      { name: "30-day follow-up", detail: "A check-in call once the team has run the playbook in the wild." },
    ],
    process: [
      { step: "Scope", detail: "A call to find the three workflows with the biggest payoff." },
      { step: "Build", detail: "I design the session around your tasks, your tools, your constraints." },
      { step: "Deliver", detail: "Half-day on site or remote. Everyone leaves having built something." },
      { step: "Embed", detail: "Playbook plus the 30-day follow-up, so it sticks." },
    ],
    ctaPrompt: "Tell me what your team is drowning in. I'll tell you what a workshop would fix.",
  },
  {
    num: "04",
    slug: "speaking",
    title: "Speaking",
    blurb:
      "Cop to nurse to creator. Healthcare conferences, AI events, leadership rooms. The story plus the tactics.",
    pricing: "Keynote rates from $3,500",
    seoTitle: "Keynote Speaker — AI, Healthcare & Reinvention",
    seoDescription:
      "Book Keith Staggers to speak: detective turned nurse turned AI creator with 50+ albums and 3 books. Keynotes on AI in healthcare, creative reinvention, and practical AI adoption. From $3,500.",
    headline: "Every conference has an AI talk.",
    headlineAccent: "Almost none have a witness.",
    intro:
      "Your audience has heard the hype keynote. Mine is different because I'm not predicting anything — I'm reporting. Detective. Nurse. Then a creative catalog most full-time artists never reach, built with AI between shifts. The story earns the room's attention; the tactics give them something to do Monday morning.",
    audience: [
      "Healthcare conferences that want AI made concrete for clinicians, not abstract for futurists",
      "AI and tech events that need a practitioner's voice between the vendor pitches",
      "Leadership and HR rooms talking about reinvention, burnout, and second acts",
      "Nursing schools and associations — I've been on the floor; I talk like it",
    ],
    deliverables: [
      { name: "Keynote", detail: "45–60 minutes. The cop-to-nurse-to-creator arc plus a live look at the actual work." },
      { name: "Fireside / Q&A", detail: "Moderated formats where the room steers." },
      { name: "Workshop add-on", detail: "Pair the keynote with a hands-on session for a working group." },
      { name: "Custom angle", detail: "Healthcare, creativity, burnout, reinvention — tuned to your theme, not reheated." },
    ],
    process: [
      { step: "Call", detail: "15 minutes on your event, audience, and theme." },
      { step: "Tailor", detail: "I shape the talk to your room. No off-the-shelf deck." },
      { step: "Deliver", detail: "On stage or virtual. A/V simple, requirements minimal." },
    ],
    ctaPrompt: "Tell me about your event and audience. I'll tell you the angle I'd take.",
  },
];
