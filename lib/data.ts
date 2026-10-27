export const site = {
  name: "Shehryar",
  fullName: "Shehryar Hassan",
  roles: [
    "AI Product Builder",
    "Technical PM",
    "Forward Deployed Engineer",
    "Full-Stack Developer",
  ],
  handle: "shehryaur",
  location: "San Francisco, CA",
  avatar: "/avatar.webp",

  socials: {
    linkedin: "https://linkedin.com/in/shehryar-hassan",
    github: "https://github.com/shehryaur",
    instagram: "https://instagram.com/shehryaur",
    email: "mailto:contact@shehryarhassan.me",
  },
};

// -------- Projects (shown as a filterable timeline on /projects) --------
export type Project = {
  slug: string;
  name: string;
  role: string;
  context: string;               // short grey line under the name
  period: string;                // display label, e.g. "Oct 2026"
  date: string;                  // sort key (YYYY-MM-DD), newest first
  award?: string;
  summary: string;               // one line, always visible
  results: string[];             // always visible
  problem: string;               // shown when the entry is expanded
  built: string[];               // shown when the entry is expanded
  skills: string[];              // technical skills; drives the filter
  url?: string;                  // live demo
  repo?: string;
  image?: string;                // screenshot, shown when expanded
};

/** Skills offered as filters on /projects. Each must appear in some project's `skills`. */
export const skillGroups: { label: string; skills: string[] }[] = [
  { label: "Languages", skills: ["Python", "TypeScript", "JavaScript", "Go"] },
  { label: "Frontend", skills: ["React", "Next.js", "Three.js"] },
  { label: "Backend", skills: ["Node.js", "Express", "FastAPI"] },
  { label: "Data", skills: ["PostgreSQL", "Supabase", "ClickHouse"] },
  { label: "Tools", skills: ["Chrome Extensions", "PostHog", "Semgrep"] },
];

