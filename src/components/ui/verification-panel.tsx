// @new
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  Globe, 
  Calendar, 
  Eye, 
  Download,
  Copy,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationEvent {
  id: string;
  timestamp: string;
  location: string;
  ipRegion: string;
  verifier: string;
  action: 'view' | 'download' | 'verify';
}

interface VerificationPanelProps {
  badgeId: string;
  verificationUrl: string;
  events: VerificationEvent[];
  totalVerifications: number;
  uniqueVerifiers: number;
  className?: string;
}

export function VerificationPanel({ 
  badgeId, 
  verificationUrl, 
  events, 
  totalVerifications,
  uniqueVerifiers,
  className 
}: VerificationPanelProps) {
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(verificationUrl);
  };

  const getActionIcon = (action: string) => {
    const icons = {
      view: Eye,
      download: Download,
      verify: ExternalLink
    };
    return icons[action as keyof typeof icons] || Eye;
  };

  const getActionColor = (action: string) => {
    const colors = {
      view: "text-accent",
      download: "text-success", 
      verify: "text-primary"
    };
    return colors[action as keyof typeof colors] || "text-muted-foreground";
  };

  return (
    <Card className={cn("premium-card", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary" />
          Verification Analytics
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">{totalVerifications}</div>
            <div className="text-xs text-muted-foreground">Total Verifications</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-accent">{uniqueVerifiers}</div>
            <div className="text-xs text-muted-foreground">Unique Verifiers</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-success">{events.length}</div>
            <div className="text-xs text-muted-foreground">Recent Events</div>
          </div>
        </div>

        {/* Verification URL */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Public Verification URL</h4>
          <div className="flex gap-2">
            <div className="flex-1 p-2 bg-muted/50 rounded-lg text-sm font-mono text-muted-foreground truncate">
              {verificationUrl}
            </div>
            <Button variant="outline" size="sm" onClick={handleCopyUrl}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={verificationUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Recent Events */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Recent Verification Events</h4>
            <Badge variant="outline" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>
          
          {events.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <Globe className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No verification events yet</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {events.map((event) => {
                const ActionIcon = getActionIcon(event.action);
                return (
                  <div 
                    key={event.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <ActionIcon className={cn("w-4 h-4", getActionColor(event.action))} />
                      <div>
                        <div className="text-sm font-medium">{event.verifier}</div>
                        <div className="text-xs text-muted-foreground">
                          {event.ipRegion} • {new Date(event.timestamp).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.action}
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Badge ID Reference */}
        <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="text-xs text-muted-foreground mb-1">Badge ID</div>
          <div className="font-mono text-sm">{badgeId}</div>
        </div>
      </CardContent>
    </Card>
  );
}