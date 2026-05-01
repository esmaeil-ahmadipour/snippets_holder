"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/Button";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { Input } from "@/components/Input";
import { WindowControls } from "@/components/WindowControls";
import SnippetEditor from "@/components/SnippetEditor";

interface CreateSnippetFormProps {
  createSnippet: (formData: FormData) => Promise<{ error?: string } | void>;
}

export function CreateSnippetForm({ createSnippet }: CreateSnippetFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");

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
      formData.set("title", title);
      formData.set("code", code);

      const result = await createSnippet(formData);
      if (result && "error" in result && result.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form action={handleSubmit}>
      <div className="relative">
        <div className="relative rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300">
          <WindowControls />

          <div className="relative p-6 space-y-6">
            {/* Show Errors */}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            {/*   Title */}
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

            {/*   Code with Monaco Editor */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Code
              </label>
              <SnippetEditor onChange={(value) => setCode(value || "")} />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Write or paste your code snippet here
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}

        <div className="flex justify-end gap-3 mt-6">
          <Button
            href="/"
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
            {isPending ? "Creating..." : "Create Snippet"}
          </Button>
        </div>
      </div>
    </form>
  );
}
