import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  UserCheck, 
  FileText, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Send,
  Eye,
  Users,
  Calendar,
  Lightbulb,
  Star,
  ThumbsUp,
  Paperclip
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function ReviewRoutingPage() {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [selectedReviewer, setSelectedReviewer] = useState("");
  const [priority, setPriority] = useState("");
  const [reviewNote, setReviewNote] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const documents = [
    { id: "saft-1", name: "SAFT Agreement v2.1", type: "SAFT", status: "Draft" },
    { id: "charter-1", name: "DAO Charter", type: "Charter", status: "Review" },
    { id: "privacy-1", name: "Privacy Policy", type: "Policy", status: "Draft" },
    { id: "terms-1", name: "Terms of Service", type: "Terms", status: "Draft" }
  ];

  const reviewers = [
    { 
      id: "sarah", 
      name: "Sarah Chen", 
      role: "Senior Legal Counsel", 
      speciality: "Corporate Law",
      avatar: "/api/placeholder/32/32",
      availability: "Available",
      workload: 3
    },
    { 
      id: "marcus", 
      name: "Marcus Rodriguez", 
      role: "Regulatory Expert", 
      speciality: "Web3 Compliance",
      avatar: "/api/placeholder/32/32",
      availability: "Busy",
      workload: 7
    },
    { 
      id: "elena", 
      name: "Elena Kozlov", 
      role: "Contract Specialist", 
      speciality: "Token Law",
      avatar: "/api/placeholder/32/32",
      availability: "Available",
      workload: 2
    }
  ];

  const activeReviews = [
    {
      id: "rev-1",
      document: "SAFT Agreement v2.0",
      reviewer: "Sarah Chen",
      status: "In Review",
      progress: 65,
      startDate: "2024-01-15",
      comments: 3
    },
    {
      id: "rev-2",
      document: "Privacy Policy",
      reviewer: "Elena Kozlov",
      status: "Pending",
      progress: 0,
      startDate: "2024-01-16",
      comments: 0
    },
    {
      id: "rev-3",
      document: "DAO Charter",
      reviewer: "Marcus Rodriguez",
      status: "Complete",
      progress: 100,
      startDate: "2024-01-10",
      comments: 8
    }
  ];

  const handleSubmitReview = () => {
    setIsSubmitted(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete": return "text-success";
      case "In Review": return "text-primary";
      case "Pending": return "text-warning";
      default: return "text-muted-foreground";
    }
  };

  const getAvailabilityColor = (availability: string) => {
    return availability === "Available" ? "text-success" : "text-warning";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Async Legal Review Routing</h1>
          <p className="text-muted-foreground">Route documents to reviewers with status tracking and comment threads</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Request Review */}
          <div className="lg:col-span-1">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  Request Review
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Document</label>
                  <Select value={selectedDocument} onValueChange={setSelectedDocument}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose document" />
                    </SelectTrigger>
                    <SelectContent>
                      {documents.map(doc => (
                        <SelectItem key={doc.id} value={doc.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{doc.name}</span>
                            <Badge variant="secondary" className="ml-2">{doc.type}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Assign Reviewer</label>
                  <Select value={selectedReviewer} onValueChange={setSelectedReviewer}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose reviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      {reviewers.map(reviewer => (
                        <SelectItem key={reviewer.id} value={reviewer.id}>
                          <div className="flex items-center gap-3 w-full">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={reviewer.avatar} />
                              <AvatarFallback>{reviewer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{reviewer.name}</span>
                                <span className={`text-xs ${getAvailabilityColor(reviewer.availability)}`}>
                                  {reviewer.availability}
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground">{reviewer.speciality}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Priority Level</label>
                  <Select value={priority} onValueChange={setPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Set priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">🔴 Urgent (24 hours)</SelectItem>
                      <SelectItem value="high">🟡 High (3 days)</SelectItem>
                      <SelectItem value="normal">🟢 Normal (1 week)</SelectItem>
                      <SelectItem value="low">⚪ Low (2 weeks)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Review Notes</label>
                  <Textarea 
                    placeholder="Add specific areas to focus on or requirements..."
                    value={reviewNote}
                    onChange={(e) => setReviewNote(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleSubmitReview}
                  disabled={!selectedDocument || !selectedReviewer || !priority}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Request Review
                </Button>
                
                {/* AI Matching Explanation */}
                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Smart Reviewer Matching</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Our AI analyzes document type, complexity, and reviewer expertise to suggest 
                    the optimal legal expert for your review, considering workload and availability.
                  </p>
                </div>

                {isSubmitted && (
                  <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span className="text-sm font-medium text-success">Review request sent!</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Active Reviews */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Active Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeReviews.map(review => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{review.document}</h4>
                          <p className="text-sm text-muted-foreground">Assigned to {review.reviewer}</p>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={getStatusColor(review.status)}
                        >
                          {review.status}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{review.progress}%</span>
                        </div>
                        <Progress value={review.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>Started {review.startDate}</span>
                          </div>
                          <div 
                            className="flex items-center gap-1 cursor-pointer hover:text-primary"
                            onClick={() => {
                              setSelectedReview(review);
                              setShowCommentsModal(true);
                            }}
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>{review.comments} comments</span>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedReview(review);
                            setShowViewDetailsModal(true);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Team Workload */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Workload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviewers.map(reviewer => (
                    <div key={reviewer.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <Avatar>
                        <AvatarImage src={reviewer.avatar} />
                        <AvatarFallback>{reviewer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{reviewer.name}</span>
                          <span className={`text-sm ${getAvailabilityColor(reviewer.availability)}`}>
                            {reviewer.availability}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{reviewer.role}</span>
                          <span className="text-sm text-muted-foreground">{reviewer.workload} active reviews</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Comment Thread Preview */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Recent Comments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">Sarah Chen</span>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        The anti-dilution clause needs revision. Current terms are too favorable to investors.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">Marcus Rodriguez</span>
                        <span className="text-xs text-muted-foreground">1 day ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        DAO Charter looks good overall. Just need to clarify voting thresholds for major decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      <Dialog open={showViewDetailsModal} onOpenChange={setShowViewDetailsModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              Review Details - {selectedReview?.document}
            </DialogTitle>
            <DialogDescription>
              Comprehensive review status and progress tracking
            </DialogDescription>
          </DialogHeader>
          
          {selectedReview && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Document</div>
                  <div className="text-sm text-muted-foreground">{selectedReview.document}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Reviewer</div>
                  <div className="text-sm text-muted-foreground">{selectedReview.reviewer}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Status</div>
                  <Badge className={getStatusColor(selectedReview.status)}>{selectedReview.status}</Badge>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Progress</div>
                  <div className="text-sm text-muted-foreground">{selectedReview.progress}% complete</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="text-sm font-medium">Review Timeline</div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Review Started</div>
                      <div className="text-xs text-muted-foreground">{selectedReview.startDate}</div>
                    </div>
                  </div>
                  {selectedReview.status === "In Review" && (
                    <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                      <Clock className="w-4 h-4 text-primary" />
                      <div className="flex-1">
                        <div className="text-sm font-medium">Currently Reviewing</div>
                        <div className="text-xs text-muted-foreground">Section 3: Anti-dilution provisions</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Estimated Completion</div>
                      <div className="text-xs text-muted-foreground">January 22, 2024</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="text-sm font-medium">Review Metrics</div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 border rounded-lg text-center">
                    <div className="text-lg font-bold text-primary">{selectedReview.comments}</div>
                    <div className="text-xs text-muted-foreground">Comments</div>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <div className="text-lg font-bold text-warning">2</div>
                    <div className="text-xs text-muted-foreground">Issues Found</div>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <div className="text-lg font-bold text-success">4.8</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Comments Modal */}
      <Dialog open={showCommentsModal} onOpenChange={setShowCommentsModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Review Comments - {selectedReview?.document}
            </DialogTitle>
            <DialogDescription>
              Comment thread and feedback from reviewer
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              <div className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">Sarah Chen</span>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    The anti-dilution clause in Section 4.2 needs significant revision. The current full-ratchet protection is extremely investor-favorable and could severely harm founder equity in down rounds.
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="text-xs">Critical</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Paperclip className="w-3 h-3" />
                      <span>Section 4.2</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">Sarah Chen</span>
                    <span className="text-xs text-muted-foreground">3 hours ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Board composition in Section 6.1 should be revised to maintain founder control. Suggest 2-1-1 structure rather than equal representation.
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-warning text-warning-foreground text-xs">High Priority</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Paperclip className="w-3 h-3" />
                      <span>Section 6.1</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">Sarah Chen</span>
                    <span className="text-xs text-muted-foreground">4 hours ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Overall document structure is well-organized. Good compliance with Delaware C-Corp standards.
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">Positive</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ThumbsUp className="w-3 h-3" />
                      <span>General feedback</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex gap-2">
                <Input placeholder="Add a comment..." className="flex-1" />
                <Button size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}