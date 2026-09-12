import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import EPaperViewer from "./viewer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.jaishimhanagar.com";

type EPaper = {
  _id: string;
  publishDate?: string;
  pdfUrl?: string;
  thumbnailUrl?: string;
};

async function getEPaper(id: string): Promise<EPaper | null> {
  return client.fetch(
    `*[_type == "epaper" && _id == $id][0]{
      _id,
      publishDate,
      "pdfUrl": pdfFiles[0].asset->url,
      "thumbnailUrl": thumbnail.asset->url
    }`,
    { id },
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const paper = await getEPaper(id);
  if (!paper) return { title: "E-paper not found" };

  const title = `Jaishimhanagar E-paper - ${paper.publishDate || "Latest edition"}`;
  const thumbnailUrl = paper.thumbnailUrl || `${siteUrl}/logo.png`;
  return {
    title,
    description: `Read the Jaishimhanagar newspaper e-paper for ${paper.publishDate || "today"}.`,
    openGraph: {
      title,
      description: `Read the Jaishimhanagar newspaper e-paper for ${paper.publishDate || "today"}.`,
      url: `${siteUrl}/epaper/${id}`,
      type: "article",
      images: [{ url: thumbnailUrl, width: 900, height: 1200, alt: "Jaishimhanagar e-paper" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: "Jaishimhanagar digital newspaper",
      images: [thumbnailUrl],
    },
  };
}

export default async function EPaperPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const paper = await getEPaper(id);
  if (!paper || !paper.pdfUrl) notFound();
  return <EPaperViewer paper={{ publishDate: paper.publishDate, pdfUrl: paper.pdfUrl }} />;
}
