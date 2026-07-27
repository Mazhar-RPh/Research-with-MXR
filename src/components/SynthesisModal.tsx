import React, { useState } from 'react';
import { ExtractedTrialData, MultiTrialSynthesis } from '../types';
import { X, Layers, Sparkles, RefreshCw, CheckCircle2, AlertTriangle, HelpCircle, Table } from 'lucide-react';

interface SynthesisModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedTrials: ExtractedTrialData[];
}

export const SynthesisModal: React.FC<SynthesisModalProps> = ({
  isOpen,
  onClose,
  savedTrials
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(savedTrials.map(t => t.id));
  const [topic, setTopic] = useState<string>('Comparative Efficacy & Pharmacovigilance Matrix');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [synthesisResult, setSynthesisResult] = useState<MultiTrialSynthesis | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRunSynthesis = async () => {
    if (selectedIds.length === 0) return;
    setIsLoading(true);
    setError(null);

    const selectedExtractions = savedTrials.filter(t => selectedIds.includes(t.id));

    try {
      const response = await fetch('/api/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          extractions: selectedExtractions,
          topic
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to synthesize trials.');
      }

      setSynthesisResult(data.data);
    } catch (err: any) {
      setError(err.message || 'Error executing trial synthesis.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-4xl w-full p-6 shadow-2xl my-8 space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-md">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Multi-Trial Literature Synthesis & Matrix
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Cross-analyze multiple extracted trials to synthesize evidence consensus and comparative matrices.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selection & Topic Config */}
        <div className="space-y-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
              Synthesis Topic / Focus Focus
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Comparative Efficacy & Safety in T2D or Cardiovascular Risk"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
              Select Trials to Include ({selectedIds.length} / {savedTrials.length})
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
              {savedTrials.map((trial) => {
                const isSelected = selectedIds.includes(trial.id);
                return (
                  <div
                    key={trial.id}
                    onClick={() => toggleSelect(trial.id)}
                    className={`p-2.5 rounded-lg border cursor-pointer flex items-start space-x-2 transition-all ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 text-slate-900 dark:text-slate-100'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="text-xs truncate">
                      <p className="font-semibold truncate">{trial.title}</p>
                      <p className="text-[10px] text-slate-400">{trial.pico.intervention.name}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleRunSynthesis}
              disabled={isLoading || selectedIds.length === 0}
              className={`inline-flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-md ${
                isLoading || selectedIds.length === 0
                  ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed text-slate-500'
                  : 'bg-indigo-600 hover:bg-indigo-500 cursor-pointer shadow-indigo-500/20'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Literature...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate Multi-Trial Matrix</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error message if any */}
        {error && (
          <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs border border-rose-200">
            {error}
          </div>
        )}

        {/* Synthesis Output Display */}
        {synthesisResult && (
          <div className="space-y-6 pt-2 border-t border-slate-100 dark:border-slate-800">
            
            {/* High-level Consensus */}
            <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-200 block">
                Evidence Consensus Synthesis
              </span>
              <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {synthesisResult.overallConsensus}
              </p>
            </div>

            {/* Comparative Matrix Table */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2 flex items-center space-x-1.5">
                <Table className="w-3.5 h-3.5 text-indigo-600" />
                <span>Comparative Trial Matrix</span>
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3">Clinical Trial</th>
                      <th className="p-3">Population & Intervention</th>
                      <th className="p-3">Primary Outcome Result</th>
                      <th className="p-3">Safety & AE Profile</th>
                      <th className="p-3">Evidence Quality</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                    {synthesisResult.comparativeMatrix?.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        <td className="p-3 font-bold max-w-[200px] truncate">{row.trialTitle}</td>
                        <td className="p-3 text-slate-600 dark:text-slate-300">{row.picoSummary}</td>
                        <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">{row.primaryOutcomeResult}</td>
                        <td className="p-3 text-rose-600 dark:text-rose-400 font-medium">{row.safetyProfile}</td>
                        <td className="p-3 font-bold text-sky-600 dark:text-sky-400">{row.evidenceQuality}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Clinical Recommendations & Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-200 block">
                  Synthesized Clinical Practice Guidance
                </span>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  {synthesisResult.clinicalRecommendations?.map((rec, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200 block">
                  Conflicting Findings & Evidence Gaps
                </span>
                <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                  {synthesisResult.conflictingFindings?.map((conf, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{conf}</span>
                    </li>
                  ))}
                  {synthesisResult.gapsInEvidence?.map((gap, idx) => (
                    <li key={`gap-${idx}`} className="flex items-start space-x-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>Gap: {gap}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
