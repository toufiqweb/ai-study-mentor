export type RoadmapLevel = "Beginner" | "Intermediate" | "Advanced";

export type RoadmapTemplate = {
  id: string;
  title: string;
  category: string;
  level: RoadmapLevel;
  durationWeeks: number;
  learners: number;
  description: string;
  phases: { title: string; focus: string }[];
};

export const roadmapTemplates: RoadmapTemplate[] = [
  {
    id: "full-stack-web-dev",
    title: "Full-Stack Web Development",
    category: "Programming & Web Dev",
    level: "Beginner",
    durationWeeks: 12,
    learners: 3200,
    description:
      "Go from HTML basics to shipping a full-stack app with a React frontend and a real backend.",
    phases: [
      { title: "Weeks 1-3", focus: "HTML, CSS & JavaScript fundamentals" },
      { title: "Weeks 4-6", focus: "React fundamentals & component design" },
      { title: "Weeks 7-9", focus: "Backend APIs & databases" },
      { title: "Weeks 10-12", focus: "Ship a full-stack capstone project" },
    ],
  },
  {
    id: "data-science-ml",
    title: "Data Science & Machine Learning",
    category: "Data Science & AI",
    level: "Intermediate",
    durationWeeks: 14,
    learners: 2450,
    description:
      "Build the statistics, Python, and ML foundations needed to work on real-world data problems.",
    phases: [
      { title: "Weeks 1-3", focus: "Python & statistics for data science" },
      { title: "Weeks 4-6", focus: "Data wrangling & visualization" },
      { title: "Weeks 7-10", focus: "Machine learning fundamentals" },
      { title: "Weeks 11-14", focus: "Real-world ML project" },
    ],
  },
  {
    id: "conversational-spanish",
    title: "Conversational Spanish",
    category: "Languages",
    level: "Beginner",
    durationWeeks: 8,
    learners: 1890,
    description: "Build enough conversational Spanish to hold a 10-minute unscripted conversation.",
    phases: [
      { title: "Weeks 1-2", focus: "Present tense & everyday vocabulary" },
      { title: "Weeks 3-4", focus: "Past tense & listening comprehension" },
      { title: "Weeks 5-6", focus: "Conversation practice" },
      { title: "Weeks 7-8", focus: "Fluency polishing" },
    ],
  },
  {
    id: "linear-algebra-ml",
    title: "Linear Algebra for Machine Learning",
    category: "Mathematics",
    level: "Beginner",
    durationWeeks: 6,
    learners: 1120,
    description: "Understand vectors, matrices, and transformations well enough to follow ML courses.",
    phases: [
      { title: "Week 1-2", focus: "Vectors & vector spaces" },
      { title: "Week 3", focus: "Matrices & operations" },
      { title: "Week 4", focus: "Determinants" },
      { title: "Weeks 5-6", focus: "Eigenvalues & applied ML math" },
    ],
  },
  {
    id: "ui-ux-fundamentals",
    title: "UI/UX Design Fundamentals",
    category: "Design",
    level: "Beginner",
    durationWeeks: 6,
    learners: 1670,
    description: "Learn core design principles and get comfortable designing real interfaces in Figma.",
    phases: [
      { title: "Week 1-2", focus: "Layout & spacing" },
      { title: "Week 3", focus: "Color & typography" },
      { title: "Week 4-5", focus: "Components & design systems" },
      { title: "Week 6", focus: "Prototyping" },
    ],
  },
  {
    id: "personal-finance-investing",
    title: "Personal Finance & Investing",
    category: "Business & Finance",
    level: "Beginner",
    durationWeeks: 5,
    learners: 980,
    description: "Build a practical foundation in budgeting, saving, debt, and long-term investing.",
    phases: [
      { title: "Week 1", focus: "Budgeting basics" },
      { title: "Week 2", focus: "Saving & debt management" },
      { title: "Weeks 3-4", focus: "Investing fundamentals" },
      { title: "Week 5", focus: "Building a long-term plan" },
    ],
  },
  {
    id: "gre-prep",
    title: "GRE Prep",
    category: "Test Prep",
    level: "Intermediate",
    durationWeeks: 10,
    learners: 1340,
    description: "A structured path through quant, verbal, and full-length practice tests.",
    phases: [
      { title: "Weeks 1-3", focus: "Quant foundations" },
      { title: "Weeks 4-6", focus: "Verbal & vocabulary" },
      { title: "Weeks 7-9", focus: "Full-length practice tests" },
      { title: "Week 10", focus: "Final review & pacing" },
    ],
  },
  {
    id: "physics-fundamentals",
    title: "Physics Fundamentals",
    category: "Science",
    level: "Beginner",
    durationWeeks: 8,
    learners: 760,
    description: "Core mechanics, energy, and electricity concepts explained with worked problems.",
    phases: [
      { title: "Weeks 1-2", focus: "Mechanics" },
      { title: "Weeks 3-4", focus: "Energy & thermodynamics" },
      { title: "Weeks 5-6", focus: "Waves & electricity" },
      { title: "Weeks 7-8", focus: "Applied problem solving" },
    ],
  },
];
