// All site copy lives here. Edit text, links and numbers without touching components.
// Anything marked TODO is a placeholder that is hidden on the page until you fill it in.

export type Link = { label: string; href: string };

export type Metric = {
  /** Big number or short token, e.g. "0.91" or "8". Leave empty ("") to hide the metric. */
  value: string;
  label: string;
};

export type Category = "ML" | "Full-stack";

/** Generative cover motifs (components/covers). */
export type CoverId =
  | "safepulse"
  | "rurallink-ai"
  | "smart-park"
  | "archlens-ai"
  | "deepfake-shield"
  | "buyer-segmentation"
  | "care-transition";

export type Project = {
  slug: CoverId;
  title: string;
  /** One line for the list row. */
  oneLiner: string;
  categories: Category[];
  status: "live" | "in-progress";
  /** Up to 3 shown. Leave value empty ("") to hide one. */
  metrics: Metric[];
  problem: string;
  approach: string[];
  results: string[];
  stack: string[];
  live?: string;
  source?: string;
  highlight?: string;
};

export type Post = {
  title: string;
  /** Two lines at most. */
  summary: string;
  /** e.g. "2026" or "Mar 2026". Leave empty to hide. */
  date: string;
  /** Leave empty to hide the link. */
  url: string;
  kind: "Paper" | "Post";
  cover: CoverId;
};

export type Role = {
  role: string;
  company: string;
  period: string;
  /** e.g. "2 months" (shown when the row is expanded). */
  duration: string;
  /** 2–3 short lines, always visible. */
  summary: string[];
  /** Extra lines shown when the row is expanded. */
  details: string[];
  tags: string[];
};

export type Hackathon = {
  name: string;
  level: "International" | "National" | "College";
  result: string;
  year: string;
  team?: string;
  track?: string;
  roles: string[];
  certificate?: string;
  highlight?: boolean;
};

