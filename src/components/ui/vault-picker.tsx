// @new - Vault picker component for selecting documents
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, FolderOpen, FileText, File } from "lucide-react";
import { mockVaultFolders } from "@/lib/mock-data";
import { Document, VaultFolder } from "@/lib/types";
import { cn } from "@/lib/utils";

interface VaultPickerProps {
  trigger: React.ReactNode;
  selected: string[];
  onSelectionChange: (selected: string[]) => void;
  maxSelection?: number;
  title?: string;
  description?: string;
}

export function VaultPicker({ 
  trigger, 
  selected, 
  onSelectionChange, 
  maxSelection,
  title = "Select Documents",
  description = "Choose documents from your Legal Vault"
}: VaultPickerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const filteredFolders = mockVaultFolders.filter(folder => 
    folder.documents.length > 0 &&
    (selectedFolder === null || folder.id === selectedFolder) &&
    (searchTerm === "" || 
     folder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     folder.documents.some(doc => 
       doc.name.toLowerCase().includes(searchTerm.toLowerCase())
     ))
  );

  const handleDocumentToggle = (docId: string) => {
    const newSelected = selected.includes(docId)
      ? selected.filter(id => id !== docId)
      : maxSelection && selected.length >= maxSelection
        ? selected
        : [...selected, docId];
    
    onSelectionChange(newSelected);
  };

  const getFileIcon = (type: Document['type']) => {
    return <FileText className="w-4 h-4" />;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </DialogHeader>
        
        <div className="space-y-4 flex-1">
          {/* Search and filter */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedFolder(null)}
              className={cn(!selectedFolder && "bg-muted")}
            >
              All Folders
            </Button>
          </div>

          {/* Folder tabs */}
          <div className="flex gap-2 flex-wrap">
            {mockVaultFolders.filter(f => f.documents.length > 0).map(folder => (
              <Button
                key={folder.id}
                variant="outline"
                size="sm"
                onClick={() => setSelectedFolder(folder.id)}
                className={cn(
                  "gap-2",
                  selectedFolder === folder.id && "bg-muted"
                )}
              >
                <FolderOpen className="w-4 h-4" />
                {folder.name}
                <Badge variant="secondary" className="text-xs">
                  {folder.documents.length}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Document list */}
          <ScrollArea className="flex-1 min-h-0">
            <div className="space-y-4">
              {filteredFolders.map(folder => (
                <div key={folder.id} className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <FolderOpen className="w-4 h-4" />
                    {folder.name}
                  </h4>
                  
                  <div className="space-y-2 pl-6">
                    {folder.documents.map(document => (
                      <div
                        key={document.id}
                        className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <Checkbox
                          checked={selected.includes(document.id)}
                          onCheckedChange={() => handleDocumentToggle(document.id)}
                          disabled={maxSelection && !selected.includes(document.id) && selected.length >= maxSelection}
                        />
                        
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {getFileIcon(document.type)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{document.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <p className="text-xs text-muted-foreground">
                                {(document.size / 1024 / 1024).toFixed(1)} MB
                              </p>
                              <Badge variant="outline" className="text-xs">
                                {document.type.toUpperCase()}
                              </Badge>
                              {document.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Selection summary */}
          {selected.length > 0 && (
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium">
                {selected.length} document{selected.length === 1 ? '' : 's'} selected
                {maxSelection && ` (max ${maxSelection})`}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelectionChange([])}
              >
                Clear All
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}