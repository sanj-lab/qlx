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
  Zap, 
  AlertCircle, 
  CheckCircle, 
  ArrowLeft,
  FileText 
} from "lucide-react";
import type { ProgressStep } from "@/components/ui/progress-stepper";

export default function SelfSnapshotPage() {
  const navigate = useNavigate();
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<ProgressStep[]>([]);
  const [explainEntries, setExplainEntries] = useState<ExplainEntry[]>([]);
  const [generatedSnapshot, setGeneratedSnapshot] = useState<any>(null);
  const [hasPostIncorpAnalysis] = useState(true); // Mock - would check real completion
  
  useEffect(() => {
    document.title = "Self-Reviewed Snapshot – Quentlex Proofs";
  }, []);

  const handleGenerateSnapshot = async () => {
    if (selectedDocuments.length === 0) return;
    
    setIsGenerating(true);
    setExplainEntries([]);
    
    // Initialize steps
    const initialSteps: ProgressStep[] = [
      { id: 'validate', label: 'Validating Inputs', status: 'active' },
      { id: 'hash', label: 'Generating Hashes', status: 'pending' },
      { id: 'compute', label: 'Computing ZK Proof', status: 'pending' },
      { id: 'render', label: 'Rendering Badge', status: 'pending' },
      { id: 'finalize', label: 'Finalizing Snapshot', status: 'pending' }
    ];
    setSteps(initialSteps);

    // Mock explanation entries
    const mockEntries: ExplainEntry[] = [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        type: 'analysis',
        message: 'Starting validation of selected documents...',
        confidence: 95
      },
      {
        id: '2', 
        timestamp: new Date(Date.now() + 1000).toISOString(),
        type: 'rule',
        message: 'Verifying document integrity and completeness',
        details: 'Checking for required compliance documents and valid hashes'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() + 2000).toISOString(), 
        type: 'analysis',
        message: 'Generating deterministic proof hash from inputs',
        confidence: 98
      },
      {
        id: '4',
        timestamp: new Date(Date.now() + 3000).toISOString(),
        type: 'citation',
        message: 'Simulating ZK proof computation in TEE environment',
        details: 'Using simulated Zero-Knowledge proof generation for pilot'
      }
    ];

    // Simulate streaming entries
    mockEntries.forEach((entry, index) => {
      setTimeout(() => {
        setExplainEntries(prev => [...prev, entry]);
      }, index * 800);
    });

    try {
      const simulator = new EnhancedProofSimulator();
      const mockInputs = selectedDocuments.map((docId, index) => ({
        id: docId,
        name: `Document ${index + 1}`,
        type: 'document' as const,
        hash: `0x${Math.random().toString(16).slice(2, 10)}`,
        timestamp: new Date().toISOString()
      }));

      const { snapshot, steps: completedSteps } = await simulator.generateSnapshot(
        mockInputs,
        'self'
      );

      setSteps(completedSteps);
      setGeneratedSnapshot(snapshot);
    } catch (error) {
      console.error('Snapshot generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const preconditionsMet = hasPostIncorpAnalysis && selectedDocuments.length > 0;

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
            <Zap className="w-7 h-7 text-primary" />
            <h1 className="text-3xl font-bold">Self-Reviewed Snapshot</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Generate an AI-completed compliance snapshot from your vault documents. 
            Perfect for internal use and early investor conversations.
          </p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Input & Generation */}
            <div className="space-y-6">
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
                    {hasPostIncorpAnalysis ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-warning" />
                    )}
                    <span className="text-sm">Post-Incorporation Analysis Complete</span>
                    {hasPostIncorpAnalysis && (
                      <Badge variant="outline" className="status-success">
                        Ready
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {selectedDocuments.length > 0 ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-warning" />
                    )}
                    <span className="text-sm">Documents Selected ({selectedDocuments.length})</span>
                  </div>

                  {!hasPostIncorpAnalysis && (
                    <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                      <p className="text-sm text-warning">
                        Complete your Post-Incorporation Analysis in Launch Path first.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => navigate('/launch-path/post-incorp')}
                      >
                        Go to Launch Path
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
                    Select Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <VaultPicker
                    trigger={
                      <Button variant="outline" className="w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        Choose from Legal Vault
                      </Button>
                    }
                    selected={selectedDocuments}
                    onSelectionChange={setSelectedDocuments}
                    title="Select Documents for Snapshot"
                    description="Choose compliance documents to include in your snapshot"
                  />
                  
                  {selectedDocuments.length > 0 && (
                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        {selectedDocuments.length} document(s) selected
                      </p>
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
                {isGenerating ? 'Generating Snapshot...' : 'Generate Self-Reviewed Snapshot'}
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
                  title="ZK Snapshot Generation"
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
                    <CardTitle className="text-lg">How It Works</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      Self-reviewed snapshots use AI analysis to create verifiable compliance 
                      summaries without exposing sensitive document details.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>Documents are hashed for integrity</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>ZK proof generated (simulated for pilot)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span>Verifiable badge created with unique ID</span>
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