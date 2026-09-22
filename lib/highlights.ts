export type HighlightItem = {
  slug: string;
  title: string;
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
    slug: "adobe-ai-product-strategy",
    title: "Adobe AI Product Strategy",
    image: "/highlight-adobe-ai.jpg",
    text: "Adobe AI Product Strategy",
    oneLiner:
      "Designed the adoption and retention layer for the Adobe Life AI product under strict legal constraints.",
    summary:
      "I collaborated directly with an Adobe Product Manager to build an adaptive workplace AI system. I used constraint-aware design to comply with the EU AI Act Article 5. The system relies entirely on behavioral signals rather than inferred emotions.",
    details: [
      "Defined activation metrics and user-declared interaction modes.",
      "Engineered a behavioral-signal retention mechanism called Active-Shift logic.",
      "Authored the feature sequencing logic for a three-part product launch.",
    ],
    pdfs: [
      {
        title: "Original Adobe Delivery",
        description: "Full delivered PDF for the Adobe AI product strategy project.",
        href: "/adobe-ai-product-strategy-original.pdf",
      },
      {
        title: "PRD Summary",
        description: "Problem, users, solution, and TPM relationship summary.",
        href: "/adobe-ai-product-summary-prd.pdf",
      },
    ],
  },
  {
    slug: "ar-razzaq-foundation",
    title: "Ar-Razzaq Foundation Co-Founder",
    image: "/highlight-ar-razzaq.jpg",
    text: "Ar-Razzaq Foundation Co-Founder",
    oneLiner:
      "Co-founded a non-profit organization and scaled a regional logistics network from scratch.",
    summary:
      "I used audience-first research to identify and solve critical resource gaps in local communities. I structured a fundraising framework that generated over 2 million PKR. I managed the allocation of these funds to ensure high-impact results across education and healthcare.",
    details: [
      "Raised PKR 2M+ to fund 14 full academic scholarships and critical surgeries.",
      "Provided seed capital for multiple women-led ventures.",
      "Distributed over 4,500 clothing units across a custom logistics network.",
    ],
  },
  {
    slug: "lead-academic-researcher",
    title: "Lead Academic Researcher",
    image: "/highlight-academic-research.jpg",
    text: "Lead Academic Researcher",
    oneLiner:
      "Published a mixed-methods study on industrial pollution in the Kurdish Studies journal.",
    summary:
      "I led a formal research initiative investigating environmental inequity in the Attock District. I designed the empirical methodology to evaluate the health impacts of industrial pollution on low-income communities. I used modeling and outcome mapping to align findings with Sustainable Development Goals 3 and 6.",
    details: [
      "Executed a mixed-methods design using questionnaires and field interviews.",
      "Analyzed quantitative community health data using SPSS.",
      "Authored data-driven policy recommendations for public health interventions.",
    ],
  },
  {
    slug: "national-academic-gold-medal",
    title: "National Academic Gold Medal",
    image: "/highlight-academic-gold.jpg",
    text: "National Academic Gold Medal",
    oneLiner:
      "Awarded the Certificate of Merit by the Government of Punjab for academic excellence.",
    summary:
      "I received the Chief Minister's National Gold Medal in 2022. The government awarded this recognition based on my performance in the Secondary School Certificate examinations. It represents the highest tier of academic achievement at the provincial level.",
    details: [
      "Secured top merit position across the provincial educational board.",
      "Awarded formally by the Chief Minister of Punjab.",
      "Proved ability to execute with intense academic rigor.",
    ],
  },
];
