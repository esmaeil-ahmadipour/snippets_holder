import { db } from "@/db";
import { redirect } from "next/navigation";

export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    // This need to be a server action!
    "use server";
    // Check the user's input and make sure they're valid
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    // Create a new record in the database
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    // Log on succeed
    console.log(`snippet::${snippet.id}`);
    console.log(`snippet::${snippet.title}`);
    console.log(`snippet::${snippet.code}`);

    // Redirect to the root page
    redirect("/");
  }
  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <label htmlFor="title" className="w-12">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="code" className="w-12">
            Code
          </label>
          <textarea
            id="code"
            name="code"
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 p-2 rounded hover:bg-blue-700 transition"
        >
          Create Snippet
        </button>
      </div>
    </form>
  );
}
