// @new
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeComposer } from "@/components/ui/badge-composer";
import { ProofProgress } from "@/components/ui/proof-progress";
import { SnapshotCard } from "@/components/ui/snapshot-card";
import { RiskDial } from "@/components/ui/risk-dial";
import { ExplainEntry } from "@/components/ui/explain-panel";
import { EnhancedProofSimulator } from "@/lib/enhanced-simulation";
import { 
  Building2, 
  ArrowLeft,
  TrendingUp,
  Shield,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import type { ProgressStep } from "@/components/ui/progress-stepper";

export default function CompanyBadgePage() {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<ProgressStep[]>([]);
  const [explainEntries, setExplainEntries] = useState<ExplainEntry[]>([]);
  const [generatedSnapshot, setGeneratedSnapshot] = useState<any>(null);
  
  // Mock company risk data - would come from Command Center
  const [companyRiskScore] = useState(87);
  const [lastUpdated] = useState('2024-01-15T10:30:00Z');
  const [eligibilityStatus] = useState({
    minScore: 70,
    hasIncorporationDocs: true,
    hasComplianceMap: true,
    hasActiveVault: true
  });
  
  useEffect(() => {
    document.title = "Company Badge Generator – Quentlex Proofs";
  }, []);

  const handleComposeBadge = async (items: any[]) => {
    setSelectedItems(items);
    setIsGenerating(true);
    setExplainEntries([]);
    
    // Initialize steps
    const initialSteps: ProgressStep[] = [
      { id: 'validate', label: 'Validating Company State', status: 'active' },
      { id: 'aggregate', label: 'Aggregating Risk Components', status: 'pending' },
      { id: 'compute', label: 'Computing Company Score', status: 'pending' },
      { id: 'badge', label: 'Generating Company Badge', status: 'pending' },
      { id: 'finalize', label: 'Finalizing Verification', status: 'pending' }
    ];
    setSteps(initialSteps);

    // Mock explanation entries
    const mockEntries: ExplainEntry[] = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        type: 'analysis',
        message: 'Analyzing company-wide compliance state...',
        confidence: 94
      },
      {
        id: '2', 
        timestamp: new Date(Date.now() + 1000).toISOString(),
        type: 'rule',
        message: 'Aggregating risk scores from documents and existing badges',
        details: `Processing ${items.length} selected items with current risk score of ${companyRiskScore}`
      },
      {
        id: '3',
        timestamp: new Date(Date.now() + 2000).toISOString(), 
        type: 'analysis',
        message: 'Generating comprehensive company compliance badge',
        confidence: 96
      },
      {
        id: '4',
        timestamp: new Date(Date.now() + 3000).toISOString(),
        type: 'citation',
        message: 'Embedding company risk score and component analysis',
        details: 'Badge includes differentiation between documents and sub-badges'
      }
    ];

    // Simulate streaming entries
    mockEntries.forEach((entry, index) => {
      setTimeout(() => {
        setExplainEntries(prev => [...prev, entry]);
      }, index * 1000);
    });

    try {
      const simulator = new EnhancedProofSimulator();
      const mockInputs = items.map((item, index) => ({
        id: item.id,
        name: item.name,
        type: item.type,
        hash: item.hash,
        timestamp: new Date().toISOString()
      }));

      const { snapshot, steps: completedSteps } = await simulator.generateSnapshot(
        mockInputs,
        'company'
      );

      // Add company risk score to snapshot
      snapshot.riskScore = companyRiskScore;
      snapshot.title = 'Company-Wide Compliance Badge';

      setSteps(completedSteps);
      setGeneratedSnapshot(snapshot);
    } catch (error) {
      console.error('Company badge generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const meetsEligibility = companyRiskScore >= eligibilityStatus.minScore && 
                          eligibilityStatus.hasIncorporationDocs && 
                          eligibilityStatus.hasComplianceMap;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 px-6 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/proofs')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Proofs
            </Button>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <Building2 className="w-7 h-7 text-primary" />
            <h1 className="text-3xl font-bold">Company Badge Generator</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Generate a comprehensive company badge using your latest risk score, 
            compliance documents, and existing verification badges.
          </p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Company State & Composition */}
            <div className="space-y-6">
              {/* Current Company Risk Score */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Current Company Risk Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center">
                    <RiskDial score={companyRiskScore} size="lg" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Last updated: {new Date(lastUpdated).toLocaleDateString()}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => navigate('/command-center/dashboard')}
                    >
                      Update in Command Center
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Eligibility Check */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Badge Eligibility
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    {companyRiskScore >= eligibilityStatus.minScore ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-warning" />
                    )}
                    <span className="text-sm">Risk Score ≥ {eligibilityStatus.minScore}</span>
                    <Badge variant="outline" className={companyRiskScore >= eligibilityStatus.minScore ? "status-success" : "status-warning"}>
                      {companyRiskScore}/100
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {eligibilityStatus.hasIncorporationDocs ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-warning" />
                    )}
                    <span className="text-sm">Incorporation Documents</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {eligibilityStatus.hasComplianceMap ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-warning" />
                    )}
                    <span className="text-sm">Compliance Map Complete</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {eligibilityStatus.hasActiveVault ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-warning" />
                    )}
                    <span className="text-sm">Active Legal Vault</span>
                  </div>

                  {!meetsEligibility && (
                    <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <p className="text-sm text-warning">
                        Complete remaining requirements to generate company badge.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Badge Composer */}
              {meetsEligibility && (
                <BadgeComposer
                  onCompose={handleComposeBadge}
                  disabled={isGenerating}
                />
              )}
            </div>

            {/* Right Column - Progress & Results */}
            <div className="space-y-6">
              {/* Progress Tracker */}
              {isGenerating && (
                <ProofProgress
                  isActive={isGenerating}
                  currentStep={currentStep}
                  steps={steps}
                  explainEntries={explainEntries}
                  title="Company Badge Generation"
                />
              )}

              {/* Generated Company Badge */}
              {generatedSnapshot && (
                <SnapshotCard
                  snapshot={generatedSnapshot}
                  onShare={() => navigate('/proofs/share')}
                  onDownload={() => console.log('Download company badge')}
                  onVerify={() => window.open(generatedSnapshot.verificationUrl, '_blank')}
                />
              )}

              {/* Information Panel */}
              {!isGenerating && !generatedSnapshot && (
                <Card className="premium-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Company Badge Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      Company badges provide a comprehensive view of your organization's 
                      compliance health, combining documents, risk scores, and existing verifications.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>Aggregates all compliance components</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>Includes real-time risk scoring</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>Differentiates documents vs badges</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>Preferred by institutional investors</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}