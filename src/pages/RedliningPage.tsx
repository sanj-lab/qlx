// @modified - Redlining Agent page with shared subnav
import { useState, useEffect } from "react";
import { SubnavTabs } from "@/components/ui/subnav-tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DragDropZone } from "@/components/ui/drag-drop-zone";
import { VaultPicker } from "@/components/ui/vault-picker";
import { ProgressStepper, type ProgressStep } from "@/components/ui/progress-stepper";
import { ExplainPanel } from "@/components/ui/explain-panel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Download, 
  Share, 
  Eye,
  Flag,
  MessageSquare,
  Shield,
  Clock
} from "lucide-react";
import { AgentSimulator } from "@/lib/simulation";
import type { Document, ExplainEntry } from "@/lib/types";

interface RedlineIssue {
  id: string;
  clause: string;
  severity: 'high' | 'medium' | 'low';
  issue: string;
  suggestion: string;
  reasoning: string;
  startPos: number;
  endPos: number;
}

interface RedlineResult {
  originalText: string;
  suggestedText: string;
  issues: RedlineIssue[];
  riskScore: number;
  summary: string;
}

export default function RedliningPage() {
  const [selectedDocuments, setSelectedDocuments] = useState<Document[]>([]);
  const [jurisdiction, setJurisdiction] = useState<string>("");
  const [policySet, setPolicySet] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [explainEntries, setExplainEntries] = useState<ExplainEntry[]>([]);
  const [result, setResult] = useState<RedlineResult | null>(null);
  const [activeTab, setActiveTab] = useState("original");
  const [showVaultPicker, setShowVaultPicker] = useState(false);

  useEffect(() => {
    document.title = "Redlining Agent – Quentlex";
  }, []);

  const steps: ProgressStep[] = [
    { id: 'parse', label: 'Parse Documents', status: currentStep > 0 ? 'completed' : currentStep === 0 ? 'active' : 'pending' },
    { id: 'flag', label: 'Flag Risks', status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : 'pending' },
    { id: 'suggest', label: 'Suggest Clauses', status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : 'pending' },
    { id: 'redline', label: 'Draft Redlines', status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'active' : 'pending' }
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

  const handleAnalyze = async () => {
    if (!selectedDocuments.length || !jurisdiction || !policySet) return;

    setIsAnalyzing(true);
    setIsAnalyzed(false);
    setCurrentStep(0);
    setExplainEntries([]);

    try {
      // Simulate the redlining analysis
      for await (const update of AgentSimulator.analyzeContract(selectedDocuments[0])) {
        setCurrentStep(update.step);
        
        if (update.explanation) {
          const entry: ExplainEntry = {
            id: `entry_${Date.now()}_${Math.random()}`,
            timestamp: new Date().toISOString(),
            type: update.step === 1 ? 'rule' : update.step === 2 ? 'warning' : 'analysis',
            message: update.explanation,
            confidence: Math.floor(Math.random() * 20) + 80
          };
          setExplainEntries(prev => [...prev, entry]);
        }
      }

      // Generate mock redline result
      const mockResult: RedlineResult = {
        originalText: `WHEREAS, the Company desires to issue and sell certain tokens (the "Tokens") to investors;

NOW THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:

1. PURCHASE AND SALE. Subject to the terms and conditions of this Agreement, the Company agrees to issue and sell to the Investor, and the Investor agrees to purchase from the Company, Tokens for an aggregate purchase price of $100,000.

2. REPRESENTATIONS. The Company represents that it has the corporate power and authority to enter into this Agreement.

3. LOCK-UP PERIOD. The Investor agrees not to transfer the Tokens for a period of 12 months from the date of purchase.`,
        
        suggestedText: `WHEREAS, the Company desires to issue and sell certain utility tokens (the "Tokens") to qualified investors in compliance with applicable securities laws;

NOW THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:

1. PURCHASE AND SALE. Subject to the terms and conditions of this Agreement and applicable regulatory requirements, the Company agrees to issue and sell to the Investor, and the Investor agrees to purchase from the Company, Tokens for an aggregate purchase price of $100,000, subject to KYC/AML verification.

2. REPRESENTATIONS AND WARRANTIES. The Company represents and warrants that: (a) it has the corporate power and authority to enter into this Agreement; (b) this Agreement has been duly authorized; and (c) the Token issuance complies with applicable securities regulations.

3. LOCK-UP AND COMPLIANCE PERIOD. The Investor agrees not to transfer the Tokens for a period of 12 months from the date of purchase, except as permitted under applicable securities laws and regulations.`,
        
        issues: [
          {
            id: 'issue_1',
            clause: 'Token Classification',
            severity: 'high',
            issue: 'Tokens not clearly classified as utility tokens',
            suggestion: 'Specify "utility tokens" to reduce securities classification risk',
            reasoning: 'Under UAE VARA regulations, unclear token classification creates regulatory uncertainty',
            startPos: 45,
            endPos: 95
          },
          {
            id: 'issue_2',
            clause: 'Investor Qualification',
            severity: 'medium',
            issue: 'No investor qualification requirements',
            suggestion: 'Add "qualified investors" and KYC/AML requirements',
            reasoning: 'Most jurisdictions require investor verification for token sales',
            startPos: 120,
            endPos: 180
          },
          {
            id: 'issue_3',
            clause: 'Representations',
            severity: 'medium',
            issue: 'Insufficient company representations',
            suggestion: 'Expand to include regulatory compliance warranties',
            reasoning: 'Standard practice requires broader representations for token issuances',
            startPos: 350,
            endPos: 420
          }
        ],
        riskScore: 73,
        summary: 'Medium-risk contract with 3 key areas requiring attention for regulatory compliance.'
      };

      setResult(mockResult);
      setIsAnalyzed(true);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Flag className="w-4 h-4" />;
      case 'low': return <CheckCircle className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* SubNav */}
      <section className="py-4 px-6 border-b bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <SubnavTabs />
        </div>
      </section>

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="py-8 px-6 border-b">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Review & Redline</h1>
              <p className="text-muted-foreground">AI + Legal precision, side-by-side</p>
            </div>
            <Badge variant="outline" className="text-xs">
              <Shield className="w-3 h-3 mr-1" />
              Simulated for pilot
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document Input</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Upload Documents</Label>
                  <DragDropZone
                    onFilesChange={handleFileUpload}
                    className="mt-2"
                  />
                  {selectedDocuments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {selectedDocuments.map((doc) => (
                        <div key={doc.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded">
                          <FileText className="w-4 h-4" />
                          <span className="text-sm flex-1">{doc.name}</span>
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
                  Or Pick from Vault
                </Button>

                <Separator />

                <div>
                  <Label>Context Selection</Label>
                  <div className="space-y-3 mt-2">
                    <Select value={jurisdiction} onValueChange={setJurisdiction}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select jurisdiction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uae">UAE</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="eu">European Union</SelectItem>
                        <SelectItem value="us">United States</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={policySet} onValueChange={setPolicySet}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select policy set" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vara">VARA Compliance</SelectItem>
                        <SelectItem value="fca">FCA Guidelines</SelectItem>
                        <SelectItem value="mifid">MiFID II</SelectItem>
                        <SelectItem value="sec">SEC Requirements</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={handleAnalyze}
                  disabled={!selectedDocuments.length || !jurisdiction || !policySet || isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Documents'
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Progress Stepper */}
            {(isAnalyzing || isAnalyzed) && (
              <ProgressStepper 
                steps={steps} 
                className="sticky top-6"
              />
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {!isAnalyzing && !isAnalyzed && (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Upload documents and select context to begin analysis</p>
                </div>
              </Card>
            )}

            {/* Analysis Results */}
            {isAnalyzed && result && (
              <div className="space-y-6">
                {/* Risk Summary */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Analysis Summary</CardTitle>
                      <Badge variant={result.riskScore > 80 ? "destructive" : result.riskScore > 60 ? "default" : "secondary"}>
                        Risk Score: {result.riskScore}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{result.summary}</p>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="w-4 h-4 mr-2" />
                        Send to Co-Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Issues List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Identified Issues ({result.issues.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {result.issues.map((issue) => (
                        <div 
                          key={issue.id}
                          className={`p-3 rounded-lg border ${getSeverityColor(issue.severity)}`}
                        >
                          <div className="flex items-start gap-3">
                            {getSeverityIcon(issue.severity)}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{issue.clause}</span>
                                <Badge variant="outline" className="text-xs">
                                  {issue.severity}
                                </Badge>
                              </div>
                              <p className="text-sm text-foreground/80 mb-2">{issue.issue}</p>
                              <p className="text-xs text-foreground/60">{issue.reasoning}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Document Comparison */}
                <Card>
                  <CardHeader>
                    <CardTitle>Document Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="original">Original</TabsTrigger>
                        <TabsTrigger value="suggested">Suggested</TabsTrigger>
                      </TabsList>
                      <TabsContent value="original" className="mt-4">
                        <ScrollArea className="h-64 w-full border rounded p-4">
                          <pre className="text-sm whitespace-pre-wrap">{result.originalText}</pre>
                        </ScrollArea>
                      </TabsContent>
                      <TabsContent value="suggested" className="mt-4">
                        <ScrollArea className="h-64 w-full border rounded p-4">
                          <pre className="text-sm whitespace-pre-wrap">{result.suggestedText}</pre>
                        </ScrollArea>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="flex gap-2 mt-4">
                      <Button size="sm">Apply Suggestions</Button>
                      <Button size="sm" variant="outline">Export DOCX</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* ExplainPanel */}
        {(isAnalyzing || explainEntries.length > 0) && (
          <div className="mt-6">
            <ExplainPanel
              title="AI Analysis Feed"
              entries={explainEntries}
              isActive={isAnalyzing}
            />
          </div>
        )}

        {/* Vault Picker Modal */}
        <Dialog open={showVaultPicker} onOpenChange={setShowVaultPicker}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Select Documents from Vault</DialogTitle>
            </DialogHeader>
            <VaultPicker
              trigger={<div />}
              selected={selectedDocuments.map(d => d.id)}
              onSelectionChange={(selectedIds) => {
                // Convert selectedIds back to documents - simplified for demo
                const docs = selectedIds.map(id => ({
                  id,
                  name: `Document ${id}`,
                  type: 'pdf' as const,
                  size: 1024,
                  uploadedAt: new Date().toISOString(),
                  hash: `hash_${id}`,
                  tags: ['contract'],
                  folderId: 'contracts',
                  isIndexed: false
                }));
                setSelectedDocuments(docs);
              }}
              maxSelection={5}
            />
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}