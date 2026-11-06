import React, { useState } from 'react';
import { RECOMMENDATIONS, Recommendation } from '../data/scheduleData';
import { CheckCircle2, ChevronRight, Scale, Clock, Users, ArrowUpRight, HelpCircle } from 'lucide-react';

interface RecommendationsSectionProps {
  onOpenLegalModal: () => void;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  onOpenLegalModal,
}) => {
  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>({
    'baseline-overtime': true,
    'synchronous-arrival': false,
    'digital-attendance': true,
    'trial-milestone': false,
  });

  const toggleAcknowledge = (id: string) => {
    setAcknowledged((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const acknowledgedCount = Object.values(acknowledged).filter(Boolean).length;

  return (
    <div className="bg-white rounded-xl border border-blue-100 p-5 shadow-xs">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Operational Recommendations & Statutory Alignment
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              4 Action Frameworks
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Key protocols required to ensure operational equity, labor compliance, and transparent accounting during the December trial.
          </p>
        </div>

        {/* Status of review */}
        <div className="flex items-center gap-2 text-xs no-print">
          <span className="text-slate-500">Management Endorsement:</span>
          <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
            {acknowledgedCount} of 4 Accepted
          </span>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {RECOMMENDATIONS.map((rec, index) => {
          const isDone = !!acknowledged[rec.id];

          return (
            <div
              key={rec.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                isDone
                  ? 'border-blue-200 bg-blue-50/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header of Card */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-mono text-xs flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span className="text-xs font-semibold text-blue-700 font-mono">
                      {rec.legalCitation}
                    </span>
                  </div>

                  {/* Interactive Acknowledge Button */}
                  <button
                    onClick={() => toggleAcknowledge(rec.id)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md font-medium transition-colors no-print ${
                      isDone
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                    title="Click to toggle acknowledgement"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isDone ? 'Accepted' : 'Mark Reviewed'}</span>
                  </button>
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-900 text-sm mt-2.5 tracking-tight">
                  {rec.title}
                </h3>

                {/* Summary Prose */}
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {rec.summary}
                </p>

                {/* Core Action & Impact Box */}
                <div className="mt-3 p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-500 uppercase tracking-wider">Impact:</span>
                    <span className="font-mono font-bold text-blue-800">{rec.impact}</span>
                  </div>
                  <div className="text-slate-700 pt-1 border-t border-slate-200/60 leading-normal">
                    <strong className="text-slate-900 font-semibold">Action: </strong>
                    {rec.keyAction}
                  </div>
                </div>
              </div>

              {/* Statutory Note */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                <span className="truncate pr-2">{rec.statutoryDetail}</span>
                <button
                  onClick={onOpenLegalModal}
                  className="text-blue-600 hover:text-blue-800 shrink-0 font-medium no-print flex items-center gap-0.5"
                >
                  <span>Code</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
