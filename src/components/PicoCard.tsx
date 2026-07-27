import React from 'react';
import { PicoFramework } from '../types';
import { Users, Pill, Scale, Activity, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface PicoCardProps {
  pico: PicoFramework;
}

export const PicoCard: React.FC<PicoCardProps> = ({ pico }) => {
  const { population, intervention, comparator, outcomes } = pico;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
              <Activity className="w-5 h-5" />
            </span>
            <span>PICO Clinical Framework</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Structured breakdown of Population, Intervention, Comparator, and Outcomes.
          </p>
        </div>
      </div>

      {/* Grid of 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Population (P) */}
        <div className="p-4 rounded-xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-7 h-7 rounded-lg bg-sky-600 text-white font-extrabold flex items-center justify-center text-xs shadow-sm">
                P
              </span>
              <h3 className="font-bold text-sm text-sky-950 dark:text-sky-200">Population</h3>
            </div>
            {population.sampleSizeTotal > 0 && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200">
                <Users className="w-3 h-3" />
                <span>N = {population.sampleSizeTotal.toLocaleString()}</span>
              </span>
            )}
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
            {population.description}
          </p>

          {population.keyCharacteristics?.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-sky-800 dark:text-sky-400 uppercase tracking-wider block mb-1">
                Key Baseline Features:
              </span>
              <div className="flex flex-wrap gap-1">
                {population.keyCharacteristics.map((item, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded text-[11px] bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-sky-200 dark:border-sky-800">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(population.inclusionCriteria?.length || population.exclusionCriteria?.length) ? (
            <div className="pt-2 border-t border-sky-200/60 dark:border-sky-900/60 text-[11px] space-y-1">
              {population.inclusionCriteria?.length ? (
                <p className="text-slate-600 dark:text-slate-400">
                  <strong className="text-emerald-700 dark:text-emerald-400">Inclusion:</strong> {population.inclusionCriteria.join('; ')}
                </p>
              ) : null}
              {population.exclusionCriteria?.length ? (
                <p className="text-slate-600 dark:text-slate-400">
                  <strong className="text-rose-700 dark:text-rose-400">Exclusion:</strong> {population.exclusionCriteria.join('; ')}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* Intervention (I) */}
        <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-extrabold flex items-center justify-center text-xs shadow-sm">
                I
              </span>
              <h3 className="font-bold text-sm text-indigo-950 dark:text-indigo-200">Intervention</h3>
            </div>
            {intervention.dosage && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                {intervention.dosage}
              </span>
            )}
          </div>

          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              {intervention.name}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {intervention.details}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-indigo-200/60 dark:border-indigo-900/60">
            <div>
              <span className="text-slate-400 block">Route & Freq:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{intervention.route} ({intervention.frequency})</span>
            </div>
            <div>
              <span className="text-slate-400 block">Duration:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{intervention.duration}</span>
            </div>
          </div>
        </div>

        {/* Comparator (C) */}
        <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-7 h-7 rounded-lg bg-purple-600 text-white font-extrabold flex items-center justify-center text-xs shadow-sm">
                C
              </span>
              <h3 className="font-bold text-sm text-purple-950 dark:text-purple-200">Comparator / Control</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              {comparator.type}
            </span>
          </div>

          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              {comparator.name}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {comparator.details}
            </p>
          </div>
        </div>

        {/* Outcome (O) */}
        <div className="p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200/80 dark:border-teal-900/60 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-7 h-7 rounded-lg bg-teal-600 text-white font-extrabold flex items-center justify-center text-xs shadow-sm">
                O
              </span>
              <h3 className="font-bold text-sm text-teal-950 dark:text-teal-200">Outcomes</h3>
            </div>
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
              <Clock className="w-3 h-3" />
              <span>{outcomes.timeframe}</span>
            </span>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400 block mb-0.5">
              Primary Endpoint:
            </span>
            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
              {outcomes.primaryEndpoint}
            </p>
          </div>

          {outcomes.secondaryEndpoints?.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400 block mb-0.5">
                Secondary Endpoints:
              </span>
              <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-300 space-y-0.5">
                {outcomes.secondaryEndpoints.map((ep, idx) => (
                  <li key={idx}>{ep}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
