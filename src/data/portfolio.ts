export type PortfolioScreenRole = "primary" | "support" | "portrait";

export type PortfolioScreen = {
  src: string;
  alt: string;
  width: number;
  height: number;
  role: PortfolioScreenRole;
};

export type PortfolioProject = {
  id: "charterrn" | "gearstat" | "ai-canvas";
  name: string;
  label: string;
  description: string;
  boundary: string;
  screens: PortfolioScreen[];
  publicUrl?: string;
  publicLabel?: string;
};

export const portfolioProjects = [
  {
    id: "charterrn",
    name: "CharterRN",
    label: "Founder-built venture",
    description:
      "CharterRN is a practice-building product for independent nurses. Keith designed and built the public site and a working local application.",
    boundary:
      "CharterRN is a separate venture. Screens use synthetic demo data. It is not a Keith Staggers Studio service.",
    publicUrl: "https://charterrn.netlify.app",
    publicLabel: "Visit CharterRN",
    screens: [
      {
        src: "/media/projects/charterrn-dashboard.png",
        alt: "CharterRN demo practice dashboard showing tasks, deadlines, and synthetic practice records.",
        width: 1600,
        height: 1248,
        role: "primary",
      },
      {
        src: "/media/projects/charterrn-compliance.png",
        alt: "CharterRN compliance calendar showing synthetic license and policy renewal deadlines.",
        width: 1600,
        height: 1000,
        role: "support",
      },
    ],
  },
  {
    id: "gearstat",
    name: "GearSTAT",
    label: "Independent simulated build",
    description:
      "GearSTAT is a working demonstration of a nurse-facing way to find, claim, and report shared equipment in a simulated hospital environment.",
    boundary:
      "Made-up data. No patient information or staff locations. Not connected to or deployed in a hospital.",
    screens: [
      {
        src: "/media/projects/gearstat-board.png",
        alt: "GearSTAT simulated unit map showing made-up equipment locations and availability.",
        width: 1024,
        height: 768,
        role: "primary",
      },
      {
        src: "/media/projects/gearstat-finder.jpg",
        alt: "GearSTAT mobile equipment finder listing simulated equipment availability.",
        width: 390,
        height: 844,
        role: "portrait",
      },
      {
        src: "/media/projects/gearstat-digest.png",
        alt: "GearSTAT seven-day signal dashboard showing simulated workflow measures.",
        width: 1024,
        height: 768,
        role: "support",
      },
    ],
  },
  {
    id: "ai-canvas",
    name: "AI Canvas",
    label: "Private production app",
    description:
      "AI Canvas is Keith's private workspace for connecting images, video, voice, music, captions, and reusable production flows.",
    boundary:
      "Owner-operated and private. Not a public software service, open-signup product, or client system.",
    screens: [
      {
        src: "/media/projects/ai-canvas-dashboard.jpg",
        alt: "AI Canvas private dashboard showing recent creative production flows.",
        width: 1280,
        height: 720,
        role: "primary",
      },
      {
        src: "/media/projects/ai-canvas-editor.jpg",
        alt: "AI Canvas node editor connecting a reference image to a generated character sheet.",
        width: 1280,
        height: 720,
        role: "support",
      },
      {
        src: "/media/projects/ai-canvas-home.jpg",
        alt: "AI Canvas visual concept showing image, voice, copy, and final-film steps on one production canvas.",
        width: 1272,
        height: 720,
        role: "support",
      },
    ],
  },
] satisfies PortfolioProject[];
