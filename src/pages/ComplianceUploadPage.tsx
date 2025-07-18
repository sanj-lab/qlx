import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Shield, CheckCircle, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function ComplianceUploadPage() {
  const { secureMode, setSecureMode } = useAuth();
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [businessDescription, setBusinessDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const simulateUpload = async () => {
    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 150));
    }

    setUploading(false);
    // Navigate to jurisdiction selection
    navigate('/compliance/jurisdiction');
  };

  const hasContent = uploadedFiles.length > 0 || businessDescription.trim().length > 0;

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Upload Business Documents
          </h1>
          <p className="text-muted-foreground">
            Upload whitepapers, business plans, or describe your business model for compliance analysis
          </p>
        </div>

        {/* Secure Mode */}
        <Card className="enterprise-card mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>
                  Your business documents will be processed with enterprise-grade security
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
                  <span className="font-medium">Trusted Execution Environment Active</span>
                </div>
                <p className="text-sm text-success/80 mt-1">
                  Business documents processed in hardware-isolated secure environment
                </p>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Upload Area */}
        <Card className="enterprise-card mb-8">
          <CardHeader>
            <CardTitle>Document Upload</CardTitle>
            <CardDescription>
              Upload whitepapers, business plans, or token documentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Drop files here or click to browse</h3>
              <p className="text-muted-foreground mb-4">
                Supported formats: .pdf, .docx, .txt (Max 25MB per file)
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.docx,.txt,.doc"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  Select Files
                </label>
              </Button>
            </div>

            {/* File List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-6 space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">Uploaded Files:</h4>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span className="font-medium">{file.name}</span>
                      <span className="text-sm text-muted-foreground">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Progress */}
            {uploading && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Processing files...</span>
                  <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Business Model Description */}
        <Card className="enterprise-card mb-8">
          <CardHeader>
            <CardTitle>Business Model Description</CardTitle>
            <CardDescription>
              Alternatively, describe your business model, token structure, and operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Describe your business model, target markets, token utility, revenue streams, operational framework, and any existing partnerships or compliance measures..."
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                className="min-h-[120px]"
              />
              <div className="text-sm text-muted-foreground">
                {businessDescription.length}/2000 characters
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Example Input */}
        <Card className="enterprise-card mb-8">
          <CardHeader>
            <CardTitle>Example Business Description</CardTitle>
            <CardDescription>
              Use this as a template for describing your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 p-4 rounded-lg text-sm">
              <p className="text-muted-foreground">
                "We are building a decentralized lending protocol that allows users to borrow against crypto collateral. 
                Our native governance token (LEND) provides voting rights and fee sharing. We operate across EU, US, and UAE markets. 
                Revenue comes from lending fees (2-5% APR). We partner with licensed custodians for asset storage and have implemented KYC/AML procedures. 
                Our target users are institutional investors and high-net-worth individuals seeking crypto-backed loans."
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3"
              onClick={() => setBusinessDescription("We are building a decentralized lending protocol that allows users to borrow against crypto collateral. Our native governance token (LEND) provides voting rights and fee sharing. We operate across EU, US, and UAE markets. Revenue comes from lending fees (2-5% APR). We partner with licensed custodians for asset storage and have implemented KYC/AML procedures. Our target users are institutional investors and high-net-worth individuals seeking crypto-backed loans.")}
            >
              Use This Example
            </Button>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/compliance')}>
            Back to Compliance Overview
          </Button>
          <Button 
            onClick={simulateUpload}
            disabled={!hasContent || uploading}
            className="min-w-[200px]"
          >
            {uploading ? 'Processing...' : 'Continue to Jurisdiction Selection'}
          </Button>
        </div>
      </div>
    </div>
  );
}