import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, Users, Award, Building, CheckCircle, Star, 
  Briefcase, Globe, Lock, Crown
} from "lucide-react";

interface TrustSignalsProps {
  variant?: "compact" | "full";
  className?: string;
}

export function TrustSignals({ variant = "compact", className }: TrustSignalsProps) {
  const stats = [
    { label: "Web3 Companies", value: "50+", icon: Building },
    { label: "Expert Lawyers", value: "25+", icon: Users },
    { label: "Jurisdictions", value: "15+", icon: Globe },
    { label: "Success Rate", value: "97%", icon: Award }
  ];

  const partners = [
    { name: "Clifford Chance", type: "Legal Partner", verified: true },
    { name: "Allen & Overy", type: "Regulatory Advisor", verified: true },
    { name: "Latham & Watkins", type: "Corporate Partner", verified: true },
    { name: "VARA", type: "Regulatory Authority", verified: true }
  ];

  const testimonials = [
    {
      quote: "Quentlex reduced our compliance timeline from 6 months to 6 weeks.",
      author: "Sarah Chen",
      role: "CEO, DeFi Protocol",
      company: "Previously funded by a16z"
    },
    {
      quote: "The ZK proofs gave investors confidence without exposing our strategy.",
      author: "Marcus Rodriguez", 
      role: "General Counsel",
      company: "Series B Web3 Infrastructure"
    },
    {
      quote: "This is the Tesla of legal compliance platforms.",
      author: "Elena Komninos",
      role: "Partner",
      company: "Tier 1 VC Firm"
    }
  ];

  if (variant === "compact") {
    return (
      <Card className={`bg-muted/30 border-0 ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-success" />
                <span className="font-medium">50+ Web3 Companies</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-warning" />
                <span className="font-medium">97% Success Rate</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Crown className="w-4 h-4" />
              <span className="text-xs">Institutional Grade</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Stats */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Trusted by Leading Web3 Companies
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Partners */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Building className="w-5 h-5 text-primary" />
            Institutional Partners
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border/50">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{partner.name}</span>
                    {partner.verified && (
                      <CheckCircle className="w-4 h-4 text-success" />
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">{partner.type}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Testimonials */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            What Leaders Say
          </h3>
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/30 border border-border/50">
                <p className="text-sm mb-3 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Badge */}
      <Card className="bg-gradient-to-r from-primary/5 to-success/5 border-primary/20">
        <CardContent className="p-6 text-center">
          <Lock className="w-12 h-12 text-primary mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Zero-Knowledge Architecture</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Enterprise-grade security with full privacy preservation. Your sensitive data never leaves your control.
          </p>
          <Badge variant="outline" className="border-primary/50">
            <Shield className="w-3 h-3 mr-1" />
            SOC 2 Type II Compliant
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}