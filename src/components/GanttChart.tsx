import React from 'react';

type Task = {
  id: string;
  name: string;
  phase: string;
  startWeek: number; // 1 through 8
  duration: number; // Number of weeks the task spans
  color: string; // Tailwind background color class
};

export default function GanttChart() {
  // You can easily edit these tasks, adjust durations, or change colors here.
  const tasks: Task[] = [
    { id: '1', name: 'Project Kickoff & Alignment', phase: 'Initiation', startWeek: 1, duration: 1, color: 'bg-[var(--color-brand-navy)]' },
    { id: '2', name: 'Needs Mapping & Philosophy', phase: 'Assessment', startWeek: 1, duration: 2, color: 'bg-[var(--color-brand-blue)]' },
    { id: '3', name: 'HRIS Data Extraction', phase: 'Data', startWeek: 2, duration: 2, color: 'bg-[var(--color-brand-seafoam)]' },
    { id: '4', name: 'Configuration & Job Classification', phase: 'Configuration', startWeek: 3, duration: 2, color: 'bg-[var(--color-brand-gold)]' },
    { id: '5', name: 'Methodology Enablement', phase: 'Testing', startWeek: 4, duration: 2, color: 'bg-[var(--color-brand-navy-light)]' },
    { id: '6', name: 'Initial Regression Analysis', phase: 'Training', startWeek: 5, duration: 3, color: 'bg-[var(--color-brand-blue)]' },
    { id: '7', name: 'Model Refinement, User Training & Process Development', phase: 'Deployment', startWeek: 8, duration: 1, color: 'bg-[var(--color-brand-seafoam)]' },
    { id: '8', name: 'Stabilization & Monitoring', phase: 'Post-Launch', startWeek: 8, duration: 1, color: 'bg-[var(--color-brand-gold)]' },
  ];

  const weeks = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden text-sm font-satoshi mt-8">
      
      {/* Header: Weeks */}
      <div className="grid grid-cols-12 bg-[#F9F9F9] border-b border-gray-200 py-3 text-[var(--color-brand-navy)] font-bold text-center">
        <div className="col-span-4 text-left px-6">Project Phase & Activities</div>
        <div className="col-span-8 grid grid-cols-8">
          {weeks.map((week) => (
            <div key={`header-wk-${week}`}>Wk {week}</div>
          ))}
        </div>
      </div>

      {/* Body: Tasks */}
      <div className="divide-y divide-gray-100">
        {tasks.map((task) => (
          <div key={task.id} className="grid grid-cols-12 items-center hover:bg-gray-50 transition-colors">
            
            {/* Task Name & Phase */}
            <div className="col-span-4 px-6 py-4 flex flex-col justify-center">
              <span className="text-[10px] font-bold text-[var(--color-brand-navy-light)] uppercase tracking-wider mb-1">{task.phase}</span>
              <span className="font-medium text-[var(--color-brand-navy)]">{task.name}</span>
            </div>

            {/* Task Timeline Bar */}
            <div className="col-span-8 grid grid-cols-8 px-2 py-4 h-full items-center relative">
              {/* Background grid lines for visual guidance */}
              <div className="absolute inset-0 grid grid-cols-8 divide-x divide-gray-100 pointer-events-none">
                {weeks.map((w) => <div key={`bg-line-${w}`} />)}
              </div>

              {/* The actual colored Gantt bar */}
              <div
                className={`${task.color} h-8 rounded-md shadow-sm flex items-center px-3 text-white text-xs font-semibold relative z-10 transition-all duration-300 hover:opacity-90`}
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
