import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AlertTriangle, Scale, Shield, ChevronDown, ChevronUp, Info, FileText } from "lucide-react";
import { useState } from "react";

interface LegalDisclaimerProps {
  type: 'ai-analysis' | 'co-review' | 'simulation' | 'api' | 'data-export' | 'zk-proof';
  variant?: 'inline' | 'collapsible' | 'prominent';
  className?: string;
}

export function LegalDisclaimer({ type, variant = 'inline', className }: LegalDisclaimerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const disclaimers = {
    'ai-analysis': {
      title: 'AI Analysis Disclaimer',
      icon: AlertTriangle,
      content: 'This AI analysis is for informational purposes only and does not constitute legal advice. Results should be reviewed by qualified legal counsel before making business decisions. Quentlex disclaims all liability for decisions made based on AI recommendations.',
      severity: 'warning' as const
    },
    'co-review': {
      title: 'Legal Review Liability',
      icon: Scale,
      content: 'Legal liability for all reviews, opinions, and recommendations rests solely with the reviewing attorney or legal professional. Reviewers are independent contractors responsible for their own professional liability. Quentlex provides the platform only and assumes no legal responsibility for review content or outcomes.',
      severity: 'critical' as const
    },
    'simulation': {
      title: 'Simulation Environment Notice',
      icon: Shield,
      content: 'This is a simulated environment for pilot testing. Generated proofs, badges, and compliance scores are for demonstration purposes only and do not constitute actual regulatory compliance or legal validation. Do not use simulated results for actual legal or regulatory filings.',
      severity: 'info' as const
    },
    'api': {
      title: 'API Usage & Data Responsibility',
      icon: FileText,
      content: 'Users are responsible for all data transmitted through our APIs. Ensure compliance with applicable data protection laws (GDPR, CCPA, etc.). API responses are provided "as is" without warranties. Rate limits and usage restrictions apply per your subscription terms.',
      severity: 'info' as const
    },
    'data-export': {
      title: 'Data Export Responsibility',
      icon: Info,
      content: 'You are solely responsible for the security and appropriate handling of exported data. Ensure compliance with data protection regulations and your organization\'s data governance policies. Exported data may contain sensitive information requiring proper safeguards.',
      severity: 'warning' as const
    },
    'zk-proof': {
      title: 'Zero-Knowledge Proof Limitations',
      icon: Shield,
      content: 'ZK proofs validate computational integrity but do not guarantee legal compliance or regulatory approval. Proof verification confirms mathematical accuracy only. Independent legal review is required for regulatory submissions. Simulated proofs are for testing purposes only.',
      severity: 'warning' as const
    }
  };

  const disclaimer = disclaimers[type];
  const IconComponent = disclaimer.icon;

  if (variant === 'collapsible') {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-full justify-between text-xs h-8">
            <div className="flex items-center gap-2">
              <IconComponent className="w-3 h-3" />
              Legal Notice
            </div>
            {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Alert className="mt-2">
            <IconComponent className="h-4 w-4" />
            <AlertDescription className="text-xs leading-relaxed">
              <strong>{disclaimer.title}:</strong> {disclaimer.content}
            </AlertDescription>
          </Alert>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  if (variant === 'prominent') {
    return (
      <Card className={`border-2 border-dashed border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/20 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <IconComponent className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-1">{disclaimer.title}</h4>
              <p className="text-sm text-orange-800 dark:text-orange-200 leading-relaxed">{disclaimer.content}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Inline variant
  return (
    <Alert className={`border-border/50 ${className}`}>
      <IconComponent className="h-4 w-4" />
      <AlertDescription className="text-xs leading-relaxed">
        <strong>{disclaimer.title}:</strong> {disclaimer.content}
      </AlertDescription>
    </Alert>
  );
}

// Specific disclaimer combinations for high-risk areas
export function CoReviewDisclaimer({ className }: { className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      <LegalDisclaimer type="co-review" variant="prominent" />
      <LegalDisclaimer type="ai-analysis" variant="collapsible" />
    </div>
  );
}

export function ProofGenerationDisclaimer({ isSimulation = true, className }: { isSimulation?: boolean; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {isSimulation && <LegalDisclaimer type="simulation" variant="inline" />}
      <LegalDisclaimer type="zk-proof" variant="collapsible" />
    </div>
  );
}

export function AnalysisResultsDisclaimer({ className }: { className?: string }) {
  return (
    <LegalDisclaimer type="ai-analysis" variant="inline" className={className} />
  );
}

export function DataExportDisclaimer({ className }: { className?: string }) {
  return (
    <LegalDisclaimer type="data-export" variant="inline" className={className} />
  );
}

export function APIDisclaimer({ className }: { className?: string }) {
  return (
    <LegalDisclaimer type="api" variant="collapsible" className={className} />
  );
}