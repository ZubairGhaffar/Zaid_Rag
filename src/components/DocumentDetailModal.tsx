import React from 'react';
import { IngestedDocument } from '../types';
import { X, FileText, Database, CheckCircle2, Cpu, Tag, Sparkles, BookOpen, Key } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="document-detail-modal"
        className="bg-[#18181B] border border-[#27272A] rounded-[16px] w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in duration-200"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#27272A] flex items-center justify-between bg-[#09090B]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-[#F4F4F5]">
                  {document.name}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Status: Indexed
                </span>
              </div>
              <p className="text-xs text-[#A1A1AA] mt-0.5 font-mono">
                Memory ID: chunk-vec-{document.id.slice(0, 8)}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#27272A] rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-[#09090B] border border-[#27272A]">
              <span className="text-[10px] font-mono uppercase text-[#A1A1AA] block">File Size</span>
              <span className="text-xs font-mono font-medium text-[#F4F4F5] mt-1 block">
                {document.formattedSize}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#09090B] border border-[#27272A]">
              <span className="text-[10px] font-mono uppercase text-[#A1A1AA] block">Token Memory</span>
              <span className="text-xs font-mono font-medium text-blue-400 mt-1 block">
                {document.tokenCount.toLocaleString()} tokens
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#09090B] border border-[#27272A]">
              <span className="text-[10px] font-mono uppercase text-[#A1A1AA] block">Vector Chunks</span>
              <span className="text-xs font-mono font-medium text-[#F4F4F5] mt-1 block">
                {document.chunkCount} vectors
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#09090B] border border-[#27272A]">
              <span className="text-[10px] font-mono uppercase text-[#A1A1AA] block">Classification</span>
              <span className="text-xs font-mono font-medium text-purple-400 mt-1 block truncate">
                {document.tag}
              </span>
            </div>
          </div>

          {/* AI Executive Summary */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#F4F4F5]">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Creative Brain Index Summary</span>
            </div>
            <div className="p-3.5 rounded-lg bg-zinc-950 border border-[#27272A] text-xs text-[#A1A1AA] leading-relaxed">
              {document.summary || "Extracted key strategic concepts and performance guidelines from document."}
            </div>
          </div>

          {/* Extracted Core Concepts */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#F4F4F5]">
              <Key className="w-4 h-4 text-[#3B82F6]" />
              <span>Extracted Strategic Concepts</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {document.extractedConcepts.map((concept, idx) => (
                <div 
                  key={idx}
                  className="p-2.5 rounded-lg bg-[#09090B] border border-[#27272A] flex items-center gap-2 text-xs text-[#F4F4F5]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{concept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vector Memory Schema Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#F4F4F5] flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-400" />
                <span>Vector Embedding Details</span>
              </span>
              <span className="font-mono text-[10px] text-[#A1A1AA]">
                Embedding Model: gemini-embedding-2
              </span>
            </div>
            <div className="p-3 rounded-lg bg-zinc-950 border border-[#27272A] font-mono text-[11px] text-[#A1A1AA] space-y-1">
              <div className="text-emerald-400">✓ Vector Store: Normalized 768-dim embeddings</div>
              <div>✓ Index Status: Ready for RAG generation</div>
              <div>✓ Author Source: {document.author || "Chris Keesser Architecture"}</div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#27272A] bg-[#09090B] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#27272A] hover:bg-zinc-700 text-[#F4F4F5] text-xs font-medium rounded-lg transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
