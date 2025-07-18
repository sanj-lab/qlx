import { useState } from 'react';
import { Button } from './button';
import { Textarea } from './textarea';
import { Card } from './card';
import { Badge } from './badge';
import { Brain, FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AuditResult {
  id: string;
  issue: string;
  severity: 'low' | 'medium' | 'high';
  suggestion: string;
  regulation?: string;
}

export function TypeToAudit() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AuditResult[]>([]);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults: AuditResult[] = [
        {
          id: '1',
          issue: 'Missing termination clause',
          severity: 'high',
          suggestion: 'Add specific termination conditions with notice period',
          regulation: 'Common Law Contract Principles'
        },
        {
          id: '2',
          issue: 'Vague liability limitation',
          severity: 'medium',
          suggestion: 'Specify exact liability caps and exclusions',
          regulation: 'EU Contract Law Directive'
        },
        {
          id: '3',
          issue: 'No force majeure provision',
          severity: 'low',
          suggestion: 'Consider adding force majeure clause for unforeseen events'
        }
      ];
      
      setResults(mockResults);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getSeverityIcon = (severity: AuditResult['severity']) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getSeverityVariant = (severity: AuditResult['severity']) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Live Contract Audit</h2>
        <p className="text-muted-foreground">
          Paste your contract text below for instant AI-powered legal analysis
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your contract text, clauses, or agreement here for instant analysis..."
            className="min-h-40 resize-none"
          />
          
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {text.length} characters • Supports contracts, terms, clauses, and agreements
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleAnalyze}
                disabled={!text.trim() || isAnalyzing}
                className="min-w-32"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Analyze
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/clm/upload')}
              >
                <FileText className="w-4 h-4 mr-2" />
                Upload File Instead
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {isAnalyzing && (
        <Card className="p-6">
          <div className="flex items-center justify-center space-x-3">
            <Brain className="w-5 h-5 animate-spin text-primary" />
            <div className="text-center">
              <p className="font-medium">AI Analysis in Progress</p>
              <p className="text-sm text-muted-foreground">
                Reviewing clauses against global legal standards...
              </p>
            </div>
          </div>
        </Card>
      )}

      {results.length > 0 && !isAnalyzing && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Analysis Results</h3>
            <Badge variant="outline" className="text-xs">
              {results.length} issues found
            </Badge>
          </div>
          
          {results.map((result) => (
            <Card key={result.id} className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getSeverityIcon(result.severity)}
                    <h4 className="font-medium">{result.issue}</h4>
                  </div>
                  <Badge variant={getSeverityVariant(result.severity)}>
                    {result.severity}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  {result.suggestion}
                </p>
                
                {result.regulation && (
                  <div className="bg-muted/50 rounded p-2">
                    <p className="text-xs font-medium">Reference: {result.regulation}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
          
          <div className="flex gap-2 pt-4">
            <Button onClick={() => navigate('/clm/jurisdiction')}>
              Full Jurisdiction Analysis
            </Button>
            <Button variant="outline" onClick={() => navigate('/zk-proof')}>
              Generate ZK Proof
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}