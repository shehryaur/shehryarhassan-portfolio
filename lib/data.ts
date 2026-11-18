export const site = {
  name: "Shehryar",
  fullName: "Shehryar Hassan",
  role: "AI Product Builder",
  avatar: "/avatar.webp",

  socials: {
    linkedin: "https://linkedin.com/in/shehryar-hassan",
    github: "https://github.com/shehryaur",
    instagram: "https://instagram.com/shehryaur",
    email: "mailto:contact@shehryarhassan.me",
  },
};

export const rotationTimeline = [
  { year: "2025", location: "Hasanabdal, Pakistan" },
  { year: "2026", location: "San Francisco, USA" },
  { year: "2027", location: "Tokyo, Japan" },
  { year: "2028", location: "Buenos Aires, Argentina" },
  { year: "2029", location: "Berlin – San Francisco" },
];

// -------- Projects (filterable list on /projects) --------
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
  { label: "Languages", skills: ["Python", "TypeScript", "JavaScript", "Rust", "Go", "C++", "SQL"] },
  { label: "Frontend", skills: ["React", "Next.js", "Three.js"] },
  { label: "Backend", skills: ["Node.js", "Express", "FastAPI"] },
  { label: "Data", skills: ["PostgreSQL", "Supabase", "ClickHouse", "SQLite"] },
  { label: "Tools", skills: ["Chrome Extensions", "PostHog", "Semgrep"] },
];

