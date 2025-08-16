import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  MessageSquare, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Download,
  Send,
  Zap,
  Scale,
  Home,
  Lightbulb,
  Check,
  X,
  Edit3,
  Eye,
  Code
} from "lucide-react";

interface ClauseAnalysis {
  id: string;
  section: string;
  content: string;
  riskScore: number;
  jurisdiction: string;
  issues: string[];
  suggestions: string[];
  regulation: string;
}

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'smart-contract';
  uploadDate: string;
  status: 'analyzed' | 'processing';
}

interface AISuggestion {
  id: string;
  clause: string;
  priority: 'high' | 'medium' | 'low';
  law: string;
  issue: string;
  originalCode: string;
  aiGeneratedFix: string;
  recommendedAction: string;
}

const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    name: 'Token Purchase Agreement.pdf',
    type: 'contract',
    uploadDate: '2024-01-15',
    status: 'analyzed'
  },
  {
    id: 'doc-2',
    name: 'ERC20Token.sol',
    type: 'smart-contract',
    uploadDate: '2024-01-14',
    status: 'analyzed'
  },
  {
    id: 'doc-3',
    name: 'Governance Protocol.pdf',
    type: 'contract',
    uploadDate: '2024-01-13',
    status: 'processing'
  }
];

const mockAnalysis: ClauseAnalysis[] = [
  {
    id: 'clause-1',
    section: '12.3 Force Majeure',
    content: 'Neither party shall be liable for any failure or delay in performance under this Agreement which is due to fire, flood, earthquake, or other acts of God...',
    riskScore: 3.2,
    jurisdiction: 'EU MiCA',
    issues: ['Lacks specific crypto-related force majeure events', 'No mention of blockchain network failures'],
    suggestions: ['Add blockchain network congestion as force majeure event', 'Include smart contract vulnerabilities'],
    regulation: 'MiCA Article 14 - Operational resilience'
  },
  {
    id: 'clause-2', 
    section: '15.1 Indemnification',
    content: 'Company shall indemnify and hold harmless Client from any claims arising from the use of the Service...',
    riskScore: 8.2,
    jurisdiction: 'UAE VARA',
    issues: ['Broad indemnification may violate VARA Guidelines', 'No liability caps specified'],
    suggestions: ['Add liability caps per VARA requirements', 'Exclude regulatory fines from indemnification'],
    regulation: 'VARA Guidelines Section 4.2 - Liability frameworks'
  },
  {
    id: 'clause-3',
    section: '7.4 Data Processing',
    content: 'Client data may be processed and stored in accordance with our Privacy Policy...',
    riskScore: 6.1,
    jurisdiction: 'EU MiCA',
    issues: ['Insufficient GDPR compliance language', 'No mention of cross-border data transfers'],
    suggestions: ['Add explicit GDPR compliance statements', 'Include data transfer safeguards'],
    regulation: 'MiCA Article 67 - Data protection'
  }
];

const mockAISuggestion: AISuggestion = {
  id: 'suggestion-1',
  clause: '15.1 Indemnification',
  priority: 'high',
  law: 'UAE VARA Guidelines Section 4.2',
  issue: 'The current indemnification clause lacks liability caps, which violates VARA Guidelines requiring specific financial limits for crypto service providers.',
  originalCode: 'Company shall indemnify and hold harmless Client from any claims arising from the use of the Service without limitation...',
  aiGeneratedFix: 'Company shall indemnify and hold harmless Client from any claims arising from the use of the Service up to a maximum of $1,000,000 per incident, excluding regulatory fines and sanctions...',
  recommendedAction: 'Update the clause to include liability caps of $1M per incident and exclude regulatory penalties as required by VARA.'
};