export const projects: Project[] = [
  {
    slug: "curio",
    context: "1st Place, Google x k-ID Hackathon",
    name: "Curio",
    role: "Product lead and developer",
    period: "Oct 2026",
    date: "2026-10-24",
    award: "1st Place, Google x k-ID Hackathon",
    summary:
      "Point a phone at any object and learn it as an interactive 3D lesson, adapted to the viewer's age.",
    results: [
      "4 age-adapted experiences, from kids to seniors, in one flow.",
    ],
    problem:
      "Learning how everyday objects work is abstract on a flat screen, and kids, teens and adults need very different explanations, with real safety limits for minors.",
    built: [
      "Gemini Vision recognizes the object; Meshy turns the photo into a 3D model with labelled parts to dissect.",
      "A voice guide (Inworld TTS) explains each part, with quizzes at the end.",
      "k-ID age checks and parental consent before hazard content unlocks for minors.",
    ],
    skills: ["TypeScript", "Next.js", "React", "Three.js", "Gemini"],
    repo: "https://github.com/shehryaur/Curio",
  },
  {
    slug: "job-tracker",
    context: "Gmail tracker for job applications",
    name: "Job Application Tracker",
    role: "Builder",
    period: "Oct 2026",
    date: "2026-10-23",
    summary:
      "Turns a messy job-search inbox into a board of applications, stages, and real deadlines.",
    results: [
      "Converts phrases like \"within 7 days of receiving this email\" into actual due dates.",
      "Emails with scheduling links are never archived, even if the model reads them as a rejection.",
    ],
    problem:
      "Applying to 30+ roles turns Gmail into a flat stream of ATS receipts, recruiter emails and take-home deadlines. Relative deadlines get buried with no date or reminder.",
    built: [
      "Google Apps Script with read-only Gmail access runs every 5 minutes and writes one row per email to a Google Sheet.",
      "Rules decide the stage and archive status; an LLM (Llama 3.1 on NVIDIA NIM) only extracts company, role and deadline phrases.",
      "A Chrome extension adds a Job Tracker dashboard inside Gmail with stage counts and upcoming deadlines.",
    ],
    skills: ["JavaScript", "Google Apps Script", "Chrome Extensions", "NVIDIA NIM"],
    repo: "https://github.com/shehryaur/Personal-Mail-Organizer",
  },
  {
    slug: "hold",
    context: "Cyberdefense Hackathon, SF Tech Week",
    name: "HOLD",
    role: "Builder, Cyberdefense Hackathon at SF Tech Week",
    period: "Oct 2026",
    date: "2026-10-10",
    summary:
      "An MCP gateway that limits AI coding agents to the files and hosts a developer approved for one task.",
    results: [
      "Blocks prompt injection, data exfiltration, and path traversal before the tool call runs.",
      "Deterministic decisions with no LLM in the loop; fails closed.",
    ],
    problem:
      "Coding agents read untrusted text like GitHub issues while holding real tools. A malicious issue can ask the agent to do something the developer never approved.",
    built: [
      "The developer approves an Intent Receipt listing the files and hosts allowed for one task.",
      "HOLD is the agent's only tool provider and checks every call against the receipt before running it.",
      "Allowed writes are scanned with Semgrep; every decision is logged to ClickHouse for a live dashboard.",
    ],
    skills: ["Go", "Python", "MCP", "Semgrep", "ClickHouse"],
    repo: "https://github.com/shehryaur/Hold",
  },
  {
    slug: "planed",
    context: "Winner, SF Hacks x GDG Hackathon",
    name: "PlanEd",
    role: "Product lead and developer",
    period: "Oct 2026",
    date: "2026-10-03",
    award: "Winner, SF Hacks x GDG Hackathon",
    summary:
      "A degree planner for SFSU students whose rules engine builds conflict-free graduation plans.",
    results: [
      "Covers 117 majors from the SFSU Bulletin.",
    ],
    problem:
      "Students plan 8 semesters by hand against prerequisite chains, unit caps and requirement groups. One mistake can push graduation back a term.",
    built: [
      "Interviewed students and advisors before writing code.",
      "A graph-based prerequisite engine (cycle detection, topological sort) checks every move on the board.",
      "An AI planner proposes a plan from a career goal; the engine validates it and falls back to a deterministic planner.",
    ],
    skills: ["TypeScript", "JavaScript", "React", "Node.js", "PostgreSQL", "Python", "Gemini"],
    url: "https://stundent-planner.marketingmeteor.workers.dev",
    repo: "https://github.com/shehryaur/stundent-planner",
    image: "/planed.png",
  },
  {
    slug: "reprosafe",
    context: "AI Security Hackathon",
    name: "ReproSafe",
    role: "Builder, AI Security Hackathon",
    period: "Sep 2026",
    date: "2026-09-19",
    summary:
      "Turns private Python data bugs into synthetic reproducers, so they can be debugged without sharing real data.",
    results: [
      "Raw private inputs stay local by default.",
      "Exports portable repro packages with reviewed source and verifier code.",
    ],
    problem:
      "Developers need help reproducing production data bugs, but sending real fixtures or private code to outside tools can leak customer data.",
    built: [
      "Strict schemas accept a narrow Python module and JSON fixture, so every run stays bounded.",
      "Cases run in an isolated Wasmer worker with no model key and no network access.",
      "Generates synthetic replacements and runs every candidate before anything can be exported.",
    ],
    skills: ["TypeScript", "React", "Express", "Python", "Wasmer", "Gemini"],
    repo: "https://github.com/shehryaur/reprosafe-demo",
    image: "/reprosafe.png",
  },
  {
    slug: "chowkidaar",
    context: "Agent that fixes API drift",
    name: "Chowkidaar",
    role: "Builder",
    period: "Sep 2026",
    date: "2026-09-18",
    summary:
      "An AI agent that detects API contract drift, patches the affected code, and opens a pull request.",
    results: [
      "Every fix passes tests, type-check and build before a PR is opened.",
      "Never auto-merges; a person reviews every change.",
    ],
    problem:
      "API integrations break when a provider changes behavior, and teams lose time tracing the blast radius before they can write a fix.",
    built: [
      "Maps external API usage into a dependency graph so the agent only touches affected call paths.",
      "Writes the smallest patch, runs the project's checks, then opens a GitHub PR.",
      "Stores fingerprints of credentials instead of raw secrets.",
    ],
    skills: ["Python", "Go", "TypeScript", "FastAPI", "React", "OpenAI"],
    repo: "https://github.com/shehryaur/ChowkidaarAPI",
    image: "/chowkidaar.png",
  },
  {
    slug: "seekho-v2",
    context: "GenAI lesson planner, 15+ teachers",
    name: "Seekho",
    role: "Founder",
    period: "May 2026 - Aug 2026",
    date: "2026-08-01",
    summary:
      "A GenAI lesson planner for low-resource classrooms, piloted with 15+ teachers across 8 districts.",
    results: [
      "Curriculum-aligned lesson packs for Grades 1-12 in under 30 seconds, down from hours.",
      "Cut LLM token costs 50% with structured JSON outputs and caching.",
    ],
    problem:
      "Teachers in Pakistan spend hours preparing lessons mapped to their regional textbook board, with little localized material.",
    built: [
      "Validated demand with a Streamlit MVP, then rebuilt it in Next.js and Supabase.",
      "Long generations run as Inngest background jobs, so teachers can close the tab and come back to a finished pack.",
      "Local examples, print layouts and WhatsApp sharing for classrooms with few devices.",
    ],
    skills: ["TypeScript", "Next.js", "Supabase", "PostgreSQL", "Python", "Inngest", "Gemini"],
    url: "https://seekhopunjab.vercel.app/",
    repo: "https://github.com/shehryaur/Seekho-v2",
    image: "/seekho-v2.png",
  },
  {
    slug: "muv",
    context: "Telegram ride-sharing app, 130+ users",
    name: "MUV",
    role: "Creator",
    period: "Jun 2026 - Jul 2026",
    date: "2026-07-15",
    summary:
      "A ride-sharing Telegram Mini App for students that scaled to 130+ concurrent users.",
    results: [
      "130+ concurrent users with no paid acquisition.",
      "Cut no-shows 45% with automated arrival alerts.",
    ],
    problem:
      "Campus rides were organized in group chats where offers got buried in minutes, and nobody wanted a separate app for a one-off ride.",
    built: [
      "A Telegram Mini App that runs inside the group chats students already use.",
      "Webhook alerts tell riders when their ride arrives; hourly cron jobs clear expired rides.",
      "Rider funnels tracked in PostHog to find drop-off points.",
    ],
    skills: ["JavaScript", "React", "Node.js", "Supabase", "Telegram Bot API", "PostHog"],
    url: "https://muv-ten.vercel.app/",
    repo: "https://github.com/shehryaur/muv",
    image: "/muv.png",
  },
];

