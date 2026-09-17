"use client";

import { useMemo, useState } from "react";
import { Clock, MapPin, MessageCircle, Navigation, Phone, Search } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export type Business = {
  _id: string;
  name?: string;
  nameKn?: string;
  category?: string;
  description?: string;
  address?: string;
  locality?: string;
  district?: string;
  phone?: string;
  whatsapp?: string;
  mapsUrl?: string;
  latitude?: number;
  longitude?: number;
  openingHours?: string;
  image?: Record<string, unknown>;
  featured?: boolean;
  source?: string;
};

type Coordinates = { latitude: number; longitude: number };

function distanceInKm(from: Coordinates, to: Coordinates) {
  const earthRadius = 6371;
  const latitudeDelta = ((to.latitude - from.latitude) * Math.PI) / 180;
  const longitudeDelta = ((to.longitude - from.longitude) * Math.PI) / 180;
  const a =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos((from.latitude * Math.PI) / 180) *
      Math.cos((to.latitude * Math.PI) / 180) *
      Math.sin(longitudeDelta / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function BusinessDirectory({ businesses }: { businesses: Business[] }) {
  const { lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [district, setDistrict] = useState("all");
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [locationMessage, setLocationMessage] = useState("");
  const [nearbyPlaces, setNearbyPlaces] = useState<Business[]>([]);
  const [nearbyLoading, setNearbyLoading] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set(businesses.map((business) => business.category).filter(Boolean))) as string[],
    [businesses],
  );
  const districts = useMemo(
    () => Array.from(new Set(businesses.map((business) => business.district).filter(Boolean))) as string[],
    [businesses],
  );
  const filteredBusinesses = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return businesses
      .filter((business) => {
        const searchable = [business.name, business.nameKn, business.category, business.address, business.locality, business.district]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return (
          (!normalizedQuery || searchable.includes(normalizedQuery)) &&
          (category === "all" || business.category === category) &&
          (district === "all" || business.district === district)
        );
      })
      .sort((first, second) => {
        if (first.featured !== second.featured) return first.featured ? -1 : 1;
        if (!userLocation) return 0;
        if (first.latitude == null || first.longitude == null) return 1;
        if (second.latitude == null || second.longitude == null) return -1;
        return (
          distanceInKm(userLocation, { latitude: first.latitude, longitude: first.longitude }) -
          distanceInKm(userLocation, { latitude: second.latitude, longitude: second.longitude })
        );
      });
  }, [businesses, category, district, query, userLocation]);

  const findNearMe = () => {
    if (!navigator.geolocation) {
      setLocationMessage(lang === "KN" ? "ನಿಮ್ಮ ಬ್ರೌಸರ್ ಸ್ಥಳ ಮಾಹಿತಿ ನೀಡುವುದಿಲ್ಲ." : "Location is not available in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coordinates = { latitude: position.coords.latitude, longitude: position.coords.longitude };
        setUserLocation(coordinates);
        setNearbyLoading(true);
        try {
          const response = await fetch(`/api/businesses/nearby?lat=${coordinates.latitude}&lng=${coordinates.longitude}`);
          if (!response.ok) throw new Error("Nearby businesses request failed.");
          const data = await response.json() as { places?: Business[] };
          setNearbyPlaces(data.places || []);
          setLocationMessage(lang === "KN" ? "ನಿಮ್ಮ ಹತ್ತಿರದ ಪರಿಶೀಲಿಸದ ಸ್ಥಳಗಳನ್ನು ತೋರಿಸಲಾಗುತ್ತಿದೆ." : "Showing verified listings and nearby OpenStreetMap places.");
        } catch (error) {
          console.error("Nearby business discovery failed:", error);
          setLocationMessage(lang === "KN" ? "ಹತ್ತಿರದ ಸ್ಥಳಗಳನ್ನು ಈಗ ಪಡೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ." : "Nearby places could not be loaded right now.");
        } finally {
          setNearbyLoading(false);
        }
      },
      () => setLocationMessage(lang === "KN" ? "ಸ್ಥಳ ಅನುಮತಿ ನೀಡಲಾಗಿಲ್ಲ. ಜಿಲ್ಲೆ ಆಯ್ಕೆ ಬಳಸಿ." : "Location permission was not granted. Use the district filter instead."),
      { enableHighAccuracy: false, maximumAge: 300000, timeout: 10000 },
    );
  };

  return (
    <div>
      <div className="mb-8 grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50 md:grid-cols-[1fr_auto_auto_auto]">
        <label className="flex items-center gap-3 rounded-xl border bg-background px-4 py-3">
          <Search size={18} className="text-red-600" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={lang === "KN" ? "ಆಸ್ಪತ್ರೆ, ಹೋಟೆಲ್, ಶಾಲೆ ಹುಡುಕಿ..." : "Search hospitals, hotels, schools..."} className="w-full bg-transparent text-sm outline-none" />
        </label>
        <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border bg-background px-3 py-3 text-sm">
          <option value="all">{lang === "KN" ? "ಎಲ್ಲಾ ವರ್ಗಗಳು" : "All categories"}</option>
          {categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select value={district} onChange={(event) => setDistrict(event.target.value)} className="rounded-xl border bg-background px-3 py-3 text-sm">
          <option value="all">{lang === "KN" ? "ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು" : "All districts"}</option>
          {districts.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <button onClick={findNearMe} className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-black text-white hover:bg-red-700">
          <Navigation size={16} /> {lang === "KN" ? "ಹತ್ತಿರ ಹುಡುಕಿ" : "Find near me"}
        </button>
      </div>
      {locationMessage && <p className="mb-6 text-sm font-bold text-red-600">{locationMessage}</p>}
      {nearbyLoading && <p className="mb-6 text-sm font-bold text-red-600">Finding nearby places...</p>}
      {filteredBusinesses.length === 0 && nearbyPlaces.length === 0 ? (
        <div className="rounded-3xl border border-dashed p-10 text-center text-muted-foreground">
          <p className="font-bold">{lang === "KN" ? "ಇನ್ನೂ ಪರಿಶೀಲಿತ ವ್ಯಾಪಾರ ಪಟ್ಟಿಗಳು ಪ್ರಕಟವಾಗಿಲ್ಲ." : "No verified businesses are published yet."}</p>
          <p className="mt-2 text-sm">{lang === "KN" ? "ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ಪಟ್ಟಿ ಮಾಡಿ ಅಥವಾ ಹತ್ತಿರ ಹುಡುಕಿ ಬಳಸಿ." : "List your business, or use Find near me to discover nearby OpenStreetMap places."}</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...filteredBusinesses, ...nearbyPlaces].map((business) => {
            const distance = userLocation && business.latitude != null && business.longitude != null
              ? `${distanceInKm(userLocation, { latitude: business.latitude, longitude: business.longitude }).toFixed(1)} km away`
              : null;
            const whatsapp = business.whatsapp || business.phone;
            return (
              <article key={business._id} className="rounded-3xl border bg-background p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                {business.source ? (
                  <span className="mb-3 inline-block rounded-full bg-sky-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-sky-800">Nearby · {business.source}</span>
                ) : business.featured && <span className="mb-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-800">Featured</span>}
                <h2 className="text-xl font-black">{lang === "KN" && business.nameKn ? business.nameKn : business.name}</h2>
                <p className="mt-1 text-xs font-black uppercase tracking-widest text-red-600">{business.category || "Local business"}</p>
                {business.description && <p className="mt-3 text-sm text-muted-foreground">{business.description}</p>}
                <div className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                  {(business.address || business.locality || business.district) && <p className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-red-600" />{[business.address, business.locality, business.district].filter(Boolean).join(", ")}</p>}
                  {business.openingHours && <p className="flex gap-2"><Clock size={16} className="shrink-0 text-red-600" />{business.openingHours}</p>}
                  {distance && <p className="font-bold text-red-600">{distance}</p>}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {business.phone && <a href={`tel:${business.phone}`} className="inline-flex items-center gap-1 rounded-full border px-3 py-2 text-xs font-bold hover:border-red-600 hover:text-red-600"><Phone size={14} /> Call</a>}
                  {whatsapp && <a href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full bg-[#25D366] px-3 py-2 text-xs font-bold text-white"><MessageCircle size={14} /> WhatsApp</a>}
                  {business.mapsUrl && <a href={business.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-full border px-3 py-2 text-xs font-bold hover:border-red-600 hover:text-red-600"><MapPin size={14} /> Directions</a>}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
