// src/app/api/translate/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    const API_KEY = process.env.GROQ_API_KEY; // Hidden on server!

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

    const data = await response.json();
    return NextResponse.json({ translated: data.choices[0].message.content.trim() });
  } catch (error) {
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}