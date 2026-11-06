import React from 'react';
import { X, Scale, ExternalLink, ShieldCheck, FileText } from 'lucide-react';
import { LEGAL_ARTICLES } from '../data/scheduleData';

interface LegalContextModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalContextModal: React.FC<LegalContextModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-blue-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                Portuguese Labor Code Reference
              </h3>
              <p className="text-xs text-slate-500">
                Código do Trabalho (Lei n.º 7/2009) · Statutory Labor Framework
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-600">
          <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-100 text-blue-900 leading-relaxed">
            <span className="font-bold block mb-1">Memorandum Context:</span>
            This reconciliation proposal benchmarks the December 2026 two-rest-day kitchen trial (Wednesdays & Thursdays)
            against mandatory Portuguese labor standards. Its purpose is to reconcile operational kitchen service demands with
            statutory overtime thresholds in full transparency between kitchen staff and restaurant management.
          </div>

          <div className="space-y-3">
            {LEGAL_ARTICLES.map((article) => (
              <div
                key={article.code}
                className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-blue-700 text-sm">
                    {article.code}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                    Statutory Provision
                  </span>
                </div>
                <div className="font-semibold text-slate-800 text-xs italic">
                  {article.heading}
                </div>
                <p className="text-slate-600 leading-relaxed pt-1 border-t border-slate-100 text-xs">
                  {article.excerpt}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Official Legal Source: Diário da República Eletrónico (DRE.pt)</span>
            <span className="font-mono text-slate-500">Trial Period: Dec 2026</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-xs"
          >
            Close Reference
          </button>
        </div>
      </div>
    </div>
  );
};
