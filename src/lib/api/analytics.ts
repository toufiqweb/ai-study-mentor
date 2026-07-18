"use server";

import { protectedFetch } from "../core/server";

export type AnalyticsStats = {
  weeklyPlannedHours: number;
  avgProgress: number;
  totalCompletedTasks: number;
  totalTasks: number;
  categoryCount: number;
  topCategory: string | null;
};

export type AnalyticsCharts = {
  studyHoursByGoal: { goal: string; hours: number }[];
  progressByGoal: { goal: string; progress: number }[];
  categoryDistribution: { name: string; value: number }[];
};

export type Analytics = {
  stats: AnalyticsStats;
  charts: AnalyticsCharts;
  aiInsight: string;
};

/**
 * Protected fetch for the student's aggregated analytics (stats, chart data, AI insight).
 */
export const getAnalytics = async (): Promise<Analytics> => {
  const res = await protectedFetch<{ success: boolean; data: Analytics }>(
    "/api/analytics",
    {},
    { cache: "no-store" }
  );
  return res.data;
};
