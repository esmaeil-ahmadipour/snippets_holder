import Container from "@/components/Container";
import { Skeleton } from "@/components/skleton";

export default function Loading() {
  return (
    <Container>
      {/* Back Navigation Skeleton */}
      <Skeleton className="h-8 w-32 rounded-lg mb-4" />

      {/* Header Skeleton */}
      <div className="space-y-4 pb-1">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-xl" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-8 w-64" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-12 h-0.5" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        </div>
      </div>

      {/* Delete Card Skeleton */}
      <div className="rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="border-b border-gray-100 dark:border-gray-800 bg-red-50/50 dark:bg-red-950/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="text-center space-y-3">
            <Skeleton className="w-16 h-16 rounded-full mx-auto" />
            <Skeleton className="h-6 w-64 mx-auto" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
        </div>
      </div>

      {/* Action Buttons Skeleton */}
      <div className="flex justify-end gap-3 mt-6">
        <Skeleton className="h-9 w-24 rounded-lg" />
        <Skeleton className="h-9 w-40 rounded-lg" />
      </div>
    </Container>
  );
}
