export type GoalStatus = "on-track" | "at-risk" | "completed";

export type Goal = {
  id: string;
  title: string;
  category: string;
  description: string;
  deadline: string;
  dailyStudyHours: number;
  currentLevel: "Beginner" | "Intermediate" | "Advanced";
  learningStyle: "Visual" | "Reading" | "Practice" | "Mixed";
  weakTopics: string[];
  progress: number;
  status: GoalStatus;
  createdAt: string;
  studyPlan: {
    dailyRoutine: string[];
    weeklyRoadmap: { week: string; focus: string }[];
    monthlyMilestones: string[];
    resources: string[];
    practiceSchedule: string[];
    revisionSchedule: string[];
    tips: string[];
  };
};

export const goals: Goal[] = [
  {
    id: "react-hooks",
    title: "Master React Hooks",
    category: "Programming",
    description:
      "Go from copy-pasting hooks to actually understanding useState, useEffect, and custom hooks well enough to build a production app.",
    deadline: "2026-08-12",
    dailyStudyHours: 2,
    currentLevel: "Intermediate",
    learningStyle: "Practice",
    weakTopics: ["useEffect dependencies", "custom hooks"],
    progress: 70,
    status: "on-track",
    createdAt: "2026-06-20",
    studyPlan: {
      dailyRoutine: [
        "30 min reading React docs on the topic of the day",
        "45 min building a small demo using the concept",
        "15 min reviewing yesterday's weak topic",
      ],
      weeklyRoadmap: [
        { week: "Week 1", focus: "useState & re-renders" },
        { week: "Week 2", focus: "useEffect & cleanup" },
        { week: "Week 3", focus: "Custom hooks" },
        { week: "Week 4", focus: "Performance (useMemo/useCallback)" },
      ],
      monthlyMilestones: ["Ship a small app using only hooks (no classes)"],
      resources: ["react.dev — Hooks reference", "Epic React (Kent C. Dodds)"],
      practiceSchedule: ["3x/week: rebuild a UI pattern from scratch using hooks"],
      revisionSchedule: ["Every Sunday: revisit the week's weak topics"],
      tips: ["Explain each hook out loud before using it — if you can't, review the docs first."],
    },
  },
  {
    id: "spanish-conversation",
    title: "Conversational Spanish",
    category: "Languages",
    description: "Build enough conversational Spanish to hold a 10-minute unscripted conversation.",
    deadline: "2026-09-01",
    dailyStudyHours: 1,
    currentLevel: "Beginner",
    learningStyle: "Mixed",
    weakTopics: ["verb conjugation", "listening comprehension"],
    progress: 45,
    status: "on-track",
    createdAt: "2026-06-05",
    studyPlan: {
      dailyRoutine: ["20 min vocabulary app", "20 min listening practice", "20 min speaking aloud"],
      weeklyRoadmap: [
        { week: "Week 1", focus: "Present tense basics" },
        { week: "Week 2", focus: "Everyday vocabulary" },
        { week: "Week 3", focus: "Past tense" },
        { week: "Week 4", focus: "Conversation practice" },
      ],
      monthlyMilestones: ["Hold a 5-minute conversation without switching to English"],
      resources: ["Duolingo", "Dreaming Spanish (YouTube)"],
      practiceSchedule: ["2x/week: speaking practice with a language partner"],
      revisionSchedule: ["Daily: 5-minute flashcard review"],
      tips: ["Immersion beats grammar drills — listen more than you study rules."],
    },
  },
  {
    id: "linear-algebra",
    title: "Linear Algebra Basics",
    category: "Mathematics",
    description: "Understand vectors, matrices, and transformations well enough to follow ML courses.",
    deadline: "2026-09-20",
    dailyStudyHours: 1.5,
    currentLevel: "Beginner",
    learningStyle: "Visual",
    weakTopics: ["eigenvalues", "matrix multiplication"],
    progress: 20,
    status: "at-risk",
    createdAt: "2026-07-01",
    studyPlan: {
      dailyRoutine: ["25 min video lecture", "35 min problem sets"],
      weeklyRoadmap: [
        { week: "Week 1", focus: "Vectors & spaces" },
        { week: "Week 2", focus: "Matrices & operations" },
        { week: "Week 3", focus: "Determinants" },
        { week: "Week 4", focus: "Eigenvalues & eigenvectors" },
      ],
      monthlyMilestones: ["Solve a full linear system by hand and with code"],
      resources: ["3Blue1Brown — Essence of Linear Algebra", "MIT OCW 18.06"],
      practiceSchedule: ["Daily: 5 practice problems"],
      revisionSchedule: ["Every Friday: redo the week's hardest problem"],
      tips: ["Watch the visual intuition first, then do the symbolic proof."],
    },
  },
  {
    id: "ui-ux-fundamentals",
    title: "UI/UX Design Fundamentals",
    category: "Design",
    description: "Learn core design principles and get comfortable designing in Figma.",
    deadline: "2026-07-30",
    dailyStudyHours: 1,
    currentLevel: "Beginner",
    learningStyle: "Visual",
    weakTopics: ["color theory", "typography"],
    progress: 100,
    status: "completed",
    createdAt: "2026-05-10",
    studyPlan: {
      dailyRoutine: ["30 min design theory", "30 min Figma practice"],
      weeklyRoadmap: [
        { week: "Week 1", focus: "Layout & spacing" },
        { week: "Week 2", focus: "Color & typography" },
        { week: "Week 3", focus: "Components & design systems" },
        { week: "Week 4", focus: "Prototyping" },
      ],
      monthlyMilestones: ["Design a full landing page in Figma"],
      resources: ["Refactoring UI (book)", "Figma Academy"],
      practiceSchedule: ["Weekly: redesign one existing app screen"],
      revisionSchedule: ["Bi-weekly: portfolio review"],
      tips: ["Copy well-designed UIs before trying to invent your own."],
    },
  },
];

export function getGoalById(id: string) {
  return goals.find((goal) => goal.id === id);
}
