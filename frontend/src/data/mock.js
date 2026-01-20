export const portfolioData = {
  personal: {
    name: "Mayank Mankar",
    title: "AI/ML Engineer",
    tagline: "Aspiring AI/ML engineer building intelligent applications with Generative AI & automation",
    location: "Mumbai, Maharashtra",
    email: "mankarmayank9@gmail.com",
    phone: "+91 7666240672",
    summary: "Aspiring AI/ML engineer with expertise in Python, Machine learning, Generative AI, and Automation workflows. Strong foundation in LLMs, RAG systems, and API-driven integrations, with hands-on experience in building intelligent applications and workflow optimizations. Skilled at combining problem-solving and emerging AI tools to deliver scalable and real-world solutions.",
    social: {
      linkedin: "https://linkedin.com/in/mayankmankar",
      github: "https://github.com/mayankmankar"
    }
  },

  experience: [
    {
      id: 1,
      role: "Gen-AI Intern",
      company: "Ashnik",
      duration: "May 2025 - July 2025",
      description: "Developed an automated Google Drive RAG pipeline for real-time folder monitoring, multi-format ingestion, and context-aware retrieval with attribution. Optimized system to achieve sub-5-minute processing and 3s query responses with direct Drive citations.",
      skills: ["Python", "LangChain", "RAG", "Google Drive API", "OpenAI API"]
    },
    {
      id: 2,
      role: "AI/ML Intern",
      company: "YBI Foundation",
      duration: "July 2024 - Aug 2024",
      description: "Built ML models for regression/classification tasks on structured data. Performed preprocessing, feature engineering, and model evaluation.",
      skills: ["Python", "Scikit-learn", "Pandas", "NumPy"]
    }
  ],

  projects: [
    {
      id: 1,
      title: "SmartServe - AI Agent System",
      category: "Full-Stack AI Agent",
      description: "A comprehensive full-stack AI agent system designed for restaurant and cafe hiring processes. Features a smart orchestrator that acts as the brain, coordinating two specialized agents (employer and employee) with 15+ tools for seamless operations. Built for efficient hiring and enrollment workflows in the hospitality industry.",
      tech: ["React", "FastAPI", "SQLite", "Vector DB", "LangChain", "AI Agents"],
      features: [
        "Smart orchestrator managing multi-agent coordination",
        "Employer and employee specialized agents",
        "15+ integrated tools for hiring operations",
        "Vector database for intelligent matching",
        "Real-time chat and notification system"
      ],
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
      link: "#",
      featured: true
    },
    {
      id: 2,
      title: "Enterprise GenAI Document Search",
      category: "RAG Pipeline",
      description: "Automated Google Drive RAG pipeline with hybrid search (dense+BM25) for duplicate prevention and comprehensive search capabilities. Features a conversational interface for natural language document queries.",
      tech: ["Python", "LangChain", "Qdrant", "FastAPI", "OpenAI API", "Google Drive API"],
      features: [
        "Real-time folder monitoring and ingestion",
        "Hybrid search with dense and BM25 algorithms",
        "Sub-5-minute processing time",
        "3s query response with direct citations",
        "Multi-format document support"
      ],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      link: "#",
      featured: true
    },
    {
      id: 3,
      title: "YouTube Q&A Chrome Extension",
      category: "Browser Extension",
      description: "AI-powered Chrome extension enabling intelligent Q&A on YouTube videos using GPT-4. Implements transcript extraction, chunking, FAISS retrieval, and contextual compression for accurate responses.",
      tech: ["Python", "FastAPI", "LangChain", "FAISS", "OpenAI API", "Chrome Extension"],
      features: [
        "Automatic transcript extraction and processing",
        "Semantic search using FAISS vector store",
        "GPT-4 powered contextual answers",
        "Context compression for efficiency",
        "Real-time Q&A interface"
      ],
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
      link: "#"
    },
    {
      id: 4,
      title: "Automated Assignment Reminder",
      category: "Workflow Automation",
      description: "No-code workflow using n8n to automate personalized Slack notifications for pending Google Classroom assignments. Sends DMs one day before due dates with titles, deadlines, and submission links.",
      tech: ["n8n", "Google Classroom API", "Slack API"],
      features: [
        "Automated daily assignment checks",
        "Personalized Slack DM notifications",
        "Direct submission link integration",
        "Deadline tracking and reminders",
        "No-code workflow design"
      ],
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
      link: "#"
    }
  ],

  skills: {
    languages: ["Python"],
    frameworks: ["LangChain", "FastAPI", "React", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
    databases: ["Vector Databases", "Qdrant", "FAISS", "SQLite"],
    tools: ["Git", "GitHub", "Jupyter", "n8n", "Chrome Extension"],
    apis: ["OpenAI API", "Google Drive API", "Vision Model API", "Google Classroom API", "Slack API"],
    concepts: ["LLMs", "Generative AI", "RAG Systems", "AI Agents", "Hybrid Search", "Automation Workflows", "OOP"]
  },

  education: [
    {
      id: 1,
      degree: "BE - Artificial Intelligence & Data Science",
      institution: "Vivekanand's Education Society Institute of Technology, Mumbai",
      duration: "2022 - Present",
      cgpa: "7.79/10"
    },
    {
      id: 2,
      degree: "Higher Secondary Certificate (HSC)",
      institution: "Dharampeth M.P. Deo Memorial Science College, Nagpur",
      duration: "2020 - 2022",
      percentage: "76.67%"
    },
    {
      id: 3,
      degree: "Secondary School",
      institution: "Podar International School, Nagpur",
      duration: "2016 - 2020",
      percentage: "91.2%"
    }
  ],

  achievements: [
    {
      id: 1,
      title: "Codeverse '25 Finalist",
      organization: "DBIT Mumbai",
      description: "Offline Hackathon"
    },
    {
      id: 2,
      title: "Syrus '25 Finalist",
      organization: "VESIT Mumbai",
      description: "Offline Hackathon"
    }
  ]
};
