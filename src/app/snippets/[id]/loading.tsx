import { Skeleton } from "@/components/skleton";

export default function SnippetSkeleton() {
  return (
    <section className="mx-auto max-w-3xl space-y-6 py-10 animate-pulse">
      <header className="space-y-2">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-24" />
      </header>

      <article className="rounded-lg border bg-background p-6 space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
      </article>
    </section>
  );
}
