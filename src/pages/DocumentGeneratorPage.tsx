import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
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
  Globe,
  Archive,
  Scale,
  Edit3,
  Lock,
  Database,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

export default function DocumentGeneratorPage() {
  const navigate = useNavigate();
  const [jurisdiction, setJurisdiction] = useState("");
  const [tokenModel, setTokenModel] = useState("");
  const [companyType, setCompanyType] = useState("");
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isGenerated, setIsGenerated] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showJurisdictionModal, setShowJurisdictionModal] = useState(false);
  const [showVaultModal, setShowVaultModal] = useState(false);
  const [showSmartContractModal, setShowSmartContractModal] = useState(false);
  const [documentContent, setDocumentContent] = useState("");

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
                      <SelectItem value="all">🌍 All Jurisdictions</SelectItem>
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
                        <div key={docId} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-primary" />
                              <div>
                                <p className="font-medium">{doc?.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  Customized for {jurisdiction?.toUpperCase()} • {tokenModel} • {companyType}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <Button size="sm" variant="outline" onClick={() => setShowDocumentModal(true)}>
                              <FileText className="w-4 h-4 mr-1" />
                              View/Edit
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setShowVaultModal(true)}>
                              <Archive className="w-4 h-4 mr-1" />
                              Legal Vault
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setShowSmartContractModal(true)}>
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
                  <Button variant="outline" className="justify-start" onClick={() => setShowJurisdictionModal(true)}>
                    <Globe className="w-4 h-4 mr-2" />
                    Compare Jurisdictions
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/review-routing')}>
                    <FileCheck className="w-4 h-4 mr-2" />
                    Request Legal Review
                  </Button>
                  <Button variant="outline" className="justify-start" onClick={() => navigate('/proof-generator')}>
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

      {/* Document Review Modal */}
      <Dialog open={showDocumentModal} onOpenChange={setShowDocumentModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Document Review & Edit
            </DialogTitle>
            <DialogDescription>
              Review and edit the generated document with proper formatting
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Textarea
              value={documentContent || "SIMPLE AGREEMENT FOR FUTURE TOKENS (SAFT)\n\nThis Simple Agreement for Future Tokens (this \"Agreement\") is entered into...\n\n[Document content would be loaded here with proper DOCX formatting]"}
              onChange={(e) => setDocumentContent(e.target.value)}
              className="min-h-[400px] font-mono text-sm"
              placeholder="Document content..."
            />
            
            <div className="flex gap-3">
              <Button>
                <Edit3 className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download DOCX
              </Button>
              <Button variant="outline" onClick={() => navigate('/vault')}>
                <Archive className="w-4 h-4 mr-2" />
                Save to Vault
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Jurisdiction Comparison Modal */}
      <Dialog open={showJurisdictionModal} onOpenChange={setShowJurisdictionModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              Jurisdiction Comparison Analysis
            </DialogTitle>
            <DialogDescription>
              Enterprise-grade agentic workflow simulation for jurisdiction analysis
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">🇺🇸 United States</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Compliance Score:</strong> 78%</p>
                  <p><strong>Setup Time:</strong> 2-4 weeks</p>
                  <p><strong>Cost:</strong> $15,000-25,000</p>
                  <p><strong>Key Requirements:</strong> SEC compliance, state registration</p>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">🇪🇺 European Union</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Compliance Score:</strong> 85%</p>
                  <p><strong>Setup Time:</strong> 3-6 weeks</p>
                  <p><strong>Cost:</strong> €12,000-20,000</p>
                  <p><strong>Key Requirements:</strong> MiCA compliance, GDPR</p>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">🇦🇪 UAE</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Compliance Score:</strong> 92%</p>
                  <p><strong>Setup Time:</strong> 1-3 weeks</p>
                  <p><strong>Cost:</strong> $8,000-15,000</p>
                  <p><strong>Key Requirements:</strong> VARA license, local presence</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h4 className="font-medium mb-2">AI Recommendation</h4>
              <p className="text-sm text-muted-foreground">
                Based on your token model ({tokenModel}) and entity type ({companyType}), 
                UAE offers the most favorable regulatory environment with fastest setup time and lowest costs.
              </p>
            </div>
            
            <Button className="w-full">
              Generate Jurisdiction-Specific Documents
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Legal Vault Modal */}
      <Dialog open={showVaultModal} onOpenChange={setShowVaultModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Archive className="w-5 h-5 text-primary" />
              Vault Document to Legal Memory
            </DialogTitle>
            <DialogDescription>
              Securely store and organize generated documents in the Legal Vault
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">SAFT Agreement v2.1</p>
                  <p className="text-sm text-muted-foreground">Generated for {jurisdiction?.toUpperCase()} • {tokenModel} • {companyType}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">File Size:</span>
                  <p className="font-medium">2.4 MB</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Format:</span>
                  <p className="font-medium">DOCX, PDF</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Document Category</label>
                <Select defaultValue="legal-agreements">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="legal-agreements">Legal Agreements</SelectItem>
                    <SelectItem value="compliance-docs">Compliance Documents</SelectItem>
                    <SelectItem value="corporate-docs">Corporate Documents</SelectItem>
                    <SelectItem value="regulatory-filings">Regulatory Filings</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Access Level</label>
                <Select defaultValue="confidential">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="internal">Internal</SelectItem>
                    <SelectItem value="confidential">Confidential</SelectItem>
                    <SelectItem value="restricted">Restricted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Tags</label>
              <Input placeholder="e.g., SAFT, token-sale, regulatory, compliance" />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea 
                placeholder="Brief description of the document and its purpose..."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Vault Security Features</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Shield className="w-5 h-5 text-success" />
                  <div>
                    <p className="text-sm font-medium">End-to-End Encryption</p>
                    <p className="text-xs text-muted-foreground">AES-256 encryption</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Lock className="w-5 h-5 text-success" />
                  <div>
                    <p className="text-sm font-medium">Access Control</p>
                    <p className="text-xs text-muted-foreground">Role-based permissions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Database className="w-5 h-5 text-success" />
                  <div>
                    <p className="text-sm font-medium">Version Control</p>
                    <p className="text-xs text-muted-foreground">Automatic versioning</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <div>
                    <p className="text-sm font-medium">Audit Trail</p>
                    <p className="text-xs text-muted-foreground">Complete access logs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-primary">AI-Powered Organization</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Our AI will automatically categorize, tag, and organize your document based on its content 
                    and jurisdiction requirements for easy retrieval.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1" onClick={() => {
                // Simulate vaulting process
                setTimeout(() => {
                  setShowVaultModal(false);
                  alert("Document successfully vaulted to Legal Memory!");
                }, 1000);
              }}>
                <Archive className="w-4 h-4 mr-2" />
                Vault Document
              </Button>
              <Button variant="outline" onClick={() => navigate('/vault')}>
                <Database className="w-4 h-4 mr-2" />
                Open Vault
              </Button>
              <Button variant="outline" onClick={() => setShowVaultModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Smart Contract Export Modal */}
      <Dialog open={showSmartContractModal} onOpenChange={setShowSmartContractModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Export Document to Smart Contract
            </DialogTitle>
            <DialogDescription>
              Convert legal document terms into executable smart contract code
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">SAFT Agreement Terms</p>
                  <p className="text-sm text-muted-foreground">Converting to Solidity smart contract</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Blockchain Network</label>
                <Select defaultValue="ethereum">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="polygon">Polygon</SelectItem>
                    <SelectItem value="arbitrum">Arbitrum</SelectItem>
                    <SelectItem value="base">Base</SelectItem>
                    <SelectItem value="bsc">BSC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Contract Type</label>
                <Select defaultValue="erc20">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="erc20">ERC-20 Token</SelectItem>
                    <SelectItem value="erc721">ERC-721 NFT</SelectItem>
                    <SelectItem value="erc1155">ERC-1155 Multi-Token</SelectItem>
                    <SelectItem value="custom">Custom Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Extractable Contract Terms</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked />
                    <div>
                      <p className="text-sm font-medium">Token Vesting Schedule</p>
                      <p className="text-xs text-muted-foreground">12-month cliff, 36-month linear vesting</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Automated</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked />
                    <div>
                      <p className="text-sm font-medium">Purchase Rights</p>
                      <p className="text-xs text-muted-foreground">Minimum $10,000, Maximum $1,000,000</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Automated</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked />
                    <div>
                      <p className="text-sm font-medium">Discount Rate</p>
                      <p className="text-xs text-muted-foreground">20% discount on token sale price</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Automated</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" />
                    <div>
                      <p className="text-sm font-medium">Governance Rights</p>
                      <p className="text-xs text-muted-foreground">Voting weight based on token allocation</p>
                    </div>
                  </div>
                  <Badge variant="outline">Manual Review</Badge>
                </div>
              </div>
            </div>

            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                <div>
                  <p className="font-medium text-warning">Security Notice</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Smart contract code will be generated based on legal terms. Please conduct thorough 
                    security audits before deployment to mainnet.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Generated Contract Preview</h4>
              <div className="p-4 bg-muted/50 rounded-lg font-mono text-sm">
                <div className="text-muted-foreground mb-2">// SAFT.sol - Generated Smart Contract</div>
                <div className="space-y-1">
                  <div>pragma solidity ^0.8.19;</div>
                  <div></div>
                  <div>contract SAFTAgreement &#123;</div>
                  <div className="ml-4">uint256 public constant CLIFF_DURATION = 365 days;</div>
                  <div className="ml-4">uint256 public constant VESTING_DURATION = 1095 days;</div>
                  <div className="ml-4">uint256 public constant DISCOUNT_RATE = 20;</div>
                  <div className="ml-4">uint256 public constant MIN_PURCHASE = 10000e18;</div>
                  <div className="ml-4">uint256 public constant MAX_PURCHASE = 1000000e18;</div>
                  <div className="ml-4">...</div>
                  <div>&#125;</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1">
                <Code className="w-4 h-4 mr-2" />
                Generate Full Contract
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Solidity Files
              </Button>
              <Button variant="outline">
                <Shield className="w-4 h-4 mr-2" />
                Request Security Audit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}