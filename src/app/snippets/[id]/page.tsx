import { db } from "@/db";
import { notFound } from "next/navigation";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  const { id } = await props.params;

  const snippetId = Number(id);

  if (!Number.isSafeInteger(snippetId) || snippetId < 1) {
    notFound();
  }

  const snippet = await db.snippet.findUnique({
    where: { id: snippetId },
  });

  if (!snippet) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-3xl space-y-6 py-10">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          Snippet Details
        </h1>
        <p className="text-sm text-muted-foreground">
          Snippet ID: {snippet.id}
        </p>
      </header>

      <article className="rounded-lg border bg-background p-6">
        <pre className="overflow-x-auto text-sm">
          <code>{snippet.code}</code>
        </pre>
      </article>
    </section>
  );
}
