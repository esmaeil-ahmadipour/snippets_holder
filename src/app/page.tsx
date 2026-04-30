import { db } from "@/db";
import Container from "@/components/Container";
import SnippetCard from "./snippets/SnippetCard";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  return (
    <Container>
      <h1 className="text-2xl font-semibold mb-6">Your Snippets</h1>
      <div className="space-y-4">
        {snippets.map((snippet) => (
          <SnippetCard key={snippet.id} id={snippet.id} title={snippet.title} />
        ))}
      </div>
    </Container>
  );
}
