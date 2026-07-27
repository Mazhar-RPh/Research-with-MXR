import React from 'react';
import { ExtractedTrialData } from '../types';
import { CheckCircle2, XCircle, HelpCircle, Award, Target, FileText } from 'lucide-react';

interface ExecutiveSummaryCardProps {
  data: ExtractedTrialData;
}

export const ExecutiveSummaryCard: React.FC<ExecutiveSummaryCardProps> = ({ data }) => {
  const { title, authorsAndJournal, publicationYear, pmidOrDoi, executiveSummary, pico, evidenceGrade } = data;

  const metEndpoint = pico.outcomes.primaryOutcomeMet;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
      
      {/* Trial Header */}
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          
          {/* Primary Endpoint Met Status Badge */}
          <div className="flex items-center space-x-2">
            {metEndpoint === true && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Primary Endpoint Met</span>
              </span>
            )}
            {metEndpoint === false && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>Primary Endpoint Missed</span>
              </span>
            )}
            {metEndpoint === 'Inconclusive' && (
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                <HelpCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Inconclusive Results</span>
              </span>
            )}

            {/* Evidence Grade Badge */}
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
              <Award className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>{evidenceGrade.gradeRating}</span>
            </span>
          </div>

          {/* Source Citation */}
          {(pmidOrDoi || publicationYear) && (
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-2 font-mono">
              <FileText className="w-3.5 h-3.5" />
              <span>{pmidOrDoi || `Pub. ${publicationYear}`}</span>
            </div>
          )}
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
          {title}
        </h1>
        {authorsAndJournal && (
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {authorsAndJournal}
          </p>
        )}
      </div>

      {/* Key Headline Banner */}
      <div className="bg-gradient-to-r from-sky-50 via-indigo-50 to-blue-50 dark:from-sky-950/40 dark:via-indigo-950/40 dark:to-blue-950/40 rounded-xl p-4 border border-sky-200/80 dark:border-sky-800/80">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-sky-600 text-white shadow-sm mt-0.5">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300">
              Executive Headline
            </span>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-0.5 leading-snug">
              {executiveSummary.headline}
            </p>
          </div>
        </div>
      </div>

      {/* Key Takeaways */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
          Key Clinical Takeaways
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {executiveSummary.keyTakeaways.map((takeaway, idx) => (
            <li
              key={idx}
              className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300 flex items-center justify-center font-bold text-xs mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Primary Conclusion */}
      <div className="p-4 rounded-xl bg-slate-900 dark:bg-slate-950 text-white border border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
          Primary Clinical Conclusion
        </span>
        <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
          {executiveSummary.primaryConclusion}
        </p>
      </div>

    </div>
  );
};
