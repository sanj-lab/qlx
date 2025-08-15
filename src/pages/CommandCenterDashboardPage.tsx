// @new - Company Risk Score Dashboard - Bloomberg Terminal for Web3 compliance
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RiskDial } from "@/components/ui/risk-dial";
import { VaultPicker } from "@/components/ui/vault-picker";
import { ExplainPanel } from "@/components/ui/explain-panel";
import { ProgressStepper } from "@/components/ui/progress-stepper";
import { CommandCenterSubnav } from "@/components/ui/command-center-subnav";
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  FileText, 
  Calendar,
  Award,
  Download,
  RefreshCw,
  Eye,
  Zap
} from "lucide-react";

interface CompanyMetrics {
  complianceCompletion: number;
  licensesPending: number;
  filingsUpcoming: number;
  lastUpdate: string;
  riskScore: number;
  riskGrade: string;
  eligibleForBadge: boolean;
}

interface RiskBreakdown {
  category: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  topRisks: string[];
}

interface DocumentItem {
  id: string;
  name: string;
  type: 'document' | 'badge';
  status: 'current' | 'outdated' | 'missing';
  lastUpdated: string;
  hash?: string;
  badgeType?: string;
  score?: number;
}

// Simulated company data
const mockCompanyMetrics: CompanyMetrics = {
  complianceCompletion: 87,
  licensesPending: 2,
  filingsUpcoming: 3,
  lastUpdate: "2024-02-15T14:30:00Z",
  riskScore: 78,
  riskGrade: "B+",
  eligibleForBadge: true
};

const mockRiskBreakdown: RiskBreakdown[] = [
  {
    category: "Legal",
    score: 82,
    trend: "up",
    topRisks: ["Token classification pending", "VARA license renewal", "Privacy policy update needed"]
  },
  {
    category: "Financial", 
    score: 85,
    trend: "stable",
    topRisks: ["Audit requirements", "Tax filing compliance", "Investor reporting"]
  },
  {
    category: "Governance",
    score: 74,
    trend: "down", 
    topRisks: ["Board resolution outdated", "Voting procedures unclear", "Delegation framework"]
  },
  {
    category: "Market",
    score: 71,
    trend: "stable",
    topRisks: ["Market abuse prevention", "Listing requirements", "Exchange compliance"]
  }
];

const mockDocuments: DocumentItem[] = [
  {
    id: "doc-1",
    name: "Certificate of Incorporation",
    type: "document",
    status: "current",
    lastUpdated: "2024-01-15T10:30:00Z",
    hash: "0x1a2b3c4d..."
  },
  {
    id: "badge-1", 
    name: "Post-Incorp Risk Analysis",
    type: "badge",
    status: "current",
    lastUpdated: "2024-02-10T15:20:00Z",
    badgeType: "Expert-Reviewed",
    score: 85
  },
  {
    id: "doc-2",
    name: "Token Economics Whitepaper", 
    type: "document",
    status: "outdated",
    lastUpdated: "2024-01-20T09:15:00Z",
    hash: "0x4d5e6f7g..."
  },
  {
    id: "badge-2",
    name: "Token Classification UAE",
    type: "badge", 
    status: "current",
    lastUpdated: "2024-02-08T11:45:00Z",
    badgeType: "Self-Reviewed",
    score: 78
  },
  {
    id: "doc-3",
    name: "VARA License Application",
    type: "document",
    status: "missing",
    lastUpdated: "",
    hash: ""
  }
];

const badgeGenerationSteps = [
  { id: "step-1", label: "Validate Inputs", description: "Checking input data integrity", status: "pending" as 'pending' | 'active' | 'completed' | 'error' },
  { id: "step-2", label: "Hash Data", description: "Creating cryptographic hash", status: "pending" as 'pending' | 'active' | 'completed' | 'error' },
  { id: "step-3", label: "Generate Badge", description: "Creating ZK proof badge", status: "pending" as 'pending' | 'active' | 'completed' | 'error' },
  { id: "step-4", label: "Show Badge Card", description: "Finalizing badge display", status: "pending" as 'pending' | 'active' | 'completed' | 'error' }
];

