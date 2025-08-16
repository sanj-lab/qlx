import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { DragDropZone } from "@/components/ui/drag-drop-zone";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Handshake, 
  Upload, 
  AlertTriangle, 
  TrendingUp, 
  ChevronRight, 
  Clock,
  CheckCircle2,
  Target,
  Users,
  Zap,
  Shield,
  Copy,
  Download,
  Calendar,
  Share2,
  FileText,
  Video,
  Mail,
  Phone
} from "lucide-react";

export default function NegotiationAgentPage() {
  const [termSheet, setTermSheet] = useState<File | null>(null);
  const [counterpartyType, setCounterpartyType] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [showCounterProposal, setShowCounterProposal] = useState(false);
  const [counterProposalContent, setCounterProposalContent] = useState("");
  const [showScheduleCallModal, setShowScheduleCallModal] = useState(false);
  const [showShareTeamModal, setShowShareTeamModal] = useState(false);
  const [showExportAnalysisModal, setShowExportAnalysisModal] = useState(false);

  const counterpartyTypes = [
    { value: "vc", label: "Venture Capital Fund", risk: "Medium" },
    { value: "strategic", label: "Strategic Investor", risk: "Low" },
    { value: "angel", label: "Angel Investor", risk: "Low" },
    { value: "institution", label: "Institutional Investor", risk: "High" },
    { value: "crypto-fund", label: "Crypto Fund", risk: "Medium" }
  ];

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate AI analysis
    const steps = [
      "Parsing term sheet clauses...",
      "Analyzing counterparty profile...",
      "Calculating risk scenarios...",
      "Generating strategy recommendations...",
      "Simulating negotiation outcomes..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress((i + 1) * 20);
    }
    
    setIsAnalyzing(false);
    setIsAnalyzed(true);
  };

  const generateCounterProposal = () => {
    const counterProposalText = `COUNTER-PROPOSAL - TERM SHEET REVISION

Based on our analysis of the current term sheet and market standards, we propose the following revisions:

VALUATION & EQUITY:
• Pre-money valuation: $10.5M (up from $8.5M)
• Series A preferred shares: 19% (down from 25%)
• Employee option pool: 15% (maintained)

ANTI-DILUTION PROTECTION:
• REVISED: Narrow-based weighted average (current: full ratchet)
• Participation cap: 1x non-participating preferred
• Pay-to-play provisions: Standard carve-outs for smaller investors

BOARD COMPOSITION:
• 5-person board: 2 founders, 1 investor, 2 independent
• Founder maintains board control and decision-making authority
• Investor gets customary board rights and information access

LIQUIDITY RIGHTS:
• Tag-along rights: Standard provisions
• Drag-along threshold: 75% (up from 50%)
• No forced sale provisions for first 3 years

PROTECTIVE PROVISIONS:
• Budget approval threshold: >$500K (up from >$100K)
• Board approval required for: major strategic decisions, hiring C-level
• Removed: approval for ordinary business decisions under $250K

FOUNDER PROTECTIONS:
• Single-trigger acceleration: 50% of unvested shares
• Double-trigger acceleration: 100% for involuntary termination post-acquisition
• 4-year vesting with 1-year cliff maintained

TIMELINE:
• 45-day exclusivity period
• Due diligence completion: 30 days
• Legal documentation: 15 days post-DD completion

This counter-proposal addresses the key risk factors identified in our analysis while maintaining favorable terms for company growth and founder control.`;

    setCounterProposalContent(counterProposalText);
    setShowCounterProposal(true);
  };

  const selectedCounterparty = counterpartyTypes.find(cp => cp.value === counterpartyType);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Negotiation Agent</h1>
          <p className="text-muted-foreground">Enterprise-grade term sheet analysis with AI-powered counter-proposals and deal strategy</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Configuration */}
          <div className="lg:col-span-1">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Document Upload
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Term Sheet</label>
                  <DragDropZone
                    onFilesChange={(files) => setTermSheet(files[0])}
                    acceptedFileTypes={['.pdf', '.docx']}
                    maxFiles={1}
                    className="min-h-[120px]"
                  />
                  {termSheet && (
                    <div className="mt-2 p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{termSheet.name}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Investor Type</label>
                  <Select value={counterpartyType} onValueChange={setCounterpartyType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select investor category" />
                    </SelectTrigger>
                    <SelectContent>
                      {counterpartyTypes.map(cp => (
                        <SelectItem key={cp.value} value={cp.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{cp.label}</span>
                            <Badge variant="outline" className="ml-2">
                              {cp.risk}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleAnalyze}
                  disabled={!termSheet || !counterpartyType || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-pulse" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4 mr-2" />
                      Analyze Deal
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Real-time Analysis */}
            {isAnalyzing && (
              <Card className="enterprise-card animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 animate-pulse" />
                    AI Analysis in Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={progress} className="h-3" />
                    <div className="grid gap-3">
                      <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm">Parsing term sheet clauses and conditions</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm">Cross-referencing market benchmarks</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm">Generating strategic recommendations</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Analysis Complete */}
            {isAnalyzed && (
              <>
                {/* Risk Dashboard */}
                <Card className="enterprise-card animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-warning" />
                      Deal Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-warning mb-1">72%</div>
                        <div className="text-sm text-muted-foreground">Risk Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-1">$8.5M</div>
                        <div className="text-sm text-muted-foreground">Valuation</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-success mb-1">85%</div>
                        <div className="text-sm text-muted-foreground">Success Rate</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-destructive" />
                          <div>
                            <div className="font-medium">Anti-dilution provisions</div>
                            <div className="text-sm text-muted-foreground">Full-ratchet protection highly unfavorable</div>
                          </div>
                        </div>
                        <Badge variant="destructive">Critical</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-warning/10 border border-warning/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Clock className="w-5 h-5 text-warning" />
                          <div>
                            <div className="font-medium">Board composition</div>
                            <div className="text-sm text-muted-foreground">Investor control concentration</div>
                          </div>
                        </div>
                        <Badge className="bg-warning text-warning-foreground">Review</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-success/10 border border-success/20 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-success" />
                          <div>
                            <div className="font-medium">Liquidation preferences</div>
                            <div className="text-sm text-muted-foreground">Standard 1x non-participating</div>
                          </div>
                        </div>
                        <Badge variant="secondary">Acceptable</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Strategic Recommendations */}
                <Card className="enterprise-card animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      AI Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">Renegotiate Anti-Dilution</h4>
                            <p className="text-sm text-muted-foreground">Change from full-ratchet to weighted-average</p>
                          </div>
                          <Badge variant="destructive">High Priority</Badge>
                        </div>
                        <p className="text-sm mb-3">
                          Current full-ratchet terms could severely dilute founders in down rounds. 
                          Market standard is narrow-based weighted average.
                        </p>
                        <Button size="sm" variant="outline">
                          Generate Counter-Clause
                        </Button>
                      </div>

                      <div className="p-4 border border-warning/20 rounded-lg bg-warning/5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">Board Control Structure</h4>
                            <p className="text-sm text-muted-foreground">Maintain founder control</p>
                          </div>
                          <Badge className="bg-warning text-warning-foreground">Medium Priority</Badge>
                        </div>
                        <p className="text-sm mb-3">
                          Propose 2-1-2 structure: 2 founders, 1 investor, 2 independent directors 
                          to maintain strategic control.
                        </p>
                        <Button size="sm" variant="outline">
                          Generate Counter-Clause
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Deal Outcomes */}
                <Card className="enterprise-card animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Negotiation Scenarios
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="p-4 border border-success/20 rounded-lg bg-success/5">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-success">Optimal Outcome</h4>
                          <Badge variant="secondary">40% probability</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Achieve $10.5M valuation, weighted-average anti-dilution, 
                          maintain board control, secure favorable liquidation terms.
                        </p>
                      </div>

                      <div className="p-4 border border-warning/20 rounded-lg bg-warning/5">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-warning">Likely Outcome</h4>
                          <Badge variant="secondary">45% probability</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          $9M valuation, narrow-based weighted average, shared board control, 
                          standard liquidation preferences with minor compromises.
                        </p>
                      </div>

                      <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-destructive">Worst Case</h4>
                          <Badge variant="secondary">15% probability</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Accept current terms: $8.5M valuation, full-ratchet protection, 
                          investor board control. Consider walking away.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Counter-Proposal Generation */}
                <Card className="enterprise-card animate-fade-in">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Handshake className="w-5 h-5" />
                      Counter-Proposal Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Button onClick={generateCounterProposal} className="h-auto p-4">
                        <div className="text-left">
                          <div className="font-semibold mb-1">Generate Counter-Proposal</div>
                          <div className="text-sm opacity-80">AI-drafted term sheet revisions</div>
                        </div>
                        <ChevronRight className="w-5 h-5 ml-auto" />
                      </Button>

                      <Button 
                        variant="outline" 
                        className="h-auto p-4"
                        onClick={() => setShowScheduleCallModal(true)}
                      >
                        <div className="text-left">
                          <div className="font-semibold mb-1">Schedule Strategy Call</div>
                          <div className="text-sm opacity-80">Expert legal consultation</div>
                        </div>
                        <Calendar className="w-5 h-5 ml-auto" />
                      </Button>

                      <Button 
                        variant="outline" 
                        className="h-auto p-4"
                        onClick={() => setShowShareTeamModal(true)}
                      >
                        <div className="text-left">
                          <div className="font-semibold mb-1">Share with Team</div>
                          <div className="text-sm opacity-80">Collaborate on strategy</div>
                        </div>
                        <Share2 className="w-5 h-5 ml-auto" />
                      </Button>

                      <Button 
                        variant="outline" 
                        className="h-auto p-4"
                        onClick={() => setShowExportAnalysisModal(true)}
                      >
                        <div className="text-left">
                          <div className="font-semibold mb-1">Export Analysis</div>
                          <div className="text-sm opacity-80">Download detailed report</div>
                        </div>
                        <Download className="w-5 h-5 ml-auto" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Empty State */}
            {!isAnalyzing && !isAnalyzed && (
              <Card className="enterprise-card">
                <CardContent className="text-center py-12">
                  <Handshake className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Ready to Analyze Your Deal</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Upload your term sheet and select the investor type to get AI-powered 
                    negotiation insights and counter-proposal recommendations.
                  </p>
                  <div className="flex justify-center gap-4">
                    <Badge variant="outline">
                      <Shield className="w-3 h-3 mr-1" />
                      Confidential Analysis
                    </Badge>
                    <Badge variant="outline">
                      <Zap className="w-3 h-3 mr-1" />
                      Real-time Results
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Counter-Proposal Modal */}
        <Dialog open={showCounterProposal} onOpenChange={setShowCounterProposal}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                AI-Generated Counter-Proposal
              </DialogTitle>
              <DialogDescription>
                Review and customize this counter-proposal before sending to your investor
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                value={counterProposalContent}
                onChange={(e) => setCounterProposalContent(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
              />
              <div className="flex gap-2">
                <Button>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy to Clipboard
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export as PDF
                </Button>
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Send via Email
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Schedule Call Modal */}
        <Dialog open={showScheduleCallModal} onOpenChange={setShowScheduleCallModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Schedule Strategy Consultation
              </DialogTitle>
              <DialogDescription>
                Connect with a legal expert to review your negotiation strategy
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4">
                <Button className="h-auto p-4 justify-start">
                  <Video className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">30-min Strategy Review</div>
                    <div className="text-sm opacity-80">Discuss key negotiation points</div>
                  </div>
                  <span className="ml-auto">$300</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 justify-start">
                  <Phone className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">60-min Deep Dive</div>
                    <div className="text-sm opacity-80">Comprehensive term analysis</div>
                  </div>
                  <span className="ml-auto">$500</span>
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Share with Team Modal */}
        <Dialog open={showShareTeamModal} onOpenChange={setShowShareTeamModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Share Analysis with Team
              </DialogTitle>
              <DialogDescription>
                Invite stakeholders to review the negotiation analysis
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Email addresses (comma-separated)</Label>
                <Textarea 
                  placeholder="founder@company.com, cto@company.com, advisor@fund.com"
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Access level</Label>
                <Select defaultValue="view">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="view">View only</SelectItem>
                    <SelectItem value="comment">Can comment</SelectItem>
                    <SelectItem value="edit">Can edit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Send Invites
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Export Analysis Modal */}
        <Dialog open={showExportAnalysisModal} onOpenChange={setShowExportAnalysisModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Analysis Report
              </DialogTitle>
              <DialogDescription>
                Download detailed negotiation analysis and recommendations
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-3">
                <Button variant="outline" className="justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Executive Summary (PDF)
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Detailed Analysis (PDF)
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Counter-Proposal Draft (DOCX)
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  All Materials (ZIP)
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}