import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, FileText, Scale, Zap, CheckCircle, ArrowRight } from "lucide-react";

interface AnalysisStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  current: boolean;
}

export default function CLMAnalysisPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedJurisdictions = location.state?.selectedJurisdictions || ['eu-mica'];
  
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([
    {
      id: 'extract',
      title: 'Extracting Contract Clauses',
      description: 'Identifying and parsing 32 individual clauses across 3 documents...',
      icon: <FileText className="w-5 h-5" />,
      completed: false,
      current: true
    },
    {
      id: 'jurisdiction',
      title: 'Cross-referencing Jurisdictions',
      description: 'Checking against MiCA Article 7, 9, 14, US SEC Rule 506, UAE VARA Guidelines...',
      icon: <Scale className="w-5 h-5" />,
      completed: false,
      current: false
    },
    {
      id: 'scoring',
      title: 'Risk Scoring Analysis',
      description: 'Calculating risk scores for indemnification, liability, and termination clauses...',
      icon: <Zap className="w-5 h-5" />,
      completed: false,
      current: false
    },
    {
      id: 'reasoning',
      title: 'Generating AI Explanations',
      description: 'Creating step-by-step reasoning for each compliance recommendation...',
      icon: <Brain className="w-5 h-5" />,
      completed: false,
      current: false
    }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        // Update current step based on progress
        if (newProgress >= 25 && currentStep === 0) {
          setCurrentStep(1);
          updateStepStatus(0, 1);
        } else if (newProgress >= 50 && currentStep === 1) {
          setCurrentStep(2);
          updateStepStatus(1, 2);
        } else if (newProgress >= 75 && currentStep === 2) {
          setCurrentStep(3);
          updateStepStatus(2, 3);
        } else if (newProgress >= 100) {
          updateStepStatus(3, -1);
          clearInterval(timer);
          // Navigate to results after a delay
          setTimeout(() => {
            navigate('/clm/dashboard', { 
              state: { selectedJurisdictions } 
            });
          }, 2000);
        }
        
        return Math.min(newProgress, 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, [currentStep, navigate, selectedJurisdictions]);

  const updateStepStatus = (completeStep: number, newCurrentStep: number) => {
    setAnalysisSteps(prev => prev.map((step, index) => ({
      ...step,
      completed: index === completeStep ? true : step.completed,
      current: index === newCurrentStep
    })));
  };

  const getJurisdictionName = (id: string) => {
    const names: Record<string, string> = {
      'eu-mica': 'EU MiCA',
      'us-sec': 'US SEC', 
      'uae-vara': 'UAE VARA',
      'sg-mas': 'Singapore MAS',
      'jp-fsa': 'Japan FSA',
      'uk-fca': 'UK FCA'
    };
    return names[id] || id;
  };

  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Agentic AI Analysis in Progress
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI agents are analyzing your contracts with explainable reasoning across multiple jurisdictions.
          </p>
        </div>

        {/* Selected Jurisdictions */}
        <Card className="enterprise-card mb-8">
          <CardHeader>
            <CardTitle>Analyzing Against Selected Jurisdictions</CardTitle>
            <CardDescription>
              Cross-referencing contract clauses with these regulatory frameworks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedJurisdictions.map((id: string) => (
                <Badge key={id} className="px-3 py-1">
                  {getJurisdictionName(id)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card className="enterprise-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Analysis Progress
              <span className="text-2xl font-bold text-primary">{Math.round(progress)}%</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="h-3 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">32</div>
                <div className="text-sm text-muted-foreground">Clauses Found</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-sm text-muted-foreground">Documents</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{selectedJurisdictions.length}</div>
                <div className="text-sm text-muted-foreground">Jurisdictions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">156</div>
                <div className="text-sm text-muted-foreground">Regulations Checked</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Steps Timeline */}
        <Card className="enterprise-card mb-8">
          <CardHeader>
            <CardTitle>AI Analysis Timeline</CardTitle>
            <CardDescription>
              Step-by-step breakdown of the agentic analysis process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {analysisSteps.map((step, index) => (
                <div key={step.id} className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.completed 
                      ? 'bg-success text-white' 
                      : step.current 
                        ? 'bg-primary text-white animate-pulse' 
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.completed ? <CheckCircle className="w-5 h-5" /> : step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${
                      step.current ? 'text-primary' : step.completed ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                    {step.current && (
                      <div className="mt-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                          <span className="text-sm text-primary font-medium">Processing...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-time Updates */}
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle>Live Analysis Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              {progress > 10 && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Identified force majeure clause in Section 12.3</span>
                </div>
              )}
              {progress > 25 && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Cross-referenced with MiCA Article 14 - Asset segregation requirements</span>
                </div>
              )}
              {progress > 40 && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Flagged indemnification clause for UAE VARA compliance review</span>
                </div>
              )}
              {progress > 55 && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Risk score calculated: High (8.2/10) for termination provisions</span>
                </div>
              )}
              {progress > 70 && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Generated alternative clause suggestion for Section 15.1</span>
                </div>
              )}
              {progress > 85 && (
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>AI reasoning complete - preparing explainable results</span>
                </div>
              )}
              {progress >= 100 && (
                <div className="flex items-center space-x-2 text-primary font-medium">
                  <ArrowRight className="w-4 h-4" />
                  <span>Analysis complete! Redirecting to dashboard...</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}