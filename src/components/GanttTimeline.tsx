import React from 'react';
import { Clock, Sun, Moon, Coffee, Shield } from 'lucide-react';

interface GanttTimelineProps {
  viewMode: 'standard' | 'busy' | 'peak' | 'all';
}

export const GanttTimeline: React.FC<GanttTimelineProps> = ({ viewMode }) => {
  // Focus on 11:00 AM to 00:30 AM (13.5 hours total span)
  const spanStart = 11.0; // 11:00 AM
  const spanEnd = 24.5; // 00:30 AM
  const totalSpan = spanEnd - spanStart; // 13.5 hours

  const toPercent = (hour: number) => {
    const clamped = Math.max(spanStart, Math.min(spanEnd, hour));
    return ((clamped - spanStart) / totalSpan) * 100;
  };

  const days = [
    { name: 'Monday', short: 'Mon', type: 'split' },
    { name: 'Tuesday', short: 'Tue', type: 'single' },
    { name: 'Wednesday', short: 'Wed', type: 'rest' },
    { name: 'Thursday', short: 'Thu', type: 'rest' },
    { name: 'Friday', short: 'Fri', type: 'split' },
    { name: 'Saturday', short: 'Sat', type: 'split' },
    { name: 'Sunday', short: 'Sun', type: 'split' },
  ];

  const getShiftTimes = (dayName: string) => {
    if (dayName === 'Wednesday' || dayName === 'Thursday') return null;

    if (dayName === 'Tuesday') {
      const prepStart = viewMode === 'peak' ? 11.0 : viewMode === 'busy' ? 11.5 : 11.75;
      const endHour = viewMode === 'peak' ? 17.5 : viewMode === 'busy' ? 17.5 : 16.5;
      const totalHours = viewMode === 'peak' ? 6.5 : viewMode === 'busy' ? 6.0 : 5.0;
      return {
        isSplit: false,
        totalHours,
        singleBlock: {
          start: prepStart,
          end: endHour,
          timeStr: `${prepStart === 11.0 ? '11:00' : prepStart === 11.5 ? '11:30' : '11:45'} – ${
            endHour === 16.5 ? '16:30' : '17:30'
          }`,
          label: 'Prep, Lunch & Clean (16:30)',
          mobileLabel: 'Lunch & Clean (16:30)',
        },
      };
    }

    // Split days (Mon, Fri, Sat, Sun)
    const prepStart = viewMode === 'standard' || viewMode === 'all' ? 11.75 : 11.0;
    const lunchEnd = 16.5;
    const breakStart = 16.5;
    const breakEnd = 18.0;
    const dinnerStart = 18.0;
    const dinnerEnd = 23.75;

    let overtimeEnd = null;
    let total = 10.5;

    if (viewMode === 'busy') {
      total = dayName === 'Saturday' ? 11.5 : 11.25;
      overtimeEnd = 24.0; // 00:00
    } else if (viewMode === 'peak') {
      total = dayName === 'Saturday' ? 12.25 : 12.0;
      overtimeEnd = dayName === 'Saturday' ? 24.75 : 24.5; // 00:45 or 00:30
    }

    return {
      isSplit: true,
      totalHours: total,
      morning: {
        start: prepStart,
        end: lunchEnd,
        timeStr: `${prepStart === 11.0 ? '11:00' : '11:45'} – 16:30`,
        label: 'Lunch Shift',
        mobileLabel: 'Lunch',
      },
      intermission: {
        start: breakStart,
        end: breakEnd,
        timeStr: '16:30 – 18:00',
        label: 'Unpaid Break',
        mobileLabel: 'Break',
      },
      dinner: {
        start: dinnerStart,
        end: dinnerEnd,
        timeStr: '18:00 – 23:45',
        label: 'Dinner & Close',
        mobileLabel: 'Dinner',
      },
      overtime: overtimeEnd
        ? {
            start: dinnerEnd,
            end: overtimeEnd,
            timeStr: `23:45 – ${overtimeEnd >= 24.0 ? '00:' + Math.round((overtimeEnd - 24) * 60).toString().padStart(2, '0') : '23:45'}`,
            label: '+OT',
          }
        : null,
    };
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3.5 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight uppercase">
              Daily Split-Shift Timeline Visualizer
            </h3>
            <span className="text-[10px] sm:text-[11px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 font-mono">
              11:00 – 00:30
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
            Visual comparison of morning service, 2-hour unpaid afternoon intermission, and evening dinner close.
          </p>
        </div>

        {/* Legend - Responsive Wrap */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] text-slate-600 self-start sm:self-auto pt-1 sm:pt-0">
          <div className="flex items-center gap-1">
            <span className="w-3 h-2.5 rounded-xs bg-blue-900"></span>
            <span>Lunch</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-2.5 rounded-xs bg-blue-50 border border-dashed border-blue-400"></span>
            <span className="text-blue-800">2h Break</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-2.5 rounded-xs bg-blue-600"></span>
            <span>Dinner</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-2.5 rounded-xs bg-slate-100 border border-slate-300"></span>
            <span className="text-slate-400">Rest</span>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Wrapper for Mobile with Native Touch Handling */}
      <div className="overflow-x-auto -mx-3.5 sm:mx-0 px-3.5 sm:px-0 scrollbar-thin">
        <div className="min-w-[540px] sm:min-w-full space-y-2.5">
          {/* Timeline Hour Scale Ruler (Optimized for Mobile with Zero Overlap) */}
          <div className="pl-20 sm:pl-32 pr-2">
            <div className="relative h-5 text-[10px] font-mono text-slate-400 border-b border-slate-200">
              <span className="absolute left-0 -translate-x-1/2 font-semibold text-slate-600">11:00</span>
              <span className="absolute left-[7.4%] -translate-x-1/2 text-blue-700 font-bold hidden sm:inline">11:45</span>
              <span className="absolute left-[22.2%] -translate-x-1/2 hidden sm:inline">14:00</span>
              <span className="absolute left-[40.7%] -translate-x-1/2 font-semibold text-slate-700 whitespace-nowrap">
                <span className="sm:hidden">16:30</span>
                <span className="hidden sm:inline">16:30 (Break)</span>
              </span>
              <span className="absolute left-[51.8%] -translate-x-1/2 font-semibold text-slate-700 whitespace-nowrap">
                <span className="sm:hidden">18:00</span>
                <span className="hidden sm:inline">18:00 (Dinner)</span>
              </span>
              <span className="absolute left-[66.7%] -translate-x-1/2 hidden sm:inline">20:00</span>
              <span className="absolute left-[94.4%] -translate-x-1/2 font-bold text-blue-700 whitespace-nowrap">
                <span className="sm:hidden">23:45</span>
                <span className="hidden sm:inline">23:45 (Close)</span>
              </span>
              <span className="absolute right-0 translate-x-1/2 text-slate-600 hidden sm:inline">00:30</span>
            </div>
          </div>

          {/* 7 Daily Visual Rows */}
          {days.map((d) => {
            const shift = getShiftTimes(d.name);
            const isRest = !shift;

            return (
              <div key={d.name} className="flex items-center gap-2 sm:gap-3">
                {/* Day Name & Total Hours Badge */}
                <div className="w-20 sm:w-32 shrink-0 flex items-center justify-between pr-1 sm:pr-2">
                  <span className="text-xs font-bold text-slate-900">
                    <span className="sm:hidden">{d.short}</span>
                    <span className="hidden sm:inline">{d.name}</span>
                  </span>
                  <span
                    className={`font-mono text-[11px] px-1.5 py-0.5 rounded ${
                      isRest
                        ? 'bg-slate-100 text-slate-400'
                        : 'bg-blue-50 text-blue-800 font-bold border border-blue-200'
                    }`}
                  >
                    {isRest ? '0h' : `${shift.totalHours.toFixed(1)}h`}
                  </span>
                </div>

                {/* Timeline Track */}
                <div className="grow relative h-7 sm:h-8 bg-slate-50 border border-slate-200 rounded-lg overflow-hidden flex items-center">
                  {isRest ? (
                    <div className="w-full h-full bg-slate-100/90 flex items-center justify-center">
                      <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500 font-mono">
                        CONSECUTIVE REST DAY · CLOSED
                      </span>
                    </div>
                  ) : !shift.isSplit ? (
                    /* Single daytime shift (Tuesday) */
                    <div
                      className="absolute top-0 bottom-0 bg-blue-900 text-white flex items-center px-2 sm:px-3 text-[11px] sm:text-xs font-semibold rounded shadow-2xs"
                      style={{
                        left: `${toPercent(shift.singleBlock!.start)}%`,
                        width: `${toPercent(shift.singleBlock!.end) - toPercent(shift.singleBlock!.start)}%`,
                      }}
                    >
                      <span className="truncate">
                        <span className="sm:hidden">{shift.singleBlock!.mobileLabel}</span>
                        <span className="hidden sm:inline">{shift.singleBlock!.label}</span>
                        <span className="ml-1 font-mono text-[10px] opacity-80">({shift.singleBlock!.timeStr})</span>
                      </span>
                    </div>
                  ) : (
                    /* Split shift day (Mon, Fri, Sat, Sun) */
                    <>
                      {/* Morning Lunch Shift */}
                      <div
                        className="absolute top-0 bottom-0 bg-blue-900 text-white flex items-center justify-between px-1.5 sm:px-2.5 text-[11px] sm:text-xs font-medium rounded-l shadow-2xs z-10"
                        style={{
                          left: `${toPercent(shift.morning!.start)}%`,
                          width: `${toPercent(shift.morning!.end) - toPercent(shift.morning!.start)}%`,
                        }}
                        title={`Morning Service: ${shift.morning!.timeStr}`}
                      >
                        <span className="truncate font-semibold">
                          <span className="sm:hidden">Lunch</span>
                          <span className="hidden sm:inline">{shift.morning!.label}</span>
                        </span>
                        <span className="font-mono text-[9px] sm:text-[10px] text-blue-200 hidden md:inline ml-1">
                          {shift.morning!.timeStr}
                        </span>
                      </div>

                      {/* 2-Hour Unpaid Break */}
                      <div
                        className="absolute top-0 bottom-0 bg-blue-50 border-y border-dashed border-blue-300 flex items-center justify-center text-blue-800 text-[10px] sm:text-[11px] font-semibold font-mono z-0 px-0.5"
                        style={{
                          left: `${toPercent(shift.intermission!.start)}%`,
                          width: `${toPercent(shift.intermission!.end) - toPercent(shift.intermission!.start)}%`,
                        }}
                        title="Afternoon Split-Shift Break (Unpaid)"
                      >
                        <span className="truncate">
                          <span className="sm:hidden">2h</span>
                          <span className="hidden sm:inline">16:00–18:00 (2h Break)</span>
                        </span>
                      </div>

                      {/* Dinner Service Shift */}
                      <div
                        className="absolute top-0 bottom-0 bg-blue-600 text-white flex items-center justify-between px-1.5 sm:px-2.5 text-[11px] sm:text-xs font-medium rounded-r shadow-2xs z-10"
                        style={{
                          left: `${toPercent(shift.dinner!.start)}%`,
                          width: `${toPercent(shift.dinner!.end) - toPercent(shift.dinner!.start)}%`,
                        }}
                        title={`Dinner Service: ${shift.dinner!.timeStr}`}
                      >
                        <span className="truncate font-semibold">
                          <span className="sm:hidden">Dinner</span>
                          <span className="hidden sm:inline">{shift.dinner!.label}</span>
                        </span>
                        <span className="font-mono text-[9px] sm:text-[10px] text-blue-100 hidden md:inline ml-1">
                          {shift.dinner!.timeStr}
                        </span>
                      </div>

                      {/* Overtime Extension if active */}
                      {shift.overtime && (
                        <div
                          className="absolute top-0 bottom-0 bg-blue-400 text-blue-950 flex items-center justify-center text-[9px] sm:text-[10px] font-bold font-mono px-0.5 sm:px-1 z-20"
                          style={{
                            left: `${toPercent(shift.overtime.start)}%`,
                            width: `${toPercent(shift.overtime.end) - toPercent(shift.overtime.start)}%`,
                          }}
                          title={`Overtime Extension: ${shift.overtime.timeStr}`}
                        >
                          <span>{shift.overtime.label}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Swipe hint for small screens */}
      <div className="text-[10px] text-slate-400 sm:hidden text-right italic pt-0.5">
        ⇄ Swipe horizontally to inspect full timeline hours
      </div>

      {/* Full Schedule Text Summary (Visible always and in print) */}
      <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs text-slate-600">
        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
          <strong className="text-slate-900 block font-semibold text-[11px] sm:text-xs">
            Standard Split Days (Mon, Fri, Sat, Sun):
          </strong>
          <span className="font-mono text-slate-700 text-[11px]">11:45–16:30</span> (Lunch, 4.75h) +{' '}
          <span className="font-mono text-slate-700 text-[11px]">18:00–23:45</span> (Dinner, 5.75h) ={' '}
          <strong className="text-blue-700 font-bold font-mono text-[11px]">10.5 hrs</strong>
        </div>
        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
          <strong className="text-slate-900 block font-semibold text-[11px] sm:text-xs">
            Single Service Day (Tuesday):
          </strong>
          <span className="font-mono text-slate-700 text-[11px]">11:30–16:30</span> (Lunch &amp; clean to 16:30) ={' '}
          <strong className="text-blue-700 font-bold font-mono text-[11px]">5.0 hrs</strong> (Evening Closed)
        </div>
        <div className="p-2.5 bg-blue-50/70 rounded-lg border border-blue-200">
          <strong className="text-blue-900 block font-semibold text-[11px] sm:text-xs">
            Weekly Total Baseline:
          </strong>
          4 days @ 10.5h + 1 day @ 5.0h ={' '}
          <strong className="text-blue-900 font-bold font-mono text-[11px]">47.0 hrs / week</strong> (+7.0h overtime)
        </div>
      </div>
    </div>
  );
};
