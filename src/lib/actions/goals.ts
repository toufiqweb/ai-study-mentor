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
  completedTaskKeys: string[];
};

/**
 * Calls the AI mentor to generate a study plan preview — does not save anything.
 */
export const generateStudyPlanAction = async (
  goalInput: GoalInput
): Promise<{ success: true; data: GeneratedStudyPlan } | { success: false; error: string }> => {
  try {
    const res = await serverMutation<{ success: boolean; data: GeneratedStudyPlan }>(
      "/api/study-plan/generate",
      goalInput,
      "POST"
    );
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate a study plan.",
    };
  }
};

/**
 * Protected mutation to create a new learning goal.
 * If a studyPlan isn't provided, the backend generates one before saving.
 */
export const createGoalAction = async (
  goalInput: GoalInput,
  studyPlan?: GeneratedStudyPlan
): Promise<{ success: true } | { success: false; error: string }> => {
  try {
    await serverMutation("/api/goals", { ...goalInput, studyPlan }, "POST");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create your goal.",
    };
  }
};

/**
 * Protected mutation to delete a learning goal (and its linked study plan).
 */
export const deleteGoalAction = async (
  goalId: string
): Promise<{ success: true } | { success: false; error: string }> => {
  try {
    await serverMutation(`/api/goals/${goalId}`, {}, "DELETE");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete this goal.",
    };
  }
};

/**
 * Protected mutation to mark a daily task complete/incomplete. Recomputes and
 * persists the goal's progress on the backend from the completed task ratio.
 */
export const toggleTaskAction = async (
  goalId: string,
  taskKey: string,
  completed: boolean
): Promise<{ success: true; data: Goal } | { success: false; error: string }> => {
  try {
    const res = await serverMutation<{ success: boolean; data: Goal }>(
      `/api/goals/${goalId}/tasks`,
      { taskKey, completed },
      "PATCH"
    );
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to toggle this task.",
    };
  }
};
