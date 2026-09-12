import { client } from "@/lib/sanity";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isValidId(id: string) {
  return /^[a-zA-Z0-9._-]+$/.test(id);
}

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!id || !isValidId(id)) {
    return new Response("Invalid e-paper id", { status: 400 });
  }

  const thumbnailUrl = await client.fetch<string | null>(
    `*[_type == "epaper" && _id == $id][0].thumbnail.asset->url`,
    { id },
  );
  if (!thumbnailUrl) {
    return new Response("No stored e-paper thumbnail", { status: 404 });
  }

  return Response.redirect(thumbnailUrl, 307);
}
