"use client";

import { useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";

type NewsPost = {
  title?: string;
  category?: string;
  tags?: string[];
  location?: string;
  body?: unknown;
  content?: unknown;
};

const districtFilters = [
  { value: "all", terms: [], kn: "ಎಲ್ಲಾ", en: "All" },
  { value: "humnabad", terms: ["humnabad", "ಹುಮ್ನಾಬಾದ್"], kn: "ಹುಮ್ನಾಬಾದ್", en: "Humnabad" },
  { value: "bidar", terms: ["bidar", "ಬೀದರ್"], kn: "ಬೀದರ್", en: "Bidar" },
  { value: "basavakalyan", terms: ["basavakalyan", "ಬಸವಕಲ್ಯಾಣ"], kn: "ಬಸವಕಲ್ಯಾಣ", en: "Basavakalyan" },
  { value: "aurad", terms: ["aurad", "ಔರಾದ್"], kn: "ಔರಾದ್", en: "Aurad" },
  { value: "bhalki", terms: ["bhalki", "ಭಾಲ್ಕಿ"], kn: "ಭಾಲ್ಕಿ", en: "Bhalki" },
];

export default function NewsFilters({ posts, onChange }: { posts: NewsPost[]; onChange: (posts: NewsPost[]) => void }) {
  const { lang } = useLanguage();
  const categories = useMemo(
    () => ["all", ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean)))],
    [posts],
  );

  const applyFilter = (value: string, type: "category" | "district") => {
    const filtered = posts.filter((post) => {
      if (value === "all") return true;
      if (type === "category") return post.category === value;
      const searchable = JSON.stringify(post).toLowerCase();
      const district = districtFilters.find((filter) => filter.value === value);
      return district?.terms.some((term) => searchable.includes(term.toLowerCase())) ?? false;
    });
    onChange(filtered);
  };

  return (
    <div className="mb-8 space-y-4">
      <div>
        <p className="mb-2 text-xs font-black uppercase tracking-widest text-muted-foreground">
          {lang === "KN" ? "ಜಿಲ್ಲೆ ಆಯ್ಕೆಮಾಡಿ" : "Browse by district"}
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {districtFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => applyFilter(filter.value, "district")}
              className="shrink-0 rounded-full border border-slate-200 bg-background px-4 py-2 text-xs font-bold transition hover:border-red-600 hover:text-red-600 dark:border-slate-700"
            >
              {lang === "KN" ? filter.kn : filter.en}
            </button>
          ))}
        </div>
      </div>
      {categories.length > 1 && (
        <div>
          <p className="mb-2 text-xs font-black uppercase tracking-widest text-muted-foreground">
            {lang === "KN" ? "ವರ್ಗದ ಮೂಲಕ" : "Browse by category"}
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => applyFilter(category as string, "category")}
                className="shrink-0 rounded-full border border-slate-200 bg-background px-4 py-2 text-xs font-bold transition hover:border-red-600 hover:text-red-600 dark:border-slate-700"
              >
                {category === "all" ? (lang === "KN" ? "ಎಲ್ಲಾ" : "All") : category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
