import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { client, urlFor } from "@/lib/sanity";

type Heritage = {
  _id: string;
  name?: string;
  description?: string;
  image?: Record<string, unknown>;
  location?: string;
  mapsUrl?: string;
};

async function getHeritage(id: string): Promise<Heritage | null> {
  return client.fetch(`*[_type == "temple" && _id == $id][0]{_id,name,description,image,location,mapsUrl}`, { id });
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const heritage = await getHeritage((await params).id);
  return { title: heritage?.name ? `${heritage.name} | Jaishimhanagar` : "Heritage | Jaishimhanagar" };
}

export default async function HeritagePage({ params }: { params: Promise<{ id: string }> }) {
  const heritage = await getHeritage((await params).id);
  if (!heritage) notFound();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <Link href="/#heritage" className="mb-8 inline-flex items-center gap-2 font-bold hover:text-red-600">
          <ArrowLeft size={18} /> Back to heritage
        </Link>
        <p className="mb-3 text-xs font-black uppercase tracking-widest text-orange-600">Humnabad Heritage</p>
        <h1 className="text-3xl font-black leading-tight md:text-5xl">{heritage.name || "Heritage place"}</h1>
        {heritage.image && <img src={urlFor(heritage.image).width(1200).url()} alt={heritage.name || "Heritage place"} className="mt-8 max-h-[560px] w-full rounded-3xl object-cover" />}
        <div className="prose prose-lg mt-8 max-w-none dark:prose-invert">
          {heritage.description ? <p className="whitespace-pre-line">{heritage.description}</p> : <p>Details will be added soon.</p>}
        </div>
        {(heritage.location || heritage.mapsUrl) && (
          <div className="mt-8 rounded-2xl border p-5">
            {heritage.location && <p className="flex items-center gap-2 font-bold"><MapPin size={18} className="text-red-600" />{heritage.location}</p>}
            {heritage.mapsUrl && <a href={heritage.mapsUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full bg-red-600 px-5 py-2.5 text-sm font-black text-white">Get directions</a>}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
