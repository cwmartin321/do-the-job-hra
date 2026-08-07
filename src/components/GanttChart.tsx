"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
type Task = {
  id: string;
  name: string;
  phase: string;
  startWeek: number; // 1 through 8
  duration: number; // Number of weeks the task spans
  color: string; // Tailwind background color class
  details: string;
  owner?: string;
};

export default function GanttChart() {
  // You can easily edit these tasks, adjust durations, or change colors here.
  const tasks: Task[] = [
    { id: '1', name: 'Project Kickoff & Alignment', phase: 'Initiation', startWeek: 1, duration: 1, color: 'bg-[var(--color-brand-navy)]', details: "Aligning on project scope, timeline, and key stakeholders to ensure smooth execution.", owner: "VP of Total Rewards & Impl. Manager" },
    { id: '2', name: 'Goal Setting & Philosophy', phase: 'Assessment', startWeek: 1, duration: 2, color: 'bg-[var(--color-brand-blue)]', details: "Defining success metrics and establishing the philosophy for evaluating pay equity.", owner: "VP of Total Rewards" },
    { id: '3', name: 'HRIS Integration', phase: 'Data', startWeek: 2, duration: 2, color: 'bg-[var(--color-brand-seafoam)]', details: "Connecting, extracting, formatting, and verifying demographic and compensation data from the HRIS.", owner: "HRIS / IT" },
    { id: '4', name: 'Configuration & Job Classification', phase: 'Configuration', startWeek: 3, duration: 2, color: 'bg-[var(--color-brand-gold)]', details: "Setting up the platform architecture and mapping internal employee and job data.", owner: "Implementation Manager" },
    { id: '5', name: 'Methodology Enablement', phase: 'Education', startWeek: 4, duration: 1, color: 'bg-[var(--color-brand-navy-light)]', details: "Educating the team on the underlying statistical methodologies used in the software.", owner: "End-Users & Impl. Manager" },
    { id: '6', name: 'Initial Regression Analysis', phase: 'Testing', startWeek: 4, duration: 3, color: 'bg-[var(--color-brand-blue)]', details: "Running preliminary regression models to identify potential pay disparities.", owner: "Implementation Manager" },
    { id: '7', name: 'Model Refinement, User Training & Process Development', phase: 'Deployment', startWeek: 6, duration: 2, color: 'bg-[var(--color-brand-seafoam)]', details: "Refining models based on initial findings and training users on system navigation.", owner: "End-Users" },
    { id: '8', name: 'Stabilization & Monitoring', phase: 'Post-Launch', startWeek: 8, duration: 1, color: 'bg-[var(--color-brand-gold)]', details: "Monitoring ongoing pay equity compliance and ensuring organizational readiness post-launch.", owner: "VP of Total Rewards & HRIS" },
  ];

  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null);

  const weeks = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden text-sm font-satoshi mt-2">

      {/* Header: Weeks */}
      <div className="grid grid-cols-12 bg-[#F9F9F9] border-b border-gray-200 py-1.5 text-[var(--color-brand-navy)] font-bold text-center text-xs shrink-0">
        <div className="col-span-4 text-left px-6">Project Phase & Activities</div>
        <div className="col-span-8 grid grid-cols-8">
          {weeks.map((week) => (
            <div key={`header-wk-${week}`}>Wk {week}</div>
          ))}
        </div>
      </div>

      {/* Body: Tasks */}
      <div className="divide-y divide-gray-100 flex-1 flex flex-col min-h-0">
        {tasks.map((task) => (
          <div key={task.id} className="grid grid-cols-12 items-center hover:bg-gray-50 transition-colors flex-1 min-h-0">

            {/* Task Name & Phase */}
            <div className="col-span-4 px-6 h-full flex justify-between items-center relative group z-20">
              <div className="flex flex-col justify-center max-w-[90%]">
                <span className="text-[11px] font-bold text-[var(--color-brand-navy-light)] uppercase tracking-wider mb-0.5">{task.phase}</span>
                <span className="font-medium text-[var(--color-brand-navy)] text-sm leading-tight">{task.name}</span>
              </div>

              <div
                className="relative flex items-center justify-center p-2 cursor-pointer"
                onMouseEnter={() => setHoveredTaskId(task.id)}
                onMouseLeave={() => setHoveredTaskId(null)}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-brand-seafoam)] animate-pulse shadow-[0_0_8px_rgba(87,204,153,0.6)]" />

                <AnimatePresence>
                  {hoveredTaskId === task.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-full ml-3 top-1/2 -translate-y-1/2 w-56 p-3 bg-white border border-gray-200 rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] z-50 pointer-events-none"
                    >
                      <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45" />
                      {task.owner && (
                        <div className="flex items-center gap-1.5 mb-2 border-b border-gray-100 pb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-brand-seafoam)]">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--color-brand-navy-light)]">{task.owner}</span>
                        </div>
                      )}
                      <p className="text-[var(--color-brand-navy)] text-xs font-medium leading-snug relative z-10">
                        {task.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Task Timeline Bar */}
            <div className="col-span-8 grid grid-cols-8 px-2 h-full items-center relative">
              {/* Background grid lines for visual guidance */}
              <div className="absolute inset-0 grid grid-cols-8 divide-x divide-gray-100 pointer-events-none">
                {weeks.map((w) => <div key={`bg-line-${w}`} />)}
              </div>

              {/* The actual colored Gantt bar */}
              <div
                className={`${task.color} h-5 rounded-md shadow-sm flex items-center px-3 text-white text-[10px] font-semibold relative z-10 transition-all duration-300 hover:opacity-90`}
                style={{
                  gridColumnStart: task.startWeek,
                  gridColumnEnd: `span ${task.duration}`
                }}
              >
                {/* Optional: Add text inside the bar, or leave it solid */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
