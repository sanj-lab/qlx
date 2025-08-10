import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { ListChecks, Calendar, ArrowRight } from "lucide-react";

export default function ComplianceChecklistPage() {
  useEffect(() => {
    document.title = "Compliance Map – Quentlex";
  }, []);

  const items = [
    { title: "VASP Registration", due: "Oct 05", status: "Pending" },
    { title: "KYC/AML Policy", due: "Oct 12", status: "Draft" },
    { title: "GDPR DPA", due: "Oct 20", status: "Not started" },
    { title: "Annual Reporting Setup", due: "Nov 01", status: "Scheduled" },
  ];

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12 px-6 border-b">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Compliance Map</h1>
          <p className="text-muted-foreground max-w-2xl">Auto‑generated licenses & filings per jurisdiction. Track, plan, and ship.</p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-[1fr_320px] gap-8">
          {/* Checklist */}
          <div className="space-y-3">
            {items.map((i) => (
              <Card key={i.title} className="enterprise-card">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox />
                    <div>
                      <div className="text-sm font-medium">{i.title}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> Due {i.due}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{i.status}</Badge>
                    <Button size="sm" variant="outline">Plan</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Agent */}
          <aside className="space-y-4">
            <Card className="enterprise-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <ListChecks className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold">Agent</h3>
                </div>
                <p className="text-sm text-muted-foreground">I can generate this map from your Token ID and jurisdiction pick.</p>
                <Separator className="my-4" />
                <div className="flex gap-2">
                  <Button size="sm">Generate</Button>
                  <Button size="sm" variant="outline">Explain</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="enterprise-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-1">Fast Path</h3>
                <p className="text-sm text-muted-foreground mb-3">Bulk mark items as planned with default dates.</p>
                <Button size="sm" variant="outline" className="w-full">Auto‑Plan <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  );
}
