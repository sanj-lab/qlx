import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Lock
} from "lucide-react";

export default function OrganizationSettings() {
  const [organizationName, setOrganizationName] = useState("Quentlex Enterprise");
  const [domain, setDomain] = useState("quentlex.com");
  const [description, setDescription] = useState("Legal compliance platform for Web3 organizations");
  const [timezone, setTimezone] = useState("UTC");
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Organization Settings</h1>
          <p className="text-muted-foreground">Manage your organization's configuration and preferences</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
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
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                        LE
                      </div>
                      <div>
                        <p className="font-medium">Legal Expert</p>
                        <p className="text-sm text-muted-foreground">expert@company.com</p>
                      </div>
                    </div>
                    <Select defaultValue="admin">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    Invite Team Member
                  </Button>
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
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Require 2FA for all team members</p>
                  </div>
                  <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Single Sign-On (SSO)</p>
                    <p className="text-sm text-muted-foreground">Enable SSO with your identity provider</p>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">IP Restrictions</p>
                    <p className="text-sm text-muted-foreground">Limit access to specific IP addresses</p>
                  </div>
                  <Button variant="outline">Manage</Button>
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
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Regulatory Alerts</p>
                    <p className="text-sm text-muted-foreground">Real-time compliance updates</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Reports</p>
                    <p className="text-sm text-muted-foreground">Summary of activity and compliance status</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Billing & Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold">Enterprise</div>
                    <div className="text-sm text-muted-foreground">Current Plan</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold">$299</div>
                    <div className="text-sm text-muted-foreground">Monthly</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold">15</div>
                    <div className="text-sm text-muted-foreground">Team Members</div>
                  </div>
                </div>
                <Button variant="outline">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Manage Billing
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}