// @new - Review thread component for real-time collaboration
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  MessageSquare, 
  FileText, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Eye,
  Edit3,
  ArrowRight,
  Download,
  Share
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  timestamp: string;
  type: 'comment' | 'change' | 'approval' | 'request';
  documentId?: string;
  position?: { start: number; end: number };
}

interface DocumentTab {
  id: string;
  name: string;
  type: 'document' | 'analysis' | 'compliance';
  content: string;
  changes?: Array<{
    id: string;
    type: 'insertion' | 'deletion' | 'modification';
    position: { start: number; end: number };
    original: string;
    suggested: string;
    status: 'pending' | 'accepted' | 'rejected';
  }>;
}

interface Review {
  id: string;
  title: string;
  status: 'sent' | 'in-review' | 'returned' | 'signed';
  lawyer: {
    id: string;
    name: string;
    firm: string;
    avatar?: string;
    isOnline: boolean;
  };
  documents: DocumentTab[];
  comments: Comment[];
  progress: number;
  createdAt: string;
  updatedAt: string;
}

interface ReviewThreadProps {
  review: Review;
  onStatusChange?: (status: Review['status']) => void;
  onCommentAdd?: (comment: Omit<Comment, 'id' | 'timestamp'>) => void;
  className?: string;
}

export function ReviewThread({ 
  review, 
  onStatusChange, 
  onCommentAdd,
  className 
}: ReviewThreadProps) {
  const [activeTab, setActiveTab] = useState<string>(review.documents[0]?.id || '');
  const [newComment, setNewComment] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (review.lawyer.isOnline) {
      const interval = setInterval(() => {
        setIsTyping(Math.random() > 0.7);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [review.lawyer.isOnline]);

  const getStatusColor = (status: Review['status']) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200';
      case 'in-review': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200';
      case 'returned': return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200';
      case 'signed': return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: Review['status']) => {
    switch (status) {
      case 'sent': return <Send className="w-3 h-3" />;
      case 'in-review': return <Eye className="w-3 h-3" />;
      case 'returned': return <AlertCircle className="w-3 h-3" />;
      case 'signed': return <CheckCircle className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !onCommentAdd) return;
    
    onCommentAdd({
      userId: 'current-user',
      userName: 'You',
      content: newComment,
      type: 'comment',
      documentId: activeTab
    });
    
    setNewComment("");
  };

  const activeDocument = review.documents.find(doc => doc.id === activeTab);

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Header */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{review.title}</CardTitle>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={review.lawyer.avatar} />
                    <AvatarFallback className="text-xs">
                      {review.lawyer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {review.lawyer.name} · {review.lawyer.firm}
                  </span>
                  {review.lawyer.isOnline && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span className="text-xs text-success">Online</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(review.status)}>
                {getStatusIcon(review.status)}
                <span className="ml-1 capitalize">{review.status.replace('-', ' ')}</span>
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
          
          {/* Progress */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-muted-foreground">Review Progress</span>
              <span className="font-medium">{review.progress}%</span>
            </div>
            <Progress value={review.progress} className="h-2" />
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-3 gap-4 min-h-0">
        {/* Documents Panel */}
        <div className="col-span-2">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  {review.documents.map((doc) => (
                    <TabsTrigger key={doc.id} value={doc.id} className="text-xs">
                      <FileText className="w-3 h-3 mr-1" />
                      {doc.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </CardHeader>
            
            <CardContent className="flex-1 min-h-0">
              {activeDocument && (
                <ScrollArea className="h-full">
                  <div className="space-y-4">
                    {/* Document Content */}
                    <div className="p-4 border rounded-lg bg-muted/30">
                      <h4 className="font-medium mb-2">{activeDocument.name}</h4>
                      <div className="text-sm leading-relaxed whitespace-pre-wrap">
                        {activeDocument.content}
                      </div>
                    </div>
                    
                    {/* Changes */}
                    {activeDocument.changes && activeDocument.changes.length > 0 && (
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Suggested Changes</h5>
                        {activeDocument.changes.map((change) => (
                          <div key={change.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant={
                                change.type === 'insertion' ? 'default' : 
                                change.type === 'deletion' ? 'destructive' : 'secondary'
                              }>
                                {change.type}
                              </Badge>
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline">Accept</Button>
                                <Button size="sm" variant="outline">Reject</Button>
                              </div>
                            </div>
                            <div className="text-sm">
                              <div className="text-red-600 line-through">{change.original}</div>
                              <div className="text-green-600">{change.suggested}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Comments Panel */}
        <div className="col-span-1">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Comments & Activity
                <Badge variant="secondary" className="ml-auto">
                  {review.comments.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 min-h-0 flex flex-col">
              <ScrollArea className="flex-1 mb-3">
                <div className="space-y-3">
                  {review.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-2">
                      <Avatar className="w-6 h-6 mt-1">
                        <AvatarImage src={comment.userAvatar} />
                        <AvatarFallback className="text-xs">
                          {comment.userName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium">{comment.userName}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex gap-2 opacity-60">
                      <Avatar className="w-6 h-6 mt-1">
                        <AvatarImage src={review.lawyer.avatar} />
                        <AvatarFallback className="text-xs">
                          {review.lawyer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-1">
                          {review.lawyer.name} is typing...
                        </div>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              {/* Comment Input */}
              <div className="space-y-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={2}
                  className="text-sm"
                />
                <div className="flex justify-between">
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      Accept All
                    </Button>
                    <Button size="sm" variant="outline">
                      Request Changes
                    </Button>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    <Send className="w-3 h-3 mr-1" />
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}