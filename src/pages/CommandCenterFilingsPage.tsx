// @new - Filing Planner - Mission-critical deadlines management
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { SubnavTabs } from "@/components/ui/subnav-tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar as CalendarIcon,
  Clock,
  AlertTriangle,
  CheckCircle,
  FileText,
  Bell,
  Users,
  ExternalLink,
  Plus,
  Filter
} from "lucide-react";

interface FilingItem {
  id: string;
  name: string;
  dueDate: string;
  jurisdiction: string;
  status: 'not-started' | 'in-progress' | 'filed' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'critical';
  requiredDocs: string[];
  assignee?: string;
  estimatedHours: number;
  dependencies?: string[];
  description: string;
  filingFee?: number;
  penaltyIfLate?: number;
}

const mockFilings: FilingItem[] = [
  {
    id: "filing-1",
    name: "VARA Quarterly Compliance Report",
    dueDate: "2024-03-15",
    jurisdiction: "UAE",
    status: "in-progress",
    priority: "critical",
    requiredDocs: ["Transaction Reports", "AML/KYC Records", "Financial Statements"],
    assignee: "Sarah Chen",
    estimatedHours: 16,
    description: "Quarterly submission to UAE VARA detailing all crypto activities",
    filingFee: 5000,
    penaltyIfLate: 25000
  },
  {
    id: "filing-2", 
    name: "UAE Corporate Tax Filing",
    dueDate: "2024-06-30",
    jurisdiction: "UAE",
    status: "not-started",
    priority: "high",
    requiredDocs: ["Audited Financial Statements", "Tax Computation", "Board Resolutions"],
    estimatedHours: 24,
    dependencies: ["filing-1"],
    description: "Annual corporate tax filing for UAE operations",
    filingFee: 2000,
    penaltyIfLate: 15000
  },
  {
    id: "filing-3",
    name: "Token Holder Update Report",
    dueDate: "2024-02-01",
    jurisdiction: "Global",
    status: "overdue",
    priority: "critical",
    requiredDocs: ["Token Distribution Report", "Governance Updates", "Financial Performance"],
    assignee: "Marcus Reid",
    estimatedHours: 8,
    description: "Quarterly update to token holders on project progress",
    filingFee: 0
  },
  {
    id: "filing-4",
    name: "MiCA Compliance Assessment",
    dueDate: "2024-04-20",
    jurisdiction: "EU",
    status: "not-started", 
    priority: "high",
    requiredDocs: ["EU Operations Report", "Consumer Protection Measures", "Risk Assessment"],
    estimatedHours: 32,
    description: "Annual MiCA compliance evaluation and reporting",
    filingFee: 8000,
    penaltyIfLate: 50000
  },
  {
    id: "filing-5",
    name: "Board Meeting Minutes Filing",
    dueDate: "2024-02-20",
    jurisdiction: "UAE",
    status: "filed",
    priority: "medium",
    requiredDocs: ["Board Minutes", "Resolutions"],
    assignee: "Elena Kozlov",
    estimatedHours: 2,
    description: "Quarterly board meeting documentation filing",
    filingFee: 500
  }
];

