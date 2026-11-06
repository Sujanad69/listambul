import React, { useState } from 'react';
import { Clock, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';

interface DaySchedule {
  day: string;
  isRest: boolean;
  hours: number;
  timeWindow: string;
  operationalNotes: string;
}

interface ConditionTable {
  id: 'standard' | 'busy' | 'peak';
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  totalHours: number;
  overtimeHours: number;
  schedule: DaySchedule[];
}

const CONDITIONS_DATA: ConditionTable[] = [
  {
    id: 'standard',
    title: 'Table 1: Standard Baseline Schedule',
    subtitle: 'Scheduled regular hours under standard dinner and lunch covers',
    badge: 'Baseline · 47.0h',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    totalHours: 47.0,
    overtimeHours: 7.0,
    schedule: [
      {
        day: 'Monday',
        isRest: false,
        hours: 10.5,
        timeWindow: '11:45–16:00 / 18:00–23:30',
        operationalNotes: 'Standard dual service (Lunch: 4.25h + Dinner: 5.5h + 45m mise en place handoff)',
      },
      {
        day: 'Tuesday',
        isRest: false,
        hours: 5.0,
        timeWindow: '11:45–16:00 + clean',
        operationalNotes: 'Single daytime lunch shift plus routine weekly station sanitization (Evening closed)',
      },
      {
        day: 'Wednesday',
        isRest: true,
        hours: 0.0,
        timeWindow: 'CLOSED (0.0 hrs)',
        operationalNotes: 'Designated consecutive weekly rest day (Kitchen Dark)',
      },
      {
        day: 'Thursday',
        isRest: true,
        hours: 0.0,
        timeWindow: 'CLOSED (0.0 hrs)',
        operationalNotes: 'Designated consecutive weekly rest day (Kitchen Dark)',
      },
      {
        day: 'Friday',
        isRest: false,
        hours: 10.5,
        timeWindow: '11:45–16:00 / 18:00–23:30',
        operationalNotes: 'Weekend opening prep, lunch service, split intermission, evening dinner rush',
      },
      {
        day: 'Saturday',
        isRest: false,
        hours: 10.5,
        timeWindow: '11:45–16:00 / 18:00–23:30',
        operationalNotes: 'Peak Saturday lunch and heavy dinner service with 2h afternoon split break',
      },
      {
        day: 'Sunday',
        isRest: false,
        hours: 10.5,
        timeWindow: '11:45–16:00 / 18:00–23:30',
        operationalNotes: 'Sunday family lunch and dinner service, followed by weekly station handover',
      },
    ],
  },
  {
    id: 'busy',
    title: 'Table 2: Busy Conditions Schedule',
    subtitle: 'High volume, extended mise en place calls, and delayed evening line shutdown',
    badge: 'Elevated Demand · 51.25h',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    totalHours: 51.25,
    overtimeHours: 11.25,
    schedule: [
      {
        day: 'Monday',
        isRest: false,
        hours: 11.25,
        timeWindow: '11:00 prep / exit ~23:45',
        operationalNotes: 'Early 11:00 AM crew prep arrival; extended late turnover clean and line sanitize',
      },
      {
        day: 'Tuesday',
        isRest: false,
        hours: 6.0,
        timeWindow: 'Extended stock & deep clean',
        operationalNotes: 'Extended inventory restocking, supplier reception, and thorough cold-line sanitization',
      },
      {
        day: 'Wednesday',
        isRest: true,
        hours: 0.0,
        timeWindow: 'CLOSED (0.0 hrs)',
        operationalNotes: 'Designated consecutive weekly rest day (Kitchen Dark)',
      },
      {
        day: 'Thursday',
        isRest: true,
        hours: 0.0,
        timeWindow: 'CLOSED (0.0 hrs)',
        operationalNotes: 'Designated consecutive weekly rest day (Kitchen Dark)',
      },
      {
        day: 'Friday',
        isRest: false,
        hours: 11.25,
        timeWindow: '11:00 prep / exit ~23:45',
        operationalNotes: 'Pre-weekend prep surge, high evening turnover, and delayed dish breakdown',
      },
      {
        day: 'Saturday',
        isRest: false,
        hours: 11.5,
        timeWindow: 'Heavy dinner & late turn',
        operationalNotes: 'Heavy multi-seating dinner service, expedited food prep, and late station clean',
      },
      {
        day: 'Sunday',
        isRest: false,
        hours: 11.25,
        timeWindow: '11:00 prep / exit ~23:45',
        operationalNotes: 'Extended Sunday lunch orders and evening close with perishable food rotation',
      },
    ],
  },
  {
    id: 'peak',
    title: 'Table 3: Peak / Heavy Prep & Events Schedule',
    subtitle: 'Maximum table turnover, banquet events, full inventory audits, and midnight exits',
    badge: 'Surge Operations · 54.75h',
    badgeColor: 'bg-blue-200 text-blue-950 border-blue-400',
    totalHours: 54.75,
    overtimeHours: 14.75,
    schedule: [
      {
        day: 'Monday',
        isRest: false,
        hours: 12.0,
        timeWindow: '11:00 prep / exit ~00:00',
        operationalNotes: 'Extended service window, banquet prep, and comprehensive midnight kitchen shutdown',
      },
      {
        day: 'Tuesday',
        isRest: false,
        hours: 6.5,
        timeWindow: 'Full inventory & audit',
        operationalNotes: 'Full cold-storage audit, deep cycle degreasing, and pre-rest inventory sign-off',
      },
      {
        day: 'Wednesday',
        isRest: true,
        hours: 0.0,
        timeWindow: 'CLOSED (0.0 hrs)',
        operationalNotes: 'Designated consecutive weekly rest day (Kitchen Dark)',
      },
      {
        day: 'Thursday',
        isRest: true,
        hours: 0.0,
        timeWindow: 'CLOSED (0.0 hrs)',
        operationalNotes: 'Designated consecutive weekly rest day (Kitchen Dark)',
      },
      {
        day: 'Friday',
        isRest: false,
        hours: 12.0,
        timeWindow: '11:00 prep / exit ~00:00',
        operationalNotes: 'Maximum table turnover, prolonged service seating, and midnight closing protocol',
      },
      {
        day: 'Saturday',
        isRest: false,
        hours: 12.25,
        timeWindow: 'Peak turn & late exit',
        operationalNotes: 'Peak weekly volume: Continuous seating past 23:00 and late-night kitchen reset (~00:15)',
      },
      {
        day: 'Sunday',
        isRest: false,
        hours: 12.0,
        timeWindow: 'Heavy prep & late finish',
        operationalNotes: 'Heavy prep for upcoming week, full station deep sanitization before rest cycle',
      },
    ],
  },
];

export const ThreeConditionTables: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'standard' | 'busy' | 'peak'>('all');

  const visibleTables =
    activeTab === 'all'
      ? CONDITIONS_DATA
      : CONDITIONS_DATA.filter((t) => t.id === activeTab);

  return (
    <div className="space-y-6">
      {/* On-Screen Tab Switcher (Hidden in print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 gap-3 no-print">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Operational Schedule Tables · 3 Operating Conditions
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare Standard Baseline, Busy Demand, and Peak Events against the 40h legal cap (Art. 198 CT).
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs self-start sm:self-auto shrink-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-white text-blue-700 shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Show All 3 Tables
          </button>
          <button
            onClick={() => setActiveTab('standard')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              activeTab === 'standard'
                ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Standard (47.0h)
          </button>
          <button
            onClick={() => setActiveTab('busy')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              activeTab === 'busy'
                ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Busy (51.25h)
          </button>
          <button
            onClick={() => setActiveTab('peak')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all ${
              activeTab === 'peak'
                ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Peak (54.75h)
          </button>
        </div>
      </div>

      {/* Tables List: In Print Mode, ALL 3 TABLES ARE ALWAYS RENDERED SEQUENTIALLY! */}
      <div className="space-y-8">
        {(activeTab === 'all' ? CONDITIONS_DATA : CONDITIONS_DATA).map((table) => {
          // In interactive mode on screen, respect activeTab if not 'all'
          const isHiddenOnScreen = activeTab !== 'all' && activeTab !== table.id;

          return (
            <div
              key={table.id}
              className={`bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden ${
                isHiddenOnScreen ? 'hidden print:block' : 'block'
              }`}
              style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}
            >
              {/* Table Header */}
              <div className="px-4 sm:px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                      {table.title}
                    </h3>
                    <span
                      className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${table.badgeColor}`}
                    >
                      {table.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{table.subtitle}</p>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono self-start sm:self-auto shrink-0">
                  <div className="bg-white px-2.5 py-1 rounded border border-slate-200">
                    <span className="text-slate-500 mr-1.5 font-sans">Total:</span>
                    <strong className="text-slate-900">{table.totalHours.toFixed(2)}h / wk</strong>
                  </div>
                  <div className="bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
                    <span className="text-blue-700 mr-1.5 font-sans">Overtime:</span>
                    <strong className="text-blue-900">+{table.overtimeHours.toFixed(2)}h</strong>
                  </div>
                </div>
              </div>

              {/* Responsive Table Wrapper */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse min-w-[540px]">
                  <thead>
                    <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-semibold">
                      <th className="py-2.5 px-4 w-28 uppercase tracking-wider text-[11px] text-slate-500">
                        Day
                      </th>
                      <th className="py-2.5 px-4 w-24 uppercase tracking-wider text-[11px] text-slate-500 font-mono">
                        Hours
                      </th>
                      <th className="py-2.5 px-4 w-48 uppercase tracking-wider text-[11px] text-slate-500 font-mono">
                        Shift Window
                      </th>
                      <th className="py-2.5 px-4 uppercase tracking-wider text-[11px] text-slate-500">
                        Operational Scope &amp; Workflow
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {table.schedule.map((row) => (
                      <tr
                        key={row.day}
                        className={
                          row.isRest
                            ? 'bg-slate-50/70 text-slate-400'
                            : 'hover:bg-slate-50/60 text-slate-700'
                        }
                      >
                        <td className="py-2.5 px-4 font-semibold text-slate-900">
                          {row.day}
                          {row.isRest && (
                            <span className="ml-1.5 text-[10px] text-slate-400 font-normal">
                              (Rest)
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-4 font-mono font-bold">
                          <span
                            className={
                              row.isRest
                                ? 'text-slate-400 font-normal'
                                : row.hours > 10.5
                                ? 'text-blue-700'
                                : 'text-slate-900'
                            }
                          >
                            {row.hours.toFixed(1)}h
                          </span>
                        </td>
                        <td className="py-2.5 px-4 font-mono text-slate-600">
                          {row.isRest ? (
                            <span className="italic text-slate-400">CLOSED (0.0 hrs)</span>
                          ) : (
                            row.timeWindow
                          )}
                        </td>
                        <td className="py-2.5 px-4 text-slate-600 leading-snug">
                          {row.operationalNotes}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {/* Summary Totals Footer */}
                  <tfoot>
                    <tr className="border-t-2 border-slate-300 bg-slate-100 font-semibold text-slate-900">
                      <td className="py-2.5 px-4 uppercase tracking-wider text-[11px]">
                        Weekly Total
                      </td>
                      <td className="py-2.5 px-4 font-mono font-bold text-slate-900 text-sm">
                        {table.totalHours.toFixed(1)}h
                      </td>
                      <td colSpan={2} className="py-2.5 px-4 text-slate-600">
                        5 Active Service Days (4 split shifts @ 10.5–12.25h + 1 single shift @ 5–6.5h) · 2 Rest Days
                      </td>
                    </tr>
                    <tr className="border-t border-slate-200 bg-blue-50/80 font-semibold text-blue-900">
                      <td className="py-2.5 px-4 uppercase tracking-wider text-[11px] font-bold">
                        Statutory Overtime
                      </td>
                      <td className="py-2.5 px-4 font-mono font-bold text-blue-700 text-sm">
                        +{table.overtimeHours.toFixed(2)}h
                      </td>
                      <td colSpan={2} className="py-2.5 px-4 text-blue-800 text-[11px]">
                        Calculated vs. 40.0h statutory legal maximum (Art. 198 Código do Trabalho)
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
