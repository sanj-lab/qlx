import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, Scale, Zap, Globe, Lock, CheckCircle, ArrowRight, Database, Cpu, Settings, Clock, 
  Lightbulb, Rocket, Users, Briefcase, Award, Eye, Gavel, Network, Target, Building, 
  FileSearch, TrendingUp, AlertCircle, BookOpen, Layers, Crown
} from "lucide-react";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Jobs-level simplicity */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/5" />
        <div className="relative py-24 px-6">
          <div className="container mx-auto max-w-5xl text-center">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Lock className="w-4 h-4" />
                Zero-Knowledge. Private by Design.
              </div>
              <h1 className="text-6xl md:text-7xl font-light text-foreground mb-8 tracking-tight">
                Legal Oracle
                <br />
                <span className="text-primary font-medium">for Web3</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-light leading-relaxed">
                Transform compliance into competitive advantage. 
                <br />
                Verifiable. Agentic. Cross-jurisdictional.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button asChild size="lg" className="h-14 px-10 text-base font-medium rounded-xl">
                <Link to="/clm">
                  <BookOpen className="w-5 h-5 mr-3" />
                  Start with CLM
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-10 text-base font-medium rounded-xl border-2">
                <Link to="/compliance">
                  <Shield className="w-5 h-5 mr-3" />
                  Compliance Scan
                </Link>
              </Button>
            </div>

            {/* Core Pillars - Minimal & Elegant */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-200">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Zero-Knowledge Proofs</h3>
                <p className="text-muted-foreground leading-relaxed">Trust without exposure. Prove compliance while keeping sensitive data private.</p>
              </div>
              
              <div className="group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-200">
                  <Network className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Agentic Intelligence</h3>
                <p className="text-muted-foreground leading-relaxed">AI that explains its reasoning. Step-by-step analysis you can trust.</p>
              </div>
              
              <div className="group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-200">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Global Compliance</h3>
                <p className="text-muted-foreground leading-relaxed">EU MiCA. US SEC. UAE VARA. One platform, every jurisdiction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Spaces - Enterprise-grade with premium icons */}
      <section className="py-24 px-6 bg-muted/20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-foreground mb-6 tracking-tight">The Spaces</h2>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">Five purpose-built environments. Zero friction. Maximum clarity.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Space 1: Launch Path */}
            <Card className="group relative overflow-hidden bg-card border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">Launch Path</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">From idea to incorporation. Agent-guided journey through every compliance milestone.</p>
                <div className="space-y-2 mb-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary/60" />
                    <span>Jurisdiction Navigator</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-primary/60" />
                    <span>Business Risk Lens</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary/60" />
                    <span>Token Classification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileSearch className="w-4 h-4 text-primary/60" />
                    <span>Contract Canvas</span>
                  </div>
                </div>
                <Button asChild className="w-full h-12 rounded-xl font-medium">
                  <Link to="/launch-path">
                    Launch Your Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Space 2: Co‑Review */}
            <Card className="group relative overflow-hidden bg-card border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-8">
                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">Co‑Review</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">Seamless collaboration with counsel. Share context once, iterate until perfect.</p>
                <div className="space-y-2 mb-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent/60" />
                    <span>Smart Item Selection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-accent/60" />
                    <span>Expert Counsel Network</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-accent/60" />
                    <span>Real-time Redlining</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-accent/60" />
                    <span>Final Approval Flow</span>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full h-12 rounded-xl font-medium border-2">
                  <Link to="/co-review">
                    Start Collaboration
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Space 3: Command Center */}
            <Card className="group relative overflow-hidden bg-card border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-8">
                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Building className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">Command Center</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">Enterprise oversight dashboard. Company-wide risk monitoring and compliance tracking.</p>
                <div className="space-y-2 mb-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-secondary/60" />
                    <span>Risk Score Monitoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-secondary/60" />
                    <span>Drift Detection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gavel className="w-4 h-4 text-secondary/60" />
                    <span>Filing Calendar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-secondary/60" />
                    <span>Compliance Status</span>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full h-12 rounded-xl font-medium border-2">
                  <Link to="/dashboard">
                    Access Dashboard
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Space 4: Proofs */}
            <Card className="group relative overflow-hidden bg-card border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-8">
                <div className="w-14 h-14 bg-success/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Lock className="w-7 h-7 text-success" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">Proofs</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">Zero-knowledge compliance proofs. Turn readiness into verifiable trust artifacts.</p>
                <div className="space-y-2 mb-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-success/60" />
                    <span>Self-Assessment Snapshot</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-success/60" />
                    <span>Expert-Verified Badge</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-success/60" />
                    <span>Public Verification Links</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-success/60" />
                    <span>Audit Trail Timeline</span>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full h-12 rounded-xl font-medium border-2">
                  <Link to="/proofs">
                    Generate Proofs
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Space 5: Deal Desk */}
            <Card className="group relative overflow-hidden bg-card border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl lg:col-span-2">
              <div className="absolute inset-0 bg-gradient-to-br from-warning/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-8">
                <div className="flex items-start gap-8">
                  <div className="w-14 h-14 bg-warning/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="w-7 h-7 text-warning" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3 text-foreground">Deal Desk</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">Fundraising acceleration tools. Intelligent negotiation and investor-ready data rooms.</p>
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Network className="w-4 h-4 text-warning/60" />
                          <span>AI Negotiation Agent</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-warning/60" />
                          <span>Smart Term Optimization</span>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-warning/60" />
                          <span>Secure Investor Rooms</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-warning/60" />
                          <span>Due Diligence Automation</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Button asChild className="h-12 rounded-xl font-medium">
                        <Link to="/negotiation-agent">
                          Negotiation Agent
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="h-12 rounded-xl font-medium border-2">
                        <Link to="/share-room">
                          Investor Room
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Coming Soon - Premium Future */}
      <section className="py-24 px-6 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-foreground mb-6 tracking-tight">The Future</h2>
            <p className="text-xl text-muted-foreground font-light">Next-generation legal infrastructure. Built for tomorrow's Web3.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group bg-card/50 border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6 text-primary/70" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-muted-foreground">Token Policy Engine</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Automated token compliance with smart contract generation and regulatory pre-validation.
                </p>
                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Q4 2025</span>
                </div>
                <Button variant="outline" size="sm" className="w-full rounded-lg" disabled>
                  Early Access
                </Button>
              </CardContent>
            </Card>

            <Card className="group bg-card/50 border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-6 h-6 text-primary/70" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-muted-foreground">IP Compliance Engine</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Patent conflict detection with automated licensing optimization.
                </p>
                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Q1 2026</span>
                </div>
                <Button variant="outline" size="sm" className="w-full rounded-lg" disabled>
                  Early Access
                </Button>
              </CardContent>
            </Card>

            <Card className="group bg-card/50 border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Database className="w-6 h-6 text-primary/70" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-muted-foreground">Legal DAO Registry</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  On-chain registry for verified entities with cross-jurisdictional recognition.
                </p>
                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Q2 2026</span>
                </div>
                <Button variant="outline" size="sm" className="w-full rounded-lg" disabled>
                  Early Access
                </Button>
              </CardContent>
            </Card>

            <Card className="group bg-card/50 border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Settings className="w-6 h-6 text-primary/70" />
                </div>
                <h3 className="font-semibold text-lg mb-3 text-muted-foreground">Enterprise API</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  White-label compliance workflows with custom deployment options.
                </p>
                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Q3 2026</span>
                </div>
                <Button variant="outline" size="sm" className="w-full rounded-lg" disabled>
                  Early Access
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Foundation - Jobs-level authority */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-foreground mb-6 tracking-tight">Trusted Foundation</h2>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">Built on principles that matter. Security, transparency, and regulatory excellence.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-success/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-200">
                  <Shield className="w-10 h-10 text-success" />
                </div>
                <div className="absolute inset-0 bg-success/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Enterprise Security</h3>
              <p className="text-muted-foreground leading-relaxed">Zero-knowledge architecture. Your sensitive legal data never leaves your control. Trust through mathematics, not promises.</p>
            </div>
            
            <div className="group text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-200">
                  <Scale className="w-10 h-10 text-primary" />
                </div>
                <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">Regulatory Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">Built with top legal minds across multiple jurisdictions. Compliance isn't a feature—it's our foundation.</p>
            </div>
            
            <div className="group text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-accent/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-200">
                  <Network className="w-10 h-10 text-accent" />
                </div>
                <div className="absolute inset-0 bg-accent/5 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">AI Transparency</h3>
              <p className="text-muted-foreground leading-relaxed">Every decision explained. Step-by-step reasoning with source citations. Intelligence you can audit and trust.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}