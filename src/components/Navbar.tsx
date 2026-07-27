import React from 'react';
import { Microscope, Moon, Sun, History, Sparkles, BookOpen, Layers } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  savedCount: number;
  onOpenHistory: () => void;
  onOpenSynthesis: () => void;
  activeExtractionCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  savedCount,
  onOpenHistory,
  onOpenSynthesis,
  activeExtractionCount
}) => {
  return (
    <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur-md dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
            <Microscope className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-slate-900 dark:text-slate-100 tracking-tight">
                Research <span className="text-sky-600 dark:text-sky-400">with MXR</span>
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                v2.5 Clinical
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Clinical Trial Extraction & Pharmacovigilance Synthesis Engine
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Synthesis Launcher */}
          <button
            onClick={onOpenSynthesis}
            disabled={savedCount === 0}
            className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              savedCount > 0
                ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900/80 border border-indigo-200 dark:border-indigo-800 shadow-sm cursor-pointer'
                : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed'
            }`}
            title={savedCount > 0 ? "Synthesize saved trials into comparative matrix" : "Save at least 1 trial to enable synthesis"}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Multi-Trial Synthesis</span>
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-indigo-600 text-white dark:bg-indigo-500">
                {savedCount}
              </span>
            )}
          </button>

          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            <History className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span className="hidden sm:inline">Saved Library</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              {savedCount}
            </span>
          </button>

          {/* Dark / Light Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>

      </div>
    </header>
  );
};
