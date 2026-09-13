"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";

// These IDs are verified and working
const fallbackSlides = [
  {
    id: 1,
    titleKN: "ಶ್ರೀ ವೀರಭದ್ರೇಶ್ವರ ದೇವಸ್ಥಾನ",
    titleEN: "Sri Veerabhadreshwara Temple",
    // Verified Temple/Architecture ID
    imageUrl: "/Sri_Veerabhadreshwara_Temple_HB1.jpg", 
  },
  {
    id: 2,
    titleKN: "ಸಿದ್ಧು ಪಾಟೀಲ್ - ಶಾಸಕರು - ಅಭಿವೃದ್ಧಿ ಪಥ",
    titleEN: "Siddu Patil - MLA - Development Path",
    // Verified News/Political ID
    imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1600&auto=format&fit=crop", 
  },
  {
    id: 3,
    titleKN: "ಜನರ ನಂಬಿಕೆಯ ನಾಯಕ – ಹುಮನಾಬಾದ್‌ನ ರಾಜಶೇಖರ ಪಾಟೀಲ್",
    titleEN: "Leader trusted by the people – Rajshekar Patil of Humnabad.",
    // Verified Temple/Architecture ID
    imageUrl: "/rajshekar_patil.jpg", 
  },
];

type HeroPost = {
  _id: string;
  title?: string;
  category?: string;
  mainImage?: Record<string, unknown>;
};

export default function Hero({ posts = [] }: { posts?: HeroPost[] }) {
  const [current, setCurrent] = useState(0);
  const { lang } = useLanguage();
  const newsSlides = posts
    .filter((post) => post.title && post.mainImage)
    .slice(0, 2)
    .map((post) => ({
      id: post._id,
      titleKN: post.title || "",
      titleEN: post.title || "",
      imageUrl: urlFor(post.mainImage).width(1600).url(),
      href: `/news/${post._id}`,
      category: post.category,
    }));
  const slides = [
    ...fallbackSlides.map((slide) => ({ ...slide, href: undefined, category: undefined })),
    ...newsSlides,
  ];
  const activeSlide = slides[current] || slides[0];

  useEffect(() => {
    setCurrent(0);
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-[400px] md:h-[550px] w-full overflow-hidden rounded-3xl my-6 bg-slate-900 shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current} // Key ensures smooth transition
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Black Gradient Overlay for Text Visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
          
          <img 
            src={activeSlide.imageUrl}
            className="w-full h-full object-cover" 
            alt={activeSlide.titleEN}
            // Fallback: If image fails, show a professional blue gradient instead of a 404
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1600&auto=format&fit=crop";
            }}
          />

          <div className="absolute bottom-12 left-8 md:left-16 z-20 max-w-3xl text-white">
            {activeSlide.category && (
              <p className="mb-3 text-xs font-black uppercase tracking-widest text-red-300">{activeSlide.category}</p>
            )}
            <motion.h2 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              className="text-4xl md:text-6xl font-black mb-3 drop-shadow-lg"
            >
              {lang === "KN" ? activeSlide.titleKN : activeSlide.titleEN}
            </motion.h2>
            <p className="text-lg font-medium text-slate-200 md:text-xl">
              {lang === "KN" ? "ಜಯಸಿಂಹನಗರ ದಿನಪತ್ರಿಕೆಯ ವಿಶೇಷ ವರದಿ" : "Exclusive Report by Jaya Simhanagar"}
            </p>
            {activeSlide.href && (
              <Link href={activeSlide.href} className="mt-5 inline-flex rounded-full bg-red-600 px-5 py-2.5 text-sm font-black text-white transition hover:bg-red-700">
                {lang === "KN" ? "ಸಂಪೂರ್ಣ ಸುದ್ದಿ ಓದಿ" : "Read full story"}
              </Link>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Dots */}
      <div className="absolute bottom-6 right-12 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            type="button"
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            key={i} 
            className={`h-2 rounded-full transition-all duration-500 ${i === current ? 'w-8 bg-red-600' : 'w-2 bg-white/50'}`} 
          />
        ))}
      </div>
    </div>
  );
}