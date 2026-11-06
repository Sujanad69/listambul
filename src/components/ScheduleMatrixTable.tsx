import React from 'react';

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
                  <tr key={row.day} className="bg-slate-50/30 text-slate-400">
                    <td className="py-2 px-3 font-medium text-slate-500 sticky left-0 bg-slate-50/90 border-r border-slate-200 shadow-[1px_0_0_0_#e2e8f0] z-10">
                      {row.day}
                    </td>
                    <td colSpan={3} className="py-2 px-3 text-slate-400 italic text-[11px] text-center">
                      Closed (0.0 hrs) · Designated weekly rest day
                    </td>
                  </tr>
                );
              }

              return (
                <tr key={row.day} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2 px-3 font-semibold text-slate-900 sticky left-0 bg-white border-r border-slate-200 shadow-[1px_0_0_0_#e2e8f0] z-10">
                    {row.day}
                  </td>

                  {/* Standard */}
                  <td
                    className={`py-2 px-3 transition-colors ${
                      viewMode === 'standard' ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <span className="font-mono font-bold text-slate-900 mr-1.5">
                      {row.standard?.hours}
                    </span>
                    <span className="text-slate-500 text-[11px] font-mono">
                      ({row.standard?.desc})
                    </span>
                  </td>

                  {/* Busy */}
                  <td
                    className={`py-2 px-3 transition-colors ${
                      viewMode === 'busy' ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <span className="font-mono font-bold text-slate-900 mr-1.5">
                      {row.busy?.hours}
                    </span>
                    <span className="text-slate-500 text-[11px] font-mono">
                      ({row.busy?.desc})
                    </span>
                  </td>

                  {/* Peak */}
                  <td
                    className={`py-2 px-3 transition-colors ${
                      viewMode === 'peak' ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <span className="font-mono font-bold text-slate-900 mr-1.5">
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
              <td className="py-2 px-3 font-bold sticky left-0 bg-slate-50 border-r border-slate-200 shadow-[1px_0_0_0_#e2e8f0] z-10">
                Total Hours
              </td>
              <td
                className={`py-2 px-3 font-mono font-bold ${
                  viewMode === 'standard' ? 'text-blue-900 bg-blue-100/70 font-extrabold' : ''
                }`}
              >
                47.0 Hours
              </td>
              <td
                className={`py-2 px-3 font-mono font-bold ${
                  viewMode === 'busy' ? 'text-blue-900 bg-blue-100/70 font-extrabold' : ''
                }`}
              >
                51.25 Hours
              </td>
              <td
                className={`py-2 px-3 font-mono font-bold ${
                  viewMode === 'peak' ? 'text-blue-900 bg-blue-100/70 font-extrabold' : ''
                }`}
              >
                54.75 Hours
              </td>
            </tr>

            <tr className="border-t border-slate-200 bg-blue-50/40 font-semibold text-slate-900">
              <td className="py-2 px-3 font-bold sticky left-0 bg-blue-50/70 border-r border-slate-200 shadow-[1px_0_0_0_#e2e8f0] z-10 text-blue-950">
                Overtime <span className="font-normal text-[10px] text-blue-700">(vs. 40h)</span>
              </td>
              <td
                className={`py-2 px-3 font-mono font-bold text-blue-700 ${
                  viewMode === 'standard' ? 'bg-blue-100 text-blue-950 font-extrabold' : ''
                }`}
              >
                +7.0 Hours
              </td>
              <td
                className={`py-2 px-3 font-mono font-bold text-blue-700 ${
                  viewMode === 'busy' ? 'bg-blue-100 text-blue-950 font-extrabold' : ''
                }`}
              >
                +11.25 Hours
              </td>
              <td
                className={`py-2 px-3 font-mono font-bold text-blue-700 ${
                  viewMode === 'peak' ? 'bg-blue-100 text-blue-950 font-extrabold' : ''
                }`}
              >
                +14.75 Hours
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
