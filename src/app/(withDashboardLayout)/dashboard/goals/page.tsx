"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Target,
  PlusCircle,
  Loader2,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type Goal, type GoalStatus, deleteGoalAction } from "@/lib/actions/goals";
import { getMyGoals } from "@/lib/api/goals";

const PAGE_SIZE = 6;

const statusStyles: Record<GoalStatus, string> = {
  "on-track": "bg-(--primary)/10 text-(--primary)",
  "at-risk": "bg-amber-50 text-amber-600",
  completed: "bg-emerald-50 text-emerald-600",
};

const statusLabels: Record<GoalStatus, string> = {
  "on-track": "On Track",
  "at-risk": "At Risk",
  completed: "Completed",
};

export default function MyGoalsPage() {
  const queryClient = useQueryClient();
  const [errorMsg, setErrorMsg] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<"latest" | "deadline" | "progress">("latest");
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState<Goal | null>(null);

  const { data: goals = [], isLoading, error } = useQuery({
    queryKey: ["goals"],
    queryFn: getMyGoals,
    enabled: typeof window !== "undefined",
  });

  const deleteMutation = useMutation({
    mutationFn: (goalId: string) => deleteGoalAction(goalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      setPendingDelete(null);
    },
    onError: (err) => {
      setErrorMsg(err instanceof Error ? err.message : "Failed to delete this goal.");
    },
  });

  const isDeleting = deleteMutation.isPending;

  useEffect(() => {
    if (error) {
      setErrorMsg(error instanceof Error ? error.message : "Failed to load your goals.");
    }
  }, [error]);

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(goals.map((g) => g.category)))],
    [goals]
  );

  const filtered = useMemo(() => {
    let result = goals.filter((g) => g.title.toLowerCase().includes(search.toLowerCase()));
    if (category !== "all") {
      result = result.filter((g) => g.category === category);
    }
    result = [...result].sort((a, b) => {
      if (sort === "deadline") return a.deadline.localeCompare(b.deadline);
      if (sort === "progress") return b.progress - a.progress;
      return b.createdAt.localeCompare(a.createdAt);
    });
    return result;
  }, [goals, search, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    deleteMutation.mutate(pendingDelete._id);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-(--ternary)" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Goals</h1>
          <p className="mt-1 text-sm text-gray-500">Track and manage all your learning goals.</p>
        </div>
        <Link
          href="/dashboard/goals/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-(--ternary) px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          <PlusCircle className="h-4 w-4" />
          Create Goal
        </Link>
      </div>

      {errorMsg && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search goals..."
            className="h-10 w-full rounded-xl border border-gray-200 bg-white py-1.5 pr-4 pl-11 text-sm shadow-sm focus:border-(--primary) focus:ring-1 focus:ring-(--primary) focus:outline-none"
          />
        </div>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm shadow-sm focus:border-(--primary) focus:ring-1 focus:ring-(--primary) focus:outline-none"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "All Categories" : c}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm shadow-sm focus:border-(--primary) focus:ring-1 focus:ring-(--primary) focus:outline-none"
        >
          <option value="latest">Sort: Latest</option>
          <option value="deadline">Sort: Deadline</option>
          <option value="progress">Sort: Progress</option>
        </select>
      </div>

      {paginated.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white py-20 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <Target className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-base font-bold text-gray-900">No goals found</h3>
          <p className="mt-1 max-w-sm text-sm text-gray-500">
            {goals.length === 0
              ? "You haven't created any learning goals yet."
              : "Try a different search or category."}
          </p>
          <Link
            href="/dashboard/goals/create"
            className="mt-6 rounded-xl bg-(--ternary) px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
          >
            Create Goal
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {paginated.map((goal) => (
            <div
              key={goal._id}
              className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-600">
                  {goal.category}
                </span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusStyles[goal.status]}`}>
                  {statusLabels[goal.status]}
                </span>
              </div>

              <h3 className="mt-4 text-base font-bold text-gray-900">{goal.title}</h3>
              <p className="mt-1 text-xs text-gray-500">
                Deadline {new Date(goal.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-gray-500">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-(--primary)"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-gray-100 pt-4">
                <Link
                  href={`/dashboard/goals/${goal._id}`}
                  className="flex-1 rounded-xl bg-gray-50 px-3 py-2 text-center text-xs font-bold text-gray-700 hover:bg-gray-100"
                >
                  View Details
                </Link>
                <button
                  onClick={() => setPendingDelete(goal)}
                  aria-label="Delete goal"
                  className="rounded-xl border border-gray-200 p-2 text-gray-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of{" "}
            {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-xl border border-gray-200 p-2 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`h-9 w-9 rounded-xl border text-xs font-bold ${
                  page === i + 1
                    ? "border-(--ternary) bg-(--ternary) text-white shadow-sm"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-xl border border-gray-200 p-2 disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {pendingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900">Delete this goal?</h3>
            <p className="mt-2 text-sm text-gray-500">
              &ldquo;{pendingDelete.title}&rdquo; and its study plan will be permanently removed.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setPendingDelete(null)}
                disabled={isDeleting}
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-600 disabled:opacity-60"
              >
                {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