export const projects: Project[] = [
  {
    slug: "vexl",
    context: "YC Vexo Hacks Hackathon",
    name: "Vexl",
    role: "Developer",
    period: "Nov 2026",
    date: "2026-11-14",
    summary:
      "Smartband visit recorder that transcribes speech into clinical SOAP notes on-device.",
    results: [
      "100% on-device inference with zero cloud data transmission.",
      "Direct encrypted exports to FHIR, IPS, and CSV standards.",
    ],
    problem:
      "Manual EHR charting during appointments burns out doctors and diverts attention from patients.",
    built: [
      "Streamed 16 kHz BLE audio to faster-whisper and local Gemma models.",
      "Designed clinician verification flow before committing notes to the chart.",
      "Encrypted patient records client-side with AES-GCM.",
    ],
    skills: ["Python", "JavaScript", "Rust", "SQLite", "Gemma", "Whisper", "BLE"],
    repo: "https://github.com/shehryaur/vexo-hack",
    image: "/vexl.jpg",
  },
  {
    slug: "lanes",
    context: "2nd Place, AIE Code Summit",
    name: "Lanes",
    role: "Developer",
    period: "Nov 2026",
    date: "2026-11-08",
    award: "2nd Place, AIE Code Summit",
    summary:
      "Adaptive router for coding agents that cuts token costs without thrashing prompt cache.",
    results: [
      "2nd Place at Cerebral Valley's AIE Code Summit Hackathon.",
      "Reduced multi-turn token costs by 18% at equivalent high-thinking quality.",
      "Prevented KV cache-thrashing cost spikes up to 40%.",
    ],
    problem:
      "Mid-turn model switching wipes the prompt cache, reprocessing full conversation history at full price.",
    built: [
      "Classified turns into 3 thinking tiers with SubQ Snap.",
      "Preserved KV cache by piping cheap turns into persistent threads at input pricing.",
      "Distilled common git tasks into a local 1.5B LoRA model on Apple Silicon.",
    ],
    skills: ["Python", "TypeScript", "C++", "Rust", "Node.js", "Prompt Caching", "SubQ Snap", "LoRA"],
    repo: "https://github.com/shehryaur/aie-hack",
    image: "/lanes.png",
  },
  {
    slug: "overcrank",
    context: "3rd Place, Hack the Feed Hackathon",
    name: "Overcrank",
    role: "Developer",
    period: "Nov 2026",
    date: "2026-11-07",
    award: "3rd Place, Hack the Feed Hackathon",
    summary:
      "Automated video editing engine aligning raw takes to top-performing retention dynamics.",
    results: [
      "Awarded 3rd place at Hack the Feed hackathon.",
      "Generates auto-conformed timelines and starter packs from raw footage.",
    ],
    problem:
      "Creators rely on vague editing advice rather than quantitative pacing metrics like cut density and dead air.",
    built: [
      "Built visual telemetry pipelines with OpenCV and PySceneDetect to benchmark pacing.",
      "Automated silence trimming and dynamic zoom framing using FFmpeg.",
      "Packaged timeline assets, edit briefs, and starter files into exportable bundles.",
    ],
    skills: ["Python", "TypeScript", "FastAPI", "React", "OpenCV", "FFmpeg", "Claude API"],
    repo: "https://github.com/shehryaur/Overcrank",
    image: "/overcrank.png",
  },
  {
    slug: "curio",
    context: "1st Place, Google x k-ID Hackathon",
    name: "Curio",
    role: "Product lead and developer",
    period: "Oct 2026",
    date: "2026-10-24",
    award: "1st Place, Google x k-ID Hackathon",
    summary:
      "Camera app converting physical objects into interactive, age-adaptive 3D lessons.",
    results: [
      "Dynamically adapts explanations across 4 audience tiers from kids to seniors.",
    ],
    problem:
      "Physical objects are hard to explore on 2D screens, and learners need explanations tailored to their age.",
    built: [
      "Identified objects with Gemini Vision and generated 3D meshes via Meshy.",
      "Synthesized interactive voice walkthroughs with Inworld TTS and inline quizzes.",
      "Enforced k-ID age verification and parental consent for youth safety.",
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
      "Automated pipeline and Gmail dashboard organizing application stages and deadlines.",
    results: [
      "Parses relative deadlines ('within 7 days') into calendar alerts.",
      "Protects interview scheduling links from automated archiving.",
    ],
    problem:
      "High-volume job applications create an unmanageable stream of emails where critical deadlines get buried.",
    built: [
      "Ran Google Apps Script on 5-minute cron syncing recruiting emails to Google Sheets.",
      "Extracted roles, companies, and deadlines using Llama 3.1 on NVIDIA NIM.",
      "Built embedded Chrome extension dashboard displaying stages and upcoming dates.",
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
      "Deterministic MCP security gateway enforcing scoped file and host access for coding agents.",
    results: [
      "Blocks prompt injection, path traversal, and exfiltration prior to tool execution.",
      "Zero-LLM deterministic security that fails closed.",
    ],
    problem:
      "Autonomous coding agents executing tool calls on untrusted GitHub issues risk unauthorized system actions.",
    built: [
      "Enforced signed Intent Receipts defining permitted file paths and external hosts.",
      "Intercepted and validated all agent tool calls as the single MCP provider.",
      "Scanned code changes with Semgrep and streamed audit logs to ClickHouse.",
    ],
    skills: ["Python", "Go", "MCP", "Semgrep", "ClickHouse"],
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
      "Algorithmic degree planner generating conflict-free graduation schedules across prerequisite graphs.",
    results: [
      "Validated prerequisite roadmaps across 117 SFSU degree programs.",
    ],
    problem:
      "Manual multi-semester degree planning often fails due to hidden prerequisite chains and unit caps.",
    built: [
      "Engineered graph topological sort and cycle detection for course dependencies.",
      "Combined LLM career goal mapping with deterministic rules-based validation.",
      "Conducted user interviews with undergraduates and academic advisors.",
    ],
    skills: ["TypeScript", "JavaScript", "Python", "SQL", "React", "Node.js", "PostgreSQL", "Gemini"],
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
      "Sanitizes proprietary data bugs into verified synthetic reproducers for external debugging.",
    results: [
      "Guarantees sensitive production data remains strictly local.",
      "Exports self-contained reproducible packages with verifier scripts.",
    ],
    problem:
      "Sharing production bugs with external developers or models risks leaking confidential customer data.",
    built: [
      "Isolated test executions inside sandboxed Wasmer WebAssembly containers.",
      "Synthesized anonymized schema-compliant test fixtures with Gemini.",
      "Validated bug reproduction locally before permitting export.",
    ],
    skills: ["TypeScript", "Python", "React", "Express", "Wasmer", "Gemini"],
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
      "Automated agent detecting third-party API drift, patching call sites, and raising verified PRs.",
    results: [
      "All generated patches pass automated build, type-check, and test suites.",
      "Maintains human-in-the-loop review with no automated merges.",
    ],
    problem:
      "Unannounced third-party API changes break production features and require hours of manual tracing.",
    built: [
      "Mapped external API dependencies into AST call graphs to isolate affected code.",
      "Generated targeted minimal patches and ran test suites prior to PR creation.",
      "Fingerprinted API credentials to eliminate secret leakage.",
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
      "Localized lesson generator for low-resource schools, piloted with 15+ teachers across 8 districts.",
    results: [
      "Generates curriculum-aligned lesson packs for Grades 1-12 in under 30 seconds.",
      "Cut token costs by 50% using structured JSON schemas and caching.",
    ],
    problem:
      "Teachers spend hours manually adapting regional textbook curricula for under-resourced classrooms.",
    built: [
      "Iterated from Streamlit prototype to production Next.js and Supabase platform.",
      "Offloaded long-running generations to Inngest asynchronous background queues.",
      "Built localized worksheet layouts with lightweight WhatsApp sharing.",
    ],
    skills: ["TypeScript", "Python", "SQL", "Next.js", "Supabase", "PostgreSQL", "Inngest", "Gemini"],
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
      "Peer-to-peer campus ridesharing Telegram Mini App scaling to 130+ concurrent student riders.",
    results: [
      "Scaled to 130+ concurrent users with zero paid marketing.",
      "Reduced ride no-shows by 45% via automated arrival alerts.",
    ],
    problem:
      "Campus ride requests in group chats get buried immediately without structured coordination.",
    built: [
      "Built Telegram Mini App embedded directly into existing university group chats.",
      "Implemented arrival webhooks and automated hourly cleanup crons.",
      "Tracked onboarding funnels and drop-offs using PostHog analytics.",
    ],
    skills: ["JavaScript", "SQL", "React", "Node.js", "Supabase", "Telegram Bot API", "PostHog"],
    url: "https://muv-ten.vercel.app/",
    repo: "https://github.com/shehryaur/muv",
    image: "/muv.png",
  },
];

// -------- Experience Timeline --------
// Hybrid of the PM/FDE and SWE resumes: product, client-facing, and engineering work.
export type Experience = {
  slug?: string;
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
    slug: "blackmont-consulting",
    period: "Apr 2026 - Jul 2026",
    role: "Technical Solutions Intern",
    company: "Blackmont Consulting",
    about: "Enterprise B2B technology advisory",
    location: "London, UK (Remote)",
    highlights: [
      "Accelerated client time-to-value by 40% with automated Python & SQL ETL pipelines.",
      "Integrated REST APIs and webhooks across 10+ enterprise SaaS platforms.",
      "Led weekly integration triage, unblocking migrations across 15+ endpoints.",
      "Authored interface specifications and JSON schema mapping documentation.",
    ],
    stack: ["Python", "SQL", "REST APIs", "Webhooks", "JSON"],
  },
  {
    slug: "skill-craft-technologies",
    period: "Jan 2026 - Apr 2026",
    role: "Product Management Intern",
    company: "Skill Craft Technologies",
    about: "E-commerce logistics platform",
    location: "Remote",
    highlights: [
      "Reduced sprint revisions by 35% across 3 pods by standardizing PRDs and acceptance criteria.",
      "Launched OTP delivery verification workflow, significantly cutting return disputes.",
      "Automated cross-pod regression API testing using Python and Postman.",
      "Instrumented Mixpanel and SQL funnels to pinpoint and optimize courier handoff drop-offs.",
    ],
    stack: ["PRDs", "Jira", "Python", "Postman", "SQL", "Mixpanel"],
  },
  {
    slug: "adobe",
    period: "Sep 2025 - May 2026",
    role: "AI Product Strategist",
    company: "Adobe (University-Industry Partnership)",
    about: "Year-long Minerva University partnership",
    location: "San Francisco, CA",
    highlights: [
      "Authored 33-page enterprise AI product strategy presented to Adobe Life PM leadership.",
      "Prototyped 3-layer LLM triage pipeline ranking workplace messages with Figma A/B testing.",
    ],
    stack: ["User Research", "LLMs", "NLP", "Figma", "A/B Testing"],
    links: [
      { label: "Strategy deck (PDF)", href: "/adobe-ai-product-strategy-original.pdf" },
      { label: "PRD summary (PDF)", href: "/adobe-ai-product-summary-prd.pdf" },
    ],
  },
];