const riskCalculationSteps = [
  { id: "risk-1", label: "Validate Inputs", description: "Verifying data sources", status: "pending" as 'pending' | 'active' | 'completed' | 'error' },
  { id: "risk-2", label: "Analyze Documents vs Badges", description: "Comparing document and badge scores", status: "pending" as 'pending' | 'active' | 'completed' | 'error' },
  { id: "risk-3", label: "Weight Badge Scores Higher", description: "Applying expert review weights", status: "pending" as 'pending' | 'active' | 'completed' | 'error' },
  { id: "risk-4", label: "Regulatory Cross-Check", description: "Validating against regulations", status: "pending" as 'pending' | 'active' | 'completed' | 'error' },
  { id: "risk-5", label: "Generate Combined Score", description: "Computing final risk score", status: "pending" as 'pending' | 'active' | 'completed' | 'error' }
];

const explainEntries = [
  {
    id: "explain-1",
    type: "analysis" as const,
    message: "Badge scores weighted 2x higher than document analysis",
    details: "Expert-reviewed badges carry higher trust weight in risk calculation",
    timestamp: new Date().toISOString()
  },
  {
    id: "explain-2", 
    type: "rule" as const,
    message: "VARA compliance requirements detected",
    details: "UAE jurisdiction triggers specific regulatory framework validation",
    timestamp: new Date().toISOString()
  },
  {
    id: "explain-3",
    type: "warning" as const,
    message: "Token Economics document is 26 days outdated", 
    details: "Recommend updating with latest tokenomics before next investor presentation",
    timestamp: new Date().toISOString()
  }
];

