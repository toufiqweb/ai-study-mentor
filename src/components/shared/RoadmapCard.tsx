import Link from "next/link";
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

const difficultyStyles = {
  Beginner: "bg-(--ternary)/10 text-(--ternary)",
  Intermediate: "bg-(--secondary)/10 text-(--secondary)",
  Advanced: "bg-(--primary)/10 text-(--primary)",
} as const;

export default function RoadmapCard({ roadmap }: { roadmap: RoadmapSummary }) {
  const Icon = categoryIcons[roadmap.category] ?? Sparkles;

  return (
    <div className="flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-28 items-center justify-center rounded-2xl bg-gradient-to-br from-(--ternary)/10 to-(--secondary)/10">
        <Icon className="h-10 w-10 text-(--ternary)" />
      </div>

      <div className="mt-4 flex items-start justify-between gap-2">
        <p className="text-xs font-semibold text-gray-400">{roadmap.category}</p>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${difficultyStyles[roadmap.difficulty]}`}>
          {roadmap.difficulty}
        </span>
      </div>

      <h3 className="mt-1 text-base font-bold text-gray-900">{roadmap.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">{roadmap.shortDescription}</p>

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
        className="mt-5 rounded-xl bg-gray-50 px-4 py-2.5 text-center text-sm font-bold text-gray-700 transition-colors hover:bg-gray-100"
      >
        View Details
      </Link>
    </div>
  );
}
