import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Award, FileText, Search, Plus, Minus, Check, X } from "lucide-react";
import { mockVaultFolders } from "@/lib/mock-data";
import { Document } from "@/lib/types";
import { cn } from "@/lib/utils";

interface BadgeDocumentManagerProps {
  isOpen: boolean;
  onClose: () => void;
  badgeId: string;
  badgeName: string;
  initialDocumentIds: string[];
  onDocumentsChange: (badgeId: string, documentIds: string[]) => void;
}

export function BadgeDocumentManager({
  isOpen,
  onClose,
  badgeId,
  badgeName,
  initialDocumentIds,
  onDocumentsChange
}: BadgeDocumentManagerProps) {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>(initialDocumentIds);
  const [searchTerm, setSearchTerm] = useState("");

  // Get all documents from vault
  const allDocuments = mockVaultFolders.flatMap(folder => folder.documents);

  const filteredDocuments = allDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDocumentToggle = (docId: string) => {
    setSelectedDocuments(prev =>
      prev.includes(docId)
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleSave = () => {
    onDocumentsChange(badgeId, selectedDocuments);
    onClose();
  };

  const handleSelectAll = () => {
    setSelectedDocuments(allDocuments.map(doc => doc.id));
  };

  const handleClearAll = () => {
    setSelectedDocuments([]);
  };

  const getFileIcon = (type: Document['type']) => {
    return <FileText className="w-4 h-4" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            Manage Documents for "{badgeName}"
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Select which documents should be associated with this compliance badge
          </p>
        </DialogHeader>

        <div className="space-y-4 flex-1">
          {/* Search and bulk actions */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search documents by name or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
            >
              <Plus className="w-3 h-3 mr-1" />
              Select All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
            >
              <X className="w-3 h-3 mr-1" />
              Clear All
            </Button>
          </div>

          {/* Document list */}
          <ScrollArea className="flex-1 min-h-0">
            <div className="space-y-2">
              {filteredDocuments.map(document => {
                const isSelected = selectedDocuments.includes(document.id);
                const folder = mockVaultFolders.find(f => f.id === document.folderId);
                
                return (
                  <div
                    key={document.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border transition-all hover:bg-muted/50",
                      isSelected ? "border-primary bg-primary/5" : "border-border"
                    )}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleDocumentToggle(document.id)}
                    />
                    
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {getFileIcon(document.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{document.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {folder?.name}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {document.type.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {(document.size / 1024 / 1024).toFixed(1)} MB
                          </span>
                          {document.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </div>
                );
              })}

              {filteredDocuments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No documents found matching your search</p>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Selection summary and actions */}
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium">
              {selectedDocuments.length} document{selectedDocuments.length === 1 ? '' : 's'} selected
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Check className="w-3 h-3 mr-1" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}