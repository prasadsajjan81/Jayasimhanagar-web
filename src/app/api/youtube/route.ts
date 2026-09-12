import { NextResponse } from "next/server";

export const revalidate = 900;

const feedUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=UCpjAd4-kVYxtPtIEVYqmxDQ";

function decodeXml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export async function GET() {
  const response = await fetch(feedUrl, { next: { revalidate: 900 } });
  if (!response.ok) {
    return NextResponse.json({ error: "YouTube feed unavailable" }, { status: 502 });
  }

  const xml = await response.text();
  const videos = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .slice(0, 8)
    .map((match) => {
      const entry = match[1];
      const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = entry.match(/<title>([^<]+)<\/title>/)?.[1];
      const publishedAt = entry.match(/<published>([^<]+)<\/published>/)?.[1];
      if (!id || !title || !publishedAt) return null;
      return { id, title: decodeXml(title), publishedAt };
    })
    .filter((video): video is { id: string; title: string; publishedAt: string } => video !== null);

  return NextResponse.json(videos, {
    headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600" },
  });
}
