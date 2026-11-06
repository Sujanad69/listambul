import React, { useState } from 'react';
import { Users, Calculator, Coins, Palmtree, ArrowRight, ShieldAlert } from 'lucide-react';
import { ScenarioKey, SCENARIOS } from '../data/scheduleData';

interface OvertimeSimulatorProps {
  activeScenario: ScenarioKey | 'compare';
}

export const OvertimeSimulator: React.FC<OvertimeSimulatorProps> = ({ activeScenario }) => {
  const [teamSize, setTeamSize] = useState<number>(4);
  const [settlementMode, setSettlementMode] = useState<'comp_time' | 'payroll'>('comp_time');
  const [hourlyRate, setHourlyRate] = useState<number>(11.5); // Average hourly wage in EUR

  const currentScenarioKey: ScenarioKey =
    activeScenario === 'compare' ? 'standard' : activeScenario;
  const currentScenario = SCENARIOS[currentScenarioKey];

  // Calculations
  const weeklyOtPerPerson = currentScenario.overtimeHours;
  const monthlyOtPerPerson = weeklyOtPerPerson * 4.3; // December has ~4.3 weeks
  const totalWeeklyTeamOt = weeklyOtPerPerson * teamSize;
  const totalMonthlyTeamOt = monthlyOtPerPerson * teamSize;

  // Comp time: 1 rest day = 8.0h shift
  const totalMonthlyRestDays = (totalMonthlyTeamOt / 8.0).toFixed(1);
  const perPersonRestDays = (monthlyOtPerPerson / 8.0).toFixed(1);

  // Overtime pay multiplier under Portuguese Labor Code (typically 1.25x for 1st hour, 1.5x thereafter, average ~1.375x)
  const otMultiplier = 1.35;
  const monthlyPayrollCost = (totalMonthlyTeamOt * hourlyRate * otMultiplier).toFixed(0);
  const weeklyPayrollCost = (totalWeeklyTeamOt * hourlyRate * otMultiplier).toFixed(0);

  return (
    <div className="bg-white rounded-xl border border-blue-200 p-5 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Interactive Overtime & Comp-Time Impact Model
            </h3>
            <p className="text-xs text-slate-500">
              Model team reconciliation parameters, compensatory rest days, and payroll provisions for December.
            </p>
          </div>
        </div>

        {/* Settlement Mode Toggle */}
        <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 self-start md:self-auto text-xs">
          <button
            onClick={() => setSettlementMode('comp_time')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              settlementMode === 'comp_time'
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Palmtree className="w-3.5 h-3.5" />
            <span>Compensatory Rest Days</span>
          </button>
          <button
            onClick={() => setSettlementMode('payroll')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
              settlementMode === 'payroll'
                ? 'bg-blue-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Coins className="w-3.5 h-3.5" />
            <span>Statutory Overtime Pay</span>
          </button>
        </div>
      </div>

      {/* Simulator Control Sliders & KPI Output Grid */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Section (5 cols) */}
        <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-4 lg:border-r border-slate-100">
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                Kitchen Brigade Headcount:
              </span>
              <span className="font-mono text-sm font-bold text-blue-700">
                {teamSize} Staff Members
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={8}
              step={1}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>2 Chefs</span>
              <span>4 Staff (Typical)</span>
              <span>8 Brigade</span>
            </div>
          </div>

          {settlementMode === 'payroll' && (
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                <span>Average Hourly Base Rate:</span>
                <span className="font-mono text-sm font-bold text-blue-700">€{hourlyRate.toFixed(2)} / hr</span>
              </div>
              <input
                type="range"
                min={8.5}
                max={18.0}
                step={0.5}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>€8.50/h (Base)</span>
                <span>€11.50/h</span>
                <span>€18.00/h (Senior)</span>
              </div>
            </div>
          )}

          <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 space-y-1.5">
            <div className="font-semibold text-slate-800 flex items-center justify-between">
              <span>Selected Baseline:</span>
              <span className="text-blue-700 font-bold">{currentScenario.label}</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Each staff member logs {currentScenario.totalHours}h weekly ({currentScenario.overtimeHours}h above the 40h statutory baseline).
            </p>
          </div>
        </div>

        {/* Dynamic Outputs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {/* Team Weekly Overtime */}
            <div className="p-3.5 bg-blue-50/60 rounded-lg border border-blue-100">
              <span className="text-[11px] font-semibold text-blue-900 uppercase tracking-wider block mb-1">
                Brigade Weekly OT
              </span>
              <span className="text-2xl font-extrabold font-mono text-blue-700">
                {totalWeeklyTeamOt.toFixed(1)}
              </span>
              <span className="text-xs text-slate-500 block font-sans">hours / team / wk</span>
            </div>

            {/* Total Monthly Team Overtime */}
            <div className="p-3.5 bg-blue-50/60 rounded-lg border border-blue-100">
              <span className="text-[11px] font-semibold text-blue-900 uppercase tracking-wider block mb-1">
                Month Total (4.3 wks)
              </span>
              <span className="text-2xl font-extrabold font-mono text-blue-900">
                {totalMonthlyTeamOt.toFixed(1)}
              </span>
              <span className="text-xs text-slate-500 block font-sans">total accrued hours</span>
            </div>

            {/* Settlement Output (Comp Time or Payroll) */}
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block mb-1">
                {settlementMode === 'comp_time' ? 'Rest Days Earned' : 'Estimated Provision'}
              </span>
              <span className="text-2xl font-extrabold font-mono text-slate-900">
                {settlementMode === 'comp_time' ? `${totalMonthlyRestDays}d` : `€${monthlyPayrollCost}`}
              </span>
              <span className="text-xs text-slate-500 block font-sans">
                {settlementMode === 'comp_time'
                  ? `~${perPersonRestDays} days / chef`
                  : `€${weeklyPayrollCost} / week team`}
              </span>
            </div>
          </div>

          {/* Operational Reconciliation Policy Insight */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-800">Recommendation:</strong> Under Art. 268 of the Portuguese Labor Code,
              hours can be converted into compensatory rest periods or scheduled as post-trial rest days during lower volume periods,
              safeguarding kitchen budget while honoring staff recovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
