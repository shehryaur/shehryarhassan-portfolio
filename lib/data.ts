export const site = {
  name: "Shehryar",
  fullName: "Shehryar Hassan",
  role: "AI Product Manager",
  roles: [
    "AI Product Manager",
    "Technical PM",
    "Growth Engineer",
    "Full-Stack Builder",
    "Zero-to-One Operator",
  ],
  tagline: "Ship. Measure. Iterate.",
  handle: "shehryaur",
  location: "Pakistan",
  avatar: "/avatar.jpg",
  
  socials: {
    x: "https://x.com/shehryarhassan",
    linkedin: "https://linkedin.com/in/shehryar05",
    github: "https://github.com/shehryaur",
    instagram: "https://instagram.com/shehryaur",
    rss: "/rss.xml",
    email: "mailto:contact@shehryarhassan.me",
    site: "https://shehryarhassan.ai",
  },
  githubStats: {
    contributions: 1240,
    handle: "shehryaur",
  },
};

// -------- Currently Shipping (home cards) --------
export type ShippingItem = {
  name: string;
  metric: string;
  description: string;
  liveUrl: string;
  notesUrl?: string;
};

export const shipping: ShippingItem[] = [
  {
    name: "Seekho Platform",
    metric: "MVP to 0% timeout failures",
    description:
      "Validated with a Streamlit MVP, then rebuilt as an async curriculum engine for local educators.",
    liveUrl: "https://github.com/shehryaur/Seekho-v2",
    notesUrl: "/projects/seekho-v2",
  },
  {
    name: "MUV",
    metric: "Zero-friction acquisition",
    description:
      "Serverless campus carpool utility built natively inside Telegram.",
    liveUrl: "https://github.com/shehryaur/muv",
    notesUrl: "/projects/muv",
  },
  {
    name: "Forumcue",
    metric: "Roadmap telemetry",
    description:
      "Semantic classifier that turns forum noise into a ranked product backlog.",
    liveUrl: "#",
    notesUrl: "/projects/forumcue",
  },
];

// -------- Full Projects --------
export type Project = {
  slug: string;
  name: string;
  subtitle: string;              // "Role focus" line under the title
  metric: string;
  tagline: string;
  description: string;           // card summary
  longDescription: string;       // detail-page intro line
  vision: string;                // one-line "Product Vision" quote for the modal
  userProblem: string;           // "The User Problem" paragraph
  decisions: string[];           // "Technical PM Decisions" bullets
  impact: string[];              // "Product Impact" bullets
  url: string;                   // primary link (usually the repo)
  repo?: string;
  stack: string[];               // tech badges
  tags: string[];                // category tags (used for hover-color)
  status: "active" | "beta" | "archived";
  date: string;
  featured?: boolean;
  /** Screenshot / preview image shown inside the browser mock on the card + detail page. */
  image: string;
};

