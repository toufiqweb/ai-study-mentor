"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronRight,
  CalendarClock,
  Layers,
  BookOpen,
  Lightbulb,
  MessagesSquare,
  ListChecks,
  Map,
  Loader2,
  Target,
} from "lucide-react";
import { getGoalById, type GoalDetail } from "@/lib/api/goals";
import { getChatHistory, type ChatMessage } from "@/lib/api/chat";
import { toggleTaskAction } from "@/lib/actions/goals";

const statusStyles = {
  "on-track": "bg-(--primary)/10 text-(--primary)",
  "at-risk": "bg-amber-50 text-amber-600",
  completed: "bg-emerald-50 text-emerald-600",
} as const;

const statusLabels = {
  "on-track": "On Track",
  "at-risk": "At Risk",
  completed: "Completed",
} as const;

export default function GoalDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [goal, setGoal] = useState<GoalDetail | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [pendingTaskKey, setPendingTaskKey] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([getGoalById(id), getChatHistory(id)])
      .then(([goalData, historyData]) => {
        if (cancelled) return;
        setGoal(goalData);
        setChatHistory(historyData);
      })
      .catch((err) => {
        if (!cancelled) setErrorMsg(err instanceof Error ? err.message : "Failed to load this goal.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  const toggleTask = async (taskKey: string) => {
    if (!goal || pendingTaskKey) return;

    const wasCompleted = goal.completedTaskKeys.includes(taskKey);
    const nextCompleted = !wasCompleted;
    const totalTasks = goal.studyPlan.dailyRoutine.length;
    const nextKeys = nextCompleted
      ? [...goal.completedTaskKeys, taskKey]
      : goal.completedTaskKeys.filter((k) => k !== taskKey);
    const optimisticProgress = totalTasks > 0 ? Math.round((nextKeys.length / totalTasks) * 100) : 0;

    const previousGoal = goal;
    setGoal({ ...goal, completedTaskKeys: nextKeys, progress: optimisticProgress });
    setPendingTaskKey(taskKey);
    setErrorMsg("");

    try {
      const updated = await toggleTaskAction(goal._id, taskKey, nextCompleted);
      setGoal((prev) => (prev ? { ...prev, ...updated, studyPlan: prev.studyPlan } : prev));
    } catch (err) {
      setGoal(previousGoal);
      setErrorMsg(err instanceof Error ? err.message : "Failed to update this task.");
    } finally {
      setPendingTaskKey(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-(--primary)" />
      </div>
    );
  }

  if (!goal) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white text-center shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <Target className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-base font-bold text-gray-900">Goal not found</h3>
        <p className="mt-1 max-w-sm text-sm text-gray-500">
          {errorMsg || "This goal doesn't exist or you don't have access to it."}
        </p>
        <Link
          href="/dashboard/goals"
          className="mt-6 rounded-xl bg-(--primary) px-5 py-2.5 text-sm font-bold text-white hover:bg-(--secondary)"
        >
          Back to My Goals
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-1.5 text-sm text-gray-500">
        <Link href="/dashboard/goals" className="hover:text-(--primary)">
          My Goals
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-medium text-gray-900">{goal.title}</span>
      </div>

      {errorMsg && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
          {errorMsg}
        </div>
      )}

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-600">
                {goal.category}
              </span>
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${statusStyles[goal.status]}`}>
                {statusLabels[goal.status]}
              </span>
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900">{goal.title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">{goal.description}</p>
          </div>
          <Link
            href={`/dashboard/chat?goalId=${goal._id}`}
            className="inline-flex items-center gap-2 rounded-xl bg-(--primary) px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-(--secondary)"
          >
            <MessagesSquare className="h-4 w-4" />
            Ask AI Mentor
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-4">
          <div>
            <p className="text-xs font-medium text-gray-400">Deadline</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-gray-900">
              <CalendarClock className="h-4 w-4 text-(--primary)" />
              {new Date(goal.deadline).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Current Level</p>
            <p className="mt-1 text-sm font-bold text-gray-900">{goal.currentLevel}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Learning Style</p>
            <p className="mt-1 text-sm font-bold text-gray-900">{goal.learningStyle}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-400">Daily Study Hours</p>
            <p className="mt-1 text-sm font-bold text-gray-900">{goal.dailyStudyHours}h / day</p>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100 pt-6">
          <div className="mb-1.5 flex items-center justify-between text-sm font-medium text-gray-600">
            <span>Overall Progress</span>
            <span className="font-bold text-gray-900">{goal.progress}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-(--primary) transition-all"
              style={{ width: `${goal.progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
            <ListChecks className="h-4 w-4 text-(--primary)" />
            Daily Tasks
          </h2>
          <p className="mt-1 text-xs text-gray-400">Check off a task once you&apos;ve completed it.</p>
          <ul className="mt-4 space-y-2.5">
            {goal.studyPlan.dailyRoutine.map((task, i) => {
              const taskKey = `daily-${i}`;
              const isDone = goal.completedTaskKeys.includes(taskKey);
              return (
                <li key={taskKey}>
                  <label className="flex cursor-pointer items-start gap-2.5 text-sm">
                    <input
                      type="checkbox"
                      checked={isDone}
                      disabled={pendingTaskKey === taskKey}
                      onChange={() => toggleTask(taskKey)}
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-(--primary) disabled:opacity-50"
                    />
                    <span className={isDone ? "text-gray-400 line-through" : "text-gray-700"}>{task}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
            <Map className="h-4 w-4 text-(--secondary)" />
            Weekly Roadmap
          </h2>
          <ol className="mt-4 space-y-3">
            {goal.studyPlan.weeklyRoadmap.map((item, i) => (
              <li key={item.week} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--secondary)/10 text-xs font-bold text-(--secondary)">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900">{item.week}</p>
                  <p className="text-sm text-gray-600">{item.focus}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
            <Layers className="h-4 w-4 text-(--ternary)" />
            Monthly Milestones
          </h2>
          <ul className="mt-4 space-y-2.5">
            {goal.studyPlan.monthlyMilestones.map((milestone) => (
              <li key={milestone} className="flex gap-2 text-sm text-gray-700">
                <span className="text-(--ternary)">•</span>
                {milestone}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
            <BookOpen className="h-4 w-4 text-(--primary)" />
            Resources
          </h2>
          <ul className="mt-4 space-y-2.5">
            {goal.studyPlan.resources.map((resource) => (
              <li key={resource} className="flex gap-2 text-sm text-gray-700">
                <span className="text-(--primary)">•</span>
                {resource}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-2xl border border-(--primary)/20 bg-(--primary)/5 p-6">
        <h2 className="flex items-center gap-2 text-base font-bold text-(--primary)">
          <Lightbulb className="h-4 w-4" />
          AI Recommendations
        </h2>
        <ul className="mt-4 space-y-2.5">
          {goal.studyPlan.tips.map((tip) => (
            <li key={tip} className="flex gap-2 text-sm text-gray-700">
              <span className="text-(--primary)">•</span>
              {tip}
            </li>
          ))}
          {goal.weakTopics.length > 0 && (
            <li className="flex gap-2 text-sm text-gray-700">
              <span className="text-(--primary)">•</span>
              Extra revision recommended for: {goal.weakTopics.join(", ")}
            </li>
          )}
        </ul>
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
            <MessagesSquare className="h-4 w-4 text-(--secondary)" />
            Chat History
          </h2>
          <Link
            href={`/dashboard/chat?goalId=${goal._id}`}
            className="text-xs font-bold text-(--primary) hover:underline"
          >
            Open full chat
          </Link>
        </div>
        <div className="mt-4 space-y-3">
          {chatHistory.length === 0 ? (
            <p className="text-sm text-gray-500">
              No conversation yet — ask your AI mentor a question to get started.
            </p>
          ) : (
            chatHistory.map((msg) => (
              <div
                key={msg._id}
                className={`max-w-lg rounded-2xl px-4 py-2.5 text-sm ${
                  msg.role === "user" ? "ml-auto bg-(--primary) text-white" : "bg-gray-100 text-gray-700"
                }`}
              >
                {msg.content}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
