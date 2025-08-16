// @modified - App Sidebar with Steve Jobs-level design
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Rocket, 
  Users, 
  Building, 
  Shield, 
  Briefcase, 
  ChevronDown,
  ChevronRight,
  Target,
  Eye,
  Layers,
  FileSearch,
  CheckCircle,
  Crown,
  TrendingUp, 
  AlertCircle, 
  Gavel,
  Lock,
  Globe,
  Clock,
  Network,
  Award
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  useSidebar,
} from "@/components/ui/sidebar"

interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  badge?: string;
  subItems?: NavigationItem[];
}

const navigationSpaces: NavigationItem[] = [
  {
    id: "launch-path",
    label: "Launch Path",
    path: "/launch-path",
    icon: Rocket,
    description: "From idea to incorporation",
    subItems: [
      {
        id: "idea-fit",
        label: "Idea-Stage Fit",
        path: "/launch-path/idea-fit",
        icon: Target,
        description: "Jurisdiction comparison & business structure"
      },
      {
        id: "post-incorp",
        label: "Post-Incorporation",
        path: "/launch-path/post-incorp", 
        icon: Eye,
        description: "Risk analysis & compliance mapping"
      },
      {
        id: "redline",
        label: "Redlining Agent",
        path: "/launch-path/redline",
        icon: FileSearch,
        description: "AI-powered contract review"
      },
      {
        id: "doc-studio",
        label: "Doc Studio",
        path: "/launch-path/doc-studio",
        icon: Layers,
        description: "Modular document generation"
      }
    ]
  },
  {
    id: "co-review",
    label: "Co-Review",
    path: "/co-review",
    icon: Users,
    description: "Expert legal collaboration",
    subItems: [
      {
        id: "new-review",
        label: "New Review",
        path: "/co-review",
        icon: CheckCircle,
        description: "Start expert review process"
      },
      {
        id: "active-reviews",
        label: "Active Reviews",
        path: "/co-review?filter=active",
        icon: Crown,
        description: "Monitor ongoing reviews"
      }
    ]
  },
  {
    id: "command-center",
    label: "Command Center",
    path: "/command-center/dashboard",
    icon: Building,
    description: "Compliance mission control",
    badge: "NEW",
    subItems: [
      {
        id: "dashboard",
        label: "Dashboard",
        path: "/command-center/dashboard",
        icon: TrendingUp,
        description: "Company risk score & overview"
      },
      {
        id: "drift",
        label: "Regulatory Drift",
        path: "/command-center/drift",
        icon: AlertCircle,
        description: "Document obsolescence tracking"
      },
      {
        id: "filings",
        label: "Filing Planner",
        path: "/command-center/filings",
        icon: Gavel,
        description: "Deadline management & calendar"
      },
      {
        id: "vault",
        label: "Legal Vault",
        path: "/command-center/vault",
        icon: Shield,
        description: "Encrypted document management"
      }
    ]
  },
  {
    id: "proofs",
    label: "Proofs",
    path: "/proofs",
    icon: Lock,
    description: "Zero-knowledge compliance",
    subItems: [
      {
        id: "self-badge",
        label: "Self-Reviewed Badge",
        path: "/proofs/self-badge",
        icon: Eye,
        description: "Generate compliance badges from existing analysis"
      },
      {
        id: "expert-badge",
        label: "Expert-Reviewed Badge",
        path: "/proofs/expert-badge",
        icon: Crown,
        description: "Lawyer-verified compliance badges"
      },
      {
        id: "share-hub",
        label: "Share & Verify Hub",
        path: "/proofs/share",
        icon: Globe,
        description: "Secure badge sharing and verification"
      },
      {
        id: "timeline",
        label: "Timeline View",
        path: "/proofs/timeline",
        icon: Clock,
        description: "Compliance history and badge evolution"
      }
    ]
  },
  {
    id: "deal-desk",
    label: "Deal Desk",
    path: "/deal-desk",
    icon: Briefcase,
    description: "Investor negotiations",
    subItems: [
      {
        id: "negotiator",
        label: "Negotiation Agent",
        path: "/deal-desk/negotiator",
        icon: Network,
        description: "AI-powered term sheet analysis"
      },
      {
        id: "investor-room",
        label: "Investor Room",
        path: "/deal-desk/investor-room",
        icon: Award,
        description: "Secure due diligence sharing"
      }
    ]
  }
];

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const [expandedSpaces, setExpandedSpaces] = useState<string[]>([])
  
  const isExpanded = state === "expanded"

  const toggleSpace = (spaceId: string) => {
    setExpandedSpaces(prev => 
      prev.includes(spaceId) 
        ? prev.filter(id => id !== spaceId)
        : [...prev, spaceId]
    );
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isSpaceActive = (space: NavigationItem) => {
    if (isActive(space.path)) return true;
    return space.subItems?.some(item => isActive(item.path)) || false;
  };

  const shouldExpand = (space: NavigationItem) => {
    return expandedSpaces.includes(space.id) || isSpaceActive(space);
  };

  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className="data-[state=closed]:w-0 data-[state=open]:w-72"
    >
      <SidebarContent className="h-screen bg-background border-r flex flex-col">
        {/* Header */}
        {isExpanded && (
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <img 
                  src="/lovable-uploads/3b2c28bb-cdb5-4243-9c10-4535c65f4ce6.png" 
                  alt="Quentlex Logo" 
                  className="w-8 h-8"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Quentlex</h2>
                <p className="text-xs text-muted-foreground">Legal Oracle Platform</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Spaces */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {navigationSpaces.map((space) => {
            const isSpaceExpanded = shouldExpand(space);
            const SpaceIcon = space.icon;
            
            return (
              <div key={space.id} className="space-y-1">
                {/* Main Space Item */}
                <div className={cn(
                  "group relative rounded-lg transition-all duration-200",
                  isSpaceActive(space) && "bg-primary/10"
                )}>
                  <div className="flex items-center">
                    <Link
                      to={space.path}
                      className={cn(
                        "flex-1 flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors",
                        isActive(space.path) && "bg-primary/20 text-primary font-medium"
                      )}
                    >
                      <SpaceIcon className={cn(
                        "w-5 h-5 transition-colors",
                        isActive(space.path) ? "text-primary" : "text-muted-foreground"
                      )} />
                      {isExpanded && (
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm">{space.label}</span>
                            {space.badge && (
                              <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                {space.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{space.description}</p>
                        </div>
                      )}
                    </Link>
                    
                    {/* Expand/Collapse Button */}
                    {space.subItems && isExpanded && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-8 h-8 p-0 mr-2"
                        onClick={() => toggleSpace(space.id)}
                      >
                        {isSpaceExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                {/* Sub Items */}
                {space.subItems && isSpaceExpanded && isExpanded && (
                  <div className="ml-8 space-y-1 border-l border-border pl-4">
                    {space.subItems.map((subItem) => {
                      const SubIcon = subItem.icon;
                      
                      return (
                        <Link
                          key={subItem.id}
                          to={subItem.path}
                          className={cn(
                            "flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50 transition-colors text-sm",
                            isActive(subItem.path) && "bg-primary/20 text-primary font-medium"
                          )}
                        >
                          <SubIcon className={cn(
                            "w-4 h-4 transition-colors",
                            isActive(subItem.path) ? "text-primary" : "text-muted-foreground"
                          )} />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">{subItem.label}</div>
                            <p className="text-xs text-muted-foreground">{subItem.description}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {isExpanded && (
          <div className="p-4 border-t">
            <div className="bg-primary/5 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Pilot Mode</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All workflows simulated for demonstration. Real TEE/ZK coming Q1 2025.
              </p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  )
}