export const projects: Project[] = [
  {
    slug: "seekho-v2",
    name: "Seekho Platform",
    subtitle: "AI Product Strategy & Technical Product Management",
    metric: "MVP to 0% timeout failures",
    tagline: "Validated curriculum matching, then rebuilt for production",
    description:
      "A local educator platform that moved from a Streamlit demand-validation MVP to an offline-first, async curriculum engine with reliable AI delivery.",
    longDescription:
      "Validated regional curriculum-matching demand quickly, then turned the fragile lesson generator into a production-ready pipeline with background workers and persistent state.",
    vision:
      "Scaling a localized educational generator from a low-fidelity validation prototype into a production-grade learning platform.",
    userProblem:
      "Educators needed custom learning materials mapped to regional textbook boards, but the idea first needed demand validation. Once validated, large generative lesson plans created a second problem: long compilation loops froze the interface and caused standard API gateways to drop requests.",
    decisions: [
      "Shipped a rapid Streamlit MVP with SQLite content parsing to test curriculum-matching demand before investing in the full platform.",
      "Rebuilt the validated loop in Next.js and Supabase, then moved long generation work into an asynchronous, event-driven pipeline using Inngest background workers.",
      "Persisted intermediate state in Supabase so users can close the browser mid-run and return to a completed plan later.",
    ],
    impact: [
      "Validated the core product hypothesis in days and used the interaction signal to justify scaling from MVP to v2.",
      "Reduced processing failures to 0% by shifting heavy computation off the request thread.",
      "Kept the UI fully interactive during long AI workloads, lifting retention through generation.",
    ],
    url: "https://seekhopunjab.vercel.app/",
    repo: "https://github.com/shehryaur/Seekho-v2",
    stack: ["Next.js", "TypeScript", "Supabase", "Inngest", "Streamlit", "Python", "LLMs"],
    tags: ["AI", "Product", "EdTech", "MVP"],
    status: "active",
    date: "2025-11-01",
    featured: true,
    image: "/seekho-v2.png",
  },
  {
    slug: "muv",
    name: "MUV",
    subtitle: "Growth & Technical Product Management",
    metric: "Zero acquisition cost",
    tagline: "Serverless campus carpool inside Telegram",
    description:
      "A serverless carpool coordination tool built directly into Telegram, eliminating app friction and driving quick student adoption.",
    longDescription:
      "Built a zero-friction ride-sharing flow with native chat onboarding, webhook coordination, and automated cleanup.",
    vision:
      "Engineering a zero-friction distribution framework that uses pre-existing community chat ecosystems to maximize growth.",
    userProblem:
      "Campus ride-sharing was chaotic. Group chats buried ride availability within minutes, and a standalone mobile app presented far too much download friction for a quick, one-off utility.",
    decisions: [
      "Built a lightweight Telegram Mini-App so users run the utility natively inside their existing group chats.",
      "Deployed modular serverless endpoints on Vercel for webhook, join, and share flows to process location and roster data.",
      "Ran scheduled cron cleanup jobs to purge expired rides hourly and keep the marketplace accurate.",
    ],
    impact: [
      "Bypassed traditional app-store conversion drop, unlocking rapid community onboarding.",
      "Achieved organic scale with zero paid acquisition by embedding directly into active group chats.",
      "Maintained high listing quality through automated cleanup, preventing marketplace decay and sustaining trust.",
    ],
    url: "https://muv-ten.vercel.app/",
    repo: "https://github.com/shehryaur/muv",
    stack: ["Node.js", "Vercel Serverless", "Telegram Bot API", "Cron"],
    tags: ["Growth", "Serverless", "Community"],
    status: "active",
    date: "2025-06-15",
    featured: true,
    image: "/muv.png",
  },
  {
    slug: "reprosafe",
    name: "ReproSafe",
    subtitle: "AI Security & Technical Product Management",
    metric: "Synthetic reproducers",
    tagline: "Private bug isolation without raw data exposure",
    description:
      "A local AI security prototype that turns private Python data-processing bugs into reviewed synthetic reproducers before any AI-assisted patching.",
    longDescription:
      "Built a privacy-first workflow for isolating sensitive data failures, validating synthetic fixtures, and exporting minimal repro packages for safe review.",
    vision:
      "Helping teams debug private data pipelines without leaking the raw inputs that caused the failure.",
    userProblem:
      "Developers often need help reproducing production data bugs, but sending real fixtures or private code context to external tools can expose sensitive values and customer data.",
    decisions: [
      "Accepted a narrow Python module and JSON fixture through strict schemas so every run stays bounded and reviewable.",
      "Executed cases in an isolated Wasmer worker with no inherited model key and no guest networking.",
      "Generated deterministic synthetic replacements and executed every candidate before allowing export or optional AI patch review.",
    ],
    impact: [
      "Reduced accidental data release risk by keeping raw private inputs local by default.",
      "Turned fragile bug reports into portable repro packages with reviewed source, verifier code, and bounded metadata.",
      "Bound AI request approval to provider, model, payload identity, and destination so review happens before transmission.",
    ],
    url: "https://github.com/shehryaur/reprosafe-demo",
    repo: "https://github.com/shehryaur/reprosafe-demo",
    stack: ["React", "TypeScript", "Vite", "Express", "Wasmer", "Gemini", "Anthropic"],
    tags: ["AI Security", "Privacy", "Developer Tools"],
    status: "beta",
    date: "2026-09-19",
    featured: true,
    image: "/reprosafe.png",
  },
  {
    slug: "chowkidaar",
    name: "Chowkidaar",
    subtitle: "AI Reliability & Agentic Engineering",
    metric: "PR-ready fixes",
    tagline: "Autonomous watchman for brittle API integrations",
    description:
      "An API reliability layer that maps external-service drift to affected code paths, proposes focused fixes, runs checks, and opens PR-ready review flows.",
    longDescription:
      "Built an always-on API maintenance agent that narrows provider drift, environment changes, and traffic pressure to the exact pipeline that needs attention.",
    vision:
      "Replacing surprise integration breakages with early detection, focused remediation, and human-reviewed pull requests.",
    userProblem:
      "API integrations usually fail after a provider changes behavior and a developer notices in production. Teams lose time tracing blast radius before they can even write the fix.",
    decisions: [
      "Mapped external API usage into a repository graph so the agent works on affected call paths instead of wandering the whole codebase.",
      "Added simulations and live audits that score pressure, latency, failures, and recommended fixes before users feel an incident.",
      "Designed the apply workflow to write the smallest safe patch, run project checks, and open a PR review flow without auto-merging.",
    ],
    impact: [
      "Moves API maintenance from reactive debugging to proactive contract, environment, and traffic monitoring.",
      "Keeps secrets safer by fingerprinting credentials locally instead of storing raw values.",
      "Turns maintenance work into reviewable evidence: graph context, simulation output, validation checks, and a proposed branch.",
    ],
    url: "https://github.com/shehryaur/ChowkidaarAPI",
    repo: "https://github.com/shehryaur/ChowkidaarAPI",
    stack: ["FastAPI", "React", "Python", "TypeScript", "OpenAI", "GitHub PRs", "Graph Analysis"],
    tags: ["AI Agents", "Reliability", "API Monitoring"],
    status: "beta",
    date: "2026-09-18",
    featured: true,
    image: "/chowkidaar.png",
  },
  {
    slug: "forumcue",
    name: "Forumcue",
    subtitle: "AI Product Management",
    metric: "Roadmap telemetry",
    tagline: "Semantic classifier for community backlogs",
    description:
      "Converts chaotic community forum text into structured product roadmaps. Uses automated vector pipelines to rank user feature requests quantitatively.",
    longDescription:
      "Using semantic classification systems to turn chaotic internet discussion threads into quantitative product roadmaps.",
    vision:
      "Using semantic classification systems to turn chaotic internet discussion threads into quantitative product roadmaps.",
    userProblem:
      "Product teams wasted hours crawling forums manually. Crucial bug reports and feature requests were lost in unstructured noise, and prioritisation defaulted to whoever shouted loudest.",
    decisions: [
      "Designed an automated ingestion pipeline that crawls active developer discussion hubs and normalises raw text.",
      "Indexed entries in a vector database keyed by contextual product relevance for fast semantic lookup.",
      "Deployed classification models that auto-tag threads to explicit engineering feature components.",
    ],
    impact: [
      "Replaced subjective roadmap guesswork with concrete, quantitative user telemetry.",
      "Surfaced high-frequency issues in real time so engineering could ship hotfixes faster.",
      "Tracked sentiment shifts systematically, letting leadership target resources where demand was actually highest.",
    ],
    url: "#",
    stack: ["Python", "Vector DBs", "Semantic Classification"],
    tags: ["AI", "Analytics", "Product"],
    status: "beta",
    date: "2026-03-05",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
  },
];

