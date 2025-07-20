import { Skeleton } from "@/components/ui/skeleton";

export function SearchSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-3/5" />
        <Skeleton className="h-5 w-2/5" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <div className="p-4 border rounded-lg space-y-3">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <div className="p-4 border rounded-lg space-y-3">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </div>
  );
}
