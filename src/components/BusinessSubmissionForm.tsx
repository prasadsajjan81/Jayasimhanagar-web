"use client";

import { FormEvent, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function BusinessSubmissionForm() {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const details = [
      `Business: ${values.get("businessName")}`,
      `Category: ${values.get("category")}`,
      `Contact person: ${values.get("contactName")}`,
      `Phone: ${values.get("phone")}`,
      `WhatsApp: ${values.get("whatsapp") || "Same as phone"}`,
      `Address: ${values.get("address")}`,
      `Google Maps link: ${values.get("mapsUrl") || "Not provided"}`,
      `Opening hours: ${values.get("openingHours") || "Not provided"}`,
    ].join("\n");
    window.open(`https://wa.me/919986124437?text=${encodeURIComponent(`Business listing request\n\n${details}`)}`, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <form onSubmit={submit} className="mt-6 grid gap-4 rounded-2xl border border-slate-700 bg-slate-800/70 p-5 md:grid-cols-2">
      <input name="businessName" required placeholder={lang === "KN" ? "ವ್ಯಾಪಾರದ ಹೆಸರು *" : "Business name *"} className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-red-400" />
      <input name="category" required placeholder={lang === "KN" ? "ವರ್ಗ (ಆಸ್ಪತ್ರೆ, ಹೋಟೆಲ್...) *" : "Category (hospital, hotel...) *"} className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-red-400" />
      <input name="contactName" required placeholder={lang === "KN" ? "ಸಂಪರ್ಕ ವ್ಯಕ್ತಿ *" : "Contact person *"} className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-red-400" />
      <input name="phone" required type="tel" placeholder={lang === "KN" ? "ಫೋನ್ ಸಂಖ್ಯೆ *" : "Phone number *"} className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-red-400" />
      <input name="whatsapp" type="tel" placeholder={lang === "KN" ? "WhatsApp ಸಂಖ್ಯೆ" : "WhatsApp number"} className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-red-400" />
      <input name="openingHours" placeholder={lang === "KN" ? "ಕೆಲಸದ ಸಮಯ" : "Opening hours"} className="rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-red-400" />
      <input name="address" required placeholder={lang === "KN" ? "ಪೂರ್ಣ ವಿಳಾಸ ಮತ್ತು ಜಿಲ್ಲೆ *" : "Full address and district *"} className="md:col-span-2 rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-red-400" />
      <input name="mapsUrl" type="url" placeholder={lang === "KN" ? "Google Maps ಲಿಂಕ್" : "Google Maps link"} className="md:col-span-2 rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-red-400" />
      <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-black text-white hover:bg-[#1ebe5b]">
        <MessageCircle size={18} /> {lang === "KN" ? "ವಿವರಗಳನ್ನು WhatsApp ಗೆ ಕಳುಹಿಸಿ" : "Send details on WhatsApp"}
      </button>
      {submitted && <p className="flex items-center text-sm font-bold text-green-300">{lang === "KN" ? "WhatsApp ತೆರೆಯಲಾಗಿದೆ. ಪರಿಶೀಲನೆಯ ನಂತರ ಪ್ರಕಟಿಸಲಾಗುತ್ತದೆ." : "WhatsApp opened. We will review before publishing."}</p>}
    </form>
  );
}
