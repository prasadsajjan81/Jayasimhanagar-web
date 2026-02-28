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

export default function Home() {
  const { lang } = useLanguage();
   const [mounted, setMounted] = useState(false); 
  
  // States for all our data
  const [newsItems, setNewsItems] = useState([]);
  const [epaperData, setEpaperData] = useState(null);
  const [politicsData, setPoliticsData] = useState({ mla: null, news: [] });
  const [templeData, setTempleData] = useState([]);
  const [loading, setLoading] = useState(true);

 // 1. Define exactly what the translations look like
  type TranslationType = {
    headlines: string;
    politics: string;
    video: string;
  };

  // 2. Tell TypeScript that this object only uses "KN" or "EN" as keys
  const translations: Record<string, TranslationType> = {
    KN: { 
      headlines: "ಇಂದಿನ ಮುಖ್ಯಾಂಶಗಳು", 
      politics: "ರಾಜಕೀಯ ಮತ್ತು ಅಭಿವೃದ್ಧಿ", 
      video: "ವೀಡಿಯೊ ಸುದ್ದಿಗಳು" 
    },
    EN: { 
      headlines: "Today's Headlines", 
      politics: "Politics & Development", 
      video: "Video News" 
    }
  };

  // 3. This line now works perfectly without errors
  const content = translations[lang as string] || translations.KN;

  useEffect(() => {
    setMounted(true); // Set to true when the page loads
    async function fetchAllData() {
      try {
        // 1. Fetch General News
        const news = await client.fetch(`*[_type == "news" && category != "Politics"] | order(publishedAt desc)`);
        setNewsItems(news);

        // 2. Fetch E-Paper
        const epaper = await client.fetch(`*[_type == "epaper"] | order(publishDate desc)[0] {
          publishDate, "pdfUrls": pdfFiles[].asset->url, thumbnail
        }`);
        setEpaperData(epaper);

        // 3. Fetch Politics (MLA + Political News)
        const mla = await client.fetch(`*[_type == "mla"][0]`);
        const pNews = await client.fetch(`*[_type == "news" && category == "Politics"] | order(publishedAt desc)[0...3]`);
        setPoliticsData({ mla, news: pNews });

        // 4. Fetch Temples
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
  
  // If the page hasn't fully "mounted" yet, show a clean loading screen
  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4">
        <Hero />
        
        {/* Pass data as props to components */}
        <div id="epaper" className="scroll-mt-24">
          <EPaper data={epaperData} />
        </div>

        <div id="news" className="scroll-mt-24">
          <div className="flex items-center gap-3 my-12">
            <div className="h-10 w-2 bg-red-600 rounded-full" />
            <h2 className="text-3xl md:text-5xl font-black">{content.headlines}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((post: any) => (
              <NewsCard key={post._id} post={post} />
            ))}
          </div>
        </div>

        <div id="politics" className="scroll-mt-24">
          <PoliticsSection mla={politicsData.mla} news={politicsData.news} />
        </div>

        <SocialFeed />

        <TempleHeritage temples={templeData} />

        <div id="live" className="scroll-mt-24">
          <YoutubeGrid />
        </div>
      </div>
      <Footer />
    </div>
  );
}