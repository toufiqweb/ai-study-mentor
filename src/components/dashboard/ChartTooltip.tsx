import type { TooltipContentProps } from "recharts";

export default function ChartTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-(--border-subtle) bg-(--surface) px-4 py-3 shadow-lg">
      {label && <p className="text-xs font-semibold text-(--text-muted)">{label}</p>}
      {payload.map((item) => (
        <p key={String(item.dataKey)} className="text-sm font-bold text-(--text-strong)">
          {item.name}: {item.value}
        </p>
      ))}
    </div>
  );
}
