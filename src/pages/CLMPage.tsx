import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Shield, Zap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function CLMPage() {
  const [secureMode, setSecureMode] = useState(false);

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Contract Lifecycle Management
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-powered contract analysis with clause-by-clause redlining, risk scoring, and jurisdiction-specific compliance verification.
          </p>
        </div>

        {/* Secure Mode Toggle */}
        <Card className="enterprise-card mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>
                  Configure how your contract data is processed
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="secure-mode">Secure Mode (TEE)</Label>
                <Switch
                  id="secure-mode"
                  checked={secureMode}
                  onCheckedChange={setSecureMode}
                />
              </div>
            </div>
          </CardHeader>
          {secureMode && (
            <CardContent>
              <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-success">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Trusted Execution Environment Enabled</span>
                </div>
                <p className="text-sm text-success/80 mt-1">
                  Your contract data will be processed in a secure, isolated environment with hardware-level attestation.
                </p>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Upload Section */}
        <Card className="enterprise-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Upload Contract Documents</span>
            </CardTitle>
            <CardDescription>
              Upload smart contracts (.sol), legal documents (.pdf), or text files (.txt) for analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Drop files here or click to browse</h3>
              <p className="text-muted-foreground mb-4">
                Supported formats: .sol, .pdf, .txt (Max 10MB per file)
              </p>
              <Button>
                Select Files
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium">Smart Contracts</h4>
                <p className="text-sm text-muted-foreground">Solidity files</p>
              </div>
              <div className="text-center">
                <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium">Legal Documents</h4>
                <p className="text-sm text-muted-foreground">PDF contracts</p>
              </div>
              <div className="text-center">
                <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium">Text Files</h4>
                <p className="text-sm text-muted-foreground">Plain text agreements</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Analysis Pipeline</span>
            </CardTitle>
            <CardDescription>
              What happens after you upload your documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Document Processing</h4>
                  <p className="text-sm text-muted-foreground">Extract and parse contract clauses, terms, and conditions</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Jurisdiction Selection</h4>
                  <p className="text-sm text-muted-foreground">Choose applicable regulatory frameworks (EU MiCA, US SEC, UAE VARA, etc.)</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-medium">AI Analysis</h4>
                  <p className="text-sm text-muted-foreground">Agentic AI performs clause-by-clause analysis with explainable reasoning</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-primary">4</span>
                </div>
                <div>
                  <h4 className="font-medium">Results & Proofs</h4>
                  <p className="text-sm text-muted-foreground">Review redlined documents and generate zero-knowledge compliance proofs</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <Button asChild className="w-full">
                <Link to="/clm/upload">
                  Continue to Document Upload
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="enterprise-card p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Clause Analysis</h3>
            <p className="text-sm text-muted-foreground">Identify and analyze individual contract clauses with AI-powered redlining</p>
          </Card>
          
          <Card className="enterprise-card p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Risk Scoring</h3>
            <p className="text-sm text-muted-foreground">Get comprehensive risk scores for each clause and overall contract</p>
          </Card>
          
          <Card className="enterprise-card p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">ZK Proofs</h3>
            <p className="text-sm text-muted-foreground">Generate verifiable compliance proofs without exposing contract details</p>
          </Card>
        </div>
      </div>
    </div>
  );
}