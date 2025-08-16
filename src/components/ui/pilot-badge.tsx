import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

interface PilotBadgeProps {
  className?: string;
  variant?: "default" | "outline" | "secondary";
}

export function PilotBadge({ className, variant = "outline" }: PilotBadgeProps) {
  return (
    <Badge variant={variant} className={className}>
      <Shield className="w-3 h-3 mr-1" />
      Simulated for pilot
    </Badge>
  );
}