// All site copy lives here. Edit text, links and numbers without touching components.
// Anything marked TODO is a placeholder that is hidden on the page until you fill it in.

export type Link = { label: string; href: string };

export type Metric = {
  /** Big number or short token, e.g. "0.91" or "8". Leave empty ("") to hide the metric. */
  value: string;
  label: string;
};

export type CaseStudy = {
  problem: string;
  approach: string[];
  results: string[];
  next: string[];
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  status: "live" | "research" | "in-progress";
  summary: string;
  metrics: Metric[];
  stack: string[];
  live?: string;
  source?: string;
  highlight?: string;
  /** Screenshot in /public/work. Leave out to show an empty frame. */
  image?: { src: string; alt: string };
  caseStudy: CaseStudy;
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
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ] satisfies Link[],

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

  projects: [
    {
      slug: "safepulse",
      title: "SafePulse",
      category: "Machine learning · Health-tech",
      status: "live",
      summary:
        "Cardiovascular risk prediction with an XGBoost model exported to ONNX and explained feature-by-feature with SHAP, trained on the UCI Heart Disease and Framingham datasets.",
      metrics: [
        { value: "", label: "ROC-AUC" }, // TODO: add your AUC, e.g. "0.91"
        { value: "2", label: "clinical datasets" },
        { value: "SHAP", label: "per-patient explanations" },
      ],
      stack: ["Python", "XGBoost", "ONNX", "SHAP"],
      live: "https://www.safepulse.in/", // TODO: deployment currently returns 404 DEPLOYMENT_NOT_FOUND
      // image: { src: "/work/safepulse.jpg", alt: "SafePulse risk report with SHAP explanation" }, // TODO: add screenshot
      caseStudy: {
        problem:
          "Heart disease is one of India's leading causes of death, yet most risk calculators hand back a single number with no reason attached. Patients and clinicians can't act on a score they can't question.",
        approach: [
          "Merged the UCI Heart Disease and Framingham datasets and harmonised their features into one clean training set.",
          "Trained a gradient-boosted XGBoost classifier, validated on held-out data rather than the training split.",
          "Exported the model to ONNX so inference is fast and portable, independent of the Python training stack.",
          "Used SHAP to break every prediction down into per-feature contributions, so each result explains itself.",
        ],
        results: [
          "A live risk-assessment app that returns a score together with the factors pushing it up or down.",
          "One portable ONNX model artifact, decoupled from training code.",
        ],
        next: [
          "Calibrate and validate on Indian cohort data, since both source datasets are Western populations.",
          "Run fairness checks across age and sex, and get clinician feedback on how explanations are worded.",
        ],
      },
    },
    {
      slug: "rurallink-ai",
      title: "RuralLink AI",
      category: "AI · Full stack",
      status: "live",
      summary:
        "A multilingual, voice-first assistant connecting rural communities to government schemes and nearby services.",
      metrics: [
        { value: "8", label: "Indic languages" },
        { value: "Finalist", label: "USAII Global AI Hackathon" },
      ],
      stack: ["Next.js", "Gemini", "Supabase", "Mapbox"],
      live: "https://rural-link-ai.vercel.app/",
      source: "https://github.com/GokulM8/rural-link-ai",
      highlight: "USAII Global AI Hackathon 2026 Finalist",
      image: { src: "/work/rurallink-ai.jpg", alt: "RuralLink AI map view of Vijayawada with the interface in Telugu" },
      caseStudy: {
        problem:
          "Government schemes and nearby services exist, but for many people in rural India they're hard to find: information is scattered, mostly in English, and assumes high literacy.",
        approach: [
          "Built a Next.js app with Gemini handling multilingual understanding across 8 Indic languages.",
          "Added voice-based support so people can ask instead of type.",
          "Mapped nearby facilities with Mapbox and the OpenStreetMap Overpass API, with Supabase for app data.",
          "Led the team end to end: product scope, API design, data model and AI integration.",
        ],
        results: [
          "Finalist at the USAII Global AI Hackathon 2026, an international competition.",
          "Live app that switches the whole interface into the user's language.",
        ],
        next: [
          "A low-bandwidth mode and an SMS or IVR channel for areas with patchy data.",
          "A verified, regularly refreshed scheme database instead of relying on model knowledge.",
        ],
      },
    },
    {
      slug: "smart-park",
      title: "Smart Park",
      category: "Full stack",
      status: "live",
      summary:
        "Parking management with live slot tracking, entry and exit logging, and an admin dashboard.",
      metrics: [
        { value: "Live", label: "slot availability" },
        { value: "3", label: "core flows" },
      ],
      stack: ["React", "TypeScript", "Supabase", "Vite"],
      live: "https://smart-park-green-eight.vercel.app",
      source: "https://github.com/GokulM8/smart-park",
      image: { src: "/work/smart-park.jpg", alt: "ParkSmart sign-in screen" }, // TODO: swap for a dashboard screenshot
      caseStudy: {
        problem:
          "Manually run parking lots lose track of which slots are free, so drivers circle and staff reconcile entries by hand.",
        approach: [
          "Built a React + TypeScript app on Vite with Supabase for auth and data.",
          "Modelled slots, vehicles and sessions so entry and exit update availability immediately.",
          "Added an admin dashboard for managing slots and reviewing activity.",
        ],
        results: ["A working, deployed system covering slot tracking, vehicle entry and exit, and admin management."],
        next: [
          "Licence-plate recognition at the gate to remove manual entry.",
          "Occupancy forecasting from historical sessions to predict busy hours.",
        ],
      },
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

  inProgress: [
    {
      title: "ArchLens AI",
      summary: "Code-to-architecture graphs with grounded AI explanations.",
      source: "https://github.com/GokulM8/ArchLens-AI",
    },
    {
      title: "DeepFake Shield",
      summary: "Multimodal forensics for AI-generated video, image and audio.",
      source: "https://github.com/GokulM8/deepfake-shield-pro",
    },
  ],

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
