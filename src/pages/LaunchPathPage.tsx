import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CheckCircle2, Globe, GitBranch, ListChecks, FileText, Shield, Lock } from "lucide-react";

export default function LaunchPathPage() {
  useEffect(() => {
    document.title = "Launch Path – Quentlex";
  }, []);

  const steps = [
    { key: "jurisdiction", title: "Jurisdiction Navigator", desc: "Compare jurisdictions and select the optimal incorporation path.", icon: Globe },
    { key: "token", title: "Token ID", desc: "Classify your token with plain‑language outcomes and citations.", icon: GitBranch },
    { key: "map", title: "Compliance Map", desc: "Auto‑generated licenses & filings checklist per jurisdiction.", icon: ListChecks },
    { key: "risk", title: "Risk Lens", desc: "Unified risk score: idea‑level + document‑level in one place.", icon: Shield },
    { key: "canvas", title: "Contract Canvas", desc: "Juro‑style redlining with AI; supports smart contracts.", icon: FileText },
    { key: "vault", title: "Vault", desc: "Encrypted storage for drafts and signed versions.", icon: Lock },
    { key: "studio", title: "Doc Studio", desc: "Generate policies and contracts from clause packs.", icon: FileText },
  ];

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12 px-6 border-b">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Launch Path</h1>
          <p className="text-muted-foreground max-w-2xl">One guided flow from raw inputs to readiness. The agent keeps you moving with context, shortcuts, and explainable decisions.</p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Flow */}
          <div className="space-y-4">
            {steps.map(({ key, title, desc, icon: Icon }, idx) => (
              <Card key={key} className="enterprise-card overflow-hidden animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Step {idx + 1}</Badge>
                        {idx === 0 && <Badge className="bg-success/15 text-success">Recommended Start</Badge>}
                      </div>
                      <h2 className="mt-2 text-lg font-semibold">{title}</h2>
                      <p className="text-sm text-muted-foreground mt-1">{desc}</p>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" className="hover-lift">
                          Continue <ArrowRight className="ml-1 w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">Skip for now</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Agent + Progress */}
          <aside className="space-y-4">
            <Card className="enterprise-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-1">Progress</h3>
                <p className="text-sm text-muted-foreground mb-4">Agent tracks your journey and saves your place.</p>
                <div className="space-y-3">
                  {steps.map((s, i) => (
                    <div key={s.key} className="flex items-center gap-2">
                      <CheckCircle2 className={`${i < 2 ? "text-success" : "text-muted-foreground"} w-4 h-4`} />
                      <span className={`text-sm ${i < 2 ? "text-foreground" : "text-muted-foreground"}`}>{s.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="enterprise-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-1">Agent</h3>
                <p className="text-sm text-muted-foreground">I can pre‑fill your compliance map based on your token model and target jurisdictions.</p>
                <Separator className="my-4" />
                <div className="flex gap-2">
                  <Button size="sm">Auto‑complete</Button>
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
