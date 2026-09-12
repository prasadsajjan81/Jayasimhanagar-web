import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { FileText, Loader2 } from "lucide-react";
import PdfThumbnail from "./PdfThumbnail";

export default function EPaper({ data }: { data: any[] | null }) {
  if (!data) return <div className="h-20 flex justify-center"><Loader2 className="animate-spin text-red-600" /></div>;
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
      {data.slice(0, 6).map((paper: any) => (
        <Link key={paper._id} href={`/epaper/${paper._id}`} className="group block">
          <div className="bg-card rounded-xl overflow-hidden border border-border group-hover:border-red-600 transition-all shadow-sm">
            <div className="relative aspect-[3/4] bg-slate-100 dark:bg-slate-800">
              {paper.thumbnail ? (
                <img src={urlFor(paper.thumbnail).width(300).url()} className="w-full h-full object-cover" alt="EPaper" />
              ) : paper.pdfFiles?.[0]?.asset?.url ? (
                <PdfThumbnail pdfUrl={paper.pdfFiles[0].asset.url} alt="EPaper front page" />
              ) : (
                <div className="flex items-center justify-center h-full"><FileText size={24} className="opacity-20"/></div>
              )}
            </div>
            <div className="p-2 text-center text-foreground bg-background">
              <p className="text-[10px] font-bold">{paper.publishDate}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}