// @new - Chat interface for homepage with RAG capabilities
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, Upload, MessageSquare, FileText, Navigation, 
  Sparkles, ArrowRight, Globe, Shield, Building
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/lib/types";

interface QuentlexChatProps {
  className?: string;
}

export function QuentlexChat({ className }: QuentlexChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      type: "assistant",
      content: "I'm Quentlex Counsel, your AI legal navigator. I can help you understand compliance requirements, navigate the platform, and answer questions based on your Legal Vault documents. How can I assist you today?",
      timestamp: new Date().toISOString(),
      actions: [
        { type: "navigate", label: "Compare Jurisdictions", target: "/launch-path/idea-fit", params: {} },
        { type: "navigate", label: "Check Compliance Status", target: "/command-center/dashboard", params: {} },
        { type: "navigate", label: "Generate Proof", target: "/proofs", params: {} }
      ]
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "What licenses do I need for UAE?",
    "Show me my compliance gaps",
    "Generate risk assessment",
    "Compare UK vs Singapore for DeFi",
    "Create investor-ready documents"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && files.length === 0) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date().toISOString(),
      attachments: files.map(f => ({
        id: Date.now().toString(),
        name: f.name,
        type: f.type.includes('pdf') ? 'pdf' : 'docx',
        size: f.size,
        hash: `sha256:${Date.now()}`,
        uploadedAt: new Date().toISOString(),
        folderId: 'temp',
        tags: [],
        isIndexed: false
      }))
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setFiles([]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        "licenses": "Based on your business model, you'll need a VARA Preliminary Approval in UAE. This typically takes 45-60 days and costs around $50,000. Would you like me to generate a compliance checklist?",
        "compliance": "I've analyzed your current status. You're 68% compliant with 3 pending items. Your biggest gap is AML/KYC procedures. Shall I take you to your Command Center dashboard?",
        "risk": "I can generate a comprehensive risk assessment. Do you want to start with idea-stage analysis or post-incorporation review?",
        "jurisdiction": "For DeFi projects, Singapore offers faster regulatory clarity (75 days) compared to UK (120 days), but UK has stronger institutional credibility. Want to see a detailed comparison?",
        "documents": "I can generate SAFTs, privacy policies, or token sale documents. Which jurisdiction and document type do you need?"
      };

      const responseKey = Object.keys(responses).find(key => 
        input.toLowerCase().includes(key)
      ) || "default";

      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "assistant",
        content: responses[responseKey] || "I understand you're asking about compliance matters. Let me help you navigate to the right section of the platform where we can address this properly.",
        timestamp: new Date().toISOString(),
        citations: files.length > 0 ? ["Analyzed uploaded documents"] : undefined,
        actions: [
          { type: "navigate", label: "Launch Path", target: "/launch-path", params: {} },
          { type: "navigate", label: "Command Center", target: "/command-center/dashboard", params: {} }
        ]
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...uploadedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Card className={cn("flex flex-col h-[600px] border-0 shadow-xl", className)}>
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Quentlex Counsel</h3>
            <p className="text-xs text-muted-foreground">AI Legal Navigator</p>
          </div>
          <Badge variant="outline" className="ml-auto text-xs">
            <div className="w-2 h-2 bg-success rounded-full mr-1 animate-pulse" />
            Live
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={cn(
              "flex",
              message.type === "user" ? "justify-end" : "justify-start"
            )}>
              <div className={cn(
                "max-w-[80%] p-3 rounded-2xl",
                message.type === "user" 
                  ? "bg-primary text-primary-foreground ml-4" 
                  : "bg-muted mr-4"
              )}>
                <p className="text-sm leading-relaxed">{message.content}</p>
                
                {/* Attachments */}
                {message.attachments && message.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.attachments.map(doc => (
                      <Badge key={doc.id} variant="secondary" className="text-xs">
                        <FileText className="w-3 h-3 mr-1" />
                        {doc.name}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Citations */}
                {message.citations && (
                  <div className="mt-2 pt-2 border-t border-current/20">
                    <p className="text-xs opacity-70">Sources: {message.citations.join(", ")}</p>
                  </div>
                )}

                {/* Actions */}
                {message.actions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.actions.map((action, index) => (
                      <Button
                        key={index}
                        size="sm"
                        variant={message.type === "user" ? "secondary" : "outline"}
                        className="h-7 text-xs"
                        onClick={() => window.location.href = action.target}
                      >
                        {action.label}
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-2xl mr-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Suggestions */}
      {messages.length === 1 && (
        <div className="p-4 border-t bg-muted/30">
          <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => setInput(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t">
        {/* File chips */}
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {files.map((file, index) => (
              <Badge key={index} variant="secondary" className="gap-1">
                <FileText className="w-3 h-3" />
                {file.name}
                <button 
                  onClick={() => removeFile(index)}
                  className="ml-1 hover:bg-destructive/20 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.docx,.txt,.csv"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4" />
          </Button>

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about compliance, jurisdiction, or say 'take me to...'"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />

          <Button onClick={handleSend} disabled={isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}