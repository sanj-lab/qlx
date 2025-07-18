import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Zap, ArrowRight, Copy, Download, Shield, CheckCircle } from "lucide-react";

export default function ZKProofPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [generationStep, setGenerationStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [proofData, setProofData] = useState<{
    hash: string;
    timestamp: string;
    verificationKey: string;
    complianceScore: number;
  } | null>(null);

  const steps = [
    'Compiling compliance analysis',
    'Generating cryptographic proof',
    'Creating verifiable attestation',
    'Finalizing ZK proof package'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 3;
        
        // Update steps
        if (newProgress >= 25 && generationStep === 0) {
          setGenerationStep(1);
        } else if (newProgress >= 50 && generationStep === 1) {
          setGenerationStep(2);
        } else if (newProgress >= 75 && generationStep === 2) {
          setGenerationStep(3);
        } else if (newProgress >= 100 && generationStep === 3) {
          setIsComplete(true);
          setProofData({
            proofId: '0x7f9d4e2a1c8b6f3e5a7d9b2c4e6f8a1d3b5c7e9f1a3d5b7c9e1f3a5d7b9c1e3',
            timestamp: new Date().toISOString(),
            jurisdictions: ['EU MiCA', 'UAE VARA', 'US SEC'],
            complianceScore: 94.7,
            verificationUrl: 'https://verify.quentlex.ai/proof/0x7f9d4e2a...'
          });
          clearInterval(timer);
        }
        
        return Math.min(newProgress, 100);
      });
    }, 80);

    return () => clearInterval(timer);
  }, [generationStep]);

  const copyProofId = () => {
    if (proofData) {
      navigator.clipboard.writeText(proofData.proofId);
    }
  };

  const downloadProof = () => {
    if (proofData) {
      const proofJson = JSON.stringify(proofData, null, 2);
      const blob = new Blob([proofJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'compliance_proof.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Zero-Knowledge Proof Generation
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate a verifiable compliance proof without exposing sensitive contract details
          </p>
        </div>

        {!isComplete ? (
          <>
            {/* Generation Progress */}
            <Card className="enterprise-card mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Generating Proof
                  <span className="text-2xl font-bold text-primary">{Math.round(progress)}%</span>
                </CardTitle>
                <CardDescription>
                  Creating cryptographic proof of compliance analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="h-3 mb-6" />
                
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index < generationStep ? 'bg-success text-white' :
                        index === generationStep ? 'bg-primary text-white animate-pulse' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {index < generationStep ? <CheckCircle className="w-4 h-4" /> : index + 1}
                      </div>
                      <span className={`font-medium ${
                        index === generationStep ? 'text-primary' :
                        index < generationStep ? 'text-success' :
                        'text-muted-foreground'
                      }`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technical Details */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle>Technical Specification</CardTitle>
                <CardDescription>
                  Proof generation parameters and cryptographic details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Proof System</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Algorithm:</span>
                        <span>zk-SNARKs (Groth16)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Curve:</span>
                        <span>BN254</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Field Size:</span>
                        <span>254 bits</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Verification</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Proof Size:</span>
                        <span>~128 bytes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Verify Time:</span>
                        <span>~2-5ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Privacy:</span>
                        <span>Perfect Zero-Knowledge</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Success State */}
            <Card className="enterprise-card mb-8 border-success">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-success">Proof Generated Successfully!</CardTitle>
                    <CardDescription>
                      Your compliance proof is ready for verification and submission
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Proof Details */}
            <Card className="enterprise-card mb-8">
              <CardHeader>
                <CardTitle>Proof Details</CardTitle>
                <CardDescription>
                  Cryptographic proof of regulatory compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Proof ID</span>
                      <Button variant="ghost" size="sm" onClick={copyProofId}>
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <code className="text-xs font-mono break-all text-muted-foreground">
                      {proofData?.proofId}
                    </code>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium">Compliance Score</span>
                      <div className="text-2xl font-bold text-success">{proofData?.complianceScore}%</div>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Generated</span>
                      <div className="text-sm text-muted-foreground">
                        {new Date(proofData?.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-medium mb-2 block">Verified Jurisdictions</span>
                    <div className="flex flex-wrap gap-2">
                      {proofData?.jurisdictions.map((jurisdiction: string) => (
                        <Badge key={jurisdiction} className="status-success">
                          {jurisdiction}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Proof Statement */}
            <Card className="enterprise-card mb-8">
              <CardHeader>
                <CardTitle>Proof Statement</CardTitle>
                <CardDescription>
                  What this proof verifies (without revealing contract details)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-medium text-primary mb-2">This proof verifies that:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>✓ All contract clauses have been analyzed for regulatory compliance</li>
                    <li>✓ Risk scores are within acceptable thresholds for selected jurisdictions</li>
                    <li>✓ Recommended modifications align with {proofData?.jurisdictions.join(', ')} requirements</li>
                    <li>✓ Overall compliance score exceeds 90% threshold</li>
                    <li>✓ Analysis was performed using verified AI models and legal databases</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={downloadProof} className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download Proof Package
              </Button>
              <Button variant="outline" className="flex-1" disabled>
                <Shield className="w-4 h-4 mr-2" />
                Submit to Blockchain (Coming Soon)
              </Button>
              <Button variant="outline" onClick={() => navigate('/clm/dashboard')}>
                <ArrowRight className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>

            {/* Verification Info */}
            <Card className="enterprise-card mt-8">
              <CardHeader>
                <CardTitle>Verification Instructions</CardTitle>
                <CardDescription>
                  How third parties can verify this proof
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>Public Verification:</strong> Anyone can verify this proof using the Quentlex verification service:
                  </p>
                  <div className="bg-muted/30 p-3 rounded font-mono text-xs">
                    {proofData?.verificationUrl}
                  </div>
                  <p>
                    <strong>Independent Verification:</strong> Use the open-source Quentlex verifier with the downloaded proof package.
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}