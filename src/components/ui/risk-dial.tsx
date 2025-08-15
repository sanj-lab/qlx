// @new - Risk dial component for displaying risk scores
import { cn } from "@/lib/utils";

interface RiskDialProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function RiskDial({ score, size = 'md', showLabel = true, className }: RiskDialProps) {
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success stroke-success';
    if (score >= 60) return 'text-warning stroke-warning';
    return 'text-destructive stroke-destructive';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg'
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/20"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={cn("transition-all duration-1000 ease-out", getScoreColor(score))}
            style={{
              strokeDasharray,
              strokeDashoffset
            }}
          />
        </svg>
        
        {/* Score text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold", textSizeClasses[size], getScoreColor(score))}>
            {score}
          </span>
          <span className={cn("font-medium opacity-70", textSizeClasses[size === 'lg' ? 'md' : 'sm'])}>
            {getScoreGrade(score)}
          </span>
        </div>
      </div>
      
      {showLabel && (
        <p className="text-xs text-muted-foreground text-center">
          Risk Score
        </p>
      )}
    </div>
  );
}