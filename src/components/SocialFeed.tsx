export default function SocialFeed() {
  return (
    <section className="my-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-10 w-2 bg-blue-600 rounded-full" />
        <h2 className="text-3xl font-black">ಫೇಸ್‌ಬುಕ್ ಇತ್ತೀಚಿನ ಸುದ್ದಿಗಳು (Facebook Feed)</h2>
      </div>
      
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex justify-center">
        {/* Modern Facebook Embed */}
        <iframe 
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
          width="500" 
          height="500" 
          style={{ border: 'none', overflow: 'hidden' }} 
          scrolling="no" 
          frameBorder="0" 
          allowFullScreen={true} 
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        ></iframe>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-4 italic">
        * Note: Replace the URL above with your official Jaya Simhanagar Facebook page URL.
      </p>
    </section>
  );
}