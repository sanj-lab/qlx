import { Badge } from "@/components/ui/badge";
import { QuentlexLogo } from "@/components/ui/quentlex-logo";

interface PilotBadgeProps {
  className?: string;
  variant?: "default" | "outline" | "secondary";
}

export function PilotBadge({ className, variant = "outline" }: PilotBadgeProps) {
  return (
    <Badge variant={variant} className={className}>
      <QuentlexLogo size="sm" className="mr-1" />
      Simulated for pilot
    </Badge>
  );
}