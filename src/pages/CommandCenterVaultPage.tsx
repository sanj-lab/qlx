// @new - Legal Vault Management - Encrypted document fortress with AI memory
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CommandCenterSubnav } from "@/components/ui/command-center-subnav";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DragDropZone } from "@/components/ui/drag-drop-zone";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockVaultFolders } from "@/lib/mock-data";
import { 
  Folder,
  FileText,
  Upload,
  Download,
  Share,
  Trash2,
  Edit3,
  Eye,
  Hash,
  Search,
  Filter,
  MoreHorizontal,
  Brain,
  Shield,
  Clock,
  Award
} from "lucide-react";

interface VaultFile {
  id: string;
  name: string;
  type: 'document' | 'badge' | 'memory';
  size: number;
  hash: string;
  uploadedAt: string;
  folderId: string;
  tags: string[];
  isIndexed: boolean;
  metadata?: {
    jurisdiction?: string;
    documentType?: string;
    badgeType?: string;
    score?: number;
  };
}

const additionalFiles: VaultFile[] = [
  {
    id: "file-1",
    name: "Token Economics Analysis Badge",
    type: "badge",
    size: 0,
    hash: "0x8a7b6c5d...",
    uploadedAt: "2024-02-10T15:20:00Z",
    folderId: "badges",
    tags: ["tokenomics", "analysis", "expert-reviewed"],
    isIndexed: true,
    metadata: {
      badgeType: "Expert-Reviewed",
      score: 89
    }
  },
  {
    id: "file-2", 
    name: "Jurisdiction Preferences",
    type: "memory",
    size: 1024,
    hash: "0x9f8e7d6c...",
    uploadedAt: "2024-02-01T10:15:00Z",
    folderId: "memories",
    tags: ["preferences", "ai-memory"],
    isIndexed: true,
    metadata: {
      documentType: "AI Memory"
    }
  },
  {
    id: "file-3",
    name: "VARA License Renewal Notice",
    type: "document", 
    size: 789000,
    hash: "0xa1b2c3d4...",
    uploadedAt: "2024-02-08T14:30:00Z",
    folderId: "licenses",
    tags: ["vara", "renewal", "uae"],
    isIndexed: true,
    metadata: {
      jurisdiction: "UAE",
      documentType: "License"
    }
  }
];

// Combine mock data with additional files
const allVaultFiles = [
  ...mockVaultFolders.flatMap(folder => 
    folder.documents.map(doc => ({
      ...doc,
      type: 'document' as const,
      isIndexed: doc.isIndexed,
      metadata: {
        documentType: folder.name
      }
    }))
  ),
  ...additionalFiles
];

