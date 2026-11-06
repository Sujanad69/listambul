import React from 'react';
import { Info } from 'lucide-react';

interface ScheduleMatrixTableProps {
  viewMode: 'all' | 'standard' | 'busy' | 'peak';
  onSelectViewMode?: (mode: 'all' | 'standard' | 'busy' | 'peak') => void;
}

interface RowItem {
  day: string;
  isClosed?: boolean;
  standard?: { hours: string; desc: string };
  busy?: { hours: string; desc: string };
  peak?: { hours: string; desc: string };
}

const ROWS: RowItem[] = [
  {
    day: 'Monday',
    standard: { hours: '10.5h', desc: '11:45–16:30 / 18:00–23:45' },
    busy: { hours: '11.25h', desc: '11:00 prep / exit ~23:45' },
    peak: { hours: '12.0h', desc: '11:00 prep / exit ~00:30' },
  },
  {
    day: 'Tuesday',
    standard: { hours: '5.0h', desc: '11:30–16:30 (clean to 16:30)' },
    busy: { hours: '6.0h', desc: '11:30–17:30 (extended stock)' },
    peak: { hours: '6.5h', desc: '11:00–17:30 (full audit)' },
  },
  {
    day: 'Wednesday',
    isClosed: true,
  },
  {
    day: 'Thursday',
    isClosed: true,
  },
  {
    day: 'Friday',
    standard: { hours: '10.5h', desc: '11:45–16:30 / 18:00–23:45' },
    busy: { hours: '11.25h', desc: '11:00 prep / exit ~23:45' },
    peak: { hours: '12.0h', desc: '11:00 prep / exit ~00:30' },
  },
  {
    day: 'Saturday',
    standard: { hours: '10.5h', desc: '11:45–16:30 / 18:00–23:45' },
    busy: { hours: '11.5h', desc: '11:00 prep / exit ~00:00' },
    peak: { hours: '12.25h', desc: '11:00 prep / exit ~00:45' },
  },
  {
    day: 'Sunday',
    standard: { hours: '10.5h', desc: '11:45–16:30 / 18:00–23:45' },
    busy: { hours: '11.25h', desc: '11:00 prep / exit ~23:45' },
    peak: { hours: '12.0h', desc: '11:00 prep / exit ~00:30' },
  },
];

