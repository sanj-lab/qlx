// @new - Complete Timeline functionality for tracking snapshots over time
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SnapshotCard } from "@/components/ui/snapshot-card";
import { RiskDial } from "@/components/ui/risk-dial";
import { EnhancedProofSimulator } from "@/lib/enhanced-simulation";
import { 
  ArrowLeft, 
  Clock, 
  TrendingUp, 
  Calendar,
  BarChart3,
  Filter,
  Download
} from "lucide-react";

export default function ProofTimelinePage() {
  const navigate = useNavigate();
  const [timelineSnapshots, setTimelineSnapshots] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showComparison, setShowComparison] = useState(false);
  
  useEffect(() => {
    document.title = "Timeline View – Quentlex Proofs";
    
    // Generate timeline data
    const simulator = new EnhancedProofSimulator();
    const baseSnapshots = simulator.getMockSnapshots();
    
    // Create historical snapshots  
    const timelineData = [
      ...baseSnapshots,
      // Add historical snapshots with different timestamps
      {
        ...baseSnapshots[0],
        id: 'snap_historical_1',
        timestamp: '2024-01-01T10:30:00Z',
        riskScore: 78,
        title: 'Q4 2023 Compliance Snapshot'
      },
      {
        ...baseSnapshots[1],
        id: 'snap_historical_2', 
        timestamp: '2023-12-15T14:20:00Z',
        riskScore: 82,
        title: 'Initial Company Badge'
      },
      {
        ...baseSnapshots[0],
        id: 'snap_historical_3',
        timestamp: '2023-11-20T09:15:00Z',
        riskScore: 74,
        title: 'Pre-Launch Compliance Check'
      }
    ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    setTimelineSnapshots(timelineData);
  }, []);

  const filteredSnapshots = timelineSnapshots.filter(snapshot => {
    if (selectedFilter === 'all') return true;
    return snapshot.type === selectedFilter;
  });

  const getRiskTrend = () => {
    const riskScores = timelineSnapshots
      .filter(s => s.riskScore)
      .map(s => s.riskScore)
      .reverse(); // chronological order
    
    if (riskScores.length < 2) return 'stable';
    
    const latest = riskScores[riskScores.length - 1];
    const previous = riskScores[riskScores.length - 2];
    
    if (latest > previous + 5) return 'improving';
    if (latest < previous - 5) return 'declining';
    return 'stable';
  };

  const getAverageRiskScore = () => {
    const scores = timelineSnapshots.filter(s => s.riskScore).map(s => s.riskScore);
    return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  };

  const filterOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'self', label: 'Self-Reviewed' },
    { value: 'expert', label: 'Expert-Verified' },
    { value: 'company', label: 'Company Badges' }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 px-6 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/proofs')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Proofs
            </Button>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-7 h-7 text-primary" />
            <h1 className="text-3xl font-bold">Timeline View</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Track your compliance snapshots over time and visualize improvements in your company's risk profile.
          </p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Analytics Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="premium-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Snapshots</p>
                    <p className="text-2xl font-bold">{timelineSnapshots.length}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                    <p className="text-2xl font-bold">{getAverageRiskScore()}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Risk Trend</p>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold capitalize">{getRiskTrend()}</span>
                      <TrendingUp className={`w-4 h-4 ${
                        getRiskTrend() === 'improving' ? 'text-success' : 
                        getRiskTrend() === 'declining' ? 'text-destructive' : 'text-muted-foreground'
                      }`} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="premium-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Expert Reviews</p>
                    <p className="text-2xl font-bold">
                      {timelineSnapshots.filter(s => s.type === 'expert').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center">
                    <RiskDial score={getAverageRiskScore()} size="sm" showLabel={false} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter:</span>
              {filterOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={selectedFilter === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowComparison(!showComparison)}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {showComparison ? 'Hide' : 'Show'} Comparison
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Timeline
              </Button>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {filteredSnapshots.map((snapshot, index) => (
              <div key={snapshot.id} className="relative">
                {/* Timeline Line */}
                {index < filteredSnapshots.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-20 bg-border" />
                )}
                
                <div className="flex gap-6">
                  {/* Timeline Dot */}
                  <div className="flex-shrink-0 w-16 flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      snapshot.type === 'expert' ? 'bg-success border-success' :
                      snapshot.type === 'company' ? 'bg-primary border-primary' :
                      'bg-accent border-accent'
                    }`} />
                    <div className="text-center mt-2">
                      <div className="text-xs text-muted-foreground">
                        {new Date(snapshot.timestamp).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(snapshot.timestamp).getFullYear()}
                      </div>
                    </div>
                  </div>

                  {/* Snapshot Card */}
                  <div className="flex-1">
                    <SnapshotCard
                      snapshot={snapshot}
                      onShare={() => navigate('/proofs/share')}
                      onDownload={() => console.log('Download snapshot')}
                      onVerify={() => window.open(snapshot.verificationUrl, '_blank')}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredSnapshots.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium mb-2">No snapshots found</h3>
              <p className="text-muted-foreground mb-4">
                No snapshots match the selected filter criteria.
              </p>
              <Button onClick={() => setSelectedFilter('all')}>
                Show All Snapshots
              </Button>
            </div>
          )}

          {/* Risk Score Comparison Chart */}
          {showComparison && timelineSnapshots.some(s => s.riskScore) && (
            <Card className="premium-card mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Risk Score Progression
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-center gap-4 p-4">
                  {timelineSnapshots
                    .filter(s => s.riskScore)
                    .reverse() // chronological order
                    .map((snapshot, index) => (
                      <div key={snapshot.id} className="flex flex-col items-center">
                        <div 
                          className="w-8 bg-primary rounded-t-lg"
                          style={{ height: `${(snapshot.riskScore / 100) * 200}px` }}
                        />
                        <div className="text-xs text-center mt-2 w-12">
                          <div className="font-medium">{snapshot.riskScore}</div>
                          <div className="text-muted-foreground">
                            {new Date(snapshot.timestamp).toLocaleDateString('en-US', { 
                              month: 'short' 
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </main>
  );
}