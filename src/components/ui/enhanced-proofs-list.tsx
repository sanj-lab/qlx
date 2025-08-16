import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { 
  Search, 
  Filter, 
  Calendar, 
  FileText, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  Download,
  ExternalLink
} from "lucide-react";
import { EnhancedZKSimulator } from "@/lib/enhanced-zk-simulation";

interface EnhancedProof {
  id: string;
  type: 'self' | 'expert' | 'company';
  title: string;
  timestamp: string;
  proofHash: string;
  confidence: number;
  isValid: boolean;
  documentsCount: number;
  jurisdiction: string;
}

// Mock enhanced proofs with realistic data
const mockEnhancedProofs: EnhancedProof[] = [
  {
    id: 'qlx_proof_A1B2C3D4',
    type: 'expert',
    title: 'UAE VARA Compliance Badge',
    timestamp: '2024-02-15T14:30:00Z',
    proofHash: 'A1B2C3D4',
    confidence: 96,
    isValid: true,
    documentsCount: 8,
    jurisdiction: 'UAE'
  },
  {
    id: 'qlx_proof_E5F6G7H8',
    type: 'self',
    title: 'Token Classification Analysis',
    timestamp: '2024-02-14T09:15:00Z',
    proofHash: 'E5F6G7H8',
    confidence: 88,
    isValid: true,
    documentsCount: 3,
    jurisdiction: 'UAE'
  },
  {
    id: 'qlx_proof_I9J0K1L2',
    type: 'company',
    title: 'Complete Risk Assessment',
    timestamp: '2024-02-13T16:45:00Z',
    proofHash: 'I9J0K1L2',
    confidence: 74,
    isValid: false,
    documentsCount: 12,
    jurisdiction: 'UK'
  }
];

export function EnhancedProofsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<'all' | 'self' | 'expert' | 'company'>('all');
  const [selectedProof, setSelectedProof] = useState<EnhancedProof | null>(null);

  const filteredProofs = mockEnhancedProofs.filter(proof => {
    const matchesSearch = proof.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         proof.proofHash.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || proof.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTypeColor = (type: EnhancedProof['type']) => {
    switch (type) {
      case 'expert': return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200';
      case 'company': return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200';
      case 'self': return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200';
    }
  };

  const handleVerifyProof = (proof: EnhancedProof) => {
    const verification = EnhancedZKSimulator.verifyEnhancedBadge(proof.id, proof.proofHash);
    setSelectedProof(proof);
    
    // In a real implementation, this would show verification details
    console.log('Verification result:', verification);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Enhanced ZK Proofs
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Proofs</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by title or hash..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="filter">Filter by Type</Label>
              <select
                id="filter"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="all">All Types</option>
                <option value="self">Self-Reviewed</option>
                <option value="expert">Expert-Reviewed</option>
                <option value="company">Company Analysis</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proofs List */}
      <div className="space-y-4">
        {filteredProofs.map((proof) => (
          <Card key={proof.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{proof.title}</h3>
                    <Badge className={getTypeColor(proof.type)}>
                      {proof.type === 'expert' ? 'Expert' : proof.type === 'company' ? 'Company' : 'Self'}-Reviewed
                    </Badge>
                    {proof.isValid ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-warning" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(proof.timestamp).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {proof.documentsCount} documents
                    </div>
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      {proof.confidence}% confidence
                    </div>
                  </div>
                  <div className="font-mono text-xs bg-muted/50 p-2 rounded">
                    Hash: {proof.proofHash} | Jurisdiction: {proof.jurisdiction}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleVerifyProof(proof)}>
                    <Eye className="w-4 h-4 mr-1" />
                    Verify
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProofs.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No proofs found</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Generate your first ZK proof to get started'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}