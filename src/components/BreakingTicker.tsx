"use client";

import Link from "next/link";
import { ArrowRight, Radio } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type TickerPost = {
  _id: string;
  title?: string;
};

export default function BreakingTicker({ posts }: { posts: TickerPost[] }) {
  const { lang } = useLanguage();
  const items = posts.filter((post) => post.title).slice(0, 5);

  if (items.length === 0) return null;

  return (
    <div className="mt-4 mb-6 flex items-stretch overflow-hidden rounded-2xl border border-red-200 bg-red-50 dark:border-red-950 dark:bg-red-950/30 md:mt-6">
      <div className="flex shrink-0 items-center gap-2 bg-red-600 px-4 py-3 text-xs font-black uppercase tracking-wider text-white">
        <Radio size={15} className="animate-pulse" />
        {lang === "KN" ? "ತಾಜಾ ಸುದ್ದಿ" : "Latest"}
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-5 overflow-x-auto bg-red-50 px-4 py-3 text-slate-900 dark:bg-red-950/30 dark:text-slate-100">
        {items.map((post) => (
          <Link
            key={post._id}
            href={`/news/${post._id}`}
            className="flex shrink-0 items-center gap-2 text-sm font-bold text-slate-900 hover:text-red-600 dark:text-slate-100"
          >
            <span className="max-w-[280px] truncate">{post.title}</span>
            <ArrowRight size={14} className="text-red-600" />
          </Link>
        ))}
      </div>
    </div>
  );
}
