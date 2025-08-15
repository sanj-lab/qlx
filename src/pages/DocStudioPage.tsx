// @new - Doc Studio page for modular document generation
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProgressStepper, type ProgressStep } from "@/components/ui/progress-stepper";
import { ExplainPanel } from "@/components/ui/explain-panel";
import { VaultPicker } from "@/components/ui/vault-picker";
import { 
  FileText, 
  Plus, 
  Search, 
  Download, 
  Save,
  BookOpen,
  Shield,
  Clock,
  CheckCircle,
  Building,
  Users,
  Gavel,
  Coins,
  Globe
} from "lucide-react";
import type { Document, ExplainEntry } from "@/lib/types";

interface DocTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: any;
  required?: boolean;
  dependencies?: string[];
}

interface GeneratedDoc {
  id: string;
  name: string;
  content: string;
  sources: string[];
  lastModified: string;
}

const DOC_CATEGORIES = [
  { id: 'incorporation', name: 'Incorporation', icon: Building, color: 'bg-blue-500' },
  { id: 'pre-incorporation', name: 'Pre-Incorporation', icon: Users, color: 'bg-green-500' },
  { id: 'licenses', name: 'License Documents', icon: Gavel, color: 'bg-purple-500' },
  { id: 'token', name: 'Token Launch', icon: Coins, color: 'bg-orange-500' },
  { id: 'investor', name: 'Investor Documents', icon: Users, color: 'bg-indigo-500' },
  { id: 'jurisdiction', name: 'Jurisdiction Specific', icon: Globe, color: 'bg-teal-500' },
  { id: 'tech', name: 'Tech Agreements', icon: FileText, color: 'bg-red-500' }
];

const DOC_TEMPLATES: DocTemplate[] = [
  // Incorporation
  { id: 'articles', name: 'Articles of Association', category: 'incorporation', description: 'Company formation document', icon: Building },
  { id: 'bylaws', name: 'Corporate Bylaws', category: 'incorporation', description: 'Internal governance rules', icon: Building },
  { id: 'shareholders', name: 'Shareholders Agreement', category: 'incorporation', description: 'Shareholder rights and obligations', icon: Building },
  
  // Pre-incorporation
  { id: 'founders', name: 'Founders Agreement', category: 'pre-incorporation', description: 'Founding team arrangements', icon: Users },
  { id: 'advisory', name: 'Advisory Agreement', category: 'pre-incorporation', description: 'Advisor compensation terms', icon: Users },
  { id: 'employment', name: 'Employment Contracts', category: 'pre-incorporation', description: 'Employee agreement templates', icon: Users },
  
  // Token Launch
  { id: 'saft', name: 'SAFT Agreement', category: 'token', description: 'Simple Agreement for Future Tokens', icon: Coins },
  { id: 'whitepaper', name: 'Technical Whitepaper', category: 'token', description: 'Token mechanics documentation', icon: Coins },
  { id: 'token-sale', name: 'Token Sale Terms', category: 'token', description: 'Public sale conditions', icon: Coins },
  
  // Investor Documents
  { id: 'term-sheet', name: 'Investment Term Sheet', category: 'investor', description: 'Investment terms summary', icon: Users },
  { id: 'subscription', name: 'Subscription Agreement', category: 'investor', description: 'Investment subscription terms', icon: Users },
  { id: 'disclosure', name: 'Investor Disclosure', category: 'investor', description: 'Risk and compliance disclosures', icon: Users },
  
  // Tech Agreements
  { id: 'privacy', name: 'Privacy Policy', category: 'tech', description: 'Data protection compliance', icon: FileText },
  { id: 'terms', name: 'Terms of Service', category: 'tech', description: 'Platform usage terms', icon: FileText },
  { id: 'api', name: 'API License Agreement', category: 'tech', description: 'Technical integration terms', icon: FileText }
];

