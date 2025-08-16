import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Award, Plus, X, FileText, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BadgeData {
  id: string;
  name: string;
  type: string;
  score: string;
  jurisdiction: string;
  date: string;
  documentIds: string[];
  status: 'active' | 'expired' | 'pending';
}

interface BadgePickerProps {
  trigger: React.ReactNode;
  selected: string[];
  onSelectionChange: (selected: string[]) => void;
  badges: BadgeData[];
  title?: string;
  description?: string;
  onSelectAllDocuments?: (badgeId: string) => void;
}

export function BadgePicker({ 
  trigger, 
  selected, 
  onSelectionChange, 
  badges,
  title = "Select Compliance Badges",
  description = "Choose badges to include in your share room",
  onSelectAllDocuments
}: BadgePickerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredBadges = badges.filter(badge => {
    const matchesSearch = badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         badge.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         badge.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || badge.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleBadgeToggle = (badgeId: string) => {
    const newSelected = selected.includes(badgeId)
      ? selected.filter(id => id !== badgeId)
      : [...selected, badgeId];
    
    onSelectionChange(newSelected);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'expired':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            {title}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </DialogHeader>
        
        <div className="space-y-4 flex-1">
          {/* Search and filters */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search badges by name, jurisdiction, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              {["all", "active", "pending", "expired"].map((status) => (
                <Button
                  key={status}
                  variant="outline"
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                  className={cn(filterStatus === status && "bg-muted")}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Badge list */}
          <ScrollArea className="flex-1 min-h-0">
            <div className="space-y-3">
              {filteredBadges.map(badge => (
                <div
                  key={badge.id}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-all hover:bg-muted/50",
                    selected.includes(badge.id) 
                      ? "border-primary bg-primary/5" 
                      : "border-border"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selected.includes(badge.id)}
                      onCheckedChange={() => handleBadgeToggle(badge.id)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1 space-y-3">
                      {/* Badge header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{badge.type}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {badge.jurisdiction}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {badge.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={cn("text-xs", getStatusColor(badge.status))}>
                            {badge.status}
                          </Badge>
                          <Badge variant="secondary" className="text-xs font-bold">
                            {badge.score}
                          </Badge>
                        </div>
                      </div>

                      {/* Documents info and actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-border/50">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <FileText className="w-3 h-3" />
                          <span>{badge.documentIds.length} attached documents</span>
                        </div>
                        
                        {onSelectAllDocuments && badge.documentIds.length > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onSelectAllDocuments(badge.id)}
                            className="h-7 text-xs"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Select All Documents
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredBadges.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Award className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No badges found matching your criteria</p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Selection summary */}
          {selected.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">
                {selected.length} badge{selected.length === 1 ? '' : 's'} selected
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSelectionChange([])}
                >
                  <X className="w-3 h-3 mr-1" />
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}