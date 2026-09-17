import { NextRequest, NextResponse } from "next/server";

const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

type NearbyPlace = {
  _id: string;
  name: string;
  category: string;
  address?: string;
  latitude: number;
  longitude: number;
  mapsUrl: string;
  source: "OpenStreetMap";
};

function getCategory(tags: Record<string, string>) {
  return tags.amenity || tags.shop || tags.tourism || tags.office || "Local place";
}

export async function GET(request: NextRequest) {
  const latitude = Number(request.nextUrl.searchParams.get("lat"));
  const longitude = Number(request.nextUrl.searchParams.get("lng"));

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return NextResponse.json({ error: "Valid latitude and longitude are required." }, { status: 400 });
  }

  const query = `[out:json][timeout:15];
(
  nwr(around:15000,${latitude},${longitude})["name"]["amenity"];
  nwr(around:15000,${latitude},${longitude})["name"]["shop"];
  nwr(around:15000,${latitude},${longitude})["name"]["tourism"];
  nwr(around:15000,${latitude},${longitude})["name"]["office"];
);
out center tags;`;

  const response = await fetch(OVERPASS_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain", "User-Agent": "JaishimhanagarBusinessDirectory/1.0" },
    body: query,
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Nearby business service is temporarily unavailable." }, { status: 502 });
  }

  const data = await response.json() as { elements?: Array<{ id: number; lat?: number; lon?: number; center?: { lat: number; lon: number }; tags?: Record<string, string> }> };
  const places = (data.elements || [])
    .map((element): NearbyPlace | null => {
      const tags = element.tags || {};
      const latitude = element.lat ?? element.center?.lat;
      const longitude = element.lon ?? element.center?.lon;
      if (latitude == null || longitude == null || !tags.name) return null;
      const address = [tags["addr:housenumber"], tags["addr:street"], tags["addr:city"]].filter(Boolean).join(", ");
      return {
        _id: `osm-${element.id}`,
        name: tags.name,
        category: getCategory(tags),
        address: address || undefined,
        latitude,
        longitude,
        mapsUrl: `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=18/${latitude}/${longitude}`,
        source: "OpenStreetMap" as const,
      };
    })
    .filter((place): place is NearbyPlace => place !== null)
    .slice(0, 60);

  return NextResponse.json({ places, attribution: "© OpenStreetMap contributors" }, {
    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
  });
}
