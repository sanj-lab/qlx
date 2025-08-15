// @modified - Enterprise-grade Idea-Stage Fit Analysis
import { useState, useEffect } from "react";
import { SubnavTabs } from "@/components/ui/subnav-tabs";
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
import { Separator } from "@/components/ui/separator";
import { 
  Lightbulb, Upload, Globe, TrendingUp, FileText, ArrowRight, 
  CheckCircle, AlertCircle, Info, Target, Building, Scale, 
  Shield, Clock, Award, Zap, MapPin, DollarSign, Calendar, 
  Users, Briefcase, Gavel, Download
} from "lucide-react";
import { AgentSimulator } from "@/lib/simulation";
import { mockJurisdictions } from "@/lib/mock-data";
import { Link } from "react-router-dom";

interface IdeaInputs {
  whitepaper: File | null;
  businessBrief: string;
  activities: string;
  tokenPurpose: string;
  saleMethod: string;
  targetGeos: string;
  custodyModel: string;
  teamLocation: string;
  revenueModel: string;
  riskTolerance: string;
}

interface JurisdictionScore {
  regulation: number;
  cost: number;
  credibility: number;
  speed: number;
  overall: number;
  reasoning: string;
}

interface AnalysisResults {
  jurisdictionScores: Record<string, JurisdictionScore>;
  tokenClassifications: Record<string, {
    classification: string;
    confidence: number;
    implications: string[];
    requirements: string[];
  }>;
  complianceChecklists: Record<string, Array<{
    name: string;
    cost: number;
    days: number;
    required: boolean;
    description: string;
  }>>;
  businessStructure: {
    recommended: string;
    reasoning: string;
    isHybrid: boolean;
    jurisdictions: string[];
    benefits: string[];
    considerations: string[];
  };
}

