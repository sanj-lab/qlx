import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, CheckCircle, Lightbulb, Building, Globe, 
  Target, Rocket, Users, Clock, Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GuidedOnboardingProps {
  onComplete?: (result: OnboardingResult) => void;
  className?: string;
}

interface OnboardingResult {
  businessType: string;
  stage: string;
  jurisdiction: string;
  priority: string;
  description: string;
  recommendedPath: string;
  confidence: number;
}

export function GuidedOnboarding({ onComplete, className }: GuidedOnboardingProps) {
  const [step, setStep] = useState(1);
  const [businessType, setBusinessType] = useState("");
  const [stage, setStage] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const progress = (step / 3) * 100;

  const handleComplete = () => {
    const result = analyzeOnboarding();
    if (onComplete) {
      onComplete(result);
    } else {
      // Default behavior: navigate to recommended path
      navigate(result.recommendedPath);
    }
  };

  const analyzeOnboarding = (): OnboardingResult => {
    let recommendedPath = "/launch-path";
    let confidence = 85;

    // Smart routing based on inputs
    if (stage === "idea" || stage === "pre-seed") {
      recommendedPath = "/launch-path/idea-fit";
      confidence = 95;
    } else if (stage === "incorporated" || stage === "post-incorporation") {
      recommendedPath = "/launch-path/post-incorp";
      confidence = 92;
    } else if (businessType === "fundraising" || priority === "investor-readiness") {
      recommendedPath = "/proofs/self-badge";
      confidence = 88;
    } else if (priority === "ongoing-compliance") {
      recommendedPath = "/command-center/dashboard";
      confidence = 90;
    }

    return {
      businessType,
      stage,
      jurisdiction,
      priority,
      description,
      recommendedPath,
      confidence
    };
  };

  const getRecommendation = () => {
    const result = analyzeOnboarding();
    
    const recommendations = {
      "/launch-path/idea-fit": {
        title: "Start with Idea Analysis",
        description: "Perfect for early-stage projects. We'll help you choose the right jurisdiction and understand compliance requirements.",
        icon: Lightbulb,
        urgency: "Essential first step",
        timeToValue: "15 minutes"
      },
      "/launch-path/post-incorp": {
        title: "Post-Incorporation Review",
        description: "You're incorporated! Let's assess your current compliance status and identify any gaps or improvements.",
        icon: Building,
        urgency: "Recommended assessment",
        timeToValue: "25 minutes"
      },
      "/proofs/self-badge": {
        title: "Generate Compliance Badge",
        description: "Create verifiable proof of your compliance status for investors and regulators using ZK technology.",
        icon: Target,
        urgency: "Investor-ready materials",
        timeToValue: "10 minutes"
      },
      "/command-center/dashboard": {
        title: "Command Center Setup",
        description: "Monitor ongoing compliance, track regulatory changes, and manage your legal obligations from one dashboard.",
        icon: Users,
        urgency: "Ongoing monitoring",
        timeToValue: "20 minutes"
      }
    };

    return recommendations[result.recommendedPath] || recommendations["/launch-path/idea-fit"];
  };

  return (
    <Card className={`max-w-2xl mx-auto ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-primary" />
            Quick Compliance Assessment
          </CardTitle>
          <Badge variant="outline">
            Step {step} of 3
          </Badge>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>

      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">What best describes your business?</h3>
              <Select value={businessType} onValueChange={setBusinessType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="defi-protocol">DeFi Protocol</SelectItem>
                  <SelectItem value="nft-marketplace">NFT Marketplace</SelectItem>
                  <SelectItem value="crypto-exchange">Crypto Exchange</SelectItem>
                  <SelectItem value="dao">DAO</SelectItem>
                  <SelectItem value="fintech">FinTech Platform</SelectItem>
                  <SelectItem value="gaming">Gaming/Metaverse</SelectItem>
                  <SelectItem value="infrastructure">Web3 Infrastructure</SelectItem>
                  <SelectItem value="other">Other Web3/Crypto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="font-semibold mb-3">What stage are you at?</h3>
              <Select value={stage} onValueChange={setStage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select current stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Idea Stage</SelectItem>
                  <SelectItem value="pre-seed">Pre-Seed/Building</SelectItem>
                  <SelectItem value="incorporated">Recently Incorporated</SelectItem>
                  <SelectItem value="post-incorporation">Post-Incorporation</SelectItem>
                  <SelectItem value="fundraising">Fundraising</SelectItem>
                  <SelectItem value="scaling">Scaling/Growth</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Primary jurisdiction of interest?</h3>
              <Select value={jurisdiction} onValueChange={setJurisdiction}>
                <SelectTrigger>
                  <SelectValue placeholder="Select jurisdiction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uae">UAE (VARA)</SelectItem>
                  <SelectItem value="singapore">Singapore (MAS)</SelectItem>
                  <SelectItem value="uk">United Kingdom (FCA)</SelectItem>
                  <SelectItem value="eu">European Union (MiCA)</SelectItem>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="switzerland">Switzerland (FINMA)</SelectItem>
                  <SelectItem value="undecided">Not Sure Yet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="font-semibold mb-3">What's your main priority?</h3>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jurisdiction-selection">Choose Right Jurisdiction</SelectItem>
                  <SelectItem value="incorporation">Incorporation Guidance</SelectItem>
                  <SelectItem value="compliance-assessment">Compliance Assessment</SelectItem>
                  <SelectItem value="investor-readiness">Investor Readiness</SelectItem>
                  <SelectItem value="ongoing-compliance">Ongoing Compliance</SelectItem>
                  <SelectItem value="regulatory-guidance">Regulatory Guidance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-3">Tell us more about your project (optional)</h3>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of your project, specific compliance concerns, or any other details that might help us recommend the best path..."
                rows={4}
              />
            </div>

            {businessType && stage && (
              <Card className="bg-gradient-to-br from-primary/5 to-success/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {React.createElement(getRecommendation().icon, { 
                        className: "w-5 h-5 text-primary" 
                      })}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{getRecommendation().title}</h4>
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {analyzeOnboarding().confidence}% match
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {getRecommendation().description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {getRecommendation().timeToValue}
                        </div>
                        <div className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          {getRecommendation().urgency}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <div className="flex justify-between pt-4">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Previous
            </Button>
          )}
          
          <div className="flex-1" />

          {step < 3 ? (
            <Button 
              onClick={() => setStep(step + 1)}
              disabled={
                (step === 1 && (!businessType || !stage)) ||
                (step === 2 && (!jurisdiction || !priority))
              }
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleComplete}
              disabled={!businessType || !stage}
              className="bg-primary"
            >
              <Rocket className="w-4 h-4 mr-2" />
              Start My Journey
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}