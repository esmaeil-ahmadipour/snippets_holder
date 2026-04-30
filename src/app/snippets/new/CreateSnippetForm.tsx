"use client";

import { useTransition } from "react";
import { Button } from "@/components/Button";
import { CheckIcon } from "@/components/icons/CheckIcon";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { WindowControls } from "@/components/WindowControls";

interface CreateSnippetFormProps {
  createSnippet: (formData: FormData) => Promise<void>;
}

export function CreateSnippetForm({ createSnippet }: CreateSnippetFormProps) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(() => {
      createSnippet(formData);
    });
  }

  return (
    <form action={handleSubmit}>
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
