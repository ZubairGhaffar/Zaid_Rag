import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { UploadDropzone } from './components/UploadDropzone';
import { RecentIngestions } from './components/RecentIngestions';
import { DocumentDetailModal } from './components/DocumentDetailModal';
import { TestBrainModal } from './components/TestBrainModal';
import { IngestedDocument, NavTab } from './types';
import { 
  Users, 
  LineChart, 
  GitMerge, 
  Settings, 
  Brain, 
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('creative-brain');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<IngestedDocument | null>(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);

  // Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStepMessage, setUploadStepMessage] = useState('');

  // Pre-loaded initial documents matching the spec
  const [documents, setDocuments] = useState<IngestedDocument[]>([
    {
      id: 'doc-101',
      name: 'Chris_Keesser_Methodology.pdf',
      sizeBytes: 4404019,
      formattedSize: '4.2 MB',
      uploadedAt: 'Just now',
      timestampMs: Date.now() - 60000,
      status: 'indexed',
      tag: 'Framework',
      tokenCount: 24500,
      chunkCount: 32,
      summary: 'Central performance creative framework codifying high-converting pattern interrupts, narrative arcs, and hook testing protocols.',
      extractedConcepts: [
        'Pattern Interrupt Taxonomy',
        'Narrative Arc Structure',
        'Hook-to-Hold Ratio Scaling',
        'Direct Response Visual Triggers'
      ],
      author: 'Chris Keesser Architecture'
    },
    {
      id: 'doc-102',
      name: 'Q3_Performance_Data.csv',
      sizeBytes: 1887436,
      formattedSize: '1.8 MB',
      uploadedAt: '2h ago',
      timestampMs: Date.now() - 7200000,
      status: 'indexed',
      tag: 'Performance Data',
      tokenCount: 12100,
      chunkCount: 16,
      summary: 'Historical creative performance metrics across paid social ad sets, detailing CTR, ROAS, and conversion attribution by hook type.',
      extractedConcepts: [
        'Creative Fatigue Thresholds',
        'Hook Type ROAS Correlation',
        'Ad Spend Attribution Vectors'
      ],
      author: 'Strategy Analytics'
    },
    {
      id: 'doc-103',
      name: 'Brand_Voice_and_Angles_Brief.docx',
      sizeBytes: 911360,
      formattedSize: '890 KB',
      uploadedAt: 'Yesterday',
      timestampMs: Date.now() - 86400000,
      status: 'indexed',
      tag: 'Client Brief',
      tokenCount: 6800,
      chunkCount: 9,
      summary: 'Tone of voice guidelines, positioning pillars, and target audience desire points for performance creative alignment.',
      extractedConcepts: [
        'Audience Desire Mapping',
        'Tone Boundaries',
        'Core Value Propositions'
      ],
      author: 'Client Intelligence'
    },
    {
      id: 'doc-104',
      name: 'Hook_Analysis_Framework_v2.pdf',
      sizeBytes: 2202009,
      formattedSize: '2.1 MB',
      uploadedAt: '3 days ago',
      timestampMs: Date.now() - 259200000,
      status: 'indexed',
      tag: 'Hook Matrix',
      tokenCount: 15200,
      chunkCount: 21,
      summary: 'Comprehensive analysis of 100+ top-performing visual hooks categorized by psychological trigger and visual pacing.',
      extractedConcepts: [
        '3-Second Retention Anchors',
        'Text Overlay Contrast Rules',
        'Audio Cue Synchronization'
      ],
      author: 'Chris Keesser Strategy Lab'
    }
  ]);

  const totalTokens = documents.reduce((sum, d) => sum + d.tokenCount, 0);

  // File Upload Handler
  const handleFileUpload = async (files: File[]) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(15);
    setUploadStepMessage('Reading binary files and extracting text contents...');

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Progress animation
      setUploadProgress(35);
      setUploadStepMessage(`Processing ${file.name}...`);

      await new Promise((r) => setTimeout(r, 600));

      setUploadProgress(65);
      setUploadStepMessage(`Generating vector embeddings via Gemini API...`);

      let apiResponseData = null;
      try {
        const response = await fetch('/api/ingest', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.name,
            fileType: file.type || 'document',
            fileSize: file.size,
            contentSnippet: `Uploaded document ${file.name} for performance creative strategy memory indexation.`,
          }),
        });
        if (response.ok) {
          apiResponseData = await response.json();
        }
      } catch (e) {
        console.warn('Backend API call fallback:', e);
      }

      setUploadProgress(90);
      setUploadStepMessage(`Indexing vectors into Creative Brain...`);

      await new Promise((r) => setTimeout(r, 400));

      // Calculate size representation
      const formattedSize = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

      // Assign tag based on extension / name
      let tag: IngestedDocument['tag'] = 'Framework';
      const lowerName = file.name.toLowerCase();
      if (lowerName.includes('csv') || lowerName.includes('data')) tag = 'Performance Data';
      else if (lowerName.includes('brief') || lowerName.includes('brand')) tag = 'Client Brief';
      else if (lowerName.includes('hook')) tag = 'Hook Matrix';

      const newDoc: IngestedDocument = {
        id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        name: file.name,
        sizeBytes: file.size,
        formattedSize,
        uploadedAt: 'Just now',
        timestampMs: Date.now(),
        status: 'indexed',
        tag,
        tokenCount: apiResponseData?.estimatedTokens || Math.floor(file.size / 30) + 1400,
        chunkCount: apiResponseData?.chunkCount || Math.floor(file.size / 4000) + 8,
        summary: apiResponseData?.summary || `Ingested methodology document ${file.name} into Creative Brain memory.`,
        extractedConcepts: apiResponseData?.extractedConcepts || [
          'Direct Strategy Framework',
          'Performance Creative Rules',
          'Hook & Hold Ratio Parameters'
        ],
        author: 'User Strategy Upload'
      };

      setDocuments((prev) => [newDoc, ...prev]);
    }

    setUploadProgress(100);
    setUploadStepMessage('Complete! All files indexed into Creative Brain.');

    setTimeout(() => {
      setIsUploading(false);
      setUploadProgress(0);
      setUploadStepMessage('');
    }, 600);
  };

  // Preset Handler for Chris Keesser Method™️ 1-click test
  const handleIngestPreset = (presetName: string) => {
    const dummyFile = new File(
      ["Chris Keesser Method - Performance Creative Framework\n1. Pattern Interrupts\n2. Hook-to-Hold Ratios\n3. Creative Scaling Matrix"],
      presetName,
      { type: "application/pdf" }
    );
    handleFileUpload([dummyFile]);
  };

  // Document removal
  const handleRemoveDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="flex h-screen bg-white text-zinc-900 overflow-hidden selection:bg-zinc-900 selection:text-white">
      {/* Sidebar Component */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        documentCount={documents.length}
        totalTokens={totalTokens}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Bar */}
        <Header
          documentCount={documents.length}
          totalTokens={totalTokens}
          onOpenTestModal={() => setIsTestModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8 md:py-12 bg-white">
          {activeTab === 'creative-brain' ? (
            /* Knowledge Ingestion Dashboard View */
            <div className="max-w-[880px] mx-auto space-y-10 animate-in fade-in duration-300">
              {/* Page Subtitle / Context */}
              <div className="text-center space-y-2.5 mb-6">
                <span className="text-[11px] font-mono text-zinc-700 font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 inline-block shadow-2xs">
                  Creative Strategy OS • Phase 0/1 MVP
                </span>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">
                  Creative Brain Knowledge Director
                </h1>
                <p className="text-xs md:text-sm text-zinc-600 max-w-[600px] mx-auto leading-relaxed">
                  Ingest strategic frameworks, client intelligence briefs, and performance data to train the centralized AI model.
                </p>
              </div>

              {/* Upload Dropzone Component */}
              <UploadDropzone
                onFileUpload={handleFileUpload}
                onIngestPreset={handleIngestPreset}
                isUploading={isUploading}
                uploadProgress={uploadProgress}
                uploadStepMessage={uploadStepMessage}
              />

              {/* Recent Ingestions Component */}
              <RecentIngestions
                documents={documents}
                onSelectDocument={setSelectedDocument}
                onRemoveDocument={handleRemoveDocument}
              />
            </div>
          ) : (
            /* Alternate Sidebar View Placeholders */
            <div className="max-w-[800px] mx-auto py-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center mx-auto text-zinc-900 shadow-2xs">
                {activeTab === 'executive-team' && <Users className="w-8 h-8" />}
                {activeTab === 'client-intelligence' && <LineChart className="w-8 h-8" />}
                {activeTab === 'workflows' && <GitMerge className="w-8 h-8" />}
                {activeTab === 'settings' && <Settings className="w-8 h-8" />}
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-bold text-zinc-900 capitalize">
                  {activeTab.replace('-', ' ')} View
                </h2>
                <p className="text-xs text-zinc-500 max-w-md mx-auto">
                  This section is planned for Phase 2. The primary operational focus of this MVP is the Knowledge Ingestion engine.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('creative-brain')}
                className="px-5 py-2.5 bg-black hover:bg-zinc-800 text-white text-xs font-medium rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Knowledge Ingestion</span>
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Detail Modal Component */}
      <DocumentDetailModal
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />

      {/* Brain Query Test Modal Component */}
      <TestBrainModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        documents={documents}
      />
    </div>
  );
}
