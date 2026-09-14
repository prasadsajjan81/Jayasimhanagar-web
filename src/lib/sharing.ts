export const whatsappGroupUrl = "https://chat.whatsapp.com/Dr9wICa8bxfEC9dajqqq9T";
export const contactPhone = "+91 9986124437";

const commonFooter = `ಸುದ್ದಿ, ಜಾಹೀರಾತುಗಳಿಗೆ ಸಂಪರ್ಕಿಸಿ ${contactPhone}

Get The Latest News, Updates, And Exclusive Content Delivered Straight To You.

Join WhatsApp Group: ${whatsappGroupUrl}`;

export function buildArticleShareMessage(title: string, url: string) {
  return `${title}

ಇಂದಿನ:- Jaishimhanagar - ಸುದ್ದಿ ಓದಲು ಈ ಲಿಂಕ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ

${commonFooter}

${url}`;
}

export function buildVideoShareMessage(title: string, url: string) {
  return `${title}

Jaishimhanagar ವೀಡಿಯೊ ಸುದ್ದಿ ನೋಡಲು ಈ ಲಿಂಕ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ

${commonFooter}

${url}`;
}

export function buildEpaperShareMessage(title: string, url: string) {
  return `${title}

ಇಂದಿನ:- Jaishimhanagar - ಇ-ಪೇಪರ್ ನೋಡಲು ಈ ಲಿಂಕ್ ಅನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ

${commonFooter}

${url}`;
}
