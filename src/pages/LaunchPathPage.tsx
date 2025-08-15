// @modified - Launch Path main hub page with navigation to 4 use cases
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Lightbulb, 
  Building2, 
  FileEdit, 
  FileText, 
  ArrowRight,
  Shield,
  Zap,
  Target,
  Users
} from "lucide-react";

export default function LaunchPathPage() {
  const location = useLocation();

  useEffect(() => {
    document.title = "Launch Path – Quentlex";
  }, []);

  const useCases = [
    {
      id: 'idea-fit',
      name: 'Idea-Stage Fit Analysis',
      description: 'Compare jurisdictions, classify tokens, and get business structure recommendations for your concept.',
      icon: Lightbulb,
      route: '/launch-path/idea-fit',
      features: ['Jurisdiction comparison', 'Token classification', 'Compliance checklists', 'Risk scoring', 'Structure recommendations'],
      status: 'ready',
      estimatedTime: '15-20 min'
    },
    {
      id: 'post-incorp',
      name: 'Post-Incorporation Risk Analysis',
      description: 'Generate comprehensive business risk scores and compliance maps for incorporated entities.',
      icon: Building2,
      route: '/launch-path/post-incorp',
      features: ['Token classification', 'Compliance mapping', 'Risk analysis', 'ZK badge eligibility', 'Expert review ready'],
      status: 'ready',
      estimatedTime: '10-15 min'
    },
    {
      id: 'redline',
      name: 'Redlining Agent',
      description: 'AI-powered contract review with side-by-side redlines and risk analysis.',
      icon: FileEdit,
      route: '/launch-path/redline',
      features: ['Document parsing', 'Risk flagging', 'Clause suggestions', 'Redline drafting', 'Export options'],
      status: 'ready',
      estimatedTime: '5-10 min'
    },
    {
      id: 'doc-studio',
      name: 'Doc Studio',
      description: 'Memory-aware document generation from clause packs and templates.',
      icon: FileText,
      route: '/launch-path/doc-studio',
      features: ['Template library', 'Memory integration', 'Multi-doc generation', 'Clause sources', 'Vault integration'],
      status: 'ready',
      estimatedTime: '8-12 min'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-success/10 text-success border-success/20';
      case 'beta': return 'bg-warning/10 text-warning border-warning/20';
      case 'coming-soon': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 px-6 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Launch Path</h1>
              <p className="text-muted-foreground max-w-2xl">
                Your journey from idea to compliance-ready business. Each tool focuses on a specific stage without overwhelming setup.
              </p>
            </div>
            <Badge variant="outline" className="text-xs">
              <Shield className="w-3 h-3 mr-1" />
              Simulated for pilot
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Use Cases</p>
                  <p className="text-lg font-semibold">4</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Completion</p>
                  <p className="text-lg font-semibold">12 min</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Jurisdictions</p>
                  <p className="text-lg font-semibold">15+</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Templates</p>
                  <p className="text-lg font-semibold">50+</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <Tabs value="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="workflow">Workflow</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {useCases.map((useCase) => {
                  const Icon = useCase.icon;
                  
                  return (
                    <Card key={useCase.id} className="group hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{useCase.name}</CardTitle>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getStatusColor(useCase.status)}>
                                  {useCase.status.replace('-', ' ')}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {useCase.estimatedTime}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {useCase.description}
                        </p>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Key Features:</p>
                          <div className="flex flex-wrap gap-1">
                            {useCase.features.map((feature, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2">
                          <Button asChild className="w-full group">
                            <Link to={useCase.route}>
                              Start {useCase.name}
                              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="workflow" className="space-y-6">
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle>Recommended Workflow</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Follow this sequence for optimal results, though each tool can be used independently.
                  </p>
                </CardHeader>
                
                <CardContent className="px-0 pb-0">
                  <div className="space-y-6">
                    {/* Step 1 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                        1
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">Start with Idea-Stage Fit Analysis</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Compare jurisdictions and get structure recommendations before incorporating.
                        </p>
                        <Button asChild size="sm" variant="outline">
                          <Link to="/launch-path/idea-fit">Begin Analysis</Link>
                        </Button>
                      </div>
                    </div>

                    {/* Connector */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 flex justify-center">
                        <div className="w-0.5 h-8 bg-border"></div>
                      </div>
                      <div></div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                        2
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">Post-Incorporation Risk Analysis</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          After incorporating, generate comprehensive risk scores and compliance maps.
                        </p>
                        <Button asChild size="sm" variant="outline">
                          <Link to="/launch-path/post-incorp">Analyze Risk</Link>
                        </Button>
                      </div>
                    </div>

                    {/* Connector */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 flex justify-center">
                        <div className="w-0.5 h-8 bg-border"></div>
                      </div>
                      <div></div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-semibold text-sm">
                        3
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">Generate Documents & Review Contracts</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Use Doc Studio for document generation and Redlining Agent for contract review.
                        </p>
                        <div className="flex gap-2">
                          <Button asChild size="sm" variant="outline">
                            <Link to="/launch-path/doc-studio">Doc Studio</Link>
                          </Button>
                          <Button asChild size="sm" variant="outline">
                            <Link to="/launch-path/redline">Redlining Agent</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Integration Info */}
              <Card className="p-6 bg-muted/50">
                <h4 className="font-medium mb-2">Seamless Integration</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  All Launch Path outputs integrate seamlessly with other Quentlex spaces:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Co-Review:</strong> Send any output for expert legal review
                  </div>
                  <div>
                    <strong>Command Center:</strong> Risk scores feed into your compliance dashboard
                  </div>
                  <div>
                    <strong>Proofs:</strong> Generate ZK badges from verified analyses
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
