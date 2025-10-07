export function BlogCardSkeleton() {
  return (
    <div className="border rounded-lg p-6 animate-pulse">
      <div className="h-6 w-3/4 bg-muted rounded mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-muted rounded"></div>
        <div className="h-4 w-full bg-muted rounded"></div>
        <div className="h-4 w-5/6 bg-muted rounded"></div>
      </div>
      <div className="h-4 w-1/4 bg-muted rounded mt-6"></div>
    </div>
  );
}
