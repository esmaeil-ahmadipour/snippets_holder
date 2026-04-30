import Container from "@/components/Container";
import { ArrowBackIcon } from "@/components/icons/ArrowBackIcon";
import { Button } from "@/components/Button";
import { PageHeader } from "@/components/PageHeader";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { CreateSnippetForm } from "./CreateSnippetForm";
import { createSnippet } from "./Actions";

export default function SnippetCreatePage() {
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
        icon={<PlusIcon className="w-6 h-6 text-white" />}
        title="Create New Snippet"
        subtitle="Add your code snippet"
      />

      {/* Form Section */}
      <CreateSnippetForm createSnippet={createSnippet} />
    </Container>
  );
}
