// @new - Idea-Stage Fit Analysis with agentic workflow
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProgressStepper } from "@/components/ui/progress-stepper";
import { ExplainPanel } from "@/components/ui/explain-panel";
import { RiskDial } from "@/components/ui/risk-dial";
import { DragDropZone } from "@/components/ui/drag-drop-zone";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Lightbulb, Upload, Globe, TrendingUp, FileText, ArrowRight, 
  CheckCircle, AlertCircle, Info, Target, Building, Scale
} from "lucide-react";
import { AgentSimulator } from "@/lib/simulation";
import { mockJurisdictions } from "@/lib/mock-data";
import { Link } from "react-router-dom";

export default function IdeaFitPage() {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [inputs, setInputs] = useState({
    whitepaper: null as File | null,
    businessBrief: "",
    activities: "",
    tokenPurpose: "",
    saleMethod: "",
    targetGeos: "",
    custodyModel: "",
    teamLocation: "",
    revenueModel: "",
    riskTolerance: ""
  });
  const [selectedJurisdictions, setSelectedJurisdictions] = useState(["uae", "uk", "eu"]);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStep, setAnalysisStep] = useState("");
  const [results, setResults] = useState<any>(null);
  const [explainEntries, setExplainEntries] = useState<any[]>([]);

  useEffect(() => {
    document.title = "Idea-Stage Fit Analysis – Quentlex";
  }, []);

  const progressSteps = [
    { id: "extract", label: "Extract Business Model", status: "pending" as const },
    { id: "classify", label: "Classify Tokens", status: "pending" as const },
    { id: "compare", label: "Compare Jurisdictions", status: "pending" as const },
    { id: "checklist", label: "Build Checklists", status: "pending" as const },
    { id: "score", label: "Score & Rank", status: "pending" as const },
    { id: "recommend", label: "Recommend Structure", status: "pending" as const }
  ].map((step, index) => ({
    ...step,
    status: analysisComplete ? "completed" as const :
            index === Math.floor(analysisProgress / 100 * 6) ? "active" as const :
            index < Math.floor(analysisProgress / 100 * 6) ? "completed" as const : "pending" as const
  }));

  const handleFileUpload = (files: File[]) => {
    if (files[0]) {
      setInputs(prev => ({ ...prev, whitepaper: files[0] }));
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setStep(2);
    setExplainEntries([]);

    // Simulate the agentic analysis process
    const simulator = AgentSimulator.analyzeIdea(inputs);
    
    for await (const update of simulator) {
      setAnalysisProgress(update.progress);
      setAnalysisStep(update.message);
      
      // Add to explain panel
      setExplainEntries(prev => [...prev, {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        type: 'analysis' as const,
        message: update.message,
        confidence: Math.floor(Math.random() * 20) + 80
      }]);
    }

    // Set final results
    const finalResults = await simulator;
    setResults(finalResults);
    setIsAnalyzing(false);
    setAnalysisComplete(true);
    setStep(3);

    // Add final explain entries
    setExplainEntries(prev => [...prev,
      {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        type: 'rule' as const,
        message: "Applied VARA token classification framework",
        details: "UAE regulations favor utility tokens with clear business purpose"
      },
      {
        id: (Date.now() + 1).toString(),
        timestamp: new Date().toISOString(),
        type: 'citation' as const,
        message: "Referenced MiCA compliance requirements",
        details: "EU framework requires specific disclosures for asset-referenced tokens"
      }
    ]);
  };

  if (step === 2) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto max-w-6xl py-8 px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Analyzing Your Idea</h1>
            <p className="text-muted-foreground">Our AI is working through jurisdiction frameworks and compliance requirements...</p>
            <Badge className="mt-2" variant="outline">
              <div className="w-2 h-2 bg-success rounded-full mr-1 animate-pulse" />
              Simulated for Pilot
            </Badge>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            {/* Progress */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Analysis Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>{analysisStep}</span>
                      <span>{Math.round(analysisProgress)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${analysisProgress}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Processing {selectedJurisdictions.length} jurisdictions and your business model requirements.
                  </p>
                </CardContent>
              </Card>

              <ExplainPanel 
                title="AI Analysis Feed"
                entries={explainEntries}
                isActive={isAnalyzing}
              />
            </div>

            {/* Sidebar */}
            <aside className="space-y-4">
              <ProgressStepper steps={progressSteps} />
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Your Inputs</h3>
                  <div className="space-y-2 text-sm">
                    {inputs.whitepaper && (
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="truncate">{inputs.whitepaper.name}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-secondary" />
                      <span>{selectedJurisdictions.length} jurisdictions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
    );
  }

  if (step === 3 && results) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto max-w-7xl py-8 px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Analysis Complete</h1>
            <p className="text-muted-foreground">Here's your comprehensive jurisdiction and business structure analysis.</p>
          </div>

          <Tabs defaultValue="heatmap" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="heatmap">Jurisdiction Heatmap</TabsTrigger>
              <TabsTrigger value="tokens">Token Classification</TabsTrigger>
              <TabsTrigger value="compliance">Compliance Checklist</TabsTrigger>
              <TabsTrigger value="structure">Structure Recommendation</TabsTrigger>
            </TabsList>

            <TabsContent value="heatmap">
              <Card>
                <CardHeader>
                  <CardTitle>Jurisdiction Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedJurisdictions.map(jurisdictionId => {
                      const jurisdiction = mockJurisdictions.find(j => j.id === jurisdictionId);
                      const scores = results.jurisdictionScores[jurisdictionId];
                      if (!jurisdiction || !scores) return null;

                      return (
                        <Card key={jurisdictionId} className="p-4">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl">{jurisdiction.flag}</span>
                            <div>
                              <h3 className="font-semibold">{jurisdiction.name}</h3>
                              <p className="text-sm text-muted-foreground">{jurisdiction.code}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Regulation</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-muted rounded-full h-2">
                                  <div className="bg-primary h-2 rounded-full" style={{ width: `${scores.regulation}%` }} />
                                </div>
                                <span className="text-sm font-medium">{scores.regulation}</span>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Cost</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-muted rounded-full h-2">
                                  <div className="bg-secondary h-2 rounded-full" style={{ width: `${scores.cost}%` }} />
                                </div>
                                <span className="text-sm font-medium">{scores.cost}</span>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Credibility</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-muted rounded-full h-2">
                                  <div className="bg-accent h-2 rounded-full" style={{ width: `${scores.credibility}%` }} />
                                </div>
                                <span className="text-sm font-medium">{scores.credibility}</span>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Speed</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-muted rounded-full h-2">
                                  <div className="bg-success h-2 rounded-full" style={{ width: `${scores.speed}%` }} />
                                </div>
                                <span className="text-sm font-medium">{scores.speed}</span>
                              </div>
                            </div>
                          </div>

                          <RiskDial 
                            score={Math.round((scores.regulation + scores.cost + scores.credibility + scores.speed) / 4)}
                            size="sm"
                            className="mt-4"
                          />
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tokens">
              <Card>
                <CardHeader>
                  <CardTitle>Token Classification Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedJurisdictions.map(jurisdictionId => {
                      const jurisdiction = mockJurisdictions.find(j => j.id === jurisdictionId);
                      if (!jurisdiction) return null;

                      return (
                        <Card key={jurisdictionId} className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{jurisdiction.flag}</span>
                              <h3 className="font-semibold">{jurisdiction.name}</h3>
                            </div>
                            <Badge variant="secondary">Utility Token</Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">
                            Based on your token's primary function for platform access and governance, 
                            it qualifies as a utility token under {jurisdiction.name} regulations.
                          </p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-success" />
                              <span>No securities registration required</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <AlertCircle className="w-4 h-4 text-warning" />
                              <span>Consumer protection measures apply</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Info className="w-4 h-4 text-accent" />
                              <span>Marketing restrictions on financial returns</span>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Checklists</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {selectedJurisdictions.map(jurisdictionId => {
                      const jurisdiction = mockJurisdictions.find(j => j.id === jurisdictionId);
                      if (!jurisdiction) return null;

                      const items = [
                        { name: "Business Registration", cost: 5000, days: 14, required: true },
                        { name: "Token Classification Filing", cost: 15000, days: 30, required: true },
                        { name: "AML/KYC Procedures", cost: 25000, days: 21, required: true },
                        { name: "Consumer Protection Policy", cost: 8000, days: 7, required: false }
                      ];

                      return (
                        <Card key={jurisdictionId} className="p-4">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-lg">{jurisdiction.flag}</span>
                            <h3 className="font-semibold">{jurisdiction.name}</h3>
                            <Badge variant="outline" className="ml-auto">
                              ${items.reduce((sum, item) => sum + item.cost, 0).toLocaleString()} total
                            </Badge>
                          </div>
                          
                          <div className="space-y-3">
                            {items.map((item, index) => (
                              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  <Checkbox checked={item.required} disabled />
                                  <div>
                                    <p className="font-medium text-sm">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {item.days} days • ${item.cost.toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                                <Badge variant={item.required ? "default" : "secondary"}>
                                  {item.required ? "Required" : "Optional"}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="structure">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Business Structure</CardTitle>
                </CardHeader>
                <CardContent>
                  {results.recommendations.map((rec: any, index: number) => (
                    <Card key={index} className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Building className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">Hybrid Structure Recommended</h3>
                            <Badge>Optimal</Badge>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">{rec.rationale}</p>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <Card className="p-4">
                              <h4 className="font-semibold mb-2">Primary: {rec.primary}</h4>
                              <p className="text-sm text-muted-foreground">
                                Main operating entity for token issuance and primary business activities.
                              </p>
                            </Card>
                            
                            <Card className="p-4">
                              <h4 className="font-semibold mb-2">Secondary: {rec.secondary}</h4>
                              <p className="text-sm text-muted-foreground">
                                Support entity for specific market access and operational flexibility.
                              </p>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between items-center mt-8">
            <Button variant="outline" onClick={() => setStep(1)}>
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Refine Analysis
            </Button>
            
            <div className="flex gap-3">
              <Button asChild variant="outline">
                <Link to="/launch-path/post-incorp">
                  Post-Incorp Analysis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild>
                <Link to="/co-review">
                  Send to Lawyer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl py-8 px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold">Idea-Stage Fit Analysis</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Perfect for founders with just a concept. Compare jurisdictions, classify tokens, 
            and get structural recommendations before you incorporate.
          </p>
          <Badge className="mt-2" variant="outline">
            <Info className="w-3 h-3 mr-1" />
            Simulated for Pilot
          </Badge>
        </div>

        {/* Input Form */}
        <div className="space-y-6">
          {/* Document Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Business Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="whitepaper">Whitepaper or Business Brief (Optional)</Label>
                <DragDropZone
                  onFilesChange={handleFileUpload}
                  className="mt-2"
                />
                {inputs.whitepaper && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    {inputs.whitepaper.name}
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="brief">Or describe your business idea</Label>
                <Textarea
                  id="brief"
                  value={inputs.businessBrief}
                  onChange={(e) => setInputs(prev => ({ ...prev, businessBrief: e.target.value }))}
                  placeholder="Describe your Web3 project, token mechanics, and business model..."
                  className="mt-2"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Clarifier Form */}
          <Card>
            <CardHeader>
              <CardTitle>Business Details</CardTitle>
              <p className="text-sm text-muted-foreground">
                Help us understand your project better (max 8 fields)
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Primary Activities</Label>
                  <Select value={inputs.activities} onValueChange={(value) => setInputs(prev => ({ ...prev, activities: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select primary business activity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="defi">DeFi Platform</SelectItem>
                      <SelectItem value="nft">NFT Marketplace</SelectItem>
                      <SelectItem value="gaming">Gaming Platform</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="dao">DAO/Governance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Token Purpose</Label>
                  <Select value={inputs.tokenPurpose} onValueChange={(value) => setInputs(prev => ({ ...prev, tokenPurpose: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Primary token function" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utility">Platform Access/Utility</SelectItem>
                      <SelectItem value="governance">Governance Rights</SelectItem>
                      <SelectItem value="reward">Rewards/Incentives</SelectItem>
                      <SelectItem value="payment">Payment Method</SelectItem>
                      <SelectItem value="investment">Investment/Security</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Sale Method</Label>
                  <Select value={inputs.saleMethod} onValueChange={(value) => setInputs(prev => ({ ...prev, saleMethod: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="How will tokens be sold?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private Sale Only</SelectItem>
                      <SelectItem value="public">Public Token Sale</SelectItem>
                      <SelectItem value="ido">IDO/IEO</SelectItem>
                      <SelectItem value="airdrop">Airdrop</SelectItem>
                      <SelectItem value="no-sale">No Sale Planned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Target Markets</Label>
                  <Input
                    value={inputs.targetGeos}
                    onChange={(e) => setInputs(prev => ({ ...prev, targetGeos: e.target.value }))}
                    placeholder="e.g., Global, US, EU, APAC"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Team Location</Label>
                  <Input
                    value={inputs.teamLocation}
                    onChange={(e) => setInputs(prev => ({ ...prev, teamLocation: e.target.value }))}
                    placeholder="Primary team location"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Revenue Model</Label>
                  <Select value={inputs.revenueModel} onValueChange={(value) => setInputs(prev => ({ ...prev, revenueModel: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="How will you generate revenue?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fees">Transaction Fees</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                      <SelectItem value="marketplace">Marketplace Commission</SelectItem>
                      <SelectItem value="token-appreciation">Token Appreciation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Jurisdiction Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Candidate Jurisdictions</CardTitle>
              <p className="text-sm text-muted-foreground">
                Select jurisdictions to compare (default: UAE, UK, EU)
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {mockJurisdictions.map(jurisdiction => (
                  <div key={jurisdiction.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={jurisdiction.id}
                      checked={selectedJurisdictions.includes(jurisdiction.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedJurisdictions(prev => [...prev, jurisdiction.id]);
                        } else {
                          setSelectedJurisdictions(prev => prev.filter(id => id !== jurisdiction.id));
                        }
                      }}
                    />
                    <Label htmlFor={jurisdiction.id} className="flex items-center gap-2 cursor-pointer">
                      <span>{jurisdiction.flag}</span>
                      <span>{jurisdiction.name}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link to="/launch-path">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Back to Launch Path
              </Link>
            </Button>
            
            <Button 
              onClick={handleAnalyze}
              disabled={!inputs.businessBrief && !inputs.whitepaper}
              size="lg"
              className="h-12 px-8"
            >
              <Target className="w-4 h-4 mr-2" />
              Start Analysis
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}