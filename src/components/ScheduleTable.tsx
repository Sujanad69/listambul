import React, { useState } from 'react';
import { WEEKLY_SCHEDULE, ScenarioKey, ShiftDetail } from '../data/scheduleData';
import { ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react';

interface ScheduleTableProps {
  activeScenario: ScenarioKey | 'compare';
  selectedDay: string;
  onSelectDay: (day: string) => void;
}

export const ScheduleTable: React.FC<ScheduleTableProps> = ({
  activeScenario,
  selectedDay,
  onSelectDay,
}) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (day: string) => {
    setExpandedRows((prev) => ({ ...prev, [day]: !prev[day] }));
    onSelectDay(day);
  };

  const getColHighlight = (colScenario: ScenarioKey) => {
    if (activeScenario === 'compare') return '';
    return activeScenario === colScenario
      ? 'bg-blue-50/70 font-medium border-x border-blue-200'
      : 'opacity-70';
  };

  return (
    <div className="bg-white rounded-xl border border-blue-100 shadow-xs overflow-hidden">
      {/* Table Title and Control Strip */}
      <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Shift Breakdown Under Varying Operational Conditions</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Daily shift schedules, prep start times, and service shutdowns compared to the 40h legal baseline (Art. 198 Código do Trabalho).
          </p>
        </div>

        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
          <span>Click any row for operational workflow details</span>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-700 font-semibold">
              <th className="py-3.5 px-4 w-32 tracking-wider uppercase text-[11px] text-slate-500">Day</th>
              <th
                className={`py-3.5 px-4 tracking-wider uppercase text-[11px] transition-colors ${
                  activeScenario === 'standard'
                    ? 'text-blue-900 bg-blue-100/60 font-bold'
                    : 'text-slate-600'
                }`}
              >
                Standard Baseline
                <span className="block font-mono text-[10px] font-normal text-slate-500">
                  Regular Flow (47.0h)
                </span>
              </th>
              <th
                className={`py-3.5 px-4 tracking-wider uppercase text-[11px] transition-colors ${
                  activeScenario === 'busy'
                    ? 'text-blue-900 bg-blue-100/60 font-bold'
                    : 'text-slate-600'
                }`}
              >
                Busy Conditions
                <span className="block font-mono text-[10px] font-normal text-slate-500">
                  High Volume / Late Turn (51.25h)
                </span>
              </th>
              <th
                className={`py-3.5 px-4 tracking-wider uppercase text-[11px] transition-colors ${
                  activeScenario === 'peak'
                    ? 'text-blue-900 bg-blue-100/60 font-bold'
                    : 'text-slate-600'
                }`}
              >
                Peak Prep & Events
                <span className="block font-mono text-[10px] font-normal text-slate-500">
                  Maximum Service / Audit (54.75h)
                </span>
              </th>
              <th className="py-3.5 px-4 w-12 text-center text-slate-400 no-print">Info</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {WEEKLY_SCHEDULE.map((shift) => {
              const isClosed = shift.standard.hours === 0;
              const isSelected = shift.day === selectedDay;
              const isExpanded = !!expandedRows[shift.day];

              return (
                <React.Fragment key={shift.day}>
                  <tr
                    onClick={() => toggleRow(shift.day)}
                    className={`cursor-pointer transition-colors ${
                      isClosed
                        ? 'bg-slate-50/50 hover:bg-slate-100/60 text-slate-400'
                        : isSelected
                        ? 'bg-blue-50/40 hover:bg-blue-50/70'
                        : 'hover:bg-slate-50/80 text-slate-700'
                    }`}
                  >
                    {/* Day Column */}
                    <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-2">
                      <span className={isSelected ? 'text-blue-700' : ''}>{shift.day}</span>
                      {isClosed && (
                        <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-200/70 text-slate-600">
                          Rest
                        </span>
                      )}
                    </td>

                    {/* Standard Baseline Column */}
                    <td className={`py-3 px-4 transition-colors ${getColHighlight('standard')}`}>
                      {isClosed ? (
                        <span className="font-mono text-slate-400 italic">CLOSED (0.0 hrs)</span>
                      ) : (
                        <div>
                          <div className="font-mono font-bold text-slate-900">
                            {shift.standard.hours.toFixed(1)} hrs
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                            {shift.standard.schedule}
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Busy Conditions Column */}
                    <td className={`py-3 px-4 transition-colors ${getColHighlight('busy')}`}>
                      {isClosed ? (
                        <span className="font-mono text-slate-400 italic">CLOSED (0.0 hrs)</span>
                      ) : (
                        <div>
                          <div className="font-mono font-bold text-slate-900">
                            {shift.busy.hours.toFixed(2)} hrs
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                            {shift.busy.schedule}
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Peak / Heavy Prep Column */}
                    <td className={`py-3 px-4 transition-colors ${getColHighlight('peak')}`}>
                      {isClosed ? (
                        <span className="font-mono text-slate-400 italic">CLOSED (0.0 hrs)</span>
                      ) : (
                        <div>
                          <div className="font-mono font-bold text-slate-900">
                            {shift.peak.hours.toFixed(2)} hrs
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                            {shift.peak.schedule}
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Expand Trigger Icon */}
                    <td className="py-3 px-4 text-center text-slate-400 no-print">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 inline-block text-blue-600" />
                      ) : (
                        <ChevronDown className="w-4 h-4 inline-block text-slate-400 hover:text-slate-600" />
                      )}
                    </td>
                  </tr>

                  {/* Operational Detail Row */}
                  {isExpanded && (
                    <tr className="bg-blue-50/30 text-xs border-y border-blue-100">
                      <td colSpan={5} className="p-4 pl-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white p-3 rounded-md border border-slate-200">
                            <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                              Standard Baseline Context
                            </span>
                            <p className="text-slate-700 text-xs leading-relaxed">
                              {shift.standard.notes}
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded-md border border-slate-200">
                            <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                              Busy Surge Factors
                            </span>
                            <p className="text-slate-700 text-xs leading-relaxed">
                              {shift.busy.notes}
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded-md border border-slate-200">
                            <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                              Peak & Event Parameters
                            </span>
                            <p className="text-slate-700 text-xs leading-relaxed">
                              {shift.peak.notes}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>

          {/* Table Totals Footer */}
          <tfoot>
            {/* Total Weekly Hours Row */}
            <tr className="border-t-2 border-slate-300 bg-slate-100/90 font-bold text-slate-900">
              <td className="py-3.5 px-4 uppercase tracking-wider text-xs font-bold text-slate-800">
                Total Weekly Hours
              </td>
              <td
                className={`py-3.5 px-4 font-mono text-sm ${
                  activeScenario === 'standard' ? 'bg-blue-100/80 text-blue-950 font-extrabold' : ''
                }`}
              >
                47.0 Hours
              </td>
              <td
                className={`py-3.5 px-4 font-mono text-sm ${
                  activeScenario === 'busy' ? 'bg-blue-100/80 text-blue-950 font-extrabold' : ''
                }`}
              >
                51.25 Hours
              </td>
              <td
                className={`py-3.5 px-4 font-mono text-sm ${
                  activeScenario === 'peak' ? 'bg-blue-100/80 text-blue-950 font-extrabold' : ''
                }`}
              >
                54.75 Hours
              </td>
              <td className="no-print"></td>
            </tr>

            {/* Statutory Overtime (vs. 40h Legal Cap) Row */}
            <tr className="border-t border-slate-200 bg-blue-50/70 font-bold text-blue-900">
              <td className="py-3.5 px-4 uppercase tracking-wider text-xs font-bold flex flex-col justify-center">
                <span>Statutory Overtime</span>
                <span className="text-[10px] font-normal text-blue-700 capitalize">
                  vs. 40h Legal Cap (Art. 198)
                </span>
              </td>
              <td
                className={`py-3.5 px-4 font-mono text-sm ${
                  activeScenario === 'standard' ? 'bg-blue-200/70 text-blue-950 font-extrabold' : ''
                }`}
              >
                +7.0 Hours Overtime
              </td>
              <td
                className={`py-3.5 px-4 font-mono text-sm ${
                  activeScenario === 'busy' ? 'bg-blue-200/70 text-blue-950 font-extrabold' : ''
                }`}
              >
                +11.25 Hours Overtime
              </td>
              <td
                className={`py-3.5 px-4 font-mono text-sm ${
                  activeScenario === 'peak' ? 'bg-blue-200/70 text-blue-950 font-extrabold' : ''
                }`}
              >
                +14.75 Hours Overtime
              </td>
              <td className="no-print"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};
