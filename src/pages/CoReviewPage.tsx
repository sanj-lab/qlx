import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, UserCheck, Send, FolderOpen, MessageSquare } from "lucide-react";

export default function CoReviewPage() {
  useEffect(() => {
    document.title = "Co‑Review – Quentlex";
  }, []);

  const steps = [
    { title: "Pick what to send", desc: "Documents, Compliance Map, Jurisdiction choice, Token classification.", done: true },
    { title: "Choose Counsel", desc: "Select from vetted lawyers in your jurisdictions.", done: false },
    { title: "Collaborate & Redline", desc: "Inline comments, approvals, and tracked changes.", done: false },
    { title: "Approve & Merge", desc: "Merge updates back into your workspace.", done: false },
  ];

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
                <div className="grid md:grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start"><FolderOpen className="mr-2 w-4 h-4" /> Documents</Button>
                  <Button variant="outline" className="justify-start">Compliance Map</Button>
                  <Button variant="outline" className="justify-start">Jurisdiction Choice</Button>
                  <Button variant="outline" className="justify-start">Token Classification</Button>
                </div>
                <Separator className="my-4" />
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Status: Draft</Badge>
                  <Badge variant="secondary">Reviewers: Not selected</Badge>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button><Send className="mr-2 w-4 h-4" /> Send</Button>
                  <Button variant="outline"><MessageSquare className="mr-2 w-4 h-4" /> Add Note</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-4">
            <Card className="enterprise-card">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-1">Progress</h3>
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
