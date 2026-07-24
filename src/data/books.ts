export type Book = {
  slug: string;
  title: string;
  subtitle?: string;
  blurb: string;
  amazonUrl: string;
  directBuyUrl?: string;
  featured?: boolean;
};

export const books: Book[] = [
  {
    slug: "nurse-the-fck-up",
    title: "Nurse the F*ck Up",
    subtitle: "The Raw Truth About Surviving Med-Surg",
    blurb:
      "Practical strategies for the patient loads, the red tape, and the emotional weight. Not motivational fluff. A blueprint from someone who has stood at the bedside at 3 a.m.",
    amazonUrl: "https://www.amazon.com/dp/B0CJ44XP81",
    featured: true,
  },
  {
    slug: "beyond-burnout",
    title: "Beyond Burnout",
    subtitle: "Healing the Healers",
    blurb:
      "A lifeline for caregivers. Police officers, nurses, anyone who carries weight for a living. Self-care that isn't a bubble bath. Practical, honest, written from inside the experience.",
    amazonUrl: "https://www.amazon.com/dp/B0CN1SBPV4",
  },
  {
    slug: "leading-with-care",
    title: "Leading with Care",
    subtitle: "Mastering Healthcare Management",
    blurb:
      "Conflict resolution, change management, staff retention, efficiency. The leadership book healthcare actually needs. Written by someone who has been the new manager, the burned-out staff, and the patient.",
    amazonUrl: "https://www.amazon.com/dp/B0CNYLZ5FC",
  },
];
