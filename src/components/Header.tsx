"use client";
import { useTheme } from "next-themes";
import { Sun, Moon, Newspaper, MapPin, Tv } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // DICTIONARY FOR MENU
  const t = {
    KN: {
      title: "ಜಯಸಿಂಹನಗರ ದಿನಪತ್ರಿಕೆ",
      local: "ಸ್ಥಳೀಯ ಸುದ್ದಿ",
      politics: "ರಾಜಕೀಯ",
      epaper: "ಇ-ಪೇಪರ್",
      live: "ಲೈವ್ ಟಿವಿ"
    },
    EN: {
      title: "Jai Shimhanagar News",
      local: "Local News",
      politics: "Politics",
      epaper: "E-Paper",
      live: "Live TV"
    }
  }[lang] || { title: "ಜಯಸಿಂಹನಗರ ದಿನಪತ್ರಿಕೆ", local: "ಸ್ಥಳೀಯ ಸುದ್ದಿ", politics: "ರಾಜಕೀಯ", epaper: "ಇ-ಪೇಪರ್", live: "ಲೈವ್ ಟಿವಿ" };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="bg-red-600 p-2 rounded-lg">
            <Newspaper className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black">{t.title}</h1>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Humnabad News</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6 font-bold text-sm">
          <button className="hover:text-red-600 transition-colors flex items-center gap-1"><MapPin size={16}/> {t.local}</button>
          <button className="hover:text-red-600 transition-colors">{t.politics}</button>
          <button className="hover:text-red-600 transition-colors">{t.epaper}</button>
          <button className="text-red-600 flex items-center gap-1 animate-pulse"><Tv size={16}/> {t.live}</button>
        </nav>

        {/* Language Switcher */}
        <div className="flex items-center gap-4">
           <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-full border">
              <button onClick={() => setLang("KN")} className={`px-3 py-1 rounded-full text-[10px] font-bold ${lang === "KN" ? "bg-red-600 text-white" : ""}`}>KN</button>
              <button onClick={() => setLang("EN")} className={`px-3 py-1 rounded-full text-[10px] font-bold ${lang === "EN" ? "bg-red-600 text-white" : ""}`}>EN</button>
           </div>
           
           <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2">
            {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-700" />}
          </button>
        </div>
      </div>
    </header>
  );
}