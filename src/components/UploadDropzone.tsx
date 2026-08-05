import React, { useState, useRef } from 'react';
import { UploadCloud, Loader2, Sparkles, FilePlus } from 'lucide-react';

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
    <div className="w-full max-w-[820px] mx-auto">
      {/* Container header label */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div>
          <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100 tracking-tight flex items-center gap-2">
            <span>Ingest Knowledge & Strategy Frameworks</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
            Train ElevenLabs Creative Brain engine with performance briefs and methodology data.
          </p>
        </div>
        <span className="text-[10px] font-mono text-stone-600 dark:text-stone-400 uppercase bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-1 rounded-full font-medium">
          Max 50MB
        </span>
      </div>

      {/* Main Dropzone Card with ElevenLabs Ambient Glow */}
      <div
        id="upload-dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative eleven-glow-bg border border-dashed rounded-[24px] p-8 md:p-12 text-center transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm ${
          isDragOver
            ? 'border-stone-900 dark:border-white bg-stone-100/90 dark:bg-stone-800/80 shadow-xl scale-[1.01]'
            : 'border-stone-300 dark:border-stone-800/90 bg-white/90 dark:bg-[#161412] hover:border-stone-400 dark:hover:border-stone-700 hover:bg-stone-50/50 dark:hover:bg-[#1C1A17] shadow-sm'
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
            <div className="w-14 h-14 rounded-2xl bg-stone-100 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 flex items-center justify-center text-stone-900 dark:text-stone-100 shadow-xs">
              <Loader2 className="w-7 h-7 animate-spin text-stone-900 dark:text-stone-100" />
            </div>
            
            <div className="space-y-1.5 max-w-md">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Indexing into ElevenLabs Memory...
              </h3>
              <p className="text-xs font-mono text-stone-600 dark:text-stone-400">
                {uploadStepMessage || 'Chunking text and generating vector embeddings'}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-xs bg-stone-200 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-stone-900 dark:bg-white h-full transition-all duration-300 ease-out rounded-full"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            
            <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
              {uploadProgress}% completed
            </span>
          </div>
        ) : (
          /* Default Drag & Drop State */
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Upload Cloud Icon in ElevenLabs Style */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              isDragOver 
                ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-950 scale-110 shadow-md' 
                : 'bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 group-hover:scale-105'
            }`}>
              <UploadCloud className="w-7 h-7" />
            </div>

            {/* Title & Description */}
            <div className="space-y-1 max-w-sm">
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Drag and drop methodology documents
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                Drop PDFs, DOCX, CSVs, or markdown frameworks to train the Creative AI engine
              </p>
            </div>

            {/* Primary Select Files Button - ElevenLabs White/Black Pill */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                id="select-files-button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="px-6 py-2.5 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-950 text-xs font-semibold rounded-full transition-all shadow-md flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
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
                className="px-5 py-2.5 bg-stone-100 dark:bg-stone-800/80 hover:bg-stone-200 dark:hover:bg-stone-700/80 text-stone-900 dark:text-stone-100 text-xs font-medium rounded-full transition-all border border-stone-300 dark:border-stone-700 flex items-center gap-2 group cursor-pointer hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 group-hover:rotate-12 transition-transform" />
                <span>Quick Ingest Chris Keesser Method™️</span>
              </button>
            </div>

            {/* Accepted formats tag */}
            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-stone-500 dark:text-stone-400">
              <span>Formats: PDF • DOCX • CSV • TXT • MD</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

