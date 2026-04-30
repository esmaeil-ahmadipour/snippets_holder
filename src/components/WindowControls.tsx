interface WindowControlsProps {
  className?: string;
  showTitle?: boolean;
  title?: string;
}

export function WindowControls({
  className = "",
  showTitle = false,
  title = "new-snippet.tsx",
}: WindowControlsProps) {
  return (
    <div
      className={`relative border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 px-6 py-3 flex items-center gap-2 ${className}`}
    >
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
        <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
      </div>

      {showTitle && (
        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 ml-2">
          {title}
        </span>
      )}
    </div>
  );
}
