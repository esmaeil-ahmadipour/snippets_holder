import { db } from "@/db";

export default async function Home() {
  const snippets = await db.snippet.findMany();
  const renderedSnippets = snippets.map((snippet) => (
    <div key={snippet.id} className="border p-4 rounded mb-4">
      <h2 className="font-bold text-lg">{snippet.title}</h2>
      <pre className="bg-white p-2 rounded mt-2 text-black">{snippet.code}</pre>
    </div>
  ));

  return (
    <main>
      <h1>Your Snippets</h1>
      {renderedSnippets}
    </main>
  );
}
