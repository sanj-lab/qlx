// @new - Lawyer selection card component for institutional-grade legal review
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Clock, CheckCircle, Globe, Scale } from "lucide-react";

interface LawyerCardProps {
  lawyer: {
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
    availability: 'available' | 'busy' | 'offline';
    recentReviews: number;
    languages: string[];
  };
  selected?: boolean;
  onSelect?: () => void;
}

export function LawyerCard({ lawyer, selected, onSelect }: LawyerCardProps) {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available': return 'Available';
      case 'busy': return 'Busy';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <Card 
      className={`group cursor-pointer transition-all duration-200 hover:shadow-md ${
        selected ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarImage src={lawyer.avatar} alt={lawyer.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {lawyer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div 
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getAvailabilityColor(lawyer.availability)}`}
              title={getAvailabilityText(lawyer.availability)}
            />
          </div>
          
          <div className="flex-1 space-y-2">
            <div>
              <h3 className="font-semibold text-sm">{lawyer.name}</h3>
              <p className="text-xs text-muted-foreground">{lawyer.title}</p>
              <p className="text-xs font-medium">{lawyer.firm}</p>
            </div>
            
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="font-medium">{lawyer.rating}</span>
                <span className="text-muted-foreground">({lawyer.reviewCount})</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{lawyer.avgTurnaround}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <CheckCircle className="w-3 h-3" />
                <span>{lawyer.recentReviews} this month</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-1">
              {lawyer.jurisdictions.slice(0, 3).map((jurisdiction) => (
                <Badge key={jurisdiction} variant="outline" className="text-xs px-2 py-0.5">
                  <Globe className="w-2 h-2 mr-1" />
                  {jurisdiction}
                </Badge>
              ))}
              {lawyer.jurisdictions.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  +{lawyer.jurisdictions.length - 3}
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap gap-1">
              {lawyer.specialties.slice(0, 2).map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-xs px-2 py-0.5">
                  <Scale className="w-2 h-2 mr-1" />
                  {specialty}
                </Badge>
              ))}
              {lawyer.specialties.length > 2 && (
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  +{lawyer.specialties.length - 2}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs">
                <span className="font-medium">${lawyer.hourlyRate}/hr</span>
                <span className="text-muted-foreground ml-2">• {lawyer.languages.join(', ')}</span>
              </div>
              {selected && (
                <Badge variant="default" className="text-xs">
                  Selected
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {selected && (
          <div className="mt-4 pt-4 border-t">
            <Button size="sm" className="w-full">
              Book Consultation
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}