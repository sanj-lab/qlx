import { useState } from 'react';
import { Button } from './button';
import { Textarea } from './textarea';
import { Badge } from './badge';
import { Card } from './card';
import { Brain, FileText, Plus, Edit3 } from 'lucide-react';

interface Clause {
  id: string;
  title: string;
  content: string;
  riskLevel: 'low' | 'medium' | 'high';
  suggestions?: string[];
}

interface ClauseEditorProps {
  initialClauses?: Clause[];
  onClausesChange?: (clauses: Clause[]) => void;
}

export function ClauseEditor({ initialClauses = [], onClausesChange }: ClauseEditorProps) {
  const [clauses, setClauses] = useState<Clause[]>(initialClauses.length > 0 ? initialClauses : [
    {
      id: '1',
      title: 'Termination Clause',
      content: 'Either party may terminate this agreement with 30 days written notice.',
      riskLevel: 'medium',
      suggestions: ['Consider adding specific termination conditions', 'Add force majeure provisions']
    },
    {
      id: '2',
      title: 'Indemnification',
      content: 'Company shall indemnify and hold harmless the other party from any claims.',
      riskLevel: 'high',
      suggestions: ['Limit indemnification scope', 'Add caps on liability']
    }
  ]);

  const [newClause, setNewClause] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const addClause = () => {
    if (!newClause.trim()) return;
    
    const clause: Clause = {
      id: Date.now().toString(),
      title: 'New Clause',
      content: newClause,
      riskLevel: 'low'
    };
    
    const updated = [...clauses, clause];
    setClauses(updated);
    onClausesChange?.(updated);
    setNewClause('');
    setIsAdding(false);
  };

  const updateClause = (id: string, updates: Partial<Clause>) => {
    const updated = clauses.map(clause => 
      clause.id === id ? { ...clause, ...updates } : clause
    );
    setClauses(updated);
    onClausesChange?.(updated);
  };

  const getRiskColor = (level: Clause['riskLevel']) => {
    switch (level) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Contract Clauses</h3>
          <p className="text-sm text-muted-foreground">
            Review and edit contract clauses with AI suggestions
          </p>
        </div>
        <Button onClick={() => setIsAdding(true)} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Clause
        </Button>
      </div>

      <div className="grid gap-4">
        {clauses.map((clause) => (
          <Card key={clause.id} className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={clause.title}
                  onChange={(e) => updateClause(clause.id, { title: e.target.value })}
                  className="font-medium text-sm bg-transparent border-none p-0 focus:outline-none focus:ring-1 focus:ring-primary rounded"
                />
                <Badge variant={getRiskColor(clause.riskLevel)}>
                  {clause.riskLevel} risk
                </Badge>
              </div>
              
              <Textarea
                value={clause.content}
                onChange={(e) => updateClause(clause.id, { content: e.target.value })}
                className="min-h-20 resize-none"
              />
              
              {clause.suggestions && clause.suggestions.length > 0 && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium">AI Suggestions</span>
                  </div>
                  <ul className="text-xs space-y-1">
                    {clause.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-muted-foreground">
                        • {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        ))}

        {isAdding && (
          <Card className="p-4 border-dashed">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Clause title"
                className="font-medium text-sm bg-transparent border-none p-0 focus:outline-none focus:ring-1 focus:ring-primary rounded w-full"
              />
              <Textarea
                value={newClause}
                onChange={(e) => setNewClause(e.target.value)}
                placeholder="Enter clause content..."
                className="min-h-20 resize-none"
              />
              <div className="flex gap-2">
                <Button onClick={addClause} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
                <Button onClick={() => setIsAdding(false)} variant="outline" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}