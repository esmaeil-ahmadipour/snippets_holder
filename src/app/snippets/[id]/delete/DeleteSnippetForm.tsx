"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/Button";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { Snippet } from "@/db/type-snippet";

interface DeleteSnippetFormProps {
  snippet: Snippet;
  deleteSnippet: (formData: FormData) => Promise<{ error?: string } | void>;
}

export function DeleteSnippetForm({
  snippet,
  deleteSnippet,
}: DeleteSnippetFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);

    startTransition(async () => {
      const result = await deleteSnippet(formData);
      if (result && "error" in result && result.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="id" value={snippet.id} />

      <div className="relative">
        {/* Show Errors */}
        {error && (
          <div className="m-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}
        <div className="relative rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="relative border-b border-gray-100 dark:border-gray-800 bg-red-50 dark:bg-red-950/20 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                <TrashIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Delete Snippet
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-6 space-y-4">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <TrashIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Are you absolutely sure?
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                This action cannot be undone. This will permanently delete the
                snippet
                <br />
                <span className="font-mono text-red-600 dark:text-red-400">
                  {snippet.title} 
                </span>
              </p>
            </div>

            {/* Additional Info */}
            <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-xs text-gray-500 dark:text-gray-400">
              <p>
                ⚠️ Warning: This will remove the snippet from your collection
                permanently.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
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
            variant="danger"
            icon={<TrashIcon />}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Yes, Delete Snippet"}
          </Button>
        </div>
      </div>
    </form>
  );
}
