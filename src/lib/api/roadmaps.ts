"use server";

import { serverFetch } from "../core/server";

export type RoadmapDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type RoadmapSummary = {
  _id: string;
  title: string;
  category: string;
  difficulty: RoadmapDifficulty;
  durationWeeks: number;
  shortDescription: string;
  totalLearners: number;
  rating: number;
  createdBy: string;
  createdAt: string;
};

export type RoadmapDetail = RoadmapSummary & {
  description: string;
  learningObjectives: string[];
  weeklyPlan: { week: string; topics: string[] }[];
  requiredSkills: string[];
  resources: string[];
  aiTips: string[];
};

export type RoadmapSort = "latest" | "popular" | "rating" | "duration";

export type RoadmapListParams = {
  search?: string;
  category?: string;
  difficulty?: string;
  duration?: number;
  sort?: RoadmapSort;
  page?: number;
  limit?: number;
};

export type RoadmapListResult = {
  items: RoadmapSummary[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

/**
 * Public fetch for the Explore Roadmaps listing — search/filter/sort/pagination
 * are all handled server-side, matching plan.md's technical requirements.
 */
export const getRoadmaps = async (params: RoadmapListParams = {}): Promise<RoadmapListResult> => {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.category) query.set("category", params.category);
  if (params.difficulty) query.set("difficulty", params.difficulty);
  if (params.duration) query.set("duration", String(params.duration));
  if (params.sort) query.set("sort", params.sort);
  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));

  const res = await serverFetch<{ success: boolean; data: RoadmapListResult }>(
    `/api/roadmaps?${query.toString()}`,
    {},
    { cache: "no-store" }
  );
  return res.data;
};

/**
 * Public fetch for a single roadmap's details + related roadmaps in the same category.
 * Returns null on any failure (not found or otherwise) — the details page renders a
 * not-found state either way.
 */
export const getRoadmapDetail = async (
  id: string
): Promise<{ roadmap: RoadmapDetail; related: RoadmapSummary[] } | null> => {
  try {
    const res = await serverFetch<{
      success: boolean;
      data: { roadmap: RoadmapDetail; related: RoadmapSummary[] };
    }>(`/api/roadmaps/${id}`, {}, { cache: "no-store" });
    return res.data;
  } catch {
    return null;
  }
};
