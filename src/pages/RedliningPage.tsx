// @modified - Enterprise-grade Redlining Agent with institutional-level precision
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
import { Textarea } from "@/components/ui/textarea";
import { PilotBadge } from "@/components/ui/pilot-badge";
import { WorkflowActions } from "@/components/ui/workflow-actions";
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
  Clock,
  ArrowRight,
  Copy,
  ExternalLink,
  Zap,
  Target,
  AlertCircle,
  Info
} from "lucide-react";
import { AgentSimulator } from "@/lib/simulation";
import type { Document, ExplainEntry } from "@/lib/types";

interface RedlineIssue {
  id: string;
  clause: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  issue: string;
  suggestion: string;
  reasoning: string;
  regulation: string;
  startPos: number;
  endPos: number;
  confidence: number;
}

interface RedlineResult {
  originalText: string;
  suggestedText: string;
  issues: RedlineIssue[];
  riskScore: number;
  summary: string;
  compliance: {
    jurisdiction: string;
    framework: string;
    score: number;
    gaps: string[];
  };
  metadata: {
    documentType: string;
    reviewedClauses: number;
    flaggedClauses: number;
    confidence: number;
  };
}

export default function RedliningPage() {
  const [selectedDocuments, setSelectedDocuments] = useState<Document[]>([]);
  const [jurisdiction, setJurisdiction] = useState<string>("");
  const [policySet, setPolicySet] = useState<string>("");
  const [contextNotes, setContextNotes] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [explainEntries, setExplainEntries] = useState<ExplainEntry[]>([]);
  const [result, setResult] = useState<RedlineResult | null>(null);
  const [activeTab, setActiveTab] = useState("comparison");
  const [activeIssue, setActiveIssue] = useState<string | null>(null);
  const [showVaultPicker, setShowVaultPicker] = useState(false);
  const [appliedSuggestions, setAppliedSuggestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    document.title = "Redlining Agent – Quentlex";
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

  const handleAnalyze = async () => {
    if (!selectedDocuments.length || !jurisdiction || !policySet) return;

    setIsAnalyzing(true);
    setIsAnalyzed(false);
    setCurrentStep(0);
    setExplainEntries([]);
    setAppliedSuggestions(new Set());

    try {
      // Enhanced simulation with detailed steps
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

      // Generate comprehensive institutional-grade result
      const mockResult: RedlineResult = {
        originalText: `WHEREAS, the Company desires to issue and sell certain tokens (the "Tokens") to investors for the purpose of funding operations and development;

NOW THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:

1. PURCHASE AND SALE. Subject to the terms and conditions of this Agreement, the Company agrees to issue and sell to the Investor, and the Investor agrees to purchase from the Company, Tokens for an aggregate purchase price of $100,000.

2. REPRESENTATIONS. The Company represents that it has the corporate power and authority to enter into this Agreement and issue the Tokens.

3. LOCK-UP PERIOD. The Investor agrees not to transfer the Tokens for a period of 12 months from the date of purchase.

4. GOVERNING LAW. This Agreement shall be governed by the laws of the jurisdiction of incorporation.`,
        
        suggestedText: `WHEREAS, the Company desires to issue and sell certain utility tokens (the "Tokens") to qualified investors for the purpose of funding operations and development, in compliance with applicable Virtual Asset Regulatory Authority ("VARA") regulations;

NOW THEREFORE, in consideration of the mutual covenants contained herein, the parties agree as follows:

1. PURCHASE AND SALE. Subject to the terms and conditions of this Agreement and applicable regulatory requirements, the Company agrees to issue and sell to the Investor, and the Investor agrees to purchase from the Company, Tokens for an aggregate purchase price of $100,000, contingent upon successful completion of Know Your Customer ("KYC") and Anti-Money Laundering ("AML") verification procedures.

2. REPRESENTATIONS AND WARRANTIES. The Company represents and warrants that: (a) it has the corporate power and authority to enter into this Agreement and issue the Tokens; (b) this Agreement has been duly authorized by all necessary corporate action; (c) the Token issuance complies with all applicable UAE laws and VARA regulations; and (d) the Tokens constitute utility tokens and not securities under applicable law.

3. LOCK-UP AND COMPLIANCE PERIOD. The Investor agrees not to transfer the Tokens for a period of 12 months from the date of purchase, except as specifically permitted under applicable securities laws and regulations or with prior written consent of the Company.

4. GOVERNING LAW AND JURISDICTION. This Agreement shall be governed by the laws of the United Arab Emirates, and any disputes shall be subject to the exclusive jurisdiction of the UAE courts and VARA regulatory framework.`,
        
        issues: [
          {
            id: 'issue_1',
            clause: 'Token Classification',
            severity: 'critical',
            issue: 'Ambiguous token classification creates securities law risk',
            suggestion: 'Explicitly classify as "utility tokens" with regulatory citation',
            reasoning: 'UAE VARA regulations require clear utility token classification to avoid securities treatment',
            regulation: 'VARA Virtual Asset Regulation Article 3.2',
            startPos: 45,
            endPos: 95,
            confidence: 92
          },
          {
            id: 'issue_2', 
            clause: 'KYC/AML Compliance',
            severity: 'high',
            issue: 'Missing mandatory KYC/AML verification requirements',
            suggestion: 'Include comprehensive KYC/AML verification process',
            reasoning: 'UAE AML Law requires customer verification for all token transactions',
            regulation: 'UAE AML Law No. 20 of 2018, Article 7',
            startPos: 200,
            endPos: 280,
            confidence: 95
          },
          {
            id: 'issue_3',
            clause: 'Corporate Representations',
            severity: 'high',
            issue: 'Insufficient corporate and regulatory compliance representations',
            suggestion: 'Expand to include VARA compliance and corporate authorization warranties',
            reasoning: 'Standard institutional practice requires comprehensive representations',
            regulation: 'UAE Commercial Companies Law Article 154',
            startPos: 350,
            endPos: 420,
            confidence: 88
          },
          {
            id: 'issue_4',
            clause: 'Transfer Restrictions',
            severity: 'medium',
            issue: 'Lock-up period lacks regulatory compliance exceptions',
            suggestion: 'Add exceptions for regulatory compliance and court orders',
            reasoning: 'Absolute transfer restrictions may conflict with regulatory requirements',
            regulation: 'VARA Compliance Rules Section 4.1',
            startPos: 450,
            endPos: 520,
            confidence: 85
          },
          {
            id: 'issue_5',
            clause: 'Governing Law',
            severity: 'medium',
            issue: 'Governing law clause too generic for token transactions',
            suggestion: 'Specify UAE law with explicit VARA jurisdiction',
            reasoning: 'Token transactions require specific regulatory framework reference',
            regulation: 'VARA Regulatory Framework Article 1.3',
            startPos: 550,
            endPos: 620,
            confidence: 90
          }
        ],
        riskScore: 68,
        summary: 'High-risk contract requiring immediate attention to regulatory compliance gaps.',
        compliance: {
          jurisdiction: jurisdiction.toUpperCase(),
          framework: policySet,
          score: 75,
          gaps: ['Token classification', 'KYC/AML procedures', 'Corporate warranties', 'Regulatory jurisdiction']
        },
        metadata: {
          documentType: 'Token Purchase Agreement',
          reviewedClauses: 12,
          flaggedClauses: 5,
          confidence: 89
        }
      };

      setResult(mockResult);
      setIsAnalyzed(true);
      setCurrentStep(4);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-100 dark:border-red-800';
      case 'high': return 'bg-orange-50 text-orange-900 border-orange-200 dark:bg-orange-950 dark:text-orange-100 dark:border-orange-800';
      case 'medium': return 'bg-yellow-50 text-yellow-900 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-100 dark:border-yellow-800';
      case 'low': return 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-800';
      default: return 'bg-muted';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertCircle className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Flag className="w-4 h-4" />;
      case 'low': return <Info className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const handleApplySuggestion = (issueId: string) => {
    setAppliedSuggestions(prev => new Set([...prev, issueId]));
  };

  const handleApplyAllSuggestions = () => {
    if (!result) return;
    setAppliedSuggestions(new Set(result.issues.map(issue => issue.id)));
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
            <PilotBadge className="text-xs" />
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
                  <Label>Regulatory Context</Label>
                  <div className="space-y-3 mt-2">
                    <Select value={jurisdiction} onValueChange={setJurisdiction}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select jurisdiction" />
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
                        <SelectItem value="us">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                            United States (SEC)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={policySet} onValueChange={setPolicySet}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select compliance framework" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vara">VARA Virtual Asset Regulations</SelectItem>
                        <SelectItem value="fca">FCA Crypto Asset Guidelines</SelectItem>
                        <SelectItem value="mifid">MiFID II & MiCA Framework</SelectItem>
                        <SelectItem value="sec">SEC Digital Asset Framework</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="context-notes">Additional Context (Optional)</Label>
                  <Textarea
                    id="context-notes"
                    placeholder="Special considerations, transaction context, or specific regulatory concerns..."
                    value={contextNotes}
                    onChange={(e) => setContextNotes(e.target.value)}
                    className="mt-2"
                    rows={3}
                  />
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
                {/* Executive Summary */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Executive Summary
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant={result.riskScore > 70 ? "destructive" : result.riskScore > 50 ? "default" : "secondary"}>
                          Risk: {result.riskScore}%
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {result.metadata.confidence}% Confidence
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-muted/50 rounded">
                        <div className="text-2xl font-bold">{result.metadata.reviewedClauses}</div>
                        <div className="text-xs text-muted-foreground">Clauses Reviewed</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded">
                        <div className="text-2xl font-bold text-orange-600">{result.metadata.flaggedClauses}</div>
                        <div className="text-xs text-muted-foreground">Issues Found</div>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded">
                        <div className="text-2xl font-bold text-blue-600">{result.compliance.score}%</div>
                        <div className="text-xs text-muted-foreground">Compliance Score</div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-3">{result.summary}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {result.compliance.gaps.map((gap, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {gap}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={handleApplyAllSuggestions} size="sm" className="flex-1">
                        <Zap className="w-4 h-4 mr-2" />
                        Apply All Redlines
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share className="w-4 h-4 mr-2" />
                        Send to Co-Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Issues */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Risk Analysis ({result.issues.length} Issues)
                      </CardTitle>
                      <Button size="sm" variant="outline" onClick={handleApplyAllSuggestions}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Apply All ({appliedSuggestions.size}/{result.issues.length})
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {result.issues.map((issue) => {
                        const isApplied = appliedSuggestions.has(issue.id);
                        return (
                          <div 
                            key={issue.id}
                            className={`p-4 rounded-lg border transition-all ${
                              isApplied 
                                ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' 
                                : getSeverityColor(issue.severity)
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                {isApplied ? (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                ) : (
                                  getSeverityIcon(issue.severity)
                                )}
                              </div>
                              <div className="flex-1 space-y-3">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-medium">{issue.clause}</span>
                                      <Badge 
                                        variant={isApplied ? "secondary" : "outline"} 
                                        className="text-xs"
                                      >
                                        {isApplied ? 'Applied' : issue.severity}
                                      </Badge>
                                      <Badge variant="outline" className="text-xs">
                                        {issue.confidence}% confidence
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{issue.issue}</p>
                                  </div>
                                  {!isApplied && (
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => handleApplySuggestion(issue.id)}
                                    >
                                      <ArrowRight className="w-3 h-3 mr-1" />
                                      Apply
                                    </Button>
                                  )}
                                </div>
                                
                                <div className="bg-background/50 p-3 rounded border">
                                  <div className="text-xs font-medium text-muted-foreground mb-1">SUGGESTED REDLINE</div>
                                  <p className="text-sm">{issue.suggestion}</p>
                                </div>
                                
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <ExternalLink className="w-3 h-3" />
                                    {issue.regulation}
                                  </div>
                                  <div>{issue.reasoning}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Side-by-Side Comparison */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Document Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="comparison">Side-by-Side</TabsTrigger>
                        <TabsTrigger value="original">Original</TabsTrigger>
                        <TabsTrigger value="suggested">Redlined</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="comparison" className="mt-4">
                        <div className="grid grid-cols-2 gap-4 h-80">
                          <div>
                            <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full" />
                              ORIGINAL
                            </div>
                            <ScrollArea className="h-full border rounded p-3">
                              <pre className="text-xs whitespace-pre-wrap leading-relaxed">{result.originalText}</pre>
                            </ScrollArea>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              REDLINED
                            </div>
                            <ScrollArea className="h-full border rounded p-3">
                              <pre className="text-xs whitespace-pre-wrap leading-relaxed">{result.suggestedText}</pre>
                            </ScrollArea>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="original" className="mt-4">
                        <ScrollArea className="h-80 w-full border rounded p-4">
                          <pre className="text-sm whitespace-pre-wrap leading-relaxed">{result.originalText}</pre>
                        </ScrollArea>
                      </TabsContent>
                      
                      <TabsContent value="suggested" className="mt-4">
                        <ScrollArea className="h-80 w-full border rounded p-4">
                          <pre className="text-sm whitespace-pre-wrap leading-relaxed">{result.suggestedText}</pre>
                        </ScrollArea>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Shield className="w-3 h-3" />
                        {appliedSuggestions.size} of {result.issues.length} suggestions applied
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Copy className="w-4 h-4 mr-2" />
                          Copy Redlined
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Export DOCX
                        </Button>
                        <Button size="sm">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Send to Co-Review
                        </Button>
                      </div>
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