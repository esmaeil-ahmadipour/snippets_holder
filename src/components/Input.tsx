import { InputHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  icon?: ReactNode;
}

export function Input({
  label,
  hint,
  error,
  icon,
  className,
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  const baseStyles = `
    w-full px-4 py-2
    rounded-lg
    border
    bg-gray-50 dark:bg-gray-800/50
    text-gray-900 dark:text-gray-100
    placeholder:text-gray-400 dark:placeholder:text-gray-500
    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
    transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const errorStyles = error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-200 dark:border-gray-700";

  const withIconStyles = icon ? "pl-10" : "";

  const mergedClassName = twMerge(
    clsx(baseStyles, errorStyles, withIconStyles, className),
  );

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input id={inputId} className={mergedClassName} {...props} />
      </div>

      {hint && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>
      )}

      {error && (
        <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
