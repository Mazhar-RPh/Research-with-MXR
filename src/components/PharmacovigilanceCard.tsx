import React from 'react';
import { PharmacovigilanceNotes } from '../types';
import { AlertOctagon, Activity, Pill, ShieldAlert, HeartPulse, Stethoscope, Lightbulb, AlertTriangle } from 'lucide-react';

interface PharmacovigilanceCardProps {
  pharmacovigilance: PharmacovigilanceNotes;
}

export const PharmacovigilanceCard: React.FC<PharmacovigilanceCardProps> = ({ pharmacovigilance }) => {
  const { adverseEvents, seriousAdverseEventsSummary, blackBoxWarningsOrContraindications, monitoringRecommendations, drugInteractions, pharmacistClinicalPearls } = pharmacovigilance;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <span>Pharmacovigilance & Patient Safety Notes</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Adverse event profile, monitoring protocols, warnings, and clinical pearls for pharmacists.
          </p>
        </div>

        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
          <HeartPulse className="w-3.5 h-3.5 mr-1" />
          <span>Safety Profile</span>
        </span>
      </div>

      {/* Black Box Warnings / Contraindications Banner if present */}
      {blackBoxWarningsOrContraindications && blackBoxWarningsOrContraindications.length > 0 && (
        <div className="p-4 rounded-xl bg-rose-50/90 dark:bg-rose-950/60 border-2 border-rose-300 dark:border-rose-800 space-y-2">
          <div className="flex items-center space-x-2 text-rose-900 dark:text-rose-200 font-bold text-xs uppercase tracking-wider">
            <AlertOctagon className="w-4 h-4 text-rose-600 dark:text-rose-400 animate-pulse" />
            <span>Black Box Warnings & Critical Contraindications</span>
          </div>
          <ul className="space-y-1 pl-1">
            {blackBoxWarningsOrContraindications.map((warning, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-xs font-semibold text-rose-950 dark:text-rose-100">
                <span className="text-rose-600 dark:text-rose-400">•</span>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Adverse Events Table */}
      {adverseEvents && adverseEvents.length > 0 && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2 flex items-center space-x-1.5">
            <Activity className="w-3.5 h-3.5 text-slate-500" />
            <span>Reported Adverse Events (AEs)</span>
          </h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Adverse Reaction</th>
                  <th className="p-3">Intervention Rate</th>
                  <th className="p-3">Control Rate</th>
                  <th className="p-3">Severity</th>
                  <th className="p-3">p-value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                {adverseEvents.map((ae, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-semibold">{ae.event}</td>
                    <td className="p-3 text-rose-600 dark:text-rose-400 font-bold">{ae.interventionRate}</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">{ae.controlRate || '—'}</td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        ae.severity === 'Severe' || ae.severity === 'Life-threatening'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : ae.severity === 'Moderate'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {ae.severity}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-500">{ae.pValue || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Serious Adverse Events Summary */}
      {seriousAdverseEventsSummary && (
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
          <span className="font-bold text-slate-900 dark:text-slate-100 block mb-0.5">
            Serious Adverse Events (SAE) Overview:
          </span>
          {seriousAdverseEventsSummary}
        </div>
      )}

      {/* Pharmacist Laboratory & Clinical Monitoring Protocol */}
      {monitoringRecommendations && (
        <div className="p-4 rounded-xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-900/60 space-y-3">
          <div className="flex items-center space-x-2 text-sky-900 dark:text-sky-200 font-bold text-xs uppercase tracking-wider">
            <Stethoscope className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Pharmacist Laboratory & Organ Function Monitoring Protocol</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Required Baseline & Routine Lab Tests:
              </span>
              <div className="flex flex-wrap gap-1">
                {monitoringRecommendations.labTests?.map((lab, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded text-[11px] font-semibold bg-white dark:bg-slate-900 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                    {lab}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Monitoring Frequency:
              </span>
              <p className="text-slate-600 dark:text-slate-400 font-medium">
                {monitoringRecommendations.frequency}
              </p>
            </div>
          </div>

          {monitoringRecommendations.specialPopulations && (
            <div className="pt-2 border-t border-sky-200/60 dark:border-sky-900/60 text-xs text-slate-700 dark:text-slate-300">
              <strong className="text-sky-800 dark:text-sky-300">Special Population Considerations (Renal / Hepatic): </strong>
              {monitoringRecommendations.specialPopulations}
            </div>
          )}
        </div>
      )}

      {/* Drug Interactions & Pharmacist Clinical Pearls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Drug Interactions */}
        {drugInteractions && drugInteractions.length > 0 && (
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 space-y-2">
            <div className="flex items-center space-x-1.5 text-amber-900 dark:text-amber-200 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Potential Drug Interactions</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
              {drugInteractions.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <span className="text-amber-600 dark:text-amber-400">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pharmacist Clinical Pearls */}
        {pharmacistClinicalPearls && pharmacistClinicalPearls.length > 0 && (
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/60 space-y-2">
            <div className="flex items-center space-x-1.5 text-emerald-900 dark:text-emerald-200 font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Pharmacist Clinical Pearls</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
              {pharmacistClinicalPearls.map((pearl, idx) => (
                <li key={idx} className="flex items-start space-x-1.5">
                  <span className="text-emerald-600 dark:text-emerald-400">•</span>
                  <span>{pearl}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>

    </div>
  );
};
