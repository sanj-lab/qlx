import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  FileText, 
  Search, 
  Scale, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  Globe,
  Users
} from "lucide-react";

const analysisSteps = [
  {
    id: "extraction",
    title: "Business Model Extraction",
    description: "Identifying entity structure and tokenomics...",
    icon: FileText,
    duration: 2000
  },
  {
    id: "jurisdiction",
    title: "Jurisdiction Cross-Check",
    description: "Cross-checking against EU MiCA, UAE VARA rules...",
    icon: Globe,
    duration: 3000
  },
  {
    id: "compliance",
    title: "Compliance Gap Analysis",
    description: "Analyzing required licenses and documentation...",
    icon: Scale,
    duration: 2500
  },
  {
    id: "risk",
    title: "Risk Assessment",
    description: "Evaluating regulatory risk matrix...",
    icon: AlertTriangle,
    duration: 2000
  },
  {
    id: "verification",
    title: "Proof Eligibility Check",
    description: "Determining ZK proof requirements...",
    icon: Shield,
    duration: 1500
  }
];

const liveUpdates = [
  "Analyzing business entity type: DAO structure detected",
  "Token classification: Utility token with governance features",
  "KYC procedures: Not found - flagging for MiCA compliance",
  "Anti-money laundering: Basic framework detected",
  "Data protection: GDPR compliance gaps identified",
  "Securities classification: Potential security token elements",
  "License requirements: MSB license needed for US operations",
  "Filing deadlines: Q2 2025 MiCA implementation deadline"
];

export default function ComplianceAnalysisPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentUpdate, setCurrentUpdate] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const { secureMode } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const totalDuration = analysisSteps.reduce((sum, step) => sum + step.duration, 0);
    let elapsed = 0;

    const stepTimers = analysisSteps.map((step, index) => {
      return setTimeout(() => {
        setCurrentStep(index);
        setCompletedSteps(prev => [...prev, step.id]);
      }, elapsed += (index > 0 ? analysisSteps[index - 1].duration : 0));
    });

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => navigate("/compliance/dashboard"), 1000);
          return 100;
        }
        return prev + 1;
      });
    }, totalDuration / 100);

    // Live updates
    const updateInterval = setInterval(() => {
      setCurrentUpdate(prev => (prev + 1) % liveUpdates.length);
    }, 1400);

    return () => {
      stepTimers.forEach(clearTimeout);
      clearInterval(progressInterval);
      clearInterval(updateInterval);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              AI Compliance Analysis in Progress
            </h1>
            <p className="text-muted-foreground text-lg mb-4">
              Our AI agents are analyzing your business model against selected regulatory frameworks
            </p>
            {secureMode && (
              <Badge variant="secondary" className="mb-4">
                🔒 Processing in Secure Enclave
              </Badge>
            )}
            
            <div className="max-w-md mx-auto">
              <Progress value={progress} className="h-3 mb-2" />
              <p className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</p>
            </div>
          </div>

          {/* Analysis Pipeline */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Analysis Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysisSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isActive = index === currentStep;
                  const isCompleted = completedSteps.includes(step.id);
                  const isPending = index > currentStep;

                  return (
                    <div 
                      key={step.id}
                      className={`flex items-center space-x-4 p-3 rounded-lg transition-all ${
                        isActive ? 'bg-accent border border-primary/20' : 
                        isCompleted ? 'bg-accent/50' : 'opacity-50'
                      }`}
                    >
                      <div className={`p-2 rounded-full ${
                        isCompleted ? 'bg-primary text-primary-foreground' :
                        isActive ? 'bg-primary/20 text-primary' : 'bg-muted'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <IconComponent className="h-5 w-5" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{step.title}</h3>
                        <p className={`text-sm ${
                          isActive ? 'text-primary' : 'text-muted-foreground'
                        }`}>
                          {step.description}
                        </p>
                      </div>

                      <div>
                        {isCompleted && (
                          <Badge variant="secondary">Complete</Badge>
                        )}
                        {isActive && (
                          <Badge variant="default">Processing...</Badge>
                        )}
                        {isPending && (
                          <Badge variant="outline">Pending</Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Live Analysis Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Live Analysis Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Quentlex AI Agent</span>
                </div>
                <p className="text-foreground min-h-[1.5rem] transition-all duration-300">
                  {liveUpdates[currentUpdate]}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}