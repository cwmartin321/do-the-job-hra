"use client";
import { motion } from "framer-motion";
import { SlideData } from "@/config/slides";

export function Slide({ data, isPrint = false }: { data: SlideData; isPrint?: boolean }) {
  if (isPrint) {
    return (
      <div className="flex flex-col h-full w-full p-16 bg-zinc-900 text-zinc-100 rounded-3xl shadow-2xl border border-zinc-800/50">
        <div className="flex-1">
          <h2 className="text-6xl font-extrabold mb-8 text-white tracking-tight">
            {data.title}
          </h2>
          <p className="text-3xl text-zinc-300 leading-relaxed mb-12 font-light">
            {data.body}
          </p>
          
          {data.bulletPoints && (
            <ul className="space-y-6">
              {data.bulletPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start text-2xl text-zinc-400"
                >
                  <span className="mr-4 text-indigo-500 mt-1">✦</span>
                  {point}
                </li>
              ))}
            </ul>
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
      className="flex flex-col h-full w-full p-16 bg-zinc-900 text-zinc-100 rounded-3xl shadow-2xl border border-zinc-800/50"
    >
      <div className="flex-1">
        <h2 className="text-6xl font-extrabold mb-8 text-white tracking-tight">
          {data.title}
        </h2>
        <p className="text-3xl text-zinc-300 leading-relaxed mb-12 font-light">
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
                className="flex items-start text-2xl text-zinc-400"
              >
                <span className="mr-4 text-indigo-500 mt-1">✦</span>
                {point}
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
