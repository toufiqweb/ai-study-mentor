import type { TooltipContentProps } from "recharts";

export default function ChartTooltip({ active, payload, label }: TooltipContentProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-lg">
      {label && <p className="text-xs font-semibold text-gray-500">{label}</p>}
      {payload.map((item) => (
        <p key={String(item.dataKey)} className="text-sm font-bold text-gray-900">
          {item.name}: {item.value}
        </p>
      ))}
    </div>
  );
}
