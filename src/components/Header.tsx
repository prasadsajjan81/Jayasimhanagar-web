"use client";
import { useTheme } from "next-themes";
import { Sun, Moon, Newspaper, MapPin, Tv, Menu, X, Store } from "lucide-react";
import Link from "next/link";
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
    KN: { title: "ಜೈಸಿಂಹನಗರ ದಿನಪತ್ರಿಕೆ", local: "ಸ್ಥಳೀಯ ಸುದ್ದಿ", politics: "ರಾಜಕೀಯ", epaper: "ಇ-ಪೇಪರ್", business: "ವ್ಯಾಪಾರಗಳು", live: "ಲೈವ್ ಟಿವಿ" },
    EN: { title: "Jaishimhanagar News", local: "Local News", politics: "Politics", epaper: "E-Paper", business: "Businesses & Ads", live: "Live TV" }
  }[lang as "KN" | "EN"];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false); // Close menu after clicking
  };

  return (
    <header className="sticky top-0 z-[100] w-full border-b bg-background/95 backdrop-blur shadow-sm text-foreground">
      <div className="container mx-auto flex h-16 items-center justify-between gap-2 px-3 sm:h-20 sm:px-4">
        
        {/* Logo */}
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-2" aria-label="Go to Jaishimhanagar home">
          <img src="/logo.png" alt="Logo" className="h-11 w-11 shrink-0 rounded-full border border-red-500 bg-white sm:h-12 sm:w-12" />
          <div className="min-w-0">
            <h1 className="truncate text-sm font-black leading-tight sm:text-xl md:text-2xl">{t.title}</h1>
            <p className="hidden text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 sm:block">
              {lang === "KN" ? "ನಿಮ್ಮ ಸಮಸ್ಯೆಗೆ ನಮ್ಮ ಧ್ವನಿ" : "Your Problem, Our Voice"}
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 font-bold text-sm">
          <button onClick={() => scrollTo('news')} className="hover:text-red-600 transition-colors">{t.local}</button>
          <button onClick={() => scrollTo('politics')} className="hover:text-red-600 transition-colors">{t.politics}</button>
          <button onClick={() => scrollTo('epaper')} className="hover:text-red-600 transition-colors">{t.epaper}</button>
          <Link href="/businesses" className="flex items-center gap-1 hover:text-red-600 transition-colors"><Store size={16} /> {t.business}</Link>
          <button onClick={() => scrollTo('live')} className="text-red-600 flex items-center gap-1 animate-pulse"><Tv size={16}/> {t.live}</button>
        </nav>

        {/* Controls */}
        <div className="flex shrink-0 items-center gap-1 md:gap-4">
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
        <div className="absolute left-0 top-16 z-50 flex w-full flex-col space-y-4 border-b bg-background p-6 text-center shadow-xl animate-in slide-in-from-top sm:top-20 lg:hidden">
          <button onClick={() => scrollTo('news')} className="border-b pb-2 text-xl font-bold">{t.local}</button>
          <button onClick={() => scrollTo('politics')} className="border-b pb-2 text-xl font-bold">{t.politics}</button>
          <button onClick={() => scrollTo('epaper')} className="border-b pb-2 text-xl font-bold">{t.epaper}</button>
          <Link href="/businesses" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-2 border-b pb-2 text-xl font-bold"><Store size={20} /> {t.business}</Link>
          <button onClick={() => scrollTo('live')} className="text-xl font-bold text-red-600">{t.live}</button>
        </div>
      )}
    </header>
  );
}