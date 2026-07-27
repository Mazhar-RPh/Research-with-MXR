import React from 'react';
import { StatisticalResults } from '../types';
import { BarChart3, Users, CheckCircle2, AlertCircle, PieChart, TrendingUp, Cpu } from 'lucide-react';

interface StatisticalRigorCardProps {
  statistics: StatisticalResults;
}

export const StatisticalRigorCard: React.FC<StatisticalRigorCardProps> = ({ statistics }) => {
  const { sampleSize, primaryEffectSize, secondaryResults, statisticalPower, analysisType } = statistics;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <BarChart3 className="w-5 h-5" />
            </span>
            <span>Biostatistical Rigor & Effect Sizes</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Sample size distribution, hazard ratios, confidence intervals, and p-value statistical testing.
          </p>
        </div>

        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
          <Cpu className="w-3.5 h-3.5 mr-1 text-slate-500" />
          <span>{analysisType} Analysis</span>
        </span>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Metric 1: Total Sample Size */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Total Sample Size</span>
            <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
            {sampleSize.total ? sampleSize.total.toLocaleString() : 'N/A'}
          </p>
          <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-800">
            <span>Rx: {sampleSize.interventionGroup?.toLocaleString() || 'N/A'}</span>
            <span>Ctrl: {sampleSize.controlGroup?.toLocaleString() || 'N/A'}</span>
          </div>
        </div>

        {/* Metric 2: Primary Effect Metric & Value */}
        <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 space-y-1">
          <div className="flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300 font-semibold">
            <span>{primaryEffectSize.metric || 'Effect Size'}</span>
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-950 dark:text-emerald-100">
            {primaryEffectSize.value || 'N/A'}
          </p>
          <p className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
            95% CI: [{primaryEffectSize.ci95 || 'N/A'}]
          </p>
        </div>

        {/* Metric 3: P-value & Significance */}
        <div className={`p-4 rounded-xl border space-y-1 ${
          primaryEffectSize.statisticallySignificant
            ? 'bg-sky-50/70 dark:bg-sky-950/40 border-sky-200 dark:border-sky-900/60'
            : 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60'
        }`}>
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className={primaryEffectSize.statisticallySignificant ? 'text-sky-800 dark:text-sky-300' : 'text-amber-800 dark:text-amber-300'}>
              Statistical Significance
            </span>
            {primaryEffectSize.statisticallySignificant ? (
              <CheckCircle2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            )}
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-slate-100">
            {primaryEffectSize.pValue || 'N/A'}
          </p>
          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
            primaryEffectSize.statisticallySignificant
              ? 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200'
              : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
          }`}>
            {primaryEffectSize.statisticallySignificant ? 'p < 0.05 (Significant)' : 'Not Significant'}
          </span>
        </div>

      </div>

      {/* Secondary Endpoints Table */}
      {secondaryResults && secondaryResults.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
            Secondary & Subgroup Endpoint Results
          </h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Endpoint / Subgroup</th>
                  <th className="p-3">Effect Value</th>
                  <th className="p-3">95% CI</th>
                  <th className="p-3">p-value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                {secondaryResults.map((sec, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-medium">{sec.endpoint}</td>
                    <td className="p-3 font-semibold">{sec.effectValue}</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">{sec.ci95 || '—'}</td>
                    <td className="p-3 font-mono">
                      <span className={sec.significant ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-500'}>
                        {sec.pValue || '—'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Statistical Power Statement */}
      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start space-x-2.5">
        <PieChart className="w-4 h-4 text-sky-600 dark:text-sky-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-bold text-slate-900 dark:text-slate-100 block">Statistical Power & Trial Design Notes:</span>
          <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
            {statisticalPower}
          </p>
        </div>
      </div>

    </div>
  );
};
