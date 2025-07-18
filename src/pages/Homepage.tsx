import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  FileText, 
  Scale, 
  Zap, 
  Globe, 
  Lock,
  CheckCircle,
  ArrowRight,
  Database,
  Cpu,
  Settings,
  Clock,
  Lightbulb,
  Users,
  FolderOpen,
  Bell,
  Share2,
  Calendar,
  GitBranch,
  FileCheck,
  Handshake,
  UserCheck,
  Archive,
  AlertTriangle
} from "lucide-react";

export default function Homepage() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen">
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

      {/* Founder Legal Dashboard */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Founder Legal Dashboard</h2>
            <p className="text-lg text-muted-foreground">Complete legal compliance toolkit for Web3 startups</p>
          </div>

          {/* Notification Bell */}
          <div className="flex justify-end mb-6">
            <button
              className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              </span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-6 mt-12 w-80 bg-background border rounded-lg shadow-lg p-4 z-50">
                <h4 className="font-semibold mb-3">Regulatory Updates</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-destructive/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                      <span className="font-medium text-sm">MiCA Update</span>
                    </div>
                    <p className="text-xs text-muted-foreground">New compliance requirements effective July 15, 2024</p>
                  </div>
                  <div className="p-3 bg-warning/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      <span className="font-medium text-sm">UAE VARA Guidelines</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Updated liability frameworks - review contracts</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* 1. Clause Redline Agent */}
            <Card className="enterprise-card p-6 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Clause Redline Agent</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Automatically detects legal compliance gaps with real-time explanations and agentic suggestions.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="secondary" className="text-xs">Smart Contract Support</Badge>
                      <Badge variant="secondary" className="text-xs">Risk Scoring</Badge>
                    </div>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full bg-background hover:bg-primary hover:text-primary-foreground border transition-colors">
                  <Link to="/clm">
                    Fix Clauses
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* 2. Jurisdiction Selector + Compliance Scoring */}
            <Card className="enterprise-card p-6 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Scale className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Jurisdiction Selector + Compliance Scoring</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Choose the most legally favorable jurisdiction with ZK proof generation built-in.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="secondary" className="text-xs">License Detection</Badge>
                      <Badge variant="secondary" className="text-xs">ZK Proofs</Badge>
                    </div>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full bg-background hover:bg-primary hover:text-primary-foreground border transition-colors">
                  <Link to="/compliance">
                    Generate Score
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* 3. Token Classification Agent */}
            <Card className="enterprise-card p-6 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GitBranch className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Token Classification Agent</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Analyze tokenomics using Howey Test, MiCA, and SEC frameworks with confidence scoring.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="secondary" className="text-xs">Howey Test</Badge>
                      <Badge variant="secondary" className="text-xs">MiCA Analysis</Badge>
                    </div>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full bg-background hover:bg-primary hover:text-primary-foreground border transition-colors">
                  <Link to="/token-classification">
                    Analyze Token
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* 4. Modular Legal Document Generator */}
            <Card className="enterprise-card p-6 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Modular Legal Document Generator</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Generate SAFT, DAO Charter, Privacy Policy based on jurisdiction and token model.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="secondary" className="text-xs">SAFT Generation</Badge>
                      <Badge variant="secondary" className="text-xs">Smart Contract Export</Badge>
                    </div>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full bg-background hover:bg-primary hover:text-primary-foreground border transition-colors">
                  <Link to="/document-generator">
                    Generate Docs
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* 5. Regulatory Compliance Proof Generator */}
            <Card className="enterprise-card p-6 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Regulatory Compliance Proof Generator</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Convert compliance results into verifiable ZK proofs with timestamped badges.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="secondary" className="text-xs">ZK-Verified</Badge>
                      <Badge variant="secondary" className="text-xs">IPFS Storage</Badge>
                    </div>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full bg-background hover:bg-primary hover:text-primary-foreground border transition-colors">
                  <Link to="/proof-generator">
                    Generate Proof
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* 6. Negotiation Strategy Agent */}
            <Card className="enterprise-card p-6 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Handshake className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Negotiation Strategy Agent</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload Term Sheet, get risk scores and clause suggestions for deal outcomes.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="secondary" className="text-xs">Risk Analysis</Badge>
                      <Badge variant="secondary" className="text-xs">Deal Simulation</Badge>
                    </div>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full bg-background hover:bg-primary hover:text-primary-foreground border transition-colors">
                  <Link to="/negotiation-agent">
                    Simulate Deal
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* 7. Async Legal Review Routing */}
            <Card className="enterprise-card p-6 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <UserCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Async Legal Review Routing</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Route documents to reviewers with status tracking and comment threads.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="secondary" className="text-xs">Status Tracking</Badge>
                      <Badge variant="secondary" className="text-xs">Comment System</Badge>
                    </div>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full bg-background hover:bg-primary hover:text-primary-foreground border transition-colors">
                  <Link to="/review-routing">
                    Request Review
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* 8. Legal Memory & Filing Vault */}
            <Card className="enterprise-card p-6 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Archive className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Legal Memory & Filing Vault</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Timeline view with version control and encrypted storage for finalized docs.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="secondary" className="text-xs">Version Control</Badge>
                      <Badge variant="secondary" className="text-xs">Encrypted Storage</Badge>
                    </div>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full bg-background hover:bg-primary hover:text-primary-foreground border transition-colors">
                  <Link to="/legal-vault">
                    Vault This
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* 9. Change Detection & Regulatory Alerting */}
            <Card className="enterprise-card p-6 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Change Detection & Regulatory Alerting</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Dynamic alerts when regulations change with drift scores for affected docs.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="secondary" className="text-xs">Real-time Alerts</Badge>
                      <Badge variant="secondary" className="text-xs">Drift Analysis</Badge>
                    </div>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full bg-background hover:bg-primary hover:text-primary-foreground border transition-colors">
                  <Link to="/alerting">
                    Update Affected Docs
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* 10. Investor & Regulator Share Room */}
            <Card className="enterprise-card p-6 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Share2 className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Investor & Regulator Share Room</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Generate sharable room links with access control for badges and documents.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="secondary" className="text-xs">Access Control</Badge>
                      <Badge variant="secondary" className="text-xs">Sharable Links</Badge>
                    </div>
                  </div>
                </div>
                <Button asChild size="sm" className="w-full bg-background hover:bg-primary hover:text-primary-foreground border transition-colors">
                  <Link to="/share-room">
                    Generate Share Room
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* 11. Filing Calendar & Deadline Tracker */}
            <Card className="enterprise-card p-6 hover:shadow-lg transition-all duration-200">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">Filing Calendar & Deadline Tracker</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Timeline of filings due with calendar view, alerts, and downloadable checklists.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="secondary" className="text-xs">Calendar Integration</Badge>
                      <Badge variant="secondary" className="text-xs">Deadline Alerts</Badge>
                    </div>
                  </div>
                </div>
                 <Button asChild size="sm" className="w-full bg-background hover:bg-primary hover:text-primary-foreground border transition-colors">
                   <Link to="/filing-calendar">
                     Add to Calendar
                     <ArrowRight className="w-3 h-3 ml-1" />
                   </Link>
                 </Button>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="enterprise-card p-6 opacity-75">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-muted-foreground">Token Policy Engine</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Automated token launch compliance with smart contract generation.
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

            <Card className="enterprise-card p-6 opacity-75">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-muted-foreground">Smart Contract Auditor</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Formal verification with automated proof generation.
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

            <Card className="enterprise-card p-6 opacity-75">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Database className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-muted-foreground">Legal DAO Registry</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  On-chain registry for verified legal entities and DAOs.
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

            <Card className="enterprise-card p-6 opacity-75">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <Settings className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-muted-foreground">Custom Compliance API</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Enterprise API for custom compliance workflows.
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
    </div>
  );
}