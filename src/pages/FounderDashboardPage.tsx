import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Shield, Activity, ListChecks, Clock, Share2, CheckCircle2 } from "lucide-react";

export default function FounderDashboardPage() {
  useEffect(() => {
    document.title = "Founder Dashboard – Quentlex";
  }, []);

  const companyRisk = 82; // Simulated score

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12 px-6 border-b">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Founder Dashboard</h1>
          <p className="text-muted-foreground max-w-2xl">Your command center: risk, status, drift, filings — one place. Generate company badge when you're ready.</p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-3 gap-6">
          {/* Company Risk */}
          <Card className="enterprise-card lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <h2 className="text-lg font-semibold">Company Risk Score</h2>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold">{companyRisk}<span className="text-muted-foreground text-2xl">/100</span></div>
                    <Badge variant="secondary">Updated just now</Badge>
                  </div>
                  <div className="mt-4">
                    <Progress value={companyRisk} />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge>Jurisdiction fit: Strong</Badge>
                    <Badge>Licenses: In progress</Badge>
                    <Badge>Docs coverage: 68%</Badge>
                    <Badge>Open issues: 3</Badge>
                  </div>
                </div>
                <div className="hidden md:block w-px self-stretch bg-border" />
                <div className="w-full md:w-64">
                  <p className="text-sm text-muted-foreground">This score aggregates your Launch Path inputs, document checks, and drift since last review.</p>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm">Improve Score</Button>
                    <Button size="sm" variant="outline">Explain</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Badge */}
          <Card className="enterprise-card">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">Company Badge</h2>
              <p className="text-sm text-muted-foreground mb-4">Generate in Proofs after your company risk score and coverage meet your target.</p>
              <Button asChild className="w-full"><Link to="/proofs"><Share2 className="w-4 h-4 mr-2"/>Open Proofs</Link></Button>
              <p className="text-xs text-muted-foreground mt-3">Includes cryptographic summary of risk score, licenses status, and last review timestamps.</p>
            </CardContent>
          </Card>

          {/* Status Tracker */}
          <Card className="enterprise-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <ListChecks className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-semibold">Status Tracker</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span className="text-sm">Jurisdiction selected</span>
                  </div>
                  <Badge variant="secondary">Done</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="text-sm">Compliance checklist</span>
                  </div>
                  <Badge>5/12</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="text-sm">Document coverage</span>
                  </div>
                  <Badge>68%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm">Next filing due</span>
                  </div>
                  <Badge variant="secondary">in 7 days</Badge>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm">Open Launch Path</Button>
                <Button size="sm" variant="outline">Fix Gaps</Button>
              </div>
            </CardContent>
          </Card>

          {/* Drift Monitor */}
          <Card className="enterprise-card lg:col-span-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-semibold">Regulatory Drift Monitor</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Real‑time drift since last legal review by document.</p>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { name: "Terms of Service", drift: 12 },
                  { name: "Privacy Policy", drift: 5 },
                  { name: "Token Sale Agreement", drift: 21 },
                ].map((d) => (
                  <div key={d.name} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{d.name}</span>
                      <Badge variant="secondary">{d.drift}%</Badge>
                    </div>
                    <div className="mt-2"><Progress value={Math.min(d.drift, 100)} /></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Filing Planner */}
          <Card className="enterprise-card lg:col-span-3">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <h2 className="text-lg font-semibold">Filing Planner</h2>
              </div>
              <Separator className="my-4" />
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "VASP Registration – Country A", due: "Sep 21", status: "Pending" },
                  { title: "Annual Reporting – Country B", due: "Oct 03", status: "Not started" },
                  { title: "GDPR DPA Update", due: "Oct 15", status: "Draft" },
                  { title: "KYC Policy Review", due: "Nov 01", status: "Scheduled" },
                ].map((f) => (
                  <div key={f.title} className="border rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">{f.title}</div>
                      <div className="text-xs text-muted-foreground">Due {f.due}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{f.status}</Badge>
                      <Button size="sm" variant="outline">Plan</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
