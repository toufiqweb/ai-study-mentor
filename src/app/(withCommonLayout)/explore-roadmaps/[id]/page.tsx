"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronRight,
  Clock,
  Users,
  Star,
  Sparkles,
  Loader2,
  Target,
  Map,
  ListChecks,
  BookOpen,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { getRoadmapDetail, type RoadmapDetail, type RoadmapSummary } from "@/lib/api/roadmaps";
import { authClient } from "@/lib/auth-client";
import { categoryIcons } from "@/components/shared/RoadmapCard";
import RoadmapCard from "@/components/shared/RoadmapCard";

const difficultyStyles = {
  Beginner: "bg-(--ternary)/10 text-(--ternary)",
  Intermediate: "bg-(--secondary)/10 text-(--secondary)",
  Advanced: "bg-(--primary)/10 text-(--primary)",
} as const;

export default function RoadmapDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { data: session, isPending: isSessionPending } = authClient.useSession();

  const [roadmap, setRoadmap] = useState<RoadmapDetail | null>(null);
  const [related, setRelated] = useState<RoadmapSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getRoadmapDetail(params.id).then((result) => {
      if (cancelled) return;
      setRoadmap(result?.roadmap ?? null);
      setRelated(result?.related ?? []);
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [params.id]);

  const handleStartRoadmap = () => {
    if (!roadmap) return;

    if (session?.user) {
      const query = new URLSearchParams({
        title: roadmap.title,
        category: roadmap.category,
        description: roadmap.shortDescription,
        currentLevel: roadmap.difficulty,
      });
      router.push(`/dashboard/goals/create?${query.toString()}`);
    } else {
      router.push("/login");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-(--primary)" />
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
          <Target className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-gray-900">Roadmap not found</h1>
        <p className="mt-2 text-sm text-gray-500">This roadmap doesn&apos;t exist or may have been removed.</p>
        <Link
          href="/explore-roadmaps"
          className="mt-6 inline-block rounded-xl bg-(--primary) px-5 py-2.5 text-sm font-bold text-white hover:bg-(--secondary)"
        >
          Back to Explore Roadmaps
        </Link>
      </div>
    );
  }

  const Icon = categoryIcons[roadmap.category] ?? Sparkles;

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center gap-1.5 text-sm text-gray-500">
          <Link href="/explore-roadmaps" className="hover:text-(--primary)">
            Explore Roadmaps
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-gray-900">{roadmap.title}</span>
        </div>

        <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-(--primary)/10 to-(--secondary)/10">
                <Icon className="h-8 w-8 text-(--primary)" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-600">
                    {roadmap.category}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${difficultyStyles[roadmap.difficulty]}`}
                  >
                    {roadmap.difficulty}
                  </span>
                </div>
                <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900">{roadmap.title}</h1>
                <p className="mt-1 text-xs text-gray-400">By {roadmap.createdBy}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-6 sm:grid-cols-4">
            <div>
              <p className="text-xs font-medium text-gray-400">Duration</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-gray-900">
                <Clock className="h-4 w-4 text-(--primary)" />
                {roadmap.durationWeeks} weeks
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Total Learners</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-gray-900">
                <Users className="h-4 w-4 text-(--secondary)" />
                {roadmap.totalLearners.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Rating</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-bold text-gray-900">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                {roadmap.rating.toFixed(1)} / 5
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Difficulty</p>
              <p className="mt-1 text-sm font-bold text-gray-900">{roadmap.difficulty}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Description</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">{roadmap.description}</p>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <Target className="h-4.5 w-4.5 text-(--primary)" />
                Learning Objectives
              </h2>
              <ul className="mt-4 space-y-2.5">
                {roadmap.learningObjectives.map((objective) => (
                  <li key={objective} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-(--primary)">•</span>
                    {objective}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <Map className="h-4.5 w-4.5 text-(--secondary)" />
                Weekly Learning Plan
              </h2>
              <ol className="mt-4 space-y-4">
                {roadmap.weeklyPlan.map((item, i) => (
                  <li key={item.week} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--secondary)/10 text-xs font-bold text-(--secondary)">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.week}</p>
                      <ul className="mt-1 space-y-1">
                        {item.topics.map((topic) => (
                          <li key={topic} className="text-sm text-gray-600">
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <ListChecks className="h-4.5 w-4.5 text-(--ternary)" />
                Required Skills
              </h2>
              <ul className="mt-4 space-y-2.5">
                {roadmap.requiredSkills.map((skill) => (
                  <li key={skill} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-(--ternary)">•</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <BookOpen className="h-4.5 w-4.5 text-(--primary)" />
                Recommended Resources
              </h2>
              <ul className="mt-4 space-y-2.5">
                {roadmap.resources.map((resource) => (
                  <li key={resource} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-(--primary)">•</span>
                    {resource}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-(--primary)/20 bg-(--primary)/5 p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-(--primary)">
                <Lightbulb className="h-4.5 w-4.5" />
                AI Study Tips
              </h2>
              <ul className="mt-4 space-y-2.5">
                {roadmap.aiTips.map((tip) => (
                  <li key={tip} className="flex gap-2 text-sm text-gray-700">
                    <span className="text-(--primary)">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-6">
            <div className="sticky top-24 rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-sm">
              <p className="text-sm text-gray-500">Ready to make this your own learning goal?</p>
              <button
                onClick={handleStartRoadmap}
                disabled={isSessionPending}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-(--primary) px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-(--secondary) disabled:opacity-60"
              >
                Start This Roadmap
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-3 text-xs text-gray-400">
                {session?.user ? "We'll pre-fill Create Goal with this roadmap." : "You'll be asked to log in first."}
              </p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-gray-900">Related Roadmaps</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <RoadmapCard key={r._id} roadmap={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
