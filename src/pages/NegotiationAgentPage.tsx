import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { DragDropZone } from "@/components/ui/drag-drop-zone";
import { 
  Handshake, 
  Upload, 
  AlertTriangle, 
  TrendingUp, 
  ChevronRight, 
  Lightbulb, 
  Clock,
  CheckCircle2,
  Target,
  Users,
  Zap,
  Shield
} from "lucide-react";

export default function NegotiationAgentPage() {
  const [termSheet, setTermSheet] = useState<File | null>(null);
  const [counterpartyType, setCounterpartyType] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

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

  const selectedCounterparty = counterpartyTypes.find(cp => cp.value === counterpartyType);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Negotiation Strategy Agent</h1>
          <p className="text-muted-foreground">Upload Term Sheet, get risk scores and clause suggestions for deal outcomes</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Configuration */}
          <div className="lg:col-span-1">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Handshake className="w-5 h-5" />
                  Deal Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Upload Term Sheet</label>
                  <DragDropZone
                    onFilesChange={(files) => setTermSheet(files[0])}
                    acceptedFileTypes={['.pdf', '.docx']}
                    maxFiles={1}
                    className="min-h-[120px]"
                  />
                  {termSheet && (
                    <div className="mt-2 p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">{termSheet.name}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Counterparty Type</label>
                  <Select value={counterpartyType} onValueChange={setCounterpartyType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select investor type" />
                    </SelectTrigger>
                    <SelectContent>
                      {counterpartyTypes.map(cp => (
                        <SelectItem key={cp.value} value={cp.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{cp.label}</span>
                            <Badge 
                              variant="secondary" 
                              className={`ml-2 ${
                                cp.risk === 'High' ? 'text-destructive' : 
                                cp.risk === 'Medium' ? 'text-warning' : 'text-success'
                              }`}
                            >
                              {cp.risk}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedCounterparty && (
                    <div className="mt-2 p-3 bg-muted/30 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        Risk Level: <span className="font-medium">{selectedCounterparty.risk}</span>
                      </p>
                    </div>
                  )}
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleAnalyze}
                  disabled={!termSheet || !counterpartyType || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing Deal...
                    </>
                  ) : (
                    <>
                      Simulate Deal
                      <ChevronRight className="w-4 h-4 ml-2" />
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
                      <span className="text-sm font-medium">Negotiation Analysis Progress</span>
                      <span className="text-sm text-muted-foreground">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="grid gap-3">
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm">Parsing term sheet clauses using NLP and legal ontologies</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm">Analyzing {selectedCounterparty?.label} patterns from deal database</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm">Running Monte Carlo simulations for deal outcomes</span>
                      </div>
                    </div>
                    
                    {/* TEE Verification */}
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Confidential Deal Analysis</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Term sheet analysis runs in secure TEE environment to protect sensitive 
                        financial information and negotiation strategies.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Analysis Results */}
            {isAnalyzed && (
              <>
                {/* Risk Score */}
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-warning" />
                      Deal Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-warning">72%</div>
                        <div className="text-sm text-muted-foreground">Overall Risk</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">8.5M</div>
                        <div className="text-sm text-muted-foreground">Valuation</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success">85%</div>
                        <div className="text-sm text-muted-foreground">Success Probability</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                          <span className="font-medium">High Risk: Anti-dilution provisions</span>
                        </div>
                        <Badge variant="destructive">Critical</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-warning" />
                          <span className="font-medium">Medium Risk: Board composition</span>
                        </div>
                        <Badge className="bg-warning text-warning-foreground">Review</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                          <span className="font-medium">Low Risk: Liquidation preferences</span>
                        </div>
                        <Badge variant="secondary">Acceptable</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Clause Suggestions */}
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Strategic Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">Negotiate Anti-Dilution Terms</h4>
                          <Badge variant="destructive">High Priority</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Current full-ratchet anti-dilution is highly unfavorable. Suggest weighted-average or narrow-based protection.
                        </p>
                        <Button size="sm" variant="outline">Revise Clauses</Button>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">Board Seat Allocation</h4>
                          <Badge className="bg-warning text-warning-foreground">Medium Priority</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Maintain founder control with 2-1-1 structure (founders-investor-independent).
                        </p>
                        <Button size="sm" variant="outline">Revise Clauses</Button>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">Vesting Acceleration</h4>
                          <Badge variant="secondary">Low Priority</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Add single-trigger acceleration for 50% of unvested shares on involuntary termination.
                        </p>
                        <Button size="sm" variant="outline">Revise Clauses</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Negotiation Outcomes */}
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Possible Deal Outcomes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-success">Best Case Scenario</h4>
                          <span className="text-sm text-muted-foreground">40% probability</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Negotiate down to weighted-average anti-dilution, maintain board control, 
                          achieve 10M+ valuation with favorable terms.
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-warning">Most Likely</h4>
                          <span className="text-sm text-muted-foreground">45% probability</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Compromise on anti-dilution (narrow-based weighted), share board control,
                          close at 8.5M valuation with standard terms.
                        </p>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-destructive">Worst Case</h4>
                          <span className="text-sm text-muted-foreground">15% probability</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Accept unfavorable anti-dilution, lose board control, 
                          valuation drops to 6M with restrictive covenants.
                        </p>
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
                  <Button variant="outline" className="justify-start">
                    <Zap className="w-4 h-4 mr-2" />
                    Generate Counter-Proposal
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Target className="w-4 h-4 mr-2" />
                    Schedule Strategy Call
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Share with Legal Team
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Export Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}