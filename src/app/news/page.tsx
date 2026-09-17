"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import Footer from "@/components/Footer";
import { client } from "@/lib/sanity";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BackButton from "@/components/BackButton";

export default function NewsArchive() {
  const { lang } = useLanguage();
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    async function fetchArchive() {
      const start = page * itemsPerPage;
      const end = start + itemsPerPage;
      const query = `*[_type == "news"] | order(publishedAt desc)[${start}...${end}]`;
      const data = await client.fetch(query);
      setNews(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    fetchArchive();
  }, [page]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <BackButton />
        <h1 className="text-4xl font-black mb-10 border-l-8 border-red-600 pl-4">
          {lang === "KN" ? "ಸುದ್ದಿ ಸಂಚಯ" : "News Archive"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {news.map((post: any) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>

        {/* PAGINATION CONTROLS */}
        <div className="flex justify-center items-center gap-4 mt-16">
          <button 
            onClick={() => setPage(p => Math.max(0, p - 1))}
            className="p-3 rounded-full border hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
            disabled={page === 0}
          >
            <ChevronLeft size={24}/>
          </button>
          <span className="font-bold text-xl">Page {page + 1}</span>
          <button 
            onClick={() => setPage(p => p + 1)}
            className="p-3 rounded-full border hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
            disabled={news.length < itemsPerPage}
          >
            <ChevronRight size={24}/>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}