// -------- Experience Timeline --------
export type Experience = {
  period: string;
  role: string;
  company: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    period: "Apr 2026 to Present",
    role: "Business Development Intern",
    company: "Blackmont Consulting",
    highlights: [
      "Onboarded two startup clients and secured signed MOUs within 30 days.",
      "Managed onboarding documentation and maintained accurate data records for all client proposals.",
    ],
    stack: ["Business Development", "Client Operations", "Process Documentation"],
  },
  {
    period: "Jan 2026 to Apr 2026",
    role: "Project Management Intern",
    company: "Skill Craft Technologies",
    highlights: [
      "Analyzed Daraz against competitors like PriceOye to identify market gaps.",
      "Proposed an Open Parcel Verification feature to fix trust issues and win back high-value buyers.",
      "Built an async framework for distributed teams with a 12-hour time gap, eliminating midnight meetings.",
    ],
    stack: ["Product Strategy", "Market Research", "Team Operations"],
  },
  {
    period: "June 2024 to Aug 2024",
    role: "Retail Operations Intern",
    company: "Tim Hortons",
    highlights: [
      "Found user friction points using customer feedback and sales data.",
      "Redesigned the in-store journey in collaboration with the Head of Design.",
      "Increased the Customer Satisfaction Score by 17 percent in two months.",
    ],
    stack: ["Retail Operations", "Customer Experience", "Data Analysis"],
  },
];

// -------- Blogs --------
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
};

export const posts: Post[] = [];

// -------- Tools --------
export type Tool = {
  name: string;
  category: string;
  description: string;
  url: string;
};

export const tools: Tool[] = [];
