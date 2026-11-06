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
    <div className="min-h-screen bg-slate-100/70 text-slate-800 antialiased font-sans py-4 sm:py-8 md:py-10 px-2 sm:px-4 md:px-8">
      {/* Centered Document Sheet (1-Page Executive Format, Mobile-Optimized) */}
      <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden print-container">
        {/* Royal Blue Top Accent Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600"></div>

        <div className="p-4 sm:p-7 md:p-10 space-y-6 sm:space-y-9">
          {/* Document Header & Metadata */}
          <header className="border-b border-slate-200/90 pb-5 sm:pb-7">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-extrabold text-slate-900 tracking-tight text-sm">Listambul Restaurant</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="font-semibold text-blue-700 font-mono text-[11px] bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-md">
                    Kitchen Operations Memorandum
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 mt-2">
                  SCHEDULE RECONCILIATION PROPOSAL
                </h1>
                <div className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  Operational Alignment &amp; Attendance Framework · December 2026 Trial Period
                </div>
              </div>

              {/* Print & Copy Actions (Mobile-Touch Friendly) */}
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 no-print pt-1 sm:pt-0">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all active:scale-95 cursor-pointer border border-slate-200"
                  title="Copy proposal summary to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                  <span>{copied ? 'Copied' : 'Copy Summary'}</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
                  title="Export or print document to PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Export PDF</span>
                </button>
              </div>
            </div>

            {/* Minimal 4-field metadata grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-100 text-xs">
              <div className="bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-400 font-bold block text-[10px] uppercase tracking-wider">TO:</span>
                <span className="font-semibold text-slate-900 text-xs mt-0.5 block">Chef Ege &amp; Chef Celine (Mgmt)</span>
              </div>
              <div className="bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-400 font-bold block text-[10px] uppercase tracking-wider">FROM:</span>
                <span className="font-semibold text-slate-900 text-xs mt-0.5 block">Kitchen Operation Team</span>
              </div>
              <div className="bg-slate-50/80 p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-400 font-bold block text-[10px] uppercase tracking-wider">DATE:</span>
                <span className="font-semibold text-slate-900 text-xs mt-0.5 block">Dec 2026 Trial</span>
              </div>
              <div className="bg-blue-50/50 p-2.5 rounded-lg border border-blue-100">
                <span className="text-blue-500 font-bold block text-[10px] uppercase tracking-wider">SUBJECT:</span>
                <span className="font-bold text-blue-800 text-xs mt-0.5 block">Schedule Alignment</span>
              </div>
            </div>
          </header>

          {/* 1. Executive Summary & Legal Context */}
          <section className="space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>1. Executive Summary &amp; Operational Reconciliation</span>
              </h2>
              <span className="text-[10px] font-mono text-slate-400">Arts. 197, 198 &amp; 202 CT</span>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              <p>
                The kitchen brigade extends its sincere gratitude to <strong className="font-bold text-slate-900">Chef Ege &amp; Chef Celine</strong> for their progressive December 2026 schedule proposal. Granting two consecutive weekly rest days (Wednesdays &amp; Thursdays) and unifying team shift schedules demonstrates management&apos;s genuine commitment to a healthier, more organized, and sustainable working environment.
              </p>
              <p>
                Management&apos;s initial schedule calculations reflected <strong className="font-semibold text-slate-900">public restaurant opening hours (12:30–16:00 &amp; 19:00–23:00 = 33.5 hours/week)</strong>. However, under <strong className="font-bold text-slate-900">Article 197 of the Portuguese Labor Code</strong> (<em className="italic">Código do Trabalho</em>), statutory working time legally encompasses all mandatory pre-service and post-service duties. When incorporating management&apos;s mandated <strong className="font-semibold text-slate-900">11:45 AM prep call</strong>, late dining table fulfillment (21:50–22:00 arrivals), night line sanitization (~23:45 exit), and <strong className="font-semibold text-slate-900">Tuesday deep-cleaning stock audits</strong>, actual kitchen staff duty totals <strong className="font-bold text-slate-900">46.0 to 47.0 working hours per week</strong>.
              </p>
              <p>
                Far from countering management&apos;s intent, this proposal reconciles public service windows with actual kitchen operational reality. Establishing our <strong className="font-bold text-slate-900">47.0-hour baseline (+7.0h statutory overtime)</strong> ensures 100% legal compliance, protects Listambul against labor inspection risks, and provides Chef Ege &amp; Chef Celine with complete, dispute-free operational clarity.
              </p>
            </div>

            {/* Public Opening Hours vs Actual Staff Working Time Comparison Card */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50/90 via-slate-50 to-blue-50/50 border border-blue-200/90 rounded-2xl shadow-2xs space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2 border-b border-blue-200/60 pb-2">
                <span className="font-black text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Reconciliation: Public Opening Windows vs. Actual Staff Duty Hours
                </span>
                <span className="text-[10px] font-mono font-bold text-blue-700 bg-white border border-blue-200 px-2 py-0.5 rounded-md">
                  Art. 197 CT Compliance
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {/* 33.5h Public Opening Hours */}
                <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Public Doors Open
                  </span>
                  <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-xl font-black text-slate-700 tabular-nums">33.5</span>
                    <span className="text-xs text-slate-500 font-semibold">hrs/wk</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block font-sans">
                    12:30–16:00 / 19:00–23:00 doors
                  </span>
                </div>

                {/* 47.0h Actual Staff Working Time */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
                    Actual Staff Working Time
                  </span>
                  <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-xl font-black text-blue-950 tabular-nums">47.0</span>
                    <span className="text-xs text-blue-800 font-semibold">hrs/wk</span>
                  </div>
                  <span className="text-[10px] text-blue-700 block font-sans">
                    11:45 prep, line clean &amp; Tue audit
                  </span>
                </div>

                {/* +7.0h Net Overtime Accrued */}
                <div className="p-3 bg-rose-50/80 border border-rose-200 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block">
                    Statutory Overtime
                  </span>
                  <div className="flex items-baseline gap-1 font-mono">
                    <span className="text-xl font-black text-rose-700 tabular-nums">+7.0</span>
                    <span className="text-xs text-rose-800 font-semibold">hrs/wk</span>
                  </div>
                  <span className="text-[10px] text-rose-700 block font-sans font-semibold">
                    Reconciled vs 40.0h legal cap
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Clean Infographic Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              <div className="p-4 bg-slate-50 border border-slate-200/90 rounded-xl shadow-2xs hover:border-slate-300 transition-all">
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Statutory Benchmark
                </span>
                <div className="flex items-baseline gap-1.5 mt-1 font-mono">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 tabular-nums">40.0</span>
                  <span className="text-xs font-semibold text-slate-500">hrs/week</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-500 mt-1 block font-sans">
                  Art. 198 (Legal standard cap)
                </span>
              </div>

              <div className="p-4 bg-blue-50/60 border border-blue-200/90 rounded-xl shadow-2xs hover:border-blue-300 transition-all">
                <span className="text-[10px] sm:text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                  Baseline Planned Hours
                </span>
                <div className="flex items-baseline gap-1.5 mt-1 font-mono">
                  <span className="text-2xl sm:text-3xl font-black text-blue-900 tabular-nums">47.0</span>
                  <span className="text-xs font-semibold text-blue-700">hrs/week</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-blue-600 mt-1 block font-sans">
                  5 working days · 2 rest days
                </span>
              </div>

              <div className="p-3.5 sm:p-4 bg-blue-50/90 border border-blue-200 rounded-xl shadow-2xs hover:border-blue-300 transition-all">
                <span className="text-[10px] sm:text-[11px] font-bold text-blue-800 uppercase tracking-wider block">
                  Statutory Overtime
                </span>
                <div className="flex items-baseline gap-1.5 mt-1 font-mono">
                  <span className="text-2xl sm:text-3xl font-black text-blue-700 tabular-nums">+7.0</span>
                  <span className="text-xs font-semibold text-blue-700">hrs/week</span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-blue-600 mt-1 block font-sans">
                  Scales to +11.25h / +14.75h in peak
                </span>
              </div>
            </div>
          </section>

          {/* Styled Section Break Divider 1 */}
          <div className="py-2 flex items-center justify-center gap-3 no-print">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-slate-200 flex-1"></div>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600/40"></span>
            <div className="h-px bg-gradient-to-r from-slate-200 via-slate-200 to-transparent flex-1"></div>
          </div>

          {/* 2. Shift Breakdown Under Varying Operational Conditions (Interactive Web Version) */}
          <section className="space-y-6 sm:space-y-8 no-print">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>2. Shift Breakdown Under Varying Operational Conditions</span>
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                  Work starts with daily prep (11:00 or 11:45 AM) and finishes following service shutdown and sanitization (23:45). Overtime is calculated against the 40-hour legal cap (Art. 198).
                </p>
              </div>

              {/* Interactive View Filter Buttons */}
              <div className="w-full sm:w-auto max-w-full no-print shrink-0">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                  <span>Select Scenario to View:</span>
                </div>
                <div className="grid grid-cols-2 sm:flex sm:flex-row w-full sm:w-auto p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs gap-1.5">
                  {/* 1. All Conditions */}
                  <button
                    type="button"
                    onClick={() => setViewMode('all')}
                    className={`w-full sm:w-auto px-3 py-1.5 rounded-lg transition-all font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border ${
                      viewMode === 'all'
                        ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${viewMode === 'all' ? 'bg-white' : 'bg-slate-300'}`}></span>
                    <span>All Scenarios</span>
                  </button>

                  {/* 2. Standard Baseline */}
                  <button
                    type="button"
                    onClick={() => setViewMode('standard')}
                    className={`w-full sm:w-auto px-3 py-1.5 rounded-lg transition-all font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border ${
                      viewMode === 'standard'
                        ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${viewMode === 'standard' ? 'bg-white' : 'bg-blue-600'}`}></span>
                    <span>Standard</span>
                    <span className={`font-mono text-[10px] px-1 py-0.2 rounded font-extrabold ${viewMode === 'standard' ? 'bg-blue-800 text-white' : 'bg-blue-50 text-blue-700'}`}>
                      47.0h
                    </span>
                  </button>

                  {/* 3. Busy Conditions */}
                  <button
                    type="button"
                    onClick={() => setViewMode('busy')}
                    className={`w-full sm:w-auto px-3 py-1.5 rounded-lg transition-all font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border ${
                      viewMode === 'busy'
                        ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${viewMode === 'busy' ? 'bg-white' : 'bg-blue-600'}`}></span>
                    <span>Busy</span>
                    <span className={`font-mono text-[10px] px-1 py-0.2 rounded font-extrabold ${viewMode === 'busy' ? 'bg-blue-800 text-white' : 'bg-blue-50 text-blue-700'}`}>
                      51.25h
                    </span>
                  </button>

                  {/* 4. Peak Events */}
                  <button
                    type="button"
                    onClick={() => setViewMode('peak')}
                    className={`w-full sm:w-auto px-3 py-1.5 rounded-lg transition-all font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 border ${
                      viewMode === 'peak'
                        ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${viewMode === 'peak' ? 'bg-white' : 'bg-blue-600'}`}></span>
                    <span>Peak</span>
                    <span className={`font-mono text-[10px] px-1 py-0.2 rounded font-extrabold ${viewMode === 'peak' ? 'bg-blue-800 text-white' : 'bg-blue-50 text-blue-700'}`}>
                      54.75h
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* FEATURE 2: 24-Hour Visual Gantt / Timeline Strip */}
            <GanttTimeline viewMode={viewMode} />

            {/* Styled Line Break After Timeline */}
            <div className="py-1 flex items-center gap-3">
              <div className="h-px bg-slate-200/80 flex-1"></div>
              <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
                Shift Dissection &amp; Matrix
              </span>
              <div className="h-px bg-slate-200/80 flex-1"></div>
            </div>

            {/* FEATURE 1: Granular Shift Dissection */}
            <ShiftDissection />

            {/* Styled Line Break After Dissection */}
            <div className="py-1 flex items-center gap-3">
              <div className="h-px bg-slate-200/80 flex-1"></div>
              <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
                Weekly Hours Schedule Matrix
              </span>
              <div className="h-px bg-slate-200/80 flex-1"></div>
            </div>

            {/* FEATURE 3: Visually Appealing Weekly Schedule Matrix Table */}
            <ScheduleMatrixTable
              viewMode={viewMode}
              onSelectViewMode={(mode) => setViewMode(mode)}
            />
          </section>

          {/* Print-Only Version: 3 Dedicated Pages for Standard, Busy, and Peak */}
          <div className="hidden print:block space-y-8">
            {/* Page 1: Standard Baseline */}
            <div className="print-page-break space-y-6 pt-4">
              <div className="border-b border-slate-200 pb-2">
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>2. Shift Breakdown: Standard Baseline (47.0 Hours / Week)</span>
                </h2>
                <p className="text-[11px] text-slate-500 mt-1">
                  Nominal operations under normal lunch and dinner covers · +7.0h statutory overtime.
                </p>
              </div>
              <GanttTimeline viewMode="standard" />
              <ShiftDissection />
              <ScheduleMatrixTable viewMode="standard" />
            </div>

            {/* Page 2: Busy Conditions */}
            <div className="print-page-break space-y-6 pt-4">
              <div className="border-b border-slate-200 pb-2">
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>2. Shift Breakdown: Busy Conditions (51.25 Hours / Week)</span>
                </h2>
                <p className="text-[11px] text-slate-500 mt-1">
                  Extended prep calls and delayed line shutdown due to heavy volume · +11.25h statutory overtime.
                </p>
              </div>
              <GanttTimeline viewMode="busy" />
              <ShiftDissection />
              <ScheduleMatrixTable viewMode="busy" />
            </div>

            {/* Page 3: Peak Events */}
            <div className="print-page-break space-y-6 pt-4">
              <div className="border-b border-slate-200 pb-2">
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>2. Shift Breakdown: Peak Events &amp; Heavy Prep (54.75 Hours / Week)</span>
                </h2>
                <p className="text-[11px] text-slate-500 mt-1">
                  Maximum capacity, private bookings, full inventory audits, and event service · +14.75h statutory overtime.
                </p>
              </div>
              <GanttTimeline viewMode="peak" />
              <ShiftDissection />
              <ScheduleMatrixTable viewMode="peak" />
            </div>
          </div>

          {/* Styled Section Break Divider 2 */}
          <div className="py-3 flex items-center justify-center gap-3 no-print">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-slate-200 flex-1"></div>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600/40"></span>
            <div className="h-px bg-gradient-to-r from-slate-200 via-slate-200 to-transparent flex-1"></div>
          </div>

          {/* 3. Key Recommendations & Statutory Compliance */}
          <section className="space-y-4 sm:space-y-6 pt-1 sm:pt-2">
            <div className="border-b border-slate-100 pb-2">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>3. Key Recommendations &amp; Statutory Compliance</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* Priority 1 */}
              <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white space-y-2.5 shadow-2xs hover:border-blue-300 transition-all border-t-2 border-t-blue-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-blue-700 text-white font-mono text-xs flex items-center justify-center font-black">
                      1
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Statutory 40h Cap, Consecutive Rest &amp; Overtime
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-bold">
                    Priority 01
                  </span>
                </div>
                <div className="text-[11px] font-mono text-blue-700 font-bold">
                  Arts. 198, 232 &amp; 268 Código do Trabalho
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed pt-1">
                  Under Article 198, Portugal&apos;s full-time work week is strictly 40.0 hours over 5 working days, honoring the trial&apos;s <strong className="font-bold text-slate-800">two consecutive rest days (Wednesdays &amp; Thursdays · Art. 232)</strong>. The 47.0-hour baseline inherently includes <strong className="font-bold text-slate-800">7.0 hours of weekly overtime per chef</strong> (+11.25h to +14.75h during surges), which must be formally reconciled via compensatory rest days (<em className="italic">descanso compensatório</em>) or statutory overtime compensation (Art. 268).
                </p>
              </div>

              {/* Priority 2 */}
              <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white space-y-2.5 shadow-2xs hover:border-blue-300 transition-all border-t-2 border-t-blue-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-blue-700 text-white font-mono text-xs flex items-center justify-center font-black">
                      2
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Fixed Official Schedule &amp; 11-Hour Shift Rest Window
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-bold">
                    Priority 02
                  </span>
                </div>
                <div className="text-[11px] font-mono text-blue-700 font-bold">
                  Arts. 197, 214 &amp; 215 Código do Trabalho
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed pt-1">
                  Under Article 197, working hours legally commence when food prep begins (<em className="italic">mise en place</em>), requiring a posted schedule (<em className="italic">horário fixo e afixado</em> · Art. 215). Crucially, Article 214 mandates a <strong className="font-bold text-slate-800">minimum 11-hour continuous rest interval between consecutive shifts</strong>, meaning morning call times following late service shutdowns (~23:45) must preserve this 11-hour recovery window to safeguard staff safety and prevent fatigue.
                </p>
              </div>

              {/* Styled Line Break Between Row 1 and Row 2 of Recommendations */}
              <div className="col-span-1 md:col-span-2 my-1 hidden sm:flex items-center gap-3">
                <div className="h-px bg-slate-200/80 flex-1"></div>
                <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
                  Operational Coordination &amp; Management
                </span>
                <div className="h-px bg-slate-200/80 flex-1"></div>
              </div>

              {/* Priority 3 */}
              <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white space-y-2.5 shadow-2xs hover:border-blue-300 transition-all border-t-2 border-t-blue-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-blue-700 text-white font-mono text-xs flex items-center justify-center font-black">
                      3
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Synchronized Crew Call &amp; Heavy Prep Coordination
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-bold">
                    Priority 03
                  </span>
                </div>
                <div className="text-[11px] font-mono text-blue-700 font-bold">
                  Workload Equality &amp; Flexible Prep Call Times
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed pt-1">
                  While standard shift arrival is 11:45 AM, days requiring heavy mise en place, large deliveries, or high event volumes require scheduled earlier calls (such as 11:00 AM). Whatever call time is established, <strong className="font-bold text-slate-800">all rostered kitchen staff must enter the restaurant together</strong>. Synchronous arrival guarantees that demanding prep tasks and station setups are shared equitably across the whole team rather than burdening early arrivals.
                </p>
              </div>

              {/* Priority 4 */}
              <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white space-y-2.5 shadow-2xs hover:border-blue-300 transition-all border-t-2 border-t-blue-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-blue-700 text-white font-mono text-xs flex items-center justify-center font-black">
                      4
                    </span>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                      Digital Attendance System (<em className="italic font-bold">Registo de Horário</em>)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-bold">
                    Priority 04
                  </span>
                </div>
                <div className="text-[11px] font-mono text-blue-700 font-bold">
                  Art. 202 Código do Trabalho · Workload Balance &amp; System Fairness
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed pt-1">
                  Beyond statutory overtime compliance under Article 202, an automated digital attendance system builds a transparent, professional kitchen management framework. Logging exact timestamps for arrivals, mid-day breaks, and station shutdowns provides objective data to balance daily workloads across all sections, eliminate attendance friction, and provide management with reliable operational metrics.
                </p>
              </div>
            </div>
          </section>

          {/* Styled Section Break Divider 3 */}
          <div className="py-3 flex items-center justify-center gap-3 no-print">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-slate-200 flex-1"></div>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600/40"></span>
            <div className="h-px bg-gradient-to-r from-slate-200 via-slate-200 to-transparent flex-1"></div>
          </div>

          {/* 4. Concluding Executive Operational Alignment */}
          <section className="space-y-3.5 sm:space-y-4 pt-1 sm:pt-2">
            <div className="border-b border-slate-100 pb-2">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span>4. Concluding Operational Alignment &amp; Collaborative Next Steps</span>
              </h2>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl border border-blue-200/90 bg-gradient-to-b from-blue-50/70 to-slate-50/60 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3.5 shadow-2xs">
              <p>
                In closing, this proposal is presented not as a challenge to management&apos;s schedule, but as a constructive, collaborative blueprint designed to support <strong className="font-bold text-slate-900">Chef Ege &amp; Chef Celine&apos;s</strong> vision for Listambul&apos;s continued growth and success. The kitchen team deeply appreciates management&apos;s initiative in establishing two consecutive rest days and fostering an encouraging work environment.
              </p>
              <p>
                By transparently documenting our <strong className="font-bold text-slate-900">47.0-hour baseline (+7.0h statutory overtime)</strong>, establishing synchronized prep call times, and referencing Portuguese Labor Code guidelines, our sole intention is to ensure operational clarity, protect staff health, and maintain the culinary quality Listambul is celebrated for. We warmly invite <strong className="font-semibold text-slate-800">Chef Ege &amp; Chef Celine&apos;s</strong> guidance to refine this trial framework together, ensuring a balanced, sustainable, and prosperous operation for the entire restaurant family.
              </p>
              <p>
                Together, by bridging public opening hours with actual kitchen operational reality, we safeguard Listambul&apos;s culinary standards while giving <strong className="font-bold text-slate-900">Chef Ege &amp; Chef Celine</strong> complete confidence in a fully compliant, highly motivated, and synchronized team.
              </p>

              {/* Styled Line Break inside Section 4 before Sign-off */}
              <div className="pt-2 border-t border-blue-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <span className="font-extrabold text-slate-900 uppercase tracking-widest text-[11px]">
                  Respectfully Submitted By:
                </span>
                <div className="inline-flex items-center gap-2.5 bg-white border border-blue-200 px-3.5 py-2 rounded-xl text-blue-950 font-bold shadow-2xs text-xs sm:text-sm">
                  <span className="font-black text-blue-700">Kitchen Operation Team</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-slate-800 font-semibold">Sujan, Maya, Raman</span>
                </div>
              </div>
            </div>
          </section>

          {/* Styled Line Break before Footer */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-[10px] font-mono text-slate-400 font-semibold">END OF MEMORANDUM</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          {/* Quiet Document Sign-off Footer */}
          <footer className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Listambul Kitchen Operations</span>
              <span>·</span>
              <span>December 2026 Trial Period</span>
            </div>
            <div className="font-mono text-[10px] sm:text-[11px] font-semibold text-slate-500">
              Portuguese Labor Code · Arts. 197, 198, 202, 214, 215, 232 &amp; 268
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
