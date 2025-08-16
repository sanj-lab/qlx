// Upload page for redline workflow - Clean, focused, no clutter
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SubnavTabs } from "@/components/ui/subnav-tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DragDropZone } from "@/components/ui/drag-drop-zone";
import { VaultPicker } from "@/components/ui/vault-picker";
import { ProgressStepper, type ProgressStep } from "@/components/ui/progress-stepper";
import { ExplainPanel } from "@/components/ui/explain-panel";
import { PilotBadge } from "@/components/ui/pilot-badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  FileText, Upload, Zap, Clock, Target, ArrowRight, 
  AlertTriangle, CheckCircle, Shield, Globe
} from "lucide-react";
import type { Document, ExplainEntry } from "@/lib/types";

interface RedlineAnalysisData {
  documents: Document[];
  jurisdiction: string;
  policySet: string;
  contextNotes: string;
}

function RedlineUploadPage() {
  const [selectedDocuments, setSelectedDocuments] = useState<Document[]>([]);
  const [jurisdiction, setJurisdiction] = useState<string>("");
  const [policySet, setPolicySet] = useState<string>("");
  const [contextNotes, setContextNotes] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [explainEntries, setExplainEntries] = useState<ExplainEntry[]>([]);
  const [showVaultPicker, setShowVaultPicker] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Redline Upload – Quentlex";
  }, []);

  const steps: ProgressStep[] = [
    { id: 'parse', label: 'Parse & Categorize', status: currentStep > 0 ? 'completed' : currentStep === 0 ? 'active' : 'pending' },
    { id: 'analyze', label: 'Regulatory Analysis', status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : 'pending' },
    { id: 'flag', label: 'Risk Identification', status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : 'pending' },
    { id: 'redline', label: 'Generate Redlines', status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'active' : 'pending' }
  ];

  const handleFileUpload = (files: File[]) => {
    const newDocs: Document[] = files.map(file => ({
      id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      type: 'pdf' as const,
      size: file.size,
      uploadedAt: new Date().toISOString(),
      hash: `hash_${Math.random().toString(36).substr(2, 16)}`,
      tags: ['contract', 'review'],
      folderId: 'contracts',
      isIndexed: false
    }));
    setSelectedDocuments([...selectedDocuments, ...newDocs]);
  };

  const handleVaultSelection = (documents: Document[]) => {
    setSelectedDocuments([...selectedDocuments, ...documents]);
    setShowVaultPicker(false);
  };

  const handleAnalyze = async () => {
    if (!selectedDocuments.length || !jurisdiction || !policySet) return;

    setIsAnalyzing(true);
    setCurrentStep(0);
    setExplainEntries([]);

    try {
      // Enhanced simulation with institutional-grade precision
      const simulationSteps = [
        {
          message: 'Parsing document structure and identifying key clauses...',
          details: `Processing ${selectedDocuments[0].name} - Detected contract type: Token Purchase Agreement`,
          type: 'analysis' as const
        },
        {
          message: `Analyzing against ${jurisdiction.toUpperCase()} regulatory framework...`,
          details: `Cross-referencing ${policySet} requirements and recent regulatory updates`,
          type: 'rule' as const
        },
        {
          message: 'Identifying compliance gaps and risk factors...',
          details: 'Scanning for securities law violations, AML requirements, and jurisdiction-specific issues',
          type: 'warning' as const
        },
        {
          message: 'Generating institutional-grade redline suggestions...',
          details: 'Creating precise language that satisfies regulatory requirements while preserving commercial intent',
          type: 'analysis' as const
        }
      ];

      for (let i = 0; i < simulationSteps.length; i++) {
        setCurrentStep(i);
        
        const entry: ExplainEntry = {
          id: `entry_${Date.now()}_${Math.random()}`,
          timestamp: new Date().toISOString(),
          type: simulationSteps[i].type,
          message: simulationSteps[i].message,
          details: simulationSteps[i].details,
          confidence: Math.floor(Math.random() * 15) + 85
        };
        setExplainEntries(prev => [...prev, entry]);
        
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      setCurrentStep(4);
      
      // Navigate to results page with analysis data
      const analysisData: RedlineAnalysisData = {
        documents: selectedDocuments,
        jurisdiction,
        policySet,
        contextNotes
      };
      
      // Store analysis data and navigate
      sessionStorage.setItem('redlineAnalysisData', JSON.stringify(analysisData));
      navigate('/launch-path/redline/results');
      
    } catch (error) {
      console.error('Analysis failed:', error);
      setIsAnalyzing(false);
    }
  };

  const canAnalyze = selectedDocuments.length > 0 && jurisdiction && policySet;

  return (
    <main className="min-h-screen bg-background">
      {/* SubNav */}
      <section className="py-4 px-6 border-b bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <SubnavTabs />
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-8 px-6 border-b">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Review & Redline</h1>
              <p className="text-muted-foreground">Upload contracts for institutional-grade AI analysis</p>
            </div>
            <PilotBadge className="text-xs" />
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Input Section */}
          <div className="space-y-6">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  Document Upload
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium">Contract Documents</Label>
                  <DragDropZone
                    onFilesChange={handleFileUpload}
                    className="mt-2"
                    acceptedFileTypes={['.pdf', '.doc', '.docx', '.txt']}
                  />
                  {selectedDocuments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {selectedDocuments.map((doc) => (
                        <div key={doc.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <div className="flex-1">
                            <span className="text-sm font-medium">{doc.name}</span>
                            <div className="text-xs text-muted-foreground">
                              {(doc.size / 1024).toFixed(1)} KB
                            </div>
                          </div>
                          <CheckCircle className="w-4 h-4 text-success" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button 
                  variant="outline" 
                  onClick={() => setShowVaultPicker(true)}
                  className="w-full"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Import from Legal Vault
                </Button>
              </CardContent>
            </Card>

            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Regulatory Context
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Jurisdiction</Label>
                  <Select value={jurisdiction} onValueChange={setJurisdiction}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select primary jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="uae">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          UAE (VARA)
                        </div>
                      </SelectItem>
                      <SelectItem value="uk">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          United Kingdom (FCA)
                        </div>
                      </SelectItem>
                      <SelectItem value="eu">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full" />
                          European Union (MiCA)
                        </div>
                      </SelectItem>
                      <SelectItem value="singapore">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full" />
                          Singapore (MAS)
                        </div>
                      </SelectItem>
                      <SelectItem value="us">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                          United States (SEC)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Compliance Framework</Label>
                  <Select value={policySet} onValueChange={setPolicySet}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select compliance framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="token-issuance">Token Issuance & Sale</SelectItem>
                      <SelectItem value="exchange-operations">Exchange Operations</SelectItem>
                      <SelectItem value="custody-services">Custody Services</SelectItem>
                      <SelectItem value="payment-services">Payment Services</SelectItem>
                      <SelectItem value="lending-borrowing">Lending & Borrowing</SelectItem>
                      <SelectItem value="dao-governance">DAO Governance</SelectItem>
                      <SelectItem value="general-compliance">General Compliance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium">Additional Context (Optional)</Label>
                  <Textarea
                    value={contextNotes}
                    onChange={(e) => setContextNotes(e.target.value)}
                    placeholder="Any specific concerns, business context, or focus areas for the review..."
                    className="mt-2"
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={handleAnalyze}
                  disabled={!canAnalyze || isAnalyzing}
                  className="w-full"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Start Analysis
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right: Analysis Progress */}
          <div className="space-y-6">
            {isAnalyzing ? (
              <>
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Analysis Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ProgressStepper steps={steps} />
                  </CardContent>
                </Card>

                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="text-sm">Real-time Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ExplainPanel entries={explainEntries} />
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="enterprise-card border-2 border-dashed border-primary/20">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Ready for Analysis</h3>
                  <p className="text-muted-foreground mb-6">
                    Upload documents and configure regulatory context to start institutional-grade contract analysis.
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className={`w-4 h-4 ${selectedDocuments.length > 0 ? 'text-success' : 'text-muted-foreground'}`} />
                      Documents ({selectedDocuments.length > 0 ? 'Ready' : 'Required'})
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className={`w-4 h-4 ${jurisdiction ? 'text-success' : 'text-muted-foreground'}`} />
                      Jurisdiction ({jurisdiction ? 'Selected' : 'Required'})
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className={`w-4 h-4 ${policySet ? 'text-success' : 'text-muted-foreground'}`} />
                      Framework ({policySet ? 'Selected' : 'Required'})
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Vault Picker Dialog */}
      <Dialog open={showVaultPicker} onOpenChange={setShowVaultPicker}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Import from Legal Vault</DialogTitle>
          </DialogHeader>
          <div className="p-4 text-center">
            <p className="text-muted-foreground">Legal Vault integration coming soon.</p>
            <Button onClick={() => setShowVaultPicker(false)} className="mt-4">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

export default RedlineUploadPage;