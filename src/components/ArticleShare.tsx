"use client";

import { Check, Copy, Facebook, MessageCircle, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { buildArticleShareMessage } from "@/lib/sharing";

export default function ArticleShare({ title }: { title: string }) {
  const { lang } = useLanguage();
  const [copied, setCopied] = useState(false);

  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => setShareUrl(window.location.href), []);
  const encodedUrl = encodeURIComponent(shareUrl);
  const shareMessage = buildArticleShareMessage(title, shareUrl);
  const encodedMessage = encodeURIComponent(shareMessage);

  const copyLink = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const nativeShare = async () => {
    if (navigator.share) {
      await navigator.share({ title, text: shareMessage, url: shareUrl });
    } else {
      await copyLink();
    }
  };

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3 border-y border-slate-200 py-5 dark:border-slate-800">
      <span className="mr-1 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground">
        <Share2 size={15} />
        {lang === "KN" ? "ಹಂಚಿಕೊಳ್ಳಿ" : "Share"}
      </span>
      <a
        href={`https://wa.me/?text=${encodedMessage}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on WhatsApp"
        className="rounded-full bg-[#25D366] p-2.5 text-white transition hover:scale-105"
      >
        <MessageCircle size={17} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on Facebook"
        className="rounded-full bg-[#1877F2] p-2.5 text-white transition hover:scale-105"
      >
        <Facebook size={17} />
      </a>
      <button onClick={nativeShare} aria-label="Share article" className="rounded-full border p-2.5 transition hover:border-red-600 hover:text-red-600">
        <Share2 size={17} />
      </button>
      <button onClick={copyLink} aria-label="Copy article link" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition hover:border-red-600 hover:text-red-600">
        {copied ? <Check size={15} /> : <Copy size={15} />}
        {copied ? (lang === "KN" ? "ಕಾಪಿ ಮಾಡಲಾಗಿದೆ" : "Copied") : (lang === "KN" ? "ಲಿಂಕ್ ಕಾಪಿ" : "Copy link")}
      </button>
    </div>
  );
}
