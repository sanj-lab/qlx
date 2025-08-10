import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, Upload, Wand2, MessageSquare, CheckCircle2 } from "lucide-react";

export default function ContractRedliningPage() {
  useEffect(() => {
    document.title = "Contract Canvas – Quentlex";
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12 px-6 border-b">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Contract Canvas</h1>
          <p className="text-muted-foreground max-w-2xl">Founder‑friendly redlining with AI. Upload, review, and apply changes with one click.</p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-3 gap-6">
          {/* Upload */}
          <Card className="enterprise-card lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3"><Upload className="w-4 h-4 text-primary" /><h3 className="font-semibold">Upload</h3></div>
              <div className="border rounded-md p-6 text-sm text-muted-foreground">Drag & drop or browse to upload a contract or smart contract ABI.</div>
              <div className="mt-3 flex gap-2">
                <Button size="sm">Browse</Button>
                <Button size="sm" variant="outline">Templates</Button>
              </div>
            </CardContent>
          </Card>

          {/* Editor */}
          <Card className="enterprise-card lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3"><FileText className="w-4 h-4 text-primary" /><h3 className="font-semibold">Editor</h3></div>
              <div className="h-64 border rounded-md bg-background p-4 text-sm">Juro‑style editor (simulation). Clauses, tracked changes, comments appear here.</div>
              <div className="mt-3 flex gap-2">
                <Button size="sm"><Wand2 className="w-4 h-4 mr-1" />Suggest</Button>
                <Button size="sm" variant="outline"><CheckCircle2 className="w-4 h-4 mr-1" />Apply All</Button>
                <Button size="sm" variant="outline"><MessageSquare className="w-4 h-4 mr-1" />Comment</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
