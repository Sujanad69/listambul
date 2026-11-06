/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Printer, Copy, Check, Clock, Calendar, Shield, ArrowUpRight } from 'lucide-react';
import { GanttTimeline } from './components/GanttTimeline';
import { ShiftDissection } from './components/ShiftDissection';
import { ScheduleMatrixTable } from './components/ScheduleMatrixTable';

type ViewMode = 'all' | 'standard' | 'busy' | 'peak';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `SCHEDULE RECONCILIATION PROPOSAL (December 2026 Trial)
TO: Ege & Celine (Management) | FROM: Kitchen Staff Team
Standard Baseline: 47.0 hrs (+7.0h overtime vs 40h cap)
Busy Conditions: 51.25 hrs (+11.25h overtime)
Peak Events: 54.75 hrs (+14.75h overtime)
Rest Days: Wednesdays & Thursdays (Closed)
Governing Law: Portuguese Labor Code (Arts. 198, 202, 268)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans py-3 sm:py-6 md:py-8 px-2 sm:px-4 md:px-8">
      {/* Centered Document Sheet (1-Page Executive Format, Mobile-Optimized) */}
      <div className="max-w-5xl mx-auto bg-white border border-slate-200/90 rounded-xl sm:rounded-2xl shadow-xs p-3.5 sm:p-6 md:p-10 space-y-5 sm:space-y-8 print-container">
        
        {/* Document Header & Metadata */}
        <header className="border-b border-slate-200 pb-4 sm:pb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
            <div>
              <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                <span>Official Memorandum</span>
                <span>·</span>
                <span>Listambul Turkish Restaurant</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
                SCHEDULE RECONCILIATION PROPOSAL
              </h1>
              <div className="text-xs text-slate-500 font-medium mt-0.5">
                Campo de Santa Clara, Lisboa · Trial Period (December 2026)
              </div>
            </div>

            {/* Print & Copy Actions (Mobile-Touch Friendly) */}
            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 no-print pt-1 sm:pt-0">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors active:scale-95"
                title="Copy proposal summary"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-2xs active:scale-95"
                title="Print document"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print PDF</span>
              </button>
            </div>
          </div>

          {/* Minimal 4-field metadata grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-4 sm:mt-6 pt-3.5 sm:pt-5 border-t border-slate-100 text-xs">
            <div>
              <span className="text-slate-400 font-medium block text-[10px] sm:text-[11px]">TO:</span>
              <span className="font-semibold text-slate-800 text-[11px] sm:text-xs">Ege &amp; Celine (Mgmt)</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block text-[10px] sm:text-[11px]">FROM:</span>
              <span className="font-semibold text-slate-800 text-[11px] sm:text-xs">Kitchen Staff Team</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block text-[10px] sm:text-[11px]">DATE:</span>
              <span className="font-semibold text-slate-800 text-[11px] sm:text-xs">Dec 2026 Trial</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium block text-[10px] sm:text-[11px]">SUBJECT:</span>
              <span className="font-semibold text-blue-700 text-[11px] sm:text-xs">Schedule Alignment</span>
            </div>
          </div>
        </header>

        {/* 1. Executive Summary & Legal Context */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-900">
              1. Executive Summary &amp; Legal Context
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We welcome management’s trial schedule for December 2026, granting two consecutive rest days (Wednesdays &amp; Thursdays).
            To ensure transparent operation during this trial, we present this proposal aligning real kitchen working hours with
            statutory standards under the Portuguese Labor Code (<em className="italic">Código do Trabalho</em>).
          </p>

          {/* 3 Clean Infographic Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1">
            <div className="p-3 sm:p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
              <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Statutory Benchmark
              </span>
              <div className="flex items-baseline gap-1 mt-0.5 sm:mt-1 font-mono">
                <span className="text-xl sm:text-2xl font-bold text-slate-900">40.0</span>
                <span className="text-xs text-slate-500">hrs/week</span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 sm:mt-1 block font-sans">
                Art. 198 (Legal standard cap)
              </span>
            </div>

            <div className="p-3 sm:p-4 bg-blue-50/50 border border-blue-200/80 rounded-xl">
              <span className="text-[10px] sm:text-[11px] font-semibold text-blue-700 uppercase tracking-wider block">
                Baseline Planned Hours
              </span>
              <div className="flex items-baseline gap-1 mt-0.5 sm:mt-1 font-mono">
                <span className="text-xl sm:text-2xl font-bold text-blue-900">47.0</span>
                <span className="text-xs text-blue-700">hrs/week</span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-blue-600 mt-0.5 sm:mt-1 block font-sans">
                5 working days · 2 rest days
              </span>
            </div>

            <div className="p-3 sm:p-4 bg-blue-50/80 border border-blue-200 rounded-xl">
              <span className="text-[10px] sm:text-[11px] font-semibold text-blue-800 uppercase tracking-wider block">
                Statutory Overtime
              </span>
              <div className="flex items-baseline gap-1 mt-0.5 sm:mt-1 font-mono">
                <span className="text-xl sm:text-2xl font-bold text-blue-700">+7.0</span>
                <span className="text-xs text-blue-700">hrs/week</span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-blue-600 mt-0.5 sm:mt-1 block font-sans">
                Scales to +11.25h / +14.75h in peak
              </span>
            </div>
          </div>
        </section>

        {/* 2. Shift Breakdown Under Varying Operational Conditions */}
        <section className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-900">
                2. Shift Breakdown Under Varying Operational Conditions
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                Work starts with daily prep (11:00 or 11:45 AM) and finishes following service shutdown and sanitization (23:45). Overtime is calculated against the 40-hour legal cap (Art. 198).
              </p>
            </div>

            {/* Interactive View Filter Buttons with Clean Minimalist Blue & White Affordance */}
            <div className="w-full sm:w-auto max-w-full no-print">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                <span>Select Scenario to View:</span>
              </div>
              <div className="grid grid-cols-2 sm:flex sm:flex-row w-full sm:w-auto p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs gap-1.5 sm:gap-1.5">
                {/* 1. All Conditions */}
                <button
                  type="button"
                  onClick={() => setViewMode('all')}
                  className={`w-full sm:w-auto px-3 py-2 rounded-lg transition-all font-semibold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border ${
                    viewMode === 'all'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50/60 hover:border-blue-300 hover:text-blue-700 shadow-2xs'
                  }`}
                  title="Click to view all 3 conditions together"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${viewMode === 'all' ? 'bg-white' : 'bg-slate-300'}`}></span>
                  <span>All Conditions</span>
                </button>

                {/* 2. Standard Baseline */}
                <button
                  type="button"
                  onClick={() => setViewMode('standard')}
                  className={`w-full sm:w-auto px-3 py-2 rounded-lg transition-all font-semibold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border ${
                    viewMode === 'standard'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50/60 hover:border-blue-300 hover:text-blue-700 shadow-2xs'
                  }`}
                  title="Click to filter by Standard Baseline (47.0h)"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${viewMode === 'standard' ? 'bg-white' : 'bg-blue-600'}`}></span>
                  <span>Standard</span>
                  <span className={`font-mono text-[10px] px-1 py-0.2 rounded ${viewMode === 'standard' ? 'bg-blue-700 text-white font-bold' : 'bg-blue-50 text-blue-700'}`}>
                    47.0h
                  </span>
                </button>

                {/* 3. Busy Conditions */}
                <button
                  type="button"
                  onClick={() => setViewMode('busy')}
                  className={`w-full sm:w-auto px-3 py-2 rounded-lg transition-all font-semibold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border ${
                    viewMode === 'busy'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50/60 hover:border-blue-300 hover:text-blue-700 shadow-2xs'
                  }`}
                  title="Click to filter by Busy Conditions (51.25h)"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${viewMode === 'busy' ? 'bg-white' : 'bg-blue-600'}`}></span>
                  <span>Busy</span>
                  <span className={`font-mono text-[10px] px-1 py-0.2 rounded ${viewMode === 'busy' ? 'bg-blue-700 text-white font-bold' : 'bg-blue-50 text-blue-700'}`}>
                    51.25h
                  </span>
                </button>

                {/* 4. Peak Events */}
                <button
                  type="button"
                  onClick={() => setViewMode('peak')}
                  className={`w-full sm:w-auto px-3 py-2 rounded-lg transition-all font-semibold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border ${
                    viewMode === 'peak'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50/60 hover:border-blue-300 hover:text-blue-700 shadow-2xs'
                  }`}
                  title="Click to filter by Peak Prep & Events (54.75h)"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${viewMode === 'peak' ? 'bg-white' : 'bg-blue-600'}`}></span>
                  <span>Peak</span>
                  <span className={`font-mono text-[10px] px-1 py-0.2 rounded ${viewMode === 'peak' ? 'bg-blue-700 text-white font-bold' : 'bg-blue-50 text-blue-700'}`}>
                    54.75h
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* FEATURE 2: 24-Hour Visual Gantt / Timeline Strip (Mobile-Optimized) */}
          <GanttTimeline viewMode={viewMode} />

          {/* FEATURE 1: Granular Shift Dissection (7 Operational Components) */}
          <ShiftDissection />

          {/* FEATURE 3: Visually Appealing Weekly Schedule Matrix Table */}
          <ScheduleMatrixTable
            viewMode={viewMode}
            onSelectViewMode={(mode) => setViewMode(mode)}
          />
        </section>

        {/* 3. Key Recommendations & Statutory Compliance */}
        <section className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
          <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-900">
            3. Key Recommendations &amp; Statutory Compliance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {/* Priority 1: Statutory Baseline, Consecutive Rest & Overtime Accrual */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <h3 className="font-bold text-slate-900 text-xs">
                  Statutory 40h Cap, Consecutive Rest &amp; Overtime
                </h3>
              </div>
              <div className="text-[11px] font-mono text-blue-700 font-semibold">
                Arts. 198, 232 &amp; 268 Código do Trabalho
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed pt-1">
                Under Article 198, Portugal&apos;s full-time work week is strictly 40.0 hours over 5 working days, honoring the trial&apos;s <strong className="font-semibold text-slate-800">two consecutive rest days (Wednesdays &amp; Thursdays · Art. 232)</strong>. The 47.0-hour baseline inherently includes <strong className="font-semibold text-slate-800">7.0 hours of weekly overtime per chef</strong> (+11.25h to +14.75h during surges), which must be formally reconciled via compensatory rest days (<em className="italic">descanso compensatório</em>) or statutory overtime compensation (Art. 268).
              </p>
            </div>

            {/* Priority 2: Work Time Definition, Fixed Schedule & 11h Rest Interval */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <h3 className="font-bold text-slate-900 text-xs">
                  Fixed Official Schedule &amp; 11-Hour Shift Rest Window
                </h3>
              </div>
              <div className="text-[11px] font-mono text-blue-700 font-semibold">
                Arts. 197, 214 &amp; 215 Código do Trabalho
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed pt-1">
                Under Article 197, working hours legally commence when food prep begins (<em className="italic">mise en place</em>), requiring a posted schedule (<em className="italic">horário fixo e afixado</em> · Art. 215). Crucially, Article 214 mandates a <strong className="font-semibold text-slate-800">minimum 11-hour continuous rest interval between consecutive shifts</strong>, meaning morning call times following late service shutdowns (~23:45) must preserve this 11-hour recovery window to safeguard staff safety and prevent fatigue.
              </p>
            </div>

            {/* Priority 3: Synchronized Crew Call & Heavy Prep Coordination */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <h3 className="font-bold text-slate-900 text-xs">
                  Synchronized Crew Call &amp; Heavy Prep Coordination
                </h3>
              </div>
              <div className="text-[11px] font-mono text-blue-700 font-semibold">
                Workload Equality &amp; Flexible Prep Call Times
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed pt-1">
                While standard shift arrival is 11:45 AM, days requiring heavy mise en place, large deliveries, or high event volumes require scheduled earlier calls (such as 11:00 AM). Whatever call time is established, <strong className="font-semibold text-slate-800">all rostered kitchen staff must enter the restaurant together</strong>. Synchronous arrival guarantees that demanding prep tasks and station setups are shared equitably across the whole team rather than burdening early arrivals.
              </p>
            </div>

            {/* Priority 4: Attendance System for Fairness & Operational Excellence */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                  4
                </span>
                <h3 className="font-bold text-slate-900 text-xs">
                  Digital Attendance &amp; Operational Management System (<em className="italic font-bold">Registo de Horário</em>)
                </h3>
              </div>
              <div className="text-[11px] font-mono text-blue-700 font-semibold">
                Art. 202 Código do Trabalho · Workload Balance &amp; System Fairness
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed pt-1">
                Beyond statutory overtime compliance under Article 202, an automated digital attendance system builds a transparent, professional kitchen management framework. Logging exact timestamps for arrivals, mid-day breaks, and station shutdowns provides objective data to balance daily workloads across all sections, eliminate attendance friction, and provide management with reliable operational metrics.
              </p>
            </div>
          </div>
        </section>

        {/* Quiet Document Sign-off Footer */}
        <footer className="pt-4 sm:pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Listambul Kitchen Operations</span>
            <span>·</span>
            <span>December 2026 Trial</span>
          </div>
          <div className="font-mono text-[10px] sm:text-[11px]">
            Portuguese Labor Code · Arts. 198, 202 &amp; 268
          </div>
        </footer>

      </div>
    </div>
  );
}
