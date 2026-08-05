import React, { useState } from 'react';
import { IngestedDocument } from '../types';
import { 
  FileText, 
  FileSpreadsheet, 
  FileCode, 
  FileCheck, 
  CheckCircle2, 
  Eye, 
  Trash2, 
  Tag, 
  Layers, 
  Search,
  Check
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

  // Filter documents by search query and tag
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.extractedConcepts || []).some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = selectedTagFilter === 'all' || doc.tag === selectedTagFilter;

    return matchesSearch && matchesTag;
  });

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'csv' || ext === 'xlsx') {
      return <FileSpreadsheet className="w-4 h-4 text-emerald-400" />;
    }
    if (ext === 'pdf') {
      return <FileText className="w-4 h-4 text-blue-400" />;
    }
    if (ext === 'docx' || ext === 'doc') {
      return <FileText className="w-4 h-4 text-[#3B82F6]" />;
    }
    if (ext === 'json' || ext === 'md' || ext === 'txt') {
      return <FileCode className="w-4 h-4 text-purple-400" />;
    }
    return <FileText className="w-4 h-4 text-[#A1A1AA]" />;
  };

  const tagColors: Record<string, string> = {
    Framework: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    'Performance Data': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    'Client Brief': 'bg-[#3B82F6]/10 text-blue-300 border-[#3B82F6]/30',
    'Hook Matrix': 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    General: 'bg-zinc-800 text-zinc-400 border-zinc-700',
  };

  return (
    <div className="w-full max-w-[800px] mx-auto mt-8 space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#27272A] pb-3">
        <div>
          <h3 className="text-sm font-semibold text-[#F4F4F5] tracking-tight flex items-center gap-2">
            <span>Recent Ingestions</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#27272A] text-[#A1A1AA]">
              {documents.length} Total
            </span>
          </h3>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            Knowledge assets embedded in the Creative Brain vector database.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A1AA]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ingested memory..."
            className="w-full pl-8 pr-3 py-1.5 bg-[#18181B] border border-[#27272A] rounded-md text-xs text-[#F4F4F5] placeholder-[#A1A1AA] focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[10px] font-mono uppercase text-[#A1A1AA]">Filter:</span>
        {['all', 'Framework', 'Performance Data', 'Client Brief', 'Hook Matrix'].map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTagFilter(tag)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors border ${
              selectedTagFilter === tag
                ? 'bg-[#27272A] text-[#F4F4F5] border-[#3B82F6]'
                : 'bg-[#18181B] text-[#A1A1AA] border-[#27272A] hover:text-[#F4F4F5]'
            }`}
          >
            {tag === 'all' ? 'All Assets' : tag}
          </button>
        ))}
      </div>

      {/* List Container */}
      <div className="space-y-2">
        {filteredDocs.length === 0 ? (
          <div className="p-8 text-center bg-[#18181B] border border-[#27272A] rounded-xl text-xs text-[#A1A1AA]">
            No ingested documents matching your filter. Upload a file above to index new knowledge.
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <div
              key={doc.id}
              id={`ingested-doc-row-${doc.id}`}
              onClick={() => onSelectDocument(doc)}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] rounded-[12px] transition-all cursor-pointer gap-3"
            >
              {/* Left: Icon & Title */}
              <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                <div className="p-2 rounded-lg bg-zinc-950/60 border border-[#27272A] shrink-0 mt-0.5 sm:mt-0">
                  {getFileIcon(doc.name)}
                </div>
                
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[#F4F4F5] truncate group-hover:text-blue-400 transition-colors">
                      {doc.name}
                    </span>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${tagColors[doc.tag] || tagColors.General}`}>
                      {doc.tag}
                    </span>
                  </div>

                  {/* Metadata Row */}
                  <div className="flex items-center gap-3 mt-1 text-[11px] font-mono text-[#A1A1AA]">
                    <span>{doc.formattedSize}</span>
                    <span>•</span>
                    <span>{doc.tokenCount.toLocaleString()} tokens</span>
                    <span>•</span>
                    <span>{doc.chunkCount} vector chunks</span>
                  </div>
                </div>
              </div>

              {/* Right: Status Badge & Actions */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800/60">
                {/* Status Badge */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Status: Indexed</span>
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
                    className="p-1.5 text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-zinc-800 rounded-md transition-colors"
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
                    className="p-1.5 text-[#A1A1AA] hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                    title="Remove from Creative Brain"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
