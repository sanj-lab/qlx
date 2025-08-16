import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Clock, Shield, Building2, FileText, Lightbulb, Eye, ExternalLink, TrendingUp } from "lucide-react";

interface TimelineBadge {
  id: string;
  title: string;
  type: 'Self-Reviewed' | 'Expert-Reviewed';
  scope: 'Document' | 'Business' | 'Idea' | 'Company';
  riskScore: string;
  date: string;
  lawyer?: {
    name: string;
    firm: string;
  };
  description: string;
  attachments?: string[];
  icon: any;
}

export default function TimelineViewPage() {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [expandedBadge, setExpandedBadge] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Timeline View – Quentlex";
  }, []);

  const timelineBadges: TimelineBadge[] = [
    {
      id: 'badge-6',
      title: 'Q4 2024 Company Compliance Review',
      type: 'Expert-Reviewed',
      scope: 'Company',
      riskScore: 'A-',
      date: '2024-12-15',
      lawyer: {
        name: 'Sarah Chen',
        firm: 'ADGM Corporate Law'
      },
      description: 'Comprehensive end-of-year compliance review covering all business operations and regulatory requirements.',
      attachments: ['Annual Report 2024', 'Compliance Checklist', 'Risk Assessment'],
      icon: Building2
    },
    {
      id: 'badge-5',
      title: 'Partnership Agreement Risk Analysis',
      type: 'Self-Reviewed',
      scope: 'Document',
      riskScore: 'B+',
      date: '2024-11-22',
      description: 'Analysis of strategic partnership agreement with technology provider for compliance and risk assessment.',
      attachments: ['Partnership Agreement Draft'],
      icon: FileText
    },
    {
      id: 'badge-4',
      title: 'AI Product Launch Compliance',
      type: 'Expert-Reviewed',
      scope: 'Business',
      riskScore: 'B',
      date: '2024-10-08',
      lawyer: {
        name: 'Michael Rodriguez',
        firm: 'Emirates Legal Partners'
      },
      description: 'Pre-launch compliance review for AI-powered financial services product in UAE market.',
      attachments: ['Product Specification', 'Market Analysis', 'Regulatory Mapping'],
      icon: Building2
    },
    {
      id: 'badge-3',
      title: 'Expansion to Singapore Market',
      type: 'Self-Reviewed',
      scope: 'Idea',
      riskScore: 'B+',
      date: '2024-09-14',
      description: 'Initial assessment of business expansion opportunity into Singapore financial services market.',
      attachments: ['Market Research', 'Regulatory Overview'],
      icon: Lightbulb
    },
    {
      id: 'badge-2',
      title: 'Data Privacy Policy Update',
      type: 'Expert-Reviewed',
      scope: 'Document',
      riskScore: 'A',
      date: '2024-08-30',
      lawyer: {
        name: 'Sarah Chen',
        firm: 'ADGM Corporate Law'
      },
      description: 'Updated privacy policy review for GDPR and UAE data protection compliance.',
      attachments: ['Privacy Policy v2.1', 'GDPR Compliance Matrix'],
      icon: FileText
    },
    {
      id: 'badge-1',
      title: 'Initial Business Risk Assessment',
      type: 'Self-Reviewed',
      scope: 'Company',
      riskScore: 'C+',
      date: '2024-07-15',
      description: 'Foundational compliance assessment at company formation stage.',
      attachments: ['Business Plan', 'Incorporation Documents'],
      icon: Building2
    }
  ];

  const filteredBadges = timelineBadges.filter(badge => {
    const periodMatch = selectedPeriod === "all" || 
      (selectedPeriod === "6months" && new Date(badge.date) > new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000)) ||
      (selectedPeriod === "3months" && new Date(badge.date) > new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000)) ||
      (selectedPeriod === "1month" && new Date(badge.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    
    const typeMatch = selectedType === "all" || badge.type === selectedType;
    
    return periodMatch && typeMatch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRiskScoreColor = (score: string) => {
    if (score.startsWith('A')) return 'text-green-600';
    if (score.startsWith('B')) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getComplianceTrend = () => {
    const scores = filteredBadges.map(badge => {
      const letter = badge.riskScore[0];
      return letter === 'A' ? 3 : letter === 'B' ? 2 : 1;
    });
    
    if (scores.length < 2) return { trend: 'stable', message: 'Not enough data' };
    
    const recent = scores.slice(0, Math.min(3, scores.length));
    const older = scores.slice(Math.min(3, scores.length));
    
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const olderAvg = older.length > 0 ? older.reduce((a, b) => a + b, 0) / older.length : recentAvg;
    
    if (recentAvg > olderAvg) return { trend: 'improving', message: 'Compliance improving over time' };
    if (recentAvg < olderAvg) return { trend: 'declining', message: 'Compliance needs attention' };
    return { trend: 'stable', message: 'Compliance remains stable' };
  };

  const complianceTrend = getComplianceTrend();

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
            <Clock className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Timeline View</h1>
            <Badge variant="outline">Analytics</Badge>
          </div>
          <p className="text-muted-foreground max-w-3xl">
            View compliance history and badge evolution over time. Track your company's 
            compliance journey and show continuous diligence to investors and regulators.
          </p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="1month">Last Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Self-Reviewed">Self-Reviewed</SelectItem>
                  <SelectItem value="Expert-Reviewed">Expert-Reviewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Compliance Trend Summary */}
          <Card className="enterprise-card mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <TrendingUp className={`w-6 h-6 ${
                    complianceTrend.trend === 'improving' ? 'text-green-600' : 
                    complianceTrend.trend === 'declining' ? 'text-red-600' : 'text-yellow-600'
                  }`} />
                  <div>
                    <h3 className="font-semibold">Compliance Trend</h3>
                    <p className="text-sm text-muted-foreground">{complianceTrend.message}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{filteredBadges.length}</div>
                  <div className="text-sm text-muted-foreground">Total Badges</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
            
            <div className="space-y-8">
              {filteredBadges.map((badge, index) => {
                const IconComponent = badge.icon;
                const isExpanded = expandedBadge === badge.id;
                
                return (
                  <div key={badge.id} className="relative flex items-start gap-6">
                    {/* Timeline dot */}
                    <div className="relative z-10 w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <Card className="enterprise-card">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <CardTitle className="text-lg">{badge.title}</CardTitle>
                                <Badge variant={badge.type === 'Expert-Reviewed' ? 'default' : 'secondary'}>
                                  {badge.type}
                                </Badge>
                                <Badge variant="outline">{badge.scope}</Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{formatDate(badge.date)}</span>
                                <span className={`font-medium ${getRiskScoreColor(badge.riskScore)}`}>
                                  Score: {badge.riskScore}
                                </span>
                                {badge.lawyer && (
                                  <span className="flex items-center gap-1">
                                    <Shield className="w-4 h-4" />
                                    {badge.lawyer.name}
                                  </span>
                                )}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setExpandedBadge(isExpanded ? null : badge.id)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              {isExpanded ? 'Collapse' : 'Expand'}
                            </Button>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                          <p className="text-muted-foreground mb-4">{badge.description}</p>
                          
                          {isExpanded && (
                            <div className="space-y-4 pt-4 border-t">
                              {badge.lawyer && (
                                <div className="p-3 bg-muted/50 rounded-lg">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Shield className="w-4 h-4 text-primary" />
                                    <span className="font-medium">Expert Review</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Verified by {badge.lawyer.name} from {badge.lawyer.firm}
                                  </p>
                                </div>
                              )}
                              
                              {badge.attachments && badge.attachments.length > 0 && (
                                <div>
                                  <h4 className="font-medium mb-2">Attached Documents</h4>
                                  <div className="space-y-2">
                                    {badge.attachments.map((attachment, idx) => (
                                      <div key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                                        <span className="text-sm">{attachment}</span>
                                        <Button variant="ghost" size="sm">
                                          <ExternalLink className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <ExternalLink className="w-4 h-4 mr-1" />
                                  View Badge
                                </Button>
                                <Button variant="outline" size="sm">
                                  Share
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {filteredBadges.length === 0 && (
            <Card className="enterprise-card">
              <CardContent className="p-12 text-center">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No badges found</h3>
                <p className="text-muted-foreground mb-4">
                  No badges match your current filters. Try adjusting the time period or badge type.
                </p>
                <Button onClick={() => {
                  setSelectedPeriod("all");
                  setSelectedType("all");
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </main>
  );
}