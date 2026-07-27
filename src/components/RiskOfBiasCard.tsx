import React from 'react';
import { RiskOfBiasAssessment, BiasDimension } from '../types';
import { ShieldAlert, ShieldCheck, Shield, AlertTriangle, Info } from 'lucide-react';

interface RiskOfBiasCardProps {
  riskOfBias: RiskOfBiasAssessment;
}

export const RiskOfBiasCard: React.FC<RiskOfBiasCardProps> = ({ riskOfBias }) => {
  const { overallRisk, overallSummary, selectionBias, blindingBias, attritionBias, reportingBias, otherBias } = riskOfBias;

  const renderRatingBadge = (rating: BiasDimension['rating']) => {
    switch (rating) {
      case 'Low':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Low Risk</span>
          </span>
        );
      case 'Moderate':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Moderate Risk</span>
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>High Risk</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <Info className="w-3.5 h-3.5 text-slate-500" />
            <span>Unclear Risk</span>
          </span>
        );
    }
  };

  const biasDomains = [
    { title: 'Selection Bias', desc: 'Random sequence generation & allocation concealment', data: selectionBias },
    { title: 'Performance & Blinding Bias', desc: 'Blinding of participants, care providers, and outcome assessors', data: blindingBias },
    { title: 'Attrition Bias', desc: 'Incomplete outcome data and handling of participant dropouts', data: attritionBias },
    { title: 'Selective Reporting Bias', desc: 'Consistency between pre-registered protocol endpoints and published results', data: reportingBias },
    ...(otherBias ? [{ title: 'Other Potential Bias', desc: 'Sponsorship or design limitations', data: otherBias }] : []),
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <span>Cochrane Risk of Bias Assessment</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Methodological quality evaluation across key internal validity domains.
          </p>
        </div>

        {/* Overall Badge */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Overall Assessment:</span>
          {renderRatingBadge(overallRisk)}
        </div>
      </div>

      {/* Overall Summary Banner */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
        <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">
          Methodological Summary:
        </span>
        {overallSummary}
      </div>

      {/* Domain Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {biasDomains.map((domain, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-2"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                {domain.title}
              </h3>
              {renderRatingBadge(domain.data?.rating || 'Unclear')}
            </div>
            
            <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">
              {domain.desc}
            </p>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-1 border-t border-slate-100 dark:border-slate-800/80">
              {domain.data?.justification || 'No specific details provided in abstract.'}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};
