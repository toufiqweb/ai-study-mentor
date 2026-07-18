"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ChevronLeft, ChevronRight, Compass, Loader2 } from "lucide-react";
import { getRoadmaps, type RoadmapSummary, type RoadmapSort } from "@/lib/api/roadmaps";
import { CATEGORIES, SKILL_LEVELS } from "@/lib/constants";
import RoadmapCard from "@/components/shared/RoadmapCard";
import RoadmapCardSkeleton from "@/components/shared/RoadmapCardSkeleton";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionTitle from "@/components/shared/SectionTitle";
import SectionDescription from "@/components/shared/SectionDescription";
import CTA from "@/components/home/CTA";

const DURATION_OPTIONS = [
  { value: "any", label: "Any Duration" },
  { value: "4", label: "Up to 4 weeks" },
  { value: "8", label: "Up to 8 weeks" },
  { value: "12", label: "Up to 12 weeks" },
  { value: "16", label: "Up to 16 weeks" },
];

const SORT_OPTIONS: { value: RoadmapSort; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Most Popular" },
  { value: "rating", label: "Highest Rated" },
  { value: "duration", label: "Duration: Shortest First" },
];

export default function ExploreRoadmapsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-(--ternary)" />
        </div>
      }
    >
      <ExploreRoadmapsContent />
    </Suspense>
  );
}

function ExploreRoadmapsContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") ?? "";
  const initialCategory = searchParams.get("category") ?? "all";

  const [searchInput, setSearchInput] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [difficulty, setDifficulty] = useState("all");
  const [duration, setDuration] = useState("any");
  const [sort, setSort] = useState<RoadmapSort>("latest");
  const [page, setPage] = useState(1);

  const [items, setItems] = useState<RoadmapSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchInput), 300);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    let cancelled = false;

    getRoadmaps({
      search: debouncedSearch || undefined,
      category: category !== "all" ? category : undefined,
      difficulty: difficulty !== "all" ? difficulty : undefined,
      duration: duration !== "any" ? Number(duration) : undefined,
      sort,
      page,
    })
      .then((result) => {
        if (cancelled) return;
        setItems(result.items);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      })
      .catch((err) => {
        if (!cancelled) setErrorMsg(err instanceof Error ? err.message : "Failed to load roadmaps.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, category, difficulty, duration, sort, page]);

  const handleFilterChange = (setter: (value: string) => void) => (value: string) => {
    setter(value);
    setPage(1);
    setIsLoading(true);
    setErrorMsg("");
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
    setIsLoading(true);
    setErrorMsg("");
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    setIsLoading(true);
  };

  return (
    <div>
      <SectionContainer className="bg-gray-50 py-20" containerClassName="max-w-6xl text-center">
        <SectionTitle as="h1" eyebrow="Explore Roadmaps">
          Find your next learning path
        </SectionTitle>
        <SectionDescription className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Browse AI-crafted roadmaps across every subject, then personalize one into your own learning goal.
        </SectionDescription>

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="relative">
            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search roadmaps by title..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white py-1.5 pr-4 pl-11 text-sm shadow-sm focus:border-(--primary) focus:ring-1 focus:ring-(--primary) focus:outline-none"
            />
          </div>

          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <select
              value={category}
              onChange={(e) => handleFilterChange(setCategory)(e.target.value)}
              className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm shadow-sm focus:border-(--primary) focus:ring-1 focus:ring-(--primary) focus:outline-none"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={difficulty}
              onChange={(e) => handleFilterChange(setDifficulty)(e.target.value)}
              className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm shadow-sm focus:border-(--primary) focus:ring-1 focus:ring-(--primary) focus:outline-none"
            >
              <option value="all">All Difficulties</option>
              {SKILL_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            <select
              value={duration}
              onChange={(e) => handleFilterChange(setDuration)(e.target.value)}
              className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm shadow-sm focus:border-(--primary) focus:ring-1 focus:ring-(--primary) focus:outline-none"
            >
              {DURATION_OPTIONS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => handleFilterChange((v) => setSort(v as RoadmapSort))(e.target.value)}
              className="h-10 rounded-xl border border-gray-200 bg-white px-3 text-sm shadow-sm focus:border-(--primary) focus:ring-1 focus:ring-(--primary) focus:outline-none"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  Sort: {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </SectionContainer>

      <section className="bg-white py-20">
        <div className="container mx-auto max-w-6xl px-4">
          {errorMsg && (
            <div className="mb-8 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {errorMsg}
            </div>
          )}

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <RoadmapCardSkeleton key={i} />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-gray-50 py-20 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <Compass className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-base font-bold text-gray-900">No roadmaps found</h3>
              <p className="mt-1 max-w-sm text-sm text-gray-500">
                Try a different search term, category, or filter combination.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((roadmap) => (
                  <RoadmapCard key={roadmap._id} roadmap={roadmap} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row">
                  <p className="text-sm text-gray-500">
                    Showing {(page - 1) * items.length + 1}–{(page - 1) * items.length + items.length} of {total}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="rounded-xl border border-gray-200 p-2 disabled:opacity-40"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
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
                      onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="rounded-xl border border-gray-200 p-2 disabled:opacity-40"
                      aria-label="Next page"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <CTA />
    </div>
  );
}
