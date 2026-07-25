import type { LucideIcon } from "lucide-react";

const accentClasses = {
  primary: "bg-(--primary)/10 text-(--primary) border-(--primary)/20",
  secondary: "bg-(--secondary)/10 text-(--secondary) border-(--secondary)/20",
  accent: "bg-(--ternary)/10 text-(--ternary) border-(--ternary)/20",
  neutral: "bg-(--surface-subtle) text-(--text-secondary) border-(--border-default)",
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
    <div className="flex items-start gap-4 rounded-2xl border border-(--border-subtle) bg-(--surface) p-6 shadow-sm">
      <div className={`rounded-xl border p-3 ${accentClasses[accent]}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-sm font-medium text-(--text-muted)">{label}</p>
        <p className="mt-0.5 text-2xl font-bold text-(--text-strong)">{value}</p>
        {sub && <p className="mt-1 text-xs text-(--text-subtle)">{sub}</p>}
      </div>
    </div>
  );
}
