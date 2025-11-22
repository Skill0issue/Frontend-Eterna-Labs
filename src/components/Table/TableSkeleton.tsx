"use client";

export function TableSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="grid grid-cols-[220px_110px_130px_110px_110px_150px_100px] gap-3 px-4 py-3 border-b border-white/5">
        <div className="w-20 h-4 rounded bg-white/10" />
        <div className="w-12 h-4 rounded bg-white/10" />
        <div className="h-4 rounded w-14 bg-white/10" />
        <div className="w-16 h-4 rounded bg-white/10" />
        <div className="h-4 rounded w-14 bg-white/10" />
        <div className="w-20 h-4 rounded bg-white/10" />
        <div className="w-10 h-4 rounded bg-white/10" />
      </div>

      {/* Rows */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[220px_110px_130px_110px_110px_150px_100px] gap-3 px-4 py-4 items-center border-b border-white/5"
        >
          {/* Token */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10" />
            <div className="flex flex-col gap-1">
              <div className="w-24 h-3 rounded bg-white/10" />
              <div className="h-3 rounded w-14 bg-white/5" />
            </div>
          </div>

          {/* Price */}
          <div className="w-12 h-3 rounded bg-white/10" />

          {/* Change */}
          <div className="w-10 h-3 rounded bg-white/10" />

          {/* Liquidity */}
          <div className="w-16 h-3 rounded bg-white/10" />

          {/* Volume */}
          <div className="w-16 h-3 rounded bg-white/10" />

          {/* Holders */}
          <div className="flex flex-col gap-1">
            <div className="w-16 h-3 rounded bg-white/10" />
            <div className="w-10 h-3 rounded bg-white/5" />
          </div>

          {/* Chart skeleton */}
          <div className="w-full h-8 rounded bg-white/10" />
        </div>
      ))}
    </div>
  );
}
