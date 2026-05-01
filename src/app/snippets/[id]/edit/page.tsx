import { db } from "@/db";
import { Button } from "@/components/Button";
import Container from "@/components/Container";
import { ArrowBackIcon } from "@/components/icons/ArrowBackIcon";
import { PageHeader } from "@/components/PageHeader";
import { EditIcon } from "@/components/icons/EditIcon";
import { EditSnippetForm } from "./EditSnippetForm";
import { editSnippet } from "./Actions";
import { notFound } from "next/navigation";

interface SnippetEditPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
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
        icon={<EditIcon className="w-6 h-6 text-white" />}
        title="Edit Snippet"
        subtitle={`Editing: ${snippet.title}`}
      />

      {/* Form Section */}
      <EditSnippetForm editSnippet={editSnippet} snippet={snippet} />
    </Container>
  );
}
