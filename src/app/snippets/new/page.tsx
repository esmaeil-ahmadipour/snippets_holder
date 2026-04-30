import { db } from "@/db";
import { redirect } from "next/navigation";
import Container from "@/components/Container";
import { ArrowBackIcon } from "@/components/icons/ArrowBackIcon";
import { Button } from "@/components/Button";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { WindowControls } from "@/components/WindowControls";
import { PageHeader } from "@/components/PageHeader";
import { PlusIcon } from "@/components/icons/PlusIcon";

export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    console.log(`Snippet created: ${snippet.id} - ${snippet.title}`);
    redirect("/");
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
        icon={<PlusIcon className="w-6 h-6 text-white" />}
        title="Create New Snippet"
        subtitle="Add your code snippet"
      />

      {/* Form Section */}
      <form action={createSnippet}>
        <div className="relative">
          <div className="relative rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300">
            {/* Form Header */}
            <WindowControls />

            {/* Form Content */}
            <div className="relative p-6 space-y-6">
              <Input
                label="Title"
                id="title"
                name="title"
                placeholder="e.g., React useEffect Hook"
                hint="Give your snippet a descriptive title"
                required
              />

              <Textarea
                label="Code"
                id="code"
                name="code"
                rows={10}
                placeholder="// Paste your code here...\nconst greeting = 'Hello World';\nconsole.log(greeting);"
                hint="Paste or write your code snippet here"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <Button href="/" variant="secondary" icon={<CloseIcon />}>
              Cancel
            </Button>

            <Button type="submit" variant="primary" icon={<CheckIcon />}>
              Create Snippet
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
}
