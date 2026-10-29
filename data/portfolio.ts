/**
 * ALL site content lives here. Edit this file only — no component changes needed.
 * Anything marked TODO is a placeholder waiting for your real details.
 */

export const site = {
  name: "Shifana Siddieeq",
  firstName: "Shifana",
  title: "Software Engineer",
  tagline: "Full-Stack Developer",
  location: "Dubai, UAE",
  email: "shifanasiddeek7@gmail.com",
  linkedin: "https://www.linkedin.com/in/shifana-siddieeq",
  github: "https://github.com/Shifanasiddieeq",
  photo: "/shifana.jpg",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shifana.dev",
  summary:
    "4+ years building production apps with the MERN/TypeScript stack. Primary developer on an enterprise ERP for a Dubai construction company. Former Assistant Professor of Computer Science.",
  // Accent colour as RGB triplets. Change these to retheme the whole site.
  // accent is used on the light theme, accentDark on the dark theme (slightly brighter for contrast).
  // blue: "37 99 235" / "59 130 246"  |  teal: "13 148 136" / "20 184 166"  |  violet: "124 58 237" / "139 92 246"
  accent: "37 99 235",
  accentDark: "59 130 246",
  accentSoft: "96 165 250",
};

export const about = {
  heading: "Software engineer building systems businesses run on.",
  paragraphs: [
    "I'm a full-stack software engineer with 4+ years of experience building production systems — ERPs, approval workflows and client portals — with TypeScript, Next.js, Node.js and PostgreSQL.",
    "At KEA Building Contracting in Dubai I'm the primary developer of a modular ERP spanning HR, payroll, project management and a client portal, including an AI assistant that answers questions over live company data.",
    "I care about clean architecture, data integrity and secure access control — the details that keep enterprise software reliable. I also mentor junior developers and build side projects in algorithmic trading.",
  ],
  stats: [
    { value: "4+", label: "Years building" },
    { value: "20+", label: "ERP modules shipped" },
    { value: "3", label: "Languages spoken" },
  ],
};

export type SkillGroup = { name: string; items: string[] };

export const skills: SkillGroup[] = [
  { name: "Frontend", items: ["Next.js", "React", "TypeScript", "React Native", "Expo", "Tailwind CSS", "GSAP"] },
  { name: "Backend", items: ["Node.js", "Express", "Python", "Django", "Flask", "REST APIs", "BullMQ"] },
  { name: "Data", items: ["PostgreSQL", "Prisma", "MongoDB", "Redis", "SQL"] },
  { name: "DevOps", items: ["Docker", "AWS", "EC2", "S3", "CI/CD", "Git"] },
  { name: "Languages", items: ["English", "Malayalam", "Hindi", "Arabic"] },
];

