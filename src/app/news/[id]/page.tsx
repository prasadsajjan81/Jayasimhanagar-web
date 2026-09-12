import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.jaishimhanagar.com";

type NewsArticle = {
  _id: string;
  title?: string;
  category?: string;
  publishedAt?: string;
  mainImage?: Record<string, unknown>;
  body?: unknown[];
  content?: unknown[];
};

async function getArticle(id: string): Promise<NewsArticle | null> {
  return client.fetch(
    `*[_type == "news" && _id == $id][0]{_id,title,category,publishedAt,mainImage,body,content}`,
    { id },
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) return { title: "News article not found" };

  const title = article.title || "Jaishimhanagar News";
  const imageUrl = article.mainImage ? urlFor(article.mainImage).width(1200).url() : `${siteUrl}/logo.png`;
  return {
    title,
    description: `Read the latest ${article.category || "news"} report from Jaishimhanagar.`,
    openGraph: {
      title,
      description: `Read the latest ${article.category || "news"} report from Jaishimhanagar.`,
      url: `${siteUrl}/news/${id}`,
      type: "article",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description: "Jaishimhanagar News", images: [imageUrl] },
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) notFound();

  const blocks = article.body || article.content || [];
  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto max-w-4xl px-4 py-12">
        <p className="mb-4 text-xs font-black uppercase tracking-widest text-red-600">{article.category || "News"}</p>
        <h1 className="text-3xl font-black leading-tight md:text-5xl">{article.title}</h1>
        {article.publishedAt && (
          <p className="mt-5 flex items-center gap-2 text-sm font-bold text-muted-foreground">
            <Calendar size={15} /> {new Date(article.publishedAt).toLocaleDateString("en-IN")}
          </p>
        )}
        {article.mainImage && (
          <img src={urlFor(article.mainImage).width(1200).url()} alt={article.title || "News"} className="mt-8 max-h-[560px] w-full rounded-2xl object-cover" />
        )}
        <div className="prose prose-lg mt-10 max-w-none dark:prose-invert">
          {blocks.length > 0 ? <PortableText value={blocks as never} /> : <p>Full article content is not available yet.</p>}
        </div>
      </article>
    </main>
  );
}
