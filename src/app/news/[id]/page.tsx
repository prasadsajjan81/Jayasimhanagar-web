import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { Calendar, UserRound } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleShare from "@/components/ArticleShare";
import BackButton from "@/components/BackButton";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.jaishimhanagar.com";

type NewsArticle = {
  _id: string;
  title?: string;
  category?: string;
  publishedAt?: string;
  _updatedAt?: string;
  author?: string;
  mainImage?: Record<string, unknown>;
  body?: unknown[];
  content?: unknown[];
};

async function getArticle(id: string): Promise<NewsArticle | null> {
  return client.fetch(
    `*[_type == "news" && _id == $id][0]{_id,title,category,publishedAt,_updatedAt,author,mainImage,body,content}`,
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
    alternates: { canonical: `${siteUrl}/news/${id}` },
  };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) notFound();

  const blocks = article.body || article.content || [];
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <article className="mx-auto max-w-4xl px-4 py-6 md:py-8">
        <BackButton />
        <p className="mb-3 text-xs font-black uppercase tracking-widest text-red-600">{article.category || "News"}</p>
        <h1 className="text-3xl font-black leading-tight md:text-5xl">{article.title}</h1>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-bold text-muted-foreground">
          {article.publishedAt && <span className="flex items-center gap-2"><Calendar size={15} /> Published {new Date(article.publishedAt).toLocaleDateString("en-IN")}</span>}
          <span className="flex items-center gap-2"><UserRound size={15} /> {article.author || "Jaishimhanagar News Desk"}</span>
          {article._updatedAt && article._updatedAt !== article.publishedAt && <span>Updated {new Date(article._updatedAt).toLocaleDateString("en-IN")}</span>}
        </div>
        <ArticleShare title={article.title || "Jaishimhanagar News"} />
        {article.mainImage && (
          <img src={urlFor(article.mainImage).width(1200).url()} alt={article.title || "News"} className="mt-6 max-h-[560px] w-full rounded-2xl object-cover" />
        )}
        <div className="prose prose-lg mt-6 max-w-none dark:prose-invert">
          {blocks.length > 0 ? (
            <PortableText value={blocks as never} />
          ) : (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
              <p className="font-bold">Story content has not been published for this article yet.</p>
              <p className="mt-1 text-sm">Please add the full story in the Sanity Admin Panel under “Story Content” and publish the document.</p>
            </div>
          )}
        </div>
      </article>
      <Footer />
    </div>
  );
}
