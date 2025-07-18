import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Globe, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface Jurisdiction {
  id: string;
  name: string;
  fullName: string;
  flag: string;
  description: string;
  color: string;
}

const jurisdictions: Jurisdiction[] = [
  {
    id: 'eu-mica',
    name: 'EU MiCA',
    fullName: 'European Union Markets in Crypto-Assets',
    flag: '🇪🇺',
    description: 'Comprehensive crypto asset regulation framework',
    color: 'bg-blue-500'
  },
  {
    id: 'us-sec',
    name: 'US SEC',
    fullName: 'United States Securities and Exchange Commission',
    flag: '🇺🇸',
    description: 'Federal securities law and regulation enforcement',
    color: 'bg-red-500'
  },
  {
    id: 'uae-vara',
    name: 'UAE VARA',
    fullName: 'UAE Virtual Asset Regulatory Authority',
    flag: '🇦🇪',
    description: 'Virtual asset regulation in Dubai and Abu Dhabi',
    color: 'bg-green-500'
  },
  {
    id: 'sg-mas',
    name: 'Singapore MAS',
    fullName: 'Monetary Authority of Singapore',
    flag: '🇸🇬',
    description: 'Digital payment token and services regulation',
    color: 'bg-purple-500'
  },
  {
    id: 'jp-fsa',
    name: 'Japan FSA',
    fullName: 'Japan Financial Services Agency',
    flag: '🇯🇵',
    description: 'Cryptocurrency and digital asset oversight',
    color: 'bg-orange-500'
  },
  {
    id: 'uk-fca',
    name: 'UK FCA',
    fullName: 'United Kingdom Financial Conduct Authority',
    flag: '🇬🇧',
    description: 'Cryptoasset regulation and AML requirements',
    color: 'bg-indigo-500'
  }
];

export default function CLMJurisdictionPage() {
  const navigate = useNavigate();
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>([]);

  const toggleJurisdiction = (jurisdictionId: string) => {
    setSelectedJurisdictions(prev => 
      prev.includes(jurisdictionId)
        ? prev.filter(id => id !== jurisdictionId)
        : [...prev, jurisdictionId]
    );
  };

  const proceedToAnalysis = () => {
    if (selectedJurisdictions.length > 0) {
      navigate('/clm/analysis', { 
        state: { selectedJurisdictions } 
      });
    }
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Select Jurisdictions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the regulatory frameworks you need compliance analysis for. Our AI will analyze your contracts against these specific jurisdictions.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-success">Upload Complete</span>
            </div>
            <div className="w-12 h-0.5 bg-primary"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <span className="text-sm font-medium text-primary">Select Jurisdictions</span>
            </div>
            <div className="w-12 h-0.5 bg-muted"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <span className="text-muted-foreground text-sm font-bold">3</span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">AI Analysis</span>
            </div>
          </div>
        </div>

        {/* Selection Summary */}
        {selectedJurisdictions.length > 0 && (
          <Card className="enterprise-card mb-8">
            <CardHeader>
              <CardTitle>Selected Jurisdictions ({selectedJurisdictions.length})</CardTitle>
              <CardDescription>
                Your contracts will be analyzed against these regulatory frameworks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedJurisdictions.map(id => {
                  const jurisdiction = jurisdictions.find(j => j.id === id);
                  return jurisdiction ? (
                    <Badge key={id} className="px-3 py-1">
                      {jurisdiction.flag} {jurisdiction.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Jurisdiction Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {jurisdictions.map((jurisdiction) => (
            <Card 
              key={jurisdiction.id}
              className={`enterprise-card cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedJurisdictions.includes(jurisdiction.id) 
                  ? 'ring-2 ring-primary bg-primary/5' 
                  : 'hover:border-primary/50'
              }`}
              onClick={() => toggleJurisdiction(jurisdiction.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${jurisdiction.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                      {jurisdiction.flag}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{jurisdiction.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{jurisdiction.fullName}</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={selectedJurisdictions.includes(jurisdiction.id)}
                    onChange={() => toggleJurisdiction(jurisdiction.id)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {jurisdiction.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate('/clm/upload')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Upload
          </Button>
          <Button 
            onClick={proceedToAnalysis}
            disabled={selectedJurisdictions.length === 0}
            className="min-w-[200px]"
          >
            Start AI Analysis
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Help Text */}
        {selectedJurisdictions.length === 0 && (
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Select at least one jurisdiction to proceed with the analysis
            </p>
          </div>
        )}
      </div>
    </div>
  );
}