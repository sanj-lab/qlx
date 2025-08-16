import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Share2, Link, Eye, Shield, Clock, Copy, ExternalLink, Mail, Calendar } from "lucide-react";
import { toast } from "sonner";

interface SharedBadge {
  id: string;
  title: string;
  type: string;
  sharedDate: string;
  expiresDate?: string;
  views: number;
  verifications: number;
  shareLink: string;
  restrictions: {
    emailOnly: boolean;
    allowedEmails: string[];
    timeLimit: boolean;
    expiresAt?: string;
  };
}

interface VerificationEvent {
  id: string;
  badgeId: string;
  verifierEmail?: string;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  location: string;
}

export default function ShareHubPage() {
  const navigate = useNavigate();
  const [selectedBadge, setSelectedBadge] = useState<string>("");
  const [shareSettings, setShareSettings] = useState({
    emailRestriction: false,
    allowedEmails: "",
    timeLimit: false,
    expirationDays: "7",
    watermark: true
  });
  const [sharedBadges, setSharedBadges] = useState<SharedBadge[]>([]);
  const [verificationEvents, setVerificationEvents] = useState<VerificationEvent[]>([]);

  useEffect(() => {
    document.title = "Share & Verify Hub – Quentlex";
    loadMockData();
  }, []);

  const loadMockData = () => {
    // Mock shared badges
    const mockSharedBadges: SharedBadge[] = [
      {
        id: 'badge-1',
        title: 'Business Risk Analysis - UAE',
        type: 'Self-Reviewed',
        sharedDate: '2025-01-15',
        expiresDate: '2025-01-22',
        views: 12,
        verifications: 3,
        shareLink: 'https://quentlex.app/verify/abc123',
        restrictions: {
          emailOnly: true,
          allowedEmails: ['investor@fund.com', 'partner@vc.com'],
          timeLimit: true,
          expiresAt: '2025-01-22'
        }
      },
      {
        id: 'badge-2',
        title: 'Expert-Verified Company Badge',
        type: 'Expert-Reviewed',
        sharedDate: '2025-01-10',
        views: 24,
        verifications: 8,
        shareLink: 'https://quentlex.app/verify/def456',
        restrictions: {
          emailOnly: false,
          allowedEmails: [],
          timeLimit: false
        }
      }
    ];

    // Mock verification events
    const mockEvents: VerificationEvent[] = [
      {
        id: 'event-1',
        badgeId: 'badge-1',
        verifierEmail: 'investor@fund.com',
        timestamp: '2025-01-16T10:30:00Z',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0...',
        location: 'Dubai, UAE'
      },
      {
        id: 'event-2',
        badgeId: 'badge-2',
        timestamp: '2025-01-15T14:20:00Z',
        ipAddress: '10.0.0.1',
        userAgent: 'Mozilla/5.0...',
        location: 'London, UK'
      }
    ];

    setSharedBadges(mockSharedBadges);
    setVerificationEvents(mockEvents);
  };

  const mockBadges = [
    { id: 'badge-1', title: 'Business Risk Analysis - UAE', type: 'Self-Reviewed' },
    { id: 'badge-2', title: 'Expert-Verified Company Badge', type: 'Expert-Reviewed' },
    { id: 'badge-3', title: 'Document Risk Score - Contract', type: 'Self-Reviewed' }
  ];

  const handleCreateShare = () => {
    if (!selectedBadge) {
      toast.error("Please select a badge to share");
      return;
    }

    const selectedBadgeData = mockBadges.find(b => b.id === selectedBadge);
    if (!selectedBadgeData) return;

    const shareId = Math.random().toString(36).substr(2, 8);
    const shareLink = `https://quentlex.app/verify/${shareId}`;

    const newSharedBadge: SharedBadge = {
      id: selectedBadge,
      title: selectedBadgeData.title,
      type: selectedBadgeData.type,
      sharedDate: new Date().toISOString().split('T')[0],
      expiresDate: shareSettings.timeLimit 
        ? new Date(Date.now() + parseInt(shareSettings.expirationDays) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        : undefined,
      views: 0,
      verifications: 0,
      shareLink,
      restrictions: {
        emailOnly: shareSettings.emailRestriction,
        allowedEmails: shareSettings.emailRestriction 
          ? shareSettings.allowedEmails.split(',').map(e => e.trim()).filter(Boolean)
          : [],
        timeLimit: shareSettings.timeLimit,
        expiresAt: shareSettings.timeLimit 
          ? new Date(Date.now() + parseInt(shareSettings.expirationDays) * 24 * 60 * 60 * 1000).toISOString()
          : undefined
      }
    };

    setSharedBadges(prev => [newSharedBadge, ...prev]);
    toast.success("Share link created successfully");
    
    // Reset form
    setSelectedBadge("");
    setShareSettings({
      emailRestriction: false,
      allowedEmails: "",
      timeLimit: false,
      expirationDays: "7",
      watermark: true
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Link copied to clipboard");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="py-8 px-6 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/proofs')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Proofs
            </Button>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <Share2 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Share & Verify Hub</h1>
            <Badge variant="outline">Live</Badge>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            Share badges securely with investors and regulators. Create time-limited links, 
            restrict access, and track verification history.
          </p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="create" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="create">Create Share</TabsTrigger>
              <TabsTrigger value="shared">Shared Badges</TabsTrigger>
              <TabsTrigger value="audit">Audit Log</TabsTrigger>
            </TabsList>

            {/* Create Share Tab */}
            <TabsContent value="create" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <Card className="enterprise-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Share2 className="w-5 h-5 text-primary" />
                        Select Badge to Share
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Select value={selectedBadge} onValueChange={setSelectedBadge}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a badge" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockBadges.map(badge => (
                            <SelectItem key={badge.id} value={badge.id}>
                              <div className="flex items-center justify-between w-full">
                                <span>{badge.title}</span>
                                <Badge variant="outline" className="ml-2">
                                  {badge.type}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </CardContent>
                  </Card>

                  <Card className="enterprise-card">
                    <CardHeader>
                      <CardTitle>Share Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Email Restriction */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Restriction</p>
                            <p className="text-sm text-muted-foreground">Only allow specific emails to access</p>
                          </div>
                          <Switch 
                            checked={shareSettings.emailRestriction}
                            onCheckedChange={(checked) => setShareSettings(prev => ({ ...prev, emailRestriction: checked }))}
                          />
                        </div>
                        
                        {shareSettings.emailRestriction && (
                          <div>
                            <label className="text-sm font-medium mb-2 block">Allowed Emails</label>
                            <Input
                              placeholder="investor@fund.com, partner@vc.com"
                              value={shareSettings.allowedEmails}
                              onChange={(e) => setShareSettings(prev => ({ ...prev, allowedEmails: e.target.value }))}
                            />
                            <p className="text-xs text-muted-foreground mt-1">Separate multiple emails with commas</p>
                          </div>
                        )}
                      </div>

                      {/* Time Limit */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Time Limit</p>
                            <p className="text-sm text-muted-foreground">Set expiration for the share link</p>
                          </div>
                          <Switch 
                            checked={shareSettings.timeLimit}
                            onCheckedChange={(checked) => setShareSettings(prev => ({ ...prev, timeLimit: checked }))}
                          />
                        </div>
                        
                        {shareSettings.timeLimit && (
                          <div>
                            <label className="text-sm font-medium mb-2 block">Expires After</label>
                            <Select 
                              value={shareSettings.expirationDays} 
                              onValueChange={(value) => setShareSettings(prev => ({ ...prev, expirationDays: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 Day</SelectItem>
                                <SelectItem value="3">3 Days</SelectItem>
                                <SelectItem value="7">1 Week</SelectItem>
                                <SelectItem value="14">2 Weeks</SelectItem>
                                <SelectItem value="30">1 Month</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>

                      {/* Watermark */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Add Watermark</p>
                          <p className="text-sm text-muted-foreground">Include Quentlex branding on shared badge</p>
                        </div>
                        <Switch 
                          checked={shareSettings.watermark}
                          onCheckedChange={(checked) => setShareSettings(prev => ({ ...prev, watermark: checked }))}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Button 
                    onClick={handleCreateShare}
                    className="w-full h-12 text-base font-semibold"
                    disabled={!selectedBadge}
                  >
                    <Link className="w-5 h-5 mr-2" />
                    Create Share Link
                  </Button>
                </div>

                <div className="space-y-6">
                  <Card className="enterprise-card">
                    <CardHeader>
                      <CardTitle className="text-lg">Share Benefits</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Secure Verification</p>
                            <p className="text-sm text-muted-foreground">Cryptographic proof validation</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Eye className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Access Control</p>
                            <p className="text-sm text-muted-foreground">Email restrictions and time limits</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-primary mt-0.5" />
                          <div>
                            <p className="font-medium">Audit Trail</p>
                            <p className="text-sm text-muted-foreground">Complete verification history</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Shared Badges Tab */}
            <TabsContent value="shared" className="space-y-6">
              <div className="grid gap-4">
                {sharedBadges.map((badge) => (
                  <Card key={badge.id} className="enterprise-card">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{badge.title}</h3>
                            <Badge variant={badge.type === 'Expert-Reviewed' ? 'default' : 'secondary'}>
                              {badge.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Shared {formatDate(badge.sharedDate)}
                            </span>
                            {badge.expiresDate && (
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                Expires {formatDate(badge.expiresDate)}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(badge.shareLink)}
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            Copy Link
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(badge.shareLink, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{badge.views}</div>
                          <div className="text-xs text-muted-foreground">Views</div>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{badge.verifications}</div>
                          <div className="text-xs text-muted-foreground">Verifications</div>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">
                            {badge.restrictions.emailOnly ? badge.restrictions.allowedEmails.length : '∞'}
                          </div>
                          <div className="text-xs text-muted-foreground">Access</div>
                        </div>
                        <div className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">
                            {badge.restrictions.timeLimit ? '📅' : '∞'}
                          </div>
                          <div className="text-xs text-muted-foreground">Duration</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Audit Log Tab */}
            <TabsContent value="audit" className="space-y-6">
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    Verification Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {verificationEvents.map((event) => {
                      const badge = sharedBadges.find(b => b.id === event.badgeId);
                      return (
                        <div key={event.id} className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <Eye className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm">{badge?.title || 'Unknown Badge'}</span>
                              <Badge variant="outline" className="text-xs">Verified</Badge>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {event.verifierEmail || 'Anonymous'}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(event.timestamp).toLocaleString()}
                              </div>
                              <div>{event.location}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}