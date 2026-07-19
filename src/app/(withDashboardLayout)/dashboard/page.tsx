"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Target,
  Clock,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  PieChartIcon,
  Loader2,
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import ChartTooltip from "@/components/dashboard/ChartTooltip";
import { getMyGoals } from "@/lib/api/goals";
import type { Goal } from "@/lib/actions/goals";
import { getAnalytics, type Analytics } from "@/lib/api/analytics";

const PIE_COLORS = ["#4f46e5", "#7c3aed", "#06b6d4", "#a5b4fc", "#f59e0b", "#10b981"];

const truncate = (value: string) => (value.length > 12 ? `${value.slice(0, 12)}…` : value);

export default function DashboardOverview() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let cancelled = false;

    Promise.all([getMyGoals(), getAnalytics()])
      .then(([goalsData, analyticsData]) => {
        if (cancelled) return;
        setGoals(goalsData);
        setAnalytics(analyticsData);
      })
      .catch((err) => {
        if (!cancelled) setErrorMsg(err instanceof Error ? err.message : "Failed to load your dashboard.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-(--ternary)" />
      </div>
    );
  }

  if (errorMsg || !analytics) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
        {errorMsg || "Failed to load your dashboard."}
      </div>
    );
  }

  const { stats, charts } = analytics;
  const activeGoals = goals.filter((g) => g.status !== "completed");
  const completionRate = stats.totalTasks > 0 ? Math.round((stats.totalCompletedTasks / stats.totalTasks) * 100) : 0;
  const recentGoals = [...goals].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Welcome back 👋</h1>
        <p className="mt-1 text-sm text-gray-500">
          Here&apos;s a snapshot of your learning progress.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Goals" value={String(activeGoals.length)} icon={Target} accent="primary" />
        <StatCard
          label="Study Hours"
          value={`${stats.weeklyPlannedHours}h`}
          sub="Planned per week"
          icon={Clock}
          accent="secondary"
        />
        <StatCard
          label="Completed Tasks"
          value={`${stats.totalCompletedTasks} / ${stats.totalTasks}`}
          sub={`${completionRate}% complete`}
          icon={CheckCircle2}
          accent="accent"
        />
        <StatCard
          label="Goal Progress"
          value={`${stats.avgProgress}%`}
          sub="Average across all goals"
          icon={TrendingUp}
          accent="neutral"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
            <BarChart3 className="h-4 w-4 text-(--primary)" />
            Study Hours by Goal
          </h3>
          <p className="mb-5 text-xs text-gray-400">Daily study hours target per goal</p>
          {charts.studyHoursByGoal.length === 0 ? (
            <p className="py-16 text-center text-sm text-gray-400">No goals yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={charts.studyHoursByGoal}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="goal" tickFormatter={truncate} tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} unit="h" />
                <Tooltip content={(props) => <ChartTooltip {...props} />} />
                <Bar dataKey="hours" name="Hours/day" fill="#4f46e5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
            <PieChartIcon className="h-4 w-4 text-(--ternary)" />
            Subject Distribution
          </h3>
          <p className="mb-5 text-xs text-gray-400">Goals by category</p>
          {charts.categoryDistribution.length === 0 ? (
            <p className="py-16 text-center text-sm text-gray-400">No goals yet.</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={charts.categoryDistribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={2}
                  >
                    {charts.categoryDistribution.map((entry, i) => (
                      <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={(props) => <ChartTooltip {...props} />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
                {charts.categoryDistribution.map((entry, i) => (
                  <span key={entry.name} className="flex items-center gap-1.5 text-xs text-gray-500">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                    />
                    {entry.name}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
            <TrendingUp className="h-4 w-4 text-(--secondary)" />
            Goal Progress
          </h3>
          <p className="mb-5 text-xs text-gray-400">Current completion by goal</p>
          {charts.progressByGoal.length === 0 ? (
            <p className="py-16 text-center text-sm text-gray-400">No goals yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={charts.progressByGoal}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="goal" tickFormatter={truncate} tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} unit="%" domain={[0, 100]} />
                <Tooltip content={(props) => <ChartTooltip {...props} />} />
                <Line
                  type="monotone"
                  dataKey="progress"
                  name="Progress"
                  stroke="#7c3aed"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#7c3aed" }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">Recent Goals</h3>
            <Link href="/dashboard/goals" className="text-xs font-bold text-(--primary) hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-4">
            {recentGoals.length === 0 ? (
              <p className="text-sm text-gray-500">
                No goals yet.{" "}
                <Link href="/dashboard/goals/create" className="font-bold text-(--primary) hover:underline">
                  Create one
                </Link>
                .
              </p>
            ) : (
              recentGoals.map((goal) => (
                <Link key={goal._id} href={`/dashboard/goals/${goal._id}`} className="block">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-gray-800">{goal.title}</span>
                    <span className="text-xs text-gray-400">{goal.progress}%</span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {goal.category} • Due{" "}
                    {new Date(goal.deadline).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full rounded-full bg-(--primary)" style={{ width: `${goal.progress}%` }} />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
