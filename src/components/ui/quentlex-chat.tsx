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

    // Simulate AI response with jurisdiction-specific intelligence
    setTimeout(() => {
      const responses = {
        "licenses": "Based on your business model, you'll need a VARA Preliminary Approval in UAE. This typically takes 45-60 days and costs around $50,000. I've pre-loaded a compliance checklist into your Launch Path.",
        "compliance": "I've analyzed your current status. You're 68% compliant with 3 pending items. Your biggest gap is AML/KYC procedures - I can route you directly to Command Center for immediate action.",
        "risk": "I can generate a comprehensive risk assessment. For early-stage ventures, I recommend starting with our Idea Fit analysis, then proceeding to post-incorporation review once you've selected your jurisdiction.",
        "jurisdiction": "For DeFi projects, Singapore offers faster regulatory clarity (75 days) vs UK (120 days), but UK provides stronger institutional credibility. Based on similar Web3 companies, I recommend Singapore for speed-to-market.",
        "documents": "I can generate SAFTs, privacy policies, or token sale documents. For UAE entities, I recommend starting with our Document Studio pre-loaded with VARA-compliant templates.",
        "uae": "UAE through VARA offers the clearest regulatory framework for Web3. Timeline: 45-60 days, Cost: ~$50K, Success rate: 87%. I can auto-populate your Launch Path with UAE-specific requirements.",
        "singapore": "Singapore's VFA framework is ideal for trading protocols. Timeline: 75 days, lighter touch regulation. I can compare this directly with UAE if you'd like.",
        "fundraising": "For fundraising preparation, I recommend: 1) Complete risk analysis in Launch Path, 2) Generate ZK compliance badges in Proofs, 3) Set up investor data rooms in Deal Desk.",
        "proof": "ZK proofs let you share compliance status without exposing sensitive details. Perfect for investor calls. I can generate your first badge from existing analysis.",
        "vault": "Your Legal Vault stores all compliance documents with AI indexing. I can help you organize everything for due diligence or regulatory review."
      };

      const inputLower = input.toLowerCase();
      const responseKey = Object.keys(responses).find(key => 
        inputLower.includes(key)
      ) || "default";

      let content = responses[responseKey];
      let actions: any[] = [];

      // Smart routing based on query intent
      if (inputLower.includes("license") || inputLower.includes("uae") || inputLower.includes("vara")) {
        content = responses["uae"];
        actions = [
          { type: "navigate", label: "UAE Launch Path", target: "/launch-path/jurisdiction?preset=uae", params: {} },
          { type: "navigate", label: "Compare Jurisdictions", target: "/launch-path/idea-fit", params: {} }
        ];
      } else if (inputLower.includes("singapore") || inputLower.includes("jurisdiction")) {
        content = responses["singapore"];
        actions = [
          { type: "navigate", label: "Jurisdiction Comparison", target: "/launch-path/idea-fit", params: {} },
          { type: "navigate", label: "Singapore Path", target: "/launch-path/jurisdiction?preset=singapore", params: {} }
        ];
      } else if (inputLower.includes("compliance") || inputLower.includes("dashboard")) {
        content = responses["compliance"];
        actions = [
          { type: "navigate", label: "Command Center", target: "/command-center/dashboard", params: {} },
          { type: "navigate", label: "Risk Analysis", target: "/launch-path/post-incorp", params: {} }
        ];
      } else if (inputLower.includes("proof") || inputLower.includes("badge") || inputLower.includes("zk")) {
        content = responses["proof"];
        actions = [
          { type: "navigate", label: "Generate Badge", target: "/proofs/self-badge", params: {} },
          { type: "navigate", label: "View Proofs", target: "/proofs", params: {} }
        ];
      } else if (inputLower.includes("fundrais") || inputLower.includes("investor") || inputLower.includes("deal")) {
        content = responses["fundraising"];
        actions = [
          { type: "navigate", label: "Deal Desk", target: "/deal-desk", params: {} },
          { type: "navigate", label: "Generate Proofs", target: "/proofs/self-badge", params: {} }
        ];
      } else if (inputLower.includes("document") || inputLower.includes("contract")) {
        content = responses["documents"];
        actions = [
          { type: "navigate", label: "Document Studio", target: "/launch-path/doc-studio", params: {} },
          { type: "navigate", label: "Legal Vault", target: "/command-center/vault", params: {} }
        ];
      } else {
        content = content || "I understand you're asking about compliance. Let me analyze your query and route you to the most relevant workflow. What specific jurisdiction or compliance area interests you?";
        actions = [
          { type: "navigate", label: "Start Journey", target: "/launch-path", params: {} },
          { type: "navigate", label: "Command Center", target: "/command-center/dashboard", params: {} },
          { type: "navigate", label: "Generate Proofs", target: "/proofs", params: {} }
        ];
      }

      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "assistant",
        content,
        timestamp: new Date().toISOString(),
        citations: files.length > 0 ? ["Cross-referenced with uploaded documents", "Quentlex Legal Database"] : ["Quentlex Legal Database", "Real-time Regulatory Updates"],
        actions
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