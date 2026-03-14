"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NewsCard from "@/components/NewsCard";
import EPaper from "@/components/EPaper";
import PoliticsSection from "@/components/PoliticsSection";
import SocialFeed from "@/components/SocialFeed";
import TempleHeritage from "@/components/TempleHeritage";
import YoutubeGrid from "@/components/YoutubeGrid";
import Footer from "@/components/Footer";
import { client } from "@/lib/sanity";
import { useLanguage } from "@/context/LanguageContext";

// 1. ADDED THESE CRITICAL IMPORTS
import Link from "next/link"; 
import { ExternalLink, ArrowRight } from "lucide-react";

export default function Home() {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false); 
  
  const [newsItems, setNewsItems] = useState([]);
  const [epaperData, setEpaperData] = useState<any[]>([]);
  const [politicsData, setPoliticsData] = useState({ mla: null, news: [] });
  const [templeData, setTempleData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. UPDATED DICTIONARY TYPE (Added epaper)
  type TranslationType = {
    headlines: string;
    politics: string;
    video: string;
    epaper: string;
  };

  const translations: Record<string, TranslationType> = {
    KN: { 
      headlines: "ಇಂದಿನ ಮುಖ್ಯಾಂಶಗಳು", 
      politics: "ರಾಜಕೀಯ ಮತ್ತು ಅಭಿವೃದ್ಧಿ", 
      video: "ವೀಡಿಯೊ ಸುದ್ದಿಗಳು",
      epaper: "ಇ-ಪೇಪರ್ (E-Paper)"
    },
    EN: { 
      headlines: "Today's Headlines", 
      politics: "Politics & Development", 
      video: "Video News",
      epaper: "Digital E-Paper"
    }
  };

  const content = translations[lang as string] || translations.KN;

  useEffect(() => {
    setMounted(true);
    async function fetchAllData() {
      try {
        // 1. Fetch News
        const news = await client.fetch(`*[_type == "news" && category != "Politics"] | order(publishedAt desc)[0...6]`);
        setNewsItems(news);

        // 2. FETCH MULTIPLE E-PAPERS (Fixes your issue)
        // We fetch the latest 10 uploaded E-Paper documents
        const epaper = await client.fetch(`*[_type == "epaper"] | order(publishDate desc)[0...10] {
          _id,
          publishDate,
          "pdfFiles": pdfFiles[]{ asset->{url} },
          thumbnail
        }`);
        setEpaperData(epaper);

        // 3. Fetch Politics and Temples (Same as before)
        const mla = await client.fetch(`*[_type == "mla"][0]`);
        const pNews = await client.fetch(`*[_type == "news" && category == "Politics"] | order(publishedAt desc)[0...3]`);
        setPoliticsData({ mla, news: pNews });
        const temples = await client.fetch(`*[_type == "temple"]`);
        setTempleData(temples);

      } catch (error) {
        console.error("Data Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllData();
  }, []);
  
  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4">
        <Hero />
        
        {/* E-PAPER SECTION - Fixed layout so title is above content */}
        {/* E-PAPER SECTION */}
        <div id="epaper" className="scroll-mt-24 mt-12">
          <div className="flex justify-between items-end mb-8 border-b-4 border-red-600 pb-2">
            <div>
               <h2 className="text-4xl font-black text-red-600 leading-none">{content.epaper}</h2>
               <p className="text-[10px] font-bold text-muted-foreground mt-2 uppercase tracking-tighter">Digital Newspaper Archives</p>
            </div>
            <Link href="/epaper-archive" className="text-sm font-bold bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full hover:bg-red-600 hover:text-white transition-all flex items-center gap-1">
              {lang === "KN" ? "ಎಲ್ಲಾ ಪತ್ರಿಕೆಗಳು" : "View All"} <ExternalLink size={14} />
            </Link>
          </div>
          
          {/* THE CARDS ROW */}
          <EPaper data={epaperData} />
        </div>

        {/* DAILY NEWS SECTION */}
        <div id="news" className="scroll-mt-24 py-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-10 w-2 bg-red-600 rounded-full" />
            <h2 className="text-3xl md:text-5xl font-black">{content.headlines}</h2>
          </div>

          {/* This container ensures the grid and button stay together */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-6 md:p-10 rounded-[40px] border border-slate-100 dark:border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {newsItems.length > 0 ? (
                newsItems.map((post: any) => (
                  <NewsCard key={post._id} post={post} />
                ))
              ) : (
                <p className="col-span-3 text-center py-10 text-muted-foreground italic">No news items found. Add news in Admin Panel!</p>
              )}
            </div>

            {/* THE BUTTON - Forced Visibility */}
            <div className="flex justify-center mt-16">
              <Link 
                href="/news" 
                className="group relative inline-flex items-center gap-3 bg-red-600 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-black transition-all duration-300 shadow-[0_20px_50px_rgba(220,38,38,0.3)] hover:shadow-none"
              >
                {lang === "KN" ? "ಮತ್ತಷ್ಟು ಸುದ್ದಿಗಳು" : "EXPLORE ALL NEWS"}
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>

        {/* POLITICS DASHBOARD */}
        <div id="politics" className="scroll-mt-24">
          <PoliticsSection mla={politicsData.mla} news={politicsData.news} />
        </div>

        {/* SOCIAL MEDIA FEEDS */}
       {/*  <SocialFeed />*/}

        {/* HERITAGE CARDS */}
        <TempleHeritage temples={templeData} />

        {/* LIVE VIDEO NEWS */}
        <div id="live" className="scroll-mt-24">
          <div className="flex items-center gap-3 my-10">
            <div className="h-10 w-2 bg-blue-600 rounded-full" />
            <h2 className="text-3xl font-black">{content.video}</h2>
          </div>
          <YoutubeGrid />
        </div>
      </div>

      <Footer />
    </div>
  );
}