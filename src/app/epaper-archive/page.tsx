"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client, urlFor } from "@/lib/sanity";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar as CalendarIcon } from "lucide-react";

export default function EPaperArchive() {
  const { lang } = useLanguage();
  const [archives, setArchives] = useState([]);

  useEffect(() => {
    async function fetchEPapers() {
      const data = await client.fetch(`*[_type == "epaper"] | order(publishDate desc)`);
      setArchives(data);
    }
    fetchEPapers();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-black mb-10 border-l-8 border-red-600 pl-4 text-red-600">
          {lang === "KN" ? "ಹಳೆಯ ಪತ್ರಿಕೆಗಳ ಸಂಗ್ರಹ" : "E-Paper Archives"}
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {archives.map((paper: any) => (
            <div key={paper._id} className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border hover:shadow-2xl transition-all">
              <div className="relative aspect-[3/4]">
                {paper.thumbnail && (
                  <img src={urlFor(paper.thumbnail).url()} alt="Paper" className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-xs">OPEN</button>
                </div>
              </div>
              <div className="p-4 text-center">
                <p className="font-black text-sm flex items-center justify-center gap-2">
                  <CalendarIcon size={14} className="text-red-600"/> {paper.publishDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}