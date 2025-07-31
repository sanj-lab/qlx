import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { 
  Building, 
  Users, 
  Shield, 
  Bell, 
  Globe, 
  CreditCard,
  Settings,
  Save,
  User,
  Mail,
  Lock,
  Plus,
  Edit,
  Trash2,
  Key,
  FileText,
  Database,
  Clock,
  AlertTriangle,
  CheckCircle,
  Download,
  Upload,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  Crown,
  Zap,
  Activity
} from "lucide-react";

export default function OrganizationSettings() {
  const [organizationName, setOrganizationName] = useState("Quentlex Enterprise");
  const [domain, setDomain] = useState("quentlex.com");
  const [description, setDescription] = useState("Legal compliance platform for Web3 organizations");
  const [timezone, setTimezone] = useState("UTC");
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isSSOMOdalOpen, setIsSSOMOdalOpen] = useState(false);
  const [isAPIModalOpen, setIsAPIModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  // Team members data
  const [teamMembers] = useState([
    { id: 1, name: "Alex Johnson", email: "alex@quentlex.com", role: "Owner", avatar: "AJ", status: "Active", lastActive: "2 hours ago" },
    { id: 2, name: "Sarah Chen", email: "sarah@quentlex.com", role: "Admin", avatar: "SC", status: "Active", lastActive: "1 day ago" },
    { id: 3, name: "Michael Rodriguez", email: "michael@quentlex.com", role: "Member", avatar: "MR", status: "Active", lastActive: "3 hours ago" },
    { id: 4, name: "Emma Davis", email: "emma@quentlex.com", role: "Viewer", avatar: "ED", status: "Pending", lastActive: "Never" },
  ]);

  // API keys data
  const [apiKeys] = useState([
    { id: 1, name: "Production API", key: "qlex_prod_••••••••••••••••", created: "2024-01-15", lastUsed: "2 hours ago", status: "Active" },
    { id: 2, name: "Development API", key: "qlex_dev_••••••••••••••••", created: "2024-01-20", lastUsed: "1 day ago", status: "Active" },
    { id: 3, name: "Testing API", key: "qlex_test_••••••••••••••••", created: "2024-02-01", lastUsed: "1 week ago", status: "Inactive" },
  ]);

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Organization settings have been updated successfully.",
    });
  };

  const handleInviteMember = () => {
    toast({
      title: "Invitation Sent",
      description: "Team member invitation has been sent successfully.",
    });
    setIsInviteModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Organization Settings</h1>
          <p className="text-muted-foreground">Manage your organization's configuration and preferences</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="api">API & Data</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="audit">Audit</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Organization Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input
                      id="org-name"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="domain">Domain</Label>
                    <Input
                      id="domain"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-4">
                  <Button onClick={handleSaveSettings}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Advanced Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <Card className="enterprise-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Members
                  <Badge variant="secondary">{teamMembers.length} members</Badge>
                </CardTitle>
                <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Invite Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invite Team Member</DialogTitle>
                      <DialogDescription>
                        Send an invitation to join your organization
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="invite-email">Email Address</Label>
                        <Input id="invite-email" type="email" placeholder="colleague@company.com" />
                      </div>
                      <div>
                        <Label htmlFor="invite-role">Role</Label>
                        <Select defaultValue="member">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin - Full access</SelectItem>
                            <SelectItem value="member">Member - Standard access</SelectItem>
                            <SelectItem value="viewer">Viewer - Read-only access</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="invite-message">Personal Message (Optional)</Label>
                        <Textarea id="invite-message" placeholder="Welcome to our team!" />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleInviteMember} className="flex-1">Send Invitation</Button>
                        <Button variant="outline" onClick={() => setIsInviteModalOpen(false)}>Cancel</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                          {member.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{member.name}</p>
                            {member.role === "Owner" && <Crown className="w-4 h-4 text-yellow-500" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                          <p className="text-xs text-muted-foreground">Last active: {member.lastActive}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={member.status === "Active" ? "default" : "secondary"}>
                          {member.status}
                        </Badge>
                        <Select defaultValue={member.role.toLowerCase()}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="owner">Owner</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="member">Member</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        {member.role !== "Owner" && (
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Authentication
                    </h4>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Require 2FA for all team members</p>
                      </div>
                      <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Single Sign-On (SSO)</p>
                        <p className="text-sm text-muted-foreground">Enable SAML/OIDC SSO</p>
                      </div>
                      <Dialog open={isSSOMOdalOpen} onOpenChange={setIsSSOMOdalOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline">Configure</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Configure SSO</DialogTitle>
                            <DialogDescription>
                              Set up single sign-on with your identity provider
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="sso-provider">Identity Provider</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select provider" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="okta">Okta</SelectItem>
                                  <SelectItem value="azure">Azure AD</SelectItem>
                                  <SelectItem value="google">Google Workspace</SelectItem>
                                  <SelectItem value="custom">Custom SAML</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="sso-domain">SSO Domain</Label>
                              <Input id="sso-domain" placeholder="your-company.okta.com" />
                            </div>
                            <div>
                              <Label htmlFor="sso-metadata">Metadata URL</Label>
                              <Input id="sso-metadata" placeholder="https://..." />
                            </div>
                            <Button className="w-full">Save SSO Configuration</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Password Policy</p>
                        <p className="text-sm text-muted-foreground">Enforce strong passwords</p>
                      </div>
                      <Badge variant="default">Enabled</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Access Control
                    </h4>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">IP Restrictions</p>
                        <p className="text-sm text-muted-foreground">Allowlist: 3 IP ranges</p>
                      </div>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Session Timeout</p>
                        <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                      </div>
                      <Select defaultValue="24h">
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1h">1 hour</SelectItem>
                          <SelectItem value="8h">8 hours</SelectItem>
                          <SelectItem value="24h">24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Device Management</p>
                        <p className="text-sm text-muted-foreground">Track and manage devices</p>
                      </div>
                      <Badge variant="secondary">12 devices</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card className="enterprise-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  API Keys & Data
                </CardTitle>
                <Dialog open={isAPIModalOpen} onOpenChange={setIsAPIModalOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create API Key
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New API Key</DialogTitle>
                      <DialogDescription>
                        Generate a new API key for external integrations
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="api-name">API Key Name</Label>
                        <Input id="api-name" placeholder="Production Integration" />
                      </div>
                      <div>
                        <Label htmlFor="api-permissions">Permissions</Label>
                        <Select defaultValue="read">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="read">Read Only</SelectItem>
                            <SelectItem value="write">Read & Write</SelectItem>
                            <SelectItem value="admin">Full Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="api-expiry">Expiry</Label>
                        <Select defaultValue="never">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30d">30 days</SelectItem>
                            <SelectItem value="90d">90 days</SelectItem>
                            <SelectItem value="1y">1 year</SelectItem>
                            <SelectItem value="never">Never expires</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button className="w-full">Generate API Key</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiKeys.map((key) => (
                    <div key={key.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{key.name}</p>
                          <Badge variant={key.status === "Active" ? "default" : "secondary"}>
                            {key.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground font-mono">{key.key}</p>
                        <p className="text-xs text-muted-foreground">
                          Created: {key.created} • Last used: {key.lastUsed}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Data Management
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg text-center">
                      <Download className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="font-medium">Export Data</p>
                      <p className="text-sm text-muted-foreground mb-2">Download all organization data</p>
                      <Button variant="outline" size="sm">Export</Button>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="font-medium">Import Data</p>
                      <p className="text-sm text-muted-foreground mb-2">Bulk import from CSV/JSON</p>
                      <Button variant="outline" size="sm">Import</Button>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <FileText className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="font-medium">API Documentation</p>
                      <p className="text-sm text-muted-foreground mb-2">View API reference</p>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Docs
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Notifications
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">System Updates</p>
                          <p className="text-sm text-muted-foreground">Platform maintenance & updates</p>
                        </div>
                        <Switch checked={notifications} onCheckedChange={setNotifications} />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Regulatory Alerts</p>
                          <p className="text-sm text-muted-foreground">Critical compliance changes</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Weekly Reports</p>
                          <p className="text-sm text-muted-foreground">Activity & compliance summary</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Team Activity</p>
                          <p className="text-sm text-muted-foreground">Member joins, document shares</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Real-time Alerts
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Security Events</p>
                          <p className="text-sm text-muted-foreground">Login attempts, access changes</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Deadline Reminders</p>
                          <p className="text-sm text-muted-foreground">Filing & compliance deadlines</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">API Rate Limits</p>
                          <p className="text-sm text-muted-foreground">Usage threshold warnings</p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">Document Analysis</p>
                          <p className="text-sm text-muted-foreground">Completed analysis notifications</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-4">Delivery Preferences</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg text-center">
                      <Mail className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">Primary delivery method</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <Bell className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="font-medium">In-App</p>
                      <p className="text-sm text-muted-foreground">Dashboard notifications</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <Zap className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="font-medium">Slack/Teams</p>
                      <p className="text-sm text-muted-foreground">Coming soon</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit" className="space-y-6">
            <Card className="enterprise-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Audit & Compliance
                </CardTitle>
                <Dialog open={isAuditModalOpen} onOpenChange={setIsAuditModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export Audit Log
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Export Audit Log</DialogTitle>
                      <DialogDescription>
                        Download audit logs for compliance reporting
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="audit-range">Date Range</Label>
                        <Select defaultValue="30d">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7d">Last 7 days</SelectItem>
                            <SelectItem value="30d">Last 30 days</SelectItem>
                            <SelectItem value="90d">Last 90 days</SelectItem>
                            <SelectItem value="custom">Custom range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="audit-format">Export Format</Label>
                        <Select defaultValue="csv">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="csv">CSV</SelectItem>
                            <SelectItem value="json">JSON</SelectItem>
                            <SelectItem value="pdf">PDF Report</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="audit-events">Event Types</Label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked />
                            <span className="text-sm">Logins</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked />
                            <span className="text-sm">Document Access</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked />
                            <span className="text-sm">Settings Changes</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <span className="text-sm">API Calls</span>
                          </label>
                        </div>
                      </div>
                      <Button className="w-full">Generate & Download</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-primary">2,543</div>
                      <div className="text-sm text-muted-foreground">Total Events</div>
                      <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">847</div>
                      <div className="text-sm text-muted-foreground">Login Events</div>
                      <div className="text-xs text-muted-foreground mt-1">98.5% success rate</div>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">1,234</div>
                      <div className="text-sm text-muted-foreground">Document Access</div>
                      <div className="text-xs text-muted-foreground mt-1">Avg 41/day</div>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600">23</div>
                      <div className="text-sm text-muted-foreground">Config Changes</div>
                      <div className="text-xs text-muted-foreground mt-1">Admin actions</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Recent Audit Events</h4>
                    <div className="space-y-2">
                      {[
                        { time: "2 hours ago", user: "Alex Johnson", action: "Updated organization settings", type: "Settings", status: "success" },
                        { time: "4 hours ago", user: "Sarah Chen", action: "Accessed document: Privacy Policy v2.1", type: "Document", status: "success" },
                        { time: "6 hours ago", user: "Michael Rodriguez", action: "Failed login attempt", type: "Security", status: "warning" },
                        { time: "1 day ago", user: "System", action: "Automated compliance check completed", type: "System", status: "success" },
                        { time: "1 day ago", user: "Emma Davis", action: "Invited new team member", type: "User Management", status: "success" },
                      ].map((event, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${
                              event.status === 'success' ? 'bg-green-500' : 
                              event.status === 'warning' ? 'bg-orange-500' : 'bg-red-500'
                            }`} />
                            <div>
                              <p className="text-sm font-medium">{event.action}</p>
                              <p className="text-xs text-muted-foreground">
                                {event.user} • {event.time}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        Compliance Status
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">SOX Compliance</span>
                          <Badge variant="default">Compliant</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">GDPR Compliance</span>
                          <Badge variant="default">Compliant</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Data Retention</span>
                          <Badge variant="secondary">Review Needed</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-500" />
                        Retention Policies
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Audit Logs</span>
                          <span className="text-sm text-muted-foreground">7 years</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">User Data</span>
                          <span className="text-sm text-muted-foreground">5 years</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Documents</span>
                          <span className="text-sm text-muted-foreground">10 years</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card className="enterprise-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Billing & Usage
                </CardTitle>
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Billing Portal
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <Crown className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                    <div className="text-xl font-bold">Enterprise</div>
                    <div className="text-sm text-muted-foreground">Current Plan</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">$299</div>
                    <div className="text-sm text-muted-foreground">Monthly</div>
                    <div className="text-xs text-muted-foreground">Per month</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">15/25</div>
                    <div className="text-sm text-muted-foreground">Team Members</div>
                    <div className="text-xs text-muted-foreground">10 available</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">2.4k/10k</div>
                    <div className="text-sm text-muted-foreground">API Calls</div>
                    <div className="text-xs text-muted-foreground">This month</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Usage Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Document Analysis</span>
                        <span className="text-sm font-medium">847/1000</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '84.7%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Storage Used</span>
                        <span className="text-sm font-medium">156GB/500GB</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '31.2%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Smart Contracts</span>
                        <span className="text-sm font-medium">23/100</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Compliance Checks</span>
                        <span className="text-sm font-medium">1.2k/5k</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Billing History</h4>
                  <div className="space-y-2">
                    {[
                      { date: "Jan 1, 2024", amount: "$299.00", status: "Paid", invoice: "INV-2024-001" },
                      { date: "Dec 1, 2023", amount: "$299.00", status: "Paid", invoice: "INV-2023-012" },
                      { date: "Nov 1, 2023", amount: "$299.00", status: "Paid", invoice: "INV-2023-011" },
                    ].map((bill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{bill.invoice}</p>
                          <p className="text-sm text-muted-foreground">{bill.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{bill.amount}</span>
                          <Badge variant="default">{bill.status}</Badge>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <Button variant="outline">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Update Payment Method
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Download Invoice
                  </Button>
                  <Button variant="outline">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}