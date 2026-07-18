export default function RoadmapCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="h-28 animate-pulse rounded-2xl bg-gray-100" />
      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
        <div className="h-5 w-16 animate-pulse rounded-full bg-gray-100" />
      </div>
      <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-gray-100" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-gray-100" />
      </div>
      <div className="mt-4 h-3 w-2/3 animate-pulse rounded bg-gray-100" />
      <div className="mt-5 h-10 w-full animate-pulse rounded-xl bg-gray-100" />
    </div>
  );
}
