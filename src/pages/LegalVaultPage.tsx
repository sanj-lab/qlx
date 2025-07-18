import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Archive, 
  FileText, 
  Shield, 
  Download, 
  History, 
  GitBranch, 
  Lock,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ExternalLink,
  Search
} from "lucide-react";

export default function LegalVaultPage() {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [isVaulting, setIsVaulting] = useState(false);
  const [vaultProgress, setVaultProgress] = useState(0);

  const documents = [
    { 
      id: "saft-final", 
      name: "SAFT Agreement - Final", 
      type: "SAFT", 
      status: "Finalized",
      lastModified: "2024-01-15",
      version: "v2.1",
      size: "2.4 MB"
    },
    { 
      id: "dao-charter", 
      name: "DAO Charter", 
      type: "Charter", 
      status: "Approved",
      lastModified: "2024-01-10",
      version: "v1.0",
      size: "1.8 MB"
    }
  ];

  const vaultedDocuments = [
    {
      id: "vault-1",
      name: "Series A SAFT Agreement",
      type: "SAFT",
      vaultDate: "2024-01-15",
      versions: 3,
      encryption: "AES-256",
      zkProof: "Generated",
      size: "2.4 MB",
      hash: "0x8f9e2c1a5b4d3e6f..."
    },
    {
      id: "vault-2",
      name: "Privacy Policy v2.0",
      type: "Policy",
      vaultDate: "2024-01-12",
      versions: 2,
      encryption: "AES-256",
      zkProof: "Generated",
      size: "1.2 MB",
      hash: "0x7a8b9c0d1e2f3a4b..."
    },
    {
      id: "vault-3",
      name: "Token Distribution Agreement",
      type: "Agreement",
      vaultDate: "2024-01-08",
      versions: 4,
      encryption: "AES-256",
      zkProof: "Generated",
      size: "3.1 MB",
      hash: "0x5c6d7e8f9a0b1c2d..."
    }
  ];

  const handleVaultDocument = async () => {
    setIsVaulting(true);
    setVaultProgress(0);
    
    // Simulate vaulting process
    const steps = [
      "Finalizing document verification...",
      "Encrypting with AES-256...",
      "Generating cryptographic hash...",
      "Creating ZK proof...",
      "Storing in secure vault..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setVaultProgress((i + 1) * 20);
    }
    
    setIsVaulting(false);
  };

  const selectedDoc = documents.find(doc => doc.id === selectedDocument);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Legal Memory & Filing Vault</h1>
          <p className="text-muted-foreground">Timeline view with version control and encrypted storage for finalized docs</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Vault Document */}
          <div className="lg:col-span-1">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Archive className="w-5 h-5" />
                  Vault Document
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Finalized Document</label>
                  <Select value={selectedDocument} onValueChange={setSelectedDocument}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose document" />
                    </SelectTrigger>
                    <SelectContent>
                      {documents.map(doc => (
                        <SelectItem key={doc.id} value={doc.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{doc.name}</span>
                            <Badge variant="secondary" className="ml-2">{doc.version}</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedDoc && (
                    <div className="mt-2 p-3 bg-muted/30 rounded-lg space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Status:</span>
                        <Badge className="status-success">{selectedDoc.status}</Badge>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Last Modified:</span>
                        <span>{selectedDoc.lastModified}</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Size:</span>
                        <span>{selectedDoc.size}</span>
                      </div>
                    </div>
                  )}
                </div>

                {isVaulting && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Vaulting Progress</span>
                      <span className="text-sm text-muted-foreground">{vaultProgress}%</span>
                    </div>
                    <Progress value={vaultProgress} className="h-2" />
                    <div className="grid gap-3">
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm">Verifying document authenticity and digital signatures</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm">Encrypting with AES-256 and generating secure hash</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm">Creating immutable audit trail and backup copies</span>
                      </div>
                    </div>
                  </div>
                )}

                <Button 
                  className="w-full" 
                  onClick={handleVaultDocument}
                  disabled={!selectedDocument || isVaulting}
                >
                  {isVaulting ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Vaulting...
                    </>
                  ) : (
                    <>
                      <Archive className="w-4 h-4 mr-2" />
                      Vault This
                    </>
                  )}
                </Button>
                
                {/* Agentic Explanation */}
                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Enterprise Security Protocol</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Our AI automatically selects optimal encryption algorithms and backup strategies 
                    based on document sensitivity, jurisdiction requirements, and retention policies.
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full mb-2">
                    <Download className="w-4 h-4 mr-2" />
                    Export Audit Trail
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Search className="w-4 h-4 mr-2" />
                    Search Vault
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Vaulted Documents */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Secure Document Vault
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vaultedDocuments.map(doc => (
                    <div key={doc.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span>{doc.type}</span>
                              <span>•</span>
                              <span>{doc.size}</span>
                              <span>•</span>
                              <span>Vaulted {doc.vaultDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className="status-success">
                            <Lock className="w-3 h-3 mr-1" />
                            Secured
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Versions:</span>
                          <span className="font-medium">{doc.versions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Encryption:</span>
                          <span className="font-medium">{doc.encryption}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ZK Proof:</span>
                          <Badge variant="secondary" className="text-xs">Generated</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Hash:</span>
                          <span className="font-mono text-xs">{doc.hash}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <History className="w-3 h-3 mr-1" />
                            Version History
                          </Button>
                          <Button size="sm" variant="outline">
                            <GitBranch className="w-3 h-3 mr-1" />
                            Compare
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          <Button size="sm">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline View */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Document Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">Series A SAFT Agreement - Vaulted</span>
                        <span className="text-sm text-muted-foreground">Jan 15, 2024</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Final version secured with AES-256 encryption and ZK proof generated
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">Privacy Policy v2.0 - Updated</span>
                        <span className="text-sm text-muted-foreground">Jan 12, 2024</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        GDPR compliance updates applied and document re-vaulted
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">Token Distribution Agreement - Review</span>
                        <span className="text-sm text-muted-foreground">Jan 08, 2024</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Legal review completed, awaiting final approval for vaulting
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Vault Security Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span className="font-medium">Encryption Status</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      All documents secured with AES-256 encryption
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span className="font-medium">Backup Status</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Redundant backups across multiple secure locations
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span className="font-medium">Access Control</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Multi-factor authentication and role-based access
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-warning" />
                      <span className="font-medium">Audit Trail</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Complete audit log of all access and modifications
                    </p>
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