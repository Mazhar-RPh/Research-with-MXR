import React from 'react';
import { LiteratureEvidenceGrade } from '../types';
import { Award, CheckCircle, ThumbsUp, AlertCircle, FileCheck2 } from 'lucide-react';

interface EvidenceGradeCardProps {
  evidenceGrade: LiteratureEvidenceGrade;
}

export const EvidenceGradeCard: React.FC<EvidenceGradeCardProps> = ({ evidenceGrade }) => {
  const { gradeRating, strengthOfRecommendation, clinicalSummary, practiceImplications } = evidenceGrade;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Award className="w-5 h-5" />
            </span>
            <span>GRADE Literature Synthesis & Practice Guidance</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            GRADE certainty assessment and direct clinical recommendations for medical practice.
          </p>
        </div>

        {/* Badges */}
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            {gradeRating}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
            strengthOfRecommendation.includes('Strong')
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200'
              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200'
          }`}>
            <ThumbsUp className="w-3.5 h-3.5 mr-1" />
            <span>{strengthOfRecommendation}</span>
          </span>
        </div>
      </div>

      {/* Clinical Summary */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
          Evidence Synthesis Summary
        </span>
        <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
          {clinicalSummary}
        </p>
      </div>

      {/* Practice Implications for Pharmacists & Clinicians */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-950/40 dark:to-indigo-950/40 border border-sky-200 dark:border-sky-800 space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-800 dark:text-sky-300 block flex items-center space-x-1.5">
          <FileCheck2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>Direct Practice Implications for Pharmacists & Clinicians</span>
        </span>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
          {practiceImplications}
        </p>
      </div>

    </div>
  );
};
