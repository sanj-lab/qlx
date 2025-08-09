import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Handshake, FolderOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function DealDeskPage() {
  useEffect(() => {
    document.title = "Deal Desk – Quentlex";
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12 px-6 border-b">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Deal Desk</h1>
          <p className="text-muted-foreground max-w-2xl">Fundraising tools for speed and clarity. Negotiate, share, and close with confidence.</p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-6">
          <Card className="enterprise-card p-6">
            <CardContent className="p-0">
              <h2 className="text-lg font-semibold mb-2">Negotiator</h2>
              <p className="text-sm text-muted-foreground mb-4">Upload a term sheet, get AI issues and edits, send to legal.</p>
              <Button asChild>
                <Link to="/negotiation-agent"><Handshake className="w-4 h-4 mr-2"/>Open Negotiator</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="enterprise-card p-6">
            <CardContent className="p-0">
              <h2 className="text-lg font-semibold mb-2">Investor Room</h2>
              <p className="text-sm text-muted-foreground mb-4">Structured folders for diligence with attached badges.</p>
              <Button asChild variant="outline">
                <Link to="/share-room"><FolderOpen className="w-4 h-4 mr-2"/>Open Room</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
