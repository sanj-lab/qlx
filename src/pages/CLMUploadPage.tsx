import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Shield, CheckCircle, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function CLMUploadPage() {
  const { secureMode, setSecureMode } = useAuth();
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
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
    navigate('/clm/jurisdiction');
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Upload Contract Documents
          </h1>
          <p className="text-muted-foreground">
            Upload your smart contracts, legal documents, or text files for AI analysis
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
                  Your documents will be processed with enterprise-grade security
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
                  Documents processed in hardware-isolated secure environment
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
              Supported formats: .sol (Solidity), .pdf (Legal docs), .txt (Text files)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Drop files here or click to browse</h3>
              <p className="text-muted-foreground mb-4">
                Maximum file size: 10MB per file
              </p>
              <input
                type="file"
                multiple
                accept=".sol,.pdf,.txt"
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
                      {getFileIcon(file.name)}
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
                  <span className="text-sm font-medium">Uploading files...</span>
                  <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/clm')}>
            Back to CLM Overview
          </Button>
          <Button 
            onClick={simulateUpload}
            disabled={uploadedFiles.length === 0 || uploading}
            className="min-w-[200px]"
          >
            {uploading ? 'Processing...' : 'Continue to Jurisdiction Selection'}
          </Button>
        </div>
      </div>
    </div>
  );
}