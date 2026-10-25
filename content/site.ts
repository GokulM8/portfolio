// All site copy lives here. Edit text, links and numbers without touching components.
// Anything marked TODO is a placeholder that is hidden on the page until you fill it in.

export type Link = { label: string; href: string };

export type Metric = {
  /** Big number or short token, e.g. "0.91" or "8". Leave empty ("") to hide the metric. */
  value: string;
  label: string;
};

export type Category = "ML" | "Full-stack" | "Research";

export type Project = {
  slug: string;
  title: string;
  /** One line for the list row. */
  oneLiner: string;
  year: string;
  categories: Category[];
  status: "live" | "in-progress" | "research";
  /** Up to 3 shown. Leave value empty ("") to hide one. */
  metrics: Metric[];
  problem: string;
  approach: string[];
  results: string[];
  stack: string[];
  live?: string;
  source?: string;
  paper?: string;
  demo?: string;
  highlight?: string;
  /** Screenshot in /public/work (webp). Without one, the preview shows the project name. */
  image?: { src: string; alt: string };
};

export type Paper = {
  title: string;
  summary: string;
  /** SSRN link for this specific paper. Leave empty to hide the "Paper" link. */
  paper: string;
  source?: string;
  demo?: string;
};

export const site = {
  name: "Gokul Mallabathula",
  firstName: "Gokul",
  url: "https://portfolio-gilt-gamma-53.vercel.app",
  email: "gokulmallabathula@gmail.com",
  cv: "/Gokul-Mallabathula-Resume.pdf",
  location: "Vijayawada, India",
  status: "Open to internships",
  roles: ["ML Engineer", "Applied AI builder", "Health-tech tinkerer"],
  tagline: "Building applied AI systems",
  oneLiner:
    "CS undergrad at VIT-AP turning messy real-world data into models people can actually use, with a soft spot for health-tech.",
  description:
    "Gokul Mallabathula: ML engineer and CS undergrad at VIT-AP building applied AI/ML and health-tech systems.",
  socials: {
    linkedin: "https://www.linkedin.com/in/gokul-mallabathula-693a74118/",
    github: "https://www.github.com/GokulM8",
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Hackathons", href: "#hackathons" },
    { label: "Writing", href: "#writing" },
    { label: "Contact", href: "#contact" },
  ] satisfies Link[],

  hero: {
    greeting: "Hi, I’m Gokul",
    intro:
      "ML engineer and CS undergrad at VIT-AP. I build applied AI systems, mostly in health-tech, and care about the unglamorous parts: clean data, honest metrics, and models that actually ship.",
    portrait: { src: "/portrait.webp", alt: "Illustrated avatar of Gokul" }, // TODO: swap for a real photo
  },

  strip: {
    heading: "Worked with & competed at",
    items: [
      "FlyRank AI",
      "Zetheta Algorithms",
      "VIT-AP University",
      "USAII Global AI Hackathon",
      "Smart India Hackathon",
    ],
  },

  about: {
    bio: [
      "I'm a Computer Science undergrad at VIT-AP (2024–2028) who likes the unglamorous middle of machine learning: cleaning the data, questioning the metric, and getting a model into a product someone can open on their phone.",
      "Most of my work sits at the edge of applied AI and health-tech, from explainable cardiovascular risk scoring to multilingual assistants for rural communities.",
    ],
    approach: [
      { title: "Understand the problem deeply", body: "Talk to the data and the people behind it before picking a model." },
      { title: "Build data-driven solutions", body: "Baselines first, honest validation, and explanations users can trust." },
      { title: "Ship clean, scalable code", body: "Small, typed, deployable pieces that keep working after the demo." },
    ],
  },

  // Live projects first. TODO: confirm each year.
  projects: [
    {
      slug: "safepulse",
      title: "SafePulse",
      oneLiner: "Explainable cardiovascular risk prediction",
      year: "2026",
      categories: ["ML"],
      status: "live",
      metrics: [
        { value: "", label: "ROC-AUC" }, // TODO: add your AUC, e.g. "0.91"
        { value: "2", label: "clinical datasets" },
        { value: "SHAP", label: "per-patient explanations" },
      ],
      problem:
        "Heart disease is one of India's leading causes of death, yet most risk calculators hand back a single number with no reason attached. Patients and clinicians can't act on a score they can't question.",
      approach: [
        "Merged the UCI Heart Disease and Framingham datasets into one harmonised training set.",
        "Trained an XGBoost classifier, validated on held-out data, and exported it to ONNX for fast, portable inference.",
        "Used SHAP to break every prediction into per-feature contributions.",
      ],
      results: ["A risk score that explains itself: the factors pushing it up or down, per patient."],
      stack: ["Python", "XGBoost", "ONNX", "SHAP"],
      live: "https://www.safepulse.in/", // TODO: deployment currently returns 404 DEPLOYMENT_NOT_FOUND
      // image: { src: "/work/safepulse.webp", alt: "SafePulse risk report with SHAP explanation" }, // TODO
    },
    {
      slug: "rurallink-ai",
      title: "RuralLink AI",
      oneLiner: "Multilingual, voice-first assistant for rural India",
      year: "2026",
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
      image: { src: "/work/rurallink-ai.webp", alt: "RuralLink AI map view of Vijayawada with the interface in Telugu" },
    },
    {
      slug: "smart-park",
      title: "Smart Park",
      oneLiner: "Real-time parking management",
      year: "2026",
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
      image: { src: "/work/smart-park.webp", alt: "ParkSmart sign-in screen" }, // TODO: swap for a dashboard screenshot
    },
    {
      slug: "care-transition-analytics",
      title: "Care Transition Analytics",
      oneLiner: "U.S. UAC care-pipeline analysis, published on SSRN",
      year: "2026",
      categories: ["Research"],
      status: "research",
      metrics: [
        { value: "5", label: "custom KPIs" },
        { value: "SSRN", label: "published" },
      ],
      problem: "Care-transition data for unaccompanied children is public but hard to read as a pipeline, so bottlenecks stay hidden.",
      approach: ["Cleaned and modelled the pipeline in Pandas.", "Defined 5 custom KPIs and built an interactive Streamlit dashboard around them."],
      results: ["Findings published on SSRN, with a public dashboard."],
      stack: ["Python", "Pandas", "Streamlit"],
      paper: "https://papers.ssrn.com/abstract=6811798", // TODO: confirm this is the Care Transition paper
      demo: "https://care-transition-cbp-ov9vzm4nnkreiaowsz6guy.streamlit.app/",
      source: "https://github.com/GokulM8/Care-Transition-CBP",
    },
    {
      slug: "buyer-segmentation",
      title: "Buyer Segmentation",
      oneLiner: "Clustering real-estate investor profiles, published on SSRN",
      year: "2026",
      categories: ["ML", "Research"],
      status: "research",
      metrics: [
        { value: "2", label: "clustering methods" },
        { value: "SSRN", label: "published" },
      ],
      problem: "Real-estate markets treat buyers as one group, though investors behave very differently from owner-occupiers.",
      approach: ["Engineered buyer features from Parcl market data.", "Compared K-Means and hierarchical clustering to profile distinct investor types."],
      results: ["Interpretable investor segments, published on SSRN."],
      stack: ["Python", "scikit-learn", "Pandas"],
      paper: "", // TODO: this paper's own SSRN link
      source: "https://github.com/GokulM8/Buyer-Segmentation-and-Investment-Profiling",
    },
    {
      slug: "archlens-ai",
      title: "ArchLens AI",
      oneLiner: "Code-to-architecture graphs with grounded AI explanations",
      year: "2026",
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
      year: "2026",
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

  research: {
    title: "Research on SSRN",
    papers: [
      {
        title: "Buyer Segmentation & Investment Profiling",
        summary: "K-Means and hierarchical clustering to profile real-estate investor types from Parcl market data.",
        paper: "", // TODO: this paper's own SSRN link
        source: "https://github.com/GokulM8/Buyer-Segmentation-and-Investment-Profiling",
      },
      {
        title: "Care Transition Analytics",
        summary: "U.S. UAC care-pipeline analysis with 5 custom KPIs and an interactive Streamlit dashboard.",
        paper: "https://papers.ssrn.com/abstract=6811798", // TODO: confirm this is the Care Transition paper
        source: "https://github.com/GokulM8/Care-Transition-CBP",
        demo: "https://care-transition-cbp-ov9vzm4nnkreiaowsz6guy.streamlit.app/",
      },
    ] satisfies Paper[],
  },

  experience: [
    {
      role: "Machine Learning Engineer Intern",
      company: "FlyRank AI",
      period: "Jul – Aug 2026",
      points: ["Search optimization", "NLP & ranking", "Embeddings & clustering", "Intent modeling"],
    },
    {
      role: "Fraud Detection Engineer Intern",
      company: "Zetheta Algorithms",
      period: "Jan – Mar 2026",
      points: ["Anomaly detection", "Blockchain transaction analysis"],
    },
  ],

  stats: [
    { value: "2", label: "internships" },
    { value: "2", label: "research papers" },
    { value: "5", label: "hackathons" },
  ],

  hackathons: [
    { name: "USAII Global AI Hackathon 2026", result: "Finalist", level: "International", highlight: true, certificate: "/certificate-of-finalist.png" },
    { name: "Smart India Hackathon 2025", result: "Round 2", level: "National" },
    { name: "Adobe University Hackathon 2026", result: "Round 2", level: "National" },
    { name: "Smart India Hackathon 2026", result: "Participant", level: "National" },
    { name: "Radiothon Winter 2026", result: "Participant", level: "College" },
  ],

  skills: [
    { group: "ML / Data", items: ["Python", "Pandas", "scikit-learn", "XGBoost", "TensorFlow", "SHAP", "ONNX"] },
    { group: "Backend", items: ["Flask", "FastAPI", "Node.js", "Supabase"] },
    { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { group: "Tools", items: ["Git", "Docker", "Streamlit", "Vercel", "CI/CD"] },
  ],
} as const;

export type Site = typeof site;
