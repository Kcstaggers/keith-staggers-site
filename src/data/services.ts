export type Service = {
  num: string;
  title: string;
  blurb: string;
  pricing: string;
};

export const services: Service[] = [
  {
    num: "01",
    title: "Done-for-you",
    blurb:
      "Brand imagery, album covers, social content, AI video, ghost-writing. Produced end to end. You bring the brief, I bring the body of work.",
    pricing: "Projects from $2,500",
  },
  {
    num: "02",
    title: "Coaching",
    blurb:
      "1:1 sessions for creators ready to build their own catalog. Workflow, taste, the hard part nobody on YouTube shows you.",
    pricing: "$250 / 60-min session",
  },
  {
    num: "03",
    title: "Training",
    blurb:
      "Workshops for teams and organizations in healthcare, small business, ops, anyone that wants to actually use AI without losing the plot.",
    pricing: "Half-day workshops from $4,000",
  },
  {
    num: "04",
    title: "Speaking",
    blurb:
      "Cop to nurse to creator. Healthcare conferences, AI events, leadership rooms. The story plus the tactics.",
    pricing: "Keynote rates from $3,500",
  },
];
