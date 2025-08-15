// @modified - Enterprise-grade Post-Incorporation Risk Analysis
import { useState, useEffect } from "react";
import { SubnavTabs } from "@/components/ui/subnav-tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProgressStepper } from "@/components/ui/progress-stepper";
import { ExplainPanel } from "@/components/ui/explain-panel";
import { RiskDial } from "@/components/ui/risk-dial";
import { DragDropZone } from "@/components/ui/drag-drop-zone";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { 
  Building, Upload, Target, TrendingUp, FileText, ArrowRight, 
  CheckCircle, AlertCircle, Info, Shield, Award, Globe,
  Zap, Calendar, DollarSign, Users, Briefcase, Clock,
  BarChart3, Download, Share, ExternalLink
} from "lucide-react";
import { TEESimulator } from "@/lib/simulation";
import { mockJurisdictions, mockRiskScore, mockComplianceItems } from "@/lib/mock-data";
import { Link } from "react-router-dom";

interface PostIncorpInputs {
  jurisdiction: string;
  companyStage: string;
  tokenSpec: File | null;
  operationsOverview: string;
  targetMarkets: string;
}

interface TokenClassification {
  classification: string;
  confidence: number;
  jurisdiction: string;
  requirements: string[];
  implications: string[];
  reasoning: string;
}

interface ComplianceItem {
  id: string;
  name: string;
  type: 'license' | 'filing' | 'policy' | 'procedure';
  status: 'not-started' | 'in-progress' | 'completed';
  cost: number;
  estimatedDays: number;
  required: boolean;
  description: string;
  dependencies: string[];
  dueDate?: string;
}

interface RiskBreakdown {
  overall: number;
  categories: {
    legal: number;
    financial: number;
    governance: number;
    market: number;
  };
  factors: Array<{
    name: string;
    impact: 'high' | 'medium' | 'low';
    score: number;
    mitigation: string;
  }>;
}

interface AnalysisResults {
  tokenClassification: TokenClassification;
  complianceMap: ComplianceItem[];
  riskScore: RiskBreakdown;
  teeProof: string;
  isSnapshotEligible: boolean;
}

