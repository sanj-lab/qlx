import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, Shield, ArrowRight } from "lucide-react";

export default function BusinessIdeaRiskPage() {
  useEffect(() => {
    document.title = "Idea Risk Analysis – Quentlex";
  }, []);

  const risk = 72;

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12 px-6 border-b">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Idea Risk Analysis</h1>
          <p className="text-muted-foreground max-w-2xl">Pre‑incorporation signal. Describe your model; get a clear, explainable risk score.</p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Input + Result */}
          <div className="space-y-4">
            <Card className="enterprise-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold mb-2">Describe your idea</h2>
                    <textarea className="w-full h-28 rounded-md border bg-background p-3 text-sm" placeholder="Exchange for gaming assets with fiat on‑ramp, non‑custodial, EU + UAE." />
                    <div className="mt-3 flex gap-2">
                      <Button size="sm">Analyze Risk</Button>
                      <Button size="sm" variant="outline">Use Template</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="enterprise-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground">Risk score</div>
                    <div className="text-3xl font-bold">{risk}<span className="text-muted-foreground text-xl">/100</span></div>
                  </div>
                  <Badge variant="secondary">Simulated</Badge>
                </div>
                <div className="mt-4"><Progress value={risk} /></div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge>Custody exposure: Low</Badge>
                  <Badge>Licensing: Likely VASP (VARA)</Badge>
                  <Badge>Securities risk: Medium</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Agent */}
          <aside className="space-y-4">
            <Card className="enterprise-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-1">Agent</h3>
                <p className="text-sm text-muted-foreground">I can map risks to jurisdictions and propose mitigations.</p>
                <Separator className="my-4" />
                <div className="flex gap-2">
                  <Button size="sm">Suggest Jurisdictions</Button>
                  <Button size="sm" variant="outline">Explain</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="enterprise-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold">Next</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Move to Compliance Map with pre‑filled items.</p>
                <Button size="sm" variant="outline" className="w-full">Continue <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  );
}
