import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Share2, Clock } from "lucide-react";

export default function ProofsPage() {
  useEffect(() => {
    document.title = "Proofs – Quentlex";
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12 px-6 border-b">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Proofs</h1>
          <p className="text-muted-foreground max-w-2xl">Turn readiness into trust signals. ZK verification only lives here—clean and simple.</p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-6">
          <Card className="enterprise-card p-6">
            <CardContent className="p-0">
              <h2 className="text-lg font-semibold mb-2">Self Snapshot</h2>
              <p className="text-sm text-muted-foreground mb-4">AI‑completed snapshot from your latest Launch Path state.</p>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">ZK‑Verified</Badge>
              </div>
              <Button>Generate Snapshot</Button>
            </CardContent>
          </Card>

          <Card className="enterprise-card p-6">
            <CardContent className="p-0">
              <h2 className="text-lg font-semibold mb-2">Expert Snapshot</h2>
              <p className="text-sm text-muted-foreground mb-4">Lawyer sign‑off for investor‑ready confidence.</p>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">ZK‑Verified</Badge>
              </div>
              <Button>Request Review</Button>
            </CardContent>
          </Card>

          <Card className="enterprise-card p-6">
            <CardContent className="p-0">
              <h2 className="text-lg font-semibold mb-2">Share Link</h2>
              <p className="text-sm text-muted-foreground mb-4">Share badges, access controls, and verification history.</p>
              <Button variant="outline"><Share2 className="w-4 h-4 mr-2"/>Create Link</Button>
            </CardContent>
          </Card>

          <Card className="enterprise-card p-6">
            <CardContent className="p-0">
              <h2 className="text-lg font-semibold mb-2">Timeline View</h2>
              <p className="text-sm text-muted-foreground mb-4">View snapshots over time for the whole company.</p>
              <Button variant="outline"><Clock className="w-4 h-4 mr-2"/>Open Timeline</Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
