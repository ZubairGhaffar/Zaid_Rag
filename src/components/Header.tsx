import React from 'react';
import { Sparkles, Database, ArrowRight, Sun, Moon, AudioLines } from 'lucide-react';

interface HeaderProps {
  documentCount: number;
  totalTokens: number;
  onOpenTestModal: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  documentCount,
  totalTokens,
  onOpenTestModal,
  isDarkMode,
  onToggleTheme
}) => {
  return (
    <header 
      id="app-header"
      className="h-16 border-b border-stone-200 dark:border-stone-800/80 bg-white/80 dark:bg-[#0C0A09]/90 backdrop-blur-md px-6 flex items-center justify-between shrink-0 sticky top-0 z-10 transition-colors"
    >
      {/* ElevenLabs Breadcrumb Title */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 text-stone-900 dark:text-stone-100 font-medium text-xs">
          <AudioLines className="w-4 h-4 text-stone-800 dark:text-stone-200" />
          <span className="font-semibold tracking-tight">ElevenLabs</span>
        </div>
        <span className="text-xs text-stone-300 dark:text-stone-700">/</span>
        <span className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Knowledge Studio
        </span>
        <span className="text-xs text-stone-300 dark:text-stone-700">/</span>
        <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 tracking-tight">
          Creative Brain Engine
        </span>
      </div>

      {/* Quick Action & Stats */}
      <div className="flex items-center gap-3">
        {/* Memory Stats Pill Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 dark:bg-[#161412] border border-stone-200 dark:border-stone-800 text-xs">
          <Database className="w-3.5 h-3.5 text-stone-700 dark:text-stone-300" />
          <span className="text-stone-500 dark:text-stone-400">Indexed:</span>
          <span className="font-mono text-stone-900 dark:text-stone-100 font-semibold">
            {documentCount} Docs ({ (totalTokens / 1000).toFixed(1) }k tokens)
          </span>
        </div>

        {/* Dark / Light Theme Toggle Switch */}
        <button
          id="toggle-theme-button"
          onClick={onToggleTheme}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white text-xs font-medium transition-colors cursor-pointer"
          title={isDarkMode ? "Switch to ElevenLabs Light Studio" : "Switch to ElevenLabs Dark Studio"}
        >
          {isDarkMode ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline font-mono text-[11px]">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-stone-700" />
              <span className="hidden md:inline font-mono text-[11px]">Dark</span>
            </>
          )}
        </button>

        {/* Test Brain Recall Button - ElevenLabs White Pill Button in Dark Mode */}
        <button
          id="test-brain-query-button"
          onClick={onOpenTestModal}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-950 text-xs font-semibold transition-all group shadow-sm cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600 group-hover:scale-110 transition-transform" />
          <span>Test Brain Recall</span>
          <ArrowRight className="w-3 h-3 text-stone-400 dark:text-stone-600 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </header>
  );
};