export default function PostIncorpPage() {
  const [phase, setPhase] = useState<'input' | 'analysis' | 'results'>('input');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [inputs, setInputs] = useState<PostIncorpInputs>({
    jurisdiction: "",
    companyStage: "",
    tokenSpec: null,
    operationsOverview: "",
    targetMarkets: ""
  });
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [explainEntries, setExplainEntries] = useState<any[]>([]);

  useEffect(() => {
    document.title = "Post-Incorporation Risk Analysis – Quentlex";
  }, []);

  const progressSteps = [
    { id: "validate", label: "Validate Inputs", status: "pending" as const },
    { id: "classify", label: "Token Classification", status: "pending" as const },
    { id: "map", label: "Compliance Mapping", status: "pending" as const },
    { id: "score", label: "Risk Scoring", status: "pending" as const }
  ].map((step, index) => ({
    ...step,
    status: phase === 'results' ? "completed" as const :
            index === Math.floor(analysisProgress / 100 * 4) ? "active" as const :
            index < Math.floor(analysisProgress / 100 * 4) ? "completed" as const : "pending" as const
  }));

  const handleFileUpload = (files: File[]) => {
    if (files[0]) {
      setInputs(prev => ({ ...prev, tokenSpec: files[0] }));
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setPhase('analysis');
    setExplainEntries([]);
    setAnalysisProgress(0);

    const steps = [
      "Validating incorporation documents and jurisdiction status...",
      "Classifying token under selected jurisdiction framework...",
      "Building interactive compliance map with dependencies...",
      "Computing comprehensive business risk score using TEE..."
    ];

    try {
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(steps[i]);
        setAnalysisProgress(((i + 1) / steps.length) * 100);
        
        setExplainEntries(prev => [...prev, {
          id: `${Date.now()}-${i}`,
          timestamp: new Date().toISOString(),
          type: i % 2 === 0 ? 'analysis' as const : 'rule' as const,
          message: steps[i],
          confidence: 85 + Math.floor(Math.random() * 15)
        }]);

        await new Promise(resolve => setTimeout(resolve, 2500));
      }

      // Simulate TEE risk computation
      const { score, proof } = await TEESimulator.computeRisk([inputs]);
      
      const mockResults: AnalysisResults = {
        tokenClassification: {
          classification: "Utility Token",
          confidence: 94,
          jurisdiction: inputs.jurisdiction,
          requirements: [
            "Consumer protection disclosures required",
            "Marketing restrictions on financial returns", 
            "Ongoing compliance monitoring needed",
            "AML/KYC procedures for platform access"
          ],
          implications: [
            "No securities registration required",
            "Simplified regulatory pathway",
            "Focus on utility and platform access",
            "Reduced investor protection requirements"
          ],
          reasoning: "Token primarily serves platform utility functions without investment characteristics"
        },
        complianceMap: [
          {
            id: "vara-license",
            name: "VARA Virtual Asset License",
            type: "license",
            status: "not-started",
            cost: 85000,
            estimatedDays: 90,
            required: true,
            description: "Primary operating license for virtual asset activities in UAE",
            dependencies: [],
            dueDate: "2024-06-30"
          },
          {
            id: "aml-program",
            name: "AML/CFT Compliance Program", 
            type: "policy",
            status: "in-progress",
            cost: 35000,
            estimatedDays: 45,
            required: true,
            description: "Anti-money laundering and counter-terrorism financing framework",
            dependencies: ["vara-license"]
          },
          {
            id: "consumer-protection",
            name: "Consumer Protection Framework",
            type: "policy", 
            status: "not-started",
            cost: 25000,
            estimatedDays: 30,
            required: true,
            description: "Consumer safeguards and disclosure requirements",
            dependencies: ["vara-license"]
          },
          {
            id: "ongoing-monitoring",
            name: "Ongoing Compliance Monitoring",
            type: "procedure",
            status: "not-started", 
            cost: 15000,
            estimatedDays: 14,
            required: false,
            description: "Continuous regulatory reporting and monitoring system",
            dependencies: ["aml-program", "consumer-protection"]
          }
        ],
        riskScore: {
          overall: score,
          categories: {
            legal: 78,
            financial: 85,
            governance: 72,
            market: 88
          },
          factors: [
            { name: "Regulatory Clarity", impact: "high", score: 92, mitigation: "Strong VARA framework provides clear guidelines" },
            { name: "Token Classification Risk", impact: "medium", score: 88, mitigation: "Utility classification reduces securities risk" },
            { name: "Compliance Cost", impact: "medium", score: 75, mitigation: "Phased implementation reduces immediate costs" },
            { name: "Market Access", impact: "low", score: 85, mitigation: "UAE provides strong regional market access" },
            { name: "Technology Risk", impact: "medium", score: 82, mitigation: "Standard blockchain technology with proven track record" }
          ]
        },
        teeProof: proof,
        isSnapshotEligible: true
      };

      setResults(mockResults);
      setPhase('results');

      // Add final explanatory entries
      setExplainEntries(prev => [...prev,
        {
          id: `final-${Date.now()}`,
          timestamp: new Date().toISOString(),
          type: 'citation' as const,
          message: "Risk computation completed in secure enclave",
          details: "TEE-verified risk score eligible for ZK snapshot generation",
          confidence: 98
        }
      ]);

    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const canStartAnalysis = () => {
    return inputs.jurisdiction && inputs.companyStage && 
           (inputs.tokenSpec || inputs.operationsOverview.length > 50);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success';
      case 'in-progress': return 'bg-warning';
      default: return 'bg-muted-foreground';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
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
              <Building className="w-4 h-4" />
              Post-Incorporation Analysis
            </div>
            <h1 className="text-4xl font-bold mb-4">Measure your compliance health</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate jurisdiction-specific risk assessments and compliance roadmaps 
              ready for investor due diligence and regulatory verification.
            </p>
          </div>
        </section>

        <div className="container mx-auto max-w-6xl p-6">
          <div className="grid lg:grid-cols-[1fr_300px] gap-8">
            {/* Main Input Form */}
            <div className="space-y-8">
              {/* Jurisdiction & Stage */}
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Company Details
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Basic information about your incorporated entity
                  </p>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="jurisdiction">Incorporation Jurisdiction</Label>
                    <Select value={inputs.jurisdiction} onValueChange={(value) => setInputs(prev => ({ ...prev, jurisdiction: value }))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select jurisdiction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uae">🇦🇪 United Arab Emirates</SelectItem>
                        <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                        <SelectItem value="eu">🇪🇺 European Union</SelectItem>
                        <SelectItem value="sg">🇸🇬 Singapore</SelectItem>
                        <SelectItem value="ch">🇨🇭 Switzerland</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="companyStage">Company Stage</Label>
                    <Select value={inputs.companyStage} onValueChange={(value) => setInputs(prev => ({ ...prev, companyStage: value }))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select company stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="early">Early Stage (Pre-Product)</SelectItem>
                        <SelectItem value="mvp">MVP / Beta</SelectItem>
                        <SelectItem value="launch">Product Launch</SelectItem>
                        <SelectItem value="growth">Growth Stage</SelectItem>
                        <SelectItem value="scale">Scale / Series A+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Token Specification */}
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Token Specification
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Upload your tokenomics or describe your token mechanics
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Token Specification Document</Label>
                    <DragDropZone
                      onFilesChange={handleFileUpload}
                      className="mt-2"
                    />
                    {inputs.tokenSpec && (
                      <div className="flex items-center gap-2 mt-3 p-3 bg-success/5 border border-success/20 rounded-lg">
                        <FileText className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium">{inputs.tokenSpec.name}</span>
                        <CheckCircle className="w-4 h-4 text-success ml-auto" />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="operationsOverview">Operations Overview</Label>
                    <Textarea
                      id="operationsOverview"
                      placeholder="Describe your current operations, token mechanics, revenue model, and key business activities..."
                      value={inputs.operationsOverview}
                      onChange={(e) => setInputs(prev => ({ ...prev, operationsOverview: e.target.value }))}
                      className="mt-2 min-h-32"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum 50 characters • {inputs.operationsOverview.length}/1000
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="targetMarkets">Target Markets</Label>
                    <Input
                      id="targetMarkets"
                      placeholder="e.g., Global retail, Institutional DeFi, Regional banking"
                      value={inputs.targetMarkets}
                      onChange={(e) => setInputs(prev => ({ ...prev, targetMarkets: e.target.value }))}
                      className="mt-2"
                    />
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
                    Generate Risk Analysis
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
              {/* Analysis Preview */}
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-lg">Analysis Output</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-muted-foreground" />
                    <span>Token classification</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <span>Interactive compliance map</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span>TEE-verified risk score</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-muted-foreground" />
                    <span>ZK snapshot eligibility</span>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <Badge variant="outline" className="w-full justify-center">
                    <Shield className="w-3 h-3 mr-1" />
                    Simulated for pilot
                  </Badge>
                </CardContent>
              </Card>

              {/* Jurisdiction Info */}
              {inputs.jurisdiction && (
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Jurisdiction Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const jurisdiction = mockJurisdictions.find(j => j.id === inputs.jurisdiction);
                      return jurisdiction ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{jurisdiction.flag}</span>
                            <div>
                              <p className="font-medium">{jurisdiction.name}</p>
                              <p className="text-xs text-muted-foreground">{jurisdiction.code}</p>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            <p>Regulations: {jurisdiction.regulations.slice(0, 2).join(", ")}</p>
                            <p>Complexity: {jurisdiction.complexity}</p>
                            <p>Time to Market: {jurisdiction.timeToMarket}</p>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </CardContent>
                </Card>
              )}
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
            <h1 className="text-3xl font-bold mb-2">Analyzing Your Business</h1>
            <p className="text-muted-foreground">
              Generating comprehensive risk assessment and compliance mapping for {inputs.jurisdiction.toUpperCase()}
            </p>
            <Badge className="mt-3" variant="outline">
              <div className="w-2 h-2 bg-success rounded-full mr-1 animate-pulse" />
              Simulated TEE Computing
            </Badge>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            {/* Progress Content */}
            <div className="space-y-6">
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Risk Analysis Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium">{currentStep}</span>
                      <span className="text-sm text-muted-foreground">{Math.round(analysisProgress)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-primary to-primary-hover h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${analysisProgress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">TEE</div>
                      <div className="text-xs text-muted-foreground">Secure Computing</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-secondary">4</div>
                      <div className="text-xs text-muted-foreground">Analysis Steps</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent">ZK</div>
                      <div className="text-xs text-muted-foreground">Badge Ready</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <ExplainPanel 
                title="Risk Analysis Feed"
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
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="text-sm">{inputs.jurisdiction.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-secondary" />
                    <span className="text-sm">{inputs.companyStage}</span>
                  </div>
                  {inputs.tokenSpec && (
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-accent" />
                      <span className="text-sm truncate">{inputs.tokenSpec.name}</span>
                    </div>
                  )}
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
            <h1 className="text-3xl font-bold mb-2">Business Risk Analysis Complete</h1>
            <p className="text-muted-foreground">
              Your comprehensive compliance health report is ready for investor diligence
            </p>
            
            <div className="flex items-center gap-4 mt-4">
              {results.isSnapshotEligible && (
                <Badge className="bg-success/10 text-success border-success/20">
                  <Award className="w-3 h-3 mr-1" />
                  Eligible for ZK Snapshot
                </Badge>
              )}
              <Badge variant="outline">
                <Shield className="w-3 h-3 mr-1" />
                TEE-Verified Score
              </Badge>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setPhase('input')}>
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Refine Analysis
              </Button>
              <Link to="/proofs">
                <Button>
                  Generate ZK Snapshot
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          <Tabs defaultValue="classification" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="classification">Token Classification</TabsTrigger>
              <TabsTrigger value="compliance">Compliance Map</TabsTrigger>
              <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="classification">
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    Token Classification Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-[1fr_300px] gap-8">
                    <div className="space-y-6">
                      <Card className="premium-card bg-gradient-to-br from-success/5 to-transparent">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold mb-2">{results.tokenClassification.classification}</h3>
                              <p className="text-muted-foreground">
                                Under {mockJurisdictions.find(j => j.id === inputs.jurisdiction)?.name} regulations
                              </p>
                            </div>
                            <Badge className="bg-success/10 text-success">
                              {results.tokenClassification.confidence}% Confidence
                            </Badge>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold mb-3 text-warning flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                Requirements
                              </h4>
                              <ul className="space-y-2">
                                {results.tokenClassification.requirements.map((req, index) => (
                                  <li key={index} className="text-sm flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-warning rounded-full mt-2 flex-shrink-0" />
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-3 text-success flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                Benefits
                              </h4>
                              <ul className="space-y-2">
                                {results.tokenClassification.implications.map((impl, index) => (
                                  <li key={index} className="text-sm flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0" />
                                    {impl}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                            <h4 className="font-semibold mb-2">Classification Reasoning</h4>
                            <p className="text-sm text-muted-foreground">{results.tokenClassification.reasoning}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      <Card className="premium-card">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">Jurisdiction</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">
                              {mockJurisdictions.find(j => j.id === inputs.jurisdiction)?.flag}
                            </span>
                            <div>
                              <p className="font-medium">
                                {mockJurisdictions.find(j => j.id === inputs.jurisdiction)?.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {mockJurisdictions.find(j => j.id === inputs.jurisdiction)?.regulations.slice(0, 2).join(", ")}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="premium-card">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-3">Next Steps</h4>
                          <div className="space-y-2">
                            <Button size="sm" className="w-full">
                              <Award className="w-4 h-4 mr-2" />
                              Generate ZK Proof
                            </Button>
                            <Button size="sm" variant="outline" className="w-full">
                              <Users className="w-4 h-4 mr-2" />
                              Send to Lawyer
                            </Button>
                            <Button size="sm" variant="outline" className="w-full">
                              <Download className="w-4 h-4 mr-2" />
                              Export Report
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance">
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Interactive Compliance Map
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Click any item to see detailed requirements, costs, and dependencies
                  </p>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    {results.complianceMap.map((item) => (
                      <AccordionItem key={item.id} value={item.id} className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center justify-between w-full mr-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`} />
                              <span className="font-medium">{item.name}</span>
                              <Badge variant={item.required ? "default" : "secondary"}>
                                {item.required ? "Required" : "Optional"}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>${item.cost.toLocaleString()}</span>
                              <span>•</span>
                              <span>{item.estimatedDays} days</span>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h5 className="font-semibold mb-2">Details</h5>
                              <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                              
                              {item.dependencies.length > 0 && (
                                <div>
                                  <h6 className="font-medium mb-1">Dependencies</h6>
                                  <ul className="text-sm text-muted-foreground">
                                    {item.dependencies.map((dep, i) => (
                                      <li key={i}>• {results.complianceMap.find((c) => c.id === dep)?.name || dep}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {item.dueDate && (
                                <div className="mt-3">
                                  <h6 className="font-medium mb-1">Due Date</h6>
                                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {new Date(item.dueDate).toLocaleDateString()}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <h5 className="font-semibold mb-2">Actions</h5>
                              <div className="space-y-2">
                                <Button size="sm" variant="outline" className="w-full">
                                  <FileText className="w-4 h-4 mr-2" />
                                  Generate from Doc Studio
                                </Button>
                                <Button size="sm" variant="outline" className="w-full">
                                  <Upload className="w-4 h-4 mr-2" />
                                  Upload Existing Document
                                </Button>
                                <Button size="sm" variant="outline" className="w-full">
                                  <Users className="w-4 h-4 mr-2" />
                                  Get Expert Help
                                </Button>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risk">
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Business Risk Analysis
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    TEE-verified risk assessment with category breakdown and mitigation strategies
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-[300px_1fr] gap-8">
                    {/* Risk Score */}
                    <div className="text-center">
                      <RiskDial score={results.riskScore.overall} size="lg" />
                      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm font-medium mb-1">Risk Grade</p>
                        <p className="text-xs text-muted-foreground mb-3">
                          TEE-verified computation
                        </p>
                        <Badge variant="outline" className="w-full justify-center">
                          <Award className="w-3 h-3 mr-1" />
                          ZK Badge Eligible
                        </Badge>
                      </div>
                    </div>

                    {/* Risk Breakdown */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-4">Risk Categories</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(results.riskScore.categories).map(([category, score]) => (
                            <div key={category} className="p-3 bg-muted/30 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium capitalize">{category}</span>
                                <span className="text-sm font-semibold">{score}</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full transition-all duration-1000"
                                  style={{ width: `${score}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-4">Risk Factors & Mitigation</h4>
                        <div className="space-y-3">
                          {results.riskScore.factors.map((factor, index) => (
                            <Card key={index} className="premium-card">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <h5 className="font-medium">{factor.name}</h5>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className={getImpactColor(factor.impact)}>
                                      {factor.impact} impact
                                    </Badge>
                                    <span className="text-sm font-semibold">{factor.score}</span>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{factor.mitigation}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-8" />

                  <div className="flex flex-wrap gap-3">
                    <Button>
                      <Award className="w-4 h-4 mr-2" />
                      Generate ZK Snapshot
                    </Button>
                    <Button variant="outline">
                      <Share className="w-4 h-4 mr-2" />
                      Share with Investors
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export Risk Report
                    </Button>
                    <Button variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Schedule Legal Review
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Explainable AI */}
          <div className="mt-8">
            <ExplainPanel 
              title="Risk Computation Methodology"
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