export default function IdeaFitPage() {
  const [phase, setPhase] = useState<'input' | 'analysis' | 'results'>('input');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [inputs, setInputs] = useState<IdeaInputs>({
    whitepaper: null,
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
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState("");
  const [results, setResults] = useState<AnalysisResults | null>(null);
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
    status: phase === 'results' ? "completed" as const :
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
    setPhase('analysis');
    setExplainEntries([]);
    setAnalysisProgress(0);

    const steps = [
      "Extracting business model from inputs...",
      "Classifying token mechanics per jurisdiction...", 
      "Comparing regulatory frameworks...",
      "Building compliance roadmaps...",
      "Computing jurisdiction scores...",
      "Recommending optimal structure..."
    ];

    try {
      // Simulate the agentic analysis with realistic timing
      for (let i = 0; i < steps.length; i++) {
        setCurrentAnalysisStep(steps[i]);
        setAnalysisProgress((i / steps.length) * 100);
        
        setExplainEntries(prev => [...prev, {
          id: `${Date.now()}-${i}`,
          timestamp: new Date().toISOString(),
          type: i % 2 === 0 ? 'analysis' as const : 'rule' as const,
          message: steps[i],
          confidence: 85 + Math.floor(Math.random() * 10)
        }]);

        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Generate sophisticated mock results
      const mockResults: AnalysisResults = {
        jurisdictionScores: {
          uae: { regulation: 92, cost: 78, credibility: 95, speed: 88, overall: 88, 
                 reasoning: "Strong regulatory clarity with VARA framework, premium market positioning" },
          uk: { regulation: 85, cost: 65, credibility: 92, speed: 72, overall: 79,
                reasoning: "Established financial center but evolving regulatory landscape" },
          eu: { regulation: 88, cost: 58, credibility: 89, speed: 65, overall: 75,
                reasoning: "Comprehensive MiCA framework but complex multi-jurisdiction compliance" }
        },
        tokenClassifications: {
          uae: { classification: "Utility Token", confidence: 94, 
                 implications: ["Platform access rights", "Governance participation", "No investment returns"],
                 requirements: ["VARA registration", "Consumer protection", "AML compliance"] },
          uk: { classification: "Utility Token", confidence: 87,
                 implications: ["Service access token", "Limited transferability", "Consumer focus"],
                 requirements: ["FCA guidance adherence", "Consumer duty", "Financial promotions rules"] },
          eu: { classification: "Utility Token", confidence: 91,
                 implications: ["Platform utility", "No financial returns", "Technical function focus"],
                 requirements: ["MiCA compliance", "E-money exclusions", "Consumer protection"] }
        },
        complianceChecklists: {
          uae: [
            { name: "VARA Virtual Asset License", cost: 85000, days: 90, required: true, description: "Primary operating license" },
            { name: "AML/CFT Compliance Program", cost: 35000, days: 45, required: true, description: "Anti-money laundering framework" },
            { name: "Consumer Protection Framework", cost: 25000, days: 30, required: true, description: "Consumer safeguards and disclosures" },
            { name: "Ongoing Compliance Monitoring", cost: 15000, days: 14, required: false, description: "Continuous regulatory reporting" }
          ],
          uk: [
            { name: "FCA Regulatory Perimeter Assessment", cost: 45000, days: 60, required: true, description: "Regulatory scope determination" },
            { name: "Consumer Duty Implementation", cost: 28000, days: 45, required: true, description: "Consumer protection measures" },
            { name: "Financial Promotions Compliance", cost: 18000, days: 21, required: true, description: "Marketing and communications rules" },
            { name: "Data Protection (GDPR)", cost: 22000, days: 30, required: false, description: "Privacy and data handling" }
          ],
          eu: [
            { name: "MiCA Compliance Assessment", cost: 65000, days: 75, required: true, description: "Markets in Crypto-Assets regulation" },
            { name: "E-Money License Evaluation", cost: 45000, days: 60, required: true, description: "Electronic money exclusions" },
            { name: "Cross-Border Notifications", cost: 35000, days: 90, required: true, description: "Multi-jurisdiction compliance" },
            { name: "Consumer Protection Measures", cost: 25000, days: 45, required: false, description: "EU consumer safeguards" }
          ]
        },
        businessStructure: {
          recommended: "UAE Foundation + UK OpCo",
          reasoning: "Optimal balance of regulatory clarity, market access, and operational flexibility",
          isHybrid: true,
          jurisdictions: ["uae", "uk"],
          benefits: [
            "UAE foundation provides regulatory clarity and token issuance framework",
            "UK operations company enables EU market access and traditional banking",
            "Segregated token and operational activities for compliance optimization",
            "Premium jurisdiction positioning for institutional investors"
          ],
          considerations: [
            "Dual jurisdiction complexity requires specialized legal coordination",
            "Transfer pricing and tax optimization between entities needed",
            "Ongoing compliance monitoring across both regulatory frameworks"
          ]
        }
      };

      setResults(mockResults);
      setAnalysisProgress(100);
      setPhase('results');

      // Add final explanatory entries
      setExplainEntries(prev => [...prev,
        {
          id: `final-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'citation' as const,
          message: "Analysis complete - hybrid structure recommended",
          details: "UAE-UK combination optimizes regulatory clarity with market access",
          confidence: 96
        }
      ]);

    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleJurisdictionToggle = (jurisdictionId: string) => {
    setSelectedJurisdictions(prev => 
      prev.includes(jurisdictionId) 
        ? prev.filter(id => id !== jurisdictionId)
        : [...prev, jurisdictionId]
    );
  };

  const canStartAnalysis = () => {
    return (inputs.whitepaper || inputs.businessBrief.length > 50) && 
           inputs.activities && inputs.tokenPurpose && 
           selectedJurisdictions.length > 0;
  };

  // Input Phase UI
  if (phase === 'input') {
    return (
      <main className="min-h-screen bg-background">
        {/* SubNav */}
        <section className="py-4 px-6 border-b bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <SubnavTabs />
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-12 px-6 border-b hero-gradient">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Lightbulb className="w-4 h-4" />
              Idea-Stage Analysis
            </div>
            <h1 className="text-4xl font-bold mb-4">Where should your idea live?</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Compare jurisdictions, classify tokens, and discover the optimal business structure 
              for your Web3 venture before you build.
            </p>
          </div>
        </section>

        <div className="container mx-auto max-w-6xl p-6">
          <div className="grid lg:grid-cols-[1fr_300px] gap-8">
            {/* Main Input Form */}
            <div className="space-y-8">
              {/* Business Overview */}
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    Business Overview
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Upload your whitepaper or describe your business model
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Whitepaper or Pitch Deck</Label>
                    <DragDropZone
                      onFilesChange={handleFileUpload}
                      className="mt-2"
                    />
                    {inputs.whitepaper && (
                      <div className="flex items-center gap-2 mt-3 p-3 bg-success/5 border border-success/20 rounded-lg">
                        <FileText className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium">{inputs.whitepaper.name}</span>
                        <CheckCircle className="w-4 h-4 text-success ml-auto" />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="businessBrief">Business Brief</Label>
                    <Textarea
                      id="businessBrief"
                      placeholder="Describe your business model, target market, and key value proposition..."
                      value={inputs.businessBrief}
                      onChange={(e) => setInputs(prev => ({ ...prev, businessBrief: e.target.value }))}
                      className="mt-2 min-h-24"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {inputs.businessBrief.length}/500 characters
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Token Details */}
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Token Mechanics
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="activities">Primary Activities</Label>
                    <Select value={inputs.activities} onValueChange={(value) => setInputs(prev => ({ ...prev, activities: value }))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select primary activities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="defi">DeFi Protocol</SelectItem>
                        <SelectItem value="nft">NFT Platform</SelectItem>
                        <SelectItem value="gaming">Gaming Platform</SelectItem>
                        <SelectItem value="infrastructure">Blockchain Infrastructure</SelectItem>
                        <SelectItem value="marketplace">Digital Marketplace</SelectItem>
                        <SelectItem value="dao">DAO Platform</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tokenPurpose">Token Purpose</Label>
                    <Select value={inputs.tokenPurpose} onValueChange={(value) => setInputs(prev => ({ ...prev, tokenPurpose: value }))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Primary token function" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utility">Platform Utility</SelectItem>
                        <SelectItem value="governance">Governance Rights</SelectItem>
                        <SelectItem value="rewards">Rewards/Incentives</SelectItem>
                        <SelectItem value="access">Access Rights</SelectItem>
                        <SelectItem value="staking">Staking/Yield</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="saleMethod">Token Distribution</Label>
                    <Select value={inputs.saleMethod} onValueChange={(value) => setInputs(prev => ({ ...prev, saleMethod: value }))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Distribution method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public Sale</SelectItem>
                        <SelectItem value="private">Private Sale Only</SelectItem>
                        <SelectItem value="airdrop">Airdrop</SelectItem>
                        <SelectItem value="mining">Mining/Staking</SelectItem>
                        <SelectItem value="earned">Earned through use</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="custodyModel">Custody Model</Label>
                    <Select value={inputs.custodyModel} onValueChange={(value) => setInputs(prev => ({ ...prev, custodyModel: value }))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="How tokens are held" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="self">Self-Custody</SelectItem>
                        <SelectItem value="platform">Platform Custody</SelectItem>
                        <SelectItem value="hybrid">Hybrid Model</SelectItem>
                        <SelectItem value="institutional">Institutional Custody</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Operational Details */}
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Operational Framework
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="targetGeos">Target Markets</Label>
                    <Input
                      id="targetGeos"
                      placeholder="e.g., Global, US/EU, MENA"
                      value={inputs.targetGeos}
                      onChange={(e) => setInputs(prev => ({ ...prev, targetGeos: e.target.value }))}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="teamLocation">Team Location</Label>
                    <Input
                      id="teamLocation"
                      placeholder="Primary team locations"
                      value={inputs.teamLocation}
                      onChange={(e) => setInputs(prev => ({ ...prev, teamLocation: e.target.value }))}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="revenueModel">Revenue Model</Label>
                    <Select value={inputs.revenueModel} onValueChange={(value) => setInputs(prev => ({ ...prev, revenueModel: value }))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="How you generate revenue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fees">Transaction Fees</SelectItem>
                        <SelectItem value="subscription">Subscription</SelectItem>
                        <SelectItem value="marketplace">Marketplace Commission</SelectItem>
                        <SelectItem value="staking">Staking/Rewards</SelectItem>
                        <SelectItem value="governance">Governance Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                    <Select value={inputs.riskTolerance} onValueChange={(value) => setInputs(prev => ({ ...prev, riskTolerance: value }))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Regulatory risk appetite" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conservative">Conservative</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="aggressive">Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardContent className="pt-6">
                  <Button 
                    onClick={handleAnalyze}
                    disabled={!canStartAnalysis()}
                    className="w-full h-12"
                    size="lg"
                  >
                    <Target className="w-5 h-5 mr-2" />
                    Analyze Jurisdictions
                  </Button>
                  {!canStartAnalysis() && (
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      Complete required fields to begin analysis
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Jurisdiction Selection */}
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-lg">Compare Jurisdictions</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Select jurisdictions to analyze
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockJurisdictions.slice(0, 4).map((jurisdiction) => (
                    <div 
                      key={jurisdiction.id}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedJurisdictions.includes(jurisdiction.id) 
                          ? 'bg-primary/5 border-primary' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleJurisdictionToggle(jurisdiction.id)}
                    >
                      <Checkbox 
                        checked={selectedJurisdictions.includes(jurisdiction.id)} 
                      />
                      <span className="text-2xl">{jurisdiction.flag}</span>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{jurisdiction.name}</p>
                        <p className="text-xs text-muted-foreground">{jurisdiction.code}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Analysis Preview */}
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-lg">Analysis Output</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>Jurisdiction heatmap</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Gavel className="w-4 h-4 text-muted-foreground" />
                    <span>Token classifications</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span>Compliance costs</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span>Structure recommendations</span>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <Badge variant="outline" className="w-full justify-center">
                    <Shield className="w-3 h-3 mr-1" />
                    Simulated for pilot
                  </Badge>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
    );
  }

  // Analysis Phase UI
  if (phase === 'analysis') {
    return (
      <main className="min-h-screen bg-background">
        {/* SubNav */}
        <section className="py-4 px-6 border-b bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <SubnavTabs />
          </div>
        </section>

        <div className="container mx-auto max-w-6xl py-8 px-6">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Analyzing Your Idea</h1>
            <p className="text-muted-foreground">
              Our AI is working through {selectedJurisdictions.length} jurisdiction frameworks and compliance requirements
            </p>
            <Badge className="mt-3" variant="outline">
              <div className="w-2 h-2 bg-success rounded-full mr-1 animate-pulse" />
              Simulated for Pilot
            </Badge>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            {/* Progress Content */}
            <div className="space-y-6">
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Analysis Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium">{currentAnalysisStep}</span>
                      <span className="text-sm text-muted-foreground">{Math.round(analysisProgress)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-primary to-primary-hover h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${analysisProgress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{selectedJurisdictions.length}</div>
                      <div className="text-xs text-muted-foreground">Jurisdictions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-secondary">6</div>
                      <div className="text-xs text-muted-foreground">Analysis Steps</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <ExplainPanel 
                title="AI Analysis Feed"
                entries={explainEntries}
                isActive={isAnalyzing}
                className="enterprise-card"
              />
            </div>

            {/* Sidebar */}
            <aside className="space-y-4">
              <ProgressStepper steps={progressSteps} />
              
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-lg">Input Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {inputs.whitepaper && (
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-sm truncate">{inputs.whitepaper.name}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-secondary" />
                    <span className="text-sm">{inputs.activities || 'Activity type'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="text-sm">{inputs.tokenPurpose || 'Token purpose'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-success" />
                    <span className="text-sm">{selectedJurisdictions.length} jurisdictions</span>
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </main>
    );
  }

  // Results Phase UI  
  if (phase === 'results' && results) {
    return (
      <main className="min-h-screen bg-background">
        {/* SubNav */}
        <section className="py-4 px-6 border-b bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <SubnavTabs />
          </div>
        </section>

        <div className="container mx-auto max-w-7xl py-8 px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Analysis Complete</h1>
            <p className="text-muted-foreground">
              Here's your comprehensive jurisdiction and business structure analysis
            </p>
            <div className="flex gap-3 mt-4">
              <Button variant="outline" onClick={() => setPhase('input')}>
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Refine Inputs
              </Button>
              <Link to="/launch-path/post-incorp">
                <Button>
                  Continue to Post-Incorp
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <Tabs defaultValue="heatmap" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="heatmap" className="text-sm">Jurisdiction Heatmap</TabsTrigger>
              <TabsTrigger value="tokens" className="text-sm">Token Classification</TabsTrigger>
              <TabsTrigger value="compliance" className="text-sm">Compliance Roadmap</TabsTrigger>
              <TabsTrigger value="structure" className="text-sm">Structure Recommendation</TabsTrigger>
            </TabsList>

            <TabsContent value="heatmap">
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Jurisdiction Comparison
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Scores based on regulatory clarity, cost efficiency, market credibility, and speed to market
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedJurisdictions.map(jurisdictionId => {
                      const jurisdiction = mockJurisdictions.find(j => j.id === jurisdictionId);
                      const scores = results.jurisdictionScores[jurisdictionId];
                      if (!jurisdiction || !scores) return null;

                      return (
                        <Card key={jurisdictionId} className="premium-card hover-lift">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                              <span className="text-3xl">{jurisdiction.flag}</span>
                              <div>
                                <h3 className="font-semibold text-lg">{jurisdiction.name}</h3>
                                <p className="text-sm text-muted-foreground">{jurisdiction.code}</p>
                              </div>
                            </div>
                            
                            <div className="space-y-4 mb-6">
                              {[
                                { label: 'Regulation', value: scores.regulation, color: 'primary' },
                                { label: 'Cost', value: scores.cost, color: 'secondary' },
                                { label: 'Credibility', value: scores.credibility, color: 'accent' },
                                { label: 'Speed', value: scores.speed, color: 'success' }
                              ].map(({ label, value, color }) => (
                                <div key={label} className="flex justify-between items-center">
                                  <span className="text-sm font-medium">{label}</span>
                                  <div className="flex items-center gap-3">
                                    <div className="w-20 bg-muted rounded-full h-2">
                                      <div 
                                        className={`bg-${color} h-2 rounded-full transition-all duration-1000`}
                                        style={{ width: `${value}%` }} 
                                      />
                                    </div>
                                    <span className="text-sm font-semibold min-w-8">{value}</span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="text-center">
                              <RiskDial 
                                score={scores.overall}
                                size="sm"
                                className="mx-auto mb-3"
                              />
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {scores.reasoning}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tokens">
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Token Classification Results
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    How your token is classified under each jurisdiction's regulatory framework
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {selectedJurisdictions.map(jurisdictionId => {
                      const jurisdiction = mockJurisdictions.find(j => j.id === jurisdictionId);
                      const classification = results.tokenClassifications[jurisdictionId];
                      if (!jurisdiction || !classification) return null;

                      return (
                        <Card key={jurisdictionId} className="premium-card">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{jurisdiction.flag}</span>
                                <div>
                                  <h3 className="font-semibold text-lg">{jurisdiction.name}</h3>
                                  <p className="text-sm text-muted-foreground">{jurisdiction.code}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge variant="secondary" className="mb-2">
                                  {classification.classification}
                                </Badge>
                                <div className="text-xs text-muted-foreground">
                                  {classification.confidence}% confidence
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-3 text-success flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4" />
                                  Benefits
                                </h4>
                                <ul className="space-y-2">
                                  {classification.implications.map((impl, index) => (
                                    <li key={index} className="text-sm flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0" />
                                      {impl}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-3 text-warning flex items-center gap-2">
                                  <AlertCircle className="w-4 h-4" />
                                  Requirements
                                </h4>
                                <ul className="space-y-2">
                                  {classification.requirements.map((req, index) => (
                                    <li key={index} className="text-sm flex items-start gap-2">
                                      <div className="w-1.5 h-1.5 bg-warning rounded-full mt-2 flex-shrink-0" />
                                      {req}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance">
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gavel className="w-5 h-5 text-primary" />
                    Compliance Roadmaps
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Detailed breakdown of licenses, filings, and compliance requirements with costs and timelines
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {selectedJurisdictions.map(jurisdictionId => {
                      const jurisdiction = mockJurisdictions.find(j => j.id === jurisdictionId);
                      const checklist = results.complianceChecklists[jurisdictionId];
                      if (!jurisdiction || !checklist) return null;

                      const totalCost = checklist.reduce((sum, item) => sum + item.cost, 0);
                      const totalDays = Math.max(...checklist.map(item => item.days));

                      return (
                        <Card key={jurisdictionId} className="premium-card">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{jurisdiction.flag}</span>
                                <div>
                                  <h3 className="font-semibold text-lg">{jurisdiction.name}</h3>
                                  <p className="text-sm text-muted-foreground">Compliance Roadmap</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold">${totalCost.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">{totalDays} days timeline</div>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              {checklist.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                                  <div className="flex-shrink-0">
                                    <Checkbox checked={item.required} disabled />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h4 className="font-medium">{item.name}</h4>
                                      <Badge variant={item.required ? "default" : "secondary"} className="text-xs">
                                        {item.required ? "Required" : "Optional"}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                      <span className="flex items-center gap-1">
                                        <DollarSign className="w-3 h-3" />
                                        ${item.cost.toLocaleString()}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {item.days} days
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="structure">
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    Recommended Business Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{results.businessStructure.recommended}</h3>
                        <p className="text-muted-foreground mb-4">{results.businessStructure.reasoning}</p>
                        {results.businessStructure.isHybrid && (
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="gold-accent">
                              <Globe className="w-3 h-3 mr-1" />
                              Hybrid Structure
                            </Badge>
                            <div className="flex gap-1">
                              {results.businessStructure.jurisdictions.map(jId => {
                                const j = mockJurisdictions.find(jurisdiction => jurisdiction.id === jId);
                                return j ? <span key={jId} className="text-lg">{j.flag}</span> : null;
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2 text-success">
                        <CheckCircle className="w-5 h-5" />
                        Key Benefits
                      </h4>
                      <div className="space-y-3">
                        {results.businessStructure.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm leading-relaxed">{benefit}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2 text-warning">
                        <AlertCircle className="w-5 h-5" />
                        Considerations
                      </h4>
                      <div className="space-y-3">
                        {results.businessStructure.considerations.map((consideration, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-warning rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm leading-relaxed">{consideration}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator className="my-8" />

                  <div className="flex flex-wrap gap-3">
                    <Button>
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Structure Documents
                    </Button>
                    <Button variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Send to Legal Review
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Explainable AI Sidebar */}
          <div className="mt-8">
            <ExplainPanel 
              title="Analysis Methodology"
              entries={explainEntries}
              className="enterprise-card"
            />
          </div>
        </div>
      </main>
    );
  }

  return null;
}