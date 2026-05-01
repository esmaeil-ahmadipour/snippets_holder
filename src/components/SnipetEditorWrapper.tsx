"use client";

import dynamic from "next/dynamic";
import { Snippet } from "@prisma/client";

// Dynamic loading to prevent SSR
const SnippetEditor = dynamic(() => import("@/components/SnippetEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-[30vh] flex items-center justify-center bg-gray-900 dark:bg-gray-800 rounded-lg">
      <div className="text-gray-400 animate-pulse">Loading Editor...</div>
    </div>
  ),
});

interface SnippetEditorWrapperProps {
  snippet?: Snippet;
  onChange?: (value: string | undefined) => void;
  readOnly?: boolean;
  height?: string | number;
  language?: string;
}

export default function SnippetEditorWrapper({
  snippet,
  onChange,
  readOnly = false,
  height = "30vh",
  language = "javascript",
}: SnippetEditorWrapperProps) {
  const editorProps = {
    ...(snippet !== undefined && { snippet }),
    ...(onChange !== undefined && { onChange }),
    readOnly,
    height,
    language,
  };

  return <SnippetEditor {...editorProps} />;
}
