// @new - Regulatory Drift Tracker - Document obsolescence monitoring
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CommandCenterSubnav } from "@/components/ui/command-center-subnav";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  AlertTriangle, 
  TrendingDown, 
  FileText, 
  Eye,
  Edit3,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  Clock
} from "lucide-react";

interface DriftItem {
  id: string;
  documentName: string;
  driftPercentage: number;
  lastReview: string;
  regulationUpdate: string;
  status: 'critical' | 'warning' | 'ok';
  affectedClauses: string[];
  recommendedActions: string[];
  jurisdiction: string;
  documentType: string;
}

const mockDriftData: DriftItem[] = [
  {
    id: "drift-1",
    documentName: "Privacy Policy v2.1",
    driftPercentage: 67,
    lastReview: "2024-01-10",
    regulationUpdate: "GDPR Amendment Feb 2024",
    status: "critical",
    affectedClauses: [
      "Data processing purposes", 
      "Cross-border transfers", 
      "Consent mechanisms",
      "Data retention periods"
    ],
    recommendedActions: [
      "Update consent language per new GDPR guidelines",
      "Add explicit data transfer safeguards",
      "Revise retention period calculations"
    ],
    jurisdiction: "EU",
    documentType: "Policy"
  },
  {
    id: "drift-2", 
    documentName: "AML/KYC Procedures",
    driftPercentage: 89,
    lastReview: "2023-12-15",
    regulationUpdate: "UAE VARA Guidelines Update",
    status: "critical",
    affectedClauses: [
      "Customer due diligence requirements",
      "Suspicious transaction reporting",
      "Record keeping obligations",
      "Enhanced due diligence triggers"
    ],
    recommendedActions: [
      "Implement new VARA reporting requirements",
      "Update transaction monitoring thresholds", 
      "Revise customer risk assessment framework"
    ],
    jurisdiction: "UAE",
    documentType: "Compliance Procedure"
  },
  {
    id: "drift-3",
    documentName: "Token Sale Terms & Conditions",
    driftPercentage: 23,
    lastReview: "2024-02-01",
    regulationUpdate: "MiCA Final Rules",
    status: "warning",
    affectedClauses: [
      "Investor disclosure requirements",
      "Token utility descriptions"
    ],
    recommendedActions: [
      "Add MiCA-compliant investor warnings",
      "Update token classification language"
    ],
    jurisdiction: "EU",
    documentType: "Agreement"
  },
  {
    id: "drift-4",
    documentName: "Corporate Governance Framework",
    driftPercentage: 8,
    lastReview: "2024-02-10",
    regulationUpdate: "Minor amendments",
    status: "ok",
    affectedClauses: [
      "Board meeting procedures"
    ],
    recommendedActions: [
      "Review voting procedures section"
    ],
    jurisdiction: "UAE",
    documentType: "Governance"
  },
  {
    id: "drift-5",
    documentName: "Smart Contract Audit Report",
    driftPercentage: 45,
    lastReview: "2024-01-05",
    regulationUpdate: "New security standards",
    status: "warning", 
    affectedClauses: [
      "Security assessment methodology",
      "Vulnerability classification",
      "Risk mitigation strategies"
    ],
    recommendedActions: [
      "Update to latest security standards",
      "Add new vulnerability categories",
      "Enhance risk scoring framework"
    ],
    jurisdiction: "Global",
    documentType: "Technical"
  }
];

