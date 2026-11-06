import React, { useState } from 'react';
import { Printer, Copy, Check, BookOpen, Clock, Calendar, Users, Scale } from 'lucide-react';
import { ScenarioKey, SCENARIOS } from '../data/scheduleData';

interface ExecutiveHeaderProps {
  activeScenario: ScenarioKey | 'compare';
  onScenarioChange: (scenario: ScenarioKey | 'compare') => void;
  onOpenLegalModal: () => void;
}

export const ExecutiveHeader: React.FC<ExecutiveHeaderProps> = ({
  activeScenario,
  onScenarioChange,
  onOpenLegalModal,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    const text = `SCHEDULE RECONCILIATION PROPOSAL (December 2026 Trial)
To: Ege & Celine (Management) | From: Kitchen Staff Team
Standard Weekly Hours: 47.0h (Statutory Cap: 40.0h, Overtime: +7.0h/wk)
Busy Demand Hours: 51.25h (+11.25h/wk) | Peak Events Hours: 54.75h (+14.75h/wk)
Rest Days: Wednesdays & Thursdays (2 consecutive rest days)
Governing Law: Portuguese Labor Code (Arts. 198, 202, 268)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="border-b border-blue-100 bg-white/95 backdrop-blur-xs sticky top-0 z-30 transition-all shadow-xs">
      {/* Top Utility & Document Identification Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-blue-700">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span>
              <span>Official Memorandum · Kitchen Operations</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500 font-normal">Trial Period December 2026</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
              Schedule Reconciliation Proposal
            </h1>
            <p className="text-sm text-slate-600 mt-0.5 max-w-2xl">
              Operational schedule alignment, statutory working hours reconciliation, and digital attendance framework.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 no-print">
            <button
              onClick={onOpenLegalModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 hover:text-blue-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
              title="View Portuguese Labor Code Articles"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Legal Articles</span>
            </button>

            <button
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
              title="Copy executive briefing to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
              title="Print or export as clean PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Export PDF</span>
            </button>
          </div>
        </div>

        {/* Executive Meta Strip */}
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="flex items-start gap-2">
            <Users className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">Recipient</span>
              <span className="font-semibold text-slate-800">Ege & Celine (Management)</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">Submitted By</span>
              <span className="font-semibold text-slate-800">Kitchen Staff Team</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">Rest Schedule</span>
              <span className="font-semibold text-blue-700">Wed & Thu (Consecutive)</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <BookOpen className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">Statutory Framework</span>
              <span className="font-semibold text-slate-800">Art. 198, 202 & 268 CT</span>
            </div>
          </div>
        </div>

        {/* Interactive Scenario Switcher Bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 no-print">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <span>Operating Condition:</span>
          </div>

          <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => onScenarioChange('standard')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                activeScenario === 'standard'
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Standard Baseline <span className="font-mono ml-1 opacity-90">(47.0h)</span>
            </button>

            <button
              onClick={() => onScenarioChange('busy')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                activeScenario === 'busy'
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Busy / High Vol <span className="font-mono ml-1 opacity-90">(51.25h)</span>
            </button>

            <button
              onClick={() => onScenarioChange('peak')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                activeScenario === 'peak'
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Peak Events & Prep <span className="font-mono ml-1 opacity-90">(54.75h)</span>
            </button>

            <button
              onClick={() => onScenarioChange('compare')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                activeScenario === 'compare'
                  ? 'bg-slate-900 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Compare All Three
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
