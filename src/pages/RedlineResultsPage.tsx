// Results page for redline workflow - Juro-style enterprise interface
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SubnavTabs } from "@/components/ui/subnav-tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { PilotBadge } from "@/components/ui/pilot-badge";
import { WorkflowActions } from "@/components/ui/workflow-actions";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, AlertTriangle, CheckCircle, Download, Share, Eye,
  Flag, MessageSquare, Shield, Clock, ArrowRight, Copy,
  ExternalLink, Zap, Target, AlertCircle, Info, ChevronDown,
  ChevronUp, Brain, Users, Building, Globe, CheckCircle2,
  X, Edit3, RotateCcw
} from "lucide-react";
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
  explainEntries: ExplainEntry[];
}

export default function RedlineResultsPage() {
  const [result, setResult] = useState<RedlineResult | null>(null);
  const [activeTab, setActiveTab] = useState("comparison");
  const [activeIssue, setActiveIssue] = useState<string | null>(null);
  const [appliedSuggestions, setAppliedSuggestions] = useState<Set<string>>(new Set());
  const [showAgenticReasoning, setShowAgenticReasoning] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Redline Results – Quentlex";
    
    // Load analysis data from session storage
    const analysisDataString = sessionStorage.getItem('redlineAnalysisData');
    if (!analysisDataString) {
      // Redirect back to upload if no data
      navigate('/launch-path/redline');
      return;
    }

    // Generate mock result based on analysis data
    generateMockResult();
  }, [navigate]);

  const generateMockResult = () => {
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
        jurisdiction: 'UAE',
        framework: 'Token Issuance & Sale',
        score: 75,
        gaps: ['Token classification', 'KYC/AML procedures', 'Corporate warranties', 'Regulatory jurisdiction']
      },
      metadata: {
        documentType: 'Token Purchase Agreement',
        reviewedClauses: 12,
        flaggedClauses: 5,
        confidence: 89
      },
      explainEntries: [
        {
          id: 'explain_1',
          timestamp: new Date().toISOString(),
          type: 'analysis',
          message: 'Analyzing token classification language',
          details: 'Cross-referencing VARA utility token requirements vs securities definitions',
          confidence: 92
        },
        {
          id: 'explain_2',
          timestamp: new Date().toISOString(),
          type: 'rule',
          message: 'Identifying KYC/AML compliance gaps',
          details: 'UAE AML Law mandates customer verification for all token transactions above threshold',
          confidence: 95
        },
        {
          id: 'explain_3',
          timestamp: new Date().toISOString(),
          type: 'warning',
          message: 'Flagging insufficient corporate representations',
          details: 'Standard institutional practice requires comprehensive regulatory compliance warranties',
          confidence: 88
        }
      ]
    };

    setResult(mockResult);
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

  const handleRejectSuggestion = (issueId: string) => {
    setAppliedSuggestions(prev => {
      const newSet = new Set(prev);
      newSet.delete(issueId);
      return newSet;
    });
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString().trim());
      setShowCommentDialog(true);
    }
  };

  const handleAddComment = () => {
    // In a real implementation, this would save the comment
    console.log('Adding comment:', comment, 'for text:', selectedText);
    setComment("");
    setSelectedText("");
    setShowCommentDialog(false);
  };

  if (!result) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Clock className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading analysis results...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* SubNav */}
      <section className="py-4 px-6 border-b bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <SubnavTabs />
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-6 px-6 border-b bg-gradient-to-r from-background to-muted/20">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/launch-path/redline')}
                  className="p-1"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </Button>
                <h1 className="text-2xl font-bold">Redline Analysis Results</h1>
                <Badge variant={result.riskScore > 70 ? "destructive" : result.riskScore > 40 ? "secondary" : "default"}>
                  Risk Score: {result.riskScore}%
                </Badge>
              </div>
              <p className="text-muted-foreground">{result.metadata.documentType} • {result.compliance.jurisdiction} • {result.metadata.flaggedClauses} issues found</p>
            </div>
            <div className="flex items-center gap-3">
              <PilotBadge className="text-xs" />
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl p-6">
        {/* Executive Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="enterprise-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <div>
                  <p className="text-sm text-muted-foreground">Critical Issues</p>
                  <p className="text-xl font-bold">{result.issues.filter(i => i.severity === 'critical').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="enterprise-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Flag className="w-5 h-5 text-warning" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Issues</p>
                  <p className="text-xl font-bold">{result.issues.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="enterprise-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Compliance Score</p>
                  <p className="text-xl font-bold">{result.compliance.score}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="enterprise-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-success" />
                <div>
                  <p className="text-sm text-muted-foreground">AI Confidence</p>
                  <p className="text-xl font-bold">{result.metadata.confidence}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Document Viewer */}
          <div className="lg:col-span-2">
            <Card className="enterprise-card h-fit">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Document Review</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleApplyAllSuggestions}
                      disabled={appliedSuggestions.size === result.issues.length}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Apply All Redlines
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="comparison">Side-by-Side</TabsTrigger>
                    <TabsTrigger value="original">Original</TabsTrigger>
                    <TabsTrigger value="suggested">Redlined</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="comparison" className="mt-4">
                    <div className="grid grid-cols-2 gap-4 h-96">
                      <div className="border rounded-lg">
                        <div className="bg-muted/50 px-3 py-2 border-b">
                          <span className="text-xs font-medium text-muted-foreground">ORIGINAL</span>
                        </div>
                        <ScrollArea className="h-80 p-4">
                          <div 
                            className="text-sm leading-relaxed whitespace-pre-wrap cursor-text"
                            onMouseUp={handleTextSelection}
                          >
                            {result.originalText}
                          </div>
                        </ScrollArea>
                      </div>
                      <div className="border rounded-lg">
                        <div className="bg-primary/10 px-3 py-2 border-b">
                          <span className="text-xs font-medium text-primary">REDLINED</span>
                        </div>
                        <ScrollArea className="h-80 p-4">
                          <div 
                            className="text-sm leading-relaxed whitespace-pre-wrap cursor-text"
                            onMouseUp={handleTextSelection}
                          >
                            {result.suggestedText}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="original" className="mt-4">
                    <div className="border rounded-lg h-96">
                      <div className="bg-muted/50 px-3 py-2 border-b">
                        <span className="text-xs font-medium text-muted-foreground">ORIGINAL DOCUMENT</span>
                      </div>
                      <ScrollArea className="h-80 p-4">
                        <div 
                          className="text-sm leading-relaxed whitespace-pre-wrap cursor-text"
                          onMouseUp={handleTextSelection}
                        >
                          {result.originalText}
                        </div>
                      </ScrollArea>
                    </div>
                  </TabsContent>

                  <TabsContent value="suggested" className="mt-4">
                    <div className="border rounded-lg h-96">
                      <div className="bg-primary/10 px-3 py-2 border-b flex items-center justify-between">
                        <span className="text-xs font-medium text-primary">AI REDLINED VERSION</span>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-3 h-3 mr-1" />
                          Copy Redlined
                        </Button>
                      </div>
                      <ScrollArea className="h-80 p-4">
                        <div 
                          className="text-sm leading-relaxed whitespace-pre-wrap cursor-text"
                          onMouseUp={handleTextSelection}
                        >
                          {result.suggestedText}
                        </div>
                      </ScrollArea>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Issues Panel */}
          <div className="space-y-6">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="text-lg">Compliance Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {result.issues.map((issue) => (
                      <div 
                        key={issue.id} 
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${getSeverityColor(issue.severity)} ${
                          activeIssue === issue.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setActiveIssue(activeIssue === issue.id ? null : issue.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {getSeverityIcon(issue.severity)}
                              <span className="font-medium text-sm">{issue.clause}</span>
                              <Badge variant="outline" className="text-xs">
                                {issue.severity}
                              </Badge>
                            </div>
                            <p className="text-xs mb-2">{issue.issue}</p>
                            
                            {activeIssue === issue.id && (
                              <div className="mt-3 space-y-3">
                                <div>
                                  <span className="text-xs font-medium text-muted-foreground">SUGGESTION</span>
                                  <p className="text-xs mt-1">{issue.suggestion}</p>
                                </div>
                                <div>
                                  <span className="text-xs font-medium text-muted-foreground">REGULATION</span>
                                  <p className="text-xs mt-1">{issue.regulation}</p>
                                </div>
                                <div className="flex gap-2">
                                  {appliedSuggestions.has(issue.id) ? (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleRejectSuggestion(issue.id);
                                      }}
                                    >
                                      <X className="w-3 h-3 mr-1" />
                                      Reject
                                    </Button>
                                  ) : (
                                    <Button
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleApplySuggestion(issue.id);
                                      }}
                                    >
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Apply
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <MessageSquare className="w-3 h-3 mr-1" />
                                    Comment
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {issue.confidence}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Workflow Actions */}
            <WorkflowActions
              showSaveToVault={true}
              showCoReview={true}
              showZKBadge={true}
              onSaveToVault={() => console.log('Save to vault')}
            />
          </div>
        </div>

        {/* Agentic Reasoning Toggle */}
        <div className="mt-8">
          <Collapsible open={showAgenticReasoning} onOpenChange={setShowAgenticReasoning}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Agentic Reasoning & Analysis Process
                </div>
                {showAgenticReasoning ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    AI Analysis Process
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {result.explainEntries.map((entry, index) => (
                      <div key={entry.id} className="flex gap-3 p-3 rounded-lg bg-muted/30">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm mb-1">{entry.message}</p>
                          <p className="text-xs text-muted-foreground mb-2">{entry.details}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {entry.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {entry.confidence}% confidence
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      {/* Comment Dialog */}
      <Dialog open={showCommentDialog} onOpenChange={setShowCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Comment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium">Selected text:</span>
              <p className="text-sm bg-muted/50 p-2 rounded mt-1 italic">"{selectedText}"</p>
            </div>
            <div>
              <span className="text-sm font-medium">Your comment:</span>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add your comment or suggestion..."
                className="mt-1"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCommentDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddComment} disabled={!comment.trim()}>
                Add Comment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}