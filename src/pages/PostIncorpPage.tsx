// @modified - Post-Incorporation Risk Analysis with shared subnav
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
import { 
  Building, Upload, Target, TrendingUp, FileText, ArrowRight, 
  CheckCircle, AlertCircle, Info, Shield, Award, Globe
} from "lucide-react";
import { TEESimulator } from "@/lib/simulation";
import { mockJurisdictions, mockRiskScore, mockComplianceItems } from "@/lib/mock-data";
import { Link } from "react-router-dom";

export default function PostIncorpPage() {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [inputs, setInputs] = useState({
    jurisdiction: "",
    companyStage: "",
    tokenSpec: null as File | null,
    operationsOverview: "",
    targetMarkets: ""
  });
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [results, setResults] = useState<any>(null);
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
    status: analysisComplete ? "completed" as const :
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
    setStep(2);
    setExplainEntries([]);

    // Simulate TEE computation for risk analysis
    const steps = [
      "Validating incorporation documents and jurisdiction status...",
      "Classifying token under selected jurisdiction framework...",
      "Building interactive compliance map with dependencies...",
      "Computing comprehensive business risk score..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setAnalysisProgress((i + 1) / steps.length * 100);
      
      setExplainEntries(prev => [...prev, {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        type: 'analysis' as const,
        message: steps[i],
        confidence: Math.floor(Math.random() * 15) + 85
      }]);

      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Simulate TEE risk computation
    const { score, proof } = await TEESimulator.computeRisk([inputs]);
    
    setResults({
      tokenClassification: {
        classification: "Utility Token",
        jurisdiction: inputs.jurisdiction,
        confidence: 92,
        requirements: [
          "Consumer protection disclosures required",
          "Marketing restrictions on financial returns",
          "Ongoing compliance monitoring needed"
        ],
        implications: [
          "No securities registration required",
          "Simplified regulatory pathway",
          "Focus on utility and platform access"
        ]
      },
      complianceMap: mockComplianceItems,
      riskScore: { ...mockRiskScore, overall: score },
      teeProof: proof
    });

    setIsAnalyzing(false);
    setAnalysisComplete(true);
    setStep(3);

    // Add final analysis explanations
    setExplainEntries(prev => [...prev,
      {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        type: 'rule' as const,
        message: `Applied ${inputs.jurisdiction.toUpperCase()} regulatory framework`,
        details: "Used jurisdiction-specific rules for token classification and compliance requirements"
      },
      {
        id: (Date.now() + 1).toString(),
        timestamp: new Date().toISOString(),
        type: 'citation' as const,
        message: "Risk computation completed in secure enclave",
        details: proof
      }
    ]);
  };

  if (step === 2) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto max-w-6xl py-8 px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Analyzing Your Business</h1>
            <p className="text-muted-foreground">Generating comprehensive risk assessment and compliance mapping...</p>
            <Badge className="mt-2" variant="outline">
              <div className="w-2 h-2 bg-success rounded-full mr-1 animate-pulse" />
              Simulated TEE Computing
            </Badge>
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
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
                      <span>Risk Analysis</span>
                      <span>{Math.round(analysisProgress)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${analysisProgress}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <ExplainPanel 
                title="Risk Analysis Feed"
                entries={explainEntries}
                isActive={isAnalyzing}
              />
            </div>

            <aside className="space-y-4">
              <ProgressStepper steps={progressSteps} />
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
            <h1 className="text-3xl font-bold mb-2">Business Risk Analysis Complete</h1>
            <p className="text-muted-foreground">Your comprehensive compliance health report is ready.</p>
            <Badge className="mt-2" variant="outline">
              <Award className="w-3 h-3 mr-1" />
              Eligible for ZK Snapshot
            </Badge>
          </div>

          <Tabs defaultValue="classification" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="classification">Token Classification</TabsTrigger>
              <TabsTrigger value="compliance">Compliance Map</TabsTrigger>
              <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="classification">
              <Card>
                <CardHeader>
                  <CardTitle>Token Classification Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-[1fr_300px] gap-6">
                    <div className="space-y-6">
                      <Card className="p-6 bg-gradient-to-br from-success/5 to-transparent">
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

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2 text-success">Requirements</h4>
                            <ul className="space-y-1">
                              {results.tokenClassification.requirements.map((req: string, index: number) => (
                                <li key={index} className="text-sm flex items-start gap-2">
                                  <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2 text-primary">Benefits</h4>
                            <ul className="space-y-1">
                              {results.tokenClassification.implications.map((impl: string, index: number) => (
                                <li key={index} className="text-sm flex items-start gap-2">
                                  <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                                  {impl}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      <Card className="p-4">
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
                              {mockJurisdictions.find(j => j.id === inputs.jurisdiction)?.regulations.join(", ")}
                            </p>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4">
                        <h4 className="font-semibold mb-2">Next Steps</h4>
                        <div className="space-y-2">
                          <Button size="sm" className="w-full">
                            Generate ZK Proof
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            Send to Lawyer
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compliance">
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Compliance Map</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Click any item to see detailed requirements, costs, and dependencies
                  </p>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    {results.complianceMap.map((item: any, index: number) => (
                      <AccordionItem key={item.id} value={item.id} className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center justify-between w-full mr-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${
                                item.status === 'completed' ? 'bg-success' :
                                item.status === 'in-progress' ? 'bg-warning' :
                                'bg-muted-foreground'
                              }`} />
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
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-semibold mb-2">Details</h5>
                              <p className="text-sm text-muted-foreground mb-3">
                                {item.type === 'license' ? 'Regulatory license required for operation' :
                                 item.type === 'filing' ? 'Mandatory regulatory filing' :
                                 item.type === 'policy' ? 'Internal policy document required' :
                                 'Standard operating procedure'}
                              </p>
                              
                              {item.dependencies.length > 0 && (
                                <div>
                                  <h6 className="font-medium mb-1">Dependencies</h6>
                                  <ul className="text-sm text-muted-foreground">
                                    {item.dependencies.map((dep: string, i: number) => (
                                      <li key={i}>• {results.complianceMap.find((c: any) => c.id === dep)?.name || dep}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                            
                            <div>
                              <h5 className="font-semibold mb-2">Actions</h5>
                              <div className="space-y-2">
                                <Button size="sm" variant="outline" className="w-full">
                                  Generate from Doc Studio
                                </Button>
                                <Button size="sm" variant="outline" className="w-full">
                                  Upload Existing Document
                                </Button>
                                <Button size="sm" variant="outline" className="w-full">
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
              <Card>
                <CardHeader>
                  <CardTitle>Business Risk Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-[300px_1fr] gap-8">
                    {/* Risk Score */}
                    <div className="text-center">
                      <RiskDial score={results.riskScore.overall} size="lg" />
                      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium mb-1">Risk Grade</p>
                        <p className="text-xs text-muted-foreground">
                          Updated {new Date(results.riskScore.lastUpdated).toLocaleDateString()}
                        </p>
                        <Badge className="mt-2" variant="outline">
                          <Award className="w-3 h-3 mr-1" />
                          ZK Badge Eligible
                        </Badge>
                      </div>
                    </div>

                    {/* Risk Breakdown */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Risk Categories</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {Object.entries(results.riskScore.categories).map(([category, score]) => (
                            <Card key={category} className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium capitalize">{category}</h4>
                                <span className="text-2xl font-bold">{score as number}</span>
                              </div>
                              <div className="w-full bg-muted rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all duration-1000 ${
                                    (score as number) >= 80 ? 'bg-success' :
                                    (score as number) >= 60 ? 'bg-warning' : 'bg-destructive'
                                  }`}
                                  style={{ width: `${score}%` }}
                                />
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Risk Factors & Mitigation</h3>
                        <div className="space-y-3">
                          {results.riskScore.factors.map((factor: any, index: number) => (
                            <Card key={index} className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h5 className="font-medium">{factor.factor}</h5>
                                  <p className="text-sm text-muted-foreground capitalize">{factor.category}</p>
                                </div>
                                <Badge variant={
                                  factor.impact === 'high' ? 'destructive' :
                                  factor.impact === 'medium' ? 'secondary' : 'secondary'
                                }>
                                  {factor.impact} impact
                                </Badge>
                              </div>
                              {factor.mitigation && (
                                <div className="mt-2 p-2 bg-muted/50 rounded text-sm">
                                  <strong>Recommendation:</strong> {factor.mitigation}
                                </div>
                              )}
                            </Card>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg">
                        <h4 className="font-semibold mb-2">TEE Computation Proof</h4>
                        <p className="text-sm text-muted-foreground font-mono">
                          {results.teeProof}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between items-center mt-8">
            <Button variant="outline" onClick={() => setStep(1)}>
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Modify Inputs
            </Button>
            
            <div className="flex gap-3">
              <Button asChild variant="outline">
                <Link to="/co-review">
                  Send for Expert Review
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild>
                <Link to="/proofs">
                  Generate ZK Badge
                  <Award className="w-4 h-4 ml-2" />
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
      {/* SubNav */}
      <section className="py-4 px-6 border-b bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <SubnavTabs />
        </div>
      </section>

      {/* Hero Section */}
      <div className="container mx-auto max-w-4xl py-8 px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Building className="w-6 h-6 text-secondary" />
            <h1 className="text-3xl font-bold">Post-Incorporation Risk Analysis</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            For incorporated entities. Generate comprehensive business risk scores 
            and compliance maps eligible for ZK badge certification.
          </p>
          <Badge className="mt-2" variant="outline">
            <Info className="w-3 h-3 mr-1" />
            Simulated TEE Computing
          </Badge>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Incorporation Jurisdiction</Label>
                  <Select value={inputs.jurisdiction} onValueChange={(value) => setInputs(prev => ({ ...prev, jurisdiction: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockJurisdictions.map(jurisdiction => (
                        <SelectItem key={jurisdiction.id} value={jurisdiction.id}>
                          <div className="flex items-center gap-2">
                            <span>{jurisdiction.flag}</span>
                            <span>{jurisdiction.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Company Stage</Label>
                  <Select value={inputs.companyStage} onValueChange={(value) => setInputs(prev => ({ ...prev, companyStage: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select company stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="incorporated">Recently Incorporated</SelectItem>
                      <SelectItem value="mvp">MVP Development</SelectItem>
                      <SelectItem value="beta">Beta Testing</SelectItem>
                      <SelectItem value="live">Live Product</SelectItem>
                      <SelectItem value="revenue">Generating Revenue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Token Specification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Token Specification Document</Label>
                <DragDropZone
                  onFilesChange={handleFileUpload}
                  className="mt-2"
                />
                {inputs.tokenSpec && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    {inputs.tokenSpec.name}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Operations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Operations Overview</Label>
                <Textarea
                  value={inputs.operationsOverview}
                  onChange={(e) => setInputs(prev => ({ ...prev, operationsOverview: e.target.value }))}
                  placeholder="Describe your current business operations, team size, key activities..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label>Target Markets</Label>
                <Input
                  value={inputs.targetMarkets}
                  onChange={(e) => setInputs(prev => ({ ...prev, targetMarkets: e.target.value }))}
                  placeholder="e.g., Institutional DeFi, Retail Gaming, B2B Infrastructure"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <Button variant="outline" asChild>
              <Link to="/launch-path">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Back to Launch Path
              </Link>
            </Button>
            
            <Button 
              onClick={handleAnalyze}
              disabled={!inputs.jurisdiction || !inputs.companyStage}
              size="lg"
              className="h-12 px-8"
            >
              <Target className="w-4 h-4 mr-2" />
              Analyze Risk
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}