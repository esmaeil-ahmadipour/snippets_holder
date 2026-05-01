"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/Button";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { WindowControls } from "@/components/WindowControls";
import { Snippet } from "@prisma/client";

interface EditSnippetFormProps {
  snippet: Snippet;
  editSnippet: (formData: FormData) => Promise<void>;
}

export function EditSnippetForm({
  editSnippet,
  snippet,
}: EditSnippetFormProps) {
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(snippet?.title || "");
  const [code, setCode] = useState(snippet?.code || "");

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      formData.append("id", snippet.id.toString());
      await editSnippet(formData);
    });
  }

  if (!snippet) {
    return <div>Loading...</div>;
  }

  return (
    <form action={handleSubmit}>
      <div className="relative">
        <div className="relative rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300">
          <WindowControls />

          <div className="relative p-6 space-y-6">
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

            <Textarea
              label="Code"
              id="code"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              rows={10}
              placeholder="// Paste your code here..."
              hint="Paste or write your code snippet here"
              required
              disabled={isPending}
            />
          </div>
        </div>

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
            {isPending ? "Editing..." : "Edit Snippet"}
          </Button>
        </div>
      </div>
    </form>
  );
}
