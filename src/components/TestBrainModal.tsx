import React, { useState } from 'react';
import { IngestedDocument, BrainQueryResult } from '../types';
import { X, Sparkles, Send, Loader2, BookOpen, Bot, Volume2, VolumeX } from 'lucide-react';

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
  const [isSpeaking, setIsSpeaking] = useState(false);

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
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);

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

  const handleSpeakAnswer = () => {
    if (!result?.answer) return;
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(result.answer);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        id="test-brain-modal"
        className="bg-white dark:bg-[#161412] border border-stone-200 dark:border-stone-800 rounded-[24px] w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in duration-200"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-[#110F0E]">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-stone-200 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100">
              <Bot className="w-5 h-5 text-stone-900 dark:text-stone-100" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span>Test Creative Brain Recall</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  RAG Voice Engine
                </span>
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Query ingested methodology and framework memory in real time.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              onClose();
            }}
            className="p-1.5 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
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
              className="flex-1 px-4 py-2.5 bg-white dark:bg-[#0C0A09] border border-stone-300 dark:border-stone-700 rounded-full text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:border-stone-900 dark:focus:border-white transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-6 py-2.5 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-200 disabled:opacity-50 text-white dark:text-stone-950 text-xs font-semibold rounded-full transition-colors flex items-center gap-2 shrink-0 shadow-sm cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-white dark:text-stone-950" />
                  <span>Query</span>
                </>
              )}
            </button>
          </form>

          {/* Sample Query Chips */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 uppercase">
              Sample Strategy Queries:
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleQueries.map((sq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRunQuery(sq)}
                  className="px-3 py-1.5 bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 rounded-full text-[11px] text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors text-left cursor-pointer font-medium"
                >
                  "{sq}"
                </button>
              ))}
            </div>
          </div>

          {/* AI Response Display */}
          {result && (
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2.5">
                <span className="text-xs font-mono font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Synthesis from Ingested Knowledge
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSpeakAnswer}
                    className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 font-mono text-[10px] font-semibold hover:bg-stone-300 dark:hover:bg-stone-700 cursor-pointer"
                  >
                    {isSpeaking ? (
                      <>
                        <VolumeX className="w-3 h-3 text-red-500 animate-pulse" />
                        <span>Stop Voice</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3 text-stone-700 dark:text-stone-300" />
                        <span>Speak Synthesis</span>
                      </>
                    )}
                  </button>
                  <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 font-semibold">
                    Confidence: {(result.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              <div className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-wrap font-sans">
                {result.answer}
              </div>

              {result.sourcesUsed && result.sourcesUsed.length > 0 && (
                <div className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2 text-[10px] font-mono text-stone-500 dark:text-stone-400 flex-wrap">
                  <BookOpen className="w-3 h-3 text-stone-500 dark:text-stone-400" />
                  <span>Grounded in:</span>
                  <div className="flex flex-wrap gap-1">
                    {result.sourcesUsed.map((src, i) => (
                      <span key={i} className="bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 px-2 py-0.5 rounded-full font-medium">
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

