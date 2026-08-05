import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, Loader2, Sparkles, AlertCircle, FilePlus } from 'lucide-react';

interface UploadDropzoneProps {
  onFileUpload: (files: File[]) => void;
  onIngestPreset: (presetName: string) => void;
  isUploading: boolean;
  uploadProgress: number;
  uploadStepMessage: string;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  onFileUpload,
  onIngestPreset,
  isUploading,
  uploadProgress,
  uploadStepMessage,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      onFileUpload(droppedFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      onFileUpload(selectedFiles);
    }
  };

  return (
    <div className="w-full max-w-[800px] mx-auto">
      {/* Container header label */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div>
          <h2 className="text-sm font-semibold text-[#F4F4F5] tracking-tight">
            Ingest Methodology & Knowledge
          </h2>
          <p className="text-xs text-[#A1A1AA] mt-0.5">
            Codify frameworks, performance briefs, and strategy data into the Creative Brain.
          </p>
        </div>
        <span className="text-[10px] font-mono text-[#A1A1AA] uppercase bg-[#18181B] border border-[#27272A] px-2 py-1 rounded-md">
          Max File Size: 50MB
        </span>
      </div>

      {/* Main Dropzone Card */}
      <div
        id="upload-dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-[16px] p-8 md:p-12 text-center transition-all duration-200 cursor-pointer overflow-hidden ${
          isDragOver
            ? 'border-[#3B82F6] bg-blue-500/5 shadow-lg shadow-blue-500/10'
            : 'border-[#27272A] bg-[#18181B] hover:border-[#3B82F6]/60 hover:bg-[#18181B]/90'
        }`}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept=".pdf,.docx,.doc,.txt,.csv,.md,.json"
          className="hidden"
          id="file-input-element"
        />

        {/* Uploading State */}
        {isUploading ? (
          <div className="py-4 flex flex-col items-center justify-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Loader2 className="w-7 h-7 animate-spin text-[#3B82F6]" />
            </div>
            
            <div className="space-y-1.5 max-w-md">
              <h3 className="text-sm font-medium text-[#F4F4F5]">
                Indexing into Creative Brain...
              </h3>
              <p className="text-xs font-mono text-blue-400">
                {uploadStepMessage || 'Chunking text and generating vector embeddings'}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-xs bg-zinc-900 border border-[#27272A] rounded-full h-2 overflow-hidden">
              <div 
                className="bg-[#3B82F6] h-full transition-all duration-300 ease-out rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            
            <span className="text-[11px] font-mono text-[#A1A1AA]">
              {uploadProgress}% completed
            </span>
          </div>
        ) : (
          /* Default Drag & Drop State */
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Upload Cloud Icon */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-200 ${
              isDragOver ? 'bg-blue-500/20 text-[#3B82F6] scale-110' : 'bg-[#27272A]/60 text-[#A1A1AA] group-hover:text-[#F4F4F5]'
            }`}>
              <UploadCloud className="w-7 h-7" />
            </div>

            {/* Title & Description */}
            <div className="space-y-1 max-w-sm">
              <p className="text-sm font-medium text-[#F4F4F5]">
                Drag and drop methodology documents
              </p>
              <p className="text-xs text-[#A1A1AA]">
                Drop PDFs, DOCX, CSVs, or markdown frameworks to train the AI engine
              </p>
            </div>

            {/* Primary Select Files Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                id="select-files-button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-5 py-2.5 bg-[#3B82F6] hover:bg-blue-600 text-white text-xs font-medium rounded-[8px] transition-colors shadow-sm flex items-center gap-2"
              >
                <FilePlus className="w-4 h-4" />
                <span>Select Files</span>
              </button>

              <button
                type="button"
                id="load-sample-methodology-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onIngestPreset("Chris_Keesser_Methodology_v3.pdf");
                }}
                className="px-4 py-2.5 bg-[#27272A] hover:bg-[#3F3F46] text-[#F4F4F5] text-xs font-medium rounded-[8px] transition-colors border border-zinc-700/50 flex items-center gap-2 group"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
                <span>Quick Ingest Chris Keesser Method™️</span>
              </button>
            </div>

            {/* Accepted formats tag */}
            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-[#A1A1AA]">
              <span>Formats: PDF • DOCX • CSV • TXT • MD</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
