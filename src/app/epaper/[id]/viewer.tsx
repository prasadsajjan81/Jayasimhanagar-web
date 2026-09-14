"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Share2 } from "lucide-react";
import { buildEpaperShareMessage } from "@/lib/sharing";

export default function EPaperViewer({ paper }: { paper: { publishDate?: string; pdfUrl: string } }) {
  const [shared, setShared] = useState(false);
  const shareUrl = typeof window === "undefined" ? "" : window.location.href;
  const shareText = `Jaishimhanagar E-paper - ${paper.publishDate || "Latest edition"}`;

  async function sharePaper() {
    if (navigator.share) {
      await navigator.share({ title: shareText, text: buildEpaperShareMessage(shareText, shareUrl), url: shareUrl });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(buildEpaperShareMessage(shareText, shareUrl))}`, "_blank", "noopener,noreferrer");
    }
    setShared(true);
  }

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-950 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link href="/#epaper" className="inline-flex items-center gap-2 font-bold hover:text-red-600">
            <ArrowLeft size={18} /> Back to e-papers
          </Link>
          <div className="flex gap-2">
            <button onClick={sharePaper} className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700">
              <Share2 size={17} /> {shared ? "Shared" : "Share"}
            </button>
            <a href={paper.pdfUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700">
              <ExternalLink size={17} /> Open PDF
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl bg-white shadow-xl dark:bg-slate-900">
          <iframe title={`E-paper ${paper.publishDate || ""}`} src={paper.pdfUrl} className="h-[calc(100vh-150px)] min-h-[650px] w-full" />
        </div>
      </div>
    </main>
  );
}
