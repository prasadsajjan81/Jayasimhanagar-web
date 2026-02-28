import { urlFor } from "@/lib/sanity";
import { FileText } from "lucide-react";

export default function EPaper({ data }: { data: any }) {
  if (!data) return null;

  return (
    <section className="my-12 p-8 bg-red-50 dark:bg-red-950/20 rounded-3xl border-2 border-red-100 dark:border-red-900/30">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/3">
           {data.thumbnail && <img src={urlFor(data.thumbnail).url()} alt="E-Paper" className="rounded-xl shadow-2xl" />}
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-black text-red-600 mb-2">ಇ-ಪೇಪರ್ (E-Paper)</h2>
          <p className="mb-4 font-bold">ದಿನಾಂಕ: {data.publishDate}</p>
          <div className="max-h-[300px] overflow-y-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
            {data.pdfUrls?.map((url: string, index: number) => (
              <a key={index} href={url} target="_blank" className="flex flex-col items-center bg-white dark:bg-slate-800 p-3 rounded-xl border hover:bg-red-600 hover:text-white transition-all">
                <span className="text-xl font-black">{index + 1}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}