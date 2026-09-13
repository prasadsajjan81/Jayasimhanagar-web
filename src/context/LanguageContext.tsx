"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "KN" | "EN";

const LanguageContext = createContext({
  lang: "KN",
  setLang: (lang: Language) => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Language>("KN");

  useEffect(() => {
    const saved = window.localStorage.getItem("site-language");
    if (saved === "KN" || saved === "EN") setLangState(saved);
  }, []);

  const setLang = (nextLang: Language) => {
    setLangState(nextLang);
    window.localStorage.setItem("site-language", nextLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);