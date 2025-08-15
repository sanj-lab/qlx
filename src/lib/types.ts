// @new - Core type definitions for Quentlex platform
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  organization?: string;
  role?: 'founder' | 'lawyer' | 'investor';
}

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'txt' | 'csv';
  size: number;
  hash: string;
  uploadedAt: string;
  folderId: string;
  tags: string[];
  isIndexed: boolean;
}

export interface VaultFolder {
  id: string;
  name: string;
  icon: string;
  color: string;
  documents: Document[];
}

export interface Jurisdiction {
  id: string;
  name: string;
  code: string;
  flag: string;
  regulations: string[];
  complexity: 'low' | 'medium' | 'high';
  cost: 'low' | 'medium' | 'high';
  timeToMarket: number; // days
}

export interface TokenClassification {
  jurisdiction: string;
  classification: 'security' | 'utility' | 'commodity' | 'payment' | 'hybrid';
  confidence: number;
  requirements: string[];
  implications: string[];
  risks: string[];
}

export interface ComplianceItem {
  id: string;
  type: 'license' | 'filing' | 'policy' | 'procedure';
  name: string;
  jurisdiction: string;
  required: boolean;
  status: 'pending' | 'in-progress' | 'completed' | 'expired';
  dueDate?: string;
  cost: number;
  estimatedDays: number;
  dependencies: string[];
  documents: string[];
}

export interface RiskScore {
  overall: number;
  categories: {
    legal: number;
    financial: number;
    operational: number;
    market: number;
    governance: number;
  };
  factors: RiskFactor[];
  lastUpdated: string;
  eligible: boolean;
}

export interface RiskFactor {
  category: string;
  factor: string;
  impact: 'low' | 'medium' | 'high';
  score: number;
  mitigation?: string;
}

export interface LaunchPathScenario {
  id: string;
  name: string;
  type: 'idea-fit' | 'post-incorp' | 'redline' | 'doc-studio';
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  status: 'draft' | 'analyzing' | 'completed' | 'error';
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  title: string;
  items: ReviewItem[];
  lawyer: Lawyer;
  status: 'sent' | 'in-review' | 'returned' | 'signed';
  notes: string;
  urgency: 'standard' | 'priority';
  createdAt: string;
  updatedAt: string;
  comments: ReviewComment[];
}

export interface ReviewItem {
  id: string;
  type: 'document' | 'compliance-map' | 'token-classification' | 'risk-analysis';
  name: string;
  content: any;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
}

export interface ReviewComment {
  id: string;
  author: 'founder' | 'lawyer';
  content: string;
  timestamp: string;
  attachments?: string[];
}

export interface Lawyer {
  id: string;
  name: string;
  avatar: string;
  firm: string;
  jurisdictions: string[];
  specialties: string[];
  avgTurnaround: number; // hours
  rating: number;
  reviewCount: number;
  available: boolean;
}

export interface Snapshot {
  id: string;
  type: 'self-reviewed' | 'expert-reviewed';
  badgeId: string;
  company: string;
  inputs: SnapshotInput[];
  riskScore: number;
  hash: string;
  timestamp: string;
  lawyer?: Lawyer;
  txId?: string; // simulated blockchain tx
  verificationLink: string;
  verificationCount: number;
}

export interface SnapshotInput {
  type: string;
  name: string;
  hash: string;
  timestamp: string;
}

export interface InvestorRoom {
  id: string;
  name: string;
  description: string;
  documents: Document[];
  snapshots: Snapshot[];
  accessLog: AccessLogEntry[];
  inviteLink: string;
  ndaRequired: boolean;
  expiresAt?: string;
  isActive: boolean;
  createdAt: string;
}

export interface AccessLogEntry {
  id: string;
  investor: string;
  action: 'viewed' | 'downloaded' | 'verified';
  target: string;
  timestamp: string;
  ipRegion: string;
}

export interface TermSheetAnalysis {
  id: string;
  originalDoc: string;
  issues: TermSheetIssue[];
  suggestions: TermSheetSuggestion[];
  riskLevel: 'low' | 'medium' | 'high';
  summary: string;
  redlinedVersion?: string;
}

export interface TermSheetIssue {
  id: string;
  clause: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  implications: string[];
  references: string[];
}

export interface TermSheetSuggestion {
  id: string;
  clause: string;
  current: string;
  suggested: string;
  rationale: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  attachments?: Document[];
  citations?: string[];
  actions?: ChatAction[];
}

export interface ChatAction {
  type: 'navigate' | 'upload' | 'generate' | 'analyze';
  label: string;
  target: string;
  params?: Record<string, any>;
}

export interface ExplainEntry {
  id: string;
  timestamp: string;
  type: 'analysis' | 'rule' | 'citation' | 'warning';
  message: string;
  details?: string;
  confidence?: number;
}