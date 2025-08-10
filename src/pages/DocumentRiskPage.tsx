import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { DragDropZone } from "@/components/ui/drag-drop-zone";
import { FileSearch, Shield, Link2 } from "lucide-react";

export default function DocumentRiskPage() {
  useEffect(() => {
    document.title = "Document Risk Analysis – Quentlex";
  }, []);

  const risk = 58;

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12 px-6 border-b">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Document Risk Analysis</h1>
          <p className="text-muted-foreground max-w-2xl">Assess a single document and attach it to a snapshot. This is a proof artifact.</p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Upload + Result */}
          <div className="space-y-4">
            <Card className="enterprise-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3"><FileSearch className="w-4 h-4 text-primary" /><h3 className="font-semibold">Upload Document</h3></div>
                <DragDropZone onFilesSelected={() => {}} />
                <div className="mt-3 flex gap-2">
                  <Button size="sm">Compute Risk</Button>
                  <Button size="sm" variant="outline">Explain</Button>
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
                  <Badge variant="secondary">ZK‑Ready</Badge>
                </div>
                <div className="mt-4"><Progress value={risk} /></div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge>Data handling: Medium</Badge>
                  <Badge>Jurisdictional fit: Strong</Badge>
                  <Badge>Clauses flagged: 4</Badge>
                </div>
                <Separator className="my-4" />
                <Button size="sm"><Link2 className="w-4 h-4 mr-2" />Attach to Snapshot</Button>
              </CardContent>
            </Card>
          </div>

          {/* Agent */}
          <aside className="space-y-4">
            <Card className="enterprise-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2"><Shield className="w-4 h-4 text-primary" /><h3 className="font-semibold">Agent</h3></div>
                <p className="text-sm text-muted-foreground">I link your risk analysis into your next snapshot automatically.</p>
                <Separator className="my-4" />
                <div className="flex gap-2">
                  <Button size="sm">Auto‑attach</Button>
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
