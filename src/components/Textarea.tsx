import { TextareaHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  rows?: number;
}

export function Textarea({
  label,
  hint,
  error,
  rows = 4,
  className,
  id,
  ...props
}: TextareaProps) {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

  const baseStyles = `
    w-full px-4 py-3
    rounded-lg
    border
    bg-gray-50 dark:bg-gray-800/50
    text-gray-900 dark:text-gray-100
    font-mono text-sm
    placeholder:text-gray-400 dark:placeholder:text-gray-500
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
    transition-all duration-200
    resize-y
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const errorStyles = error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-200 dark:border-gray-700";

  const mergedClassName = twMerge(clsx(baseStyles, errorStyles, className));

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400"
        >
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        rows={rows}
        className={mergedClassName}
        {...props}
      />

      {hint && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>
      )}

      {error && (
        <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
