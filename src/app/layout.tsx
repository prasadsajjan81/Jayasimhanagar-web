import type { Metadata } from "next";
import { Noto_Sans_Kannada } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/context/LanguageContext";

const kannadaFont = Noto_Sans_Kannada({ subsets: ["kannada"] });

export const metadata: Metadata = {
  title: "Jaishimhanagar - Humnabad News",
  description: "Bidar's leading local news portal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kn" suppressHydrationWarning> 
      <body className={kannadaFont.className} suppressHydrationWarning> 
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}


