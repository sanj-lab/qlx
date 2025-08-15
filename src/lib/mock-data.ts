// @new - Simulated data for the Quentlex platform
import { Jurisdiction, Lawyer, Document, VaultFolder, ComplianceItem, RiskScore } from './types';

export const mockJurisdictions: Jurisdiction[] = [
  {
    id: 'uae',
    name: 'United Arab Emirates',
    code: 'AE',
    flag: '🇦🇪',
    regulations: ['VARA', 'SCA', 'ADGM', 'DIFC'],
    complexity: 'medium',
    cost: 'medium',
    timeToMarket: 90
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    regulations: ['FCA', 'PRA', 'Companies House'],
    complexity: 'high',
    cost: 'high',
    timeToMarket: 120
  },
  {
    id: 'eu',
    name: 'European Union',
    code: 'EU',
    flag: '🇪🇺',
    regulations: ['MiCA', 'GDPR', 'AML5'],
    complexity: 'high',
    cost: 'high',
    timeToMarket: 150
  },
  {
    id: 'sg',
    name: 'Singapore',
    code: 'SG',
    flag: '🇸🇬',
    regulations: ['MAS', 'ACRA'],
    complexity: 'medium',
    cost: 'medium',
    timeToMarket: 75
  },
  {
    id: 'us',
    name: 'United States',
    code: 'US',
    flag: '🇺🇸',
    regulations: ['SEC', 'CFTC', 'FinCEN'],
    complexity: 'high',
    cost: 'high',
    timeToMarket: 180
  }
];

export const mockLawyers: Lawyer[] = [
  {
    id: 'lawyer-1',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face',
    firm: 'DLA Piper',
    jurisdictions: ['UAE', 'SG'],
    specialties: ['Token Classification', 'Regulatory Compliance', 'Corporate Structure'],
    avgTurnaround: 24,
    rating: 4.9,
    reviewCount: 127,
    available: true
  },
  {
    id: 'lawyer-2',
    name: 'Marcus Reid',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    firm: 'Clifford Chance',
    jurisdictions: ['UK', 'EU'],
    specialties: ['MiCA Compliance', 'Financial Services', 'Cross-border'],
    avgTurnaround: 18,
    rating: 4.8,
    reviewCount: 89,
    available: true
  },
  {
    id: 'lawyer-3',
    name: 'Dr. Elena Kozlov',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    firm: 'White & Case',
    jurisdictions: ['US', 'EU'],
    specialties: ['Securities Law', 'DeFi Regulations', 'Privacy'],
    avgTurnaround: 36,
    rating: 4.9,
    reviewCount: 203,
    available: false
  }
];

export const mockVaultFolders: VaultFolder[] = [
  {
    id: 'company',
    name: 'Company',
    icon: 'Building',
    color: 'blue',
    documents: [
      {
        id: 'doc-1',
        name: 'Certificate of Incorporation.pdf',
        type: 'pdf',
        size: 2400000,
        hash: 'sha256:a1b2c3d4...',
        uploadedAt: '2024-01-15T10:30:00Z',
        folderId: 'company',
        tags: ['incorporation', 'legal'],
        isIndexed: true
      },
      {
        id: 'doc-2',
        name: 'Memorandum of Association.pdf',
        type: 'pdf',
        size: 1800000,
        hash: 'sha256:e5f6g7h8...',
        uploadedAt: '2024-01-15T10:35:00Z',
        folderId: 'company',
        tags: ['incorporation', 'governance'],
        isIndexed: true
      }
    ]
  },
  {
    id: 'licenses',
    name: 'Licenses',
    icon: 'Shield',
    color: 'green',
    documents: []
  },
  {
    id: 'policies',
    name: 'Policies',
    icon: 'FileText',
    color: 'purple',
    documents: [
      {
        id: 'doc-3',
        name: 'Privacy Policy v2.1.docx',
        type: 'docx',
        size: 450000,
        hash: 'sha256:i9j0k1l2...',
        uploadedAt: '2024-02-01T14:20:00Z',
        folderId: 'policies',
        tags: ['privacy', 'gdpr'],
        isIndexed: true
      }
    ]
  },
  {
    id: 'contracts',
    name: 'Contracts',
    icon: 'FileCheck',
    color: 'orange',
    documents: []
  },
  {
    id: 'tech',
    name: 'Tech',
    icon: 'Code',
    color: 'blue',
    documents: [
      {
        id: 'doc-4',
        name: 'Whitepaper v1.3.pdf',
        type: 'pdf',
        size: 5200000,
        hash: 'sha256:m3n4o5p6...',
        uploadedAt: '2024-01-20T09:15:00Z',
        folderId: 'tech',
        tags: ['whitepaper', 'technical'],
        isIndexed: true
      }
    ]
  },
  {
    id: 'investors',
    name: 'Investors',
    icon: 'TrendingUp',
    color: 'green',
    documents: []
  },
  {
    id: 'memories',
    name: 'Memories',
    icon: 'Brain',
    color: 'purple',
    documents: []
  },
  {
    id: 'badges',
    name: 'Badges',
    icon: 'Award',
    color: 'gold',
    documents: []
  }
];

export const mockComplianceItems: ComplianceItem[] = [
  {
    id: 'comp-1',
    type: 'license',
    name: 'VARA Preliminary Approval',
    jurisdiction: 'UAE',
    required: true,
    status: 'pending',
    dueDate: '2024-06-15',
    cost: 50000,
    estimatedDays: 45,
    dependencies: [],
    documents: ['doc-1', 'doc-2']
  },
  {
    id: 'comp-2',
    type: 'policy',
    name: 'AML/KYC Procedures',
    jurisdiction: 'UAE',
    required: true,
    status: 'in-progress',
    cost: 15000,
    estimatedDays: 14,
    dependencies: ['comp-1'],
    documents: []
  },
  {
    id: 'comp-3',
    type: 'filing',
    name: 'Token Classification Report',
    jurisdiction: 'UAE',
    required: true,
    status: 'completed',
    cost: 25000,
    estimatedDays: 21,
    dependencies: [],
    documents: ['doc-4']
  }
];

export const mockRiskScore: RiskScore = {
  overall: 72,
  categories: {
    legal: 68,
    financial: 75,
    operational: 78,
    market: 65,
    governance: 74
  },
  factors: [
    {
      category: 'legal',
      factor: 'Token classification pending',
      impact: 'medium',
      score: 25,
      mitigation: 'Complete token classification in UAE'
    },
    {
      category: 'legal',
      factor: 'Missing AML procedures',
      impact: 'high',
      score: 35,
      mitigation: 'Implement comprehensive AML/KYC framework'
    },
    {
      category: 'operational',
      factor: 'Jurisdiction complexity',
      impact: 'medium',
      score: 20
    }
  ],
  lastUpdated: '2024-02-15T16:30:00Z',
  eligible: true
};