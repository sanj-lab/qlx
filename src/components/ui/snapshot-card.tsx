// @new
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuentlexLogo } from "@/components/ui/quentlex-logo";
import { 
  Download, 
  Share2, 
  Copy, 
  CheckCircle, 
  Shield, 
  ExternalLink,
  Calendar,
  FileText,
  Hash
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SnapshotCardProps {
  snapshot: {
    id: string;
    type: 'self' | 'expert' | 'company';
    title: string;
    timestamp: string;
    riskScore?: number;
    badgeId: string;
    txId: string;
    documents: Array<{
      name: string;
      hash: string;
      type: 'document' | 'badge';
    }>;
    lawyer?: {
      name: string;
      jurisdiction: string;
      license: string;
    };
    verificationUrl: string;
    isVerified: boolean;
  };
  className?: string;
  onShare?: () => void;
  onDownload?: () => void;
  onVerify?: () => void;
}

export function SnapshotCard({ 
  snapshot, 
  className, 
  onShare, 
  onDownload, 
  onVerify 
}: SnapshotCardProps) {
  const getBadgeDesign = (type: string) => {
    const designs = {
      self: "bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20",
      expert: "bg-gradient-to-br from-success/10 to-success/5 border-success/20", 
      company: "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20"
    };
    return designs[type as keyof typeof designs] || designs.self;
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      self: "Self-Reviewed",
      expert: "Expert-Verified", 
      company: "Company Badge"
    };
    return labels[type as keyof typeof labels] || "Snapshot";
  };

  return (
    <Card className={cn("premium-card", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant={snapshot.type === 'expert' ? 'default' : 'secondary'}>
                <QuentlexLogo size="sm" className="mr-1" />
                {getTypeLabel(snapshot.type)}
              </Badge>
              {snapshot.isVerified && (
                <Badge variant="outline" className="status-success">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg">{snapshot.title}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(snapshot.timestamp).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Hash className="w-4 h-4" />
                {snapshot.badgeId.slice(0, 8)}...
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Badge Visual */}
        <div className={cn(
          "relative p-6 rounded-lg border-2 text-center",
          getBadgeDesign(snapshot.type)
        )}>
          <div className="space-y-2">
            <div className="w-16 h-16 mx-auto bg-background rounded-full flex items-center justify-center border-2 border-border p-2">
              <QuentlexLogo size="lg" className="w-full h-full" />
            </div>
            <div className="text-sm font-medium">Badge ID: {snapshot.badgeId}</div>
            {snapshot.riskScore && (
              <div className="text-2xl font-bold text-primary">
                {snapshot.riskScore}/100
              </div>
            )}
            <div className="text-xs text-muted-foreground">
              Simulated ZK Proof • Tx: {snapshot.txId.slice(0, 12)}...
            </div>
          </div>
        </div>

        {/* Expert Verification */}
        {snapshot.lawyer && (
          <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-success" />
              <span className="text-sm font-medium">Expert Verified</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <div>{snapshot.lawyer.name}</div>
              <div>{snapshot.lawyer.jurisdiction} • License #{snapshot.lawyer.license}</div>
            </div>
          </div>
        )}

        {/* Included Documents */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Included Documents ({snapshot.documents.length})</h4>
          <div className="space-y-2">
            {snapshot.documents.map((doc, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{doc.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {doc.type}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  {doc.hash.slice(0, 8)}...
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={onShare}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onVerify}
            className="ml-auto"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Verify
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}