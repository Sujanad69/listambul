import React from 'react';
import { Clock, ShieldCheck, AlertCircle, CalendarCheck } from 'lucide-react';
import { ScenarioKey, SCENARIOS, STATUTORY_WEEKLY_CAP } from '../data/scheduleData';

interface MetricCardsProps {
  activeScenario: ScenarioKey | 'compare';
}

export const MetricCards: React.FC<MetricCardsProps> = ({ activeScenario }) => {
  const current = activeScenario === 'compare' ? SCENARIOS.standard : SCENARIOS[activeScenario];
  const isComparison = activeScenario === 'compare';

  const overtimePercentage = ((current.overtimeHours / STATUTORY_WEEKLY_CAP) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Metric 1: Planned Shift Total */}
      <div className="bg-white rounded-xl border border-blue-100 p-5 shadow-xs hover:border-blue-300 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {isComparison ? 'Baseline Weekly Total' : `${current.shortLabel} Total`}
          </span>
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900 font-mono">
            {current.totalHours.toFixed(1)}
          </span>
          <span className="text-sm font-medium text-slate-500">hours / week</span>
        </div>
        <div className="mt-3">
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden flex">
            <div
              className="bg-blue-600 h-full"
              style={{ width: `${Math.min(100, (STATUTORY_WEEKLY_CAP / current.totalHours) * 100)}%` }}
              title="Statutory 40h standard"
            ></div>
            <div
              className="bg-blue-400 h-full"
              style={{ width: `${Math.max(0, (current.overtimeHours / current.totalHours) * 100)}%` }}
              title="Overtime surplus"
            ></div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 mt-1.5">
            <span>40h Standard: 100%</span>
            <span className="font-mono text-blue-700 font-medium">+{overtimePercentage}% surplus</span>
          </div>
        </div>
      </div>

      {/* Metric 2: Statutory 40-Hour Benchmark */}
      <div className="bg-white rounded-xl border border-blue-100 p-5 shadow-xs hover:border-blue-300 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Statutory Legal Cap
          </span>
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900 font-mono">
            40.0
          </span>
          <span className="text-sm font-medium text-slate-500">hours / week</span>
        </div>
        <div className="mt-3 text-xs text-slate-600 flex items-center justify-between pt-1 border-t border-slate-100">
          <span>Art. 198 Código do Trabalho</span>
          <span className="font-semibold text-slate-800">Mandatory Cap</span>
        </div>
      </div>

      {/* Metric 3: Statutory Overtime Accrual */}
      <div className="bg-white rounded-xl border border-blue-200 bg-linear-to-b from-blue-50/50 to-white p-5 shadow-xs hover:border-blue-400 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
            Overtime Accrual
          </span>
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
            <AlertCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-blue-700 font-mono">
            +{current.overtimeHours.toFixed(1)}
          </span>
          <span className="text-sm font-medium text-blue-800">hours / employee</span>
        </div>
        <div className="mt-3 text-xs text-slate-600 flex items-center justify-between pt-1 border-t border-blue-100">
          <span className="text-slate-500">Monthly Est. (4.3 wks)</span>
          <span className="font-mono font-bold text-blue-900">
            ~{(current.overtimeHours * 4.3).toFixed(1)} hrs
          </span>
        </div>
      </div>

      {/* Metric 4: Trial Rest Days */}
      <div className="bg-white rounded-xl border border-blue-100 p-5 shadow-xs hover:border-blue-300 transition-all">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Weekly Rest Allotment
          </span>
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <CalendarCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900 font-mono">
            2.0
          </span>
          <span className="text-sm font-medium text-slate-500">consecutive days</span>
        </div>
        <div className="mt-3 text-xs text-slate-600 flex items-center justify-between pt-1 border-t border-slate-100">
          <span className="font-semibold text-blue-700">Wednesdays & Thursdays</span>
          <span className="text-slate-500">5 Working Days</span>
        </div>
      </div>
    </div>
  );
};
