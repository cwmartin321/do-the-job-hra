"use client";
import { motion } from "framer-motion";
import { SlideData } from "@/config/slides";
import GanttChart from "./GanttChart";
import * as LucideIcons from "lucide-react";
import React from "react";

// Text parser for ~~cursive~~ and *gold*
const parseText = (text: string) => {
  const parts = text.split(/(~~.*?~~|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('~~') && part.endsWith('~~')) {
      return (
        <span key={i} className="text-[var(--color-brand-seafoam)] inline-block">
          {part.slice(2, -2)}
        </span>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <span key={i} className="text-[var(--color-brand-gold)] font-bold">
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });
};

const Icon = ({ name, className }: { name?: string; className?: string }) => {
  if (!name) return null;
  const LucideIcon = (LucideIcons as any)[name];
  return LucideIcon ? <LucideIcon className={className} /> : null;
};

// Sub-components for Layouts
const IconGrid = ({ items }: { items: SlideData['iconGridItems'] }) => (
  <div className="grid grid-cols-2 gap-x-8 gap-y-12 flex-1 min-h-0 items-center justify-center">
    {items?.map((item, i) => (
      <motion.div 
        key={i} 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 + i * 0.1 }}
        className="flex items-start gap-5"
      >
        <div className="w-16 h-16 rounded-full bg-[var(--color-brand-seafoam-light)]/30 flex items-center justify-center shrink-0 shadow-sm border border-[var(--color-brand-seafoam)]/20">
          <Icon name={item.icon} className="w-8 h-8 text-[var(--color-brand-navy)]" />
        </div>
        <div>
          <h4 className="text-xl font-montserrat font-bold text-[var(--color-brand-navy)] mb-2">{item.title}</h4>
          <p className="font-satoshi text-[var(--color-brand-navy-light)] leading-relaxed">{item.text}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

const ProcessList = ({ steps }: { steps: SlideData['processSteps'] }) => (
  <div className="flex flex-col gap-4 flex-1 min-h-0 justify-center px-8">
    {steps?.map((step, i) => (
      <motion.div 
        key={i}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 + i * 0.1 }}
        className="flex items-start gap-5 relative"
      >
        {i !== steps.length - 1 && (
          <div className="absolute left-5 top-12 bottom-[-1rem] w-0.5 bg-gray-200 z-0" />
        )}
        <div className="w-10 h-10 rounded-xl bg-[var(--color-brand-blue)] flex items-center justify-center shrink-0 z-10 shadow-md">
          <Icon name={step.icon} className="w-5 h-5 text-white" />
        </div>
        <div className="bg-[#F9F9F9] border border-gray-100 rounded-2xl p-4 flex-1 shadow-sm">
          <h4 className="text-base font-montserrat font-bold text-[var(--color-brand-navy)] mb-1">{step.title}</h4>
          <p className="font-satoshi text-[var(--color-brand-navy-light)] leading-relaxed text-sm">{step.description}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

const StatsGrid = ({ stats }: { stats: SlideData['stats'] }) => (
  <div className="grid grid-cols-2 gap-8 flex-1 min-h-0 items-center justify-center">
    {stats?.map((stat, i) => (
      <motion.div 
        key={i}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 + i * 0.1 }}
        className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-brand-seafoam)]" />
        <div className="text-5xl font-montserrat font-black text-[var(--color-brand-gold)] mb-4">{stat.value}</div>
        <p className="text-lg font-satoshi text-[var(--color-brand-navy)] font-medium leading-relaxed">{stat.label}</p>
      </motion.div>
    ))}
  </div>
);

const SplitLayout = ({ content, bulletPoints }: { content: SlideData['splitContent'], bulletPoints: SlideData['bulletPoints'] }) => (
  <div className="flex gap-12 flex-1 min-h-0 items-center">
    <div className="flex-1">
      {bulletPoints && (
        <ul className="space-y-6">
          {bulletPoints.map((point, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-start text-xl font-satoshi text-[var(--color-brand-navy-light)] font-medium"
            >
              <span className="mr-4 text-[var(--color-brand-gold)] mt-1 font-bold">✦</span>
              {parseText(point)}
            </motion.li>
          ))}
        </ul>
      )}
    </div>
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="flex-1 bg-[var(--color-brand-navy)] rounded-3xl p-12 flex flex-col items-center justify-center text-center shadow-xl relative overflow-hidden"
    >
      {/* Decorative background element */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-white opacity-5 rounded-full blur-2xl" />
      
      <Icon name={content?.icon} className="w-24 h-24 text-[var(--color-brand-seafoam)] mb-6 relative z-10" />
      <h3 className="text-3xl font-montserrat font-bold text-white leading-tight relative z-10">{content?.sideText}</h3>
    </motion.div>
  </div>
);

const DefaultBullets = ({ bulletPoints }: { bulletPoints: SlideData['bulletPoints'] }) => (
  <div className="flex-1 flex flex-col justify-center">
    {bulletPoints && (
      <ul className="space-y-6">
        {bulletPoints.map((point, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="flex items-start text-2xl font-satoshi text-[var(--color-brand-navy-light)] font-medium"
          >
            <span className="mr-4 text-[var(--color-brand-gold)] mt-1 font-bold">✦</span>
            <span>{parseText(point)}</span>
          </motion.li>
        ))}
      </ul>
    )}
  </div>
);


export function Slide({ data, isPrint = false }: { data: SlideData; isPrint?: boolean }) {
  const isGantt = data.component === "GanttChart";
  
  const content = (
    <div className="flex-1 flex flex-col min-h-0">
      <h2 className={`whitespace-pre-line font-montserrat font-bold text-[var(--color-brand-navy)] tracking-tight ${isGantt ? 'text-4xl mb-2 shrink-0' : 'text-5xl mb-6 shrink-0'}`}>
        {parseText(data.title)}
      </h2>
      <p className={`whitespace-pre-line font-satoshi text-[var(--color-brand-navy-light)] leading-relaxed font-medium ${isGantt ? 'text-xl mb-4 shrink-0' : 'text-2xl mb-12 shrink-0'}`}>
        {parseText(data.body)}
      </p>
      
      {data.layout === 'icon-grid' && <IconGrid items={data.iconGridItems} />}
      {data.layout === 'process' && <ProcessList steps={data.processSteps} />}
      {data.layout === 'stats' && <StatsGrid stats={data.stats} />}
      {data.layout === 'split' && <SplitLayout content={data.splitContent} bulletPoints={data.bulletPoints} />}
      {(!data.layout || data.layout === 'default') && !isGantt && <DefaultBullets bulletPoints={data.bulletPoints} />}

      {isGantt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-2 flex-1 min-h-0"
        >
          <GanttChart />
        </motion.div>
      )}
    </div>
  );

  if (isPrint) {
    return (
      <div className={`flex flex-col h-full w-full ${isGantt ? 'px-12 py-8' : 'p-16'} bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(12,19,58,0.1)] border border-[var(--color-brand-navy)]/5`}>
        {content}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex flex-col h-full w-full ${isGantt ? 'px-12 py-8' : 'p-16'} bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(12,19,58,0.1)] border border-[var(--color-brand-navy)]/5 relative overflow-hidden`}
    >
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-brand-seafoam-light)] opacity-[0.15] rounded-bl-full pointer-events-none" />
      {content}
    </motion.div>
  );
}
