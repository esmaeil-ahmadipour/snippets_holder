import { ReactNode } from "react";

interface PageHeaderProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  iconGradient?: string;
  underlineGradient?: string;
  iconSize?: "sm" | "md" | "lg";
}

const iconSizes = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
};

const iconSvgSizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const titleSizes = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "text-4xl",
};

export function PageHeader({
  icon,
  title,
  subtitle,
  badge,
  className = "",
  iconGradient = "from-indigo-500 to-purple-500",
  underlineGradient = "from-indigo-500 to-purple-500",
  iconSize = "md",
}: PageHeaderProps) {
  return (
    <header className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-3">
        {/* Icon Container */}
        {icon && (
          <div
            className={`
            ${iconSizes[iconSize]} 
            rounded-xl 
            bg-gradient-to-br 
            ${iconGradient} 
            flex items-center justify-center 
            shadow-md
          `}
          >
            <div className={iconSvgSizes[iconSize]}>{icon}</div>
          </div>
        )}

        {/* Title Section */}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1
              className={`${titleSizes[iconSize]} font-bold text-gray-900 dark:text-gray-100`}
            >
              {title}
            </h1>
            {badge && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                {badge}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-1">
            <div
              className={`w-12 h-0.5 bg-gradient-to-r ${underlineGradient} rounded-full`}
            />
            {subtitle && (
              <p className="text-xs font-mono text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
