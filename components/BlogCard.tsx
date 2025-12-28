'use client'

import { Tag } from "lucide-react";

export default function BlogCard({
  category = "Uncategorized",
  title = "Untitled Post",
  description = "",
  user={username:""},
  date = new Date().toISOString(),
}) {
  // friendly date formatting
  const formattedDate = (() => {
    try {
      const d = new Date(date);
      return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return date;
    }
  })();

  // initials fallback when no avatar provided
  const initials = user.username
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <article
      className="bg-white dark:bg-[#0b0b0d] border border-transparent hover:border-gray-200 dark:hover:border-neutral-800 rounded-2xl shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between"
      aria-labelledby={`blog-title-${title}`}
    >
      <header className="mb-4">
        {/* Category badge */}
        <div className="inline-flex items-center gap-2 text-sm font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full">
          <Tag className="w-4 h-4" />
          <span>{category}</span>
        </div>

        {/* Title */}
        <h3
          id={`blog-title-${title}`}
          className="mt-4 text-lg md:text-xl font-semibold text-slate-900 dark:text-slate-100 leading-tight"
        >
          {title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300/80 line-clamp-3">
          {description}
        </p>
      </header>

      <footer className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Avatar or initials */}
          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{initials}</span>
          </div>

          <div>
            <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{user.username}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400">{formattedDate}</div>
          </div>
        </div>
      </footer>
    </article>
  );
}
