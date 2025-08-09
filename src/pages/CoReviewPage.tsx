import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, UserCheck, Send, FolderOpen, MessageSquare } from "lucide-react";

export default function CoReviewPage() {
  useEffect(() => {
    document.title = "Co‑Review – Quentlex";
  }, []);

  const [selected, setSelected] = useState({
    documents: true,
    compliance: false,
    jurisdiction: false,
    token: false,
  });
  const selectedCount = Object.values(selected).filter(Boolean).length;

  const counselOptions = [
    { id: "c1", name: "Ava Chen", region: "US/UK" },
    { id: "c2", name: "Marco Ruiz", region: "EU" },
    { id: "c3", name: "Keiko Tanaka", region: "APAC" },
  ];
  const [counsel, setCounsel] = useState<string | null>(null);

  const steps = useMemo(
    () => [
      { title: "Pick what to send", desc: "Documents, Compliance Map, Jurisdiction, Token.", done: selectedCount > 0 },
      { title: "Choose Counsel", desc: "Select from vetted lawyers in your jurisdictions.", done: !!counsel },
      { title: "Collaborate & Redline", desc: "Inline comments, approvals, tracked changes.", done: false },
      { title: "Approve & Merge", desc: "Merge updates back into your workspace.", done: false },
    ],
    [selectedCount, counsel]
  );

  const progressValue = (steps.filter((s) => s.done).length / steps.length) * 100;

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12 px-6 border-b">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Co‑Review</h1>
          <p className="text-muted-foreground max-w-2xl">Send exactly what matters to counsel. One panel. Zero back‑and‑forth. Agent keeps context for faster outcomes.</p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-[1fr_320px] gap-8">
          <div className="space-y-4">
            <Card className="enterprise-card">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-2">Send for Review</h2>

                {/* What to include */}
                <div className="grid md:grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    aria-pressed={selected.documents}
                    className={`justify-start ${selected.documents ? "border-primary bg-primary/5 text-primary" : ""}`}
                    onClick={() => setSelected((s) => ({ ...s, documents: !s.documents }))}
                  >
                    <FolderOpen className="mr-2 w-4 h-4" /> Documents
                  </Button>
                  <Button
                    variant="outline"
                    aria-pressed={selected.compliance}
                    className={`justify-start ${selected.compliance ? "border-primary bg-primary/5 text-primary" : ""}`}
                    onClick={() => setSelected((s) => ({ ...s, compliance: !s.compliance }))}
                  >
                    Compliance Map
                  </Button>
                  <Button
                    variant="outline"
                    aria-pressed={selected.jurisdiction}
                    className={`justify-start ${selected.jurisdiction ? "border-primary bg-primary/5 text-primary" : ""}`}
                    onClick={() => setSelected((s) => ({ ...s, jurisdiction: !s.jurisdiction }))}
                  >
                    Jurisdiction Choice
                  </Button>
                  <Button
                    variant="outline"
                    aria-pressed={selected.token}
                    className={`justify-start ${selected.token ? "border-primary bg-primary/5 text-primary" : ""}`}
                    onClick={() => setSelected((s) => ({ ...s, token: !s.token }))}
                  >
                    Token Classification
                  </Button>
                </div>

                <Separator className="my-4" />

                {/* Counsel selection */}
                <div>
                  <h3 className="font-medium mb-2">Choose Counsel</h3>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {counselOptions.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setCounsel(c.id)}
                        className={`text-left border rounded-lg p-3 transition-colors ${
                          counsel === c.id ? "border-primary bg-primary/5" : "hover:bg-accent"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium">{c.name}</div>
                            <div className="text-xs text-muted-foreground">{c.region}</div>
                          </div>
                          <UserCheck className={`w-4 h-4 ${counsel === c.id ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Status + actions */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Status: Draft</Badge>
                  <Badge variant="secondary">Selected: {selectedCount}</Badge>
                  <Badge variant="secondary">Counsel: {counsel ? counselOptions.find((c) => c.id === counsel)?.name : "Not selected"}</Badge>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button>
                    <Send className="mr-2 w-4 h-4" /> Send
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="mr-2 w-4 h-4" /> Add Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-4">
            <Card className="enterprise-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-1">Progress</h3>
                <div className="mb-3"><Progress value={progressValue} /></div>
                <div className="space-y-3">
                  {steps.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className={`${s.done ? "text-success" : "text-muted-foreground"} w-4 h-4`} />
                      <span className={`text-sm ${s.done ? "text-foreground" : "text-muted-foreground"}`}>{s.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="enterprise-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-1">Agent</h3>
                <p className="text-sm text-muted-foreground">I can pre‑package your context so counsel sees the legal logic and results instantly.</p>
                <div className="mt-4 flex gap-2">
                  <Button size="sm">Auto‑package</Button>
                  <Button size="sm" variant="outline">Explain</Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  );
}