export default function CommandCenterVaultPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<VaultFile | null>(null);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadTags, setUploadTags] = useState("");
  const [uploadIncludeInAI, setUploadIncludeInAI] = useState(true);

  const filteredFiles = allVaultFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFolder = selectedFolder === "all" || file.folderId === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const getFileIcon = (type: VaultFile['type']) => {
    switch (type) {
      case 'badge':
        return <Award className="h-5 w-5 text-primary" />;
      case 'memory':
        return <Brain className="h-5 w-5 text-accent" />;
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getTypeColor = (type: VaultFile['type']) => {
    switch (type) {
      case 'badge':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'memory':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return 'Badge';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUpload = () => {
    // Simulated upload logic
    console.log('Uploading files:', uploadFiles);
    console.log('Tags:', uploadTags);
    console.log('Include in AI:', uploadIncludeInAI);
    setShowUploadModal(false);
    setUploadFiles([]);
    setUploadTags("");
  };

  const handleShare = (file: VaultFile) => {
    setSelectedFile(file);
    setShowShareModal(true);
  };

  const handleDelete = (fileId: string) => {
    console.log('Deleting file:', fileId);
  };

  const documentCount = filteredFiles.filter(f => f.type === 'document').length;
  const badgeCount = filteredFiles.filter(f => f.type === 'badge').length;
  const memoryCount = filteredFiles.filter(f => f.type === 'memory').length;
  const indexedCount = filteredFiles.filter(f => f.isIndexed).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Subnav */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Legal Vault</h1>
              <p className="text-muted-foreground">Encrypted document fortress with AI memory management</p>
            </div>
            <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Documents
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Upload to Legal Vault</DialogTitle>
                  <DialogDescription>
                    Upload documents, badges, or AI memories to your secure vault
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <DragDropZone
                    onFilesChange={setUploadFiles}
                    maxFiles={10}
                    acceptedFileTypes={['.pdf', '.docx', '.txt', '.sol']}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="folder-select">Folder</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select folder" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockVaultFolders.map(folder => (
                            <SelectItem key={folder.id} value={folder.id}>
                              {folder.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input 
                        id="tags"
                        value={uploadTags}
                        onChange={(e) => setUploadTags(e.target.value)}
                        placeholder="legal, license, uae"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="ai-index"
                      checked={uploadIncludeInAI}
                      onCheckedChange={setUploadIncludeInAI}
                    />
                    <Label htmlFor="ai-index" className="text-sm">
                      Include in AI memory (adds to RAG index)
                    </Label>
                  </div>

                  <div className="flex space-x-3">
                    <Button onClick={handleUpload} disabled={uploadFiles.length === 0}>
                      Upload {uploadFiles.length} {uploadFiles.length === 1 ? 'file' : 'files'}
                    </Button>
                    <Button variant="outline" onClick={() => setShowUploadModal(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <CommandCenterSubnav className="w-full" />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="enterprise-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-foreground">{documentCount}</div>
                      <div className="text-sm text-muted-foreground">Documents</div>
                    </div>
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary">{badgeCount}</div>
                      <div className="text-sm text-muted-foreground">Badges</div>
                    </div>
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-accent">{memoryCount}</div>
                      <div className="text-sm text-muted-foreground">AI Memories</div>
                    </div>
                    <Brain className="h-6 w-6 text-accent" />
                  </div>
                </CardContent>
              </Card>

              <Card className="enterprise-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-success">{indexedCount}</div>
                      <div className="text-sm text-muted-foreground">AI Indexed</div>
                    </div>
                    <Search className="h-6 w-6 text-success" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search & Filters */}
            <Card className="enterprise-card">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search documents, badges, memories..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Folders</SelectItem>
                      {mockVaultFolders.map(folder => (
                        <SelectItem key={folder.id} value={folder.id}>
                          {folder.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Files List */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle>Vault Contents</CardTitle>
                <CardDescription>
                  {filteredFiles.length} items • Encrypted storage with AI memory integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredFiles.map((file) => (
                    <div 
                      key={file.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        {getFileIcon(file.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-medium">{file.name}</h4>
                            <Badge variant="outline" className={getTypeColor(file.type)}>
                              {file.type}
                            </Badge>
                            {file.isIndexed && (
                              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                                <Brain className="w-3 h-3 mr-1" />
                                AI Indexed
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <span>{formatFileSize(file.size)}</span>
                            <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                            {file.metadata && 'score' in file.metadata && file.metadata.score && (
                              <span>Score: {file.metadata.score}/100</span>
                            )}
                            {file.metadata && 'jurisdiction' in file.metadata && file.metadata.jurisdiction && (
                              <Badge variant="outline" className="text-xs">
                                {file.metadata.jurisdiction}
                              </Badge>
                            )}
                          </div>

                          {file.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {file.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {file.tags.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{file.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}

                          <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                            <Hash className="w-3 h-3" />
                            <code className="font-mono">{file.hash}</code>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleShare(file)}
                        >
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(file.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {filteredFiles.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No files found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchTerm ? 'Try a different search term' : 'Upload your first document to get started'}
                      </p>
                      <Button onClick={() => setShowUploadModal(true)}>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Documents
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Folder Navigation */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="text-base">Vault Folders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={selectedFolder === "all" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedFolder("all")}
                >
                  <Folder className="w-4 h-4 mr-2" />
                  All Files
                </Button>
                {mockVaultFolders.map((folder) => (
                  <Button
                    key={folder.id}
                    variant={selectedFolder === folder.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedFolder(folder.id)}
                  >
                    <Folder className="w-4 h-4 mr-2" />
                    {folder.name}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/command-center/dashboard')}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Risk Dashboard
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/proofs')}
                >
                  <Award className="w-4 h-4 mr-2" />
                  Generate Proofs
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/launch-path/doc-studio')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Document Studio
                </Button>
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card className="enterprise-card border-success/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium text-success">Vault Security</span>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>• End-to-end encryption</div>
                  <div>• Cryptographic hashing</div>
                  <div>• Immutable audit trail</div>
                  <div>• AI memory isolation</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Share Document</DialogTitle>
            <DialogDescription>
              Create a secure, encrypted link to share {selectedFile?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="link-expiry">Link Expiry</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select expiry time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="24h">24 Hours</SelectItem>
                  <SelectItem value="7d">7 Days</SelectItem>
                  <SelectItem value="30d">30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="access-code" />
              <Label htmlFor="access-code" className="text-sm">
                Require access code
              </Label>
            </div>

            <div className="flex space-x-2">
              <Button className="flex-1">Generate Link</Button>
              <Button variant="outline" onClick={() => setShowShareModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}