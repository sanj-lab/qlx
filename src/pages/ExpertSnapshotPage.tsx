// @new
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VaultPicker } from "@/components/ui/vault-picker";
import { ProofProgress } from "@/components/ui/proof-progress";
import { SnapshotCard } from "@/components/ui/snapshot-card";
import { ExplainEntry } from "@/components/ui/explain-panel";
import { EnhancedProofSimulator } from "@/lib/enhanced-simulation";
import { 
  Shield, 
  UserCheck, 
  AlertCircle, 
  CheckCircle, 
  ArrowLeft,
  FileText,
  Gavel
} from "lucide-react";
import type { ProgressStep } from "@/components/ui/progress-stepper";

export default function ExpertSnapshotPage() {
  const navigate = useNavigate();
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<ProgressStep[]>([]);
  const [explainEntries, setExplainEntries] = useState<ExplainEntry[]>([]);
  const [generatedSnapshot, setGeneratedSnapshot] = useState<any>(null);
  
  // Mock Co-Review status - would check real review completion
  const [reviewedDocuments] = useState<string[]>(['doc1', 'doc2', 'doc3']);
  const [assignedLawyer] = useState({
    name: 'Sarah Mitchell',
    jurisdiction: 'UAE',
    license: 'UAE-LAW-2019-1234',
    specialty: 'Crypto & DeFi Compliance'
  });
  
  useEffect(() => {
    document.title = "Expert-Reviewed Snapshot – Quentlex Proofs";
  }, []);

  const handleGenerateSnapshot = async () => {
    if (selectedDocuments.length === 0) return;
    
    setIsGenerating(true);
    setExplainEntries([]);
    
    // Initialize steps  
    const initialSteps: ProgressStep[] = [
      { id: 'validate', label: 'Validating Lawyer Review', status: 'active' },
      { id: 'verify', label: 'Verifying Signatures', status: 'pending' },
      { id: 'hash', label: 'Generating Proof Hash', status: 'pending' },
      { id: 'expert', label: 'Attaching Expert Credentials', status: 'pending' },
      { id: 'finalize', label: 'Finalizing Expert Badge', status: 'pending' }
    ];
    setSteps(initialSteps);

    // Mock explanation entries
    const mockEntries: ExplainEntry[] = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        type: 'analysis',
        message: 'Validating lawyer review completion for selected documents...',
        confidence: 95
      },
      {
        id: '2', 
        timestamp: new Date(Date.now() + 1000).toISOString(),
        type: 'rule',
        message: 'Verifying digital signatures and review status',
        details: `Confirmed sign-off by ${assignedLawyer.name} (${assignedLawyer.license})`
      },
      {
        id: '3',
        timestamp: new Date(Date.now() + 2000).toISOString(), 
        type: 'analysis',
        message: 'Generating expert-verified proof with lawyer credentials',
        confidence: 98
      },
      {
        id: '4',
        timestamp: new Date(Date.now() + 3000).toISOString(),
        type: 'citation',
        message: 'Attaching lawyer jurisdiction and license verification',
        details: 'Expert credentials embedded in verifiable badge'
      }
    ];

    // Simulate streaming entries
    mockEntries.forEach((entry, index) => {
      setTimeout(() => {
        setExplainEntries(prev => [...prev, entry]);
      }, index * 900);
    });

    try {
      const simulator = new EnhancedProofSimulator();
      const mockInputs = selectedDocuments.map((docId, index) => ({
        id: docId,
        name: `Reviewed Document ${index + 1}`,
        type: 'document' as const,
        hash: `0x${Math.random().toString(16).slice(2, 10)}`,
        timestamp: new Date().toISOString()
      }));

      const { snapshot, steps: completedSteps } = await simulator.generateSnapshot(
        mockInputs,
        'expert',
        assignedLawyer
      );

      setSteps(completedSteps);
      setGeneratedSnapshot(snapshot);
    } catch (error) {
      console.error('Expert snapshot generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const hasReviewedDocs = selectedDocuments.some(doc => reviewedDocuments.includes(doc));
  const preconditionsMet = hasReviewedDocs && selectedDocuments.length > 0;

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
            <UserCheck className="w-7 h-7 text-primary" />
            <h1 className="text-3xl font-bold">Expert-Reviewed Snapshot</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Generate lawyer-signed compliance snapshots for investor-ready credibility. 
            Only available for documents that have completed Co-Review.
          </p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Input & Generation */}
            <div className="space-y-6">
              {/* Assigned Lawyer */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gavel className="w-5 h-5 text-primary" />
                    Reviewing Lawyer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <UserCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{assignedLawyer.name}</h4>
                      <p className="text-sm text-muted-foreground">{assignedLawyer.specialty}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{assignedLawyer.jurisdiction}</Badge>
                        <span className="text-xs text-muted-foreground">
                          License: {assignedLawyer.license}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preconditions Check */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Eligibility Check
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    {reviewedDocuments.length > 0 ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-warning" />
                    )}
                    <span className="text-sm">Documents Under Review</span>
                    <Badge variant="outline" className="status-success">
                      {reviewedDocuments.length} Ready
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {hasReviewedDocs ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-warning" />
                    )}
                    <span className="text-sm">Reviewed Documents Selected</span>
                  </div>

                  {!hasReviewedDocs && selectedDocuments.length > 0 && (
                    <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <p className="text-sm text-warning">
                        Selected documents haven't been reviewed yet. Send to Co-Review first.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => navigate('/co-review')}
                      >
                        Go to Co-Review
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Document Selection */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Select Reviewed Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <VaultPicker
                    trigger={
                      <Button variant="outline" className="w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        Choose from Reviewed Documents
                      </Button>
                    }
                    selected={selectedDocuments}
                    onSelectionChange={setSelectedDocuments}
                    title="Select Reviewed Documents"
                    description="Only documents with lawyer sign-off can be included"
                  />
                  
                  {selectedDocuments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          {selectedDocuments.length} document(s) selected
                        </p>
                      </div>
                      <div className="space-y-1">
                        {selectedDocuments.map((docId, index) => (
                          <div key={docId} className="flex items-center justify-between text-xs">
                            <span>Document {index + 1}</span>
                            {reviewedDocuments.includes(docId) ? (
                              <Badge variant="outline" className="status-success">Reviewed</Badge>
                            ) : (
                              <Badge variant="outline" className="status-warning">Pending</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Generate Button */}
              <Button 
                onClick={handleGenerateSnapshot}
                disabled={!preconditionsMet || isGenerating}
                className="w-full"
                size="lg"
              >
                <Shield className="w-4 h-4 mr-2" />
                {isGenerating ? 'Generating Expert Snapshot...' : 'Generate Expert-Reviewed Snapshot'}
              </Button>
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
                  title="Expert Snapshot Generation"
                />
              )}

              {/* Generated Snapshot */}
              {generatedSnapshot && (
                <SnapshotCard
                  snapshot={generatedSnapshot}
                  onShare={() => navigate('/proofs/share')}
                  onDownload={() => console.log('Download snapshot')}
                  onVerify={() => window.open(generatedSnapshot.verificationUrl, '_blank')}
                />
              )}

              {/* How It Works */}
              {!isGenerating && !generatedSnapshot && (
                <Card className="premium-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Expert-Reviewed Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      Expert-reviewed snapshots include lawyer credentials and digital signatures, 
                      providing the highest level of credibility for investors and exchanges.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full" />
                        <span>Lawyer digital signature verification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full" />
                        <span>Jurisdiction license validation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full" />
                        <span>Enhanced investor confidence</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success rounded-full" />
                        <span>Exchange-ready verification</span>
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