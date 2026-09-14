"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Youtube } from "lucide-react";
import { buildVideoShareMessage } from "@/lib/sharing";

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
      <div className="mb-8 flex items-center justify-end gap-4">
        <a href={channelUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 border-b-2 border-red-600 text-sm font-bold text-red-600">
          <Youtube size={18} /> Subscribe
        </a>
      </div>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {videos.map((video) => (
            <div key={video.id} className="group overflow-hidden rounded-xl bg-black">
              <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">
                <div className="relative aspect-video">
                <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} className="h-full w-full object-cover transition-transform group-hover:scale-105" alt={video.title} />
                <span className="absolute inset-0 flex items-center justify-center bg-black/20 text-4xl text-white transition-colors group-hover:bg-black/5">▶</span>
                </div>
                <div className="line-clamp-2 bg-background p-3 text-sm font-bold">{video.title}</div>
              </a>
              <div className="bg-background px-3 pb-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(buildVideoShareMessage(video.title, `https://www.youtube.com/watch?v=${video.id}`))}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3 py-2 text-xs font-black text-white hover:bg-[#1ebe5b]"
                >
                  <MessageCircle size={14} /> Share
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-muted-foreground">Loading latest videos...</p>
      )}
    </section>
  );
}
