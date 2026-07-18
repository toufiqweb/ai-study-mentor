"use client";

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
import { Target, Clock, CheckCircle2, TrendingUp, BarChart3, PieChartIcon } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import ChartTooltip from "@/components/dashboard/ChartTooltip";

const weeklyStudyHours = [
  { day: "Mon", hours: 1.5 },
  { day: "Tue", hours: 2 },
  { day: "Wed", hours: 1 },
  { day: "Thu", hours: 2.5 },
  { day: "Fri", hours: 1.5 },
  { day: "Sat", hours: 3 },
  { day: "Sun", hours: 2 },
];

const goalProgress = [
  { week: "Week 1", progress: 15 },
  { week: "Week 2", progress: 34 },
  { week: "Week 3", progress: 52 },
  { week: "Week 4", progress: 68 },
];

const subjectDistribution = [
  { name: "Programming", value: 40 },
  { name: "Languages", value: 25 },
  { name: "Mathematics", value: 20 },
  { name: "Design", value: 15 },
];

const PIE_COLORS = ["#4f46e5", "#7c3aed", "#06b6d4", "#a5b4fc"];

const recentGoals = [
  { title: "Master React Hooks", category: "Programming", progress: 70, deadline: "Aug 12, 2026" },
  { title: "Conversational Spanish", category: "Languages", progress: 45, deadline: "Sep 1, 2026" },
  { title: "Linear Algebra Basics", category: "Mathematics", progress: 20, deadline: "Sep 20, 2026" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Welcome back 👋</h1>
        <p className="mt-1 text-sm text-gray-500">
          Here&apos;s a snapshot of your learning progress.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Goals" value="3" sub="1 due this week" icon={Target} accent="primary" />
        <StatCard
          label="Today's Study Time"
          value="2h 45m"
          sub="Goal: 3h / day"
          icon={Clock}
          accent="secondary"
        />
        <StatCard
          label="Completed Tasks"
          value="18 / 24"
          sub="75% this week"
          icon={CheckCircle2}
          accent="accent"
        />
        <StatCard
          label="Weekly Progress"
          value="68%"
          sub="+12% vs last week"
          icon={TrendingUp}
          accent="neutral"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
            <BarChart3 className="h-4 w-4 text-(--primary)" />
            Weekly Study Hours
          </h3>
          <p className="mb-5 text-xs text-gray-400">Hours studied per day this week</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyStudyHours}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip content={(props) => <ChartTooltip {...props} />} />
              <Bar dataKey="hours" name="Hours" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
            <PieChartIcon className="h-4 w-4 text-(--ternary)" />
            Subject Distribution
          </h3>
          <p className="mb-5 text-xs text-gray-400">Time spent by category</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={subjectDistribution}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
              >
                {subjectDistribution.map((entry, i) => (
                  <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={(props) => <ChartTooltip {...props} />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5">
            {subjectDistribution.map((entry, i) => (
              <span key={entry.name} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                />
                {entry.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="flex items-center gap-2 text-base font-bold text-gray-900">
            <TrendingUp className="h-4 w-4 text-(--secondary)" />
            Goal Progress
          </h3>
          <p className="mb-5 text-xs text-gray-400">Overall completion over the last 4 weeks</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={goalProgress}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} unit="%" />
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
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">Recent Goals</h3>
            <Link href="/dashboard/goals" className="text-xs font-bold text-(--primary) hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-4">
            {recentGoals.map((goal) => (
              <div key={goal.title}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-gray-800">{goal.title}</span>
                  <span className="text-xs text-gray-400">{goal.progress}%</span>
                </div>
                <p className="text-xs text-gray-400">
                  {goal.category} • Due {goal.deadline}
                </p>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-(--primary)"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