export default function CommandCenterDashboardPage() {
  const navigate = useNavigate();
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [showVaultPicker, setShowVaultPicker] = useState(false);
  const [isGeneratingBadge, setIsGeneratingBadge] = useState(false);
  const [isCalculatingRisk, setIsCalculatingRisk] = useState(false);
  const [badgeSteps, setBadgeSteps] = useState(badgeGenerationSteps);
  const [riskSteps, setRiskSteps] = useState(riskCalculationSteps);

  const getStatusBadge = (status: DocumentItem['status']) => {
    switch (status) {
      case 'current':
        return <Badge className="status-success">Current</Badge>;
      case 'outdated':
        return <Badge className="status-warning">Outdated</Badge>;
      case 'missing':
        return <Badge className="status-error">Missing</Badge>;
    }
  };

  const getTrendIcon = (trend: RiskBreakdown['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-destructive rotate-180" />;
      case 'stable':
        return <div className="h-4 w-4 border-t-2 border-muted-foreground" />;
    }
  };

  const handleGenerateBadge = async () => {
    if (!mockCompanyMetrics.eligibleForBadge) return;
    
    setIsGeneratingBadge(true);
    setBadgeSteps(badgeGenerationSteps.map(step => ({ ...step })));
    
    for (let i = 0; i < badgeSteps.length; i++) {
      setBadgeSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: 'active' as const } : step
      ));
      await new Promise(resolve => setTimeout(resolve, 1500));
      setBadgeSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: 'completed' as const } : step
      ));
    }
    
    setTimeout(() => {
      setIsGeneratingBadge(false);
      setBadgeSteps(badgeGenerationSteps.map(step => ({ ...step })));
      navigate('/proofs');
    }, 1000);
  };

  const handleRecalculateRisk = async () => {
    setIsCalculatingRisk(true);
    setRiskSteps(riskCalculationSteps.map(step => ({ ...step })));
    
    for (let i = 0; i < riskSteps.length; i++) {
      setRiskSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: 'active' as const } : step
      ));
      await new Promise(resolve => setTimeout(resolve, 1200));
      setRiskSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: 'completed' as const } : step
      ));
    }
    
    setTimeout(() => {
      setIsCalculatingRisk(false);
      setRiskSteps(riskCalculationSteps.map(step => ({ ...step })));
    }, 1000);
  };

  const handleDocumentSelection = (selected: string[]) => {
    setSelectedDocuments(selected);
    setShowVaultPicker(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Subnav */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Command Center</h1>
              <p className="text-muted-foreground">Your compliance mission control</p>
            </div>
          </div>
          <CommandCenterSubnav className="w-full" />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content - Company Health */}
          <div className="lg:col-span-3 space-y-8">
            {/* Hero Section - Company Risk Score */}
            <Card className="premium-card">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-semibold">Your Compliance Health</CardTitle>
                <CardDescription>One score. All the details you need to act.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6">
                <RiskDial 
                  score={mockCompanyMetrics.riskScore} 
                  size="lg" 
                  showLabel={false} 
                />
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Company Risk Score</div>
                  <div className="text-3xl font-bold mb-1">{mockCompanyMetrics.riskScore}/100</div>
                  <Badge className="status-success text-lg px-3 py-1">Grade {mockCompanyMetrics.riskGrade}</Badge>
                </div>
                
                {mockCompanyMetrics.eligibleForBadge && (
                  <Button 
                    onClick={handleGenerateBadge}
                    disabled={isGeneratingBadge}
                    className="min-w-[200px]"
                    size="lg"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    {isGeneratingBadge ? "Generating..." : "Generate ZK Badge"}
                  </Button>
                )}
                
                <div className="text-xs text-muted-foreground text-center">
                  <Badge variant="outline" className="border-dashed">
                    <Zap className="w-3 h-3 mr-1" />
                    Simulated for pilot
                  </Badge>
                  <div className="mt-1">Deterministic hash from verified inputs</div>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics Row */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="enterprise-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary">{mockCompanyMetrics.complianceCompletion}%</div>
                      <div className="text-sm text-muted-foreground">Compliance Complete</div>
                    </div>
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <Progress value={mockCompanyMetrics.complianceCompletion} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-warning">{mockCompanyMetrics.licensesPending}</div>
                      <div className="text-sm text-muted-foreground">Licenses Pending</div>
                    </div>
                    <AlertTriangle className="h-6 w-6 text-warning" />
                  </div>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-accent">{mockCompanyMetrics.filingsUpcoming}</div>
                      <div className="text-sm text-muted-foreground">Filings Upcoming</div>
                    </div>
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground">Last Updated</div>
                      <div className="text-sm font-medium">Feb 15, 14:30</div>
                    </div>
                    <RefreshCw className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Risk Breakdown Panels */}
            <div className="grid md:grid-cols-2 gap-6">
              {mockRiskBreakdown.map((category) => (
                <Card key={category.category} className="enterprise-card hover-lift">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{category.category} Risk</CardTitle>
                      <div className="flex items-center space-x-2">
                        <div className="text-lg font-bold">{category.score}/100</div>
                        {getTrendIcon(category.trend)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground mb-2">Top Risk Drivers:</div>
                      {category.topRisks.slice(0, 2).map((risk, index) => (
                        <div key={index} className="text-sm p-2 bg-muted/20 rounded flex items-center justify-between">
                          <span>{risk}</span>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Document & Badge Manager */}
            <Card className="enterprise-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Document & Badge Manager</CardTitle>
                    <CardDescription>Manage documents and badges affecting your risk score</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline"
                      onClick={() => setShowVaultPicker(true)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Attach Updated Versions
                    </Button>
                    <Button 
                      onClick={handleRecalculateRisk}
                      disabled={isCalculatingRisk}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {isCalculatingRisk ? "Calculating..." : "Recalculate Risk Score"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockDocuments.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        {item.type === 'badge' ? (
                          <Award className="h-5 w-5 text-primary" />
                        ) : (
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        )}
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                            <span>{item.type === 'badge' ? `${item.badgeType} Badge` : 'Document'}</span>
                            {item.lastUpdated && (
                              <span>Updated {new Date(item.lastUpdated).toLocaleDateString()}</span>
                            )}
                            {item.score && (
                              <span>Score: {item.score}/100</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getStatusBadge(item.status)}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Progress & Explanations */}
          <div className="space-y-6">
            {/* Progress Stepper */}
            {(isGeneratingBadge || isCalculatingRisk) && (
              <ProgressStepper
                steps={isGeneratingBadge ? badgeSteps : riskSteps}
                className="mb-6"
              />
            )}

            {/* Action Shortcuts */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/command-center/drift')}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Regulatory Drift
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/command-center/filings')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Filing Calendar
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/command-center/vault')}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Legal Vault
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/proofs')}
                >
                  <Award className="w-4 h-4 mr-2" />
                  Generate Proofs
                </Button>
              </CardContent>
            </Card>

            {/* Explain Panel */}
            <ExplainPanel
              title="Risk Analysis Insights"
              entries={explainEntries}
              isActive={isCalculatingRisk}
            />
          </div>
        </div>
      </div>

      {/* Vault Picker Modal */}
      {showVaultPicker && (
        <VaultPicker
          trigger={<div />}
          selected={selectedDocuments}
          onSelectionChange={handleDocumentSelection}
          maxSelection={10}
          title="Attach Updated Documents"
          description="Select documents to replace with updated versions"
        />
      )}
    </div>
  );
}