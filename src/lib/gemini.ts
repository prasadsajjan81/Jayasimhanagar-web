export async function translateText(text: string, targetLang: string) {
  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, targetLang }),
    });
    if (!response.ok) return text;
    const data = await response.json();
    return data.translated || text;
  } catch {
    return text;
  }
}

export async function summarizeNews(headline: string, content: string) {
  try {
    const response = await fetch("/api/summarize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ headline, content }),
    });
    if (!response.ok) return "ಸಾರಾಂಶ ಲಭ್ಯವಿಲ್ಲ.";
    const data = await response.json();
    return data.summary || "ಸಾರಾಂಶ ಲಭ್ಯವಿಲ್ಲ.";
  } catch {
    return "ಸಾರಾಂಶ ಲಭ್ಯವಿಲ್ಲ.";
  }
}
