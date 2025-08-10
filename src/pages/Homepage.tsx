import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, Scale, Zap, Globe, Lock, CheckCircle, ArrowRight, Database, Cpu, Settings, Clock, Lightbulb, Users, FolderOpen, Bell, Share2, Calendar, GitBranch, FileCheck, Handshake, UserCheck, Archive, AlertTriangle } from "lucide-react";
export default function Homepage() {
  const [showNotifications, setShowNotifications] = useState(false);
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-6">
              <Shield className="w-3 h-3 mr-1" />
              Private-by-design
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              AI-Powered Legal Oracle
              <br />
              <span className="text-primary">for Web3</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Private-by-design. Verifiable. Cross-jurisdictional.
              <br />
              Transform legal compliance with zero-knowledge proofs and agentic AI.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/clm">
                <FileText className="w-5 h-5 mr-2" />
                Use CLM Engine
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link to="/compliance">
                <Scale className="w-5 h-5 mr-2" />
                Try Compliance Scan
              </Link>
            </Button>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="enterprise-card p-6">
              <CardContent className="flex flex-col items-center text-center space-y-3 p-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Zero-Knowledge Proofs</h3>
                <p className="text-muted-foreground">Generate verifiable compliance proofs without exposing sensitive data</p>
              </CardContent>
            </Card>
            
            <Card className="enterprise-card p-6">
              <CardContent className="flex flex-col items-center text-center space-y-3 p-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Agentic AI Analysis</h3>
                <p className="text-muted-foreground">AI agents that explain their reasoning and provide step-by-step analysis</p>
              </CardContent>
            </Card>
            
            <Card className="enterprise-card p-6">
              <CardContent className="flex flex-col items-center text-center space-y-3 p-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Cross-Jurisdictional</h3>
                <p className="text-muted-foreground">Support for EU MiCA, US SEC, UAE VARA, and more regulatory frameworks</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Spaces */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">The Spaces</h2>
            <p className="text-lg text-muted-foreground">Minimal clicks. Maximum clarity. Each space is a guided journey.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Space 1: Launch Path */}
            <Card className="enterprise-card p-6 hover:shadow-lg transition-all">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-2">Launch Path</h3>
                <p className="text-sm text-muted-foreground mb-4">From idea to ready. A single, agent‑guided flow.</p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Jurisdiction Navigator</li>
                  <li>• Token ID</li>
                  <li>• Compliance Map</li>
                  <li>• Risk Lens (idea)</li>
                  <li>• Contract Canvas</li>
                  <li>• Vault & Doc Studio</li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/launch-path">Open Launch Path <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
              </CardContent>
            </Card>

            {/* Space 2: Co‑Review */}
            <Card className="enterprise-card p-6 hover:shadow-lg transition-all">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-2">Co‑Review</h3>
                <p className="text-sm text-muted-foreground mb-4">Send docs, maps, or choices to counsel—once.</p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Pick Items</li>
                  <li>• Choose Counsel</li>
                  <li>• Collaborate & Redline</li>
                  <li>• Approve & Merge</li>
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/co-review">Open Co‑Review <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
              </CardContent>
            </Card>

            {/* Space 3: Command Center (Founder Dashboard) */}
            <Card className="enterprise-card p-6 hover:shadow-lg transition-all">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-2">Command Center</h3>
                <p className="text-sm text-muted-foreground mb-4">Company‑level oversight for founders.</p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Company Risk Score</li>
                  <li>• Status Board</li>
                  <li>• Drift Watch</li>
                  <li>• Filing Timeline</li>
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/dashboard">Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
              </CardContent>
            </Card>

            {/* Space 4: Proofs */}
            <Card className="enterprise-card p-6 hover:shadow-lg transition-all">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-2">Proofs</h3>
                <p className="text-sm text-muted-foreground mb-4">Turn readiness into trust. ZK only lives here.</p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Self Snapshot</li>
                  <li>• Expert Snapshot</li>
                  <li>• Share Link</li>
                  <li>• Timeline View</li>
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/proofs">Open Proofs <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
              </CardContent>
            </Card>

            {/* Space 5: Deal Desk */}
            <Card className="enterprise-card p-6 hover:shadow-lg transition-all">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-2">Deal Desk</h3>
                <p className="text-sm text-muted-foreground mb-4">Fundraising & diligence tools that move fast.</p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Negotiator</li>
                  <li>• Investor Room</li>
                </ul>
                <div className="grid grid-cols-2 gap-2">
                  <Button asChild size="sm"><Link to="/negotiation-agent">Negotiator</Link></Button>
                  <Button asChild size="sm" variant="outline"><Link to="/share-room">Investor Room</Link></Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Coming Soon</h2>
            <p className="text-lg text-muted-foreground">Next-generation legal infrastructure</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Token Policy Engine */}
            <Card className="enterprise-card p-6 opacity-75 hover:opacity-90 transition-opacity">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-muted-foreground">Token Policy Engine</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Automated token launch compliance with smart contract generation and regulatory pre-validation.
                </p>
                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <Clock className="w-3 h-3 mr-1" />
                  Q4 2025
                </div>
                <Button variant="outline" size="sm" className="w-full" disabled>
                  Request Early Access
                </Button>
              </CardContent>
            </Card>

            {/* IP Compliance Engine */}
            <Card className="enterprise-card p-6 opacity-75 hover:opacity-90 transition-opacity">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-muted-foreground">IP Compliance Engine</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Automated intellectual property clearance with patent conflict detection and licensing optimization.
                </p>
                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <Clock className="w-3 h-3 mr-1" />
                  Q1 2026
                </div>
                <Button variant="outline" size="sm" className="w-full" disabled>
                  Request Early Access
                </Button>
              </CardContent>
            </Card>

            {/* Legal DAO Registry */}
            <Card className="enterprise-card p-6 opacity-75 hover:opacity-90 transition-opacity">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-muted-foreground">Legal DAO Registry</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  On-chain registry for verified legal entities and DAOs with cross-jurisdictional recognition.
                </p>
                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <Clock className="w-3 h-3 mr-1" />
                  Q2 2026
                </div>
                <Button variant="outline" size="sm" className="w-full" disabled>
                  Request Early Access
                </Button>
              </CardContent>
            </Card>

            {/* Custom Compliance API */}
            <Card className="enterprise-card p-6 opacity-75 hover:opacity-90 transition-opacity">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-muted-foreground">Custom Compliance API</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Enterprise API for custom compliance workflows with white-label deployment options.
                </p>
                <div className="flex items-center text-xs text-muted-foreground mb-4">
                  <Clock className="w-3 h-3 mr-1" />
                  Q3 2026
                </div>
                <Button variant="outline" size="sm" className="w-full" disabled>
                  Request Early Access
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">Trusted by Legal Experts</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Enterprise-Grade Security</h3>
              <p className="text-muted-foreground">Zero-knowledge architecture ensures your sensitive legal data never leaves your control.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-success" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Regulatory Compliant</h3>
              <p className="text-muted-foreground">Built with input from leading legal experts across multiple jurisdictions.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-success" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI Transparency</h3>
              <p className="text-muted-foreground">Every AI decision is explainable with step-by-step reasoning and source citations.</p>
            </div>
          </div>
        </div>
      </section>
    </div>;
}