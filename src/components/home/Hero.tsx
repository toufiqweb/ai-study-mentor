"use client";

import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import SectionContainer from "@/components/shared/SectionContainer";

const QUICK_CATEGORIES = ["All", ...CATEGORIES.slice(0, 6)];

export default function Hero() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e: SubmitEvent) => {
    e.preventDefault();
    const query = search.trim();
    router.push(query ? `/explore-roadmaps?search=${encodeURIComponent(query)}` : "/explore-roadmaps");
  };

  const handleCategoryClick = (category: string) => {
    router.push(
      category === "All" ? "/explore-roadmaps" : `/explore-roadmaps?category=${encodeURIComponent(category)}`
    );
  };

  return (
    <SectionContainer className="bg-white pt-20 pb-24 sm:pt-28 sm:pb-28" containerClassName="max-w-4xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-(--primary)/20 bg-(--primary)/5 px-4 py-1.5 text-sm font-medium text-(--primary)">
          <Sparkles className="h-4 w-4 text-(--ternary)" />
          AI-Powered Learning
        </span>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Discover <span className="text-(--ternary)">Personalized Study Plans</span>
          <br />
          built by your AI mentor
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          Generate a personalized study plan, track your progress, and get AI guidance every day —
          for any subject you want to learn.
        </p>

        <form onSubmit={handleSearch} className="mx-auto mt-10 max-w-xl">
          <div className="relative">
            <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search roadmaps, e.g. Web Development"
              className="h-14 w-full rounded-2xl border border-gray-200 bg-white pr-4 pl-12 text-sm shadow-sm transition-colors focus:border-(--primary) focus:ring-1 focus:ring-(--primary) focus:outline-none"
            />
          </div>
        </form>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {QUICK_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryClick(category)}
              className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-(--ternary)/30 hover:bg-white hover:text-(--ternary)"
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>
    </SectionContainer>
  );
}
