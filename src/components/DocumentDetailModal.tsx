import React from 'react';
import { IngestedDocument } from '../types';
import { X, FileText, Database, CheckCircle2, Sparkles, Key } from 'lucide-react';

interface DocumentDetailModalProps {
  document: IngestedDocument | null;
  onClose: () => void;
}

export const DocumentDetailModal: React.FC<DocumentDetailModalProps> = ({
  document,
  onClose,
}) => {
  if (!document) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        id="document-detail-modal"
        className="bg-white dark:bg-[#161412] border border-stone-200 dark:border-stone-800 rounded-[24px] w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in duration-200"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-[#110F0E]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-stone-200 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  {document.name}
                </h3>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-semibold">
                  Status: Indexed
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 font-mono">
                Memory ID: chunk-vec-{document.id.slice(0, 8)}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
              <span className="text-[10px] font-mono uppercase text-stone-500 dark:text-stone-400 block">File Size</span>
              <span className="text-xs font-mono font-semibold text-stone-900 dark:text-stone-100 mt-1 block">
                {document.formattedSize}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
              <span className="text-[10px] font-mono uppercase text-stone-500 dark:text-stone-400 block">Token Memory</span>
              <span className="text-xs font-mono font-semibold text-stone-900 dark:text-stone-100 mt-1 block">
                {document.tokenCount.toLocaleString()} tokens
              </span>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
              <span className="text-[10px] font-mono uppercase text-stone-500 dark:text-stone-400 block">Vector Chunks</span>
              <span className="text-xs font-mono font-semibold text-stone-900 dark:text-stone-100 mt-1 block">
                {document.chunkCount} vectors
              </span>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
              <span className="text-[10px] font-mono uppercase text-stone-500 dark:text-stone-400 block">Classification</span>
              <span className="text-xs font-mono font-semibold text-stone-900 dark:text-stone-100 mt-1 block truncate">
                {document.tag}
              </span>
            </div>
          </div>

          {/* AI Executive Summary */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-900 dark:text-stone-100">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>ElevenLabs Creative Brain Summary</span>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200 leading-relaxed font-sans">
              {document.summary || "Extracted key strategic concepts and performance guidelines from document."}
            </div>
          </div>

          {/* Extracted Core Concepts */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-900 dark:text-stone-100">
              <Key className="w-4 h-4 text-stone-900 dark:text-stone-100" />
              <span>Extracted Strategic Concepts</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {document.extractedConcepts.map((concept, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 flex items-center gap-2 text-xs text-stone-900 dark:text-stone-100 font-medium"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{concept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vector Memory Schema Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Database className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                <span>Vector Embedding Details</span>
              </span>
              <span className="font-mono text-[10px] text-stone-500 dark:text-stone-400">
                Embedding Model: gemini-embedding-2
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-950 font-mono text-[11px] text-stone-300 space-y-1.5 border border-stone-800">
              <div className="text-emerald-400">✓ Vector Store: Normalized 768-dim embeddings</div>
              <div>✓ Index Status: Ready for RAG synthesis</div>
              <div>✓ Author Source: {document.author || "Chris Keesser Architecture"}</div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#110F0E] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-950 text-xs font-semibold rounded-full transition-colors cursor-pointer shadow-sm"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

