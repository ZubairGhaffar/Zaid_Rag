import React, { useState } from 'react';
import { IngestedDocument } from '../types';
import { 
  FileText, 
  FileSpreadsheet, 
  FileCode, 
  Eye, 
  Trash2, 
  Search,
  Volume2,
  VolumeX
} from 'lucide-react';

interface RecentIngestionsProps {
  documents: IngestedDocument[];
  onSelectDocument: (doc: IngestedDocument) => void;
  onRemoveDocument: (id: string) => void;
}

export const RecentIngestions: React.FC<RecentIngestionsProps> = ({
  documents,
  onSelectDocument,
  onRemoveDocument,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTagFilter, setSelectedTagFilter] = useState<string>('all');
  const [playingDocId, setPlayingDocId] = useState<string | null>(null);

  // Filter documents by search query and tag
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.extractedConcepts || []).some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = selectedTagFilter === 'all' || doc.tag === selectedTagFilter;

    return matchesSearch && matchesTag;
  });

  // Speech synthesis for ElevenLabs audio preview
  const handleTogglePlayVoice = (e: React.MouseEvent, doc: IngestedDocument) => {
    e.stopPropagation();

    if ('speechSynthesis' in window) {
      if (playingDocId === doc.id) {
        window.speechSynthesis.cancel();
        setPlayingDocId(null);
        return;
      }

      window.speechSynthesis.cancel();
      const textToSpeak = `Strategy asset ${doc.name}. Executive Summary: ${doc.summary}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => setPlayingDocId(null);
      utterance.onerror = () => setPlayingDocId(null);

      setPlayingDocId(doc.id);
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback toggler
      setPlayingDocId(playingDocId === doc.id ? null : doc.id);
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'csv' || ext === 'xlsx') {
      return <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
    }
    if (ext === 'pdf') {
      return <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
    }
    if (ext === 'docx' || ext === 'doc') {
      return <FileText className="w-4 h-4 text-stone-900 dark:text-stone-100" />;
    }
    if (ext === 'json' || ext === 'md' || ext === 'txt') {
      return <FileCode className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
    }
    return <FileText className="w-4 h-4 text-stone-500" />;
  };

  const tagColors: Record<string, string> = {
    Framework: 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 border-stone-200 dark:border-stone-700 font-semibold',
    'Performance Data': 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    'Client Brief': 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    'Hook Matrix': 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    General: 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-700',
  };

  return (
    <div className="w-full max-w-[820px] mx-auto mt-8 space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800/80 pb-3">
        <div>
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 tracking-tight flex items-center gap-2">
            <span>Ingested Knowledge Assets</span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 font-semibold">
              {documents.length} Total
            </span>
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Knowledge assets embedded into ElevenLabs vector RAG memory.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ingested memory..."
            className="w-full pl-8 pr-3 py-1.5 bg-white dark:bg-[#161412] border border-stone-200 dark:border-stone-800 rounded-full text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:border-stone-900 dark:focus:border-white transition-colors"
          />
        </div>
      </div>

      {/* ElevenLabs Pill Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[10px] font-mono uppercase text-stone-400 dark:text-stone-500">Filter:</span>
        {['all', 'Framework', 'Performance Data', 'Client Brief', 'Hook Matrix'].map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTagFilter(tag)}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors border cursor-pointer ${
              selectedTagFilter === tag
                ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-950 border-stone-900 dark:border-white font-semibold shadow-xs'
                : 'bg-white dark:bg-[#161412] text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800/50'
            }`}
          >
            {tag === 'all' ? 'All Assets' : tag}
          </button>
        ))}
      </div>

      {/* List Container */}
      <div className="space-y-2.5">
        {filteredDocs.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-[#161412] border border-stone-200 dark:border-stone-800/90 rounded-2xl text-xs text-stone-500 dark:text-stone-400 shadow-2xs">
            No ingested documents matching your filter. Upload a file above to index new knowledge.
          </div>
        ) : (
          filteredDocs.map((doc) => {
            const isPlaying = playingDocId === doc.id;
            return (
              <div
                key={doc.id}
                id={`ingested-doc-row-${doc.id}`}
                onClick={() => onSelectDocument(doc)}
                className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white dark:bg-[#161412] hover:bg-stone-50/80 dark:hover:bg-[#1C1A17] border border-stone-200 dark:border-stone-800/90 rounded-[16px] transition-all cursor-pointer gap-3.5 shadow-2xs hover:shadow-xs ${
                  isPlaying ? 'border-stone-400 dark:border-stone-600 ring-1 ring-stone-400 dark:ring-stone-600' : ''
                }`}
              >
                {/* Left: Icon & Title */}
                <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                  <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700/80 shrink-0 mt-0.5 sm:mt-0">
                    {getFileIcon(doc.name)}
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate group-hover:text-black dark:group-hover:text-white transition-colors">
                        {doc.name}
                      </span>
                      <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full border ${tagColors[doc.tag] || tagColors.General}`}>
                        {doc.tag}
                      </span>
                    </div>

                    {/* Metadata Row */}
                    <div className="flex items-center gap-3 mt-1.5 text-[11px] font-mono text-stone-500 dark:text-stone-400 flex-wrap">
                      <span>{doc.formattedSize}</span>
                      <span>•</span>
                      <span>{doc.tokenCount.toLocaleString()} tokens</span>
                      <span>•</span>
                      <span>{doc.chunkCount} vector chunks</span>
                    </div>
                  </div>
                </div>

                {/* Right: ElevenLabs Voice Preview & Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100 dark:border-stone-800/60">
                  {/* ElevenLabs Voice Playback Button */}
                  <button
                    type="button"
                    onClick={(e) => handleTogglePlayVoice(e, doc)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-medium transition-all cursor-pointer border ${
                      isPlaying 
                        ? 'bg-stone-900 dark:bg-white text-white dark:text-stone-950 border-stone-900 dark:border-white shadow-xs' 
                        : 'bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-700'
                    }`}
                    title="Synthesize and play AI voice summary"
                  >
                    {isPlaying ? (
                      <>
                        <VolumeX className="w-3 h-3 animate-pulse" />
                        <span>Stop Voice</span>
                        <div className="flex items-center gap-0.5 h-2.5 ml-1">
                          <span className="w-0.5 bg-white dark:bg-stone-950 animate-eq-1 rounded-full" />
                          <span className="w-0.5 bg-white dark:bg-stone-950 animate-eq-2 rounded-full" />
                          <span className="w-0.5 bg-white dark:bg-stone-950 animate-eq-3 rounded-full" />
                        </div>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3" />
                        <span>Play Voice Summary</span>
                      </>
                    )}
                  </button>

                  {/* Status Badge */}
                  <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Indexed</span>
                  </div>

                  {/* Inspect & Remove Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      id={`inspect-doc-button-${doc.id}`}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDocument(doc);
                      }}
                      className="p-1.5 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                      title="View Knowledge Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <button
                      id={`remove-doc-button-${doc.id}`}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveDocument(doc.id);
                      }}
                      className="p-1.5 text-stone-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                      title="Remove from Creative Brain"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
