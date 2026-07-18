"use server";

import { serverMutation } from "../core/server";

export type GoalInput = {
  title: string;
  category: string;
  description: string;
  deadline: string;
  dailyStudyHours: number;
  currentLevel: string;
  learningStyle: string;
  weakTopics: string[];
};

export type GeneratedStudyPlan = {
  dailyRoutine: string[];
  weeklyRoadmap: { week: string; focus: string }[];
  monthlyMilestones: string[];
  resources: string[];
  practiceSchedule: string[];
  revisionSchedule: string[];
  tips: string[];
};

export type GoalStatus = "on-track" | "at-risk" | "completed";

export type Goal = GoalInput & {
  _id: string;
  createdAt: string;
  progress: number;
  status: GoalStatus;
};

/**
 * Calls the AI mentor to generate a study plan preview — does not save anything.
 */
export const generateStudyPlanAction = async (goalInput: GoalInput): Promise<GeneratedStudyPlan> => {
  const res = await serverMutation<{ success: boolean; data: GeneratedStudyPlan }>(
    "/api/study-plan/generate",
    goalInput,
    "POST"
  );
  return res.data;
};

/**
 * Protected mutation to create a new learning goal.
 * If a studyPlan isn't provided, the backend generates one before saving.
 */
export const createGoalAction = async (goalInput: GoalInput, studyPlan?: GeneratedStudyPlan) => {
  return serverMutation("/api/goals", { ...goalInput, studyPlan }, "POST");
};

/**
 * Protected mutation to delete a learning goal (and its linked study plan).
 */
export const deleteGoalAction = async (goalId: string) => {
  return serverMutation(`/api/goals/${goalId}`, {}, "DELETE");
};
