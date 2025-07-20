import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield, 
  Copy, 
  Share2, 
  ChevronRight, 
  Lightbulb, 
  Clock,
  CheckCircle2,
  Link,
  Hash,
  Calendar,
  ExternalLink
} from "lucide-react";

export default function ProofGeneratorPage() {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [complianceSource, setComplianceSource] = useState("");
  const [comments, setComments] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isGenerated, setIsGenerated] = useState(false);

  const documents = [
    { id: "saft-1", name: "SAFT Agreement v2.1", type: "SAFT", lastReview: "2024-01-15", score: 87 },
    { id: "charter-1", name: "DAO Charter", type: "Charter", lastReview: "2024-01-10", score: 92 },
    { id: "terms-1", name: "Terms of Service", type: "Terms", lastReview: "2024-01-08", score: 78 }
  ];

  const handleGenerateProof = async () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate ZK proof generation
    const steps = [
      "Retrieving stored hashes and metadata...",
      "Validating timestamp integrity...",
      "Generating Zero-Knowledge proof...",
      "Creating verifiable badge...",
      "Uploading to IPFS..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setProgress((i + 1) * 20);
    }
    
    setIsGenerating(false);
    setIsGenerated(true);
  };

  const selectedDoc = documents.find(doc => doc.id === selectedDocument);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Regulatory Compliance Proof Generator</h1>
          <p className="text-muted-foreground">Convert compliance results into verifiable ZK proofs with timestamped badges</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Configuration */}
          <div className="lg:col-span-1">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Proof Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Document</label>
                  <Select value={selectedDocument} onValueChange={setSelectedDocument}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose document" />
                    </SelectTrigger>
                    <SelectContent>
                      {documents.map(doc => (
                        <SelectItem key={doc.id} value={doc.id}>
                          {doc.name} ({doc.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedDoc && (
                    <div className="mt-2 p-3 bg-muted/30 rounded-lg">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Last Review: {selectedDoc.lastReview}</span>
                        <Badge variant="secondary">Score: {selectedDoc.score}%</Badge>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Compliance Source</label>
                  <Select value={complianceSource} onValueChange={setComplianceSource}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="redline">Redline Agent Review</SelectItem>
                      <SelectItem value="jurisdiction">Jurisdiction Score</SelectItem>
                      <SelectItem value="manual">Manual Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Additional Comments (Optional)</label>
                  <Textarea 
                    placeholder="Add any amendments or additional context..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleGenerateProof}
                  disabled={!selectedDocument || !complianceSource || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Generating Proof...
                    </>
                  ) : (
                    <>
                      Generate Proof Badge
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
                      <span className="text-sm font-medium">ZK Proof Generation Progress</span>
                      <span className="text-sm text-muted-foreground">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="grid gap-3">
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm">Retrieving {complianceSource} metadata and hashes</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm">Validating timestamp and hash integrity</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm">Generating cryptographic proof of compliance</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Generated Proof */}
            {isGenerated && (
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    Verifiable Compliance Badge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Proof Badge Preview */}
                    <div className="p-6 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">Compliance Verification Badge</h3>
                          <p className="text-sm text-muted-foreground">ZK-Verified • Timestamped • Immutable</p>
                        </div>
                        <Badge className="bg-success text-success-foreground">Verified</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Document:</span>
                          <p className="font-medium">{selectedDoc?.name}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Source:</span>
                          <p className="font-medium">{complianceSource} | {selectedDoc?.score}% Score</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Jurisdiction:</span>
                          <p className="font-medium">UAE Jurisdiction</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Generated:</span>
                          <p className="font-medium">{new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    {/* Hash & Timestamp */}
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Hash className="w-4 h-4" />
                            <span className="font-medium">Proof Hash</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <p className="text-xs font-mono text-muted-foreground break-all">
                          0x8f9e2c1a5b4d3e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b
                        </p>
                      </div>

                      <div className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Link className="w-4 h-4" />
                            <span className="font-medium">IPFS Link</span>
                          </div>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </div>
                        <p className="text-xs font-mono text-muted-foreground break-all">
                          ipfs://QmX7Y8Z9A0B1C2D3E4F5G6H7I8J9K0L1M2N3O4P5Q6R7S8T9U0V1W2X3Y4Z5A6B7C
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <Button className="w-full" onClick={() => window.open('/share-room', '_blank')}>
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Badge with VC
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => window.open('/share-room', '_blank')}>
                        <Link className="w-4 h-4 mr-2" />
                        Attach to Share Room
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Explanation Panel */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    This proof certifies that your legal document met compliance requirements at the time of review. 
                    This verification uses Zero-Knowledge cryptography to ensure confidentiality.
                  </p>
                  <p>
                    The badge can be shared with investors, regulators, or auditors without revealing the underlying 
                    document content, providing verifiable compliance while maintaining privacy.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}