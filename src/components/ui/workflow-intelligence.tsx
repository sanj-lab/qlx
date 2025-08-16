import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, CheckCircle, Target, Users, Shield, Briefcase, 
  Lightbulb, TrendingUp, Zap, Clock
} from "lucide-react";
import { Link } from "react-router-dom";

interface WorkflowIntelligenceProps {
  currentSpace: "launch-path" | "co-review" | "command-center" | "proofs" | "deal-desk";
  completedWorkflows?: string[];
  className?: string;
}

export function WorkflowIntelligence({ 
  currentSpace, 
  completedWorkflows = [],
  className 
}: WorkflowIntelligenceProps) {
  const getNextSteps = () => {
    const hasRiskAnalysis = completedWorkflows.includes("risk-analysis");
    const hasZKBadge = completedWorkflows.includes("zk-badge");
    const hasExpertReview = completedWorkflows.includes("expert-review");
    const hasDocuments = completedWorkflows.includes("documents");

    switch (currentSpace) {
      case "launch-path":
        if (hasRiskAnalysis) {
          return [
            {
              icon: Users,
              title: "Get Expert Validation",
              description: "Your analysis is complete. Time for expert lawyer review.",
              action: "Start Co-Review",
              href: "/co-review",
              priority: "high",
              confidence: 95
            },
            {
              icon: Shield,
              title: "Generate ZK Badge",
              description: "Create verifiable proof for investors and regulators.",
              action: "Create Badge",
              href: "/proofs/self-badge",
              priority: "medium",
              confidence: 88
            }
          ];
        }
        return [
          {
            icon: Target,
            title: "Complete Risk Analysis",
            description: "Finish your compliance assessment to unlock next steps.",
            action: "Continue Analysis",
            href: "/launch-path/post-incorp",
            priority: "high",
            confidence: 100
          }
        ];

      case "co-review":
        if (hasExpertReview) {
          return [
            {
              icon: Shield,
              title: "Generate Expert Badge",
              description: "Convert expert review into verifiable proof.",
              action: "Create Expert Badge",
              href: "/proofs/expert-badge",
              priority: "high",
              confidence: 98
            },
            {
              icon: TrendingUp,
              title: "Monitor Compliance",
              description: "Set up ongoing compliance tracking.",
              action: "Command Center",
              href: "/command-center/dashboard",
              priority: "medium",
              confidence: 85
            }
          ];
        }
        return [
          {
            icon: Target,
            title: "Complete Launch Path",
            description: "Finish risk analysis before expert review.",
            action: "Back to Launch Path",
            href: "/launch-path/post-incorp",
            priority: "high",
            confidence: 100
          }
        ];

      case "command-center":
        if (hasDocuments && hasRiskAnalysis) {
          return [
            {
              icon: Shield,
              title: "Generate Compliance Badge",
              description: "Your dashboard shows strong compliance. Create proof.",
              action: "Generate Badge",
              href: "/proofs/self-badge",
              priority: "high",
              confidence: 92
            },
            {
              icon: Briefcase,
              title: "Prepare for Fundraising",
              description: "Set up investor materials in Deal Desk.",
              action: "Deal Desk",
              href: "/deal-desk",
              priority: "medium",
              confidence: 87
            }
          ];
        }
        return [
          {
            icon: Target,
            title: "Upload Documents",
            description: "Add compliance documents to activate monitoring.",
            action: "Legal Vault",
            href: "/command-center/vault",
            priority: "high",
            confidence: 100
          }
        ];

      case "proofs":
        if (hasZKBadge) {
          return [
            {
              icon: Briefcase,
              title: "Share with Investors",
              description: "Your badge is ready for investor presentations.",
              action: "Deal Desk",
              href: "/deal-desk",
              priority: "high",
              confidence: 96
            },
            {
              icon: TrendingUp,
              title: "Monitor Compliance Drift",
              description: "Track changes that might affect your badge.",
              action: "Command Center",
              href: "/command-center/dashboard",
              priority: "medium",
              confidence: 83
            }
          ];
        }
        return [
          {
            icon: Target,
            title: "Complete Analysis First",
            description: "Finish Launch Path to enable badge generation.",
            action: "Launch Path",
            href: "/launch-path/post-incorp",
            priority: "high",
            confidence: 100
          }
        ];

      case "deal-desk":
        if (hasZKBadge && hasExpertReview) {
          return [
            {
              icon: Zap,
              title: "AI Negotiation Ready",
              description: "Your compliance proofs strengthen negotiation position.",
              action: "Launch Negotiator",
              href: "/deal-desk/negotiator",
              priority: "high",
              confidence: 97
            },
            {
              icon: TrendingUp,
              title: "Monitor Deal Pipeline",
              description: "Track ongoing negotiations and investor interactions.",
              action: "Active Pipeline",
              href: "/deal-desk?tab=pipeline",
              priority: "medium",
              confidence: 89
            }
          ];
        }
        return [
          {
            icon: Shield,
            title: "Generate Investor Proofs",
            description: "Create credibility badges before fundraising.",
            action: "Generate Proofs",
            href: "/proofs/self-badge",
            priority: "high",
            confidence: 95
          }
        ];

      default:
        return [];
    }
  };

  const nextSteps = getNextSteps();

  if (nextSteps.length === 0) return null;

  return (
    <Card className={`border-primary/20 bg-gradient-to-br from-primary/5 to-transparent ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          Smart Next Steps
          <Badge variant="outline" className="text-xs">
            AI Suggested
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {nextSteps.map((step, index) => (
          <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <step.icon className="w-4 h-4 text-primary" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-sm">{step.title}</h4>
                <Badge 
                  variant={step.priority === "high" ? "default" : "secondary"} 
                  className="text-xs"
                >
                  {step.priority}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                {step.description}
              </p>
              <div className="flex items-center justify-between">
                <Button asChild size="sm" variant="outline" className="h-7 text-xs">
                  <Link to={step.href}>
                    {step.action}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CheckCircle className="w-3 h-3 text-success" />
                  {step.confidence}% match
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t border-dashed border-border/50">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Suggestions update as you complete workflows
          </p>
        </div>
      </CardContent>
    </Card>
  );
}