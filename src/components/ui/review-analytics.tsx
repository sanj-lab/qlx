// @new - Review analytics and insights dashboard
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users, 
  AlertCircle,
  CheckCircle,
  Calendar,
  Target
} from "lucide-react";

interface ReviewMetrics {
  totalReviews: number;
  activeReviews: number;
  completedReviews: number;
  avgTurnaround: number;
  totalSpent: number;
  budgetUtilization: number;
  topLawyers: Array<{
    name: string;
    firm: string;
    reviews: number;
    avgRating: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: 'review_started' | 'review_completed' | 'comment_added' | 'change_requested';
    title: string;
    timestamp: string;
    lawyer?: string;
  }>;
}

interface ReviewAnalyticsProps {
  metrics: ReviewMetrics;
  className?: string;
}

export function ReviewAnalytics({ metrics, className }: ReviewAnalyticsProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'review_started':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'review_completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'comment_added':
        return <Users className="w-4 h-4 text-purple-500" />;
      case 'change_requested':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'review_started':
        return 'border-l-blue-500';
      case 'review_completed':
        return 'border-l-green-500';
      case 'comment_added':
        return 'border-l-purple-500';
      case 'change_requested':
        return 'border-l-orange-500';
      default:
        return 'border-l-gray-500';
    }
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Reviews */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
                <p className="text-2xl font-bold">{metrics.totalReviews}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        {/* Active Reviews */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Reviews</p>
                <p className="text-2xl font-bold">{metrics.activeReviews}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        {/* Avg Turnaround */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Turnaround</p>
                <p className="text-2xl font-bold">{metrics.avgTurnaround}h</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        {/* Total Spent */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">${metrics.totalSpent.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Budget Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Period</span>
                <span className="text-sm text-muted-foreground">
                  {metrics.budgetUtilization}% of $50,000
                </span>
              </div>
              <Progress value={metrics.budgetUtilization} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$0</span>
                <span>$25,000</span>
                <span>$50,000</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Lawyers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Legal Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.topLawyers.map((lawyer, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded border">
                  <div>
                    <p className="text-sm font-medium">{lawyer.name}</p>
                    <p className="text-xs text-muted-foreground">{lawyer.firm}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{lawyer.reviews} reviews</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs">{lawyer.avgRating}/5.0</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className={`flex items-start gap-3 p-3 rounded border-l-4 ${getActivityColor(activity.type)}`}
                >
                  <div className="mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    {activity.lawyer && (
                      <p className="text-xs text-muted-foreground">by {activity.lawyer}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}