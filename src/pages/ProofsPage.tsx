import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Share2, Clock, FileText, Building2, Zap } from "lucide-react";

export default function ProofsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Proofs – Quentlex";
  }, []);

  const proofActions = [
    {
      id: 'self-snapshot',
      title: 'Self Snapshot',
      description: 'AI‑completed snapshot from your latest Launch Path state.',
      icon: Zap,
      badge: 'ZK‑Verified',
      badgeVariant: 'secondary' as const,
      action: 'Generate Snapshot',
      route: '/proofs/self-snapshot',
      available: true
    },
    {
      id: 'expert-snapshot', 
      title: 'Expert Snapshot',
      description: 'Lawyer sign‑off for investor‑ready confidence.',
      icon: Shield,
      badge: 'ZK‑Verified',
      badgeVariant: 'secondary' as const,
      action: 'Request Review',
      route: '/proofs/expert-snapshot',
      available: true
    },
    {
      id: 'company-badge',
      title: 'Company Badge', 
      description: 'Mint a whole‑company badge using your latest company risk score.',
      icon: Building2,
      badge: 'Ready',
      badgeVariant: 'default' as const,
      action: 'Generate Company Badge',
      route: '/proofs/company-badge',
      available: true
    },
    {
      id: 'document-risk',
      title: 'Document Risk Score',
      description: 'Upload a policy or contract, assess risk, and attach to a snapshot.',
      icon: FileText,
      badge: 'ZK‑Ready',
      badgeVariant: 'secondary' as const,
      action: 'Open Document Risk',
      route: '/proofs/document-risk',
      available: true
    },
    {
      id: 'share-hub',
      title: 'Share & Verify',
      description: 'Share badges, access controls, and verification history.',
      icon: Share2,
      badge: 'Live',
      badgeVariant: 'outline' as const,
      action: 'Open Share Hub',
      route: '/proofs/share',
      available: true
    },
    {
      id: 'timeline',
      title: 'Timeline View',
      description: 'View snapshots over time for the whole company.',
      icon: Clock,
      badge: 'Analytics',
      badgeVariant: 'outline' as const,
      action: 'Open Timeline',
      route: '/proofs/timeline',
      available: true
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12 px-6 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Proofs</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Turn readiness into trust signals. ZK verification workflows for compliance snapshots, 
            expert reviews, and verifiable company badges.
          </p>
        </div>
      </section>

      <section className="py-10 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            {proofActions.map((item) => {
              const IconComponent = item.icon;
              return (
                <Card key={item.id} className="enterprise-card p-6 hover-lift">
                  <CardContent className="p-0">
                    <div className="flex items-start justify-between mb-4">
                      <IconComponent className="w-6 h-6 text-primary" />
                      <Badge variant={item.badgeVariant}>
                        {item.badge}
                      </Badge>
                    </div>
                    <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <Button 
                      onClick={() => navigate(item.route)}
                      disabled={!item.available}
                      className="w-full"
                    >
                      {item.action}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
