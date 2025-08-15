// @new - ExplainPanel for showing AI reasoning in real-time
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, FileSearch, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExplainEntry {
  id: string;
  timestamp: string;
  type: 'analysis' | 'rule' | 'citation' | 'warning';
  message: string;
  details?: string;
  confidence?: number;
}

interface ExplainPanelProps {
  title?: string;
  entries: ExplainEntry[];
  isActive?: boolean;
  className?: string;
}

export function ExplainPanel({ 
  title = "AI Analysis", 
  entries, 
  isActive = false, 
  className 
}: ExplainPanelProps) {
  const [visibleEntries, setVisibleEntries] = useState<ExplainEntry[]>([]);

  useEffect(() => {
    if (!isActive) {
      setVisibleEntries(entries);
      return;
    }

    // Simulate real-time streaming
    setVisibleEntries([]);
    entries.forEach((entry, index) => {
      setTimeout(() => {
        setVisibleEntries(prev => [...prev, entry]);
      }, index * 800);
    });
  }, [entries, isActive]);

  const getIcon = (type: ExplainEntry['type']) => {
    switch (type) {
      case 'analysis':
        return <Brain className="w-4 h-4" />;
      case 'rule':
        return <Zap className="w-4 h-4" />;
      case 'citation':
        return <FileSearch className="w-4 h-4" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Brain className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: ExplainEntry['type']) => {
    switch (type) {
      case 'analysis':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'rule':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'citation':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          {title}
          {isActive && (
            <Badge variant="outline" className="ml-auto">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-1" />
              Live
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-96 overflow-y-auto">
        {visibleEntries.length === 0 && isActive && (
          <div className="text-center py-8 text-muted-foreground">
            <Brain className="w-8 h-8 mx-auto mb-2 animate-pulse" />
            <p className="text-sm">AI analysis starting...</p>
          </div>
        )}
        
        {visibleEntries.map((entry, index) => (
          <div 
            key={entry.id}
            className={cn(
              "flex gap-3 p-3 rounded-lg border transition-all duration-300",
              getTypeColor(entry.type),
              isActive && index === visibleEntries.length - 1 && "animate-fade-in"
            )}
          >
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(entry.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium leading-relaxed">
                  {entry.message}
                </p>
                {entry.confidence && (
                  <Badge variant="secondary" className="text-xs">
                    {entry.confidence}%
                  </Badge>
                )}
              </div>
              {entry.details && (
                <p className="text-xs opacity-80 mt-1 leading-relaxed">
                  {entry.details}
                </p>
              )}
              <p className="text-xs opacity-60 mt-1">
                {new Date(entry.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}