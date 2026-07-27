import React, { useState, useEffect } from 'react';
import { ExtractedTrialData, SampleTrial } from './types';
import { SAMPLE_TRIALS } from './data/sampleTrials';
import { Navbar } from './components/Navbar';
import { TrialInputSection } from './components/TrialInputSection';
import { ExportBar } from './components/ExportBar';
import { ExecutiveSummaryCard } from './components/ExecutiveSummaryCard';
import { PicoCard } from './components/PicoCard';
import { StatisticalRigorCard } from './components/StatisticalRigorCard';
import { RiskOfBiasCard } from './components/RiskOfBiasCard';
import { PharmacovigilanceCard } from './components/PharmacovigilanceCard';
import { EvidenceGradeCard } from './components/EvidenceGradeCard';
import { SideBySideView } from './components/SideBySideView';
import { SavedHistoryModal } from './components/SavedHistoryModal';
import { SynthesisModal } from './components/SynthesisModal';
import { Microscope, Sparkles, Pill, AlertTriangle, ShieldCheck, Activity, Heart, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [inputText, setInputText] = useState<string>('');
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [activeExtraction, setActiveExtraction] = useState<ExtractedTrialData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');

  const [savedTrials, setSavedTrials] = useState<ExtractedTrialData[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isSynthesisOpen, setIsSynthesisOpen] = useState<boolean>(false);

  // Dark mode setup
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Load saved trials from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mxr_saved_trials');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSavedTrials(parsed);
        }
      }
    } catch (e) {
      console.error('Error loading saved trials from localStorage', e);
    }
  }, []);

  // Save to localStorage helper
  const saveTrialsToStorage = (trials: ExtractedTrialData[]) => {
    setSavedTrials(trials);
    try {
      localStorage.setItem('mxr_saved_trials', JSON.stringify(trials));
    } catch (e) {
      console.error('Error saving trials to localStorage', e);
    }
  };

  const handleSelectSample = (sample: SampleTrial) => {
    setSelectedSampleId(sample.id);
    setInputText(sample.abstractText);
    setError(null);
  };

  const handleExtract = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      const resData = await response.json();
      if (!resData.success) {
        throw new Error(resData.error || 'Extraction failed.');
      }

      const extracted: ExtractedTrialData = resData.data;
      setActiveExtraction(extracted);
      setActiveTab('overview');

      // Auto-save to local library if not already saved
      if (!savedTrials.some(t => t.id === extracted.id)) {
        saveTrialsToStorage([extracted, ...savedTrials]);
      }
    } catch (err: any) {
      console.error('Extraction Error:', err);
      setError(err.message || 'An error occurred during trial extraction.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToLibrary = (trial: ExtractedTrialData) => {
    if (savedTrials.some(t => t.id === trial.id)) {
      // Remove
      const updated = savedTrials.filter(t => t.id !== trial.id);
      saveTrialsToStorage(updated);
    } else {
      // Add
      saveTrialsToStorage([trial, ...savedTrials]);
    }
  };

  const handleDeleteTrial = (id: string) => {
    const updated = savedTrials.filter(t => t.id !== id);
    saveTrialsToStorage(updated);
  };

  const handleClearAll = () => {
    saveTrialsToStorage([]);
  };

  const isCurrentSaved = activeExtraction ? savedTrials.some(t => t.id === activeExtraction.id) : false;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 flex flex-col">
      
      {/* Navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        savedCount={savedTrials.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenSynthesis={() => setIsSynthesisOpen(true)}
        activeExtractionCount={activeExtraction ? 1 : 0}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Input Section */}
        <TrialInputSection
          inputText={inputText}
          setInputText={setInputText}
          onExtract={handleExtract}
          isLoading={isLoading}
          onSelectSample={handleSelectSample}
          selectedSampleId={selectedSampleId}
        />

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs sm:text-sm flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Extraction Analysis Issue</span>
              <span>{error}</span>
            </div>
          </div>
        )}

        {/* Extraction Output Dashboard */}
        {activeExtraction ? (
          <div className="space-y-6 animate-fade-in">
            
            {/* Top Toolbar & Tabs */}
            <ExportBar
              data={activeExtraction}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onSaveToLibrary={handleSaveToLibrary}
              isSaved={isCurrentSaved}
            />

            {/* Tab Views */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <ExecutiveSummaryCard data={activeExtraction} />
                <PicoCard pico={activeExtraction.pico} />
              </div>
            )}

            {activeTab === 'pico' && (
              <PicoCard pico={activeExtraction.pico} />
            )}

            {activeTab === 'statistics' && (
              <StatisticalRigorCard statistics={activeExtraction.statistics} />
            )}

            {activeTab === 'bias' && (
              <RiskOfBiasCard riskOfBias={activeExtraction.riskOfBias} />
            )}

            {activeTab === 'safety' && (
              <PharmacovigilanceCard pharmacovigilance={activeExtraction.pharmacovigilance} />
            )}

            {activeTab === 'evidence' && (
              <EvidenceGradeCard evidenceGrade={activeExtraction.evidenceGrade} />
            )}

            {activeTab === 'side-by-side' && (
              <SideBySideView data={activeExtraction} />
            )}

          </div>
        ) : (
          /* Empty / Welcome State */
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto shadow-sm">
              <Microscope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                Ready for Clinical Trial Analysis
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto mt-1">
                Paste unstructured text above or click one of the preset trial samples (e.g., Metformin, Semaglutide, Pembrolizumab) to run AI extraction and review PICO, Cochrane bias, and pharmacovigilance notes.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4 text-left">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-1">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-sky-700 dark:text-sky-400">
                  <Activity className="w-4 h-4" />
                  <span>Structured PICO</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Population, dosing, route, comparator type, and primary/secondary endpoints.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-1">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-700 dark:text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Cochrane Risk of Bias</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Selection, blinding, attrition, and selective reporting validity checks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 space-y-1">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-700 dark:text-rose-400">
                  <Pill className="w-4 h-4" />
                  <span>Pharmacovigilance</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Adverse event rates, lab monitoring protocols, drug interactions, and clinical pearls.
                </p>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 transition-colors">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-500 dark:text-slate-400 space-y-1">
          <p className="font-medium text-slate-700 dark:text-slate-300">
            Research with MXR &bull; Clinical Evidence & Pharmacovigilance Synthesis Engine
          </p>
          <p className="text-[11px] text-slate-400">
            Designed for pharmacists, clinical researchers, and biostatisticians. Powered by Gemini 3.6 AI.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <SavedHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedTrials={savedTrials}
        onSelectTrial={(trial) => {
          setActiveExtraction(trial);
          setActiveTab('overview');
        }}
        onDeleteTrial={handleDeleteTrial}
        onClearAll={handleClearAll}
      />

      <SynthesisModal
        isOpen={isSynthesisOpen}
        onClose={() => setIsSynthesisOpen(false)}
        savedTrials={savedTrials}
      />

    </div>
  );
}
