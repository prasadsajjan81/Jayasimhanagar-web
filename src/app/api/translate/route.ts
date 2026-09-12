// src/app/api/translate/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }
    const API_KEY = process.env.GROQ_API_KEY; // Hidden on server!
    if (!API_KEY) {
      return NextResponse.json({ error: "AI service is not configured" }, { status: 503 });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are a professional Kannada-to-English news translator. Output ONLY the English translation." },
          { role: "user", content: `Translate this news headline: "${text}"` }
        ]
      })
    });

    if (!response.ok) {
      console.error("Groq translation request failed:", response.status, await response.text());
      return NextResponse.json({ error: "Translation failed" }, { status: 502 });
    }
    const data = await response.json();
    return NextResponse.json({ translated: data.choices[0].message.content.trim() });
  } catch (error) {
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}