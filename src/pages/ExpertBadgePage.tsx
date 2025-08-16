import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VaultPicker } from "@/components/ui/vault-picker";
import { ProofProgress } from "@/components/ui/proof-progress";
import { SnapshotCard } from "@/components/ui/snapshot-card";
import { LawyerCard } from "@/components/ui/lawyer-card";
import { ReviewThread } from "@/components/ui/review-thread";
import { ArrowLeft, Shield, Zap, ExternalLink, AlertCircle } from "lucide-react";
import { EnhancedProofSimulator } from "@/lib/enhanced-simulation";
import type { ProofSnapshot } from "@/lib/enhanced-simulation";
import { ProgressStep } from "@/components/ui/progress-stepper";
import { ExplainEntry } from "@/components/ui/explain-panel";

interface LawyerProfile {
  id: string;
  name: string;
  firm: string;
  jurisdiction: string[];
  specialty: string[];
  experience: number;
  responseTime: string;
  cost: string;
  rating: number;
  avatar: string;
  credentials: string[];
}

export default function ExpertBadgePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMode, setSelectedMode] = useState<'import' | 'new' | null>(null);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [selectedLawyer, setSelectedLawyer] = useState<LawyerProfile | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<ProgressStep[]>([]);
  const [explainEntries, setExplainEntries] = useState<ExplainEntry[]>([]);
  const [generatedSnapshot, setGeneratedSnapshot] = useState<ProofSnapshot | null>(null);
  const [existingBadge, setExistingBadge] = useState<ProofSnapshot | null>(null);
  const [showReviewThread, setShowReviewThread] = useState(false);

  useEffect(() => {
    document.title = "Expert-Reviewed Badge – Quentlex";
    
    // Check if coming from self-badge page with existing badge
    if (location.state?.existingBadge) {
      setExistingBadge(location.state.existingBadge);
      setSelectedMode('import');
    }
  }, [location.state]);

  const mockLawyers: LawyerProfile[] = [
    {
      id: 'lawyer-1',
      name: 'Sarah Chen',
      firm: 'ADGM Corporate Law',
      jurisdiction: ['UAE', 'UK'],
      specialty: ['Corporate Law', 'Securities', 'Fintech'],
      experience: 12,
      responseTime: '4-6 hours',
      cost: '$450/hour',
      rating: 4.9,
      avatar: '/lovable-uploads/3e1de433-02a0-4004-85f3-a856bce6b4ab.png',
      credentials: ['UAE Bar', 'Solicitor (England & Wales)', 'ADGM Qualified']
    },
    {
      id: 'lawyer-2', 
      name: 'Michael Rodriguez',
      firm: 'Emirates Legal Partners',
      jurisdiction: ['UAE', 'US'],
      specialty: ['Compliance', 'Regulatory', 'M&A'],
      experience: 15,
      responseTime: '2-4 hours',
      cost: '$600/hour',
      rating: 4.8,
      avatar: '/lovable-uploads/e7b6043d-0074-4ccc-987c-d840b7ba3368.png',
      credentials: ['UAE Bar', 'New York Bar', 'DIFC Qualified']
    }
  ];

  const handleStartReview = async () => {
    if (!selectedLawyer || (selectedMode === 'import' && selectedBadges.length === 0 && !existingBadge)) {
      return;
    }

    setIsGenerating(true);
    setGeneratedSnapshot(null);
    setCurrentStep(0);
    setExplainEntries([]);

    const progressSteps: ProgressStep[] = [
      { id: 'submit', label: 'Submitting to lawyer', status: 'active' },
      { id: 'review', label: 'Lawyer review in progress', status: 'pending' },
      { id: 'verification', label: 'Legal verification', status: 'pending' },
      { id: 'upgrade', label: 'Badge upgrade', status: 'pending' }
    ];
    setSteps(progressSteps);

    try {
      // Simulate lawyer review process
      for (let i = 0; i < progressSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setSteps(prev => prev.map((step, index) => ({
          ...step,
          status: index < i ? 'completed' : index === i ? 'active' : 'pending'
        })));
        
        setCurrentStep(i);
        
        // Add explain entries for each step
        const explanations = [
          { title: 'Submission Complete', content: `Badge submitted to ${selectedLawyer.name} for expert review` },
          { title: 'Review Started', content: 'Lawyer is analyzing compliance requirements and risk assessment' },
          { title: 'Legal Verification', content: 'Cross-referencing with jurisdiction-specific regulations' },
          { title: 'Badge Upgraded', content: 'Expert verification complete, badge enhanced with lawyer signature' }
        ];
        
        if (explanations[i]) {
          setExplainEntries(prev => [...prev, {
            id: `step-${i}`,
            timestamp: new Date().toISOString(),
            title: explanations[i].title,
            message: explanations[i].content,
            type: 'info' as const
          }]);
        }
      }

      // Show review thread simulation
      if (i === 1) {
        setShowReviewThread(true);
      }

      // Generate upgraded badge
      const simulator = new EnhancedProofSimulator();
      const mockInputs = [
        {
          type: 'badge' as const,
          title: existingBadge?.title || 'Existing Badge',
          content: 'Badge upgrade to expert-verified status',
          metadata: { 
            originalBadgeId: existingBadge?.id || selectedBadges[0],
            lawyer: selectedLawyer.name,
            firm: selectedLawyer.firm
          }
        }
      ];

      const { snapshot } = await simulator.generateSnapshot(mockInputs, 'expert', selectedLawyer);
      
      setSteps(prev => prev.map(step => ({ ...step, status: 'completed' })));
      setGeneratedSnapshot(snapshot);
      
    } catch (error) {
      console.error('Expert review error:', error);
      setSteps(prev => prev.map((step, index) => 
        index === currentStep ? { ...step, status: 'error' } : step
      ));
    } finally {
      setIsGenerating(false);
    }
  };

  const resetForm = () => {
    setSelectedMode(null);
    setSelectedBadges([]);
    setSelectedLawyer(null);
    setIsGenerating(false);
    setCurrentStep(0);
    setSteps([]);
    setExplainEntries([]);
    setGeneratedSnapshot(null);
    setExistingBadge(null);
    setShowReviewThread(false);
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
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Expert-Reviewed Badge</h1>
            <Badge variant="default">Expert‑Verified</Badge>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            Upgrade badges with lawyer verification for investor-ready confidence. 
            Get professional legal review and enhanced credibility signals.
          </p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Input Options */}
            <div className="space-y-6">
              {!selectedMode && !existingBadge && (
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Choose Review Type
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex-col gap-2 hover-lift"
                      onClick={() => setSelectedMode('import')}
                    >
                      <Shield className="w-6 h-6 text-primary" />
                      <div className="text-center">
                        <div className="font-medium">Upgrade Existing Badge</div>
                        <div className="text-xs text-muted-foreground">Select a self-reviewed badge to upgrade</div>
                      </div>
                    </Button>
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-dashed" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">or</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted/30 rounded-lg border border-dashed">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">Need to create a badge first?</p>
                          <p className="text-xs text-muted-foreground mb-3">
                            Expert review requires an existing self-reviewed badge as the foundation.
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate('/proofs/self-badge')}
                            className="gap-2"
                          >
                            <Zap className="w-4 h-4" />
                            Generate Self-Review Badge
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Existing Badge Display */}
              {existingBadge && (
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Badge to Upgrade
                      </span>
                      <Button variant="ghost" size="sm" onClick={resetForm}>Change</Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{existingBadge.title}</span>
                        <Badge variant="secondary">Self-Reviewed</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{existingBadge.description}</p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Score: {existingBadge.riskScore}</span>
                        <span>ID: {existingBadge.id.slice(0, 8)}...</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Import Badge */}
              {selectedMode === 'import' && !existingBadge && (
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Select Badge to Upgrade
                      </span>
                      <Button variant="ghost" size="sm" onClick={resetForm}>Change Method</Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <VaultPicker
                      trigger={
                        <Button variant="outline" className="w-full justify-start">
                          <Shield className="w-4 h-4 mr-2" />
                          Select badge ({selectedBadges.length} selected)
                        </Button>
                      }
                      selected={selectedBadges}
                      onSelectionChange={setSelectedBadges}
                      maxSelection={1}
                      title="Select Self-Reviewed Badge"
                      description="Choose a badge to upgrade with expert verification"
                    />
                    
                    {selectedBadges.length > 0 && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Badge selected for expert review upgrade
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Lawyer Selection */}
              {(selectedMode === 'import' && (selectedBadges.length > 0 || existingBadge)) && (
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      Select Lawyer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockLawyers.map((lawyer) => (
                      <div 
                        key={lawyer.id}
                        className={`cursor-pointer transition-all ${
                          selectedLawyer?.id === lawyer.id 
                            ? 'ring-2 ring-primary' 
                            : ''
                        }`}
                        onClick={() => setSelectedLawyer(lawyer)}
                      >
                        <LawyerCard lawyer={lawyer} />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Submit for Review */}
              {selectedLawyer && !isGenerating && !generatedSnapshot && (
                <Card className="enterprise-card">
                  <CardContent className="pt-6 space-y-4">
                    <div className="p-4 bg-primary/5 rounded-lg border">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Ready for Expert Review</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedLawyer.name} from {selectedLawyer.firm} will review your badge
                          </p>
                          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Response: {selectedLawyer.responseTime}</span>
                            <span>Cost: {selectedLawyer.cost}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleStartReview}
                      className="w-full h-12 text-base font-semibold"
                    >
                      <Shield className="w-5 h-5 mr-2" />
                      Submit for Expert Review
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
                  title="Expert Review Process"
                />
              )}

              {showReviewThread && isGenerating && (
                <ReviewThread 
                  title="Lawyer Review Thread"
                  lawyer={selectedLawyer!}
                  isActive={true}
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
                      <Button variant="outline" onClick={resetForm} className="w-full">
                        Review Another Badge
                      </Button>
                      <Button variant="outline" onClick={() => navigate('/proofs/share')} className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Share Expert Badge
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {!isGenerating && !generatedSnapshot && (
                <Card className="enterprise-card">
                  <CardHeader>
                    <CardTitle className="text-lg">Expert Review Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Shield className="w-3 h-3 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Lawyer Verification</p>
                          <p className="text-sm text-muted-foreground">Professional legal review and sign-off</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Shield className="w-3 h-3 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Investor Confidence</p>
                          <p className="text-sm text-muted-foreground">Enhanced credibility for funding rounds</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Shield className="w-3 h-3 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Regulatory Trust</p>
                          <p className="text-sm text-muted-foreground">Professional compliance validation</p>
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
