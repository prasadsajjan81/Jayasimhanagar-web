"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client, urlFor } from "@/lib/sanity";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar as CalendarIcon, FileText } from "lucide-react";

export default function EPaperArchive() {
  const { lang } = useLanguage();
  const [archives, setArchives] = useState([]);

  useEffect(() => {
    async function fetchEPapers() {
      // Corrected Query to include PDF URLs
      const data = await client.fetch(`*[_type == "epaper"] | order(publishDate desc) {
        _id,
        publishDate,
        "pdfUrl": pdfFiles[0].asset->url, 
        thumbnail
      }`);
      setArchives(data);
    }
    fetchEPapers();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-5xl font-black mb-10 border-l-8 border-red-600 pl-4 text-red-600 uppercase tracking-tighter">
          {lang === "KN" ? "ಹಳೆಯ ಪತ್ರಿಕೆಗಳ ಸಂಗ್ರಹ" : "Newspaper Archives"}
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {archives.map((paper: any) => (
            <a 
              key={paper._id} 
              href={paper.pdfUrl || "#"} 
              target="_blank" 
              className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-red-500 transition-all shadow-sm hover:shadow-2xl"
            >
               <div className="relative aspect-[3/4] bg-slate-100">
                 {paper.thumbnail ? (
                   <img src={urlFor(paper.thumbnail).width(300).url()} alt="E-Paper" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                 ) : (
                   <div className="flex items-center justify-center h-full text-slate-300"><FileText size={40}/></div>
                 )}
                 <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-red-600 px-3 py-1 rounded font-black text-[10px] shadow-2xl">OPEN PDF</span>
                 </div>
               </div>
               <div className="p-3 text-center border-t dark:border-slate-800">
                 <p className="font-black text-xs text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2">
                   <CalendarIcon size={12} className="text-red-600"/> {paper.publishDate}
                 </p>
               </div>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}