export const site = {
  name: "Gokul Mallabathula",
  url: "https://portfolio-gilt-gamma-53.vercel.app",
  email: "gokulmallabathula@gmail.com",
  resume: { href: "/resume.pdf", fileName: "Gokul-Mallabathula-Resume.pdf" },
  location: "Vijayawada, India",
  status: "Open to internships",
  description:
    "Gokul Mallabathula: ML engineer and CS undergrad at VIT-AP building applied AI/ML and health-tech systems.",
  socials: {
    linkedin: "https://www.linkedin.com/in/gokul-mallabathula-693a74118/",
    github: "https://www.github.com/GokulM8",
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Hackathons", href: "#hackathons" },
    { label: "Writing", href: "#writing" },
    { label: "Contact", href: "#contact" },
  ] satisfies Link[],

  hero: {
    greeting: "Hi, I’m Gokul",
    intro:
      "ML engineer and CS undergrad at VIT-AP. I build applied AI systems, mostly in health-tech, and care about the unglamorous parts: clean data, honest metrics, and models that actually ship.",
    // Drop your photo at public/me.jpg; until then a "GM" circle is shown.
    portrait: { src: "/me.jpg", alt: "Portrait of Gokul Mallabathula" },
  },

  // Live projects first.
  projects: [
    {
      slug: "safepulse",
      title: "SafePulse",
      oneLiner: "Explainable cardiovascular risk prediction",
      categories: ["ML"],
      status: "live",
      // Held-out test set (184 rows), untouched by tuning and calibration
      metrics: [
        { value: "0.915", label: "ROC-AUC, held-out test" },
        { value: "86.4%", label: "accuracy, held-out test" },
        { value: "0.108", label: "Brier score, held-out test" },
      ],
      problem:
        "Heart disease is one of India's leading causes of death, yet most risk calculators hand back a single number with no reason attached. Patients and clinicians can't act on a score they can't question.",
      approach: [
        "Merged the UCI Heart Disease and Framingham datasets into one harmonised training set.",
        "Held out 20% of the data (184 rows) as an untouched test set, then tuned a gradient-boosted model with cross-validation (best CV ROC-AUC 0.88) and calibrated its probabilities.",
        "Exported the model to ONNX for fast, portable inference, and used SHAP to break every prediction into per-feature contributions.",
      ],
      results: [
        "On the held-out test set: ROC-AUC 0.915, accuracy 86.4% and a Brier score of 0.108.",
        "A calibrated risk score that explains itself: the factors pushing it up or down, per patient.",
      ],
      stack: ["Python", "XGBoost", "ONNX", "SHAP"],
      live: "https://safe-pulse-six.vercel.app/",
    },
    {
      slug: "rurallink-ai",
      title: "RuralLink AI",
      oneLiner: "Multilingual, voice-first assistant for rural India",
      categories: ["ML", "Full-stack"],
      status: "live",
      metrics: [
        { value: "8", label: "Indic languages" },
        { value: "Finalist", label: "USAII Global AI Hackathon" },
        { value: "Voice", label: "and text input" },
      ],
      problem:
        "Government schemes and nearby services exist, but for many people in rural India they're hard to find: scattered, mostly in English, and written for high literacy.",
      approach: [
        "Gemini handles multilingual understanding across 8 Indic languages, with voice input so people can ask instead of type.",
        "Mapbox and the OpenStreetMap Overpass API locate nearby facilities; Supabase stores app data.",
        "Led the team end to end: scope, API design, data model and AI integration.",
      ],
      results: ["Finalist at the USAII Global AI Hackathon 2026.", "Live app that switches the whole interface into the user's language."],
      stack: ["Next.js", "Gemini", "Supabase", "Mapbox"],
      live: "https://rural-link-ai.vercel.app/",
      source: "https://github.com/GokulM8/rural-link-ai",
      highlight: "USAII Global AI Hackathon 2026 Finalist",
    },
    {
      slug: "smart-park",
      title: "Smart Park",
      oneLiner: "Real-time parking management",
      categories: ["Full-stack"],
      status: "live",
      metrics: [
        { value: "3", label: "core flows" },
        { value: "Live", label: "slot availability" },
      ],
      problem: "Manually run parking lots lose track of which slots are free, so drivers circle and staff reconcile entries by hand.",
      approach: [
        "React + TypeScript on Vite, with Supabase for auth and data.",
        "Slots, vehicles and sessions modelled so entry and exit update availability immediately.",
        "An admin dashboard for managing slots and reviewing activity.",
      ],
      results: ["A deployed system covering slot tracking, vehicle entry and exit, and admin management."],
      stack: ["React", "TypeScript", "Supabase", "Vite"],
      live: "https://smart-park-green-eight.vercel.app",
      source: "https://github.com/GokulM8/smart-park",
    },
    {
      slug: "archlens-ai",
      title: "ArchLens AI",
      oneLiner: "Code-to-architecture graphs with grounded AI explanations",
      categories: ["ML", "Full-stack"],
      status: "in-progress",
      metrics: [],
      problem: "Large codebases hide their real architecture; diagrams drift and AI summaries hallucinate structure that isn't there.",
      approach: [
        "Parse a codebase into a verified dependency graph with NetworkX.",
        "Flag architectural health risks from the graph itself.",
        "Ground every AI explanation and refactoring suggestion in that graph.",
      ],
      results: ["In progress."],
      stack: ["FastAPI", "NetworkX", "Pydantic", "OpenAI"],
      source: "https://github.com/GokulM8/ArchLens-AI",
    },
    {
      slug: "deepfake-shield",
      title: "DeepFake Shield",
      oneLiner: "Multimodal forensics for AI-generated media",
      categories: ["ML"],
      status: "in-progress",
      metrics: [],
      problem: "AI-generated video, images and audio are now convincing enough that people can't tell them apart from real media.",
      approach: [
        "Detect, localise and explain manipulation across video, image and audio.",
        "EfficientNet and transformer models with temporal analysis for video.",
        "Explainable outputs that show where and why media looks synthetic.",
      ],
      results: ["In progress."],
      stack: ["PyTorch", "EfficientNet", "Transformers", "FastAPI", "Next.js"],
      source: "https://github.com/GokulM8/deepfake-shield-pro",
    },
  ] satisfies Project[],

  about: {
    academic: {
      degree: "B.Tech, Computer Science & Engineering",
      school: "VIT-AP University",
      period: "2024 – 2028",
      focus: "Machine learning, data science and applied AI, with coursework and projects leaning towards health-tech.",
    },
    stack: [
      { tier: "Proficient", items: ["Python", "Pandas", "Scikit-learn", "XGBoost", "SQL", "Git", "React / Next.js", "TypeScript"], upNext: [] },
      { tier: "Intermediate", items: ["TensorFlow", "SHAP", "ONNX", "FastAPI / Flask", "Supabase", "Docker", "Tailwind"], upNext: [] },
      { tier: "Learning", items: ["Quantum Machine Learning", "DSA & interview problem-solving"], upNext: ["RAG & LLMs"] },
    ],
    info: [
      { label: "Based in", value: "Vijayawada, India" },
      { label: "Focus", value: "Applied ML & AI systems" },
      { label: "Open to", value: "Internships and research collaborations" },
    ],
  },

  // Wording from your resume. `details` show when a row is expanded.
  experience: [
    {
      role: "Machine Learning Engineer Intern",
      company: "FlyRank AI",
      period: "Jul – Aug 2026",
      duration: "2 months",
      summary: [
        "Applied ML to search and analytics data, focused on embeddings, clustering and intent modeling to improve product-facing AI features.",
        "Contributed to production-level ML pipelines using Python, pandas and scikit-learn.",
      ],
      details: ["Used model optimization and data-driven techniques on real-world search and analytics problems."],
      tags: ["NLP", "Ranking", "Embeddings", "Clustering", "Intent modeling"],
    },
    {
      role: "Fraud Detection Engineer Intern",
      company: "Zetheta Algorithms",
      period: "Jan – Mar 2026",
      duration: "3 months",
      summary: [
        "Worked on multiple proprietary fraud detection projects for financial security systems.",
        "Gained exposure to real-world anomaly detection and financial data pipelines.",
      ],
      details: [], // TODO: add more detail if you'd like; the expanded row shows duration, type and focus areas
      tags: ["Anomaly detection", "Blockchain", "Cybersecurity"],
    },
  ] satisfies Role[],

  hackathons: [
    {
      name: "USAII Global AI Hackathon",
      level: "International",
      result: "Final Round Finalist",
      year: "2026",
      team: "Team ByteCoders",
      roles: ["Team Lead", "Frontend", "Backend", "API Designer", "Supabase / DB", "AI / Gemini Integration", "UI/UX Design"],
      certificate: "/certificate-of-finalist.png",
      highlight: true,
    },
    { name: "Smart India Hackathon", level: "National", result: "Round 2 Qualifier", year: "2025", team: "Team Shark", roles: ["Backend Designer", "Supabase / DB"] },
    {
      name: "Adobe University Hackathon",
      level: "National",
      result: "Round 2 Qualifier",
      year: "2026",
      track: "AI + Brand Visibility",
      roles: ["AI / Agents", "Product Thinking", "UI/UX Design", "Software Development"],
    },
    {
      name: "Smart India Hackathon",
      level: "National",
      result: "Participant",
      year: "2026",
      track: "Software + AI + Emerging Technologies",
      roles: ["Team Lead", "ML Engineer", "Quantum Machine Learning", "Software Development"],
    },
    {
      name: "Radiothon Winter",
      level: "College",
      result: "Participant",
      year: "2026",
      team: "Team Doom",
      roles: ["Team Lead", "ML Engineer", "AI / ML Integration", "Supabase / DB", "API Designer"],
    },
  ] satisfies Hackathon[],

  // Papers and future posts. Empty date/url fields stay hidden.
  writing: [
    {
      kind: "Paper",
      title: "Care Transition Analytics",
      summary: "An analysis of the U.S. UAC care pipeline with five custom KPIs and an interactive dashboard, published on SSRN.",
      date: "", // TODO
      url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6811798",
      cover: "care-transition",
    },
    {
      kind: "Paper",
      title: "Buyer Segmentation & Investment Profiling",
      summary: "K-Means and hierarchical clustering on Parcl market data to profile distinct real-estate investor types, published on SSRN.",
      date: "", // TODO
      url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6881578",
      cover: "buyer-segmentation",
    },
  ] satisfies Post[],

  contact: {
    closing: "Let’s build something",
    availability: "Currently open to internships and research collaborations.",
  },
} as const;

export type Site = typeof site;
