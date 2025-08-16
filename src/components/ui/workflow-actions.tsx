import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Shield, HardDrive, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface WorkflowActionsProps {
  showCoReview?: boolean;
  showZKBadge?: boolean;
  showSaveToVault?: boolean;
  onSaveToVault?: () => void;
  className?: string;
}

export function WorkflowActions({ 
  showCoReview = false, 
  showZKBadge = false, 
  showSaveToVault = false,
  onSaveToVault,
  className 
}: WorkflowActionsProps) {
  if (!showCoReview && !showZKBadge && !showSaveToVault) {
    return null;
  }

  return (
    <Card className={className}>
      <CardContent className="p-4 space-y-3">
        <h4 className="font-medium text-sm text-muted-foreground mb-3">Next Steps</h4>
        
        {showSaveToVault && (
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={onSaveToVault}
          >
            <HardDrive className="w-4 h-4 mr-2" />
            Save to Legal Vault
          </Button>
        )}
        
        {showCoReview && (
          <Button 
            variant="outline" 
            className="w-full justify-start"
            asChild
          >
            <Link to="/co-review">
              <Users className="w-4 h-4 mr-2" />
              Send to Co-Review
              <ArrowRight className="w-4 h-4 ml-auto" />
            </Link>
          </Button>
        )}
        
        {showZKBadge && (
          <Button 
            variant="outline" 
            className="w-full justify-start"
            asChild
          >
            <Link to="/proofs/self-badge">
              <Shield className="w-4 h-4 mr-2" />
              Generate ZK Badge
              <ExternalLink className="w-4 h-4 ml-auto" />
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}