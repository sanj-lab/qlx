import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Download,
  Eye,
  Clock,
  Shield,
  Globe,
  BarChart3,
  Calendar,
  Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'compliance';
  status: 'analyzing' | 'completed' | 'failed';
  riskScore: number;
  jurisdiction: string[];
  uploadDate: string;
  lastModified: string;
}

interface AuditSummary {
  totalDocuments: number;
  highRiskIssues: number;
  completedAnalyses: number;
  avgRiskScore: number;
}

export default function EnterpriseDashboard() {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  
  const mockDocuments: Document[] = [
    {
      id: '1',
      name: 'DAO_Governance_Contract.sol',
      type: 'contract',
      status: 'completed',
      riskScore: 85,
      jurisdiction: ['EU', 'US'],
      uploadDate: '2024-01-15',
      lastModified: '2024-01-15'
    },
    {
      id: '2',
      name: 'Token_Sale_Agreement.pdf',
      type: 'compliance',
      status: 'completed',
      riskScore: 72,
      jurisdiction: ['UAE', 'Singapore'],
      uploadDate: '2024-01-14',
      lastModified: '2024-01-14'
    },
    {
      id: '3',
      name: 'Privacy_Policy_Draft.txt',
      type: 'compliance',
      status: 'analyzing',
      riskScore: 0,
      jurisdiction: ['EU'],
      uploadDate: '2024-01-16',
      lastModified: '2024-01-16'
    }
  ];

  const auditSummary: AuditSummary = {
    totalDocuments: 15,
    highRiskIssues: 3,
    completedAnalyses: 12,
    avgRiskScore: 78
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'completed': return 'default';
      case 'analyzing': return 'secondary';
      case 'failed': return 'destructive';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Enterprise Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor your organization's legal compliance and document analysis
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button onClick={() => navigate('/clm/upload')}>
                <FileText className="w-4 h-4 mr-2" />
                New Analysis
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{auditSummary.totalDocuments}</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Risk Issues</CardTitle>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">{auditSummary.highRiskIssues}</div>
                <p className="text-xs text-muted-foreground">
                  -1 from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {Math.round((auditSummary.completedAnalyses / auditSummary.totalDocuments) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {auditSummary.completedAnalyses} of {auditSummary.totalDocuments} completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Risk Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${getRiskColor(auditSummary.avgRiskScore)}`}>
                  {auditSummary.avgRiskScore}
                </div>
                <p className="text-xs text-muted-foreground">
                  +5 improvement
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="documents" className="space-y-6">
            <TabsList>
              <TabsTrigger value="documents">Document History</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="compliance">Compliance Overview</TabsTrigger>
              <TabsTrigger value="team">Team Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Documents</CardTitle>
                      <CardDescription>
                        Latest document analyses and their compliance status
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockDocuments.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <FileText className="w-8 h-8 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant={getStatusColor(doc.status)}>
                                {doc.status}
                              </Badge>
                              <div className="flex gap-1">
                                {doc.jurisdiction.map((j) => (
                                  <Badge key={j} variant="outline" className="text-xs">
                                    {j}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          {doc.status === 'completed' && (
                            <div className="text-right">
                              <div className={`font-medium ${getRiskColor(doc.riskScore)}`}>
                                {doc.riskScore}% Safe
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Risk Score
                              </div>
                            </div>
                          )}
                          
                          {doc.status === 'analyzing' && (
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 animate-spin" />
                              <span className="text-sm">Analyzing...</span>
                            </div>
                          )}
                          
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Risk Score Trends</CardTitle>
                    <CardDescription>Track improvement over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 flex items-center justify-center bg-muted/50 rounded">
                      <BarChart3 className="w-8 h-8 text-muted-foreground" />
                      <span className="ml-2 text-muted-foreground">Chart coming soon</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Jurisdiction Breakdown</CardTitle>
                    <CardDescription>Document analysis by region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <span>EU (MiCA)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={65} className="w-20" />
                          <span className="text-sm">8 docs</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <span>US (SEC)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={45} className="w-20" />
                          <span className="text-sm">5 docs</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <span>UAE (VARA)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={20} className="w-20" />
                          <span className="text-sm">2 docs</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      EU MiCA Compliance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Article 7 (Transparency)</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Article 9 (Authorization)</span>
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Article 14 (Reporting)</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-yellow-600" />
                      US SEC Rules
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Securities Act</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Exchange Act</span>
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Investment Advisers Act</span>
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      UAE VARA Standards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">VA License</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">AML/CFT</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Market Conduct</span>
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Team Activity</CardTitle>
                  <CardDescription>Recent actions by team members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                        LE
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Legal Expert uploaded DAO_Governance_Contract.sol</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-sm font-medium">
                        CM
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Compliance Manager completed analysis for Token_Sale_Agreement</p>
                        <p className="text-xs text-muted-foreground">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}