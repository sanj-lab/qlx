// @modified - Enterprise-grade Co-Review space for institutional legal review
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { LawyerCard } from "@/components/ui/lawyer-card";
import { VaultPicker } from "@/components/ui/vault-picker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Plus, 
  Filter, 
  Search, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare,
  FileText,
  Shield,
  Star,
  Users,
  Calendar,
  DollarSign,
  Globe,
  Scale,
  Briefcase,
  Eye,
  Download,
  Share,
  ArrowRight,
  Zap,
  Target,
  Settings
} from "lucide-react";
import type { Document } from "@/lib/types";

interface ReviewItem {
  id: string;
  type: 'document' | 'compliance-map' | 'token-classification' | 'risk-analysis' | 'jurisdiction-choice';
  name: string;
  description: string;
  source: string;
  lastModified: string;
}

interface Review {
  id: string;
  title: string;
  items: ReviewItem[];
  lawyer: {
    id: string;
    name: string;
    firm: string;
    avatar?: string;
  };
  status: 'sent' | 'in-review' | 'returned' | 'signed';
  urgency: 'standard' | 'priority';
  createdAt: string;
  updatedAt: string;
  budget: number;
  notes: string;
  progress: number;
  commentsCount: number;
}

const MOCK_LAWYERS = [
  {
    id: 'lawyer_1',
    name: 'Sarah Chen',
    title: 'Partner, Digital Assets',
    firm: 'Clifford Chance',
    avatar: '/api/placeholder/48/48',
    jurisdictions: ['UAE', 'UK', 'Singapore'],
    specialties: ['Token Classification', 'VARA Compliance', 'Securities Law'],
    rating: 4.9,
    reviewCount: 127,
    avgTurnaround: '2-3 days',
    hourlyRate: 850,
    availability: 'available' as const,
    recentReviews: 12,
    languages: ['English', 'Mandarin']
  },
  {
    id: 'lawyer_2',
    name: 'Michael Rodriguez',
    title: 'Senior Associate',
    firm: 'Allen & Overy',
    avatar: '/api/placeholder/48/48',
    jurisdictions: ['EU', 'Spain', 'UK'],
    specialties: ['MiCA Compliance', 'Cross-border Transactions'],
    rating: 4.8,
    reviewCount: 89,
    avgTurnaround: '1-2 days',
    hourlyRate: 650,
    availability: 'busy' as const,
    recentReviews: 8,
    languages: ['English', 'Spanish']
  },
  {
    id: 'lawyer_3',
    name: 'Emma Thompson',
    title: 'Counsel, FinTech',
    firm: 'Linklaters',
    avatar: '/api/placeholder/48/48',
    jurisdictions: ['UK', 'EU', 'US'],
    specialties: ['Smart Contracts', 'DeFi Regulation', 'Investment Funds'],
    rating: 4.9,
    reviewCount: 156,
    avgTurnaround: '3-4 days',
    hourlyRate: 750,
    availability: 'available' as const,
    recentReviews: 15,
    languages: ['English', 'French']
  }
];

const MOCK_REVIEWS: Review[] = [
  {
    id: 'review_1',
    title: 'Series A Documentation Review',
    items: [
      { id: 'item_1', type: 'document', name: 'SAFT Agreement v2.1', description: 'Token sale agreement for institutional investors', source: 'Doc Studio', lastModified: '2 hours ago' },
      { id: 'item_2', type: 'compliance-map', name: 'UAE Compliance Checklist', description: 'VARA regulatory requirements analysis', source: 'Launch Path', lastModified: '1 day ago' }
    ],
    lawyer: { id: 'lawyer_1', name: 'Sarah Chen', firm: 'Clifford Chance', avatar: '/api/placeholder/32/32' },
    status: 'in-review',
    urgency: 'priority',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-16T14:30:00Z',
    budget: 15000,
    notes: 'Focus on token classification and investor protection clauses.',
    progress: 65,
    commentsCount: 8
  },
  {
    id: 'review_2',
    title: 'Post-Incorporation Compliance',
    items: [
      { id: 'item_3', type: 'risk-analysis', name: 'Business Risk Assessment', description: 'Company-wide compliance health check', source: 'Launch Path', lastModified: '3 days ago' }
    ],
    lawyer: { id: 'lawyer_3', name: 'Emma Thompson', firm: 'Linklaters', avatar: '/api/placeholder/32/32' },
    status: 'returned',
    urgency: 'standard',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-14T16:00:00Z',
    budget: 8500,
    notes: 'Ready for final review and signature.',
    progress: 100,
    commentsCount: 12
  }
];

