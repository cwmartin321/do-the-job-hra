"use client";
import { motion } from "framer-motion";
import { SlideData } from "@/config/slides";
import GanttChart from "./GanttChart";

export function Slide({ data, isPrint = false }: { data: SlideData; isPrint?: boolean }) {
  if (isPrint) {
    return (
      <div className="flex flex-col h-full w-full p-16 bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(12,19,58,0.1)] border border-[var(--color-brand-navy)]/5">
        <div className="flex-1">
          <h2 className="text-6xl font-montserrat font-bold mb-8 text-[var(--color-brand-navy)] tracking-tight">
            {data.title}
          </h2>
          <p className="text-3xl font-satoshi text-[var(--color-brand-navy-light)] leading-relaxed mb-12 font-medium">
            {data.body}
          </p>
          
          {data.bulletPoints && (
            <ul className="space-y-6">
              {data.bulletPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start text-2xl font-satoshi text-[var(--color-brand-navy-light)] font-medium"
                >
                  <span className="mr-4 text-[var(--color-brand-gold)] mt-1 font-bold">✦</span>
                  {point}
                </li>
              ))}
            </ul>
          )}

          {data.component === "GanttChart" && (
            <div className="mt-8">
              <GanttChart />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col h-full w-full p-16 bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(12,19,58,0.1)] border border-[var(--color-brand-navy)]/5"
    >
      <div className="flex-1">
        <h2 className="text-6xl font-montserrat font-bold mb-8 text-[var(--color-brand-navy)] tracking-tight">
          {data.title}
        </h2>
        <p className="text-3xl font-satoshi text-[var(--color-brand-navy-light)] leading-relaxed mb-12 font-medium">
          {data.body}
        </p>
        
        {data.bulletPoints && (
          <ul className="space-y-6">
            {data.bulletPoints.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-start text-2xl font-satoshi text-[var(--color-brand-navy-light)] font-medium"
              >
                <span className="mr-4 text-[var(--color-brand-gold)] mt-1 font-bold">✦</span>
                {point}
              </motion.li>
            ))}
          </ul>
        )}

        {data.component === "GanttChart" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GanttChart />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
