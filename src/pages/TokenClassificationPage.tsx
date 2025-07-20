import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { DragDropZone } from "@/components/ui/drag-drop-zone";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  GitBranch, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  Shield, 
  Scale,
  Lightbulb,
  Clock,
  Target,
  Zap,
  Download,
  FileText,
  RefreshCw
} from "lucide-react";

export default function TokenClassificationPage() {
  const [tokenomics, setTokenomics] = useState("");
  const [whitepaper, setWhitepaper] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    // Simulate AI analysis
    const steps = [
      "Parsing tokenomics structure...",
      "Applying Howey Test framework...",
      "Analyzing MiCA compliance...", 
      "Running SEC classification logic...",
      "Calculating confidence scores..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress((i + 1) * 20);
    }
    
    setIsAnalyzing(false);
    setIsAnalyzed(true);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Token Classification Agent</h1>
          <p className="text-muted-foreground">Analyze tokenomics using Howey Test, MiCA, and SEC frameworks with confidence scoring</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Configuration */}
          <div className="lg:col-span-1">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5" />
                  Token Analysis Input
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Tokenomics Summary</label>
                  <Textarea
                    placeholder="Paste your tokenomics description or key details here..."
                    value={tokenomics}
                    onChange={(e) => setTokenomics(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Upload Whitepaper (Optional)</label>
                  <DragDropZone
                    onFilesChange={(files) => setWhitepaper(files[0])}
                    acceptedFileTypes={['.pdf', '.docx']}
                    maxFiles={1}
                    className="min-h-[100px]"
                  />
                  {whitepaper && (
                    <div className="mt-2 p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{whitepaper.name}</span>
                      </div>
                    </div>
                  )}
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleAnalyze}
                  disabled={!tokenomics.trim() || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing Token...
                    </>
                  ) : (
                    <>
                      Analyze Token
                      <GitBranch className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Agent Process & Output */}
          <div className="lg:col-span-2 space-y-6">
            {/* Agentic Process */}
            {isAnalyzing && (
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Agentic Process (Live)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Classification Analysis Progress</span>
                      <span className="text-sm text-muted-foreground">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="grid gap-3">
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm">Parsing token utility and economic model</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm">Applying Howey Test: investment expectation analysis</span>
                      </div>
                       <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                         <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                         <span className="text-sm">Cross-referencing MiCA utility token definitions</span>
                       </div>
                       <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                         <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                         <span className="text-sm">Generating TEE-verified classification proof</span>
                       </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Classification Results */}
            {isAnalyzed && (
              <>
                {/* Main Classification */}
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-success" />
                      Token Classification Result
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-success mb-2">Utility Token</div>
                      <div className="text-lg text-muted-foreground mb-4">85% Confidence</div>
                      <div className="w-full bg-muted rounded-full h-3 mb-4">
                        <div className="bg-success h-3 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-sm font-medium text-success">Howey Test</div>
                        <div className="text-xs text-muted-foreground">Not a Security</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-success">MiCA Framework</div>
                        <div className="text-xs text-muted-foreground">Utility Token</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium text-warning">SEC Analysis</div>
                        <div className="text-xs text-muted-foreground">Requires Review</div>
                      </div>
                    </div>

                     <div className="p-4 bg-success/10 rounded-lg">
                       <div className="flex items-center gap-2 mb-2">
                         <CheckCircle2 className="w-4 h-4 text-success" />
                         <span className="font-medium">Primary Classification: Utility Token</span>
                       </div>
                       <p className="text-sm text-muted-foreground">
                         Token primarily provides access to platform services rather than investment returns. 
                         Strong utility characteristics with clear functional use cases.
                       </p>
                     </div>

                     {/* TEE Verification */}
                     <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
                       <div className="flex items-center gap-2 mb-2">
                         <Shield className="w-4 h-4 text-primary" />
                         <span className="font-medium text-sm">TEE Verification Complete</span>
                       </div>
                       <p className="text-xs text-muted-foreground mb-2">
                         Classification verified in Trusted Execution Environment (Intel SGX)
                       </p>
                       <div className="text-xs font-mono text-primary bg-background/50 p-2 rounded">
                         Proof Hash: 0x3d4f...a8c2 | Block: 18,234,567 | Status: ✓ Verified
                       </div>
                     </div>
                  </CardContent>
                </Card>

                {/* Risk Flags */}
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-warning" />
                      Risk Flags & Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-warning" />
                          <span className="font-medium">Staking rewards may trigger security classification</span>
                        </div>
                        <Badge className="bg-warning text-warning-foreground">Review</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          <span className="font-medium">Clear utility function documented</span>
                        </div>
                        <Badge variant="secondary">Compliant</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          <span className="font-medium">No expectation of profits from others' efforts</span>
                        </div>
                        <Badge variant="secondary">Compliant</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Framework Analysis */}
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="w-5 h-5" />
                      Detailed Framework Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Howey Test Analysis</h4>
                          <Badge variant="secondary">Score: 78/100</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          ✅ Investment of money: Token purchase involves monetary investment<br/>
                          ✅ Common enterprise: Shared blockchain platform<br/>
                          ❌ Expectation of profits: Primary value from utility, not speculation<br/>
                          ❌ Efforts of others: Token holders control their own rewards
                        </p>
                        <div className="text-xs text-success font-medium">Likely NOT a security under Howey Test</div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">MiCA Compliance</h4>
                          <Badge variant="secondary">Score: 92/100</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Strong utility token characteristics under MiCA Article 3(5). Token provides 
                          access to goods/services within the platform ecosystem.
                        </p>
                        <div className="text-xs text-success font-medium">Compliant as Utility Token</div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">SEC Framework</h4>
                          <Badge className="bg-warning text-warning-foreground">Score: 65/100</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Staking mechanism may require additional legal review. Consider safe harbor 
                          provisions and current SEC guidance on utility tokens.
                        </p>
                        <div className="text-xs text-warning font-medium">Requires legal review</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Quick Actions */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start" disabled={!isAnalyzed} onClick={() => window.open('/proof-generator', '_blank')}>
                    <Shield className="w-4 h-4 mr-2" />
                    Generate Proof
                  </Button>
                  <Button variant="outline" className="justify-start" disabled={!isAnalyzed} onClick={() => setShowExportModal(true)}>
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                  <Button variant="outline" className="justify-start" disabled={!isAnalyzed} onClick={() => window.open('/review-routing', '_blank')}>
                    <Scale className="w-4 h-4 mr-2" />
                    Legal Review
                  </Button>
                  <Button variant="outline" className="justify-start" disabled={!isAnalyzed} onClick={() => setShowUpdateModal(true)}>
                    <Zap className="w-4 h-4 mr-2" />
                    Update Docs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Explanation Panel */}
        <Card className="enterprise-card mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              How Token Classification Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We use legal logic combined with precedent-based AI to simulate how regulators may classify your token. 
              Our analysis applies the Howey Test (US), MiCA regulations (EU), and other international frameworks 
              to provide a comprehensive classification with confidence scoring. This tool helps identify potential 
              regulatory risks before launch or investment activities.
            </p>
          </CardContent>
        </Card>

        {/* Export Report Modal */}
        <Dialog open={showExportModal} onOpenChange={setShowExportModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-primary" />
                Export Classification Report
              </DialogTitle>
              <DialogDescription>
                Enterprise-grade simulation for comprehensive token analysis report
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-2">Report Contents</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Howey Test Analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>MiCA Framework Compliance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>SEC Regulatory Assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Risk Analysis & Recommendations</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV Data
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Update Docs Modal */}
        <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-primary" />
                Update Documentation
              </DialogTitle>
              <DialogDescription>
                Enterprise simulation for automated document updates based on classification results
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h4 className="font-medium mb-2">Recommended Updates</h4>
                <div className="space-y-2 text-sm">
                  <p>• Whitepaper: Update utility token definition to emphasize functional use cases</p>
                  <p>• Legal disclosures: Add staking reward disclaimers</p>
                  <p>• Terms of Service: Include token utility restrictions</p>
                  <p>• Privacy Policy: Add token holder data processing clauses</p>
                </div>
              </div>
              
              <Button className="w-full">
                <Zap className="w-4 h-4 mr-2" />
                Apply Recommended Updates
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}