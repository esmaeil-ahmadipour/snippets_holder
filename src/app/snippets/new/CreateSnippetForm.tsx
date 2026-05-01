"use client";

import { useTransition, useState } from "react";
import { Button } from "@/components/Button";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { WindowControls } from "@/components/WindowControls";

interface CreateSnippetFormProps {
  createSnippet: (formData: FormData) => Promise<{ error?: string } | void>;
}

export function CreateSnippetForm({ createSnippet }: CreateSnippetFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await createSnippet(formData);

      if (
        result &&
        typeof result === "object" &&
        "error" in result &&
        result.error
      ) {
        setError(result.error);
      }
    });
  }

  return (
    <form action={handleSubmit}>
      <div className="relative">
        {/* نمایش خطا */}
        {error && (
          <div className="p-3 m-2 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}
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
              disabled={isPending}
            />

            <Textarea
              label="Code"
              id="code"
              name="code"
              rows={10}
              placeholder="// Paste your code here...\nconst greeting = 'Hello World';\nconsole.log(greeting);"
              hint="Paste or write your code snippet here"
              required
              disabled={isPending}
            />
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
