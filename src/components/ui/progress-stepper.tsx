// @new - Progress stepper component for agentic workflows
import { CheckCircle, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'completed' | 'error';
  description?: string;
}

export type { ProgressStep };

interface ProgressStepperProps {
  steps: ProgressStep[];
  className?: string;
}

export function ProgressStepper({ steps, className }: ProgressStepperProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        
        return (
          <div key={step.id} className="relative">
            {/* Connector line */}
            {!isLast && (
              <div className="absolute left-4 top-8 w-0.5 h-6 bg-border" />
            )}
            
            <div className="flex items-start gap-3">
              {/* Status icon */}
              <div className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors",
                step.status === 'completed' && "bg-success border-success text-success-foreground",
                step.status === 'active' && "bg-primary border-primary text-primary-foreground animate-pulse",
                step.status === 'pending' && "bg-background border-muted-foreground text-muted-foreground",
                step.status === 'error' && "bg-destructive border-destructive text-destructive-foreground"
              )}>
                {step.status === 'completed' && <CheckCircle className="w-4 h-4" />}
                {step.status === 'active' && <Clock className="w-4 h-4" />}
                {step.status === 'pending' && <Circle className="w-4 h-4" />}
                {step.status === 'error' && <Circle className="w-4 h-4" />}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-sm font-medium",
                  step.status === 'completed' && "text-success",
                  step.status === 'active' && "text-primary",
                  step.status === 'pending' && "text-muted-foreground",
                  step.status === 'error' && "text-destructive"
                )}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}