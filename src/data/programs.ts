export interface ProgramModule {
  title: string;
  desc?: string;
}

export interface ProgramDetail {
  title: string;
  tag: string;
  description: string;
  learn: string[];
  modules: ProgramModule[];
  duration: string;
  level: string;
}

export const PROGRAM_DETAILS: Record<string, ProgramDetail> = {
  "hr-management": {
    title: "Human Resource Management",
    tag: "Graduate",
    description: "Learn recruitment, payroll, and organizational management.",
    learn: ["HR", "Payroll", "Management"],
    modules: [
      { title: "Recruitment Process", desc: "Understand sourcing, interviewing, and hiring strategies." },
      { title: "Payroll Management", desc: "Learn payroll processing and compliance." },
      { title: "Employee Relations", desc: "Manage employee engagement and conflict resolution." },
      { title: "HR Tools", desc: "Hands-on experience with modern HR software." },
      { title: "HR Case Study", desc: "Real-world HR scenarios and problem-solving." }
    ],
    duration: "3 Months",
    level: "Intermediate"
  },
  "digital-marketing": {
    title: "Digital Marketing Expert",
    tag: "Graduate",
    description: "Master modern digital marketing strategies including SEO, SEM, and Social Media.",
    learn: ["SEO", "Ads", "Social Media"],
    modules: [
      { title: "SEO Fundamentals", desc: "Learn search engine optimization basics and advanced techniques." },
      { title: "Social Media Marketing", desc: "Create and manage organic and paid social campaigns." },
      { title: "Google Ads", desc: "Run effective pay-per-click advertising campaigns." },
      { title: "Content Marketing", desc: "Develop engaging content strategies." },
      { title: "Live Campaign Project", desc: "Execute a live marketing campaign from scratch." }
    ],
    duration: "3 Months",
    level: "Beginner to Advanced"
  },
  "banking-finance": {
    title: "Banking & Finance",
    tag: "Graduate",
    description: "Comprehensive training in modern banking, finance, and accounting software.",
    learn: ["Tally", "GST", "Excel", "Finance"],
    modules: [
      { title: "Tally Prime Mastery", desc: "Complete training on Tally software." },
      { title: "GST & Taxation", desc: "Understand GST filing and compliance." },
      { title: "Advanced Excel", desc: "Financial modeling and data analysis using Excel." },
      { title: "Banking Operations", desc: "Core banking processes and procedures." }
    ],
    duration: "4 Months",
    level: "Intermediate"
  },
  "autocad": {
    title: "AutoCAD Design",
    tag: "BTech",
    description: "Professional drafting and 2D/3D design using AutoCAD.",
    learn: ["AutoCAD", "Engineering", "Design"],
    modules: [
      { title: "2D Drafting Basics", desc: "Fundamentals of 2D CAD design." },
      { title: "3D Modeling", desc: "Creating and editing 3D solid models." },
      { title: "Engineering Documentation", desc: "Preparing industry-standard blueprints." },
      { title: "Live Project", desc: "End-to-end design project." }
    ],
    duration: "2 Months",
    level: "Beginner"
  },
  "data-science": {
    title: "Data Science & AI",
    tag: "Job Ready",
    description: "Learn Python, Machine Learning, and Data Analysis from scratch.",
    learn: ["Python", "AI", "ML", "Data Analysis"],
    modules: [
      { title: "Python Programming", desc: "Core Python for data science." },
      { title: "Data Analysis", desc: "Pandas, NumPy, and Data Visualization." },
      { title: "Machine Learning", desc: "Supervised and unsupervised learning algorithms." },
      { title: "AI Fundamentals", desc: "Introduction to neural networks and deep learning." }
    ],
    duration: "6 Months",
    level: "Advanced"
  },
  "fullstack-java": {
    title: "Full Stack Java Developer",
    tag: "BTech",
    description: "Master Java, Spring Boot, React, and Database design.",
    learn: ["Java", "React", "Spring Boot", "Database"],
    modules: [
      { title: "Core Java", desc: "Object-oriented programming with Java." },
      { title: "Spring Boot", desc: "Building scalable backend APIs." },
      { title: "React & Frontend", desc: "Creating dynamic user interfaces." },
      { title: "Database Management", desc: "SQL and NoSQL database integration." },
      { title: "Capstone Project", desc: "Build a full-stack e-commerce application." }
    ],
    duration: "6 Months",
    level: "Intermediate to Advanced"
  },
  "campus-corporate": {
    title: "Campus to Corporate",
    tag: "Job Ready",
    description: "Intensive preparation for successful transition into the corporate world.",
    learn: ["Resume", "Interview Prep", "Aptitude"],
    modules: [
      { title: "Resume Building", desc: "Create ATS-friendly, impactful resumes." },
      { title: "Aptitude Training", desc: "Quantitative and logical reasoning prep." },
      { title: "Mock Interviews", desc: "Practice technical and HR interviews." },
      { title: "Corporate Communication", desc: "Email etiquette and professional speaking." }
    ],
    duration: "1 Month",
    level: "Beginner"
  },
  "spoken-english": {
    title: "Spoken English Mastery",
    tag: "Popular",
    description: "A structured Spoken English program designed to build fluency, confidence, pronunciation, and real-world communication skills.",
    learn: ["Fluency", "Grammar", "Pronunciation"],
    modules: [
      { title: "Basic Grammar", desc: "Foundation of English sentence structure." },
      { title: "Pronunciation & Accent", desc: "Clear and confident speaking techniques." },
      { title: "Vocabulary Building", desc: "Expanding everyday word usage." },
      { title: "Public Speaking", desc: "Overcoming stage fear and speaking clearly." }
    ],
    duration: "2 Months",
    level: "Beginner"
  }
};
