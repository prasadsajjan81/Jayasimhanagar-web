import { MessageCircle, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const whatsappUrl = "https://wa.me/919986124437?text=ನಮಸ್ಕಾರ%2C%20ನಾನು%20ಸ್ಥಳೀಯ%20ಸುದ್ದಿ%20ಹಂಚಿಕೊಳ್ಳಲು%20ಬಯಸುತ್ತೇನೆ.";

export default function LocalNewsCTA() {
  const { lang } = useLanguage();

  return (
    <section className="my-12 overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 to-red-500 p-6 text-white shadow-xl md:p-8">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-100">
            <Send size={14} />
            {lang === "KN" ? "ನಿಮ್ಮ ಸುದ್ದಿ ನಮಗೆ ಕಳುಹಿಸಿ" : "Share your local story"}
          </p>
          <h2 className="text-2xl font-black md:text-3xl">
            {lang === "KN" ? "ಹುಮ್ನಾಬಾದ್ ಮತ್ತು ಬೀದರ್ ಸುದ್ದಿಗಳಿಗೆ ನಿಮ್ಮ ಧ್ವನಿ ಮುಖ್ಯ" : "Your voice matters in Humnabad and Bidar"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-red-100">
            {lang === "KN" ? "ಫೋಟೋ, ವೀಡಿಯೊ ಅಥವಾ ಸುದ್ದಿಯನ್ನು WhatsApp ಮೂಲಕ ಕಳುಹಿಸಿ." : "Send photos, videos, or a local news tip directly to our newsroom on WhatsApp."}
          </p>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-red-700 transition hover:bg-slate-100"
        >
          <MessageCircle size={19} />
          {lang === "KN" ? "WhatsApp ನಲ್ಲಿ ಕಳುಹಿಸಿ" : "Send on WhatsApp"}
        </a>
      </div>
    </section>
  );
}
