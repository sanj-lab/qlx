import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Globe, Building, Users, FileText } from "lucide-react";

const jurisdictions = [
  {
    id: "eu-mica",
    name: "European Union",
    regulation: "MiCA (Markets in Crypto-Assets)",
    description: "Comprehensive crypto regulation framework",
    icon: Globe,
    complexity: "High",
    timeline: "6-12 months"
  },
  {
    id: "us-sec",
    name: "United States",
    regulation: "SEC Securities Law",
    description: "Federal securities regulations",
    icon: Building,
    complexity: "Very High",
    timeline: "12-18 months"
  },
  {
    id: "uae-vara",
    name: "UAE",
    regulation: "VARA Framework",
    description: "Virtual Asset Regulatory Authority",
    icon: Users,
    complexity: "Medium",
    timeline: "3-6 months"
  },
  {
    id: "singapore-mas",
    name: "Singapore",
    regulation: "MAS Payment Services Act",
    description: "Monetary Authority guidelines",
    icon: FileText,
    complexity: "Medium",
    timeline: "4-8 months"
  },
  {
    id: "uk-fca",
    name: "United Kingdom",
    regulation: "FCA Crypto Regulations",
    description: "Financial Conduct Authority rules",
    icon: Globe,
    complexity: "High",
    timeline: "8-12 months"
  }
];

const getComplexityColor = (complexity: string) => {
  switch (complexity) {
    case "Medium": return "bg-accent text-accent-foreground";
    case "High": return "bg-primary text-primary-foreground";
    case "Very High": return "bg-destructive text-destructive-foreground";
    default: return "bg-secondary text-secondary-foreground";
  }
};

export default function ComplianceJurisdictionPage() {
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>([]);
  const { secureMode } = useAuth();
  const navigate = useNavigate();

  const handleJurisdictionToggle = (jurisdictionId: string) => {
    setSelectedJurisdictions(prev => 
      prev.includes(jurisdictionId) 
        ? prev.filter(id => id !== jurisdictionId)
        : [...prev, jurisdictionId]
    );
  };

  const handleContinue = () => {
    if (selectedJurisdictions.length > 0) {
      navigate("/compliance/analysis");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Select Target Jurisdictions
            </h1>
            <p className="text-muted-foreground text-lg">
              Choose which regulatory frameworks to analyze your business model against
            </p>
            {secureMode && (
              <Badge variant="secondary" className="mt-2">
                🔒 Secure Mode Active
              </Badge>
            )}
          </div>

          <div className="grid gap-4 mb-8">
            {jurisdictions.map((jurisdiction) => {
              const IconComponent = jurisdiction.icon;
              const isSelected = selectedJurisdictions.includes(jurisdiction.id);
              
              return (
                <Card 
                  key={jurisdiction.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    isSelected ? 'ring-2 ring-primary bg-accent/10' : ''
                  }`}
                  onClick={() => handleJurisdictionToggle(jurisdiction.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          checked={isSelected}
                          onChange={() => {}}
                          className="mt-1"
                        />
                        <IconComponent className="h-6 w-6 text-primary" />
                        <div>
                          <CardTitle className="text-lg">{jurisdiction.name}</CardTitle>
                          <CardDescription className="text-sm font-medium text-primary">
                            {jurisdiction.regulation}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getComplexityColor(jurisdiction.complexity)}>
                          {jurisdiction.complexity}
                        </Badge>
                        <Badge variant="outline">
                          {jurisdiction.timeline}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-sm">
                      {jurisdiction.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={() => navigate("/compliance/upload")}
            >
              Back to Upload
            </Button>
            
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                {selectedJurisdictions.length} jurisdiction{selectedJurisdictions.length !== 1 ? 's' : ''} selected
              </p>
              <Button 
                onClick={handleContinue}
                disabled={selectedJurisdictions.length === 0}
                className="px-8"
              >
                Continue to Analysis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}