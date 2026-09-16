import { client, urlFor } from "@/lib/sanity";
import { CheckCircle2, User, Trophy } from "lucide-react";
import Link from "next/link";

async function getMLAData() {
  // This fetches the first MLA document found in Sanity
  return await client.fetch(`*[_type == "mla"][0]`);
}

async function getPoliticalNews() {
  // This fetches news specifically tagged as 'Politics'
  return await client.fetch(`*[_type == "news" && category == "Politics"] | order(publishedAt desc)[0...3]`);
}

export default function PoliticsSection({ mla, news }: { mla: any, news: any[] }) {

  if (!mla) return null;

  return (
    <section className="my-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-2 bg-blue-600 rounded-full" />
        <h2 className="text-4xl font-black">ರಾಜಕೀಯ ಮತ್ತು ಅಭಿವೃದ್ಧಿ (Politics)</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* MLA Profile Card */}
        <Link
          href="/politics"
          className="group bg-gradient-to-br from-blue-600 to-indigo-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
          aria-label={`Read full politics and development details for ${mla.name || "the MLA"}`}
        >
          <div className="relative z-10">
            <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4 border-4 border-white/20">
              {mla.profilePicture && (
                <img src={urlFor(mla.profilePicture).url()} alt={mla.name} className="w-full h-full object-cover" />
              )}
            </div>
            <h3 className="text-2xl font-bold">{mla.name}</h3>
            <p className="text-blue-100 mb-6">ಶಾಸಕರು, {mla.constituency}</p>
            
            <div className="space-y-4">
               <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                 <Trophy className="text-yellow-400" size={20} />
                 <span className="text-sm font-medium">ಅಭಿವೃದ್ಧಿ ಪಥದಲ್ಲಿ ಹುಮ್ನಾಬಾದ್</span>
               </div>
            </div>
          </div>
          {/* Decorative Background Icon */}
          <User className="absolute -right-10 -bottom-10 opacity-10" size={250} />
          <span className="relative z-10 mt-6 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-bold transition-colors group-hover:bg-white/25">
            ಸಂಪೂರ್ಣ ವಿವರ ಓದಿ
          </span>
        </Link>

        {/* Development Projects List */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h4 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="text-green-500" /> ಪ್ರಮುಖ ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಗಳು (Works)
            </h4>
            <Link href="/politics" className="shrink-0 text-xs font-bold text-blue-600 hover:underline">
              ಎಲ್ಲಾ ರಾಜಕೀಯ ಸುದ್ದಿ
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mla.developmentProjects?.map((project: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  {index + 1}
                </span>
                <p className="font-medium text-sm">{project}</p>
              </div>
            ))}
          </div>

          {/* Related Political News */}
          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
             <p className="text-xs uppercase tracking-widest text-slate-400 mb-4 font-bold">ಇತ್ತೀಚಿನ ರಾಜಕೀಯ ಸುದ್ದಿ</p>
             <div className="space-y-3">
               {news.map((item: any) => (
                 <Link
                   key={item._id}
                   href={`/news/${item._id}`}
                   className="flex items-center justify-between gap-4 rounded-xl p-3 -mx-3 group hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                 >
                   <p className="font-bold group-hover:text-blue-600 transition-colors">{item.title}</p>
                   <span className="shrink-0 text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                     Read
                   </span>
                 </Link>
               ))}
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}