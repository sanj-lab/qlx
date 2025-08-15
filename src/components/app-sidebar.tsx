// @modified - App Sidebar with complete Proofs navigation
import { NavLink, useLocation } from "react-router-dom"
import {
  Rocket, 
  MessageSquare, 
  Command, 
  Shield, 
  Briefcase, 
  FileSearch, 
  TrendingUp, 
  AlertCircle, 
  Gavel,
  Zap,
  UserCheck,
  Building2,
  FileText,
  Share2,
  Clock
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const mainSpaces = [
  { title: "Launch Path", url: "/launch-path", icon: Rocket },
  { title: "Co-Review", url: "/co-review", icon: MessageSquare },
  { title: "Command Center", url: "/command-center", icon: Command },
  { title: "Proofs", url: "/proofs", icon: Shield },
  { title: "Deal Desk", url: "/deal-desk", icon: Briefcase },
]

const launchPathItems = [
  { title: "Idea Fit", url: "/launch-path/idea-fit", icon: FileSearch },
  { title: "Post Incorp", url: "/launch-path/post-incorp", icon: FileSearch },
  { title: "Redlining", url: "/launch-path/redline", icon: FileSearch },
  { title: "Doc Studio", url: "/launch-path/doc-studio", icon: FileSearch },
]

const commandCenterItems = [
  { title: "Dashboard", url: "/command-center/dashboard", icon: TrendingUp },
  { title: "Regulatory Drift", url: "/command-center/drift", icon: AlertCircle },
  { title: "Filing Calendar", url: "/command-center/filings", icon: Gavel },
  { title: "Legal Vault", url: "/command-center/vault", icon: Shield },
]

const proofsItems = [
  { title: "Self Snapshot", url: "/proofs/self-snapshot", icon: Zap },
  { title: "Expert Snapshot", url: "/proofs/expert-snapshot", icon: UserCheck },
  { title: "Company Badge", url: "/proofs/company-badge", icon: Building2 },
  { title: "Document Risk", url: "/proofs/document-risk", icon: FileText },
  { title: "Share & Verify", url: "/proofs/share", icon: Share2 },
  { title: "Timeline View", url: "/proofs/timeline", icon: Clock },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  
  const isExpanded = state === "expanded"

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path)
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "text-sidebar-foreground hover:bg-sidebar-accent/50"

  const isLaunchPathExpanded = launchPathItems.some((item) => isActive(item.url))
  const isCommandCenterExpanded = commandCenterItems.some((item) => isActive(item.url))
  const isProofsExpanded = currentPath.startsWith('/proofs')

  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      className="data-[state=closed]:w-0 data-[state=open]:w-64"
      style={{ 
        backgroundColor: 'hsl(var(--sidebar-background))',
        color: 'hsl(var(--sidebar-foreground))'
      }}
    >
      <SidebarContent 
        className="border-r"
        style={{ 
          backgroundColor: 'hsl(var(--sidebar-background))',
          borderColor: 'hsl(var(--sidebar-border))'
        }}
      >
        {/* Main Spaces */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wide px-3 py-2">
            Main Spaces
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainSpaces.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={getNavCls}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="text-sm">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Launch Path Sub-items */}
        {(isExpanded && isLaunchPathExpanded) && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wide px-3 py-2">
              Launch Path
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {launchPathItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="h-4 w-4 ml-2" />
                        <span className="text-sm">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Proofs Sub-menu */}
        {isExpanded && isProofsExpanded && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wide px-3 py-2">
              Proofs
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {proofsItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="h-4 w-4 ml-2" />
                        <span className="text-sm">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Command Center Sub-items */}
        {(isExpanded && isCommandCenterExpanded) && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wide px-3 py-2">
              Command Center
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {commandCenterItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="h-4 w-4 ml-2" />
                        <span className="text-sm">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  )
}