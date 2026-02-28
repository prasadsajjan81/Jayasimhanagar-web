// src/lib/gemini.ts
const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || "";
// src/lib/gemini.ts
export async function translateText(text: string, targetLang: string) {
  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    const data = await response.json();
    return data.translated || text;
  } catch (error) {
    return text;
  }
}

// Do the same for summarizeNews by creating a /api/summarize route if needed.

export async function summarizeNews(headline: string, content: string) {
  if (!GROQ_API_KEY) return "ಸಾರಾಂಶ ಲಭ್ಯವಿಲ್ಲ.";

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant", // Smaller/faster model for summaries
        messages: [
          {
            role: "system",
            content: "Summarize this news into exactly 3 Kannada bullet points."
          },
          {
            role: "user",
            content: `Headline: ${headline}. Content: ${content}`
          }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (e) {
    return "ಸಾರಾಂಶ ಸಿದ್ಧಪಡಿಸುವಲ್ಲಿ ದೋಷ ಉಂಟಾಗಿದೆ.";
  }
}