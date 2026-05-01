import { db } from "@/db";
import { Button } from "@/components/Button";
import Container from "@/components/Container";
import { ArrowBackIcon } from "@/components/icons/ArrowBackIcon";
import { PageHeader } from "@/components/PageHeader";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { DeleteSnippetForm } from "./DeleteSnippetForm";
import { deleteSnippet } from "./actions";
import { notFound } from "next/navigation";

interface SnippetDeletePageProps {
  params: {
    id: string;
  };
}

export default async function SnippetDeletePage(props: SnippetDeletePageProps) {
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
        href={`/snippets/${snippet.id}`}
        variant="ghost"
        icon={<ArrowBackIcon />}
      >
        Back to snippet
      </Button>

      {/* Header Section */}
      <PageHeader
        icon={<TrashIcon className="w-6 h-6 text-white" />}
        title="Delete Snippet"
        subtitle="Permanently remove this snippet"
        iconGradient="from-red-500 to-pink-500"
        underlineGradient="from-red-500 to-pink-500"
      />

      {/* Delete Form Section */}
      <DeleteSnippetForm deleteSnippet={deleteSnippet} snippet={snippet} />
    </Container>
  );
}
