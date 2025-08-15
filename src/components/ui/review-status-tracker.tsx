// @new - Status tracker for review progression
import { CheckCircle, Circle, Clock, Send, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusStep {
  id: string;
  label: string;
  status: 'completed' | 'active' | 'pending';
  timestamp?: string;
}

interface ReviewStatusTrackerProps {
  currentStatus: 'sent' | 'in-review' | 'returned' | 'signed';
  timestamps: {
    sent?: string;
    inReview?: string;
    returned?: string;
    signed?: string;
  };
  className?: string;
}

export function ReviewStatusTracker({ 
  currentStatus, 
  timestamps, 
  className 
}: ReviewStatusTrackerProps) {
  const getSteps = (): StatusStep[] => {
    const baseSteps = [
      {
        id: 'sent',
        label: 'Sent to Lawyer',
        status: 'completed' as const,
        timestamp: timestamps.sent
      },
      {
        id: 'in-review',
        label: 'Under Review',
        status: currentStatus === 'sent' ? 'pending' as const : 'completed' as const,
        timestamp: timestamps.inReview
      },
      {
        id: 'returned',
        label: 'Review Complete',
        status: ['sent', 'in-review'].includes(currentStatus) ? 'pending' as const : 'completed' as const,
        timestamp: timestamps.returned
      },
      {
        id: 'signed',
        label: 'Signed & Finalized',
        status: currentStatus === 'signed' ? 'completed' as const : 'pending' as const,
        timestamp: timestamps.signed
      }
    ];

    // Mark current step as active if not completed
    const currentIndex = baseSteps.findIndex(step => step.id === currentStatus);
    if (currentIndex !== -1 && currentStatus !== 'signed') {
      baseSteps[currentIndex].status = 'completed';
    }

    return baseSteps;
  };

  const steps = getSteps();

  const getStepIcon = (status: StatusStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'active':
        return <Clock className="w-5 h-5 text-primary animate-pulse" />;
      case 'pending':
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStepColor = (status: StatusStep['status']) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'active':
        return 'text-primary font-medium';
      case 'pending':
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={cn("", className)}>
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-2.5 top-6 bottom-0 w-0.5 bg-border" />
        <div 
          className="absolute left-2.5 top-6 w-0.5 bg-success transition-all duration-500"
          style={{ 
            height: `${(steps.filter(s => s.status === 'completed').length - 1) * 80}px` 
          }}
        />
        
        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4">
              <div className="relative z-10 bg-background">
                {getStepIcon(step.status)}
              </div>
              <div className="flex-1 pt-0.5">
                <p className={cn("text-sm font-medium", getStepColor(step.status))}>
                  {step.label}
                </p>
                {step.timestamp && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(step.timestamp).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}