export default function CommandCenterDriftPage() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<DriftItem | null>(null);
  const [showDiffModal, setShowDiffModal] = useState(false);

  const getDriftColor = (percentage: number) => {
    if (percentage >= 60) return "text-destructive";
    if (percentage >= 30) return "text-warning";
    return "text-success";
  };

  const getDriftBadge = (status: DriftItem['status']) => {
    switch (status) {
      case 'critical':
        return <Badge className="status-error">Critical</Badge>;
      case 'warning':
        return <Badge className="status-warning">Warning</Badge>;
      case 'ok':
        return <Badge className="status-success">OK</Badge>;
    }
  };

  const getJurisdictionBadge = (jurisdiction: string) => {
    const colors = {
      'EU': 'bg-blue-100 text-blue-800 border-blue-200',
      'UAE': 'bg-green-100 text-green-800 border-green-200',
      'Global': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return (
      <Badge variant="outline" className={colors[jurisdiction as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {jurisdiction}
      </Badge>
    );
  };

  const handleViewChanges = (item: DriftItem) => {
    setSelectedItem(item);
    setShowDiffModal(true);
  };

  const handleSendToRedline = (item: DriftItem) => {
    navigate('/launch-path/redline', { 
      state: { 
        document: item.documentName,
        driftData: item 
      }
    });
  };

  const handleUpdateViaDocStudio = (item: DriftItem) => {
    navigate('/launch-path/doc-studio', {
      state: {
        updateDocument: item.documentName,
        templateType: item.documentType,
        jurisdiction: item.jurisdiction
      }
    });
  };

  const criticalItems = mockDriftData.filter(item => item.status === 'critical');
  const warningItems = mockDriftData.filter(item => item.status === 'warning');
  const okItems = mockDriftData.filter(item => item.status === 'ok');

  return (
    <div className="min-h-screen bg-background">
      {/* Subnav */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Regulatory Drift</h1>
              <p className="text-muted-foreground">Track document obsolescence and regulatory changes</p>
            </div>
          </div>
          <CommandCenterSubnav className="w-full" />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="enterprise-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-destructive">{criticalItems.length}</div>
                  <div className="text-sm text-muted-foreground">Critical Drift Issues</div>
                  <div className="text-xs text-muted-foreground mt-1">Requires immediate attention</div>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card className="enterprise-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-warning">{warningItems.length}</div>
                  <div className="text-sm text-muted-foreground">Warning Level</div>
                  <div className="text-xs text-muted-foreground mt-1">Plan updates soon</div>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="enterprise-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-success">{okItems.length}</div>
                  <div className="text-sm text-muted-foreground">Up to Date</div>
                  <div className="text-xs text-muted-foreground mt-1">No action needed</div>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Drift Table */}
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle>Document Drift Analysis</CardTitle>
            <CardDescription>
              Regulatory compliance drift tracking across all jurisdictions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDriftData.map((item) => (
                <div 
                  key={item.id}
                  className="border rounded-lg p-6 hover:bg-muted/50 transition-colors"
                >
                  <div className="grid lg:grid-cols-12 gap-4 items-start">
                    {/* Document Info */}
                    <div className="lg:col-span-4">
                      <div className="flex items-start space-x-3">
                        <FileText className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">{item.documentName}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            {getJurisdictionBadge(item.jurisdiction)}
                            <Badge variant="outline" className="text-xs">
                              {item.documentType}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Last reviewed: {new Date(item.lastReview).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Drift Progress */}
                    <div className="lg:col-span-3">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Drift Level</span>
                          <span className={`text-sm font-bold ${getDriftColor(item.driftPercentage)}`}>
                            {item.driftPercentage}%
                          </span>
                        </div>
                        <Progress 
                          value={item.driftPercentage} 
                          className={`h-2 ${
                            item.driftPercentage >= 60 ? '[&>div]:bg-destructive' :
                            item.driftPercentage >= 30 ? '[&>div]:bg-warning' : '[&>div]:bg-success'
                          }`}
                        />
                        <p className="text-xs text-muted-foreground">
                          {item.regulationUpdate}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="lg:col-span-2 flex justify-center">
                      {getDriftBadge(item.status)}
                    </div>

                    {/* Actions */}
                    <div className="lg:col-span-3">
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewChanges(item)}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View Changes
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleSendToRedline(item)}
                        >
                          <Edit3 className="w-3 h-3 mr-1" />
                          Redline
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleUpdateViaDocStudio(item)}
                        >
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Affected Clauses Preview */}
                  {item.status !== 'ok' && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="text-sm text-muted-foreground mb-2">
                        Affected Clauses ({item.affectedClauses.length}):
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.affectedClauses.slice(0, 3).map((clause, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {clause}
                          </Badge>
                        ))}
                        {item.affectedClauses.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.affectedClauses.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Diff Changes Modal */}
      <Dialog open={showDiffModal} onOpenChange={setShowDiffModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Regulatory Changes - {selectedItem?.documentName}</DialogTitle>
            <DialogDescription>
              Detailed view of regulatory updates and affected clauses
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium">Drift Level</div>
                    <div className={`text-lg font-bold ${getDriftColor(selectedItem.driftPercentage)}`}>
                      {selectedItem.driftPercentage}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Regulation Update</div>
                    <div className="text-sm">{selectedItem.regulationUpdate}</div>
                  </div>
                </div>
              </div>

              {/* Affected Clauses */}
              <div>
                <h4 className="font-medium mb-3">Affected Clauses</h4>
                <div className="space-y-2">
                  {selectedItem.affectedClauses.map((clause, index) => (
                    <div key={index} className="flex items-center p-3 bg-destructive/10 rounded-lg">
                      <TrendingDown className="h-4 w-4 text-destructive mr-2" />
                      <span className="text-sm">{clause}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Actions */}
              <div>
                <h4 className="font-medium mb-3">Recommended Actions</h4>
                <div className="space-y-2">
                  {selectedItem.recommendedActions.map((action, index) => (
                    <div key={index} className="flex items-start p-3 bg-primary/10 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
                      <span className="text-sm">{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t">
                <Button onClick={() => handleSendToRedline(selectedItem)}>
                  <Edit3 className="w-4 h-4 mr-2" />
                  Send to Redline Agent
                </Button>
                <Button variant="outline" onClick={() => handleUpdateViaDocStudio(selectedItem)}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Update via Doc Studio
                </Button>
                <Button variant="outline" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Regulation Source
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}