export default function CLMDashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedJurisdictions = location.state?.selectedJurisdictions || ['eu-mica'];
  const [chatMessage, setChatMessage] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(mockDocuments[0]);
  const [documentContent, setDocumentContent] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAISuggestion, setShowAISuggestion] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'ai',
      message: 'Analysis complete! I found 3 high-priority clauses that need attention. Ask me about any specific clause or jurisdiction for detailed explanations.'
    }
  ]);

  const getRiskColor = (score: number) => {
    if (score >= 7) return 'text-destructive';
    if (score >= 5) return 'text-warning';
    return 'text-success';
  };

  const getRiskBadge = (score: number) => {
    if (score >= 7) return <Badge className="status-error">High Risk</Badge>;
    if (score >= 5) return <Badge className="status-warning">Medium Risk</Badge>;
    return <Badge className="status-success">Low Risk</Badge>;
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;
    
    setChatHistory(prev => [...prev, 
      { type: 'user', message: chatMessage },
      { 
        type: 'ai', 
        message: 'Based on the analysis, I recommend updating the indemnification clause to include liability caps of $1M per incident, as required by UAE VARA Guidelines Section 4.2. This will reduce your risk score from 8.2 to 3.1.' 
      }
    ]);
    setChatMessage('');
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      case 'low': return 'bg-blue-50 border-blue-200';
    }
  };

  const getPriorityBadgeColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-red-200 text-red-800';
      case 'medium': return 'bg-yellow-200 text-yellow-800';
      case 'low': return 'bg-blue-200 text-blue-800';
    }
  };

  const getDocumentContent = (doc: Document) => {
    if (doc.type === 'smart-contract') {
      return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract QuentlexToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1000000 * 10**18;
    
    constructor() ERC20("QuentlexToken", "QNTX") {
        _mint(msg.sender, 500000 * 10**18);
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }
    
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}`;
    } else {
      return `TOKEN PURCHASE AGREEMENT

This Token Purchase Agreement (this "Agreement") is entered into on ____________, 2024 (the "Effective Date") by and between Quentlex Protocol Ltd., a company incorporated under the laws of [Jurisdiction] ("Company"), and the purchaser identified in the signature block below ("Purchaser").

RECITALS

WHEREAS, Company desires to issue and sell digital tokens ("Tokens") to Purchaser; and
WHEREAS, Purchaser desires to purchase Tokens from Company subject to the terms and conditions set forth herein;

NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows:

1. DEFINITIONS
1.1 "Tokens" means the digital tokens issued by Company.
1.2 "Platform" means Company's blockchain-based platform.

2. PURCHASE AND SALE OF TOKENS
2.1 Subject to the terms hereof, Company agrees to sell and Purchaser agrees to purchase Tokens.

12. FORCE MAJEURE
12.3 Neither party shall be liable for any failure or delay in performance under this Agreement which is due to fire, flood, earthquake, or other acts of God, labor disputes, or other causes beyond the reasonable control of such party.

15. INDEMNIFICATION  
15.1 Company shall indemnify and hold harmless Client from any claims arising from the use of the Service without limitation.

7. DATA PROCESSING
7.4 Client data may be processed and stored in accordance with our Privacy Policy and applicable data protection laws.`;
    }
  };

  const getRedlinedContent = (doc: Document) => {
    if (doc.type === 'smart-contract') {
      return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
<span class="bg-red-100 text-red-800">import "@openzeppelin/contracts/security/ReentrancyGuard.sol";</span>

contract QuentlexToken is ERC20, Ownable<span class="bg-green-100 text-green-800">, ReentrancyGuard</span> {
    uint256 public constant MAX_SUPPLY = 1000000 * 10**18;
    <span class="bg-yellow-100 text-yellow-800">uint256 public constant MIN_TRANSFER_AMOUNT = 1 * 10**15;</span>
    
    constructor() ERC20("QuentlexToken", "QNTX") {
        _mint(msg.sender, 500000 * 10**18);
    }
    
    function mint(address to, uint256 amount) public onlyOwner <span class="bg-green-100 text-green-800">nonReentrant</span> {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        <span class="bg-yellow-100 text-yellow-800">require(amount >= MIN_TRANSFER_AMOUNT, "Below minimum amount");</span>
        _mint(to, amount);
    }
    
    function burn(uint256 amount) public <span class="bg-green-100 text-green-800">nonReentrant</span> {
        _burn(msg.sender, amount);
    }
}`;
    } else {
      return `TOKEN PURCHASE AGREEMENT

This Token Purchase Agreement (this "Agreement") is entered into on ____________, 2024 (the "Effective Date") by and between Quentlex Protocol Ltd., a company incorporated under the laws of [Jurisdiction] ("Company"), and the purchaser identified in the signature block below ("Purchaser").

RECITALS

WHEREAS, Company desires to issue and sell digital tokens ("Tokens") to Purchaser; and
WHEREAS, Purchaser desires to purchase Tokens from Company subject to the terms and conditions set forth herein;

NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the parties agree as follows:

1. DEFINITIONS
1.1 "Tokens" means the digital tokens issued by Company.
1.2 "Platform" means Company's blockchain-based platform.

2. PURCHASE AND SALE OF TOKENS
2.1 Subject to the terms hereof, Company agrees to sell and Purchaser agrees to purchase Tokens.

12. FORCE MAJEURE
12.3 Neither party shall be liable for any failure or delay in performance under this Agreement which is due to fire, flood, earthquake, <span class="bg-green-100 text-green-800">blockchain network congestion, smart contract vulnerabilities,</span> or other acts of God, labor disputes, or other causes beyond the reasonable control of such party.

15. INDEMNIFICATION  
15.1 Company shall indemnify and hold harmless Client from any claims arising from the use of the Service <span class="bg-red-100 text-red-800 line-through">without limitation</span><span class="bg-green-100 text-green-800"> up to a maximum of $1,000,000 per incident, excluding regulatory fines and sanctions</span>.

7. DATA PROCESSING
7.4 Client data may be processed and stored in accordance with our Privacy Policy and applicable data protection laws<span class="bg-yellow-100 text-yellow-800">, including GDPR compliance measures and cross-border data transfer safeguards</span>.`;
    }
  };

  const handleRedlineClick = (clause: string) => {
    if (clause.includes('15.1 Indemnification')) {
      setShowAISuggestion(true);
    }
  };

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">Contract Analysis Dashboard</h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </Button>
              </div>
              <p className="text-muted-foreground">AI-powered clause analysis with redlining and compliance scoring</p>
            </div>
            <Button onClick={() => navigate('/zk-proof', { state: { context: 'clm' } })} className="min-w-[200px]">
              <Shield className="w-4 h-4 mr-2" />
              Generate ZK Proof
            </Button>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="enterprise-card">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-primary">32</div>
                <div className="text-sm text-muted-foreground">Clauses Analyzed</div>
              </CardContent>
            </Card>
            <Card className="enterprise-card">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-destructive">3</div>
                <div className="text-sm text-muted-foreground">High Risk Issues</div>
              </CardContent>
            </Card>
            <Card className="enterprise-card">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-warning">7</div>
                <div className="text-sm text-muted-foreground">Medium Risk Issues</div>
              </CardContent>
            </Card>
            <Card className="enterprise-card">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-success">22</div>
                <div className="text-sm text-muted-foreground">Compliant Clauses</div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Document Viewer */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Contract Document Analysis</span>
                </CardTitle>
                <CardDescription>
                  Review uploaded documents and AI-generated redlines with editing capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="documents" onValueChange={(value) => {
                  if (value === 'redlined' && selectedDocument) {
                    setDocumentContent(isEditMode ? getDocumentContent(selectedDocument) : getRedlinedContent(selectedDocument));
                  }
                }}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="documents">Documents Uploaded</TabsTrigger>
                    <TabsTrigger value="redlined">AI Redlined</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="documents" className="mt-4">
                    <div className="space-y-3">
                      {mockDocuments.map((doc) => (
                        <div 
                          key={doc.id}
                          className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                            selectedDocument?.id === doc.id ? 'border-primary bg-primary/5' : ''
                          }`}
                          onClick={() => setSelectedDocument(doc)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {doc.type === 'smart-contract' ? (
                                <Code className="w-5 h-5 text-primary" />
                              ) : (
                                <FileText className="w-5 h-5 text-primary" />
                              )}
                              <div>
                                <h4 className="font-medium">{doc.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Uploaded {doc.uploadDate} • {doc.type === 'smart-contract' ? 'Smart Contract' : 'Legal Document'}
                                </p>
                              </div>
                            </div>
                            <Badge className={doc.status === 'analyzed' ? 'status-success' : 'status-warning'}>
                              {doc.status === 'analyzed' ? 'Analyzed' : 'Processing'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="redlined" className="mt-4">
                    {selectedDocument ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium flex items-center space-x-2">
                            {selectedDocument.type === 'smart-contract' ? (
                              <Code className="w-4 h-4" />
                            ) : (
                              <FileText className="w-4 h-4" />
                            )}
                            <span>{selectedDocument.name}</span>
                          </h4>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setIsEditMode(!isEditMode)}
                            >
                              {isEditMode ? <Eye className="w-4 h-4 mr-1" /> : <Edit3 className="w-4 h-4 mr-1" />}
                              {isEditMode ? 'View Mode' : 'Edit Mode'}
                            </Button>
                          </div>
                        </div>
                        
                        {isEditMode ? (
                          <Textarea
                            value={documentContent || getDocumentContent(selectedDocument)}
                            onChange={(e) => setDocumentContent(e.target.value)}
                            className="h-96 font-mono text-sm"
                            placeholder="Edit document content..."
                          />
                        ) : (
                          <div 
                            className="bg-muted/30 p-6 rounded-lg h-96 overflow-y-auto font-mono text-sm leading-relaxed whitespace-pre-wrap"
                          >
                            {getRedlinedContent(selectedDocument)}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        Select a document from the "Documents Uploaded" tab to view AI redlines
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>


            {/* Clause Analysis */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Scale className="w-5 h-5" />
                  <span>Clause-by-Clause Analysis</span>
                </CardTitle>
                <CardDescription>
                  Detailed breakdown with risk scores and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalysis.map((clause) => (
                    <div key={clause.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{clause.section}</h4>
                          <p className="text-sm text-muted-foreground">{clause.regulation}</p>
                        </div>
                        <div className="text-right">
                          {getRiskBadge(clause.riskScore)}
                          <div className={`text-sm font-bold ${getRiskColor(clause.riskScore)}`}>
                            {clause.riskScore}/10
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {clause.content}
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium text-destructive mb-1 flex items-center">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Issues Found
                          </h5>
                          <ul className="text-xs space-y-1">
                            {clause.issues.map((issue, i) => (
                              <li key={i} className="text-muted-foreground">• {issue}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-success mb-1 flex items-center">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Suggestions
                          </h5>
                          <ul className="text-xs space-y-1">
                            {clause.suggestions.map((suggestion, i) => (
                              <li key={i} className="text-muted-foreground">• {suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Suggestion Popup */}
            {showAISuggestion && (
              <Card className={`enterprise-card border-2 ${getPriorityColor(mockAISuggestion.priority)} animate-fade-in`}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-semibold">AI Suggestion</span>
                    <div className="flex items-center space-x-2 ml-auto">
                      <span className="text-xs text-muted-foreground">{mockAISuggestion.law}</span>
                      <Badge className={`text-xs px-2 py-1 ${getPriorityBadgeColor(mockAISuggestion.priority)}`}>
                        {mockAISuggestion.priority}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAISuggestion(false)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Issue</h4>
                    <div className="bg-white p-3 rounded border text-xs text-gray-600 leading-relaxed">
                      {mockAISuggestion.issue}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Original Code</h4>
                    <div className="bg-gray-50 p-3 rounded border text-xs text-gray-600 max-h-20 overflow-y-auto font-mono leading-relaxed">
                      {mockAISuggestion.originalCode}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">AI-Generated Fix</h4>
                    <div className="bg-green-50 p-3 rounded border text-xs text-gray-600 max-h-20 overflow-y-auto font-mono leading-relaxed">
                      {mockAISuggestion.aiGeneratedFix}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-sm">Recommended Action</h4>
                    <div className="bg-white p-3 rounded border text-xs text-gray-600 leading-relaxed">
                      {mockAISuggestion.recommendedAction}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs h-8"
                      onClick={() => setShowAISuggestion(false)}
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Apply to Contract
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-xs h-8"
                      onClick={() => setShowAISuggestion(false)}
                    >
                      Dismiss
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            {/* AI Chat */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>AI Legal Assistant</span>
                </CardTitle>
                <CardDescription>
                  Ask questions about compliance recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-48 overflow-y-auto space-y-3">
                    {chatHistory.map((msg, i) => (
                      <div key={i} className={`p-3 rounded-lg text-sm ${
                        msg.type === 'ai' ? 'bg-primary/10 text-primary' : 'bg-muted'
                      }`}>
                        {msg.message}
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask about UAE compliance..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    />
                    <Button size="sm" onClick={sendChatMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download Redlined Contract
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Export Compliance Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Zap className="w-4 h-4 mr-2" />
                  Schedule Review Meeting
                </Button>
              </CardContent>
            </Card>

            {/* Jurisdiction Summary */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle>Analyzed Jurisdictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {selectedJurisdictions.map((id: string) => (
                    <div key={id} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm font-medium">
                        {id === 'eu-mica' ? 'EU MiCA' : 
                         id === 'us-sec' ? 'US SEC' : 
                         id === 'uae-vara' ? 'UAE VARA' : id}
                      </span>
                      <Badge className="status-success">Analyzed</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}