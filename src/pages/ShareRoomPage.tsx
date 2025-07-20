import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Share2, 
  Copy, 
  Link2, 
  Shield, 
  Users, 
  Eye, 
  Clock,
  FileText,
  CheckCircle2,
  Mail,
  Calendar,
  Download,
  Lock,
  Globe,
  Lightbulb
} from "lucide-react";

export default function ShareRoomPage() {
  const [selectedBadge, setSelectedBadge] = useState("");
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [passwordProtected, setPasswordProtected] = useState(true);
  const [expiryEnabled, setExpiryEnabled] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);

  const badges = [
    { 
      id: "badge-1", 
      name: "SAFT Compliance Badge", 
      type: "ZK-Verified", 
      score: "87%",
      jurisdiction: "UAE",
      date: "2024-01-15"
    },
    { 
      id: "badge-2", 
      name: "DAO Charter Verification", 
      type: "Redline Review", 
      score: "92%",
      jurisdiction: "EU",
      date: "2024-01-10"
    }
  ];

  const documents = [
    { id: "doc-1", name: "SAFT Agreement v2.1", type: "SAFT", size: "2.4 MB" },
    { id: "doc-2", name: "Privacy Policy", type: "Policy", size: "1.2 MB" },
    { id: "doc-3", name: "Whitepaper v3.0", type: "Whitepaper", size: "4.8 MB" },
    { id: "doc-4", name: "Token Economics", type: "Analysis", size: "1.8 MB" }
  ];

  const activeRooms = [
    {
      id: "room-1",
      name: "Series A Due Diligence",
      description: "Legal documents for Series A review",
      created: "2024-01-15",
      expires: "2024-02-15",
      views: 12,
      documents: 5,
      status: "active"
    },
    {
      id: "room-2",
      name: "Regulatory Compliance Package",
      description: "Complete compliance documentation",
      created: "2024-01-12",
      expires: "2024-03-12",
      views: 8,
      documents: 3,
      status: "active"
    }
  ];

  const handleDocToggle = (docId: string) => {
    setSelectedDocs(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    );
  };

  const handleGenerateRoom = () => {
    setIsGenerated(true);
  };

  const selectedBadgeData = badges.find(badge => badge.id === selectedBadge);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Investor & Regulator Share Room</h1>
          <p className="text-muted-foreground">Generate sharable room links with access control for badges and documents</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Room Configuration */}
          <div className="lg:col-span-1">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Create Share Room
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Room Name</label>
                  <Input 
                    placeholder="e.g., Series A Due Diligence"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea 
                    placeholder="Brief description of the shared content..."
                    value={roomDescription}
                    onChange={(e) => setRoomDescription(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Select Compliance Badge</label>
                  <Select value={selectedBadge} onValueChange={setSelectedBadge}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose badge" />
                    </SelectTrigger>
                    <SelectContent>
                      {badges.map(badge => (
                        <SelectItem key={badge.id} value={badge.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{badge.name}</span>
                            <Badge variant="secondary" className="ml-2">{badge.score}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedBadgeData && (
                    <div className="mt-2 p-3 bg-muted/30 rounded-lg">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Type: {selectedBadgeData.type}</span>
                        <span>Score: {selectedBadgeData.score}</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Jurisdiction: {selectedBadgeData.jurisdiction}</span>
                        <span>Date: {selectedBadgeData.date}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Select Documents</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {documents.map(doc => (
                      <div key={doc.id} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={doc.id}
                          checked={selectedDocs.includes(doc.id)}
                          onChange={() => handleDocToggle(doc.id)}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor={doc.id} className="flex-1 text-sm cursor-pointer">
                          <span className="font-medium">{doc.name}</span>
                          <span className="text-muted-foreground ml-2">({doc.size})</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium">Access Control</h4>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      <span className="text-sm">Password Protection</span>
                    </div>
                    <Switch checked={passwordProtected} onCheckedChange={setPasswordProtected} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Auto-Expire</span>
                    </div>
                    <Switch checked={expiryEnabled} onCheckedChange={setExpiryEnabled} />
                  </div>

                  {expiryEnabled && (
                    <div>
                      <label className="text-sm font-medium mb-2 block">Expiry Date</label>
                      <Input type="date" />
                    </div>
                  )}
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleGenerateRoom}
                  disabled={!roomName || !selectedBadge || selectedDocs.length === 0}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Generate Share Room
                </Button>
                
                {/* Agentic Explanation */}
                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">AI-Powered Access Control</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Our agent automatically configures optimal access permissions based on document sensitivity, 
                    regulatory requirements, and recipient type (investor, regulator, auditor).
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Generated Room & Active Rooms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Generated Share Room */}
            {isGenerated && (
              <Card className="enterprise-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    Share Room Generated
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{roomName}</h3>
                          <p className="text-sm text-muted-foreground">{roomDescription}</p>
                        </div>
                        <Badge className="status-success">Active</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground">Badge:</span>
                          <p className="font-medium">{selectedBadgeData?.name}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Documents:</span>
                          <p className="font-medium">{selectedDocs.length} files</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Access:</span>
                          <p className="font-medium">{passwordProtected ? "Password Protected" : "Open Access"}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Expires:</span>
                          <p className="font-medium">{expiryEnabled ? "30 days" : "Never"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Link2 className="w-4 h-4" />
                          <span className="font-medium">Share Room URL</span>
                        </div>
                        <Button size="sm" variant="outline">
                          <Copy className="w-3 h-3 mr-1" />
                          Copy Link
                        </Button>
                      </div>
                      <p className="text-xs font-mono text-muted-foreground break-all">
                        https://quentlex.com/share/dd8f2e1c-4b5a-9c3d-7e6f-8a9b0c1d2e3f
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button className="w-full">
                        <Mail className="w-4 h-4 mr-2" />
                        Send via Email
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Active Share Rooms */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Active Share Rooms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeRooms.map(room => (
                    <div key={room.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{room.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{room.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Created: {room.created}</span>
                            <span>•</span>
                            <span>Expires: {room.expires}</span>
                          </div>
                        </div>
                        <Badge className="status-success">{room.status}</Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                          <span>{room.views} views</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span>{room.documents} documents</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-muted-foreground" />
                          <span>Protected</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t">
                        <Button size="sm" variant="outline" onClick={() => setShowAnalyticsModal(true)}>
                          <Eye className="w-3 h-3 mr-1" />
                          View Analytics
                        </Button>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Copy className="w-3 h-3 mr-1" />
                            Copy Link
                          </Button>
                          <Button size="sm" onClick={() => setShowManageModal(true)}>
                            <Share2 className="w-3 h-3 mr-1" />
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Access Analytics */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Share Room Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-primary">24</div>
                    <div className="text-sm text-muted-foreground">Total Views</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-success">8</div>
                    <div className="text-sm text-muted-foreground">Unique Visitors</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-warning">12</div>
                    <div className="text-sm text-muted-foreground">Downloads</div>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-muted-foreground">2</div>
                    <div className="text-sm text-muted-foreground">Active Rooms</div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium mb-3">Recent Access Log</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>investor@vc-fund.com viewed SAFT Agreement</span>
                      <span className="text-muted-foreground">2 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>legal@regulator.gov downloaded compliance badge</span>
                      <span className="text-muted-foreground">4 hours ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>analyst@fund.com accessed share room</span>
                      <span className="text-muted-foreground">1 day ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}