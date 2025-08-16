import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Target, Users, Shield, Briefcase, ArrowRight, 
  Lightbulb, TrendingUp, Clock, CheckCircle, Zap 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface ContextualEmptyStateProps {
  space: "launch-path" | "co-review" | "command-center" | "proofs" | "deal-desk";
  completedActions?: string[];
  className?: string;
}

export function ContextualEmptyState({ space, completedActions = [], className }: ContextualEmptyStateProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const getContextualContent = () => {
    const hasCompletedAnalysis = completedActions.includes("risk-analysis");
    const hasGeneratedProofs = completedActions.includes("zk-badge");
    const hasUploadedDocs = completedActions.includes("document-upload");

    switch (space) {
      case "launch-path":
        if (currentPath.includes("idea-fit")) {
          return {
            icon: Lightbulb,
            title: "Ready to analyze your Web3 idea?",
            description: "Tell us about your project and we'll identify the optimal jurisdiction and compliance path.",
            primaryAction: { text: "Start Idea Analysis", href: "/launch-path/idea-fit" },
            secondaryActions: [
              { text: "Skip to Post-Incorporation", href: "/launch-path/post-incorp" },
              { text: "Browse Jurisdictions", href: "/launch-path/jurisdiction" }
            ],
            urgency: "Start here for new projects"
          };
        }
        return {
          icon: Target,
          title: "Chart your compliance journey",
          description: "From idea validation to incorporation readiness - your guided path to regulatory success.",
          primaryAction: { text: "Analyze Business Idea", href: "/launch-path/idea-fit" },
          secondaryActions: [
            { text: "Post-Incorporation Review", href: "/launch-path/post-incorp" },
            { text: "Document Generator", href: "/launch-path/doc-studio" }
          ],
          urgency: "Essential first step"
        };

      case "co-review":
        if (hasCompletedAnalysis) {
          return {
            icon: Users,
            title: "Ready for expert review",
            description: "Your analysis is complete. Now get expert lawyer validation on your compliance approach.",
            primaryAction: { text: "Request Expert Review", href: "/co-review?action=expert-review" },
            secondaryActions: [
              { text: "Contract Redlining", href: "/co-review/redlining" },
              { text: "Review Routing", href: "/co-review/routing" }
            ],
            urgency: "Recommended next step"
          };
        }
        return {
          icon: Users,
          title: "Expert legal collaboration",
          description: "Complete your Launch Path analysis first, then collaborate with expert lawyers here.",
          primaryAction: { text: "Complete Risk Analysis", href: "/launch-path/post-incorp" },
          secondaryActions: [
            { text: "Browse Co-Review Features", href: "/co-review" },
            { text: "Contract Templates", href: "/launch-path/doc-studio" }
          ],
          urgency: "Complete Launch Path first"
        };

      case "command-center":
        if (hasUploadedDocs || hasCompletedAnalysis) {
          return {
            icon: TrendingUp,
            title: "Your compliance dashboard is ready",
            description: "Track your ongoing compliance status, monitor drift, and manage regulatory filings.",
            primaryAction: { text: "View Dashboard", href: "/command-center/dashboard" },
            secondaryActions: [
              { text: "Filing Calendar", href: "/command-center/filings" },
              { text: "Vault Management", href: "/command-center/vault" }
            ],
            urgency: "Monitor compliance health"
          };
        }
        return {
          icon: Target,
          title: "Enterprise compliance overview",
          description: "Upload documents or complete risk analysis to activate your compliance monitoring dashboard.",
          primaryAction: { text: "Upload Documents", href: "/command-center/vault" },
          secondaryActions: [
            { text: "Run Risk Analysis", href: "/launch-path/post-incorp" },
            { text: "Review Filing Requirements", href: "/command-center/filings" }
          ],
          urgency: "Upload documents to activate"
        };

      case "proofs":
        if (hasCompletedAnalysis) {
          return {
            icon: Shield,
            title: "Generate your compliance badge",
            description: "Transform your analysis into verifiable ZK proofs that investors and regulators can trust.",
            primaryAction: { text: "Generate ZK Badge", href: "/proofs/self-badge" },
            secondaryActions: [
              { text: "Expert Badge Review", href: "/proofs/expert-badge" },
              { text: "View Proof Timeline", href: "/proofs/timeline" }
            ],
            urgency: "Ready for proof generation"
          };
        }
        return {
          icon: Shield,
          title: "Verifiable compliance proofs",
          description: "Complete your compliance analysis first, then generate ZK proofs for investors and regulators.",
          primaryAction: { text: "Complete Analysis", href: "/launch-path/post-incorp" },
          secondaryActions: [
            { text: "Learn About ZK Proofs", href: "/proofs" },
            { text: "See Sample Badges", href: "/proofs/timeline" }
          ],
          urgency: "Analysis required first"
        };

      case "deal-desk":
        if (hasGeneratedProofs) {
          return {
            icon: Briefcase,
            title: "Fundraising tools ready",
            description: "Your compliance proofs are ready. Now accelerate fundraising with AI negotiation and data rooms.",
            primaryAction: { text: "Launch AI Negotiator", href: "/deal-desk/negotiator" },
            secondaryActions: [
              { text: "Create Data Room", href: "/share-room" },
              { text: "View Active Deals", href: "/deal-desk?tab=pipeline" }
            ],
            urgency: "Investor-ready materials"
          };
        }
        return {
          icon: Briefcase,
          title: "Fundraising acceleration",
          description: "Generate compliance proofs first to maximize investor confidence during fundraising.",
          primaryAction: { text: "Generate Proofs", href: "/proofs/self-badge" },
          secondaryActions: [
            { text: "AI Negotiator Demo", href: "/deal-desk/negotiator" },
            { text: "Data Room Setup", href: "/share-room" }
          ],
          urgency: "Generate proofs for credibility"
        };

      default:
        return {
          icon: FileText,
          title: "Welcome to Quentlex",
          description: "Start your compliance journey here.",
          primaryAction: { text: "Begin", href: "/launch-path" },
          secondaryActions: [],
          urgency: "Get started"
        };
    }
  };

  const content = getContextualContent();
  const IconComponent = content.icon;

  return (
    <Card className={`text-center border-2 border-dashed ${className}`}>
      <CardContent className="py-12 px-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
            <IconComponent className="w-10 h-10 text-primary" />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-xl font-semibold">{content.title}</h3>
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {content.urgency}
              </Badge>
            </div>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
              {content.description}
            </p>
          </div>

          <div className="space-y-3 w-full max-w-sm">
            <Button asChild size="lg" className="w-full">
              <Link to={content.primaryAction.href}>
                <Zap className="w-4 h-4 mr-2" />
                {content.primaryAction.text}
              </Link>
            </Button>

            {content.secondaryActions.length > 0 && (
              <div className="flex gap-2 flex-wrap justify-center">
                {content.secondaryActions.map((action, index) => (
                  <Button key={index} variant="outline" size="sm" asChild>
                    <Link to={action.href}>
                      {action.text}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </div>

          {completedActions.length > 0 && (
            <div className="pt-4 border-t border-dashed w-full">
              <p className="text-xs text-muted-foreground mb-2">Completed:</p>
              <div className="flex gap-1 flex-wrap justify-center">
                {completedActions.map((action, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {action.replace("-", " ")}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}