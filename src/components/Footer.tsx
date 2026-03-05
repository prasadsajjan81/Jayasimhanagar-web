import { Mail, Phone, MapPin, Facebook, Youtube, ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { theme, setTheme } = useTheme();
    const { lang, setLang } = useLanguage();
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: About */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src="/logo.png"
              alt="Jaishimhanagar Logo"
              className="h-24 w-24 object-contain mb-4 bg-white p-1 rounded-full border shadow-sm"
            />
            <h3 className="text-xl font-black mb-2">ಜೈಸಿಂಹನಗರ ದಿನಪತ್ರಿಕೆ</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {lang === "KN"
                ? "ಹುಮ್ನಾಬಾದ್ ಮತ್ತು ಬಿದರ್ ಜಿಲ್ಲೆಯ ಅತೀ ವೇಗದ ಮತ್ತು ನಿಖರ ಸುದ್ದಿ ವಾಹಿನಿ."
                : "The fastest and most accurate news channel in Humnabad and Bidar district."}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-wider text-xs">Categories</h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><a href="#" className="hover:text-red-600 transition-colors">ಸ್ಥಳೀಯ ಸುದ್ದಿ (Local)</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">ರಾಜಕೀಯ (Politics)</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">ಇ-ಪೇಪರ್ (E-Paper)</a></li>
              <li><a href="#" className="hover:text-red-600 transition-colors">ಧಾರ್ಮಿಕ (Heritage)</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-wider text-xs">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3"><Phone size={16} className="text-red-600"/> Editor - Ravishankar Pandey</li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-red-600"/> +91 9986124437 </li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-red-600"/> Jaishimhanagar@gmail.com</li>
              <li className="flex items-center gap-3"><MapPin size={16} className="text-red-600"/> Humnabad, Bidar, Karnataka</li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h4 className="font-bold mb-2">Subscribe</h4>
            <p className="text-xs text-muted-foreground mb-4">Get daily news updates in your inbox.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-3 py-2 text-sm w-full outline-none focus:ring-1 ring-red-500" />
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold">→</button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Developer Credits */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-xs text-muted-foreground font-medium">
            © 2026 ಜಯಸಿಂಹನಗರ ದಿನಪತ್ರಿಕೆ. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Developed by</span>
            <a 
              href="https://tedmuf.com" 
              className="flex items-center gap-1 font-bold text-slate-900 dark:text-white hover:text-red-600 transition-colors"
            >
              Tedmuf Solutions Private Limited - +91 7506549564 <ExternalLink size={12}/>
            </a>
            <span className="text-muted-foreground ml-2 border-l pl-2">CEO: Basavprasad Sajjanshetty</span>
          </div>
        </div>
      </div>
    </footer>
  );
}