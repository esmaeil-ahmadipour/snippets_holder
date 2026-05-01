"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/Button";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { Input } from "@/components/Input";
import { WindowControls } from "@/components/WindowControls";
import SnippetEditor from "@/components/SnippetEditor";
import { Snippet } from "@prisma/client";

interface EditSnippetFormProps {
  snippet: Snippet;
  editSnippet: (formData: FormData) => Promise<{ error?: string } | void>;
}

export function EditSnippetForm({
  editSnippet,
  snippet,
}: EditSnippetFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState(snippet?.title || "");
  const [code, setCode] = useState(snippet?.code || "");

  async function handleSubmit(formData: FormData) {
    setError(null);

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!code.trim()) {
      setError("Code is required");
      return;
    }

    startTransition(async () => {
      formData.append("id", snippet.id.toString());
      formData.set("title", title);
      formData.set("code", code);

      const result = await editSnippet(formData);
      if (result && "error" in result && result.error) {
        setError(result.error);
      }
    });
  }

  if (!snippet) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <form action={handleSubmit}>
      <div className="relative">
        <div className="relative rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300">
          <WindowControls />

          <div className="relative p-6 space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <Input
              label="Title"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., React useEffect Hook"
              hint="Give your snippet a descriptive title"
              required
              disabled={isPending}
            />

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Code
              </label>
              <SnippetEditor
                snippet={snippet}
                onChange={(value) => setCode(value || "")}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Edit your code snippet here
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button
            href={`/snippets/${snippet.id}`}
            variant="secondary"
            icon={<CloseIcon />}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            icon={<CheckIcon />}
            disabled={isPending}
          >
            {isPending ? "Editing..." : "Edit Snippet"}
          </Button>
        </div>
      </div>
    </form>
  );
}
