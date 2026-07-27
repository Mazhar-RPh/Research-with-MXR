import React from 'react';
import { ExtractedTrialData } from '../types';
import { X, History, Trash2, ExternalLink, Calendar, Pill, Download, Copy, Check } from 'lucide-react';
import { generateTrialMarkdown, printFormattedReport } from '../utils/formatters';

interface SavedHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedTrials: ExtractedTrialData[];
  onSelectTrial: (trial: ExtractedTrialData) => void;
  onDeleteTrial: (id: string) => void;
  onClearAll: () => void;
}

export const SavedHistoryModal: React.FC<SavedHistoryModalProps> = ({
  isOpen,
  onClose,
  savedTrials,
  onSelectTrial,
  onDeleteTrial,
  onClearAll
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyMd = (trial: ExtractedTrialData) => {
    const md = generateTrialMarkdown(trial);
    navigator.clipboard.writeText(md);
    setCopiedId(trial.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-3xl w-full p-6 shadow-2xl my-8 space-y-6 max-h-[85vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Saved Extraction Library ({savedTrials.length})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Revisit previously extracted clinical trials and export summaries.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {savedTrials.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-rose-600 hover:text-rose-700 dark:hover:text-rose-400 font-semibold px-2.5 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of Saved Trials */}
        {savedTrials.length > 0 ? (
          <div className="space-y-3">
            {savedTrials.map((trial) => (
              <div
                key={trial.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:border-sky-300 dark:hover:border-sky-700 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3
                      onClick={() => {
                        onSelectTrial(trial);
                        onClose();
                      }}
                      className="font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-sky-600 dark:hover:text-sky-400 cursor-pointer line-clamp-1"
                    >
                      {trial.title}
                    </h3>
                    <div className="flex items-center space-x-3 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      <span className="flex items-center">
                        <Pill className="w-3 h-3 mr-1 text-sky-600" />
                        {trial.pico.intervention.name}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1 text-slate-400" />
                        {new Date(trial.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <button
                      onClick={() => {
                        onSelectTrial(trial);
                        onClose();
                      }}
                      className="p-1.5 rounded-lg text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-950 text-xs font-semibold flex items-center space-x-1"
                      title="Load this trial into dashboard"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="hidden sm:inline">View</span>
                    </button>

                    <button
                      onClick={() => handleCopyMd(trial)}
                      className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                      title="Copy Markdown"
                    >
                      {copiedId === trial.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => printFormattedReport(trial)}
                      className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                      title="Print / Save PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onDeleteTrial(trial.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/60"
                      title="Delete trial from library"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 italic bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800">
                  "{trial.executiveSummary.headline}"
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 space-y-2">
            <History className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Your extraction library is empty.</p>
            <p className="text-xs text-slate-400">Extract any clinical trial text to save it to your local library.</p>
          </div>
        )}

      </div>
    </div>
  );
};
