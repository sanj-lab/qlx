import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  FileCheck, 
  Download, 
  Code, 
  ChevronRight, 
  Lightbulb, 
  Clock,
  CheckCircle2,
  FileText,
  Shield,
  Globe
} from "lucide-react";

export default function DocumentGeneratorPage() {
  const [jurisdiction, setJurisdiction] = useState("");
  const [tokenModel, setTokenModel] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isGenerated, setIsGenerated] = useState(false);

  const documents = [
    { id: "saft", name: "SAFT Agreement", description: "Simple Agreement for Future Tokens" },
    { id: "charter", name: "DAO Charter", description: "Decentralized organization governance" },
    { id: "privacy", name: "Privacy Policy", description: "GDPR/CCPA compliant policy" },
    { id: "terms", name: "Terms of Service", description: "Platform usage terms" },
    { id: "whitepaper", name: "Regulatory Whitepaper", description: "Compliance-focused technical document" }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate AI generation process
    const steps = [
      "Analyzing jurisdiction requirements...",
      "Processing token model compliance...",
      "Generating document templates...",
      "Applying regulatory frameworks...",
      "Finalizing documents..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress((i + 1) * 20);
    }
    
    setIsGenerating(false);
    setIsGenerated(true);
  };

  const toggleDoc = (docId: string) => {
    setSelectedDocs(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Modular Legal Document Generator</h1>
          <p className="text-muted-foreground">Generate SAFT, DAO Charter, Privacy Policy based on jurisdiction and token model</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Configuration */}
          <div className="lg:col-span-1">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5" />
                  Document Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Jurisdiction</label>
                  <Select value={jurisdiction} onValueChange={setJurisdiction}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usa">🇺🇸 United States</SelectItem>
                      <SelectItem value="eu">🇪🇺 European Union</SelectItem>
                      <SelectItem value="singapore">🇸🇬 Singapore</SelectItem>
                      <SelectItem value="uae">🇦🇪 UAE</SelectItem>
                      <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Token Model</label>
                  <Select value={tokenModel} onValueChange={setTokenModel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select token type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utility">Utility Token</SelectItem>
                      <SelectItem value="security">Security Token</SelectItem>
                      <SelectItem value="governance">Governance Token</SelectItem>
                      <SelectItem value="nft">NFT Collection</SelectItem>
                      <SelectItem value="stablecoin">Stablecoin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Company Type</label>
                  <Select value={companyType} onValueChange={setCompanyType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="llc">LLC</SelectItem>
                      <SelectItem value="corporation">C-Corporation</SelectItem>
                      <SelectItem value="dao">DAO</SelectItem>
                      <SelectItem value="foundation">Foundation</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Documents to Generate</label>
                  <div className="space-y-3">
                    {documents.map(doc => (
                      <div key={doc.id} className="flex items-start space-x-3">
                        <Checkbox 
                          id={doc.id}
                          checked={selectedDocs.includes(doc.id)}
                          onCheckedChange={() => toggleDoc(doc.id)}
                        />
                        <div className="flex-1">
                          <label htmlFor={doc.id} className="text-sm font-medium cursor-pointer">
                            {doc.name}
                          </label>
                          <p className="text-xs text-muted-foreground">{doc.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleGenerate}
                  disabled={!jurisdiction || !tokenModel || !companyType || selectedDocs.length === 0 || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Generating Docs...
                    </>
                  ) : (
                    <>
                      Generate Docs
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
            {isGenerating && (
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
                      <span className="text-sm font-medium">Document Generation Progress</span>
                      <span className="text-sm text-muted-foreground">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="grid gap-3">
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm">Analyzing {jurisdiction?.toUpperCase()} regulatory framework for {tokenModel} tokens</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm">Customizing templates for {companyType} entity structure</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm">Ensuring compliance with local registration requirements</span>
                      </div>
                    </div>
                    
                    {/* TEE Simulation */}
                    <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">TEE Verification Active</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Intel SGX enclave securing template generation and ensuring reproducible document hashing
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Generated Documents */}
            {isGenerated && (
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    Generated Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {selectedDocs.map(docId => {
                      const doc = documents.find(d => d.id === docId);
                      return (
                        <div key={docId} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">{doc?.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Customized for {jurisdiction?.toUpperCase()} • {tokenModel} • {companyType}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                            <Button size="sm">
                              <Code className="w-4 h-4 mr-1" />
                              Export to Smart Contract
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-success mt-0.5" />
                      <div>
                        <p className="font-medium text-success">Compliance Verification</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          All documents have been generated with jurisdiction-specific compliance requirements. 
                          Ready for legal review and filing.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start">
                    <Globe className="w-4 h-4 mr-2" />
                    Compare Jurisdictions
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileCheck className="w-4 h-4 mr-2" />
                    Request Legal Review
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Generate ZK Proof
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export All Documents
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