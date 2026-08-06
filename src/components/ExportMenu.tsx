"use client";
import { useState } from "react";
import { flushSync, createPortal } from "react-dom";
import { Download, FileText, FileDown, Loader2 } from "lucide-react";
import { slides } from "@/config/slides";
import { Slide } from "./Slide";
import type { CommentData } from "./InteractionPanel";

export function ExportMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [pdfData, setPdfData] = useState<{ comments: Record<string, (string | CommentData)[]>, ready: boolean }>({ comments: {}, ready: false });

  const exportPDF = async () => {
    setIsExporting(true);
    try {
      const allComments: Record<string, (string | CommentData)[]> = {};
      for (const slide of slides) {
        try {
          const res = await fetch(`/api/comments?slideId=${slide.id}&t=${Date.now()}`, { cache: "no-store" });
          if (res.ok) {
            const data = await res.json();
            if (data.comments && data.comments.length > 0) {
              allComments[slide.title] = data.comments;
            }
          }
        } catch (e) {
          console.error("Failed to fetch comments for slide", slide.id);
        }
      }

      flushSync(() => {
        setPdfData({ comments: allComments, ready: true });
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      const handleAfterPrint = () => {
        setPdfData({ comments: {}, ready: false });
        window.removeEventListener('afterprint', handleAfterPrint);
      };
      window.addEventListener('afterprint', handleAfterPrint);
      
      window.print();
      
      // Fallback cleanup in case afterprint doesn't fire
      setTimeout(handleAfterPrint, 60000);
      
    } catch (err) {
      console.error("Failed to export PDF", err);
      alert("Failed to export PDF. See console for details.");
      setPdfData({ comments: {}, ready: false });
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  const exportMarkdown = async () => {
    setIsExporting(true);
    try {
      let mdContent = "# Presentation\n\n";
      
      for (const slide of slides) {
        mdContent += `## ${slide.title}\n\n`;
        mdContent += `${slide.body}\n\n`;
        if (slide.bulletPoints) {
          slide.bulletPoints.forEach(bp => {
            mdContent += `- ${bp}\n`;
          });
          mdContent += `\n`;
        }
        
        // Fetch comments for this slide
        try {
          const res = await fetch(`/api/comments?slideId=${slide.id}&t=${Date.now()}`, { cache: "no-store" });
          if (res.ok) {
            const data = await res.json();
            if (data.comments && data.comments.length > 0) {
              mdContent += `### Audience Comments\n`;
              data.comments.forEach((rawC: string | CommentData) => {
                let c = rawC;
                if (typeof rawC === 'string' && rawC.trim().startsWith('{')) {
                  try { c = JSON.parse(rawC); } catch (e) {}
                }
                const isLegacy = typeof c === 'string';
                const name = isLegacy ? (c as string).split(': ')[0] : (c as CommentData).name;
                const text = isLegacy ? (c as string).substring((c as string).indexOf(': ') + 2) : (c as CommentData).text;
                const timestamp = isLegacy ? '' : ` (${new Date((c as CommentData).timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;
                mdContent += `> **${name}**${timestamp}: ${text}\n\n`;
              });
            }
          }
        } catch (e) {
          console.error("Failed to fetch comments for slide", slide.id);
        }
        
        mdContent += `---\n\n`;
      }

      const blob = new Blob([mdContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'presentation.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-zinc-800/80 hover:bg-zinc-700 text-white rounded-full backdrop-blur transition-all border border-zinc-700 shadow-lg"
      >
        <Download size={18} />
        <span className="text-sm font-medium">Export</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50">
          <button
            onClick={exportPDF}
            disabled={isExporting}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-200 hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {isExporting ? <Loader2 size={16} className="animate-spin" /> : <FileDown size={16} className="text-red-400" />}
            Download PDF
          </button>
          <div className="h-px bg-zinc-800 w-full" />
          <button
            onClick={exportMarkdown}
            disabled={isExporting}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-200 hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            {isExporting ? <Loader2 size={16} className="animate-spin" /> : <FileText size={16} className="text-blue-400" />}
            Export Markdown
          </button>
        </div>
      )}

      {pdfData.ready && createPortal(
        <>
          <style dangerouslySetInnerHTML={{__html: `
            @media print {
              body > *:not(#pdf-export-container):not(script):not(style) {
                display: none !important;
              }
              body {
                margin: 0 !important;
                padding: 0 !important;
                background: black !important;
              }
              #pdf-export-container {
                position: static !important;
                width: 100% !important;
                display: block !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .print-slide {
                width: 100% !important;
                height: 100vh !important;
                page-break-after: always !important;
                break-after: page !important;
                box-sizing: border-box !important;
              }
              .print-appendix {
                width: 100% !important;
                min-height: 100vh !important;
                height: auto !important;
                box-sizing: border-box !important;
              }
              @page {
                size: landscape;
                margin: 0;
              }
            }
          `}} />
          <div id="pdf-export-container" className="fixed left-[-9999px] top-0 w-[1200px] bg-black flex flex-col">
          {slides.map((slide) => (
            <div key={slide.id} className="print-slide relative w-[1200px] h-[675px] flex items-center justify-center px-12 bg-black shrink-0">
              <div className="w-full h-full relative">
                <Slide data={slide} isPrint={true} />
              </div>
            </div>
          ))}

          <div className="print-appendix relative w-[1200px] min-h-[675px] p-16 bg-zinc-950 text-white flex flex-col items-center shrink-0">
            <h1 className="text-4xl font-bold mb-12 text-indigo-400">Audience Comments Appendix</h1>
            <div className="w-full max-w-4xl flex flex-col gap-8">
              {Object.keys(pdfData.comments).length > 0 ? (
                Object.entries(pdfData.comments).map(([title, comments]) => (
                  <div key={title} className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800" style={{ pageBreakInside: 'avoid' }}>
                    <h2 className="text-2xl font-bold mb-6 text-zinc-200">{title}</h2>
                    <div className="space-y-4">
                      {comments.map((rawC, i) => {
                        let c = rawC;
                        if (typeof rawC === 'string' && rawC.trim().startsWith('{')) {
                          try { c = JSON.parse(rawC); } catch (e) {}
                        }
                        const isLegacy = typeof c === 'string';
                        const name = isLegacy ? (c as string).split(': ')[0] : (c as CommentData).name;
                        const text = isLegacy ? (c as string).substring((c as string).indexOf(': ') + 2) : (c as CommentData).text;
                        const timestamp = isLegacy ? null : new Date((c as CommentData).timestamp);
                        
                        return (
                          <div key={isLegacy ? i : (c as CommentData).id} className="text-zinc-400 text-lg leading-relaxed">
                            <span className="font-bold text-zinc-300">{name}</span>
                            {timestamp && (
                              <span className="text-sm text-zinc-500 ml-2 font-mono">
                                {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            )}
                            <span className="mx-3 text-zinc-600">•</span>
                            {text}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-zinc-500 text-2xl italic text-center py-20 bg-zinc-900/30 rounded-2xl border border-zinc-800/50">
                  No audience comments found for this presentation.
                </div>
              )}
            </div>
          </div>
        </div>
        </>,
        document.body
      )}
    </div>
  );
}
