// src/components/EPaper.tsx
import { urlFor } from "@/lib/sanity";
import { Calendar, FileText, ChevronRight, Loader2 } from "lucide-react";

export default function EPaper({ data }: { data: any[] | null }) {
  if (!data) return <div className="h-40 flex items-center justify-center"><Loader2 className="animate-spin text-red-600" /></div>;
  if (data.length === 0) return null;

  return (
    <section className="w-full">
      {/* GRID LAYOUT: NO SCROLLBAR. 1 on Mobile, 3 on Tablet, 6 on Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {data.slice(0, 6).map((paper: any) => (
          <a 
            key={paper._id} 
            href={paper.pdfFiles?.[0]?.asset?.url || "#"} 
            target="_blank"
            className="group cursor-pointer"
          >
            <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all duration-300 group-hover:border-red-500 group-hover:shadow-xl">
              
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                {paper.thumbnail ? (
                  <img src={urlFor(paper.thumbnail).width(300).url()} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="E-Paper" />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-300"><FileText size={40} /></div>
                )}
                <div className="absolute bottom-2 right-2 bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">READ NOW</div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900">
                <div className="flex items-center gap-1 text-red-600 mb-1">
                   <Calendar size={10} />
                   <span className="text-[8px] font-black uppercase tracking-widest">Daily Edition</span>
                </div>
                <h3 className="font-black text-xs text-slate-800 dark:text-slate-100">{paper.publishDate}</h3>
                <p className="text-[9px] text-muted-foreground mt-1 font-bold uppercase">{paper.pdfFiles?.length || 0} Pages</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}