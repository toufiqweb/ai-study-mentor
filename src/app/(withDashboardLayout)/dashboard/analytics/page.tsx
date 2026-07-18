"use client";

import { useEffect, useState } from "react";
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
import { Clock, TrendingUp, CheckCircle2, Layers, BarChart3, PieChartIcon, Lightbulb, Loader2 } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import ChartTooltip from "@/components/dashboard/ChartTooltip";
import { getAnalytics, type Analytics } from "@/lib/api/analytics";

const PIE_COLORS = ["#4f46e5", "#7c3aed", "#06b6d4", "#a5b4fc", "#f59e0b", "#10b981"];

const truncate = (value: string) => (value.length > 12 ? `${value.slice(0, 12)}…` : value);

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let cancelled = false;

    getAnalytics()
      .then((data) => {
        if (!cancelled) setAnalytics(data);
      })
      .catch((err) => {
        if (!cancelled) setErrorMsg(err instanceof Error ? err.message : "Failed to load analytics.");
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
        <Loader2 className="h-8 w-8 animate-spin text-(--primary)" />
      </div>
    );
  }

  if (errorMsg || !analytics) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
        {errorMsg || "Failed to load analytics."}
      </div>
    );
  }

  const { stats, charts, aiInsight } = analytics;
  const completionRate = stats.totalTasks > 0 ? Math.round((stats.totalCompletedTasks / stats.totalTasks) * 100) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">How your study time and progress break down across goals.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Study Hours"
          value={`${stats.weeklyPlannedHours}h`}
          sub="Planned per week across active goals"
          icon={Clock}
          accent="secondary"
        />
        <StatCard
          label="Goal Progress"
          value={`${stats.avgProgress}%`}
          sub="Average across all goals"
          icon={TrendingUp}
          accent="primary"
        />
        <StatCard
          label="Completed Tasks"
          value={`${stats.totalCompletedTasks} / ${stats.totalTasks}`}
          sub={`${completionRate}% complete`}
          icon={CheckCircle2}
          accent="accent"
        />
        <StatCard
          label="Learning Categories"
          value={`${stats.categoryCount}`}
          sub={stats.topCategory ? `Most active: ${stats.topCategory}` : "No goals yet"}
          icon={Layers}
          accent="neutral"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
            <BarChart3 className="h-4 w-4 text-(--primary)" />
            Study Hours
          </h3>
          <p className="mb-5 text-xs text-gray-400">Daily study hours target by goal</p>
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
            Learning Categories
          </h3>
          <p className="mb-5 text-xs text-gray-400">Goals by category</p>
          {charts.categoryDistribution.length === 0 ? (
            <p className="py-16 text-center text-sm text-gray-400">No goals yet.</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={200}>
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

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
          <TrendingUp className="h-4 w-4 text-(--secondary)" />
          Goal Progress
        </h3>
        <p className="mb-5 text-xs text-gray-400">Current completion by goal</p>
        {charts.progressByGoal.length === 0 ? (
          <p className="py-16 text-center text-sm text-gray-400">No goals yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
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

      <section className="rounded-2xl border border-(--primary)/20 bg-(--primary)/5 p-6">
        <h2 className="flex items-center gap-2 text-base font-bold text-(--primary)">
          <Lightbulb className="h-4 w-4" />
          AI Insights
        </h2>
        <p className="mt-3 text-sm leading-6 text-gray-700">{aiInsight}</p>
      </section>
    </div>
  );
}