export const ScheduleMatrixTable: React.FC<ScheduleMatrixTableProps> = ({ viewMode }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden text-xs shadow-2xs">
      {/* Slim Header */}
      <div className="px-3 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
          Weekly Schedule Matrix
        </span>
        <span className="text-[10px] text-slate-500 font-mono">
          Art. 198 Código do Trabalho (40h Cap)
        </span>
      </div>

      {/* Clean, Lightweight Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left border-collapse min-w-[580px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/60 text-[11px] font-semibold text-slate-600">
              <th className="py-2 px-3 sticky left-0 bg-slate-50 w-28 sm:w-32 border-r border-slate-200 shadow-[1px_0_0_0_#e2e8f0] z-10">
                Day
              </th>
              <th
                className={`py-2 px-3 transition-colors ${
                  viewMode === 'standard' ? 'bg-blue-50/80 text-blue-900 font-bold' : ''
                }`}
              >
                Standard Baseline{' '}
                <span className="font-mono text-slate-400 font-normal text-[10px]">(47.0h)</span>
              </th>
              <th
                className={`py-2 px-3 transition-colors ${
                  viewMode === 'busy' ? 'bg-blue-50/80 text-blue-900 font-bold' : ''
                }`}
              >
                Busy Conditions{' '}
                <span className="font-mono text-slate-400 font-normal text-[10px]">(51.25h)</span>
              </th>
              <th
                className={`py-2 px-3 transition-colors ${
                  viewMode === 'peak' ? 'bg-blue-50/80 text-blue-900 font-bold' : ''
                }`}
              >
                Peak Events{' '}
                <span className="font-mono text-slate-400 font-normal text-[10px]">(54.75h)</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {ROWS.map((row) => {
              if (row.isClosed) {
                return (
                  <tr key={row.day} className="bg-slate-50/40 text-slate-400">
                    <td className="py-3 px-4 font-medium text-slate-500 sticky left-0 bg-slate-50/90 border-r border-slate-200 shadow-[1px_0_0_0_#e2e8f0] z-10">
                      {row.day}
                    </td>
                    <td colSpan={3} className="py-3 px-4 text-slate-400 italic text-[11px] text-center">
                      Closed (0.0 hrs) · Designated weekly rest day
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={row.day} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900 sticky left-0 bg-white border-r border-slate-200 shadow-[1px_0_0_0_#e2e8f0] z-10">
                    {row.day}
                  </td>

                  {/* Standard */}
                  <td
                    className={`py-3 px-4 transition-colors ${
                      viewMode === 'standard' ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <span className="font-mono font-bold text-slate-900 mr-2 text-xs">
                      {row.standard?.hours}
                    </span>
                    <span className="text-slate-500 text-[11px] font-mono">
                      ({row.standard?.desc})
                    </span>
                  </td>

                  {/* Busy */}
                  <td
                    className={`py-3 px-4 transition-colors ${
                      viewMode === 'busy' ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <span className="font-mono font-bold text-slate-900 mr-2 text-xs">
                      {row.busy?.hours}
                    </span>
                    <span className="text-slate-500 text-[11px] font-mono">
                      ({row.busy?.desc})
                    </span>
                  </td>

                  {/* Peak */}
                  <td
                    className={`py-3 px-4 transition-colors ${
                      viewMode === 'peak' ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <span className="font-mono font-bold text-slate-900 mr-2 text-xs">
                      {row.peak?.hours}
                    </span>
                    <span className="text-slate-500 text-[11px] font-mono">
                      ({row.peak?.desc})
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* Slim, Minimalist Totals */}
          <tfoot>
            <tr className="border-t-2 border-slate-200 bg-slate-50/90 font-semibold text-slate-900">
              <td className="py-3 px-4 font-bold sticky left-0 bg-slate-50 border-r border-slate-200 shadow-[1px_0_0_0_#e2e8f0] z-10">
                Total Hours
              </td>
              <td
                className={`py-3 px-4 font-mono font-bold text-xs ${
                  viewMode === 'standard' ? 'text-blue-900 bg-blue-100/70 font-extrabold' : ''
                }`}
              >
                47.0 Hours
              </td>
              <td
                className={`py-3 px-4 font-mono font-bold text-xs ${
                  viewMode === 'busy' ? 'text-blue-900 bg-blue-100/70 font-extrabold' : ''
                }`}
              >
                51.25 Hours
              </td>
              <td
                className={`py-3 px-4 font-mono font-bold text-xs ${
                  viewMode === 'peak' ? 'text-blue-900 bg-blue-100/70 font-extrabold' : ''
                }`}
              >
                54.75 Hours
              </td>
            </tr>

            <tr className="border-t border-slate-200 bg-rose-50/40 font-semibold text-slate-900">
              <td className="py-3 px-4 font-bold sticky left-0 bg-rose-50/70 border-r border-slate-200 shadow-[1px_0_0_0_#e2e8f0] z-10 text-rose-950">
                Overtime <span className="font-normal text-[10px] text-rose-700">(vs. 40h)</span>
              </td>
              <td
                className={`py-3 px-4 font-mono font-bold text-rose-700 text-xs ${
                  viewMode === 'standard' ? 'bg-rose-100/90 text-rose-950 font-extrabold' : ''
                }`}
              >
                +7.0 Hours
              </td>
              <td
                className={`py-3 px-4 font-mono font-bold text-rose-700 text-xs ${
                  viewMode === 'busy' ? 'bg-rose-100/90 text-rose-950 font-extrabold' : ''
                }`}
              >
                +11.25 Hours
              </td>
              <td
                className={`py-3 px-4 font-mono font-bold text-rose-700 text-xs ${
                  viewMode === 'peak' ? 'bg-rose-100/90 text-rose-950 font-extrabold' : ''
                }`}
              >
                +14.75 Hours
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Off-Peak & Early Shutdown Impact Analysis (Exit 22:30 – 23:30) */}
      <div className="p-3.5 sm:p-4 bg-slate-50/80 border-t border-slate-200 text-xs text-slate-700 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-blue-100 text-blue-700 rounded-md">
              <Info className="w-4 h-4 shrink-0" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                Off-Peak &amp; Early Shutdown Recalculation Matrix
              </h4>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Working time sensitivity analysis across early kitchen exit times (22:30 – 23:30 exit spectrum)
              </p>
            </div>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono text-blue-700 font-semibold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
            Hours Sensitivity Analysis
          </span>
        </div>

        {/* Quiet Services Table with 22:30, 22:45, 23:00, 23:30 Exit Spectrum */}
        <div className="overflow-x-auto scrollbar-thin rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-left border-collapse min-w-[540px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-600">
                <th className="py-2 px-3">Operational Condition</th>
                <th className="py-2 px-3">Kitchen Exit Time</th>
                <th className="py-2 px-3 font-mono">Daily Shift</th>
                <th className="py-2 px-3 font-mono">Weekly Total</th>
                <th className="py-2 px-3 font-mono">Statutory Overtime (vs 40h)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {/* Standard Baseline */}
              <tr className="hover:bg-slate-50/60">
                <td className="py-2 px-3 font-sans font-semibold text-slate-900">Standard Baseline Service</td>
                <td className="py-2 px-3 text-slate-600 font-sans">23:45 Exit</td>
                <td className="py-2 px-3 text-slate-800 font-bold">10.50h</td>
                <td className="py-2 px-3 text-slate-900 font-bold">47.00 hrs</td>
                <td className="py-2 px-3">
                  <span className="font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded text-[10px]">
                    +7.00 Hours
                  </span>
                </td>
              </tr>

              {/* 23:30 Exit - Highlighted as Average Closing */}
              <tr className="hover:bg-blue-50/70 bg-blue-50/50 border-l-2 border-l-blue-600">
                <td className="py-2.5 px-3 font-sans font-semibold text-blue-950">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span>Scenario A: Average Quiet Closing</span>
                    <span className="inline-flex items-center gap-1 font-sans text-[10px] bg-blue-600 text-white font-bold px-2 py-0.5 rounded-full shadow-2xs">
                      ★ Average Closing (~23:30)
                    </span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-blue-900 font-sans font-bold">
                  23:30 Exit <span className="text-[10px] text-blue-700 font-normal">(Average)</span>
                </td>
                <td className="py-2.5 px-3 text-blue-950 font-bold">10.25h</td>
                <td className="py-2.5 px-3 text-blue-950 font-bold">46.00 hrs</td>
                <td className="py-2.5 px-3">
                  <span className="font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded text-[10px]">
                    +6.00 Hours
                  </span>
                </td>
              </tr>

              {/* 23:00 Exit */}
              <tr className="hover:bg-slate-50/60 bg-blue-50/20">
                <td className="py-2 px-3 font-sans font-semibold text-slate-800">Scenario B: Quiet Service Exit (-45m)</td>
                <td className="py-2 px-3 text-blue-700 font-sans">23:00 Exit</td>
                <td className="py-2 px-3 text-slate-800 font-bold">9.75h</td>
                <td className="py-2 px-3 text-slate-900 font-bold">44.00 hrs</td>
                <td className="py-2 px-3">
                  <span className="font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded text-[10px]">
                    +4.00 Hours
                  </span>
                </td>
              </tr>

              {/* 22:45 Exit */}
              <tr className="hover:bg-slate-50/60 bg-blue-50/30">
                <td className="py-2 px-3 font-sans font-semibold text-slate-800">Scenario C: Early Service Shutdown (-1h)</td>
                <td className="py-2 px-3 text-blue-700 font-sans">22:45 Exit</td>
                <td className="py-2 px-3 text-slate-800 font-bold">9.50h</td>
                <td className="py-2 px-3 text-slate-900 font-bold">43.00 hrs</td>
                <td className="py-2 px-3">
                  <span className="font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded text-[10px]">
                    +3.00 Hours
                  </span>
                </td>
              </tr>

              {/* 22:30 Exit */}
              <tr className="hover:bg-slate-50/60 bg-blue-50/40">
                <td className="py-2 px-3 font-sans font-semibold text-slate-800">Scenario D: Accelerated Exit (-1h 15m)</td>
                <td className="py-2 px-3 text-blue-700 font-sans">22:30 Exit</td>
                <td className="py-2 px-3 text-slate-800 font-bold">9.25h</td>
                <td className="py-2 px-3 text-slate-900 font-bold">42.00 hrs</td>
                <td className="py-2 px-3">
                  <span className="font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded text-[10px]">
                    +2.00 Hours
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Info Banner with Info Icon */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-2.5 text-[11px] text-blue-950 leading-relaxed font-medium">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-blue-900">Summary Takeaway:</strong> Operational data indicates that <strong className="font-bold text-blue-950 underline decoration-blue-300">average quiet evening closing centers at 23:30</strong> (yielding <span className="font-mono font-bold text-slate-900">46.00 hrs/week</span> = <span className="font-mono font-bold text-rose-700">+6.00h statutory overtime</span>). Even across accelerated off-peak exits (22:30 – 22:45), total working time remains at <span className="font-mono font-bold text-slate-900">42.00 to 43.00 hrs/week</span>—consistently exceeding full-time contract hours.
          </div>
        </div>
      </div>
    </div>
  );
};
