import { Button } from "@/components/Button";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import Link from "next/link";

interface SnippetCardProps {
  id: number;
  title: string;
}

export default function SnippetCard({ id, title }: SnippetCardProps) {
  return (
    <Link href={`/snippets/${id}`} className="block">
      <div
        className="
        group relative
        rounded-2xl
        bg-white
        dark:bg-gray-900
        p-6
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:shadow-lg
        hover:shadow-gray-200
        dark:hover:shadow-gray-800
        cursor-pointer
        border
        border-gray-100
        dark:border-gray-800
      "
      >
        {/* TITLE SECTION */}
        <div className="relative mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Code Snippet Title :
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
        </div>

        {/* Interactive CTA */}
        <div className="relative mt-6 flex items-center justify-end">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button variant="ghost">
              View details
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