export default function CoReviewPage() {
  const [selectedItems, setSelectedItems] = useState<ReviewItem[]>([]);
  const [selectedLawyer, setSelectedLawyer] = useState<string>("");
  const [showNewReview, setShowNewReview] = useState(false);
  const [showVaultPicker, setShowVaultPicker] = useState(false);
  const [reviewNotes, setReviewNotes] = useState("");
  const [urgency, setUrgency] = useState<'standard' | 'priority'>('standard');
  const [budget, setBudget] = useState<number>(10000);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState("");
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [activeReview, setActiveReview] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Co-Review – Quentlex";
  }, []);

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
      case 'in-review': return <Clock className="w-3 h-3" />;
      case 'returned': return <AlertCircle className="w-3 h-3" />;
      case 'signed': return <CheckCircle className="w-3 h-3" />;
      default: return <FileText className="w-3 h-3" />;
    }
  };

  const getItemTypeIcon = (type: ReviewItem['type']) => {
    switch (type) {
      case 'document': return <FileText className="w-4 h-4" />;
      case 'compliance-map': return <Shield className="w-4 h-4" />;
      case 'token-classification': return <Target className="w-4 h-4" />;
      case 'risk-analysis': return <AlertCircle className="w-4 h-4" />;
      case 'jurisdiction-choice': return <Globe className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleItemSelect = (item: ReviewItem) => {
    setSelectedItems(prev => 
      prev.find(i => i.id === item.id) 
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
    );
  };

  const handleCreateReview = async () => {
    if (!selectedItems.length || !selectedLawyer) return;

    const lawyer = MOCK_LAWYERS.find(l => l.id === selectedLawyer);
    if (!lawyer) return;

    const newReview: Review = {
      id: `review_${Date.now()}`,
      title: `Review Request - ${new Date().toLocaleDateString()}`,
      items: selectedItems,
      lawyer: {
        id: lawyer.id,
        name: lawyer.name,
        firm: lawyer.firm,
        avatar: lawyer.avatar
      },
      status: 'sent',
      urgency,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      budget,
      notes: reviewNotes,
      progress: 0,
      commentsCount: 0
    };

    setReviews(prev => [newReview, ...prev]);
    setShowNewReview(false);
    setSelectedItems([]);
    setSelectedLawyer("");
    setReviewNotes("");
  };

  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);

  const handleVaultSelectionChange = (selectedIds: string[]) => {
    setSelectedDocIds(selectedIds);
    // For now, we'll create mock ReviewItems from selected document IDs
    const items: ReviewItem[] = selectedIds.map(id => ({
      id,
      type: 'document',
      name: `Document ${id.slice(-8)}`,
      description: `Document from Legal Vault`,
      source: 'Legal Vault',
      lastModified: new Date().toLocaleDateString()
    }));
    setSelectedItems(prev => [...prev.filter(item => item.source !== 'Legal Vault'), ...items]);
    setShowVaultPicker(false);
  };

  const filteredReviews = reviews.filter(review => {
    const matchesFilter = activeFilter === 'all' || review.status === activeFilter;
    const matchesSearch = review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.lawyer.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-8 px-6 border-b">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Expert Review, Simplified</h1>
              <p className="text-muted-foreground">Send documents, analyses, or entire compliance scenarios for review — collaborate in real time</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs">
                <Shield className="w-3 h-3 mr-1" />
                Simulated for pilot
              </Badge>
              <Dialog open={showNewReview} onOpenChange={setShowNewReview}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create Legal Review</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Step 1: Select Items */}
                    <div>
                      <h3 className="font-medium mb-3">1. Select Items for Review</h3>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            onClick={() => setShowVaultPicker(true)}
                            className="flex-1"
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Add from Legal Vault
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Shield className="w-4 h-4 mr-2" />
                            Add Compliance Maps
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Target className="w-4 h-4 mr-2" />
                            Add Risk Analyses
                          </Button>
                        </div>
                        
                        {selectedItems.length > 0 && (
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {selectedItems.map((item) => (
                              <div key={item.id} className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                                {getItemTypeIcon(item.type)}
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">{item.description}</p>
                                </div>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => handleItemSelect(item)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Step 2: Select Lawyer */}
                    <div>
                      <h3 className="font-medium mb-3">2. Choose Legal Expert</h3>
                      <div className="grid gap-3 max-h-64 overflow-y-auto">
                        {MOCK_LAWYERS.map((lawyer) => (
                          <LawyerCard
                            key={lawyer.id}
                            lawyer={lawyer}
                            selected={selectedLawyer === lawyer.id}
                            onSelect={() => setSelectedLawyer(lawyer.id)}
                          />
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Step 3: Review Parameters */}
                    <div className="space-y-4">
                      <h3 className="font-medium">3. Review Parameters</h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="urgency">Urgency</Label>
                          <Select value={urgency} onValueChange={(value: 'standard' | 'priority') => setUrgency(value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard (3-5 days)</SelectItem>
                              <SelectItem value="priority">Priority (1-2 days)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="budget">Budget Range</Label>
                          <Select value={budget.toString()} onValueChange={(value) => setBudget(Number(value))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5000">$5,000 - $10,000</SelectItem>
                              <SelectItem value="10000">$10,000 - $15,000</SelectItem>
                              <SelectItem value="15000">$15,000 - $25,000</SelectItem>
                              <SelectItem value="25000">$25,000+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="notes">Review Notes & Context</Label>
                        <Textarea
                          id="notes"
                          placeholder="Provide context, specific focus areas, or special instructions..."
                          value={reviewNotes}
                          onChange={(e) => setReviewNotes(e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button variant="outline" onClick={() => setShowNewReview(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleCreateReview}
                        disabled={!selectedItems.length || !selectedLawyer}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send for Review
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reviews List */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Active Reviews</CardTitle>
                  <Badge variant="secondary">{reviews.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filters */}
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant={activeFilter === 'all' ? 'default' : 'outline'}
                    onClick={() => setActiveFilter('all')}
                  >
                    All
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeFilter === 'in-review' ? 'default' : 'outline'}
                    onClick={() => setActiveFilter('in-review')}
                  >
                    In Review
                  </Button>
                  <Button 
                    size="sm" 
                    variant={activeFilter === 'returned' ? 'default' : 'outline'}
                    onClick={() => setActiveFilter('returned')}
                  >
                    Returned
                  </Button>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Reviews List */}
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {filteredReviews.map((review) => (
                      <Card 
                        key={review.id}
                        className={`cursor-pointer transition-all hover:shadow-sm ${
                          activeReview === review.id ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => setActiveReview(review.id)}
                      >
                        <CardContent className="p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{review.title}</h4>
                              <p className="text-xs text-muted-foreground">{review.lawyer.name} • {review.lawyer.firm}</p>
                            </div>
                            <Badge className={`text-xs ${getStatusColor(review.status)}`}>
                              {getStatusIcon(review.status)}
                              <span className="ml-1 capitalize">{review.status.replace('-', ' ')}</span>
                            </Badge>
                          </div>
                          
                          {review.status === 'in-review' && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Progress</span>
                                <span>{review.progress}%</span>
                              </div>
                              <Progress value={review.progress} className="h-1" />
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{review.items.length} items</span>
                            <div className="flex items-center gap-2">
                              <MessageSquare className="w-3 h-3" />
                              <span>{review.commentsCount}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Review Details */}
          <div className="lg:col-span-2">
            {activeReview ? (
              <ReviewDetails review={reviews.find(r => r.id === activeReview)!} />
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select a review to view details</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Vault Picker Dialog */}
      <Dialog open={showVaultPicker} onOpenChange={setShowVaultPicker}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Select Documents from Legal Vault</DialogTitle>
          </DialogHeader>
          <VaultPicker 
            trigger={<div />}
            selected={selectedDocIds}
            onSelectionChange={handleVaultSelectionChange}
            title="Select Documents for Review"
            description="Choose documents from your Legal Vault to include in the review"
          />
        </DialogContent>
      </Dialog>
    </main>
  );
}

function ReviewDetails({ review }: { review: Review }) {
  const getStatusIcon = (status: Review['status']) => {
    switch (status) {
      case 'sent': return <Send className="w-4 h-4" />;
      case 'in-review': return <Clock className="w-4 h-4" />;
      case 'returned': return <AlertCircle className="w-4 h-4" />;
      case 'signed': return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: Review['status']) => {
    switch (status) {
      case 'sent': return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200';
      case 'in-review': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200';
      case 'returned': return 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200';
      case 'signed': return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200';
    }
  };

  const getItemTypeIcon = (type: ReviewItem['type']) => {
    switch (type) {
      case 'document': return <FileText className="w-4 h-4" />;
      case 'compliance-map': return <Shield className="w-4 h-4" />;
      case 'token-classification': return <Target className="w-4 h-4" />;
      case 'risk-analysis': return <AlertCircle className="w-4 h-4" />;
      case 'jurisdiction-choice': return <Globe className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Review Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {getStatusIcon(review.status)}
                {review.title}
              </CardTitle>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={review.lawyer.avatar} />
                    <AvatarFallback className="text-xs">
                      {review.lawyer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span>{review.lawyer.name} • {review.lawyer.firm}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {review.urgency === 'priority' ? 'Priority' : 'Standard'}
                </Badge>
                <span>${review.budget.toLocaleString()} budget</span>
              </div>
            </div>
            <Badge className={getStatusColor(review.status)}>
              {review.status.replace('-', ' ').toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {review.notes && (
            <div className="mb-4">
              <Label className="text-sm font-medium">Review Notes</Label>
              <p className="text-sm text-muted-foreground mt-1">{review.notes}</p>
            </div>
          )}
          
          {review.status === 'in-review' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Review Progress</span>
                <span>{review.progress}%</span>
              </div>
              <Progress value={review.progress} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Items */}
      <Card>
        <CardHeader>
          <CardTitle>Review Items ({review.items.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {review.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded">
                {getItemTypeIcon(item.type)}
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                  <p className="text-xs text-muted-foreground">Source: {item.source} • Modified {item.lastModified}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-3 h-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Next Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {review.status === 'returned' && (
              <>
                <Button>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Accept All Changes
                </Button>
                <Button variant="outline">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Mark Ready for Snapshot
                </Button>
              </>
            )}
            {review.status === 'in-review' && (
              <Button variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                Add Comment
              </Button>
            )}
            <Button variant="outline">
              <Share className="w-4 h-4 mr-2" />
              Share Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
