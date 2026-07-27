import React, { useState } from 'react';
import { ExtractedTrialData } from '../types';
import { Copy, Download, Bookmark, Check, Share2, Sparkles, Printer, FileText } from 'lucide-react';
import { generateTrialMarkdown, printFormattedReport } from '../utils/formatters';

interface ExportBarProps {
  data: ExtractedTrialData;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSaveToLibrary: (trial: ExtractedTrialData) => void;
  isSaved: boolean;
}

export const ExportBar: React.FC<ExportBarProps> = ({
  data,
  activeTab,
  setActiveTab,
  onSaveToLibrary,
  isSaved
}) => {
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Executive Summary' },
    { id: 'pico', label: 'PICO Framework' },
    { id: 'statistics', label: 'Biostats & p-values' },
    { id: 'bias', label: 'Risk of Bias' },
    { id: 'safety', label: 'Pharmacovigilance' },
    { id: 'evidence', label: 'GRADE Evidence' },
    { id: 'side-by-side', label: 'Raw vs Source' },
  ];

  const handleCopy = () => {
    const md = generateTrialMarkdown(data);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 shadow-sm space-y-3">
      
      {/* Top Bar: Export & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Extraction Complete: <span className="text-sky-600 dark:text-sky-400">{data.title}</span>
          </span>
        </div>

        {/* Quick Export Actions */}
        <div className="flex items-center space-x-2 flex-wrap">
          
          {/* Copy Markdown */}
          <button
            onClick={handleCopy}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Copied Markdown!' : 'Copy Markdown'}</span>
          </button>

          {/* Download PDF / Print */}
          <button
            onClick={() => printFormattedReport(data)}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 dark:bg-sky-950 dark:text-sky-300 dark:hover:bg-sky-900 border border-sky-200 dark:border-sky-800 transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Download PDF / Print</span>
          </button>

          {/* Bookmark / Save to Library */}
          <button
            onClick={() => onSaveToLibrary(data)}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              isSaved
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-xs'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{isSaved ? 'Saved in Library' : 'Save Trial'}</span>
          </button>

        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center space-x-1 overflow-x-auto pb-1 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

    </div>
  );
};
