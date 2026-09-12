"use client";

import { useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";

export default function PdfThumbnail({ pdfUrl, alt }: { pdfUrl?: string; alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!pdfUrl || !canvasRef.current) return;
    let cancelled = false;

    async function renderFirstPage() {
      try {
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
        pdfjs.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/5.4.624/pdf.worker.min.mjs";
        const pdf = await pdfjs.getDocument({ url: pdfUrl }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = canvasRef.current;
        if (!canvas || cancelled) return;
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvas, canvasContext: canvas.getContext("2d")!, viewport }).promise;
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    renderFirstPage();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl]);

  if (!pdfUrl || failed) {
    return <div className="flex h-full items-center justify-center"><FileText size={24} className="opacity-20" /></div>;
  }
  return <canvas ref={canvasRef} aria-label={alt} className="h-full w-full object-cover" />;
}
