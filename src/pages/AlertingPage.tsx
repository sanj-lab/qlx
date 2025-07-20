import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  Bell, 
  Globe, 
  Clock, 
  TrendingDown, 
  FileX, 
  CheckCircle2,
  Settings,
  Lightbulb,
  RefreshCw,
  Mail,
  Smartphone,
  Shield
} from "lucide-react";

export default function AlertingPage() {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("");
  const [projectType, setProjectType] = useState("");
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(false);

  const jurisdictions = [
    { value: "eu", label: "🇪🇺 European Union", framework: "MiCA" },
    { value: "usa", label: "🇺🇸 United States", framework: "SEC" },
    { value: "singapore", label: "🇸🇬 Singapore", framework: "MAS" },
    { value: "uae", label: "🇦🇪 UAE", framework: "VARA" },
    { value: "uk", label: "🇬🇧 United Kingdom", framework: "FCA" }
  ];

  const alerts = [
    {
      id: "alert-1",
      type: "critical",
      title: "MiCA Article 43 Updated",
      description: "New requirements for stablecoin reserves effective Q2 2024",
      jurisdiction: "EU",
      affectedDocs: ["Privacy Policy", "Token Charter"],
      driftScore: 85,
      date: "2024-01-16",
      status: "active"
    },
    {
      id: "alert-2",
      type: "warning",
      title: "VARA Regulatory Clarification",
      description: "Updated guidance on DAO governance requirements",
      jurisdiction: "UAE",
      affectedDocs: ["DAO Charter"],
      driftScore: 42,
      date: "2024-01-14",
      status: "active"
    },
    {
      id: "alert-3",
      type: "info",
      title: "SEC Token Classification Update",
      description: "New safe harbor provisions for utility tokens",
      jurisdiction: "USA",
      affectedDocs: ["SAFT Agreement", "Whitepaper"],
      driftScore: 23,
      date: "2024-01-12",
      status: "reviewed"
    }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical": return "text-destructive";
      case "warning": return "text-warning";
      case "info": return "text-primary";
      default: return "text-muted-foreground";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical": return <AlertTriangle className="w-4 h-4" />;
      case "warning": return <Clock className="w-4 h-4" />;
      case "info": return <CheckCircle2 className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getDriftColor = (score: number) => {
    if (score >= 70) return "text-destructive";
    if (score >= 40) return "text-warning";
    return "text-success";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Change Detection & Regulatory Alerting</h1>
          <p className="text-muted-foreground">Dynamic alerts when regulations change with drift scores for affected docs</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Alert Configuration */}
          <div className="lg:col-span-1">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Alert Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Jurisdiction</label>
                  <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      {jurisdictions.map(jurisdiction => (
                        <SelectItem key={jurisdiction.value} value={jurisdiction.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{jurisdiction.label}</span>
                            <Badge variant="secondary" className="ml-2">{jurisdiction.framework}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Project Type</label>
                  <Select value={projectType} onValueChange={setProjectType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="defi">DeFi Protocol</SelectItem>
                      <SelectItem value="nft">NFT Platform</SelectItem>
                      <SelectItem value="dao">DAO</SelectItem>
                      <SelectItem value="exchange">Exchange</SelectItem>
                      <SelectItem value="stablecoin">Stablecoin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium">Notification Settings</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      <span className="text-sm">Enable Alerts</span>
                    </div>
                    <Switch checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">Email Notifications</span>
                    </div>
                    <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4" />
                      <span className="text-sm">Push Notifications</span>
                    </div>
                    <Switch checked={pushAlerts} onCheckedChange={setPushAlerts} />
                  </div>
                </div>

                <Button className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Check for Updates
                </Button>
              </CardContent>
            </Card>

            {/* Agentic Process */}
            <Card className="enterprise-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Agentic Process (Live)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="text-sm">Monitoring regulatory RSS feeds and API endpoints</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="text-sm">Analyzing regulatory change impact on document portfolio</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="text-sm">Calculating compliance drift scores using ML models</span>
                    </div>
                  </div>
                  
                  {/* TEE Verification */}
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">TEE-Verified Alert System</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Regulatory change detection runs in Intel SGX enclave to ensure tamper-proof 
                      monitoring and authentic alert generation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Alerts */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Active Regulatory Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map(alert => (
                    <div key={alert.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div className={`${getAlertColor(alert.type)} mt-0.5`}>
                            {getAlertIcon(alert.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{alert.title}</h4>
                              <Badge variant="secondary">{alert.jurisdiction}</Badge>
                              <Badge 
                                className={
                                  alert.status === "active" ? "status-warning" : "status-success"
                                }
                              >
                                {alert.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {alert.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Published: {alert.date}</span>
                              <span>•</span>
                              <span>Affects {alert.affectedDocs.length} documents</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium mb-1">Drift Score</div>
                          <div className={`text-lg font-bold ${getDriftColor(alert.driftScore)}`}>
                            {alert.driftScore}%
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Compliance Impact</span>
                          <span className={getDriftColor(alert.driftScore)}>
                            {alert.driftScore >= 70 ? "High" : alert.driftScore >= 40 ? "Medium" : "Low"}
                          </span>
                        </div>
                        <Progress 
                          value={alert.driftScore} 
                          className={`h-2 ${
                            alert.driftScore >= 70 ? "[&>div]:bg-destructive" : 
                            alert.driftScore >= 40 ? "[&>div]:bg-warning" : "[&>div]:bg-success"
                          }`} 
                        />
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center gap-2">
                          <FileX className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            Affected: {alert.affectedDocs.join(", ")}
                          </span>
                        </div>
                        <Button size="sm" onClick={() => window.open('/document-generator', '_blank')}>
                          Update Affected Docs
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Jurisdiction Monitoring */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Jurisdiction Monitoring Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {jurisdictions.map(jurisdiction => (
                    <div key={jurisdiction.value} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{jurisdiction.label}</span>
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Framework: {jurisdiction.framework}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Last checked: 2 hours ago
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Updates */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5" />
                  Regulatory Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-destructive rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">MiCA Article 43 - Stablecoin Reserves</span>
                        <span className="text-sm text-muted-foreground">Jan 16, 2024</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        New requirements for reserve asset composition and custody arrangements
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">VARA DAO Governance Update</span>
                        <span className="text-sm text-muted-foreground">Jan 14, 2024</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Clarification on minimum governance token distribution requirements
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">SEC Utility Token Safe Harbor</span>
                        <span className="text-sm text-muted-foreground">Jan 12, 2024</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Extended safe harbor period for utility tokens with functional use cases
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}