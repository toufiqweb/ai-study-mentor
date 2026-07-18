"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { protectedFetch } from "../core/server";
import type { Goal, GeneratedStudyPlan } from "../actions/goals";

export type GoalDetail = Goal & { studyPlan: GeneratedStudyPlan };

/**
 * Protected fetch to get the current user's learning goals.
 */
export const getMyGoals = async (): Promise<Goal[]> => {
  const res = await protectedFetch<{ success: boolean; data: Goal[] }>(
    "/api/goals",
    {},
    { cache: "no-store" }
  );
  return res.data;
};

/**
 * Protected fetch to get a single learning goal (with its study plan) by id.
 */
export const getGoalById = async (goalId: string): Promise<GoalDetail | null> => {
  try {
    const res = await protectedFetch<{ success: boolean; data: GoalDetail }>(
      `/api/goals/${goalId}`,
      {},
      { cache: "no-store" }
    );
    return res.data;
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return null;
  }
};
