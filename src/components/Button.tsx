"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    text-white
    bg-gradient-to-r from-indigo-500 to-purple-500
    hover:from-indigo-600 hover:to-purple-600
    hover:scale-105
    shadow-md
    focus-visible:ring-indigo-500
  `,
  secondary: `
    text-gray-700 dark:text-gray-300
    bg-white dark:bg-gray-800
    border border-gray-200 dark:border-gray-700
    hover:bg-gray-50 dark:hover:bg-gray-700
    focus-visible:ring-gray-500
  `,
  danger: `
    text-red-600 dark:text-red-400
    bg-red-50 dark:bg-red-950/30
    border border-red-200 dark:border-red-800
    hover:bg-red-100 dark:hover:bg-red-950/50
    focus-visible:ring-red-500
  `,
  ghost: `
    text-gray-500 dark:text-gray-400
    hover:text-indigo-600 dark:hover:text-indigo-400
    hover:bg-gray-50 dark:hover:bg-gray-800
    focus-visible:ring-indigo-500
  `,
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
  md: "px-4 py-2 text-sm rounded-xl gap-2",
  lg: "px-6 py-3 text-base rounded-2xl gap-2.5",
};

const baseClass = `
  inline-flex items-center
  font-medium
  transition-all duration-200
  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
  dark:focus-visible:ring-offset-gray-900
  disabled:opacity-50 disabled:cursor-not-allowed
  disabled:pointer-events-none
`;

export function Button({
  children,
  icon,
  onClick,
  href,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
}: ButtonProps) {
  const mergedClassName = twMerge(
    clsx(
      baseClass,
      sizeClasses[size],
      variantClasses[variant],
      disabled && "cursor-not-allowed opacity-50",
      className,
    ),
  );

  if (href) {
    return (
      <Link href={href} className={mergedClassName}>
        {icon && icon}
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={mergedClassName}
    >
      {icon && icon}
      {children}
    </button>
  );
}
