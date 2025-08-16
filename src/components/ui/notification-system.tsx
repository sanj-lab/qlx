import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Bell, AlertTriangle, Clock, CheckCircle, FileText, 
  Shield, Users, Calendar, X, ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  actionUrl?: string;
  actionLabel?: string;
  isRead: boolean;
  category: 'compliance' | 'legal' | 'deadline' | 'system';
}

interface NotificationSystemProps {
  className?: string;
}

export function NotificationSystem({ className }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "critical",
      title: "MiCA Compliance Update",
      message: "New requirements effective July 15, 2024 - Review your whitepapers immediately",
      timestamp: "2 hours ago",
      actionUrl: "/command-center/drift",
      actionLabel: "Review Changes",
      isRead: false,
      category: "compliance"
    },
    {
      id: "2",
      type: "warning",
      title: "Contract Review Due",
      message: "Series A term sheet requires legal review by EOD - 4 hours remaining",
      timestamp: "4 hours ago",
      actionUrl: "/co-review",
      actionLabel: "Open Review",
      isRead: false,
      category: "legal"
    },
    {
      id: "3",
      type: "info",
      title: "Filing Deadline Reminder",
      message: "Annual compliance filing due in 14 days for Singapore operations",
      timestamp: "6 hours ago",
      actionUrl: "/command-center/filings",
      actionLabel: "View Calendar",
      isRead: false,
      category: "deadline"
    },
    {
      id: "4",
      type: "success",
      title: "ZK Proof Generated",
      message: "Your compliance proof has been generated successfully and is ready for sharing",
      timestamp: "1 day ago",
      actionUrl: "/proofs/share",
      actionLabel: "View Proof",
      isRead: true,
      category: "system"
    },
    {
      id: "5",
      type: "info",
      title: "Expert Review Complete",
      message: "Your token classification analysis has been reviewed by Sarah Chen, Securities Attorney",
      timestamp: "2 days ago",
      actionUrl: "/proofs/expert-badge",
      actionLabel: "View Results",
      isRead: true,
      category: "legal"
    }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'critical') return notification.type === 'critical';
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string, category: string) => {
    if (type === 'critical') return AlertTriangle;
    if (category === 'compliance') return Shield;
    if (category === 'legal') return FileText;
    if (category === 'deadline') return Calendar;
    if (type === 'success') return CheckCircle;
    return Bell;
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'critical': return 'text-destructive bg-destructive/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'success': return 'text-success bg-success/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="sm"
        className="relative h-10 w-10 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Panel */}
      {isOpen && (
        <Card className="absolute right-0 mt-2 w-96 bg-background border shadow-xl z-50">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">Notifications</h4>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Filter buttons */}
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter('unread')}
              >
                Unread ({unreadCount})
              </Button>
              <Button
                variant={filter === 'critical' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setFilter('critical')}
              >
                Critical
              </Button>
            </div>
          </div>

          <ScrollArea className="max-h-80">
            <div className="p-2">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No notifications to show</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredNotifications.map((notification) => {
                    const IconComponent = getNotificationIcon(notification.type, notification.category);
                    return (
                      <Card 
                        key={notification.id}
                        className={cn(
                          "p-3 cursor-pointer transition-colors hover:bg-muted/50",
                          !notification.isRead && "bg-primary/5"
                        )}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <CardContent className="p-0">
                          <div className="flex items-start gap-3">
                            <div className={cn(
                              "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                              getNotificationColor(notification.type)
                            )}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-medium text-sm truncate">
                                  {notification.title}
                                </h5>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-4 w-4 p-0 opacity-50 hover:opacity-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeNotification(notification.id);
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                              
                              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                {notification.message}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                  {notification.timestamp}
                                </span>
                                
                                {notification.actionUrl && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 text-xs"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      window.location.href = notification.actionUrl!;
                                    }}
                                  >
                                    {notification.actionLabel}
                                    <ExternalLink className="w-3 h-3 ml-1" />
                                  </Button>
                                )}
                              </div>
                              
                              {!notification.isRead && (
                                <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </ScrollArea>

          {unreadCount > 0 && (
            <div className="p-3 border-t">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={markAllAsRead}
              >
                Mark All as Read
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}