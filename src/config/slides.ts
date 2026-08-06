export type SlideData = {
  id: string;
  title: string;
  body: string;
  bulletPoints?: string[];
};

export const slides: SlideData[] = [
  {
    id: "slide-1-intro",
    title: "Welcome to the Presentation",
    body: "This is a Next.js App Router powered slide deck designed for a high-stakes corporate interview.",
    bulletPoints: [
      "Built with React and Tailwind CSS",
      "Interactive features powered by Upstash Redis",
      "Fully responsive and exportable to PDF/Markdown",
    ],
  },
  {
    id: "slide-2-architecture",
    title: "Project Architecture",
    body: "A modern, standalone approach to web presentations.",
    bulletPoints: [
      "Vercel Edge Functions for fast API responses",
      "Tailwind for pixel-perfect styling",
      "Framer Motion for smooth slide transitions",
    ],
  },
  {
    id: "slide-3-interactivity",
    title: "Real-Time Interactivity",
    body: "Engage your audience with live feedback loops.",
    bulletPoints: [
      "Upstash Redis for low-latency state persistence",
      "Anonymous slide reactions (thumbs up, applause)",
      "Slide-specific comment threads",
    ],
  },
  {
    id: "slide-4-export",
    title: "Export Capabilities",
    body: "Take your presentation with you.",
    bulletPoints: [
      "Client-side PDF generation using html2pdf.js",
      "Markdown export of configuration and audience feedback",
      "Print media queries for physical handouts",
    ],
  },
];
