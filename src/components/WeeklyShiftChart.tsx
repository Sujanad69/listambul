import React, { useState } from 'react';
import { WEEKLY_SCHEDULE, ScenarioKey, ShiftDetail } from '../data/scheduleData';
import { Info, Coffee, Utensils, Moon } from 'lucide-react';

interface WeeklyShiftChartProps {
  activeScenario: ScenarioKey | 'compare';
  selectedDay: string;
  onSelectDay: (day: string) => void;
}

export const WeeklyShiftChart: React.FC<WeeklyShiftChartProps> = ({
  activeScenario,
  selectedDay,
  onSelectDay,
}) => {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  const activeShift = WEEKLY_SCHEDULE.find((s) => s.day === selectedDay) || WEEKLY_SCHEDULE[0];
  const maxHours = 13.0; // scale reference

  const getEffectiveHours = (shift: ShiftDetail, scenario: ScenarioKey) => {
    return shift[scenario].hours;
  };

  return (
    <div className="bg-white rounded-xl border border-blue-100 p-5 shadow-xs">
      {/* Header of Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Daily Shift Distribution & Overtime Thresholds</span>
            <span className="text-xs font-normal text-slate-500 font-mono">
              (8.0h Daily Baseline Reference)
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any day bar to inspect operational shift windows, mise en place calls, and shutdown timelines.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs text-slate-600 self-start sm:self-auto">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-blue-600"></span>
            <span>Standard (10.5h)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-blue-400"></span>
            <span>Extended / Peak</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-slate-100 border border-slate-200"></span>
            <span>Rest (0.0h)</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="mt-6 grid grid-cols-7 gap-2 sm:gap-4 items-end h-64 pt-6 pb-2 px-1 border-b border-slate-100">
        {WEEKLY_SCHEDULE.map((shift) => {
          const isRest = shift.standard.hours === 0;
          const isSelected = shift.day === selectedDay;
          const isHovered = shift.day === hoveredDay;

          // Hours for current display
          const stdHours = shift.standard.hours;
          const busyHours = shift.busy.hours;
          const peakHours = shift.peak.hours;

          let displayHours = stdHours;
          if (activeScenario === 'busy') displayHours = busyHours;
          if (activeScenario === 'peak') displayHours = peakHours;

          const heightPercent = isRest ? 6 : (displayHours / maxHours) * 100;
          const baselineHeightPercent = isRest ? 0 : (8.0 / maxHours) * 100;

          return (
            <div
              key={shift.day}
              className="flex flex-col items-center h-full justify-end cursor-pointer group"
              onClick={() => onSelectDay(shift.day)}
              onMouseEnter={() => setHoveredDay(shift.day)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              {/* Value Label on Top */}
              <div
                className={`text-[11px] font-mono mb-1.5 transition-all font-semibold ${
                  isSelected
                    ? 'text-blue-700 font-bold scale-110'
                    : isRest
                    ? 'text-slate-400'
                    : 'text-slate-600 group-hover:text-blue-600'
                }`}
              >
                {isRest ? '0h' : `${displayHours}h`}
              </div>

              {/* Bar Container */}
              <div
                className={`w-full max-w-[44px] rounded-t-md transition-all relative flex flex-col justify-end overflow-hidden ${
                  isSelected
                    ? 'ring-2 ring-blue-600 ring-offset-2'
                    : isHovered
                    ? 'ring-1 ring-blue-400'
                    : ''
                }`}
                style={{ height: `${heightPercent}%` }}
              >
                {isRest ? (
                  <div className="w-full h-full bg-slate-100 border border-dashed border-slate-300 rounded-t-md flex items-center justify-center">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Rest
                    </span>
                  </div>
                ) : (
                  <>
                    {/* Overtime Portion (>8.0h) */}
                    {displayHours > 8.0 && (
                      <div
                        className="w-full bg-linear-to-t from-blue-500 to-blue-400 transition-colors"
                        style={{
                          height: `${((displayHours - 8.0) / displayHours) * 100}%`,
                        }}
                        title={`Overtime portion: +${(displayHours - 8.0).toFixed(2)}h`}
                      />
                    )}
                    {/* Standard Baseline Portion (<= 8.0h) */}
                    <div
                      className="w-full bg-blue-600 transition-colors"
                      style={{
                        height: displayHours > 8.0 ? `${(8.0 / displayHours) * 100}%` : '100%',
                      }}
                      title="Standard 8h work block"
                    />
                  </>
                )}
              </div>

              {/* Day Label Below */}
              <div
                className={`mt-2.5 text-xs font-semibold text-center transition-colors ${
                  isSelected
                    ? 'text-blue-700 font-bold'
                    : isRest
                    ? 'text-slate-400'
                    : 'text-slate-700'
                }`}
              >
                <span className="hidden sm:inline">{shift.day}</span>
                <span className="sm:hidden">{shift.shortDay}</span>
              </div>

              {/* Tag indicator */}
              <div className="text-[10px] text-slate-400 mt-0.5">
                {isRest ? 'Closed' : shift.day === 'Tuesday' ? 'Single' : 'Split'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Day Interactive Drilldown Box */}
      <div className="mt-4 p-4 bg-blue-50/50 rounded-lg border border-blue-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              Selected Detail: {activeShift.day}
            </span>
            {activeShift.standard.hours === 0 ? (
              <span className="text-[11px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                Official Rest Day (Kitchen Dark)
              </span>
            ) : (
              <span className="text-[11px] font-medium text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                Active Service ({activeShift.standard.hours}h Baseline)
              </span>
            )}
          </div>
          <p className="text-xs text-slate-600 max-w-2xl">
            {activeShift.standard.hours === 0
              ? 'Complete kitchen closure under the December trial schedule, ensuring two uninterrupted consecutive rest days (Wed & Thu).'
              : activeShift.standard.notes}
          </p>
        </div>

        {/* Schedule Timing Blocks */}
        {activeShift.standard.hours > 0 && (
          <div className="flex flex-wrap items-center gap-3 text-xs shrink-0 font-mono">
            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-md border border-slate-200">
              <Utensils className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-slate-500 font-sans">Shift:</span>
              <span className="font-semibold text-slate-800">
                {activeScenario === 'standard' || activeScenario === 'compare'
                  ? activeShift.standard.schedule
                  : activeScenario === 'busy'
                  ? activeShift.busy.schedule
                  : activeShift.peak.schedule}
              </span>
            </div>

            {activeShift.standard.splitShift && (
              <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-md border border-slate-200">
                <Coffee className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-slate-500 font-sans">Break:</span>
                <span className="font-semibold text-slate-800">16:00 – 18:00 (2.0h)</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-md border border-slate-200">
              <Moon className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-slate-500 font-sans">Close:</span>
              <span className="font-semibold text-slate-800">
                {activeScenario === 'peak' ? '00:00 - 00:15' : '23:30 - 23:45'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
