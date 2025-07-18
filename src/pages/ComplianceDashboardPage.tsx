import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Shield,
  Home,
  Download,
  MessageSquare,
  Scale,
  Globe,
  Building,
  Users
} from "lucide-react";

const complianceResults = {
  "eu-mica": {
    name: "EU MiCA",
    status: "Critical Gaps",
    color: "destructive",
    requiredDocs: ["AML Policy", "KYC Procedures", "Governance Framework"],
    missingDocs: ["Privacy Policy", "Risk Management"],
    filingDeadline: "June 30, 2025",
    riskScore: 85
  },
  "uae-vara": {
    name: "UAE VARA",
    status: "Moderate Risk",
    color: "warning",
    requiredDocs: ["License Application", "Business Plan"],
    missingDocs: ["Custody Procedures"],
    filingDeadline: "March 15, 2025",
    riskScore: 65
  },
  "us-sec": {
    name: "US SEC",
    status: "High Risk",
    color: "destructive",
    requiredDocs: ["Form D", "Securities Registration"],
    missingDocs: ["Accredited Investor Verification", "Legal Opinion"],
    filingDeadline: "April 1, 2025",
    riskScore: 90
  }
};

const licenseRequirements = [
  {
    jurisdiction: "EU",
    license: "CASP License",
    status: "Required",
    timeline: "6-12 months",
    cost: "€50,000+",
    icon: Globe
  },
  {
    jurisdiction: "UAE",
    license: "VARA Operational License",
    status: "Required",
    timeline: "3-6 months", 
    cost: "AED 15,000+",
    icon: Building
  },
  {
    jurisdiction: "US",
    license: "MSB Registration",
    status: "Required",
    timeline: "2-4 months",
    cost: "$5,000+",
    icon: Users
  }
];

export default function ComplianceDashboardPage() {
  const [activeChat, setActiveChat] = useState("");
  const { secureMode } = useAuth();
  const navigate = useNavigate();

  const handleZKProof = () => {
    navigate("/zk-proof", { state: { context: "compliance" } });
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-destructive";
    if (score >= 60) return "text-warning";
    return "text-success";
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">Regulatory Compliance Report</h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="text-muted-foreground hover:text-foreground"
              >
                <Home className="h-4 w-4 mr-1" />
                Home
              </Button>
            </div>
            <p className="text-muted-foreground">
              Comprehensive analysis of your business model against selected regulatory frameworks
            </p>
            {secureMode && (
              <Badge variant="secondary" className="mt-2">
                🔒 Analysis performed in Secure Mode
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleZKProof} variant="default">
              <Shield className="h-4 w-4 mr-2" />
              Generate ZK Proof
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="licenses">License Requirements</TabsTrigger>
            <TabsTrigger value="documents">Document Gaps</TabsTrigger>
            <TabsTrigger value="timeline">Filing Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Risk Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(complianceResults).map(([key, result]) => (
                <Card key={key} className="border-l-4 border-l-primary">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{result.name}</CardTitle>
                        <CardDescription>Regulatory Framework</CardDescription>
                      </div>
                      <Badge variant={result.color as "default" | "secondary" | "destructive" | "outline"}>
                        {result.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Risk Score</span>
                        <span className={`font-bold ${getRiskColor(result.riskScore)}`}>
                          {result.riskScore}/100
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Missing Documents</div>
                        <div className="text-sm">
                          {result.missingDocs.length} critical gaps identified
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm text-muted-foreground">Filing Deadline</div>
                        <div className="text-sm font-medium">{result.filingDeadline}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Business Model Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Business Model Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Entity Structure</h4>
                        <p className="text-sm text-muted-foreground">
                          DAO with token-based governance - Compliant structure identified
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Token Classification</h4>
                        <p className="text-sm text-muted-foreground">
                          Utility token with governance features - Clear use case defined
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                      <div>
                        <h4 className="font-medium">KYC/AML Procedures</h4>
                        <p className="text-sm text-muted-foreground">
                          No comprehensive KYC framework detected - Required for MiCA compliance
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                      <div>
                        <h4 className="font-medium">Data Protection</h4>
                        <p className="text-sm text-muted-foreground">
                          Basic privacy measures - GDPR compliance gaps identified
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="licenses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Required Licenses by Jurisdiction</CardTitle>
                <CardDescription>
                  Licenses and registrations needed for compliant operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {licenseRequirements.map((license, index) => {
                    const IconComponent = license.icon;
                    return (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <IconComponent className="h-8 w-8 text-primary" />
                          <div>
                            <h4 className="font-medium">{license.license}</h4>
                            <p className="text-sm text-muted-foreground">{license.jurisdiction}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-right">
                          <div>
                            <div className="text-sm font-medium">{license.timeline}</div>
                            <div className="text-sm text-muted-foreground">{license.cost}</div>
                          </div>
                          <Badge variant="destructive">{license.status}</Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="grid gap-6">
              {Object.entries(complianceResults).map(([key, result]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle>{result.name} Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-primary mb-3">Required Documents</h4>
                        <div className="space-y-2">
                          {result.requiredDocs.map((doc, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-primary" />
                              <span className="text-sm">{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-destructive mb-3">Missing Documents</h4>
                        <div className="space-y-2">
                          {result.missingDocs.map((doc, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-destructive" />
                              <span className="text-sm">{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Critical Filing Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(complianceResults)
                    .sort((a, b) => new Date(a[1].filingDeadline).getTime() - new Date(b[1].filingDeadline).getTime())
                    .map(([key, result]) => (
                      <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Scale className="h-6 w-6 text-primary" />
                          <div>
                            <h4 className="font-medium">{result.name}</h4>
                            <p className="text-sm text-muted-foreground">Compliance deadline</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-medium">{result.filingDeadline}</div>
                            <div className="text-sm text-muted-foreground">
                              {Math.ceil((new Date(result.filingDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                            </div>
                          </div>
                          <Badge variant="destructive">Urgent</Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Chat Assistant */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              AI Compliance Assistant
            </CardTitle>
            <CardDescription>
              Ask questions about your compliance requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 rounded-lg p-4 mb-4 h-32 overflow-y-auto">
              <div className="text-sm text-muted-foreground">
                💬 Hi! I'm your AI compliance assistant. I can help you understand:
                <br />• Specific regulatory requirements
                <br />• Document preparation guidance  
                <br />• License application processes
                <br />• Risk mitigation strategies
              </div>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Ask about MiCA requirements, licensing steps, or document templates..."
                className="flex-1 px-3 py-2 border rounded-md"
                value={activeChat}
                onChange={(e) => setActiveChat(e.target.value)}
              />
              <Button size="sm">Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}