import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VaultPicker } from "@/components/ui/vault-picker";
import { 
  Plus, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare,
  FileText,
  ArrowRight,
  AlertTriangle,
  Send
} from "lucide-react";

interface Review {
  id: string;
  title: string;
  lawyer: {
    name: string;
    firm: string;
    avatar?: string;
  };
  status: 'sent' | 'in-review' | 'returned' | 'completed';
  progress: number;
  commentsCount: number;
  urgency: 'standard' | 'priority';
  updatedAt: string;
}

interface Lawyer {
  id: string;
  name: string;
  firm: string;
  specialty: string;
  avatar?: string;
  rate: number;
  turnaround: string;
}

const LAWYERS: Lawyer[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    firm: 'Clifford Chance',
    specialty: 'Token Classification & VARA Compliance',
    avatar: '/assets/expert-avatar-1.png',
    rate: 850,
    turnaround: '2-3 days'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    firm: 'Allen & Overy',
    specialty: 'MiCA Compliance & Cross-border',
    avatar: '/assets/expert-avatar-2.png',
    rate: 650,
    turnaround: '1-2 days'
  },
  {
    id: '3',
    name: 'Emma Thompson',
    firm: 'Linklaters',
    specialty: 'Smart Contracts & DeFi Regulation',
    avatar: '/assets/expert-avatar-3.png',
    rate: 750,
    turnaround: '3-4 days'
  }
];

const REVIEWS: Review[] = [
  {
    id: '1',
    title: 'Series A Documentation Review',
    lawyer: { name: 'Sarah Chen', firm: 'Clifford Chance', avatar: '/assets/expert-avatar-1.png' },
    status: 'in-review',
    progress: 65,
    commentsCount: 8,
    urgency: 'priority',
    updatedAt: '2 hours ago'
  },
  {
    id: '2',
    title: 'Post-Incorporation Compliance',
    lawyer: { name: 'Emma Thompson', firm: 'Linklaters', avatar: '/assets/expert-avatar-3.png' },
    status: 'returned',
    progress: 100,
    commentsCount: 12,
    urgency: 'standard',
    updatedAt: '1 day ago'
  },
  {
    id: '3',
    title: 'Token Classification Analysis',
    lawyer: { name: 'Michael Rodriguez', firm: 'Allen & Overy', avatar: '/assets/expert-avatar-2.png' },
    status: 'completed',
    progress: 100,
    commentsCount: 5,
    urgency: 'standard',
    updatedAt: '3 days ago'
  }
];

export default function CoReviewPage() {
  const [showCreateReview, setShowCreateReview] = useState(false);
  const [showVaultPicker, setShowVaultPicker] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [selectedLawyer, setSelectedLawyer] = useState<string>("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviews] = useState<Review[]>(REVIEWS);

  const getStatusColor = (status: Review['status']) => {
    switch (status) {
      case 'sent': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'in-review': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'returned': return 'bg-green-50 text-green-700 border-green-200';
      case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: Review['status']) => {
    switch (status) {
      case 'sent': return <Send className="w-4 h-4" />;
      case 'in-review': return <Clock className="w-4 h-4" />;
      case 'returned': return <AlertCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleCreateReview = () => {
    if (!selectedDocuments.length || !selectedLawyer || !reviewTitle.trim()) return;
    
    // Simple success state
    setShowCreateReview(false);
    setSelectedDocuments([]);
    setSelectedLawyer("");
    setReviewTitle("");
  };

  const handleVaultSelection = (selectedIds: string[]) => {
    setSelectedDocuments(selectedIds);
    setShowVaultPicker(false);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Legal Disclaimer - Prominent Position */}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-800 font-medium">
            <strong>Legal Notice:</strong> This platform facilitates legal consultations but does not provide legal advice. 
            All interactions are subject to attorney-client privilege where applicable.
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-light mb-3">Legal Reviews</h1>
          <p className="text-xl text-gray-600 font-light">Send documents for expert review. Simple. Fast. Secure.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid gap-8">
          {/* Create Review Section */}
          {showCreateReview && (
            <Card className="border-2 border-blue-100 bg-blue-50/50">
              <CardHeader>
                <CardTitle className="text-xl">Create New Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Review Title</label>
                    <Input
                      placeholder="e.g. Series A Documentation Review"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      className="text-lg h-12"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Documents</label>
                    <Button
                      variant="outline"
                      onClick={() => setShowVaultPicker(true)}
                      className="w-full h-16 border-dashed"
                    >
                      <FileText className="w-6 h-6 mr-3" />
                      <div className="text-left">
                        <div>Select from Legal Vault</div>
                        <div className="text-xs text-gray-500">
                          {selectedDocuments.length > 0 ? `${selectedDocuments.length} documents selected` : 'No documents selected'}
                        </div>
                      </div>
                    </Button>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Choose Lawyer</label>
                    <div className="grid gap-3">
                      {LAWYERS.map((lawyer) => (
                        <div
                          key={lawyer.id}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            selectedLawyer === lawyer.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedLawyer(lawyer.id)}
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={lawyer.avatar} />
                              <AvatarFallback>{lawyer.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="font-medium">{lawyer.name}</div>
                              <div className="text-sm text-gray-600">{lawyer.firm}</div>
                              <div className="text-xs text-gray-500">{lawyer.specialty}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">${lawyer.rate}/hr</div>
                              <div className="text-xs text-gray-500">{lawyer.turnaround}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowCreateReview(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateReview} disabled={!selectedDocuments.length || !selectedLawyer || !reviewTitle.trim()}>
                    <Send className="w-4 h-4 mr-2" />
                    Send for Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {!showCreateReview && (
            <div className="text-center py-8">
              <Button
                onClick={() => setShowCreateReview(true)}
                size="lg"
                className="h-16 px-8 text-lg"
              >
                <Plus className="w-6 h-6 mr-3" />
                Create New Review
              </Button>
            </div>
          )}

          {/* Active Reviews */}
          {reviews.length > 0 && (
            <div>
              <h2 className="text-2xl font-light mb-6">Active Reviews</h2>
              <div className="grid gap-6">
                {reviews.map((review) => (
                  <Card key={review.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium mb-1">{review.title}</h3>
                          <p className="text-gray-600">
                            {review.lawyer.name} • {review.lawyer.firm}
                          </p>
                        </div>
                        <Badge className={`px-3 py-1 border ${getStatusColor(review.status)}`}>
                          {getStatusIcon(review.status)}
                          <span className="ml-2 capitalize">{review.status.replace('-', ' ')}</span>
                        </Badge>
                      </div>

                      {review.status === 'in-review' && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Progress</span>
                            <span>{review.progress}%</span>
                          </div>
                          <Progress value={review.progress} className="h-2" />
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{review.commentsCount} comments</span>
                          </div>
                          {review.urgency === 'priority' && (
                            <Badge variant="outline" className="text-orange-600 border-orange-200">
                              Priority
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span>Updated {review.updatedAt}</span>
                          <Button variant="ghost" size="sm">
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Vault Picker Dialog */}
      {showVaultPicker && (
        <VaultPicker
          open={showVaultPicker}
          onOpenChange={setShowVaultPicker}
          onSelectionChange={handleVaultSelection}
          multiple={true}
          title="Select Documents for Review"
        />
      )}
    </main>
  );
}