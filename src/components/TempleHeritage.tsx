import { client, urlFor } from "@/lib/sanity";

async function getTemples() {
  return await client.fetch(`*[_type == "temple"]`);
}

export default function TempleHeritage({ temples }: { temples: any[] }) {
  if (!temples || temples.length === 0) return null;
  return (
    <section className="py-12">
      <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
        <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
        ಹುಮ್ನಾಬಾದ್ ಪುಣ್ಯಕ್ಷೇತ್ರಗಳು (Heritage)
      </h2>
      <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
        {temples.map((temple: any) => (
          <a key={temple._id} href={`/heritage/${temple._id}`} className="group block min-w-[300px] cursor-pointer">
            <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
              <img src={urlFor(temple.image).url()} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={temple.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-5">
                <h3 className="text-white text-xl font-bold">{temple.name}</h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}