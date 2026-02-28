// src/components/YoutubeGrid.tsx
export default function YoutubeGrid() {
  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-900/50 rounded-3xl px-6 my-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black">ವೀಡಿಯೊ ಸುದ್ದಿಗಳು (YouTube News)</h2>
        <a href="#" className="text-red-600 font-bold text-sm border-b-2 border-red-600">Subscribe</a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-video bg-black rounded-xl overflow-hidden relative group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all z-10">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white">▶</div>
            </div>
            <img src={`https://picsum.photos/seed/${i+10}/400/225`} className="w-full h-full object-cover opacity-80" alt="YouTube Thumbnail"/>
          </div>
        ))}
      </div>
    </section>
  );
}