export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    role: "Software Engineer",
    company: "KEA Building Contracting LLC",
    location: "Dubai, UAE",
    period: "Mar 2026 — Present",
    current: true,
    bullets: [
      "Lead developer of an enterprise construction ERP covering HR, payroll, fleet GPS tracking, biometric attendance, asset and document management.",
      "Built a config-driven multi-level approval workflow engine reused across modules.",
      "Shipped an AI copilot over live ERP data with permission-aware, read-only tool calling.",
      "Designed a bilingual (English/Arabic RTL) client portal backend with audit logging and rate limiting.",
      "Mentor junior developers; set up the team's shared UI system and code-review workflow.",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Brototype",
    location: "Calicut, India",
    period: "Sep 2022 — Dec 2025",
    bullets: [
      // TODO: replace with 2–3 real achievements from your resume
      "Built and shipped full-stack web applications using the MERN stack and TypeScript.",
      "Developed e-commerce platforms with Python (Django and Flask) and SQL/MongoDB backends.",
      "Containerised services with Docker and deployed to AWS.",
    ],
  },
  {
    role: "Assistant Professor",
    company: "S.M.I. College, University of Calicut",
    location: "Kerala, India",
    period: "Jul 2021 — Aug 2022",
    bullets: [
      "Taught Data Structures, PHP and Operations Research to undergraduate students.",
      "Designed coursework and lab exercises bridging theory and real-world programming.",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  stack: string[];
  highlights: string[];
  links?: { label: string; href: string }[];
  // Featured projects span the full row with the visual beside the text
  featured?: boolean;
  // Illustrated app screen shown on the card…
  preview: "erp" | "chat" | "portal" | "mentor";
  // …unless you add a real screenshot, e.g. put it in public/projects/ and set image: "/projects/erp.png"
  image?: string;
  gradient: string;
};

export const projects: Project[] = [
  {
    slug: "construction-erp",
    title: "Enterprise Construction ERP",
    tagline: "One system for HR, fleet, assets, documents and projects.",
    description:
      "A full-stack ERP used daily by a Dubai construction company. Modules span HR and payroll, GPS fleet tracking, biometric attendance, asset management, leave and deduction workflows, and document management with OCR extraction.",
    role: "Lead developer",
    stack: ["Next.js", "TypeScript", "Node.js", "Prisma", "PostgreSQL", "Redis", "AWS"],
    highlights: [
      "Config-driven approval engine with 4-tier chains per module",
      "Project Management suite: RFI, NCR, Site Instructions, Variation Orders, Commercial",
      "Dockerised deployment on AWS EC2 with S3 and BullMQ job queues",
    ],
    featured: true,
    preview: "erp",
    gradient: "from-blue-600/40 via-indigo-500/15 to-transparent",
  },
  {
    slug: "ai-erp-copilot",
    title: "AI ERP Copilot",
    tagline: "Ask the ERP a question. Get an answer, not a report.",
    description:
      "A chat assistant for HR and admin staff built on Claude, answering natural-language questions over live ERP data through permission-aware, read-only tool calls across 19 tool modules.",
    role: "Designer & developer",
    stack: ["Claude API", "Node.js", "TypeScript", "Prisma"],
    highlights: [
      "Permissions re-checked at execution time for every tool call",
      "Rule-based insights widget surfacing anomalies on the dashboard",
    ],
    preview: "chat",
    gradient: "from-sky-500/35 via-cyan-500/10 to-transparent",
  },
  {
    slug: "client-portal",
    title: "Client Portal",
    tagline: "A 13-screen window into a construction project.",
    description:
      "External-facing portal letting clients track progress, milestones, reports, drawings and financials. Backend built with role-based access, audit logging, rate limiting and English/Arabic RTL support.",
    role: "Backend lead",
    stack: ["Node.js", "Express", "Prisma", "PostgreSQL"],
    highlights: ["Versioned documents and drawings", "Audit log across all security-relevant actions"],
    preview: "portal",
    gradient: "from-teal-500/35 via-emerald-500/10 to-transparent",
  },
  {
    slug: "mentorship-platform",
    title: "Mentorship Platform",
    tagline: "Book a mentor, join the call, pay — all in one place.",
    description:
      "A full-stack MERN and TypeScript platform for course enrollment, task tracking and mentor slot booking, with real-time video calling and chat over Socket.io and Stripe payments.",
    role: "Full-stack developer",
    stack: ["React", "TypeScript", "Node.js", "MongoDB", "Socket.io", "Stripe", "Redux"],
    highlights: [
      "Role-based authentication with JWT, Redis, OTP and Google OAuth",
      "Repository-pattern backend, Dockerised on AWS EC2 with Nginx and GitHub Actions CI/CD",
    ],
    links: [{ label: "GitHub", href: "https://github.com/Shifanasiddieeq" }],
    featured: true,
    preview: "mentor",
    gradient: "from-indigo-500/35 via-slate-500/15 to-transparent",
  },
];

export const education = [
  {
    degree: "Master of Computer Applications",
    school: "Kannur University Campus",
    location: "Kerala, India",
    period: "",
  },
];

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
