import React from 'react';
import { Sparkles, Database, Search, ArrowRight, RefreshCw } from 'lucide-react';

interface HeaderProps {
  documentCount: number;
  totalTokens: number;
  onOpenTestModal: () => void;
  onRefreshData?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  documentCount,
  totalTokens,
  onOpenTestModal,
  onRefreshData
}) => {
  return (
    <header 
      id="app-header"
      className="h-16 border-b border-[#27272A] bg-[#09090B] px-6 flex items-center justify-between shrink-0 sticky top-0 z-10"
    >
      {/* Breadcrumb Title */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA]">
          Knowledge Ingestion
        </span>
        <span className="text-xs text-[#27272A]">/</span>
        <span className="text-sm font-medium text-[#F4F4F5] tracking-tight">
          Train the Brain
        </span>
      </div>

      {/* Quick Action & Stats */}
      <div className="flex items-center gap-3">
        {/* Memory Stats Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#18181B] border border-[#27272A] text-xs">
          <Database className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[#A1A1AA]">Indexed:</span>
          <span className="font-mono text-[#F4F4F5] font-medium">
            {documentCount} Docs ({ (totalTokens / 1000).toFixed(1) }k tokens)
          </span>
        </div>

        {/* Test Brain Recall Button */}
        <button
          id="test-brain-query-button"
          onClick={onOpenTestModal}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] text-[#F4F4F5] text-xs font-medium transition-all group"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
          <span>Test Brain Recall</span>
          <ArrowRight className="w-3 h-3 text-[#A1A1AA] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </header>
  );
};
