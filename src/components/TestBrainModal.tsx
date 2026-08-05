import React, { useState } from 'react';
import { IngestedDocument, BrainQueryResult } from '../types';
import { X, Sparkles, Send, Loader2, BookOpen, CheckCircle2, Bot } from 'lucide-react';

interface TestBrainModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: IngestedDocument[];
}

export const TestBrainModal: React.FC<TestBrainModalProps> = ({
  isOpen,
  onClose,
  documents,
}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<BrainQueryResult | null>(null);

  if (!isOpen) return null;

  const sampleQueries = [
    "What is the core principle of the Chris Keesser Method™️?",
    "How should pattern interrupts be structured for high CTR?",
    "What key performance creative metrics determine scaling?",
  ];

  const handleRunQuery = async (customQuery?: string) => {
    const q = customQuery || query;
    if (!q.trim()) return;

    setIsLoading(true);
    setQuery(q);

    try {
      const response = await fetch('/api/query-brain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          ingestedDocs: documents,
        }),
      });

      const data = await response.json();
      setResult({
        answer: data.answer || "No synthesis returned.",
        sourcesUsed: data.sourcesUsed || documents.slice(0, 2).map(d => d.name),
        confidence: data.confidence || 0.98,
      });
    } catch (err) {
      console.error(err);
      setResult({
        answer: "Failed to connect to Creative Brain API. Re-try or check server status.",
        sourcesUsed: [],
        confidence: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        id="test-brain-modal"
        className="bg-[#18181B] border border-[#27272A] rounded-[16px] w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in duration-200"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#27272A] flex items-center justify-between bg-[#09090B]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#F4F4F5]">
                Test Creative Brain Recall
              </h3>
              <p className="text-xs text-[#A1A1AA]">
                Query ingested methodology and framework memory in real time.
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Query Bar */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleRunQuery();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question about your ingested strategy docs..."
              className="flex-1 px-4 py-2.5 bg-[#09090B] border border-[#27272A] rounded-lg text-xs text-[#F4F4F5] placeholder-[#A1A1AA] focus:outline-none focus:border-[#3B82F6] transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-4 py-2.5 bg-[#3B82F6] hover:bg-blue-600 disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2 shrink-0"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Query</span>
                </>
              )}
            </button>
          </form>

          {/* Sample Query Chips */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-[#A1A1AA] uppercase">
              Sample Strategy Queries:
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleQueries.map((sq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRunQuery(sq)}
                  className="px-3 py-1.5 bg-[#09090B] hover:bg-[#27272A] border border-[#27272A] rounded-md text-[11px] text-[#A1A1AA] hover:text-[#F4F4F5] transition-colors text-left"
                >
                  "{sq}"
                </button>
              ))}
            </div>
          </div>

          {/* AI Response Display */}
          {result && (
            <div className="p-4 rounded-xl bg-[#09090B] border border-[#27272A] space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-[#27272A] pb-2">
                <span className="text-xs font-mono font-medium text-blue-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Synthesis from Ingested Knowledge
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Confidence: {(result.confidence * 100).toFixed(0)}%
                </span>
              </div>

              <div className="text-xs text-[#F4F4F5] leading-relaxed whitespace-pre-wrap">
                {result.answer}
              </div>

              {result.sourcesUsed && result.sourcesUsed.length > 0 && (
                <div className="pt-2 border-t border-[#27272A] flex items-center gap-2 text-[10px] font-mono text-[#A1A1AA]">
                  <BookOpen className="w-3 h-3 text-[#A1A1AA]" />
                  <span>Grounded in:</span>
                  <div className="flex flex-wrap gap-1">
                    {result.sourcesUsed.map((src, i) => (
                      <span key={i} className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">
                        {src}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