export default function DocStudioPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [customInstructions, setCustomInstructions] = useState("");
  const [memoryDocuments, setMemoryDocuments] = useState<Document[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [explainEntries, setExplainEntries] = useState<ExplainEntry[]>([]);
  const [generatedDocs, setGeneratedDocs] = useState<GeneratedDoc[]>([]);
  const [showVaultPicker, setShowVaultPicker] = useState(false);
  const [showPreview, setShowPreview] = useState<GeneratedDoc | null>(null);

  useEffect(() => {
    document.title = "Doc Studio – Quentlex";
  }, []);

  const filteredTemplates = DOC_TEMPLATES.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const steps: ProgressStep[] = [
    { id: 'memory', label: 'Gather Memory', status: currentStep > 0 ? 'completed' : currentStep === 0 ? 'active' : 'pending' },
    { id: 'clauses', label: 'Select Clauses', status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : 'pending' },
    { id: 'assemble', label: 'Assemble Documents', status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : 'pending' },
    { id: 'validate', label: 'Validate & Format', status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'active' : 'pending' }
  ];

  const handleTemplateToggle = (templateId: string) => {
    setSelectedTemplates(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handleGenerate = async () => {
    if (selectedTemplates.length === 0) return;

    setIsGenerating(true);
    setIsGenerated(false);
    setCurrentStep(0);
    setExplainEntries([]);

    const stepsData = [
      { message: 'Gathering company memory and preferences...', details: 'Loading jurisdiction data, company info, and previous analyses' },
      { message: 'Selecting relevant clause packages...', details: 'Matching templates to your specific requirements' },
      { message: 'Assembling document structure...', details: 'Building documents with proper formatting and cross-references' },
      { message: 'Validating legal compliance...', details: 'Checking jurisdiction-specific requirements and formatting' }
    ];

    try {
      for (let i = 0; i < stepsData.length; i++) {
        setCurrentStep(i);
        
        const entry: ExplainEntry = {
          id: `entry_${Date.now()}_${Math.random()}`,
          timestamp: new Date().toISOString(),
          type: i % 2 === 0 ? 'analysis' : 'rule',
          message: stepsData[i].message,
          details: stepsData[i].details,
          confidence: Math.floor(Math.random() * 20) + 80
        };
        setExplainEntries(prev => [...prev, entry]);
        
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      // Generate mock documents
      const docs: GeneratedDoc[] = selectedTemplates.map(templateId => {
        const template = DOC_TEMPLATES.find(t => t.id === templateId);
        return {
          id: `generated_${templateId}_${Date.now()}`,
          name: template?.name || 'Document',
          content: generateMockContent(template?.name || 'Document'),
          sources: ['UAE Commercial Companies Law', 'VARA Regulations', 'Standard Clause Pack'],
          lastModified: new Date().toISOString()
        };
      });

      setGeneratedDocs(docs);
      setIsGenerated(true);
      setCurrentStep(4);
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateMockContent = (docName: string): string => {
    return `# ${docName}

## Article 1: Definitions

For the purposes of this document, the following terms shall have the meanings set forth below:

1.1 "Company" means [Company Name], a company incorporated under the laws of the United Arab Emirates.

1.2 "Token" means the digital utility token to be issued by the Company in accordance with VARA regulations.

1.3 "Holder" means any person or entity holding Tokens.

## Article 2: Purpose and Scope

2.1 This document establishes the framework for [specific purpose based on document type].

2.2 All activities shall be conducted in compliance with applicable UAE regulations and VARA guidelines.

## Article 3: Terms and Conditions

3.1 The Company hereby agrees to [specific terms based on document type].

3.2 This agreement shall be governed by the laws of the United Arab Emirates.

## Article 4: Compliance

4.1 The Company shall maintain compliance with all applicable regulations including but not limited to:
   - UAE Commercial Companies Law
   - VARA Virtual Asset Regulations
   - Anti-Money Laundering regulations

---

*This document was generated using Quentlex Doc Studio. Please review with legal counsel before use.*

**Generated on:** ${new Date().toLocaleDateString()}
**Source Templates:** Standard UAE Commercial, VARA Compliance Pack
**Simulated for pilot use**`;
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = DOC_CATEGORIES.find(c => c.id === categoryId);
    return category?.icon || FileText;
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-8 px-6 border-b">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Doc Studio</h1>
              <p className="text-muted-foreground">Generate any legal document. From SAFTs to policy packs.</p>
            </div>
            <Badge variant="outline" className="text-xs">
              <Shield className="w-3 h-3 mr-1" />
              Simulated for pilot
            </Badge>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Document Selection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Categories */}
                <div>
                  <Label className="text-sm font-medium">Document Categories</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {DOC_CATEGORIES.map((category) => {
                      const Icon = category.icon;
                      return (
                        <Button
                          key={category.id}
                          variant={selectedCategory === category.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(
                            selectedCategory === category.id ? null : category.id
                          )}
                          className="justify-start text-xs"
                        >
                          <Icon className="w-3 h-3 mr-1" />
                          {category.name}
                        </Button>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Custom Instructions */}
                <div>
                  <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Any specific requirements or modifications..."
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    className="mt-2"
                    rows={3}
                  />
                </div>

                {/* Memory Documents */}
                <div>
                  <div className="flex items-center justify-between">
                    <Label>Company Memory</Label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowVaultPicker(true)}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                  {memoryDocuments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {memoryDocuments.slice(0, 3).map((doc) => (
                        <div key={doc.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded text-xs">
                          <BookOpen className="w-3 h-3" />
                          <span className="flex-1 truncate">{doc.name}</span>
                        </div>
                      ))}
                      {memoryDocuments.length > 3 && (
                        <p className="text-xs text-muted-foreground">+{memoryDocuments.length - 3} more</p>
                      )}
                    </div>
                  )}
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={selectedTemplates.length === 0 || isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Documents ({selectedTemplates.length})
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Progress Stepper */}
            {(isGenerating || isGenerated) && (
              <ProgressStepper 
                steps={steps} 
                className="sticky top-6"
              />
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {!isGenerating && !isGenerated && (
              <>
                {/* Template Grid */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Available Templates</CardTitle>
                      <Badge variant="secondary">{selectedTemplates.length} selected</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-96">
                      <div className="space-y-3">
                        {filteredTemplates.map((template) => {
                          const Icon = getCategoryIcon(template.category);
                          const isSelected = selectedTemplates.includes(template.id);
                          
                          return (
                            <div 
                              key={template.id}
                              className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                                isSelected ? 'bg-primary/5 border-primary' : 'hover:bg-muted/50'
                              }`}
                              onClick={() => handleTemplateToggle(template.id)}
                            >
                              <Checkbox checked={isSelected} />
                              <Icon className="w-5 h-5 mt-0.5 text-muted-foreground" />
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{template.name}</h4>
                                <p className="text-xs text-muted-foreground">{template.description}</p>
                                <Badge variant="outline" className="mt-1 text-xs">
                                  {DOC_CATEGORIES.find(c => c.id === template.category)?.name}
                                </Badge>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Generated Documents */}
            {isGenerated && generatedDocs.length > 0 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Generated Documents ({generatedDocs.length})</CardTitle>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Save className="w-4 h-4 mr-2" />
                          Save All to Vault
                        </Button>
                        <Button size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download Package
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {generatedDocs.map((doc) => (
                        <div 
                          key={doc.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">{doc.name}</h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>Sources: {doc.sources.join(', ')}</span>
                                <Badge variant="outline" className="text-xs">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Generated
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setShowPreview(doc)}
                            >
                              Preview
                            </Button>
                            <Button size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* ExplainPanel */}
        {(isGenerating || explainEntries.length > 0) && (
          <div className="mt-6">
            <ExplainPanel
              title="Document Generation Process"
              entries={explainEntries}
              isActive={isGenerating}
            />
          </div>
        )}

        {/* Vault Picker Modal */}
        <Dialog open={showVaultPicker} onOpenChange={setShowVaultPicker}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Select Company Memory</DialogTitle>
            </DialogHeader>
            <VaultPicker
              trigger={<div />}
              selected={memoryDocuments.map(d => d.id)}
              onSelectionChange={(selectedIds) => {
                // Convert to docs - simplified for demo
                const docs = selectedIds.map(id => ({
                  id,
                  name: `Memory Document ${id}`,
                  type: 'pdf' as const,
                  size: 1024,
                  uploadedAt: new Date().toISOString(),
                  hash: `hash_${id}`,
                  tags: ['memory'],
                  folderId: 'memories',
                  isIndexed: true
                }));
                setMemoryDocuments(docs);
              }}
              maxSelection={10}
            />
          </DialogContent>
        </Dialog>

        {/* Preview Modal */}
        {showPreview && (
          <Dialog open={!!showPreview} onOpenChange={() => setShowPreview(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>{showPreview.name}</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-96 w-full border rounded p-4">
                <pre className="whitespace-pre-wrap text-sm">{showPreview.content}</pre>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </main>
  );
}