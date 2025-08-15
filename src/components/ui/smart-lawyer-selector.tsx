// @new - Smart lawyer selector with AI matching
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Search, 
  Star, 
  Clock, 
  Globe, 
  DollarSign, 
  Zap,
  TrendingUp,
  CheckCircle,
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LawyerProfile {
  id: string;
  name: string;
  title: string;
  firm: string;
  avatar?: string;
  jurisdictions: string[];
  specialties: string[];
  rating: number;
  reviewCount: number;
  avgTurnaround: string;
  hourlyRate: number;
  availability: 'available' | 'busy' | 'unavailable';
  recentReviews: number;
  languages: string[];
  matchScore?: number;
  matchReasons?: string[];
}

interface SmartLawyerSelectorProps {
  lawyers: LawyerProfile[];
  selectedLawyer?: string;
  onSelect: (lawyerId: string) => void;
  reviewContext?: {
    jurisdictions: string[];
    documentTypes: string[];
    urgency: 'standard' | 'priority';
  };
  className?: string;
}

export function SmartLawyerSelector({
  lawyers,
  selectedLawyer,
  onSelect,
  reviewContext,
  className
}: SmartLawyerSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [sortedLawyers, setSortedLawyers] = useState<LawyerProfile[]>([]);

  useEffect(() => {
    let scored = lawyers.map(lawyer => {
      let score = 0;
      const reasons: string[] = [];

      if (reviewContext) {
        // Jurisdiction match
        const jurisdictionMatch = lawyer.jurisdictions.some(j => 
          reviewContext.jurisdictions.includes(j)
        );
        if (jurisdictionMatch) {
          score += 30;
          reasons.push("Jurisdiction expertise");
        }

        // Specialty match
        const hasRelevantSpecialty = lawyer.specialties.some(specialty =>
          reviewContext.documentTypes.some(type => 
            specialty.toLowerCase().includes(type.toLowerCase()) ||
            type.toLowerCase().includes(specialty.toLowerCase())
          )
        );
        if (hasRelevantSpecialty) {
          score += 25;
          reasons.push("Relevant specialization");
        }

        // Availability for urgency
        if (reviewContext.urgency === 'priority' && lawyer.availability === 'available') {
          score += 20;
          reasons.push("Available for priority review");
        }
      }

      // Rating bonus
      score += lawyer.rating * 5;
      if (lawyer.rating >= 4.8) {
        reasons.push("Top-rated expert");
      }

      // Recent activity bonus
      if (lawyer.recentReviews > 10) {
        score += 10;
        reasons.push("High activity");
      }

      return {
        ...lawyer,
        matchScore: score,
        matchReasons: reasons
      };
    });

    // Filter
    if (filterAvailable) {
      scored = scored.filter(l => l.availability === 'available');
    }

    if (searchTerm) {
      scored = scored.filter(l => 
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.firm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort by match score, then rating
    scored.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0) || b.rating - a.rating);

    setSortedLawyers(scored);
  }, [lawyers, reviewContext, searchTerm, filterAvailable]);

  const getAvailabilityColor = (availability: LawyerProfile['availability']) => {
    switch (availability) {
      case 'available': return 'text-success';
      case 'busy': return 'text-warning';
      case 'unavailable': return 'text-destructive';
    }
  };

  const getAvailabilityText = (availability: LawyerProfile['availability']) => {
    switch (availability) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'unavailable': return 'Unavailable';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Select Legal Expert</CardTitle>
          {reviewContext && (
            <Badge variant="outline" className="text-xs">
              <Zap className="w-3 h-3 mr-1" />
              AI Matched
            </Badge>
          )}
        </div>
        
        {/* Search and Filters */}
        <div className="flex gap-2 mt-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search lawyers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant={filterAvailable ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterAvailable(!filterAvailable)}
          >
            <Filter className="w-4 h-4 mr-1" />
            Available Only
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {sortedLawyers.map((lawyer) => (
              <div
                key={lawyer.id}
                className={cn(
                  "p-4 rounded-lg border cursor-pointer transition-all",
                  selectedLawyer === lawyer.id 
                    ? "border-primary bg-primary/5" 
                    : "hover:bg-muted/50"
                )}
                onClick={() => onSelect(lawyer.id)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={lawyer.avatar} />
                    <AvatarFallback>
                      {lawyer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <h4 className="font-medium text-sm">{lawyer.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {lawyer.title} · {lawyer.firm}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {lawyer.matchScore && lawyer.matchScore > 50 && (
                          <Badge variant="secondary" className="text-xs">
                            {Math.round(lawyer.matchScore)}% match
                          </Badge>
                        )}
                        {selectedLawyer === lawyer.id && (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        )}
                      </div>
                    </div>
                    
                    {/* Stats Row */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{lawyer.rating}</span>
                        <span>({lawyer.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{lawyer.avgTurnaround}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        <span>${lawyer.hourlyRate}</span>
                      </div>
                      <div className={cn("flex items-center gap-1", getAvailabilityColor(lawyer.availability))}>
                        <div className="w-2 h-2 rounded-full bg-current" />
                        <span>{getAvailabilityText(lawyer.availability)}</span>
                      </div>
                    </div>
                    
                    {/* Jurisdictions */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {lawyer.jurisdictions.slice(0, 3).map(jurisdiction => (
                        <Badge key={jurisdiction} variant="outline" className="text-xs">
                          <Globe className="w-3 h-3 mr-1" />
                          {jurisdiction}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {lawyer.specialties.slice(0, 2).map(specialty => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* AI Match Reasons */}
                    {lawyer.matchReasons && lawyer.matchReasons.length > 0 && (
                      <div className="text-xs text-primary">
                        <TrendingUp className="w-3 h-3 inline mr-1" />
                        {lawyer.matchReasons.slice(0, 2).join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}