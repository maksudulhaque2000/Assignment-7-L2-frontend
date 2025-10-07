export function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="relative aspect-video bg-muted animate-pulse"></div>
      <div className="flex flex-col flex-grow p-5 md:p-6 space-y-4">
        <div className="h-6 w-3/4 bg-muted animate-pulse rounded"></div>
        <div className="space-y-2 flex-grow">
          <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
          <div className="h-4 w-2/3 bg-muted animate-pulse rounded"></div>
        </div>
        <div className="h-4 w-1/2 bg-muted animate-pulse rounded pt-2"></div>
        <div className="flex gap-3 pt-4 mt-auto">
          <div className="h-9 w-24 bg-muted animate-pulse rounded-full"></div>
          <div className="h-9 w-24 bg-muted animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
}