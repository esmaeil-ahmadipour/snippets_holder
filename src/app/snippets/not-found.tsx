import Link from "next/link";

export default function SnippetNotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-3xl py-16 text-center space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Snippet not found!
        </h1>
        <p className="text-sm text-muted-foreground">
          We couldn’t find the snippet you were looking for.
        </p>

        <div className="flex gap-4 justify-center pt-4">
          <Link
            href="/"
            className="px-4 py-2 border border-input bg-background rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Go back home
          </Link>
        </div>
      </div>
    </section>
  );
}
