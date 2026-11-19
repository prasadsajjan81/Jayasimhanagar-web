"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton({ fallbackHref = "/" }: { fallbackHref?: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        const historyIndex = window.history.state?.idx;
        if (typeof historyIndex === "number" && historyIndex > 0) {
          router.back();
        } else {
          router.push(fallbackHref);
        }
      }}
      className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-red-600 hover:text-red-600 dark:border-slate-700 dark:text-slate-200"
    >
      <ArrowLeft size={16} />
      Go back
    </button>
  );
}
