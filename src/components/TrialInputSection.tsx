import React from 'react';
import { SAMPLE_TRIALS } from '../data/sampleTrials';
import { SampleTrial } from '../types';
import { Sparkles, FileText, ArrowRight, RefreshCw, Pill, ShieldAlert, Activity, FileSpreadsheet, Zap } from 'lucide-react';

interface TrialInputSectionProps {
  inputText: string;
  setInputText: (val: string) => void;
  onExtract: () => void;
  isLoading: boolean;
  onSelectSample: (sample: SampleTrial) => void;
  selectedSampleId: string | null;
}

export const TrialInputSection: React.FC<TrialInputSectionProps> = ({
  inputText,
  setInputText,
  onExtract,
  isLoading,
  onSelectSample,
  selectedSampleId
}) => {
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm transition-colors">
      
      {/* Header & Quick Samples Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Unstructured Clinical Trial & Abstract Text Input
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Paste raw PubMed abstracts, clinical study manuscripts, or RCT summary text to extract structured evidence.
          </p>
        </div>

        {/* Word count & Clear */}
        <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400">
          <span>{wordCount} words</span>
          {inputText && (
            <button
              onClick={() => setInputText('')}
              className="text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 underline transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Preset Sample Buttons */}
      <div className="mb-4">
        <div className="flex items-center space-x-1.5 mb-2">
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Load Sample Clinical Trial:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_TRIALS.map((sample) => {
            const isSelected = selectedSampleId === sample.id;
            return (
              <button
                key={sample.id}
                onClick={() => onSelectSample(sample)}
                className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-300 dark:ring-sky-700'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <Pill className="w-3.5 h-3.5 mr-1.5 opacity-70" />
                <span className="font-semibold">{sample.title.split(' ')[0]}</span>
                <span className="ml-1 opacity-80 hidden sm:inline">({sample.drugClass.split(' ')[0]})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Text Area */}
      <div className="relative">
        <textarea
          rows={7}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste unstructured PubMed text, clinical trial results, or RCT abstract here... (e.g. 'BACKGROUND: Metformin remains first-line therapy... METHODS: 640 patients were randomized... RESULTS: HbA1c reduced by -1.21%...')"
          className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 transition-all font-mono leading-relaxed"
        />
      </div>

      {/* Footer Action Bar */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        
        {/* Output Capabilities Badge Bar */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="flex items-center text-slate-600 dark:text-slate-300 font-medium">Includes:</span>
          <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300 border border-sky-100 dark:border-sky-900">PICO</span>
          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-100 dark:border-amber-900">Cochrane Bias</span>
          <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-100 dark:border-rose-900">Safety & Rx Notes</span>
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900">Stats & p-values</span>
        </div>

        {/* Action Button */}
        <button
          onClick={onExtract}
          disabled={isLoading || !inputText.trim()}
          className={`w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white transition-all shadow-md ${
            isLoading || !inputText.trim()
              ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed text-slate-500 dark:text-slate-600 shadow-none'
              : 'bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 hover:from-sky-500 hover:to-indigo-600 active:scale-[0.99] cursor-pointer shadow-sky-600/20'
          }`}
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Analyzing Clinical Text...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Extract & Review</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </div>

    </section>
  );
};
