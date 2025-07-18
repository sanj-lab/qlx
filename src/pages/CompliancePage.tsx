import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Upload, Scale, Shield, Zap, CheckCircle, Globe, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function CompliancePage() {
  const [secureMode, setSecureMode] = useState(false);

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Scale className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Regulatory Compliance Scanner
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive compliance scanning for whitepapers, business models, and token launches across multiple jurisdictions.
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
                  Configure how your business documents are processed
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="secure-mode-compliance">Secure Mode (TEE)</Label>
                <Switch
                  id="secure-mode-compliance"
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
                  Your business documents will be processed in a secure, isolated environment with hardware-level attestation.
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
              <span>Upload Business Documents</span>
            </CardTitle>
            <CardDescription>
              Upload whitepapers, business plans, or paste in business model descriptions for compliance analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Drop files here or click to browse</h3>
              <p className="text-muted-foreground mb-4">
                Supported formats: .pdf, .docx, .txt (Max 25MB per file)
              </p>
              <Button>
                Select Files
              </Button>
            </div>

            <div className="mt-6">
              <div className="text-center mb-4">
                <span className="text-sm text-muted-foreground">OR</span>
              </div>
              <div className="border rounded-lg p-4">
                <Label htmlFor="business-model" className="text-sm font-medium">
                  Paste Business Model Description
                </Label>
                <textarea
                  id="business-model"
                  className="w-full mt-2 p-3 border rounded-md resize-none"
                  rows={4}
                  placeholder="Describe your business model, token structure, target markets, and operational framework..."
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium">Whitepapers</h4>
                <p className="text-sm text-muted-foreground">Project documentation</p>
              </div>
              <div className="text-center">
                <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium">Business Plans</h4>
                <p className="text-sm text-muted-foreground">Operational strategies</p>
              </div>
              <div className="text-center">
                <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-medium">Token Models</h4>
                <p className="text-sm text-muted-foreground">Tokenomics & utility</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supported Jurisdictions */}
        <Card className="enterprise-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Supported Jurisdictions</span>
            </CardTitle>
            <CardDescription>
              Our compliance engine covers major regulatory frameworks worldwide
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">EU</span>
                </div>
                <div>
                  <h4 className="font-medium">EU MiCA</h4>
                  <p className="text-xs text-muted-foreground">Markets in Crypto-Assets</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">US</span>
                </div>
                <div>
                  <h4 className="font-medium">US SEC</h4>
                  <p className="text-xs text-muted-foreground">Securities Regulations</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">AE</span>
                </div>
                <div>
                  <h4 className="font-medium">UAE VARA</h4>
                  <p className="text-xs text-muted-foreground">Virtual Asset Authority</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">SG</span>
                </div>
                <div>
                  <h4 className="font-medium">Singapore MAS</h4>
                  <p className="text-xs text-muted-foreground">Monetary Authority</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">JP</span>
                </div>
                <div>
                  <h4 className="font-medium">Japan FSA</h4>
                  <p className="text-xs text-muted-foreground">Financial Services</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg opacity-60">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-muted-foreground">+</span>
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground">More Coming</h4>
                  <p className="text-xs text-muted-foreground">Additional jurisdictions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Pipeline */}
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Compliance Analysis Pipeline</span>
            </CardTitle>
            <CardDescription>
              What happens during the compliance scan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Entity Structure Analysis</h4>
                  <p className="text-sm text-muted-foreground">Identify business structure, token utility, and operational model</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Regulatory Mapping</h4>
                  <p className="text-sm text-muted-foreground">Map business activities to applicable regulations across selected jurisdictions</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Gap Analysis</h4>
                  <p className="text-sm text-muted-foreground">Identify missing documentation, licensing requirements, and compliance gaps</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-primary">4</span>
                </div>
                <div>
                  <h4 className="font-medium">Risk Assessment</h4>
                  <p className="text-sm text-muted-foreground">Generate compliance dashboard with risk matrix and actionable recommendations</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <Button asChild className="w-full">
                <Link to="/compliance/upload">
                  Start Compliance Review
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="enterprise-card p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Scale className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">License Detection</h3>
            <p className="text-sm text-muted-foreground">Automatically identify required licenses and registrations per jurisdiction</p>
          </Card>
          
          <Card className="enterprise-card p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Filing Requirements</h3>
            <p className="text-sm text-muted-foreground">Get comprehensive lists of required documents and filing deadlines</p>
          </Card>
          
          <Card className="enterprise-card p-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Risk Matrix</h3>
            <p className="text-sm text-muted-foreground">Visual risk assessment with jurisdiction-specific compliance scores</p>
          </Card>
        </div>
      </div>
    </div>
  );
}