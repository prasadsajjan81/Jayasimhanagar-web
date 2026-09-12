import { client } from "@/lib/sanity";
import { ImageResponse } from "next/og";
import { createElement } from "react";

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
    const publishDate = await client.fetch<string | null>(
      `*[_type == "epaper" && _id == $id][0].publishDate`,
      { id },
    );
    return new ImageResponse(
      createElement(
        "div",
        {
          style: {
            width: "900px",
            height: "1200px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#f8fafc",
            color: "#0f172a",
            fontFamily: "sans-serif",
          },
        },
        createElement("div", { style: { fontSize: 52, fontWeight: 800, color: "#dc2626" } }, "ಜೈಸಿಂಹನಗರ ದಿನಪತ್ರಿಕೆ"),
        createElement("div", { style: { marginTop: 36, fontSize: 34, fontWeight: 700 } }, "Digital E-Paper"),
        createElement("div", { style: { marginTop: 18, fontSize: 28 } }, publishDate || "Latest edition"),
        createElement("div", { style: { marginTop: 80, fontSize: 24, color: "#475569" } }, "Open to read the full newspaper"),
      ),
      { width: 900, height: 1200 },
    );
  }

  return Response.redirect(thumbnailUrl, 307);
}
