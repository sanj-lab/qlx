import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Globe, Scale, Shield, CheckCircle2, ArrowRight } from "lucide-react";

export default function JurisdictionSelectorPage() {
  useEffect(() => {
    document.title = "Jurisdiction Selector – Quentlex";
  }, []);

  const options = [
    { name: "UAE – VARA", score: 92, pros: ["Clear VASP regime", "Token-friendly"], cons: ["Local sponsor"] },
    { name: "EU – MiCA", score: 84, pros: ["Passporting", "Stable regulation"], cons: ["Broader obligations"] },
    { name: "US – SEC/CFTC", score: 68, pros: ["Market access"], cons: ["Unclear classification", "Enforcement risk"] },
  ];

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12 px-6 border-b">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Jurisdiction Selector</h1>
          <p className="text-muted-foreground max-w-2xl">Compare, decide, and lock your launch jurisdiction. The agent recommends and justifies the pick.</p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Comparison */}
          <div className="space-y-4">
            {options.map((opt, idx) => (
              <Card key={opt.name} className="enterprise-card animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary">Option {idx + 1}</Badge>
                        <Badge>Readiness {opt.score}/100</Badge>
                      </div>
                      <h2 className="text-lg font-semibold">{opt.name}</h2>
                      <div className="mt-3 grid sm:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium mb-1">Pros</div>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {opt.pros.map((p) => (
                              <li key={p} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-success" /> {p}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-1">Cons</div>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {opt.cons.map((c) => (
                              <li key={c} className="flex items-center gap-2"><Shield className="w-4 h-4 text-destructive" /> {c}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm">Select</Button>
                        <Button size="sm" variant="outline">Explain</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Agent */}
          <aside className="space-y-4">
            <Card className="enterprise-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-1">Agent</h3>
                <p className="text-sm text-muted-foreground">Based on your model and markets, I recommend VARA. Want me to pre‑configure filings?</p>
                <Separator className="my-4" />
                <div className="flex gap-2">
                  <Button size="sm">Auto‑select & Configure</Button>
                  <Button size="sm" variant="outline">Compare with MiCA</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="enterprise-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-1">What changes if you pick X?</h3>
                <p className="text-sm text-muted-foreground">Side‑by‑side diffs for licensing, disclosures, and reporting cadence.</p>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  );
}
