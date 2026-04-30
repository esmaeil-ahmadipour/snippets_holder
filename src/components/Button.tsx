"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

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
  const baseStyles = `
    inline-flex items-center gap-2
    font-medium
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    dark:focus:ring-offset-gray-900
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      text-white
      bg-gradient-to-r from-indigo-500 to-purple-500
      hover:from-indigo-600 hover:to-purple-600
      hover:scale-105
      shadow-md
      focus:ring-indigo-500
    `,
    secondary: `
      text-gray-700 dark:text-gray-300
      bg-white dark:bg-gray-800
      border border-gray-200 dark:border-gray-700
      hover:bg-gray-50 dark:hover:bg-gray-700
      focus:ring-gray-500
    `,
    danger: `
      text-red-600 dark:text-red-400
      bg-red-50 dark:bg-red-950/30
      border border-red-200 dark:border-red-800
      hover:bg-red-100 dark:hover:bg-red-950/50
      focus:ring-red-500
    `,
    ghost: `
      text-gray-500 dark:text-gray-400
      hover:text-indigo-600 dark:hover:text-indigo-400
      hover:bg-gray-50 dark:hover:bg-gray-800
      focus:ring-indigo-500
    `,
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-xl",
  };

  const combinedClassName = `
    ${baseStyles}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim();

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
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
      className={combinedClassName}
    >
      {icon && icon}
      {children}
    </button>
  );
}