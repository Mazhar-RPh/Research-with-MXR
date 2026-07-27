import React, { useState } from 'react';
import { ExtractedTrialData } from '../types';
import { Columns, FileText, Check, Sparkles, Filter, Search } from 'lucide-react';

interface SideBySideViewProps {
  data: ExtractedTrialData;
}

export const SideBySideView: React.FC<SideBySideViewProps> = ({ data }) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Population', 'Intervention', 'Outcome', 'Bias', 'Safety'];

  const filteredHighlights = data.sourceHighlights?.filter(
    h => filterCategory === 'All' || h.category === filterCategory
  ) || [];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Columns className="w-5 h-5" />
            </span>
            <span>Raw Text vs. Extracted Evidence Side-by-Side</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Audit extracted clinical claims directly against the original manuscript or abstract source lines.
          </p>
        </div>

        {/* Highlight Filter Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filterCategory === cat
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Side-by-Side Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Original Source Text */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span className="flex items-center space-x-1.5">
              <FileText className="w-4 h-4 text-slate-400" />
              <span>Original PubMed / Manuscript Text</span>
            </span>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 leading-relaxed max-h-[500px] overflow-y-auto whitespace-pre-wrap select-text">
            {data.rawText}
          </div>
        </div>

        {/* Right Column: Highlighted Claims */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <span>Source Claims & Category Tagging ({filteredHighlights.length})</span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredHighlights.length > 0 ? (
              filteredHighlights.map((hl, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-1.5 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      hl.category === 'Population' ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300' :
                      hl.category === 'Intervention' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300' :
                      hl.category === 'Outcome' ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300' :
                      hl.category === 'Bias' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {hl.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Claim #{idx + 1}</span>
                  </div>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-serif italic border-l-2 border-sky-500 pl-2.5 py-0.5">
                    "{hl.textSnippet}"
                  </p>
                </div>
              ))
            ) : (
              <div className="p-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-400">
                No highlighted snippets for category "{filterCategory}".
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
