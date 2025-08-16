import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, ArrowRight, Lightbulb, Users, Shield, Target } from "lucide-react";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  icon?: any;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  secondaryActions?: Array<{
    text: string;
    href: string;
    variant?: "default" | "outline";
  }>;
  className?: string;
}

export function EmptyState({ 
  icon: Icon = FileText, 
  title, 
  description, 
  actionText, 
  actionHref,
  secondaryActions = [],
  className 
}: EmptyStateProps) {
  return (
    <Card className={`text-center ${className}`}>
      <CardContent className="py-12">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center">
            <Icon className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-muted-foreground mt-1 max-w-sm">{description}</p>
          </div>
          {actionText && actionHref && (
            <Button asChild>
              <Link to={actionHref}>
                <Plus className="w-4 h-4 mr-2" />
                {actionText}
              </Link>
            </Button>
          )}
          {secondaryActions.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {secondaryActions.map((action, index) => (
                <Button key={index} variant={action.variant || "outline"} size="sm" asChild>
                  <Link to={action.href}>
                    {action.text}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Specific empty state components for common use cases
export function CoReviewEmptyState() {
  return (
    <EmptyState
      icon={Users}
      title="No reviews in progress"
      description="Start your first legal review to collaborate with expert lawyers on your documents and compliance scenarios."
      actionText="Start New Review"
      actionHref="/co-review?action=new-review"
      secondaryActions={[
        { text: "Browse Launch Path", href: "/launch-path" },
        { text: "Generate Documents", href: "/launch-path/doc-studio" }
      ]}
    />
  );
}

export function LaunchPathEmptyState() {
  return (
    <EmptyState
      icon={Lightbulb}
      title="Begin your compliance journey"
      description="Analyze your business idea, classify tokens, and get jurisdiction-specific guidance before you build."
      actionText="Start Idea Analysis"
      actionHref="/launch-path/idea-fit"
      secondaryActions={[
        { text: "Post-Incorporation Analysis", href: "/launch-path/post-incorp" },
        { text: "Document Studio", href: "/launch-path/doc-studio" }
      ]}
    />
  );
}

export function ProofsEmptyState() {
  return (
    <EmptyState
      icon={Shield}
      title="No proofs generated yet"
      description="Create verifiable badges from your compliance analyses to share with investors and regulators."
      actionText="Generate First Badge"
      actionHref="/proofs/self-badge"
      secondaryActions={[
        { text: "Complete Risk Analysis", href: "/launch-path/post-incorp" },
        { text: "Learn About Proofs", href: "/proofs" }
      ]}
    />
  );
}

export function CommandCenterEmptyState() {
  return (
    <EmptyState
      icon={Target}
      title="Set up your compliance dashboard"
      description="Complete a risk analysis or upload documents to see your company's compliance health score."
      actionText="Run Risk Analysis"
      actionHref="/launch-path/post-incorp"
      secondaryActions={[
        { text: "Upload Documents", href: "/command-center/vault" },
        { text: "Review Filings", href: "/command-center/filings" }
      ]}
    />
  );
}