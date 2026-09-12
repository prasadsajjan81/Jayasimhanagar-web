"use client";
import { useState, useEffect } from "react";
import { urlFor } from "@/lib/sanity";
import { Calendar, Sparkles, Loader2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { translateText, summarizeNews } from "@/lib/gemini";
import Link from "next/link";

export default function NewsCard({ post }: { post: any }) {
  const { lang } = useLanguage();
  const [displayTitle, setDisplayTitle] = useState(post.title);
  const [summary, setSummary] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  // AI Translation Logic
  useEffect(() => {
    async function handleLanguageChange() {
      if (lang === "EN") {
        setIsTranslating(true);
        try {
          const translated = await translateText(post.title, "English");
          setDisplayTitle(translated);
        } catch (error) {
          setDisplayTitle(post.title); // Fallback to Kannada if AI fails
        }
        setIsTranslating(false);
      } else {
        setDisplayTitle(post.title);
      }
    }
    handleLanguageChange();
  }, [lang, post.title]);

  // AI Summary Logic
  const handleSummary = async () => {
    setLoadingAI(true);
    try {
      const articleContent = post.body || post.content;
      const sourceText = articleContent
        ? JSON.stringify(articleContent)
        : "Full report from Humnabad.";
      const aiSummary = await summarizeNews(post.title, sourceText);
      setSummary(aiSummary);
    } catch (error) {
      setSummary("Error generating AI summary.");
    }
    setLoadingAI(false);
  };

  return (
    <div className="group bg-background border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-56 w-full overflow-hidden">
        {post.mainImage && (
          <img
            src={urlFor(post.mainImage).url()}
            alt="News"
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
          />
        )}
        <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
          {post.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold mb-3">
          <Calendar size={12} />
          {new Date(post.publishedAt).toLocaleDateString(lang === "KN" ? "kn-IN" : "en-US")}
        </div>

        <h3 className={`text-xl font-bold leading-tight mb-4 transition-all ${isTranslating ? 'opacity-30 blur-sm' : 'opacity-100 blur-0'}`}>
          {displayTitle}
        </h3>

        {/* AI Action Button */}
        <button 
          onClick={handleSummary}
          disabled={loadingAI}
          className="flex items-center gap-2 text-[10px] font-black bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-4 py-2 rounded-xl hover:bg-purple-200 transition-colors mb-4 w-fit"
        >
          {loadingAI ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
          {lang === "KN" ? "AI ಸಂಕ್ಷಿಪ್ತ ವಿವರ" : "AI SUMMARY"}
        </button>

        {/* AI Summary Text Area */}
        {summary && (
          <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs border-l-4 border-purple-500 animate-in fade-in slide-in-from-top-2">
            {summary}
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <Link href={`/news/${post._id}`} className="text-sm font-black text-red-600 flex items-center gap-1 group/btn">
            {lang === "KN" ? "ಮತ್ತಷ್ಟು ಓದಿ" : "READ MORE"} 
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform"/>
          </Link>
        </div>
      </div>
    </div>
  );
}