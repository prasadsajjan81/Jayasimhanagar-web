import { Youtube } from "lucide-react";

const channelUrl = "https://www.youtube.com/@Jaishimhanagardinapatrike";
const feedUrl = "https://www.youtube.com/feeds/videos.xml?channel_id=UCpjAd4-kVYxtPtIEVYqmxDQ";

type Video = {
  id: string;
  title: string;
  publishedAt: string;
};

function decodeXml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

async function getLatestVideos(): Promise<Video[]> {
  const response = await fetch(feedUrl, { next: { revalidate: 900 } });
  if (!response.ok) throw new Error(`YouTube feed request failed: ${response.status}`);

  const xml = await response.text();
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .slice(0, 8)
    .map((match) => {
      const entry = match[1];
      const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = entry.match(/<title>([^<]+)<\/title>/)?.[1];
      const publishedAt = entry.match(/<published>([^<]+)<\/published>/)?.[1];
      if (!id || !title || !publishedAt) return null;
      return { id, title: decodeXml(title), publishedAt };
    })
    .filter((video): video is Video => video !== null);
}

export default async function YoutubeGrid() {
  let videos: Video[] = [];
  try {
    videos = await getLatestVideos();
  } catch (error) {
    console.error("YouTube feed error:", error);
  }

  return (
    <section className="my-12 rounded-3xl bg-slate-50 px-6 py-12 dark:bg-slate-900/50">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h2 className="text-3xl font-black">ವೀಡಿಯೊ ಸುದ್ದಿಗಳು (YouTube News)</h2>
        <a href={channelUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 border-b-2 border-red-600 text-sm font-bold text-red-600">
          <Youtube size={18} /> Subscribe
        </a>
      </div>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {videos.map((video) => (
            <a key={video.id} href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-xl bg-black">
              <div className="relative aspect-video">
                <img
                  src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  alt={video.title}
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/20 text-4xl text-white transition-colors group-hover:bg-black/5">▶</span>
              </div>
              <div className="line-clamp-2 bg-background p-3 text-sm font-bold">{video.title}</div>
            </a>
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-muted-foreground">Latest videos are currently unavailable.</p>
      )}
    </section>
  );
}
