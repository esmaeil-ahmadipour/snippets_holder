import { db } from "@/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CopyButton } from "@/app/snippets/[id]/CopyButton";
import { Button } from "@/components/Button";
import { EditIcon } from "@/components/icons/EditIcon";
import { TrashIcon } from "@/components/icons/TrashIcon";
import Container from "@/components/Container";
import { ArrowBackIcon } from "@/components/icons/ArrowBackIcon";
import { CodeIcon } from "@/components/icons/CodeIcon";
import { PageHeader } from "@/components/PageHeader";
import { WindowControls } from "@/components/WindowControls";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  await new Promise((r) => setTimeout(r, 2000)); // Simulate loading delay

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
    <Container>
      {/* Back Navigation */}
      <Button
        className="mb-4"
        href="/"
        variant="ghost"
        icon={<ArrowBackIcon />}
      >
        Back to snippets
      </Button>

      {/* Header Section */}
      <PageHeader
        className="pb-1"
        icon={<CodeIcon className="w-6 h-6 text-white" />}
        title={snippet.title}
        subtitle={`ID: ${snippet.id}`}
      />

      {/* Code Content Section */}
      <div className="relative">
        <div className="relative rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200 dark:hover:shadow-gray-800">
          {/* Code Header */}
          <WindowControls
            showTitle
            title="snippet.tsx"
            actions={<CopyButton code={snippet.code} />}
          />
          {/* Code Content */}
          <div className="relative p-6">
            <pre className="overflow-x-auto text-sm font-mono text-gray-700 dark:text-gray-300 leading-relaxed">
              <code className="block whitespace-pre-wrap">{snippet.code}</code>
            </pre>

            {/* Subtle fade for long content */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 pointer-events-none rounded-b-2xl" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            href={`/snippets/${snippet.id}/edit`}
            variant="secondary"
            icon={<EditIcon />}
          >
            Edit
          </Button>

          <Button
            href={`/snippets/${snippet.id}/delete`}
            variant="danger"
            icon={<TrashIcon />}
          >
            Delete
          </Button>
        </div>
      </div>
    </Container>
  );
}
