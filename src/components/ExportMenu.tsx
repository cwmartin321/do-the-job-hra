"use client";
import { useState } from "react";
import { Download, FileText, FileDown, Loader2 } from "lucide-react";
import { slides } from "@/config/slides";

export function ExportMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const exportPDF = async () => {
    setIsExporting(true);
    try {
      // Dynamically import html2pdf.js only on the client side
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.getElementById("presentation-container");
      
      const opt = {
        margin: 0,
        filename: 'presentation.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'in', format: '16by9', orientation: 'landscape' }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("Failed to export PDF", err);
      alert("Failed to export PDF. See console for details.");
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
          const res = await fetch(`/api/comments?slideId=${slide.id}`);
          if (res.ok) {
            const data = await res.json();
            if (data.comments && data.comments.length > 0) {
              mdContent += `### Audience Comments\n`;
              data.comments.forEach((c: string) => {
                mdContent += `> ${c}\n\n`;
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
    </div>
  );
}