export default function CommandCenterFilingsPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterJurisdiction, setFilterJurisdiction] = useState<string>('all');
  const [showAddFiling, setShowAddFiling] = useState(false);

  const getStatusBadge = (status: FilingItem['status']) => {
    switch (status) {
      case 'filed':
        return <Badge className="status-success">Filed</Badge>;
      case 'in-progress':
        return <Badge className="status-warning">In Progress</Badge>;
      case 'not-started':
        return <Badge variant="outline">Not Started</Badge>;
      case 'overdue':
        return <Badge className="status-error">Overdue</Badge>;
    }
  };

  const getPriorityBadge = (priority: FilingItem['priority']) => {
    switch (priority) {
      case 'critical':
        return <Badge className="status-error">Critical</Badge>;
      case 'high':
        return <Badge className="status-warning">High</Badge>;
      case 'medium':
        return <Badge variant="outline">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
    }
  };

  const getJurisdictionBadge = (jurisdiction: string) => {
    const colors = {
      'UAE': 'bg-green-100 text-green-800 border-green-200',
      'EU': 'bg-blue-100 text-blue-800 border-blue-200', 
      'Global': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return (
      <Badge variant="outline" className={colors[jurisdiction as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {jurisdiction}
      </Badge>
    );
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const filteredFilings = mockFilings.filter(filing => {
    const statusMatch = filterStatus === 'all' || filing.status === filterStatus;
    const jurisdictionMatch = filterJurisdiction === 'all' || filing.jurisdiction === filterJurisdiction;
    return statusMatch && jurisdictionMatch;
  });

  const overdueFilings = mockFilings.filter(f => f.status === 'overdue');
  const upcomingFilings = mockFilings.filter(f => {
    const daysUntil = getDaysUntilDue(f.dueDate);
    return daysUntil <= 30 && daysUntil > 0 && f.status !== 'filed';
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Subnav */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Filing Planner</h1>
              <p className="text-muted-foreground">Mission-critical deadlines and compliance calendar</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="hidden sm:flex">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Dialog open={showAddFiling} onOpenChange={setShowAddFiling}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Filing
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Filing</DialogTitle>
                    <DialogDescription>
                      Create a new filing deadline and track its progress
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="filing-name">Filing Name</Label>
                      <Input id="filing-name" placeholder="Enter filing name..." />
                    </div>
                    <div>
                      <Label htmlFor="due-date">Due Date</Label>
                      <Input id="due-date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="jurisdiction">Jurisdiction</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select jurisdiction" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="uae">UAE</SelectItem>
                          <SelectItem value="eu">EU</SelectItem>
                          <SelectItem value="global">Global</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Describe the filing requirements..." />
                    </div>
                    <div className="flex space-x-2">
                      <Button className="flex-1">Create Filing</Button>
                      <Button variant="outline" onClick={() => setShowAddFiling(false)}>Cancel</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <SubnavTabs className="w-full" />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Alert Summary */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="enterprise-card border-destructive/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-destructive">{overdueFilings.length}</div>
                      <div className="text-sm text-muted-foreground">Overdue Filings</div>
                      <div className="text-xs text-destructive mt-1">Immediate attention required</div>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  </div>
                </CardContent>
              </Card>

              <Card className="enterprise-card border-warning/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-warning">{upcomingFilings.length}</div>
                      <div className="text-sm text-muted-foreground">Due Within 30 Days</div>
                      <div className="text-xs text-warning mt-1">Planning required</div>
                    </div>
                    <Clock className="h-8 w-8 text-warning" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="enterprise-card">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="status-filter">Status:</Label>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="not-started">Not Started</SelectItem>
                        <SelectItem value="filed">Filed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="jurisdiction-filter">Jurisdiction:</Label>
                    <Select value={filterJurisdiction} onValueChange={setFilterJurisdiction}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="UAE">UAE</SelectItem>
                        <SelectItem value="EU">EU</SelectItem>
                        <SelectItem value="Global">Global</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Filings List */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle>Filing Schedule</CardTitle>
                <CardDescription>All regulatory filings and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredFilings.map((filing) => {
                    const daysUntil = getDaysUntilDue(filing.dueDate);
                    const isUrgent = daysUntil <= 7 && filing.status !== 'filed';
                    
                    return (
                      <div 
                        key={filing.id}
                        className={`border rounded-lg p-6 hover:bg-muted/50 transition-colors ${
                          isUrgent ? 'border-destructive/30 bg-destructive/5' : ''
                        }`}
                      >
                        <div className="grid lg:grid-cols-12 gap-4 items-start">
                          {/* Filing Info */}
                          <div className="lg:col-span-5">
                            <div className="flex items-start space-x-3">
                              <FileText className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <h4 className="font-medium flex items-center gap-2">
                                  {filing.name}
                                  {isUrgent && <AlertTriangle className="h-4 w-4 text-destructive" />}
                                </h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {filing.description}
                                </p>
                                <div className="flex items-center space-x-2 mt-2">
                                  {getJurisdictionBadge(filing.jurisdiction)}
                                  {getPriorityBadge(filing.priority)}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Due Date & Status */}
                          <div className="lg:col-span-3">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                  {new Date(filing.dueDate).toLocaleDateString()}
                                </span>
                              </div>
                              <div className={`text-sm ${
                                daysUntil < 0 ? 'text-destructive' :
                                daysUntil <= 7 ? 'text-warning' : 'text-muted-foreground'
                              }`}>
                                {daysUntil < 0 ? `${Math.abs(daysUntil)} days overdue` :
                                 daysUntil === 0 ? 'Due today' :
                                 `${daysUntil} days remaining`}
                              </div>
                              {getStatusBadge(filing.status)}
                            </div>
                          </div>

                          {/* Assignee & Hours */}
                          <div className="lg:col-span-2">
                            {filing.assignee && (
                              <div className="flex items-center space-x-2 mb-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{filing.assignee}</span>
                              </div>
                            )}
                            <div className="text-sm text-muted-foreground">
                              Est. {filing.estimatedHours}h
                            </div>
                            {filing.filingFee && (
                              <div className="text-sm font-medium">
                                Fee: ${filing.filingFee.toLocaleString()}
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="lg:col-span-2">
                            <div className="flex flex-col gap-2">
                              <Button variant="outline" size="sm">
                                <Bell className="w-3 h-3 mr-1" />
                                Remind
                              </Button>
                              <Button variant="outline" size="sm">
                                <ExternalLink className="w-3 h-3 mr-1" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Required Documents */}
                        <div className="mt-4 pt-4 border-t">
                          <div className="text-sm text-muted-foreground mb-2">
                            Required Documents ({filing.requiredDocs.length}):
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {filing.requiredDocs.map((doc, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Dependencies */}
                        {filing.dependencies && filing.dependencies.length > 0 && (
                          <div className="mt-2">
                            <div className="text-sm text-muted-foreground mb-1">
                              Dependencies:
                            </div>
                            <div className="text-sm text-warning">
                              Requires completion of other filings first
                            </div>
                          </div>
                        )}

                        {/* Late Penalty Warning */}
                        {filing.penaltyIfLate && filing.status !== 'filed' && (
                          <div className="mt-2 p-2 bg-destructive/10 rounded flex items-center">
                            <AlertTriangle className="h-4 w-4 text-destructive mr-2" />
                            <span className="text-sm text-destructive">
                              Late penalty: ${filing.penaltyIfLate.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Calendar */}
          <div className="space-y-6">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="text-base">Filing Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/command-center/dashboard')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Risk Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/command-center/vault')}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Legal Vault
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/launch-path/doc-studio')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Generate Documents
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}