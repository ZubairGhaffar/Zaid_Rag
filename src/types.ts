export interface IngestedDocument {
  id: string;
  name: string;
  sizeBytes: number;
  formattedSize: string;
  uploadedAt: string;
  timestampMs: number;
  status: 'indexed' | 'indexing' | 'failed';
  tag: 'Framework' | 'Performance Data' | 'Client Brief' | 'Hook Matrix' | 'General';
  tokenCount: number;
  chunkCount: number;
  summary: string;
  extractedConcepts: string[];
  contentSnippet?: string;
  author?: string;
}

export type NavTab = 'creative-brain' | 'executive-team' | 'client-intelligence' | 'workflows' | 'settings';

export interface BrainQueryResult {
  answer: string;
  sourcesUsed: string[];
  confidence: number;
}
