import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  GitBranch, Clock, Shield, FileText, Download, ExternalLink,
  CheckCircle, AlertTriangle, Users, Zap, Hash, Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProofEvent {
  id: string;
  type: 'generation' | 'verification' | 'share' | 'update' | 'expiry';
  title: string;
  description: string;
  timestamp: Date;
  actor: string;
  actorType: 'system' | 'user' | 'expert' | 'external';
  proofHash: string;
  jurisdiction?: string;
  riskScore?: number;
  documents?: string[];
  verificationLevel: 'self' | 'expert' | 'institutional';
  status: 'completed' | 'pending' | 'failed' | 'expired';
}

interface ProofTimelineProps {
  className?: string;
  compactView?: boolean;
}

export function ProofTimeline({ className, compactView = false }: ProofTimelineProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'generation' | 'verification'>('all');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const mockEvents: ProofEvent[] = [
    {
      id: "1",
      type: "generation",
      title: "ZK Compliance Proof Generated",
      description: "Generated comprehensive compliance proof for UAE jurisdiction with MiCA requirements",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      actor: "System AI",
      actorType: "system",
      proofHash: "0x7f9c...a4b2",
      jurisdiction: "UAE",
      riskScore: 23,
      documents: ["Whitepaper v2.1", "Token Economics", "AML Policy"],
      verificationLevel: "self",
      status: "completed"
    },
    {
      id: "2",
      type: "verification",
      title: "Expert Verification Complete",
      description: "Sarah Chen (Securities Attorney) verified proof with additional regulatory insights",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      actor: "Sarah Chen",
      actorType: "expert",
      proofHash: "0x7f9c...a4b2",
      jurisdiction: "UAE",
      riskScore: 18,
      verificationLevel: "expert",
      status: "completed"
    },
    {
      id: "3",
      type: "share",
      title: "Proof Shared with Investor",
      description: "Shared compliance proof with Paradigm Ventures via secure link",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      actor: "John Doe",
      actorType: "user",
      proofHash: "0x7f9c...a4b2",
      verificationLevel: "expert",
      status: "completed"
    },
    {
      id: "4",
      type: "update",
      title: "Regulatory Update Applied",
      description: "Applied latest MiCA requirements update to existing proof",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      actor: "System AI",
      actorType: "system",
      proofHash: "0x6e8b...c3d1",
      jurisdiction: "UAE",
      riskScore: 25,
      verificationLevel: "self",
      status: "completed"
    },
    {
      id: "5",
      type: "generation",
      title: "Singapore Compliance Proof",
      description: "Generated compliance proof for Singapore market entry",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      actor: "System AI",
      actorType: "system",
      proofHash: "0x5d7a...b2e0",
      jurisdiction: "Singapore",
      riskScore: 31,
      documents: ["Business Plan", "KYC Procedures", "Privacy Policy"],
      verificationLevel: "self",
      status: "completed"
    }
  ];

  const filteredEvents = mockEvents.filter(event => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'generation') return event.type === 'generation';
    if (selectedFilter === 'verification') return event.type === 'verification';
    return true;
  });

  const getEventIcon = (type: ProofEvent['type']) => {
    switch (type) {
      case 'generation': return Zap;
      case 'verification': return Shield;
      case 'share': return ExternalLink;
      case 'update': return FileText;
      case 'expiry': return AlertTriangle;
      default: return Clock;
    }
  };

  const getEventColor = (type: ProofEvent['type'], status: ProofEvent['status']) => {
    if (status === 'failed') return 'text-destructive bg-destructive/10';
    if (status === 'expired') return 'text-muted-foreground bg-muted/10';
    
    switch (type) {
      case 'generation': return 'text-primary bg-primary/10';
      case 'verification': return 'text-success bg-success/10';
      case 'share': return 'text-warning bg-warning/10';
      case 'update': return 'text-blue-600 bg-blue-100';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getVerificationBadge = (level: ProofEvent['verificationLevel']) => {
    switch (level) {
      case 'institutional':
        return <Badge variant="default">Institutional</Badge>;
      case 'expert':
        return <Badge variant="secondary">Expert-Verified</Badge>;
      case 'self':
        return <Badge variant="outline">Self-Verified</Badge>;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const exportTimeline = () => {
    const exportData = {
      generated: new Date().toISOString(),
      events: filteredEvents,
      summary: {
        totalEvents: filteredEvents.length,
        verificationLevels: {
          self: filteredEvents.filter(e => e.verificationLevel === 'self').length,
          expert: filteredEvents.filter(e => e.verificationLevel === 'expert').length,
          institutional: filteredEvents.filter(e => e.verificationLevel === 'institutional').length
        }
      }
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quentlex-proof-timeline-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (compactView) {
    return (
      <Card className={cn("", className)}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <GitBranch className="w-4 h-4" />
              Recent Proof Activity
            </CardTitle>
            <Button variant="ghost" size="sm">
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockEvents.slice(0, 3).map((event) => {
              const IconComponent = getEventIcon(event.type);
              return (
                <div key={event.id} className="flex items-start gap-3">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                    getEventColor(event.type, event.status)
                  )}>
                    <IconComponent className="w-3 h-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{formatTimestamp(event.timestamp)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Proof Evolution Timeline
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={exportTimeline}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Filters */}
        <Tabs value={selectedFilter} onValueChange={(v) => setSelectedFilter(v as any)}>
          <TabsList>
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="generation">Generations</TabsTrigger>
            <TabsTrigger value="verification">Verifications</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Timeline */}
        <ScrollArea className="h-[500px]">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
            
            <div className="space-y-6">
              {filteredEvents.map((event, index) => {
                const IconComponent = getEventIcon(event.type);
                return (
                  <div key={event.id} className="relative flex items-start gap-4">
                    {/* Timeline node */}
                    <div className={cn(
                      "relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 border-background",
                      getEventColor(event.type, event.status)
                    )}>
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Event content */}
                    <Card className="flex-1">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {event.description}
                            </p>
                          </div>
                          {getVerificationBadge(event.verificationLevel)}
                        </div>

                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {event.actor}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTimestamp(event.timestamp)}
                          </div>
                          {event.jurisdiction && (
                            <div className="flex items-center gap-1">
                              <Shield className="w-3 h-3" />
                              {event.jurisdiction}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-xs">
                              <Hash className="w-3 h-3" />
                              <code className="bg-muted px-1 rounded">
                                {event.proofHash}
                              </code>
                            </div>
                            {event.riskScore && (
                              <Badge variant="outline" className="text-xs">
                                Risk: {event.riskScore}%
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                            {event.type === 'generation' && (
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>

                        {event.documents && event.documents.length > 0 && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-xs text-muted-foreground mb-2">
                              Documents analyzed:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {event.documents.map((doc, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}