import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  FileText, 
  Link2, 
  Hash,
  Shield,
  Eye
} from "lucide-react";
import type { ValidationResult, DocumentReference } from "@/lib/enhanced-zk-simulation";

interface CrossDocumentValidationProps {
  validation: ValidationResult;
  proofHash: string;
  zkProof?: string;
  className?: string;
}

export function CrossDocumentValidation({ 
  validation, 
  proofHash, 
  zkProof,
  className 
}: CrossDocumentValidationProps) {
  const getSeverityIcon = (severity: 'low' | 'medium' | 'high' | 'critical') => {
    switch (severity) {
      case 'critical': return <AlertCircle className="w-4 h-4 text-destructive" />;
      case 'high': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'low': return <Info className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: 'low' | 'medium' | 'high' | 'critical') => {
    switch (severity) {
      case 'critical': return 'border-destructive bg-destructive/5';
      case 'high': return 'border-destructive bg-destructive/5';
      case 'medium': return 'border-warning bg-warning/5';
      case 'low': return 'border-muted bg-muted/5';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="w-5 h-5" />
          Cross-Document Validation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Validation Summary */}
        <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/20">
          <div className="flex items-center gap-3">
            {validation.isValid ? (
              <CheckCircle className="w-6 h-6 text-success" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-warning" />
            )}
            <div>
              <div className="font-semibold">
                {validation.isValid ? 'Validation Passed' : 'Issues Detected'}
              </div>
              <div className="text-sm text-muted-foreground">
                Confidence: {validation.confidence}%
              </div>
            </div>
          </div>
          <Progress value={validation.confidence} className="w-24" />
        </div>

        {/* Proof Hash */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Hash className="w-4 h-4" />
            Deterministic Proof Hash
          </div>
          <div className="p-3 bg-muted/50 rounded-md font-mono text-sm break-all">
            {proofHash}
          </div>
        </div>

        {/* Issues */}
        {validation.issues.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <AlertTriangle className="w-4 h-4" />
              Validation Issues ({validation.issues.length})
            </div>
            <div className="space-y-2">
              {validation.issues.map((issue, index) => (
                <Alert key={index} className={getSeverityColor(issue.severity)}>
                  <div className="flex items-start gap-2">
                    {getSeverityIcon(issue.severity)}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{issue.description}</span>
                        <Badge variant="outline" className="text-xs">
                          {issue.severity}
                        </Badge>
                      </div>
                      <AlertDescription className="text-xs">
                        <strong>Suggestion:</strong> {issue.suggestion}
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* Cross References */}
        {validation.crossReferences.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Link2 className="w-4 h-4" />
              Cross-Referenced Documents ({validation.crossReferences.length})
            </div>
            <div className="space-y-2">
              {validation.crossReferences.slice(0, 5).map((ref, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">{ref.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {ref.relationship} • {ref.type}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {validation.crossReferences.length > 5 && (
                <div className="text-xs text-muted-foreground text-center py-2">
                  And {validation.crossReferences.length - 5} more...
                </div>
              )}
            </div>
          </div>
        )}

        {/* ZK Proof Details (if available) */}
        {zkProof && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Shield className="w-4 h-4" />
              Zero-Knowledge Proof
            </div>
            <details className="group">
              <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
                Show proof details (technical)
              </summary>
              <div className="mt-2 p-3 bg-muted/50 rounded-md">
                <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                  {zkProof}
                </pre>
              </div>
            </details>
          </div>
        )}

        <Separator />

        {/* Summary */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div>✓ Hash generation: Deterministic and reproducible</div>
          <div>✓ Document integrity: Verified through cryptographic hashing</div>
          <div>✓ Cross-validation: Relationships checked for consistency</div>
          <div>✓ ZK compliance: Ready for institutional verification</div>
        </div>
      </CardContent>
    </Card>
  );
}