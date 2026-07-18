"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Save, Target, Clock, CheckCircle2, TrendingUp } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getMyGoals } from "@/lib/api/goals";
import type { Goal } from "@/lib/actions/goals";
import { getAnalytics, type Analytics } from "@/lib/api/analytics";
import StatCard from "@/components/dashboard/StatCard";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [goals, setGoals] = useState<Goal[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState("");

  useEffect(() => {
    let cancelled = false;

    Promise.all([getMyGoals(), getAnalytics()])
      .then(([goalsData, analyticsData]) => {
        if (cancelled) return;
        setGoals(goalsData);
        setAnalytics(analyticsData);
      })
      .catch((err) => {
        if (!cancelled) setStatsError(err instanceof Error ? err.message : "Failed to load your stats.");
      })
      .finally(() => {
        if (!cancelled) setIsLoadingStats(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const activeGoals = goals.filter((g) => g.status !== "completed");

  const user = session?.user;
  const displayName = name || user?.name || "";
  const displayImage = image || user?.image || "";

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    try {
      await authClient.updateUser({
        name: name || user?.name,
        image: image || user?.image || undefined,
      });
      setMessage({ type: "success", text: "Profile updated successfully." });
    } catch {
      setMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-(--primary)" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Profile</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account and see your learning stats.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900">Student Information</h2>
          <form onSubmit={handleSave} className="mt-5 space-y-5">
            <div className="flex items-center gap-4">
              {displayImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={displayImage}
                  alt={displayName}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--primary)/10 text-xl font-bold text-(--primary)">
                  {displayName.charAt(0).toUpperCase() || "S"}
                </div>
              )}
              <div className="flex-1 space-y-1.5">
                <label className="text-sm font-medium text-gray-700" htmlFor="image">
                  Profile Image URL
                </label>
                <input
                  id="image"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-(--primary) focus:bg-white focus:outline-none focus:ring-1 focus:ring-(--primary)"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name || user?.name || ""}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-(--primary) focus:bg-white focus:outline-none focus:ring-1 focus:ring-(--primary)"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={user?.email ?? ""}
                  disabled
                  className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-gray-500"
                />
              </div>
            </div>

            <p className="text-xs text-gray-400">
              Joined{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "—"}
            </p>

            {message && (
              <p
                className={`rounded-xl px-4 py-2.5 text-sm font-medium ${
                  message.type === "success" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                }`}
              >
                {message.text}
              </p>
            )}

            <div className="flex justify-end border-t border-gray-100 pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-xl bg-(--primary) px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-(--secondary) disabled:opacity-60"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Update Profile
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-4">
          {isLoadingStats ? (
            <div className="flex h-64 items-center justify-center rounded-2xl border border-gray-100 bg-white shadow-sm">
              <Loader2 className="h-6 w-6 animate-spin text-(--primary)" />
            </div>
          ) : statsError ? (
            <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {statsError}
            </div>
          ) : (
            <>
              <StatCard label="Active Goals" value={String(activeGoals.length)} icon={Target} accent="primary" />
              <StatCard
                label="Study Hours"
                value={`${analytics?.stats.weeklyPlannedHours ?? 0}h`}
                sub="Planned per week"
                icon={Clock}
                accent="secondary"
              />
              <StatCard
                label="Completed Tasks"
                value={`${analytics?.stats.totalCompletedTasks ?? 0} / ${analytics?.stats.totalTasks ?? 0}`}
                icon={CheckCircle2}
                accent="accent"
              />
              <StatCard
                label="Goal Progress"
                value={`${analytics?.stats.avgProgress ?? 0}%`}
                sub="Average across all goals"
                icon={TrendingUp}
                accent="neutral"
              />
            </>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Current Goals</h2>
        <div className="mt-4 space-y-3">
          {isLoadingStats ? (
            <div className="flex h-24 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-(--primary)" />
            </div>
          ) : activeGoals.length === 0 ? (
            <p className="text-sm text-gray-500">
              No active goals yet.{" "}
              <Link href="/dashboard/goals/create" className="font-bold text-(--primary) hover:underline">
                Create one
              </Link>
              .
            </p>
          ) : (
            activeGoals.map((goal) => (
              <Link
                key={goal._id}
                href={`/dashboard/goals/${goal._id}`}
                className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-3 hover:bg-gray-50"
              >
                <div>
                  <p className="text-sm font-bold text-gray-900">{goal.title}</p>
                  <p className="text-xs text-gray-400">{goal.category}</p>
                </div>
                <span className="text-sm font-bold text-(--primary)">{goal.progress}%</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
