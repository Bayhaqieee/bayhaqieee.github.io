// Environment Configuration for Aditya Bayhaqie Portfolio AI Assistant
window.ENV_CONFIG = {
  // Groq API Key (Paste your Groq API key starting with 'gsk_' below or enter it in the Chatbot settings UI)
  GROQ_API_KEY: process?.env?.GROQ_API_KEY || "",

  // Groq Model (default: fast & intelligent llama-3.3-70b-versatile)
  GROQ_MODEL: "llama-3.3-70b-versatile",

  // Aditya Bayhaqie Professional Knowledge Base
  PROFILE_KNOWLEDGE: {
    name: "Muhammad Aditya Bayhaqie",
    title: "Software Developer & Generative AI / Machine Learning Researcher",
    education: "Bachelor of Computer Science, Universitas Sriwijaya (2022 - Present)",
    distinction: "Bangkit Academy ML Cohort led by Google, Tokopedia, Gojek, & Traveloka - Graduated with Distinction (Top-tier Cohort Ranking)",
    experience: [
      {
        role: "Generative AI Research & Development",
        company: "SimpliDots (Jakarta Selatan)",
        period: "August 2025 - Present",
        highlights: "Spearheaded autonomous LLM agent R&D using Kiro Agent Framework, Cypress/Gherkin E2E testing suites (>80% assertion confidence), Text2SQL & RAG engines with 100% LLM context retention via TOON standard, automated 40+ Activepieces/n8n business reporting workflows, and tenant health ETL monitoring."
      },
      {
        role: "Generative AI Engineer",
        company: "GONSTERS (Ludwigsburg, Germany)",
        period: "July 2025 - Jan 2026",
        highlights: "Engineered AWS Generative AI solutions for Digital Twin systems, reduced telemetry information retrieval latency by 40% across 120+ live telemetry points, achieved 95% response accuracy with zero hallucinations using TOON formatting, maintained <200ms response latency via Redis/Nginx caching."
      },
      {
        role: "Machine Learning Core Lead",
        company: "Google Developer Group on Campus: Universitas Sriwijaya",
        period: "Dec 2024 - Oct 2025",
        highlights: "Led Machine Learning division, authored 24+ session curricula, organized hands-on NLP & Computer Vision workshops, mentored 15+ members."
      },
      {
        role: "Local Head of Product Operation",
        company: "AIESEC in Unsri (Palembang)",
        period: "Jan 2024 - Jan 2025",
        highlights: "Led 3+ major national/international initiatives, secured IDR 7.5M in funding with 2 key financial sponsors, managed 8 product teams across 50+ weekly check-ins, achieved 9.2+ LPS participant satisfaction score."
      },
      {
        role: "Research Scholar & Computer Lab Assistant",
        company: "Faculty of Computer Science, Universitas Sriwijaya",
        period: "May 2024 - Present",
        highlights: "Assisted in academic AI & Big Data research, led practical lab sessions for Big Data & Database Systems."
      }
    ],
    skills: {
      languages: ["Python", "R", "C++", "Kotlin", "JavaScript", "TypeScript", "HTML5", "CSS3", "PHP", "SQL"],
      ai_ml: ["Generative AI", "RAG & Hybrid Search", "Multi-Agent Systems (CrewAI, LangChain, Kiro Framework)", "Deep Learning (TensorFlow, PyTorch, Keras)", "NLP (Hugging Face, IndoNLU)", "Computer Vision (YOLO, OpenCV, TFLite)", "LLMOps", "Ollama", "FAISS"],
      data_science: ["Exploratory Data Analysis (EDA)", "Credit Risk Modeling", "Time-Series Forecasting", "Statistical Inference", "Pandas", "NumPy", "Scikit-Learn", "Seaborn"],
      developer: ["Clean Architecture", "RESTful APIs", "Docker", "Git", "Cypress & Gherkin E2E", "Activepieces/n8n", "Redis/Nginx", "PostgreSQL", "MySQL", "AWS Cloud", "Azure OpenAI"],
      ui_ux: ["Figma", "User Research", "Wireframing & Prototyping", "User-Centered Design"]
    },
    top_projects: [
      "Autonomous Release Notes AI (CrewAI + RAG system for software release tracking & Q&A)",
      "Customer Service GenAI Routing (Smart LLM router between Azure OpenAI & local Ollama models)",
      "Smart Loan Processing Multi-Agent System (Sequential & parallel workflow for automated risk scoring)",
      "AI Researcher & Writer Squad (Autonomous research & technical writing agent squad)",
      "Budayaku Batik Pattern Vision App (On-device computer vision app built with TensorFlow Lite & Flutter)",
      "Indonesian Traffic Sign Detection (Real-time YOLO object detection & classification)",
      "Financial Credit Risk Analysis (Machine learning classification model predicting default risk)",
      "Aksara Language Learning App UI/UX (Figma mobile app case study & prototype)"
    ],
    contact: {
      email: "adityabayhaqie@gmail.com",
      linkedin: "https://www.linkedin.com/in/bayhaqieee/",
      github: "https://github.com/Bayhaqieee",
      location: "Palembang, Indonesia (Available for Remote & Full-time/Contract Roles)"
    }
  }
};
