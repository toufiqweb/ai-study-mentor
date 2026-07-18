import type { LucideIcon } from "lucide-react";

const accentClasses = {
  primary: "bg-(--primary)/10 text-(--primary) border-(--primary)/20",
  secondary: "bg-(--secondary)/10 text-(--secondary) border-(--secondary)/20",
  accent: "bg-(--ternary)/10 text-(--ternary) border-(--ternary)/20",
  neutral: "bg-gray-100 text-gray-600 border-gray-200",
} as const;

export default function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent = "primary",
}: {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  accent?: keyof typeof accentClasses;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className={`rounded-xl border p-3 ${accentClasses[accent]}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-0.5 text-2xl font-bold text-gray-900">{value}</p>
        {sub && <p className="mt-1 text-xs text-gray-400">{sub}</p>}
      </div>
    </div>
  );
}