// -------- Experience Timeline --------
// Hybrid of the PM/FDE and SWE resumes: product, client-facing, and engineering work.
export type Experience = {
  period: string;
  role: string;
  company: string;
  about: string; // one line on what the company is, shown under the role
  location: string;
  highlights: string[];
  stack: string[];
  links?: { label: string; href: string }[];
};

export const experience: Experience[] = [
  {
    period: "Apr 2026 - Jul 2026",
    role: "Technical Solutions Intern",
    company: "Blackmont Consulting",
    about: "B2B tech advisory for enterprise clients",
    location: "London, UK (Remote)",
    highlights: [
      "Cut client time-to-value 40% by replacing manual API ingestion with Python and SQL ETL pipelines.",
      "Integrated REST APIs and webhooks across 10+ B2B SaaS systems and designed the JSON schema mappings.",
      "Embedded with enterprise clients to scope integrations, and ran weekly triage that unblocked data migrations across 15+ endpoints.",
      "Wrote interface specs and schema-mapping docs for client engineering teams.",
    ],
    stack: ["Python", "SQL", "REST APIs", "Webhooks", "JSON"],
  },
  {
    period: "Jan 2026 - Apr 2026",
    role: "Product Management Intern",
    company: "Skill Craft Technologies",
    about: "E-commerce logistics startup",
    location: "Remote",
    highlights: [
      "Cut sprint revisions 35% by standardizing PRDs, acceptance criteria, and Jira across 3 pods.",
      "Specced and launched an OTP-verified parcel workflow to curb return-to-origin disputes, including its backend state machine and REST API contracts.",
      "Automated API testing with Python and Postman across all 3 pods.",
      "Built SQL and Mixpanel funnels to track OTP completion and pinpoint courier handoff drop-offs.",
    ],
    stack: ["PRDs", "Jira", "Python", "Postman", "SQL", "Mixpanel"],
  },
  {
    period: "Sep 2025 - May 2026",
    role: "AI Product Strategist",
    company: "Adobe",
    about: "Year-long Minerva University partnership with Adobe",
    location: "San Francisco, CA",
    highlights: [
      "Led user discovery and a 33-page AI product strategy for Adobe Life PM leadership (30,000+ staff).",
      "Specced and prototyped a 3-layer LLM pipeline that ranks Slack and Teams messages, and validated it with A/B tests in Figma.",
    ],
    stack: ["User Research", "LLMs", "NLP", "Figma", "A/B Testing"],
    links: [
      { label: "Strategy deck (PDF)", href: "/adobe-ai-product-strategy-original.pdf" },
      { label: "PRD summary (PDF)", href: "/adobe-ai-product-summary-prd.pdf" },
    ],
  },
];
