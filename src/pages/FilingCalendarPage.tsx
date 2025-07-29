import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { 
  Calendar, 
  Bell, 
  Download, 
  Clock, 
  AlertTriangle, 
  CheckCircle2,
  FileText,
  Globe,
  Building,
  Plus,
  Filter,
  Lightbulb,
  X,
  ExternalLink,
  Send,
  Wallet
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function FilingCalendarPage() {
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("");
  const [entityType, setEntityType] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showCustomDeadlineModal, setShowCustomDeadlineModal] = useState(false);
  const [showViewRequirementsModal, setShowViewRequirementsModal] = useState(false);
  const [showAddToCalendarModal, setShowAddToCalendarModal] = useState(false);
  const [showSetReminderModal, setShowSetReminderModal] = useState(false);
  const [showExportCalendarModal, setShowExportCalendarModal] = useState(false);

  const jurisdictions = [
    { value: "usa", label: "🇺🇸 United States", filings: 12 },
    { value: "eu", label: "🇪🇺 European Union", filings: 8 },
    { value: "singapore", label: "🇸🇬 Singapore", filings: 6 },
    { value: "uae", label: "🇦🇪 UAE", filings: 4 },
    { value: "uk", label: "🇬🇧 United Kingdom", filings: 10 }
  ];

  const entityTypes = [
    { value: "corporation", label: "C-Corporation" },
    { value: "llc", label: "LLC" },
    { value: "dao", label: "DAO" },
    { value: "foundation", label: "Foundation" },
    { value: "partnership", label: "Partnership" }
  ];

  const upcomingFilings = [
    {
      id: "filing-1",
      title: "Annual Corporate Report",
      jurisdiction: "USA",
      dueDate: "2024-02-15",
      type: "Annual Filing",
      priority: "high",
      status: "pending",
      daysLeft: 12,
      description: "Annual report with financial statements and governance updates"
    },
    {
      id: "filing-2",
      title: "Token Offering Disclosure",
      jurisdiction: "EU",
      dueDate: "2024-02-28",
      type: "Regulatory",
      priority: "critical",
      status: "in-progress",
      daysLeft: 25,
      description: "MiCA compliance disclosure for token distribution"
    },
    {
      id: "filing-3",
      title: "DAO Registration Amendment",
      jurisdiction: "UAE",
      dueDate: "2024-03-10",
      type: "Amendment",
      priority: "medium",
      status: "draft",
      daysLeft: 36,
      description: "Update DAO governance structure and voting mechanisms"
    },
    {
      id: "filing-4",
      title: "Quarterly Compliance Report",
      jurisdiction: "Singapore",
      dueDate: "2024-03-31",
      type: "Quarterly",
      priority: "high",
      status: "pending",
      daysLeft: 57,
      description: "Q1 2024 compliance status and risk assessment"
    }
  ];

  const completedFilings = [
    {
      id: "completed-1",
      title: "Initial Registration",
      jurisdiction: "USA",
      completedDate: "2024-01-15",
      type: "Registration",
      status: "approved"
    },
    {
      id: "completed-2",
      title: "Privacy Policy Update",
      jurisdiction: "EU",
      completedDate: "2024-01-08",
      type: "Compliance",
      status: "approved"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "text-destructive";
      case "high": return "text-warning";
      case "medium": return "text-primary";
      case "low": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-destructive text-destructive-foreground";
      case "high": return "bg-warning text-warning-foreground";
      case "medium": return "bg-primary text-primary-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "text-success";
      case "in-progress": return "text-primary";
      case "pending": return "text-warning";
      case "draft": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getDaysLeftColor = (days: number) => {
    if (days <= 7) return "text-destructive";
    if (days <= 14) return "text-warning";
    return "text-primary";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Filing Calendar & Deadline Tracker</h1>
          <p className="text-muted-foreground">Timeline of filings due with calendar view, alerts, and downloadable checklists</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar & Filters */}
          <div className="lg:col-span-1">
            <Card className="enterprise-card mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Calendar View
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border pointer-events-auto"
                />
              </CardContent>
            </Card>

            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Jurisdiction</label>
                  <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
                    <SelectTrigger>
                      <SelectValue placeholder="All jurisdictions" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Jurisdictions</SelectItem>
                      {jurisdictions.map(jurisdiction => (
                        <SelectItem key={jurisdiction.value} value={jurisdiction.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{jurisdiction.label}</span>
                            <Badge variant="secondary" className="ml-2">{jurisdiction.filings}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Entity Type</label>
                  <Select value={entityType} onValueChange={setEntityType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select entity type" />
                    </SelectTrigger>
                    <SelectContent>
                      {entityTypes.map(entity => (
                        <SelectItem key={entity.value} value={entity.value}>
                          {entity.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <Button className="w-full" onClick={() => setShowCustomDeadlineModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Custom Deadline
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setShowExportCalendarModal(true)}>
                    <Download className="w-4 h-4 mr-2" />
                    Export Calendar
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setShowSetReminderModal(true)}>
                    <Bell className="w-4 h-4 mr-2" />
                    Set Reminder
                  </Button>
                </div>
                
                {/* Agentic Intelligence */}
                <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Smart Deadline Prediction</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    AI analyzes your entity type, jurisdiction, and business activities to predict 
                    upcoming filing requirements and automatically add them to your calendar.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filing Lists */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Filings */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Upcoming Filings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingFilings.map(filing => (
                    <div key={filing.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{filing.title}</h4>
                            <Badge variant="secondary">{filing.jurisdiction}</Badge>
                            <Badge className={getPriorityBadge(filing.priority)}>
                              {filing.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {filing.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>Due: {filing.dueDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              <span>{filing.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getDaysLeftColor(filing.daysLeft)}`}>
                            {filing.daysLeft} days
                          </div>
                          <div className="text-sm text-muted-foreground">remaining</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <Badge 
                          className={getStatusColor(filing.status)}
                          variant="secondary"
                        >
                          {filing.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setShowViewRequirementsModal(true)}>
                            <FileText className="w-3 h-3 mr-1" />
                            View Requirements
                          </Button>
                          <Button size="sm" onClick={() => setShowAddToCalendarModal(true)}>
                            <Calendar className="w-3 h-3 mr-1" />
                            Add to Calendar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Filing Checklist */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Filing Checklist Template
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <div className="flex-1">
                      <span className="font-medium">Gather Financial Statements</span>
                      <p className="text-sm text-muted-foreground">Audited financial statements for the reporting period</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <div className="flex-1">
                      <span className="font-medium">Update Corporate Governance</span>
                      <p className="text-sm text-muted-foreground">Board resolutions and governance structure changes</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <input type="checkbox" className="rounded" />
                    <div className="flex-1">
                      <span className="font-medium">Prepare Compliance Documentation</span>
                      <p className="text-sm text-muted-foreground">Risk assessments and compliance monitoring reports</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <input type="checkbox" className="rounded" />
                    <div className="flex-1">
                      <span className="font-medium">Review Legal Requirements</span>
                      <p className="text-sm text-muted-foreground">Verify current regulatory requirements and deadlines</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <Button className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Complete Checklist
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Completed Filings */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  Recent Completed Filings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {completedFilings.map(filing => (
                    <div key={filing.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-success" />
                        <div>
                          <span className="font-medium">{filing.title}</span>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{filing.jurisdiction}</span>
                            <span>•</span>
                            <span>Completed {filing.completedDate}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="status-success">{filing.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Filing Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-warning">4</div>
                    <div className="text-sm text-muted-foreground">Upcoming Filings</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-success">8</div>
                    <div className="text-sm text-muted-foreground">Completed This Year</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-destructive">1</div>
                    <div className="text-sm text-muted-foreground">Critical Priority</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">5</div>
                    <div className="text-sm text-muted-foreground">Jurisdictions</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* View Requirements Modal */}
      <Dialog open={showViewRequirementsModal} onOpenChange={setShowViewRequirementsModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Filing Requirements - Annual Corporate Report
            </DialogTitle>
            <DialogDescription>
              Detailed requirements for USA jurisdiction filing
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <h4 className="font-medium text-warning mb-2">Required Documents</h4>
              <ul className="space-y-1 text-sm">
                <li>• Audited financial statements (last fiscal year)</li>
                <li>• Board resolutions and meeting minutes</li>
                <li>• Updated articles of incorporation</li>
                <li>• Shareholder registry with ownership percentages</li>
                <li>• Compliance officer certification</li>
              </ul>
            </div>
            
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <h4 className="font-medium text-primary mb-2">Filing Process</h4>
              <ol className="space-y-1 text-sm">
                <li>1. Complete Form 10-K with SEC EDGAR system</li>
                <li>2. Submit state-specific annual report forms</li>
                <li>3. Pay applicable filing fees ($500-$2,000)</li>
                <li>4. Obtain filing confirmation receipts</li>
                <li>5. Update corporate records and minute books</li>
              </ol>
            </div>
            
            <Button className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Complete Requirements Checklist
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add to Calendar Modal */}
      <Dialog open={showAddToCalendarModal} onOpenChange={setShowAddToCalendarModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Add to Calendar
            </DialogTitle>
            <DialogDescription>
              Select your preferred calendar integration
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google Calendar
            </Button>
            
            <Button className="w-full justify-start" variant="outline">
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Outlook Calendar
            </Button>
            
            <Button className="w-full justify-start" variant="outline">
              <ExternalLink className="w-5 h-5 mr-3" />
              Apple Calendar (.ics)
            </Button>
            
            <div className="pt-4 border-t">
              <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span className="font-medium text-success">Event Details</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Annual Corporate Report - Due Feb 15, 2024<br/>
                  Reminder: 1 week before deadline
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Set Reminder Modal */}
      <Dialog open={showSetReminderModal} onOpenChange={setShowSetReminderModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Set Reminder
            </DialogTitle>
            <DialogDescription>
              Configure reminder notifications for filing deadlines
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Reminder Type</Label>
              <div className="space-y-2 mt-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="reminder" value="email" defaultChecked />
                  <span className="text-sm">Email notification</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="reminder" value="sms" />
                  <span className="text-sm">SMS notification</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="reminder" value="both" />
                  <span className="text-sm">Both email and SMS</span>
                </label>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Reminder Schedule</Label>
              <div className="space-y-2 mt-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">2 weeks before deadline</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked />
                  <span className="text-sm">1 week before deadline</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span className="text-sm">3 days before deadline</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span className="text-sm">Day of deadline</span>
                </label>
              </div>
            </div>
            
            <Button className="w-full">
              <Bell className="w-4 h-4 mr-2" />
              Set Reminders
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Calendar Modal */}
      <Dialog open={showExportCalendarModal} onOpenChange={setShowExportCalendarModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="w-5 h-5 text-primary" />
              Export Calendar
            </DialogTitle>
            <DialogDescription>
              Export filing calendar in various formats
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <FileText className="w-5 h-5 mr-3" />
              PDF Report
            </Button>
            
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="w-5 h-5 mr-3" />
              iCal Format (.ics)
            </Button>
            
            <Button className="w-full justify-start" variant="outline">
              <FileText className="w-5 h-5 mr-3" />
              Excel Spreadsheet
            </Button>
            
            <Button className="w-full justify-start" variant="outline">
              <Send className="w-5 h-5 mr-3" />
              CSV Export
            </Button>
            
            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Export Options</span>
              </div>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked />
                  Include completed filings
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" defaultChecked />
                  Include deadline reminders
                </label>
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" />
                  Include requirements checklist
                </label>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Custom Deadline Modal */}
      <Dialog open={showCustomDeadlineModal} onOpenChange={setShowCustomDeadlineModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Add Custom Deadline
            </DialogTitle>
            <DialogDescription>
              Add a custom filing deadline to your calendar
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="deadline-title">Deadline Title</Label>
              <Input 
                id="deadline-title"
                placeholder="e.g., Quarterly Tax Filing"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="deadline-date">Due Date</Label>
              <Input 
                id="deadline-date"
                type="date"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="deadline-jurisdiction">Jurisdiction</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select jurisdiction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usa">🇺🇸 United States</SelectItem>
                  <SelectItem value="eu">🇪🇺 European Union</SelectItem>
                  <SelectItem value="singapore">🇸🇬 Singapore</SelectItem>
                  <SelectItem value="uae">🇦🇪 UAE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="deadline-priority">Priority Level</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="deadline-notes">Notes</Label>
              <Textarea 
                id="deadline-notes"
                placeholder="Additional notes or requirements..."
                className="mt-1"
              />
            </div>
            
            <Button className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Custom Deadline
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}