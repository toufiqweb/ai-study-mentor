"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Compass,
  Loader2,
} from "lucide-react";
import { getRoadmaps, type RoadmapSort } from "@/lib/api/roadmaps";
import { CATEGORIES, SKILL_LEVELS } from "@/lib/constants";
import RoadmapCard from "@/components/shared/RoadmapCard";
import RoadmapCardSkeleton from "@/components/shared/RoadmapCardSkeleton";
import SectionContainer from "@/components/shared/SectionContainer";
import SectionTitle from "@/components/shared/SectionTitle";
import SectionDescription from "@/components/shared/SectionDescription";

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

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(searchInput), 300);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "roadmaps",
      { search: debouncedSearch, category, difficulty, duration, sort, page, limit: 8 },
    ],
    queryFn: () =>
      getRoadmaps({
        search: debouncedSearch || undefined,
        category: category !== "all" ? category : undefined,
        difficulty: difficulty !== "all" ? difficulty : undefined,
        duration: duration !== "any" ? Number(duration) : undefined,
        sort,
        page,
        limit: 8,
      }),
    enabled: typeof window !== "undefined",
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const errorMsg = error instanceof Error ? error.message : "";

  const handleFilterChange =
    (setter: (value: string) => void) => (value: string) => {
      setter(value);
      setPage(1);
    };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  return (
    <div>
      <SectionContainer
        className="bg-(--background) py-20 border-b border-(--card-border) transition-colors duration-300"
        containerClassName="max-w-6xl text-center"
      >
        <SectionTitle as="h1" eyebrow="Explore Roadmaps" eyebrowClassName="text-(--secondary)">
          Find your next learning path
        </SectionTitle>
        <SectionDescription className="mx-auto mt-4 max-w-2xl text-lg text-(--secondary)">
          Browse AI-crafted roadmaps across every subject, then personalize one
          into your own learning goal.
        </SectionDescription>

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="relative">
            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-(--secondary)" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search roadmaps by title..."
              className="h-11 w-full rounded-xl border border-(--card-border) bg-(--card-bg) py-1.5 pr-4 pl-11 text-sm text-(--foreground) shadow-sm focus:border-(--ternary) focus:ring-1 focus:ring-(--ternary) focus:outline-none"
            />
          </div>

          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <select
              value={category}
              onChange={(e) => handleFilterChange(setCategory)(e.target.value)}
              className="h-10 rounded-xl border border-(--card-border) bg-(--card-bg) px-3 text-sm text-(--foreground) shadow-sm focus:border-(--ternary) focus:ring-1 focus:ring-(--ternary) focus:outline-none"
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
              onChange={(e) =>
                handleFilterChange(setDifficulty)(e.target.value)
              }
              className="h-10 rounded-xl border border-(--card-border) bg-(--card-bg) px-3 text-sm text-(--foreground) shadow-sm focus:border-(--ternary) focus:ring-1 focus:ring-(--ternary) focus:outline-none"
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
              className="h-10 rounded-xl border border-(--card-border) bg-(--card-bg) px-3 text-sm text-(--foreground) shadow-sm focus:border-(--ternary) focus:ring-1 focus:ring-(--ternary) focus:outline-none"
            >
              {DURATION_OPTIONS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) =>
                handleFilterChange((v) => setSort(v as RoadmapSort))(
                  e.target.value,
                )
              }
              className="h-10 rounded-xl border border-(--card-border) bg-(--card-bg) px-3 text-sm text-(--foreground) shadow-sm focus:border-(--ternary) focus:ring-1 focus:ring-(--ternary) focus:outline-none"
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

      <section className="bg-(--background) py-20 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl px-4">
          {errorMsg && (
            <div className="mb-8 rounded-xl border border-(--error-border) bg-(--error-subtle) px-4 py-3 text-sm font-medium text-(--error-strong)">
              {errorMsg}
            </div>
          )}

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <RoadmapCardSkeleton key={i} />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-(--card-border) bg-(--card-bg) py-20 text-center transition-colors duration-300">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-(--card-border)/50 text-(--secondary)">
                <Compass className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-base font-bold text-(--primary)">
                No roadmaps found
              </h3>
              <p className="mt-1 max-w-sm text-sm text-(--secondary)">
                Try a different search term, category, or filter combination.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((roadmap) => (
                  <RoadmapCard key={roadmap._id} roadmap={roadmap} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-(--card-border) pt-6 sm:flex-row">
                  <p className="text-sm text-(--secondary)">
                    Showing {(page - 1) * items.length + 1}–
                    {(page - 1) * items.length + items.length} of {total}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="rounded-xl border border-(--card-border) p-2 text-(--foreground) disabled:opacity-40 cursor-pointer"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`h-9 w-9 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                          page === i + 1
                            ? "border-(--action-bg) bg-(--action-bg) text-(--action-text) shadow-sm"
                            : "border-(--card-border) text-(--secondary) hover:bg-(--card-border)"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, page + 1))
                      }
                      disabled={page === totalPages}
                      className="rounded-xl border border-(--card-border) p-2 text-(--foreground) disabled:opacity-40 cursor-pointer"
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
    </div>
  );
}
