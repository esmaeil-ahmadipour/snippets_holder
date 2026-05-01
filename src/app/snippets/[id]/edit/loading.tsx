import Container from "@/components/Container";
import { Skeleton } from "@/components/skleton";

export default function Loading() {
  return (
    <Container>
      {/* Back Navigation Skeleton */}
      <Skeleton className="h-8 w-32 rounded-lg mb-4" />

      {/* Header Section Skeleton */}
      <div className="space-y-4 pb-1">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-xl" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-8 w-2/3" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-12 h-0.5" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Code Content Section Skeleton */}
      <div className="relative">
        <div className="relative rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden">
          {/* Code Header Skeleton */}
          <div className="relative border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                <div className="w-3 h-3 rounded-full bg-green-500/20" />
              </div>
              <Skeleton className="h-4 w-32 ml-2" />
            </div>
            <Skeleton className="h-6 w-20 rounded-md" />
          </div>

          {/* Code Content Skeleton */}
          <div className="relative p-6 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[88%]" />
            <Skeleton className="h-4 w-[92%]" />
            <Skeleton className="h-4 w-[85%]" />
            <Skeleton className="h-4 w-[78%]" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[82%]" />
            <Skeleton className="h-4 w-[88%]" />
            <Skeleton className="h-4 w-[94%]" />
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex justify-end gap-3 mt-6">
          <Skeleton className="h-9 w-20 rounded-lg" />
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
      </div>
    </Container>
  );
}
