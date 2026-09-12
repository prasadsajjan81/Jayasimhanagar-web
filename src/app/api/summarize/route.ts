import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { headline, content } = await request.json();
  if (typeof headline !== "string" || typeof content !== "string" || !headline.trim()) {
    return NextResponse.json({ error: "Headline is required" }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("GROQ_API_KEY is not configured");
    return NextResponse.json({ error: "AI service is not configured" }, { status: 503 });
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "Summarize the news in exactly 3 concise Kannada bullet points. Return only the bullet points.",
        },
        {
          role: "user",
          content: `Headline: ${headline}\nArticle: ${content}`,
        },
      ],
      temperature: 0.2,
      max_tokens: 250,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Groq summary request failed:", response.status, details);
    return NextResponse.json({ error: "AI summary request failed" }, { status: 502 });
  }

  const data = await response.json();
  const summary = data.choices?.[0]?.message?.content;
  if (typeof summary !== "string" || !summary.trim()) {
    return NextResponse.json({ error: "AI returned no summary" }, { status: 502 });
  }

  return NextResponse.json({ summary: summary.trim() });
}
