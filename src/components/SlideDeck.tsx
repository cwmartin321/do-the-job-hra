"use client";
import { useState, useEffect, useCallback } from "react";
import { slides } from "@/config/slides";
import { Slide } from "./Slide";
import { InteractionPanel } from "./InteractionPanel";
import { ExportMenu } from "./ExportMenu";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export function SlideDeck() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? prev : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? prev : prev - 1));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't change slides if user is typing in the comment input
      if (document.activeElement?.tagName === "INPUT") return;
      
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlide = slides[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--background)] overflow-hidden relative">
      <div className="absolute top-6 right-6 z-50">
        <ExportMenu />
      </div>

      {/* Main presentation area */}
      <div className="relative w-full max-w-[1200px] aspect-[16/9] mx-auto flex items-center justify-center px-12">
        <div id="presentation-container" className="w-full h-full relative">
          <AnimatePresence mode="wait">
            <Slide key={currentSlide.id} data={currentSlide} />
          </AnimatePresence>
        </div>

        <div className="absolute inset-y-0 left-0 flex items-center px-4 opacity-30 hover:opacity-100 transition-opacity z-40">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-[var(--color-brand-navy)]/5 text-[var(--color-brand-navy)] hover:bg-[var(--color-brand-navy)]/10 disabled:opacity-30 backdrop-blur-md transition-all hover:scale-110"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 opacity-30 hover:opacity-100 transition-opacity z-40">
          <button
            onClick={nextSlide}
            disabled={currentIndex === slides.length - 1}
            className="p-2 rounded-full bg-[var(--color-brand-navy)]/5 text-[var(--color-brand-navy)] hover:bg-[var(--color-brand-navy)]/10 disabled:opacity-30 backdrop-blur-md transition-all hover:scale-110"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Interaction Panel (positioned below bottom right) */}
      <div className="absolute bottom-12 right-0 w-full max-w-[1200px] left-1/2 -translate-x-1/2 z-50 px-12 flex justify-end">
         <div className="w-auto">
           <InteractionPanel slideId={currentSlide.id} />
         </div>
      </div>
      
      {/* Slide Progress */}
      <div className="absolute bottom-4 left-0 w-full px-12 flex justify-between text-[var(--color-brand-navy-light)] font-satoshi font-medium text-sm z-30 pointer-events-none opacity-60">
        <span>do-the-job-hra</span>
        <span>{currentIndex + 1} / {slides.length}</span>
      </div>
      
      {/* Progress bar at very bottom */}
      <div className="absolute bottom-0 left-0 h-1.5 bg-[var(--color-brand-seafoam-light)]/40 w-full z-30">
        <div 
          className="h-full bg-[var(--color-brand-seafoam)] transition-all duration-300 ease-out shadow-[0_0_10px_var(--color-brand-seafoam)]" 
          style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
