import React from 'react';
import { Sun, Moon, Coffee, CheckCircle2, Clock } from 'lucide-react';

export const ShiftDissection: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3.5 sm:p-5 shadow-xs space-y-3.5 sm:space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight uppercase">
              Granular Shift Dissection · 7 Operational Components
            </h3>
            <span className="text-[10px] sm:text-[11px] font-semibold text-blue-700 bg-blue-50 px-1.5 sm:px-2 py-0.5 rounded border border-blue-100 font-mono">
              10.5-Hour Shift Proof
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Full operational breakdown across morning mise en place, service rush, sanitization, and shutdown.
          </p>
        </div>

        {/* Total Working Hours Badge */}
        <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs self-start sm:self-auto">
          <span className="text-slate-500">Working Hours:</span>
          <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            10.5 hrs
          </span>
          <span className="text-slate-400 font-sans">+ 1.5h unpaid break</span>
        </div>
      </div>

      {/* Why This Matters Callout Banner */}
      <div className="p-3 sm:p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start gap-2.5 sm:gap-3">
        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
          i
        </div>
        <div className="text-[11px] sm:text-xs leading-relaxed">
          <strong className="text-blue-950 font-bold block mb-0.5">
            Why this matters:
          </strong>
          <span className="text-blue-900">
            It shows management where the hours go and proves that{' '}
            <strong className="font-bold">10.5 hours is a structural reality, not slacking</strong>.
            4.75h lunch (with cleaning to 16:30) + 5.75h dinner (with shutdown to 23:45) = exactly 10.5 hours.
          </span>
        </div>
      </div>

      {/* 3 Natural Operational Blocks (Lunch, Break, Dinner) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 pt-1">
        
        {/* Block 1: Morning & Lunch Shift */}
        <div className="md:col-span-5 bg-slate-50/70 rounded-xl border border-slate-200 p-3 sm:p-4 space-y-2.5 sm:space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Sun className="w-4 h-4 text-blue-800" />
              <span>Lunch Shift</span>
            </div>
            <span className="font-mono text-[11px] sm:text-xs font-bold text-blue-900 bg-white px-2 py-0.5 rounded border border-slate-200">
              11:45 – 16:30 (4.75 hrs)
            </span>
          </div>

          <div className="space-y-2">
            {/* Phase 1 */}
            <div className="p-2 sm:p-2.5 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-900 flex items-center gap-1.5 text-[11px] sm:text-xs">
                  <span className="w-4 h-4 rounded-full bg-blue-900 text-white text-[10px] flex items-center justify-center font-bold">1</span>
                  Morning Mise en Place
                </span>
                <span className="font-mono text-blue-700 text-[10px] sm:text-[11px]">11:45–12:30 (45m / 0.75h)</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-snug">
                Station setup, food prep, stock organization, and general mise en place for opening service.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="p-2 sm:p-2.5 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-900 flex items-center gap-1.5 text-[11px] sm:text-xs">
                  <span className="w-4 h-4 rounded-full bg-blue-900 text-white text-[10px] flex items-center justify-center font-bold">2</span>
                  Lunch Service
                </span>
                <span className="font-mono text-blue-700 text-[10px] sm:text-[11px]">12:30–15:30 (3.0h)</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-snug">
                Active kitchen service, order preparation, line cooking, and station operations.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="p-2 sm:p-2.5 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-900 flex items-center gap-1.5 text-[11px] sm:text-xs">
                  <span className="w-4 h-4 rounded-full bg-blue-900 text-white text-[10px] flex items-center justify-center font-bold">3</span>
                  Station Reset &amp; Clean
                </span>
                <span className="font-mono text-blue-700 text-[10px] sm:text-[11px]">15:30–16:30 (1.0h)</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-snug">
                Post-service cleanup, station reset, food storage, and kitchen turnover until 16:30.
              </p>
            </div>
          </div>
        </div>

        {/* Block 2: Mandatory Split Break */}
        <div className="md:col-span-2 bg-blue-50/50 rounded-xl border border-dashed border-blue-300 p-3 sm:p-4 flex flex-col justify-between text-center">
          <div>
            <div className="flex items-center justify-center gap-1 text-xs font-bold text-blue-900 pb-2 border-b border-blue-200">
              <Coffee className="w-3.5 h-3.5 text-blue-700" />
              <span>Split Break</span>
            </div>

            <div className="mt-2.5 sm:mt-3">
              <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-800 text-xs font-bold inline-flex items-center justify-center">
                4
              </span>
              <div className="font-bold text-xs text-blue-950 mt-1">Afternoon Intermission</div>
              <div className="font-mono text-xs font-semibold text-blue-700 mt-0.5">
                16:30 – 18:00
              </div>
              <div className="font-mono text-[11px] text-blue-600 font-bold mt-0.5">
                (1.5 hrs Unpaid)
              </div>
            </div>
          </div>

          <p className="text-[10px] sm:text-[11px] text-slate-500 leading-snug mt-2.5 sm:mt-3 pt-2 border-t border-blue-200/60">
            Mandatory off-duty split-shift intermission. Staff vacate kitchen stations for rest before evening dinner.
          </p>
        </div>

        {/* Block 3: Dinner Service & Shutdown */}
        <div className="md:col-span-5 bg-slate-50/70 rounded-xl border border-slate-200 p-3 sm:p-4 space-y-2.5 sm:space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Moon className="w-4 h-4 text-blue-900" />
              <span>Dinner Shift</span>
            </div>
            <span className="font-mono text-[11px] sm:text-xs font-bold text-blue-900 bg-white px-2 py-0.5 rounded border border-slate-200">
              18:00 – 23:45 (5.75 hrs)
            </span>
          </div>

          <div className="space-y-2">
            {/* Phase 5 */}
            <div className="p-2 sm:p-2.5 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-900 flex items-center gap-1.5 text-[11px] sm:text-xs">
                  <span className="w-4 h-4 rounded-full bg-blue-900 text-white text-[10px] flex items-center justify-center font-bold">5</span>
                  Dinner Prep &amp; Briefing
                </span>
                <span className="font-mono text-blue-700 text-[10px] sm:text-[11px]">18:00–19:00 (1.0h)</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-snug">
                Evening station prep, ingredient replenishment, line readiness, and dinner setup.
              </p>
            </div>

            {/* Phase 6 */}
            <div className="p-2 sm:p-2.5 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-900 flex items-center gap-1.5 text-[11px] sm:text-xs">
                  <span className="w-4 h-4 rounded-full bg-blue-900 text-white text-[10px] flex items-center justify-center font-bold">6</span>
                  Dinner Service
                </span>
                <span className="font-mono text-blue-700 text-[10px] sm:text-[11px]">19:00–22:30 (3.5h)</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-snug">
                Dinner service execution, line cooking, order fulfillment, and kitchen station flow.
              </p>
            </div>

            {/* Phase 7 */}
            <div className="p-2 sm:p-2.5 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-900 flex items-center gap-1.5 text-[11px] sm:text-xs">
                  <span className="w-4 h-4 rounded-full bg-blue-900 text-white text-[10px] flex items-center justify-center font-bold">7</span>
                  Shutdown &amp; Cleaning
                </span>
                <span className="font-mono text-blue-700 text-[10px] sm:text-[11px]">22:30–23:45 (1.25h)</span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-snug">
                End-of-day sanitation, equipment cleaning, waste disposal, and kitchen closing procedures.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
