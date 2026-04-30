import Container from "@/components/Container";
import { Skeleton } from "@/components/skleton";
import { WindowControls } from "@/components/WindowControls";

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
          {/* Code Header using WindowControls with skeleton content */}
          <WindowControls />

          {/* Code Content Skeleton */}
          <div className="relative p-6 space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[95%]" />
            <Skeleton className="h-4 w-[88%]" />
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
