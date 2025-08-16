import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Handshake, FolderOpen, TrendingUp, Clock, DollarSign, Users, 
  FileText, AlertTriangle, CheckCircle, ArrowRight, Upload, 
  Target, Zap, Shield, Globe
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DealDeskPage() {
  const [activeDeals] = useState([
    {
      id: 1,
      name: "Series A Round",
      investor: "Paradigm Ventures",
      amount: "$15M",
      stage: "Term Sheet Review",
      progress: 75,
      lastUpdate: "2 hours ago",
      status: "active",
      priority: "high"
    },
    {
      id: 2,
      name: "Strategic Partnership",
      investor: "Binance Labs",
      amount: "$5M",
      stage: "Due Diligence",
      progress: 45,
      lastUpdate: "1 day ago",
      status: "pending",
      priority: "medium"
    }
  ]);

  const [analytics] = useState({
    totalValue: "$47M",
    activeDeals: 4,
    avgCloseTime: "73 days",
    successRate: "87%"
  });

  useEffect(() => {
    document.title = "Deal Desk – Quentlex";
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <section className="py-8 px-6 border-b">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Deal Desk</h1>
              <p className="text-muted-foreground max-w-2xl">
                Enterprise fundraising command center. AI-powered negotiations, investor data rooms, and compliance-verified deal flow.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg">
                <Upload className="w-4 h-4 mr-2"/>
                Upload Term Sheet
              </Button>
              <Button size="lg">
                <Target className="w-4 h-4 mr-2"/>
                New Deal
              </Button>
            </div>
          </div>

          {/* Analytics Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-success" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pipeline Value</p>
                    <p className="text-xl font-bold">{analytics.totalValue}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Active Deals</p>
                    <p className="text-xl font-bold">{analytics.activeDeals}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-warning" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Close Time</p>
                    <p className="text-xl font-bold">{analytics.avgCloseTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-success" />
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-xl font-bold">{analytics.successRate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-8 px-6">
        <div className="container mx-auto max-w-7xl">
          <Tabs defaultValue="tools" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tools">Deal Tools</TabsTrigger>
              <TabsTrigger value="pipeline">Active Pipeline</TabsTrigger>
              <TabsTrigger value="rooms">Investor Rooms</TabsTrigger>
            </TabsList>

            <TabsContent value="tools" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* AI Negotiator */}
                <Card className="enterprise-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Handshake className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">AI Negotiator</CardTitle>
                          <p className="text-sm text-muted-foreground">Smart term sheet analysis & editing</p>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        <Zap className="w-3 h-3 mr-1" />
                        AI-Powered
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm">
                          Upload term sheets for instant analysis. Get AI-powered recommendations on valuation, 
                          dilution, liquidation preferences, and board composition.
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Market comparisons & benchmarking</li>
                          <li>• Red flag identification</li>
                          <li>• Counter-proposal generation</li>
                          <li>• Legal compliance check</li>
                        </ul>
                      </div>
                      <Button asChild className="w-full">
                        <Link to="/negotiation-agent">
                          Launch Negotiator
                          <ArrowRight className="w-4 h-4 ml-2"/>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Investor Data Rooms */}
                <Card className="enterprise-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                          <FolderOpen className="w-5 h-5 text-success" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Investor Data Rooms</CardTitle>
                          <p className="text-sm text-muted-foreground">Secure, organized due diligence</p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        <Shield className="w-3 h-3 mr-1" />
                        Secure
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm">
                          Create structured data rooms with compliance badges. Control access, track document 
                          views, and provide verifiable compliance snapshots.
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Badge-verified documents</li>
                          <li>• Granular access controls</li>
                          <li>• Download & view tracking</li>
                          <li>• Time-limited access links</li>
                        </ul>
                      </div>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/share-room">
                          Create Data Room
                          <ArrowRight className="w-4 h-4 ml-2"/>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Compliance Verification */}
                <Card className="enterprise-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-warning" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Compliance Verification</CardTitle>
                          <p className="text-sm text-muted-foreground">ZK-verified company readiness</p>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        <Globe className="w-3 h-3 mr-1" />
                        Multi-Jurisdiction
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm">
                          Generate investor-ready compliance snapshots with zero-knowledge verification. 
                          Prove readiness without exposing sensitive details.
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Zero-knowledge proof generation</li>
                          <li>• Multi-jurisdiction compliance</li>
                          <li>• Investor-ready badges</li>
                          <li>• Real-time verification links</li>
                        </ul>
                      </div>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/proofs">
                          Generate Proof
                          <ArrowRight className="w-4 h-4 ml-2"/>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Legal Collaboration */}
                <Card className="enterprise-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-destructive" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Legal Co-Review</CardTitle>
                          <p className="text-sm text-muted-foreground">Expert legal collaboration</p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        <Users className="w-3 h-3 mr-1" />
                        Collaborative
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm">
                          Connect with legal experts for term sheet review, contract negotiation, 
                          and regulatory guidance throughout your fundraising process.
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Expert lawyer matching</li>
                          <li>• Real-time document collaboration</li>
                          <li>• Review thread management</li>
                          <li>• Cost tracking & budgeting</li>
                        </ul>
                      </div>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/co-review">
                          Start Legal Review
                          <ArrowRight className="w-4 h-4 ml-2"/>
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pipeline" className="space-y-6">
              <div className="grid gap-4">
                {activeDeals.map((deal) => (
                  <Card key={deal.id} className="enterprise-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">{deal.name}</h3>
                            <p className="text-sm text-muted-foreground">{deal.investor}</p>
                          </div>
                          <Badge variant={deal.priority === 'high' ? 'destructive' : 'outline'}>
                            {deal.priority} priority
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-success">{deal.amount}</p>
                          <p className="text-xs text-muted-foreground">{deal.lastUpdate}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{deal.stage}</span>
                          <span className="text-sm text-muted-foreground">{deal.progress}%</span>
                        </div>
                        <Progress value={deal.progress} className="h-2" />
                        
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline">
                            <FileText className="w-3 h-3 mr-1" />
                            View Docs
                          </Button>
                          <Button size="sm" variant="outline">
                            <Handshake className="w-3 h-3 mr-1" />
                            Negotiate
                          </Button>
                          <Button size="sm">
                            <ArrowRight className="w-3 h-3 mr-1" />
                            Continue
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rooms" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Series A - Paradigm", status: "Active", docs: 47, lastAccess: "2h ago" },
                  { name: "Strategic - Binance", status: "Pending", docs: 23, lastAccess: "1d ago" },
                  { name: "Seed - A16z", status: "Closed", docs: 31, lastAccess: "1w ago" }
                ].map((room, index) => (
                  <Card key={index} className="enterprise-card">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{room.name}</h4>
                          <Badge variant={room.status === 'Active' ? 'default' : 'outline'}>
                            {room.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{room.docs} documents</span>
                          <span>Last: {room.lastAccess}</span>
                        </div>
                        <Button size="sm" className="w-full">
                          <FolderOpen className="w-3 h-3 mr-1" />
                          Open Room
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
