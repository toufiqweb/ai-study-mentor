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
  "at-risk": "bg-(--warning-subtle) text-(--warning)",
  completed: "bg-(--success-subtle) text-(--success)",
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
    mutationFn: async (goalId: string) => {
      const res = await deleteGoalAction(goalId);
      if (!res.success) throw new Error(res.error);
      return res;
    },
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
      <div className="flex flex-col justify-between gap-4 border-b border-(--border-subtle) pb-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-(--text-strong)">My Goals</h1>
          <p className="mt-1 text-sm text-(--text-muted)">Track and manage all your learning goals.</p>
        </div>
        <Link
          href="/dashboard/goals/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-(--action-bg) px-5 py-2.5 text-sm font-bold text-(--action-text) shadow-sm transition-colors hover:bg-(--action-hover)"
        >
          <PlusCircle className="h-4 w-4" />
          Create Goal
        </Link>
      </div>

      {errorMsg && (
        <div className="rounded-xl border border-(--error-border) bg-(--error-subtle) px-4 py-3 text-sm font-medium text-(--error-strong)">
          {errorMsg}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-(--text-subtle)" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search goals..."
            className="h-10 w-full rounded-xl border border-(--border-default) bg-(--surface) py-1.5 pr-4 pl-11 text-sm shadow-sm focus:border-(--primary) focus:ring-1 focus:ring-(--primary) focus:outline-none"
          />
        </div>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="h-10 rounded-xl border border-(--border-default) bg-(--surface) px-3 text-sm shadow-sm focus:border-(--primary) focus:ring-1 focus:ring-(--primary) focus:outline-none"
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
          className="h-10 rounded-xl border border-(--border-default) bg-(--surface) px-3 text-sm shadow-sm focus:border-(--primary) focus:ring-1 focus:ring-(--primary) focus:outline-none"
        >
          <option value="latest">Sort: Latest</option>
          <option value="deadline">Sort: Deadline</option>
          <option value="progress">Sort: Progress</option>
        </select>
      </div>

      {paginated.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-(--border-subtle) bg-(--surface) py-20 text-center shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--surface-subtle) text-(--text-subtle)">
            <Target className="h-7 w-7" />
          </div>
          <h3 className="mt-4 text-base font-bold text-(--text-strong)">No goals found</h3>
          <p className="mt-1 max-w-sm text-sm text-(--text-muted)">
            {goals.length === 0
              ? "You haven't created any learning goals yet."
              : "Try a different search or category."}
          </p>
          <Link
            href="/dashboard/goals/create"
            className="mt-6 rounded-xl bg-(--action-bg) px-5 py-2.5 text-sm font-bold text-(--action-text) hover:bg-(--action-hover)"
          >
            Create Goal
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {paginated.map((goal) => (
            <div
              key={goal._id}
              className="flex h-full flex-col rounded-2xl border border-(--border-subtle) bg-(--surface) p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="rounded-full bg-(--surface-subtle) px-2.5 py-1 text-xs font-bold text-(--text-secondary)">
                  {goal.category}
                </span>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusStyles[goal.status]}`}>
                  {statusLabels[goal.status]}
                </span>
              </div>

              <h3 className="mt-4 text-base font-bold text-(--text-strong)">{goal.title}</h3>
              <p className="mt-1 text-xs text-(--text-muted)">
                Deadline {new Date(goal.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-(--text-muted)">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-(--surface-subtle)">
                  <div
                    className="h-full rounded-full bg-(--primary)"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 border-t border-(--border-subtle) pt-4">
                <Link
                  href={`/dashboard/goals/${goal._id}`}
                  className="flex-1 rounded-xl bg-(--surface-muted) px-3 py-2 text-center text-xs font-bold text-(--text-body) hover:bg-(--surface-subtle)"
                >
                  View Details
                </Link>
                <button
                  onClick={() => setPendingDelete(goal)}
                  aria-label="Delete goal"
                  className="rounded-xl border border-(--border-default) p-2 text-(--text-subtle) hover:border-(--error-border-strong) hover:bg-(--error-subtle) hover:text-(--error)"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <div className="flex flex-col items-center justify-between gap-4 border-t border-(--border-subtle) pt-4 sm:flex-row">
          <p className="text-sm text-(--text-muted)">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of{" "}
            {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-xl border border-(--border-default) p-2 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`h-9 w-9 rounded-xl border text-xs font-bold ${
                  page === i + 1
                    ? "border-(--action-bg) bg-(--action-bg) text-(--action-text) shadow-sm"
                    : "border-(--border-default) text-(--text-secondary) hover:bg-(--surface-muted)"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-xl border border-(--border-default) p-2 disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {pendingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-(--black)/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-(--surface) p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-(--text-strong)">Delete this goal?</h3>
            <p className="mt-2 text-sm text-(--text-muted)">
              &ldquo;{pendingDelete.title}&rdquo; and its study plan will be permanently removed.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setPendingDelete(null)}
                disabled={isDeleting}
                className="rounded-xl border border-(--border-default) bg-(--surface-muted) px-4 py-2 text-sm font-bold text-(--text-body) hover:bg-(--surface-subtle) disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 rounded-xl bg-(--error) px-4 py-2 text-sm font-bold text-(--white) hover:bg-(--error-strong) disabled:opacity-60"
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
