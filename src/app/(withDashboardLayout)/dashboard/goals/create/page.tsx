"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sparkles, Loader2, Save, CheckCircle2 } from "lucide-react";
import { CATEGORIES, SKILL_LEVELS, LEARNING_STYLES } from "@/lib/constants";

const goalSchema = z.object({
  title: z.string().min(3, "Give your goal a clear title"),
  category: z.string().min(1, "Select a category"),
  description: z.string().min(10, "Add a short description of what you want to learn"),
  deadline: z.string().min(1, "Select a target completion date"),
  dailyStudyHours: z
    .number({ message: "Enter your daily study hours" })
    .min(0.5, "At least 0.5 hours")
    .max(16, "That's more hours than a day has room for"),
  currentLevel: z.enum(SKILL_LEVELS, { message: "Select your current level" }),
  learningStyle: z.enum(LEARNING_STYLES, { message: "Select a preferred learning style" }),
  weakTopics: z.string().optional(),
});

type GoalFormValues = z.infer<typeof goalSchema>;

const inputStyles =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-(--primary) focus:bg-white focus:outline-none focus:ring-1 focus:ring-(--primary)";
const labelStyles = "text-sm font-medium text-gray-700";

export default function CreateGoalPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string[] | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<GoalFormValues>({
    resolver: zodResolver(goalSchema),
    defaultValues: { dailyStudyHours: 1 },
  });

  const onGenerate = handleSubmit(async (values) => {
    setIsGenerating(true);
    setGeneratedPlan(null);
    // Simulated AI call — wire this up once POST /study-plan/generate exists on the backend.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsGenerating(false);
    setGeneratedPlan([
      `Daily routine built around ${values.dailyStudyHours}h/day of ${values.learningStyle.toLowerCase()}-focused study`,
      `Weekly roadmap broken into 4 milestones toward "${values.title}"`,
      values.weakTopics
        ? `Extra revision blocks scheduled for: ${values.weakTopics}`
        : "Balanced revision schedule across all topics",
      "Resource list and practice schedule tailored to your current level",
    ]);
  });

  const onSave = handleSubmit(async () => {
    setIsSaving(true);
    // No backend `POST /goals` endpoint yet — this simulates the save and redirects.
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push("/dashboard/goals");
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="border-b border-gray-100 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Create Goal</h1>
        <p className="mt-1 text-sm text-gray-500">
          Tell us what you want to learn and your AI mentor will build a personalized plan.
        </p>
      </div>

      <form className="space-y-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
        <div className="space-y-5">
          <h3 className="border-b border-gray-100 pb-2 text-lg font-semibold text-gray-900">
            Goal Details
          </h3>

          <div className="space-y-1.5">
            <label className={labelStyles} htmlFor="title">
              Goal Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              placeholder="e.g. Master React Hooks"
              className={inputStyles}
              {...register("title")}
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className={labelStyles} htmlFor="category">
                Category <span className="text-red-500">*</span>
              </label>
              <select id="category" className={inputStyles} {...register("category")}>
                <option value="">Select a category</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className={labelStyles} htmlFor="deadline">
                Target Completion Date <span className="text-red-500">*</span>
              </label>
              <input id="deadline" type="date" className={inputStyles} {...register("deadline")} />
              {errors.deadline && <p className="text-xs text-red-500">{errors.deadline.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={labelStyles} htmlFor="description">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              rows={3}
              placeholder="What do you want to be able to do by the deadline?"
              className={inputStyles}
              {...register("description")}
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
          </div>
        </div>

        <div className="space-y-5">
          <h3 className="border-b border-gray-100 pb-2 text-lg font-semibold text-gray-900">
            Study Preferences
          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="space-y-1.5">
              <label className={labelStyles} htmlFor="dailyStudyHours">
                Daily Study Hours <span className="text-red-500">*</span>
              </label>
              <input
                id="dailyStudyHours"
                type="number"
                step="0.5"
                min="0.5"
                max="16"
                className={inputStyles}
                {...register("dailyStudyHours", { valueAsNumber: true })}
              />
              {errors.dailyStudyHours && (
                <p className="text-xs text-red-500">{errors.dailyStudyHours.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className={labelStyles} htmlFor="currentLevel">
                Current Skill Level <span className="text-red-500">*</span>
              </label>
              <select id="currentLevel" className={inputStyles} {...register("currentLevel")}>
                <option value="">Select level</option>
                {SKILL_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.currentLevel && (
                <p className="text-xs text-red-500">{errors.currentLevel.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className={labelStyles} htmlFor="learningStyle">
                Preferred Learning Style <span className="text-red-500">*</span>
              </label>
              <select id="learningStyle" className={inputStyles} {...register("learningStyle")}>
                <option value="">Select style</option>
                {LEARNING_STYLES.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
              {errors.learningStyle && (
                <p className="text-xs text-red-500">{errors.learningStyle.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={labelStyles} htmlFor="weakTopics">
              Weak Topics
            </label>
            <input
              id="weakTopics"
              type="text"
              placeholder="Comma-separated, e.g. useEffect, closures"
              className={inputStyles}
              {...register("weakTopics")}
            />
          </div>
        </div>

        {generatedPlan && (
          <div className="rounded-xl border border-(--primary)/20 bg-(--primary)/5 p-5">
            <p className="flex items-center gap-2 text-sm font-bold text-(--primary)">
              <CheckCircle2 className="h-4 w-4" />
              AI Study Plan Preview for &ldquo;{getValues("title")}&rdquo;
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-gray-700">
              {generatedPlan.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-(--primary)">•</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col-reverse justify-end gap-3 border-t border-gray-100 pt-4 sm:flex-row">
          <button
            type="button"
            onClick={onGenerate}
            disabled={isGenerating}
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-(--primary)/20 bg-white px-5 py-2.5 text-sm font-bold text-(--primary) transition-colors hover:border-(--primary)/40 disabled:opacity-60"
          >
            {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Generate AI Study Plan
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-(--primary) px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-(--secondary) disabled:opacity-60"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Goal
          </button>
        </div>
      </form>
    </div>
  );
}
