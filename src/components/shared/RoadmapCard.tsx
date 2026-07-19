import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Users,
  Star,
  Sparkles,
  Code2,
  Smartphone,
  Database,
  BrainCog,
  Palette,
  Brush,
  Languages,
  Mic,
  FlaskConical,
  Cpu,
  Megaphone,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import type { RoadmapSummary } from "@/lib/api/roadmaps";

export const categoryIcons: Record<string, LucideIcon> = {
  "Web Development": Code2,
  "Mobile App Development": Smartphone,
  "Data Science": Database,
  "Artificial Intelligence": BrainCog,
  "UI/UX Design": Palette,
  "Graphic Design": Brush,
  "IELTS Preparation": Languages,
  "Spoken English": Mic,
  "HSC Science": FlaskConical,
  "HSC ICT": Cpu,
  "Digital Marketing": Megaphone,
  "Cyber Security": ShieldCheck,
};

export const categoryImages: Record<string, string> = {
  "Web Development":
    "https://i.pinimg.com/1200x/52/19/d9/5219d9b3f4606ed553479e91b2b9b8d2.jpg",
  "Mobile App Development":
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&auto=format&fit=crop&q=60",
  "Data Science":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60",
  "Artificial Intelligence":
    "https://i.pinimg.com/736x/5d/3e/0e/5d3e0ec0dd6cdd5a3e41d470245b0c86.jpg",
  "UI/UX Design":
    "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=500&auto=format&fit=crop&q=60",
  "Graphic Design":
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&auto=format&fit=crop&q=60",
  "IELTS Preparation":
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=60",
  "Spoken English":
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&auto=format&fit=crop&q=60",
  "HSC Science":
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&auto=format&fit=crop&q=60",
  "HSC ICT":
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60",
  "Digital Marketing":
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60",
  "Cyber Security":
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=60",
};

const difficultyStyles = {
  Beginner: "bg-(--ternary)/10 text-(--ternary)",
  Intermediate: "bg-(--secondary)/10 text-(--secondary)",
  Advanced: "bg-(--primary)/10 text-(--primary)",
} as const;

export default function RoadmapCard({ roadmap }: { roadmap: RoadmapSummary }) {
  const Icon = categoryIcons[roadmap.category] ?? Sparkles;

  return (
    <div className="flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-40 w-full overflow-hidden rounded-2xl">
        <Image
          src={
            categoryImages[roadmap.category] ??
            "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&auto=format&fit=crop&q=60"
          }
          alt={roadmap.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-xs p-1.5 shadow-xs">
          <Icon className="h-5 w-5 text-(--ternary)" />
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-2">
        <p className="text-xs font-semibold text-gray-400">
          {roadmap.category}
        </p>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${difficultyStyles[roadmap.difficulty]}`}
        >
          {roadmap.difficulty}
        </span>
      </div>

      <h3 className="mt-1 text-base font-bold text-gray-900">
        {roadmap.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">
        {roadmap.shortDescription}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {roadmap.durationWeeks} weeks
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          {roadmap.totalLearners.toLocaleString()} learners
        </span>
        <span className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {roadmap.rating.toFixed(1)}
        </span>
      </div>

      <p className="mt-2 text-xs text-gray-400">By {roadmap.createdBy}</p>

      <Link
        href={`/explore-roadmaps/${roadmap._id}`}
        className="mt-5 rounded-xl bg-(--ternary) px-4 py-2.5 text-center text-sm font-bold text-white transition-opacity hover:opacity-90"
      >
        View Details
      </Link>
    </div>
  );
}
