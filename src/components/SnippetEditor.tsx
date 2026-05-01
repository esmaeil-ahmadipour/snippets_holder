"use client";

import { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";
import { useState } from "react";

interface SnippetEditorProps {
  snippet?: Snippet;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
}

export default function SnippetEditor({
  snippet,
  onChange,
  readOnly = false,
}: SnippetEditorProps) {
  const [code, setCode] = useState<string | undefined>(snippet?.code);
  const [isLoading, setIsLoading] = useState(true);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value);
    if (onChange) {
      onChange(value);
    }
  };

  const handleEditorMount = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-lg z-10">
          <div className="text-white">Loading Editor...</div>
        </div>
      )}
      <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <Editor
          height="30vh"
          theme="hc-black"
          language="javascript"
          onChange={handleEditorChange}
          onMount={handleEditorMount}
          defaultValue={snippet?.code}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: true,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            readOnly: readOnly,
          }}
        />
      </div>
    </div>
  );
}
