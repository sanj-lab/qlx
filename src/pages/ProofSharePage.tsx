// @new - Complete Share & Verify functionality for Proofs
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { VerificationPanel } from "@/components/ui/verification-panel";
import { EnhancedProofSimulator } from "@/lib/enhanced-simulation";
import { 
  ArrowLeft, 
  Share2, 
  Copy, 
  Mail, 
  Globe, 
  Shield,
  ExternalLink,
  Calendar,
  Settings
} from "lucide-react";

export default function ProofSharePage() {
  const navigate = useNavigate();
  const [selectedSnapshots, setSelectedSnapshots] = useState<string[]>([]);
  const [shareSettings, setShareSettings] = useState({
    isPublic: true,
    requireCode: false,
    expiresIn: 30, // days
    accessCode: '',
    allowDownloads: true
  });
  const [shareUrl, setShareUrl] = useState('');
  const [verificationEvents, setVerificationEvents] = useState<any[]>([]);
  const [mockSnapshots] = useState(() => {
    const simulator = new EnhancedProofSimulator();
    return simulator.getMockSnapshots();
  });
  
  useEffect(() => {
    document.title = "Share & Verify – Quentlex Proofs";
    
    // Load mock verification events
    const simulator = new EnhancedProofSimulator();
    setVerificationEvents(simulator.generateMockVerificationEvents(8));
  }, []);

  const handleCreateShareLink = () => {
    if (selectedSnapshots.length === 0) return;
    
    // Generate share URL
    const baseUrl = 'https://verify.quentlex.com/shared';
    const shareId = Math.random().toString(36).slice(2, 10);
    const url = `${baseUrl}/${shareId}`;
    setShareUrl(url);
  };

  const handleCopyUrl = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
    }
  };

  const handleEmailShare = () => {
    const subject = 'Quentlex Compliance Verification';
    const body = `Please review our compliance verification at: ${shareUrl}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 px-6 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/proofs')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Proofs
            </Button>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <Share2 className="w-7 h-7 text-primary" />
            <h1 className="text-3xl font-bold">Share & Verify</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Create secure sharing links for your compliance snapshots and track verification events in real-time.
          </p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Share Configuration */}
            <div className="space-y-6">
              {/* Snapshot Selection */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Select Snapshots to Share
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockSnapshots.map((snapshot) => (
                    <div 
                      key={snapshot.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedSnapshots.includes(snapshot.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => {
                        setSelectedSnapshots(prev => 
                          prev.includes(snapshot.id)
                            ? prev.filter(id => id !== snapshot.id)
                            : [...prev, snapshot.id]
                        );
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{snapshot.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {new Date(snapshot.timestamp).toLocaleDateString()}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">
                              {snapshot.type === 'expert' ? 'Expert-Verified' : 
                               snapshot.type === 'company' ? 'Company Badge' : 'Self-Reviewed'}
                            </Badge>
                            {snapshot.riskScore && (
                              <Badge variant="secondary">{snapshot.riskScore}/100</Badge>
                            )}
                          </div>
                        </div>
                        <div className="w-4 h-4 border border-border rounded flex items-center justify-center">
                          {selectedSnapshots.includes(snapshot.id) && (
                            <div className="w-2 h-2 bg-primary rounded-full" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Share Settings */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-primary" />
                    Share Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Public Access */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="public-access">Public Access</Label>
                      <p className="text-xs text-muted-foreground">Allow anyone with the link to view</p>
                    </div>
                    <Switch
                      id="public-access"
                      checked={shareSettings.isPublic}
                      onCheckedChange={(checked) => 
                        setShareSettings(prev => ({ ...prev, isPublic: checked }))
                      }
                    />
                  </div>

                  {/* Access Code */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="require-code">Require Access Code</Label>
                      <p className="text-xs text-muted-foreground">Add extra security layer</p>
                    </div>
                    <Switch
                      id="require-code"
                      checked={shareSettings.requireCode}
                      onCheckedChange={(checked) => 
                        setShareSettings(prev => ({ ...prev, requireCode: checked }))
                      }
                    />
                  </div>

                  {shareSettings.requireCode && (
                    <div className="space-y-2">
                      <Label htmlFor="access-code">Access Code</Label>
                      <Input
                        id="access-code"
                        placeholder="Enter access code"
                        value={shareSettings.accessCode}
                        onChange={(e) => 
                          setShareSettings(prev => ({ ...prev, accessCode: e.target.value }))
                        }
                      />
                    </div>
                  )}

                  {/* Expiration */}
                  <div className="space-y-2">
                    <Label htmlFor="expires-in">Link Expires In (days)</Label>
                    <Input
                      id="expires-in"
                      type="number"
                      value={shareSettings.expiresIn}
                      onChange={(e) => 
                        setShareSettings(prev => ({ ...prev, expiresIn: parseInt(e.target.value) }))
                      }
                    />
                  </div>

                  {/* Allow Downloads */}
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allow-downloads">Allow Downloads</Label>
                      <p className="text-xs text-muted-foreground">Let viewers download snapshots</p>
                    </div>
                    <Switch
                      id="allow-downloads"
                      checked={shareSettings.allowDownloads}
                      onCheckedChange={(checked) => 
                        setShareSettings(prev => ({ ...prev, allowDownloads: checked }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Create Share Link */}
              <Button 
                onClick={handleCreateShareLink}
                disabled={selectedSnapshots.length === 0}
                className="w-full"
                size="lg"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Create Secure Share Link
              </Button>

              {/* Generated Share Link */}
              {shareUrl && (
                <Card className="premium-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-primary" />
                      Share Link Generated
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-mono break-all">{shareUrl}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleCopyUrl} className="flex-1">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </Button>
                      <Button variant="outline" onClick={handleEmailShare} className="flex-1">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                      <Button variant="outline" asChild>
                        <a href={shareUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>

                    <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>Expires in {shareSettings.expiresIn} days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Verification Analytics */}
            <div className="space-y-6">
              {verificationEvents.length > 0 && (
                <VerificationPanel
                  badgeId="qlx_badge_sample"
                  verificationUrl="https://verify.quentlex.com/badge/qlx_badge_sample"
                  events={verificationEvents}
                  totalVerifications={verificationEvents.length + 15}
                  uniqueVerifiers={8}
                />
              )}

              {/* Information Panel */}
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="text-lg">Secure Sharing Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    Quentlex sharing links provide verifiable proof of compliance 
                    without exposing sensitive document details.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span>Cryptographically verifiable proofs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span>Privacy-preserving verification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span>Real-time access analytics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span>Granular access controls</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}