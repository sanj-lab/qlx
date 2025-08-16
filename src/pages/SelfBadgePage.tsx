import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VaultPicker } from "@/components/ui/vault-picker";
import { ProofProgress } from "@/components/ui/proof-progress";
import { SnapshotCard } from "@/components/ui/snapshot-card";
import { DragDropZone } from "@/components/ui/drag-drop-zone";
import { ArrowLeft, Zap, Upload, Building2, Lightbulb, FileText, Sparkles, MapPin, Shield } from "lucide-react";
import { EnhancedProofSimulator } from "@/lib/enhanced-simulation";
import type { SnapshotInput, ProofSnapshot } from "@/lib/enhanced-simulation";
import { ProgressStep } from "@/components/ui/progress-stepper";
import { ExplainEntry } from "@/components/ui/explain-panel";

export default function SelfBadgePage() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState<'import' | 'upload' | 'business' | 'idea' | 'custom' | null>(null);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>("");
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<ProgressStep[]>([]);
  const [explainEntries, setExplainEntries] = useState<ExplainEntry[]>([]);
  const [generatedSnapshot, setGeneratedSnapshot] = useState<ProofSnapshot | null>(null);

  useEffect(() => {
    document.title = "Self-Reviewed Badge – Quentlex";
  }, []);

  const jurisdictions = [
    { value: "uae", label: "🇦🇪 UAE" },
    { value: "us", label: "🇺🇸 United States" },
    { value: "uk", label: "🇬🇧 United Kingdom" },
    { value: "eu", label: "🇪🇺 European Union" },
    { value: "sg", label: "🇸🇬 Singapore" },
    { value: "ca", label: "🇨🇦 Canada" }
  ];

  const handleGenerateBadge = async () => {
    setIsGenerating(true);
    setGeneratedSnapshot(null);
    setCurrentStep(0);
    setExplainEntries([]);

    // Create mock inputs based on selected mode
    const inputs: SnapshotInput[] = [];
    
    if (selectedMode === 'import' && selectedDocuments.length > 0) {
      inputs.push({
        type: 'document',
        title: `${selectedDocuments.length} selected document(s)`,
        content: 'Imported from vault',
        metadata: { source: 'vault', count: selectedDocuments.length }
      });
    } else if (selectedMode === 'upload' && uploadedFiles.length > 0) {
      uploadedFiles.forEach(file => {
        inputs.push({
          type: 'document',
          title: file.name,
          content: 'Uploaded document',
          metadata: { size: file.size, type: file.type }
        });
      });
    } else if (selectedMode === 'business') {
      inputs.push({
        type: 'business',
        title: 'Whole Business Analysis',
        content: 'Complete business risk assessment',
        metadata: { scope: 'complete' }
      });
    } else if (selectedMode === 'idea') {
      inputs.push({
        type: 'idea',
        title: 'Business Idea Badge',
        content: 'Business idea compliance check',
        metadata: { scope: 'idea' }
      });
    } else if (selectedMode === 'custom') {
      inputs.push({
        type: 'custom',
        title: 'Custom Analysis',
        content: customPrompt,
        metadata: { jurisdiction: selectedJurisdiction }
      });
    }

    // Initialize steps
    const progressSteps: ProgressStep[] = [
      { id: 'analyze', label: 'Analyzing inputs', status: 'active' },
      { id: 'classify', label: 'Token classification', status: 'pending' },
      { id: 'assess', label: 'Risk assessment', status: 'pending' },
      { id: 'generate', label: 'Generating badge', status: 'pending' }
    ];
    setSteps(progressSteps);

    try {
      const simulator = new EnhancedProofSimulator();
      const { snapshot, steps: simulationSteps } = await simulator.generateSnapshot(inputs, 'self');

      // Simulate progress updates
      for (let i = 0; i < progressSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setSteps(prev => prev.map((step, index) => ({
          ...step,
          status: index < i ? 'completed' : index === i ? 'active' : 'pending'
        })));
        
        setCurrentStep(i);
        
        // Add explain entries
        if (simulationSteps[i]) {
          setExplainEntries(prev => [...prev, {
            id: `step-${i}`,
            timestamp: new Date().toISOString(),
            title: simulationSteps[i].title,
            message: simulationSteps[i].content,
            type: 'info' as const
          }]);
        }
      }

      // Complete final step
      setSteps(prev => prev.map(step => ({ ...step, status: 'completed' })));
      setGeneratedSnapshot(snapshot);
      
    } catch (error) {
      console.error('Badge generation error:', error);
      setSteps(prev => prev.map((step, index) => 
        index === currentStep ? { ...step, status: 'error' } : step
      ));
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExpertReview = () => {
    if (generatedSnapshot) {
      navigate('/proofs/expert-badge', { 
        state: { existingBadge: generatedSnapshot } 
      });
    }
  };

  const resetForm = () => {
    setSelectedMode(null);
    setSelectedDocuments([]);
    setUploadedFiles([]);
    setSelectedJurisdiction("");
    setCustomPrompt("");
    setIsGenerating(false);
    setCurrentStep(0);
    setSteps([]);
    setExplainEntries([]);
    setGeneratedSnapshot(null);
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="py-8 px-6 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/proofs')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Proofs
            </Button>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Self-Reviewed Badge</h1>
            <Badge variant="secondary">ZK‑Verified</Badge>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            Generate compliance badges from existing results or create new analysis. 
            Choose your input method and get a verifiable badge in minutes.
          </p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Input Options */}
            <div className="space-y-6">
              {!selectedMode && (
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Choose Input Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant="outline"
                        className="h-24 flex-col gap-2 hover-lift"
                        onClick={() => setSelectedMode('import')}
                      >
                        <FileText className="w-6 h-6 text-primary" />
                        <span className="text-sm font-medium">Import from Vault</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="h-24 flex-col gap-2 hover-lift"
                        onClick={() => setSelectedMode('upload')}
                      >
                        <Upload className="w-6 h-6 text-primary" />
                        <span className="text-sm font-medium">Upload Documents</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="h-24 flex-col gap-2 hover-lift"
                        onClick={() => setSelectedMode('business')}
                      >
                        <Building2 className="w-6 h-6 text-primary" />
                        <span className="text-sm font-medium">Whole Business</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        className="h-24 flex-col gap-2 hover-lift"
                        onClick={() => setSelectedMode('idea')}
                      >
                        <Lightbulb className="w-6 h-6 text-primary" />
                        <span className="text-sm font-medium">Business Idea</span>
                      </Button>
                    </div>
                    
                    <Button
                      variant="outline"
                      className="w-full h-16 flex items-center gap-3 hover-lift"
                      onClick={() => setSelectedMode('custom')}
                    >
                      <MapPin className="w-5 h-5 text-primary" />
                      <div className="text-left">
                        <div className="font-medium">Custom Analysis</div>
                        <div className="text-xs text-muted-foreground">Jurisdiction-specific or custom requirements</div>
                      </div>
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Import from Vault */}
              {selectedMode === 'import' && (
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Import from Legal Vault
                      </span>
                      <Button variant="ghost" size="sm" onClick={resetForm}>Change Method</Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <VaultPicker
                      trigger={
                        <Button variant="outline" className="w-full justify-start">
                          <FileText className="w-4 h-4 mr-2" />
                          Select from vault ({selectedDocuments.length} selected)
                        </Button>
                      }
                      selected={selectedDocuments}
                      onSelectionChange={setSelectedDocuments}
                      maxSelection={10}
                      title="Select Documents or Analysis"
                      description="Choose existing business analysis, risk scores, or documents"
                    />
                    
                    {selectedDocuments.length > 0 && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          {selectedDocuments.length} item(s) selected for badge generation
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Upload Documents */}
              {selectedMode === 'upload' && (
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Upload className="w-5 h-5 text-primary" />
                        Upload New Documents
                      </span>
                      <Button variant="ghost" size="sm" onClick={resetForm}>Change Method</Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DragDropZone
                      onFilesDrop={setUploadedFiles}
                      acceptedTypes={["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"]}
                      maxFiles={5}
                      maxSizeMB={10}
                    />
                    
                    {uploadedFiles.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                            <span className="text-sm">{file.name}</span>
                            <Badge variant="outline">{(file.size / 1024 / 1024).toFixed(1)}MB</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Business/Idea Options */}
              {(selectedMode === 'business' || selectedMode === 'idea') && (
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        {selectedMode === 'business' ? <Building2 className="w-5 h-5 text-primary" /> : <Lightbulb className="w-5 h-5 text-primary" />}
                        {selectedMode === 'business' ? 'Whole Business Badge' : 'Business Idea Badge'}
                      </span>
                      <Button variant="ghost" size="sm" onClick={resetForm}>Change Method</Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        {selectedMode === 'business' 
                          ? 'Generate a comprehensive badge based on your complete business profile and existing compliance data.'
                          : 'Create a badge for a specific business idea or concept for early-stage validation.'
                        }
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Custom Analysis */}
              {selectedMode === 'custom' && (
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        Custom Analysis
                      </span>
                      <Button variant="ghost" size="sm" onClick={resetForm}>Change Method</Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Jurisdiction</label>
                      <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select jurisdiction" />
                        </SelectTrigger>
                        <SelectContent>
                          {jurisdictions.map(jurisdiction => (
                            <SelectItem key={jurisdiction.value} value={jurisdiction.value}>
                              {jurisdiction.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Requirements</label>
                      <Textarea
                        placeholder="Describe specific badge requirements, compliance areas, or custom analysis needs..."
                        value={customPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        className="min-h-[100px] resize-none"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Generate Button */}
              {selectedMode && !isGenerating && !generatedSnapshot && (
                <Card className="enterprise-card">
                  <CardContent className="pt-6">
                    <Button 
                      onClick={handleGenerateBadge}
                      className="w-full h-12 text-base font-semibold"
                      disabled={
                        (selectedMode === 'import' && selectedDocuments.length === 0) ||
                        (selectedMode === 'upload' && uploadedFiles.length === 0) ||
                        (selectedMode === 'custom' && (!selectedJurisdiction || !customPrompt.trim()))
                      }
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Generate Self-Reviewed Badge
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Progress & Results */}
            <div className="space-y-6">
              {isGenerating && (
                <ProofProgress
                  isActive={isGenerating}
                  currentStep={currentStep}
                  steps={steps}
                  explainEntries={explainEntries}
                  title="Self Badge Generation"
                />
              )}

              {generatedSnapshot && (
                <div className="space-y-4">
                  <SnapshotCard 
                    snapshot={generatedSnapshot}
                    onVerify={() => {}}
                    onShare={() => {}}
                  />
                  
                  <Card className="enterprise-card">
                    <CardContent className="pt-6 space-y-3">
                      <Button onClick={handleExpertReview} className="w-full">
                        <Shield className="w-4 h-4 mr-2" />
                        Send for Expert Review
                      </Button>
                      <Button variant="outline" onClick={resetForm} className="w-full">
                        Generate Another Badge
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {!isGenerating && !generatedSnapshot && (
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="text-lg">How Self-Review Works</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">1</span>
                        </div>
                        <div>
                          <p className="font-medium">Choose Input Method</p>
                          <p className="text-sm text-muted-foreground">Import existing analysis or upload new documents</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">2</span>
                        </div>
                        <div>
                          <p className="font-medium">AI Analysis</p>
                          <p className="text-sm text-muted-foreground">Risk assessment and compliance mapping</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">3</span>
                        </div>
                        <div>
                          <p className="font-medium">Badge Generation</p>
                          <p className="text-sm text-muted-foreground">ZK-verified badge with cryptographic proof</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}