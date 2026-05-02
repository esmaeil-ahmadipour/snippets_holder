import { db } from "@/db";
import Container from "@/components/Container";
import { Button } from "@/components/Button";
import { PlusIcon } from "@/components/icons/PlusIcon";
import SnippetCard from "./snippets/SnippetCard";
import { Snippet } from "@/db/type-snippet";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  return (
    <Container>
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Your Snippets
        </h1>
        <Button
          href="/snippets/new"
          variant="primary"
          size="md"
          icon={<PlusIcon />}
        >
          Add Snippet
        </Button>
      </div>

      {/* Snippets List */}
      <div className="space-y-4">
        {snippets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No snippets yet. Create your first snippet!
            </p>
            <Button href="/snippets/new" variant="primary" icon={<PlusIcon />}>
              Create Your First Snippet
            </Button>
          </div>
        ) : (
          snippets.map((snippet: Snippet) => (
            <SnippetCard
              key={snippet.id}
              id={snippet.id}
              title={snippet.title}
            />
          ))
        )}
      </div>
    </Container>
  );
}
