"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Users,
  Clock,
  X,
  ArrowRight,
  Code2,
  BrainCog,
  Languages,
  Sigma,
  Palette,
  Briefcase,
  GraduationCap,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";
import { roadmapTemplates, type RoadmapTemplate } from "@/lib/mock/roadmaps";
import { CATEGORIES } from "@/lib/constants";
import CTA from "@/components/home/CTA";

const categoryIcons: Record<string, LucideIcon> = {
  "Programming & Web Dev": Code2,
  "Data Science & AI": BrainCog,
  Languages: Languages,
  Mathematics: Sigma,
  Design: Palette,
  "Business & Finance": Briefcase,
  "Test Prep": GraduationCap,
  Science: FlaskConical,
};

const levelStyles = {
  Beginner: "bg-(--ternary)/10 text-(--ternary)",
  Intermediate: "bg-(--secondary)/10 text-(--secondary)",
  Advanced: "bg-(--primary)/10 text-(--primary)",
} as const;

export default function ExploreRoadmapsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<RoadmapTemplate | null>(null);

  const filtered = useMemo(() => {
    return roadmapTemplates.filter((r) => {
      const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || r.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div>
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <p className="text-sm font-bold tracking-widest text-(--primary) uppercase">
            Explore Roadmaps
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Find your next learning path
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Browse AI-crafted roadmaps across every subject, then personalize one into your own
            learning goal.
          </p>

          <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search roadmaps..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-white py-1.5 pr-4 pl-11 text-sm shadow-sm focus:border-(--primary) focus:ring-1 focus:ring-(--primary) focus:outline-none"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 rounded-xl border border-gray-200 bg-white px-3 text-sm shadow-sm focus:border-(--primary) focus:ring-1 focus:ring-(--primary) focus:outline-none"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-gray-50 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <Search className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-base font-bold text-gray-900">No roadmaps found</h3>
              <p className="mt-1 max-w-sm text-sm text-gray-500">
                Try a different search term or browse all categories.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((roadmap) => {
                const Icon = categoryIcons[roadmap.category] ?? Code2;
                return (
                  <div
                    key={roadmap.id}
                    className="flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="rounded-2xl bg-(--primary)/10 p-3">
                        <Icon className="h-5 w-5 text-(--primary)" />
                      </div>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${levelStyles[roadmap.level]}`}>
                        {roadmap.level}
                      </span>
                    </div>

                    <h3 className="mt-4 text-base font-bold text-gray-900">{roadmap.title}</h3>
                    <p className="mt-1 text-xs font-semibold text-gray-400">{roadmap.category}</p>
                    <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">{roadmap.description}</p>

                    <div className="mt-5 flex items-center gap-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {roadmap.durationWeeks} weeks
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        {roadmap.learners.toLocaleString()} learners
                      </span>
                    </div>

                    <button
                      onClick={() => setSelected(roadmap)}
                      className="mt-5 rounded-xl bg-gray-50 px-4 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      Preview Roadmap
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CTA />

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${levelStyles[selected.level]}`}>
                  {selected.level}
                </span>
                <h3 className="mt-3 text-xl font-bold text-gray-900">{selected.title}</h3>
                <p className="mt-1 text-xs font-semibold text-gray-400">{selected.category}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-600">{selected.description}</p>

            <ol className="mt-6 space-y-3">
              {selected.phases.map((phase, i) => (
                <li key={phase.title} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--primary)/10 text-xs font-bold text-(--primary)">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{phase.title}</p>
                    <p className="text-sm text-gray-600">{phase.focus}</p>
                  </div>
                </li>
              ))}
            </ol>

            <Link
              href="/register"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-(--primary) px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-(--secondary)"
            >
              Start This Roadmap
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
