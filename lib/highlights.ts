export type HighlightItem = {
  slug: string;
  context: string; // short grey line under the title on /highlights
  title: string;
  shortTitle: string; // handwritten polaroid caption on Home
  image: string;
  text: string;
  oneLiner: string;
  summary: string;
  details: string[];
  pdfs?: {
    title: string;
    description: string;
    href: string;
  }[];
};

export const highlights: HighlightItem[] = [
  {
    slug: "ar-razzaq-foundation",
    shortTitle: "Ar-Razzaq",
    context: "Non-profit · PKR 2M+ raised",
    title: "Ar-Razzaq Foundation Co-Founder",
    image: "/highlight-ar-razzaq.jpg",
    text: "Ar-Razzaq Foundation Co-Founder",
    oneLiner:
      "Co-founded a non-profit that raised PKR 2M+ for scholarships, surgeries, and women-led ventures.",
    summary:
      "We surveyed local communities to find where help was most needed, then raised and allocated over PKR 2 million across education and healthcare.",
    details: [
      "Raised PKR 2M+ to fund 14 full academic scholarships and critical surgeries.",
      "Provided seed capital for multiple women-led ventures.",
      "Distributed over 4,500 clothing units across a custom logistics network.",
    ],
  },
  {
    slug: "lead-academic-researcher",
    shortTitle: "Research paper",
    context: "Published in the Kurdish Studies journal",
    title: "Lead Academic Researcher",
    image: "/highlight-academic-research.jpg",
    text: "Lead Academic Researcher",
    oneLiner:
      "Published a mixed-methods study on industrial pollution in the Kurdish Studies journal.",
    summary:
      "I led a study of how industrial pollution affects the health of low-income communities in Attock District, Pakistan, and tied the findings to UN Sustainable Development Goals 3 and 6.",
    details: [
      "Executed a mixed-methods design using questionnaires and field interviews.",
      "Analyzed quantitative community health data using SPSS.",
      "Wrote policy recommendations for public health interventions.",
    ],
  },
  {
    slug: "national-academic-gold-medal",
    shortTitle: "CM Gold Medal",
    context: "2022 · Government of Punjab",
    title: "National Academic Gold Medal",
    image: "/highlight-academic-gold.jpg",
    text: "National Academic Gold Medal",
    oneLiner:
      "Awarded the Certificate of Merit by the Government of Punjab for academic excellence.",
    summary:
      "Awarded the Chief Minister's Gold Medal in 2022 for my results in the Secondary School Certificate exams.",
    details: [
      "Top merit position on the provincial education board.",
      "Presented by the Chief Minister of Punjab.",
    ],
  },
];
