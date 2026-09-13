"use client";
import { useTheme } from "next-themes";
import { Sun, Moon, Newspaper, MapPin, Tv, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const t = {
    KN: { title: "ಜೈಸಿಂಹನಗರ ದಿನಪತ್ರಿಕೆ", local: "ಸ್ಥಳೀಯ ಸುದ್ದಿ", politics: "ರಾಜಕೀಯ", epaper: "ಇ-ಪೇಪರ್", live: "ಲೈವ್ ಟಿವಿ" },
    EN: { title: "Jaishimhanagar News", local: "Local News", politics: "Politics", epaper: "E-Paper", live: "Live TV" }
  }[lang as "KN" | "EN"];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false); // Close menu after clicking
  };

  return (
    <header className="sticky top-0 z-[100] w-full border-b bg-background/95 backdrop-blur shadow-sm text-foreground">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/logo.png" alt="Logo" className="h-12 w-12 rounded-full border border-red-500 bg-white" />
          <div className="hidden sm:block">
            <h1 className="text-xl md:text-2xl font-black leading-tight">{t.title}</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">
              {lang === "KN" ? "ನಿಮ್ಮ ಸಮಸ್ಯೆಗೆ ನಮ್ಮ ಧ್ವನಿ" : "Your Problem, Our Voice"}
            </p>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 font-bold text-sm">
          <button onClick={() => scrollTo('news')} className="hover:text-red-600 transition-colors">{t.local}</button>
          <button onClick={() => scrollTo('politics')} className="hover:text-red-600 transition-colors">{t.politics}</button>
          <button onClick={() => scrollTo('epaper')} className="hover:text-red-600 transition-colors">{t.epaper}</button>
          <button onClick={() => scrollTo('live')} className="text-red-600 flex items-center gap-1 animate-pulse"><Tv size={16}/> {t.live}</button>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2 md:gap-4">
           {/* Language Toggle */}
           <div className="flex rounded-full border border-slate-300 bg-slate-100 p-1 dark:border-slate-600 dark:bg-slate-800">
              <button onClick={() => setLang("KN")} className={`rounded-full px-2 py-1 text-[10px] font-bold ${lang === "KN" ? "bg-red-600 text-white" : "text-slate-900 dark:text-slate-100"}`}>KN</button>
              <button onClick={() => setLang("EN")} className={`rounded-full px-2 py-1 text-[10px] font-bold ${lang === "EN" ? "bg-red-600 text-white" : "text-slate-900 dark:text-slate-100"}`}>EN</button>
           </div>
           
           <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 text-foreground">
            {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
          </button>

          {/* Hamburger Button (Mobile Only) */}
          <button className="lg:hidden p-2 text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-background border-b shadow-xl p-6 space-y-4 animate-in slide-in-from-top flex flex-col text-left">
          <button onClick={() => scrollTo('news')} className="text-xl font-bold border-b pb-2">{t.local}</button>
          <button onClick={() => scrollTo('politics')} className="text-xl font-bold border-b pb-2">{t.politics}</button>
          <button onClick={() => scrollTo('epaper')} className="text-xl font-bold border-b pb-2">{t.epaper}</button>
          <button onClick={() => scrollTo('live')} className="text-xl font-bold text-red-600">{t.live}</button>
        </div>
      )}
    </header>
  );
}