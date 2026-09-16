import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, UserRound, ArrowLeft } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";

export const metadata: Metadata = {
  title: "Politics & Development | Jaishimhanagar",
  description: "Read the latest politics and development news from Humnabad and Bidar.",
};

async function getPoliticsData() {
  const [mla, news] = await Promise.all([
    client.fetch(`*[_type == "mla"][0]`),
    client.fetch(`*[_type == "news" && category == "Politics"] | order(publishedAt desc)`),
  ]);
  return { mla, news };
}

export default async function PoliticsPage() {
  const { mla, news } = await getPoliticsData();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 md:py-8">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold hover:border-blue-600 hover:text-blue-600">
          <ArrowLeft size={16} /> ಹಿಂದಕ್ಕೆ
        </Link>

        <h1 className="mb-8 border-l-8 border-blue-600 pl-4 text-3xl font-black md:text-5xl">
          ರಾಜಕೀಯ ಮತ್ತು ಅಭಿವೃದ್ಧಿ
        </h1>

        {mla && (
          <section className="mb-10 grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[220px_1fr]">
            {mla.profilePicture && (
              <img src={urlFor(mla.profilePicture).width(440).url()} alt={mla.name || "MLA"} className="h-56 w-full rounded-2xl object-cover" />
            )}
            <div>
              <p className="mb-2 text-xs font-black uppercase tracking-widest text-blue-600">ಜನಪ್ರತಿನಿಧಿ</p>
              <h2 className="text-3xl font-black">{mla.name}</h2>
              <p className="mt-2 text-muted-foreground">ಶಾಸಕರು, {mla.constituency}</p>
              {mla.developmentProjects?.length > 0 && (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {mla.developmentProjects.map((project: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-800">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-500" />
                      {project}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-black">
            <UserRound className="text-blue-600" /> ಇತ್ತೀಚಿನ ರಾಜಕೀಯ ಸುದ್ದಿ
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((post: any) => <NewsCard key={post._id} post={post} />)}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
