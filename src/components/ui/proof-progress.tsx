// @new  
import { ProgressStepper, ProgressStep } from "@/components/ui/progress-stepper";
import { ExplainPanel, ExplainEntry } from "@/components/ui/explain-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, Hash, Upload } from "lucide-react";

interface ProofProgressProps {
  isActive: boolean;
  currentStep: number;
  steps: ProgressStep[];
  explainEntries: ExplainEntry[];
  title?: string;
  className?: string;
}

export function ProofProgress({ 
  isActive, 
  currentStep, 
  steps, 
  explainEntries, 
  title = "ZK Proof Generation",
  className 
}: ProofProgressProps) {
  return (
    <div className={className}>
      <Card className="premium-card">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              {title}
            </CardTitle>
            {isActive && (
              <Badge variant="secondary" className="status-warning">
                <Lock className="w-3 h-3 mr-1" />
                Processing
              </Badge>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Progress Steps */}
          <ProgressStepper steps={steps} />
          
          {/* Simulation Notice */}
          <div className="p-3 bg-muted/50 border border-border rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Hash className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                Simulated ZK Proof Generation for Pilot
              </span>
            </div>
          </div>
          
          {/* Live Explanation */}
          {isActive && explainEntries.length > 0 && (
            <ExplainPanel 
              title="Live Analysis" 
              entries={explainEntries} 
              isActive={isActive}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}