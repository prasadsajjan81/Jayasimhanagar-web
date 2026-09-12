"use client";

import { useEffect, useState } from "react";
import { Youtube } from "lucide-react";

const channelUrl = "https://www.youtube.com/@Jaishimhanagardinapatrike";

type Video = {
  id: string;
  title: string;
};

export default function YoutubeGrid() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetch("/api/youtube")
      .then((response) => {
        if (!response.ok) throw new Error(`YouTube API request failed: ${response.status}`);
        return response.json() as Promise<Video[]>;
      })
      .then(setVideos)
      .catch((error) => console.error("YouTube feed error:", error));
  }, []);

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
                <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} className="h-full w-full object-cover transition-transform group-hover:scale-105" alt={video.title} />
                <span className="absolute inset-0 flex items-center justify-center bg-black/20 text-4xl text-white transition-colors group-hover:bg-black/5">▶</span>
              </div>
              <div className="line-clamp-2 bg-background p-3 text-sm font-bold">{video.title}</div>
            </a>
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-muted-foreground">Loading latest videos...</p>
      )}
    </section>
  );
}
