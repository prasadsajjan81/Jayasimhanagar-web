"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "KN" | "EN";

const LanguageContext = createContext({
  lang: "KN",
  setLang: (lang: Language) => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>("KN");

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);