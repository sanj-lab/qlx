// @new - App Sidebar with Command Center navigation
import { NavLink, useLocation } from "react-router-dom"
import {
  Rocket, Users, Building, Lock, Briefcase, Home, Target, Eye, Layers, 
  FileSearch, TrendingUp, AlertCircle, Gavel, Shield, Database
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
  { title: "Homepage", url: "/", icon: Home },
  { title: "Launch Path", url: "/launch-path", icon: Rocket },
  { title: "Co-Review", url: "/co-review", icon: Users },
  { title: "Command Center", url: "/command-center/dashboard", icon: Building },
  { title: "Proofs", url: "/proofs", icon: Lock },
  { title: "Deal Desk", url: "/deal-desk", icon: Briefcase },
]

const launchPathItems = [
  { title: "Idea Fit", url: "/launch-path/idea-fit", icon: Target },
  { title: "Post Incorp", url: "/launch-path/post-incorp", icon: Eye },
  { title: "Token Classification", url: "/launch-path/token-classification", icon: Layers },
  { title: "Redlining", url: "/launch-path/redline", icon: FileSearch },
  { title: "Doc Studio", url: "/launch-path/doc-studio", icon: FileSearch },
]

const commandCenterItems = [
  { title: "Dashboard", url: "/command-center/dashboard", icon: TrendingUp },
  { title: "Regulatory Drift", url: "/command-center/drift", icon: AlertCircle },
  { title: "Filing Calendar", url: "/command-center/filings", icon: Gavel },
  { title: "Legal Vault", url: "/command-center/vault", icon: Shield },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  
  const collapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path)
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted/50"

  const isLaunchPathExpanded = launchPathItems.some((item) => isActive(item.url))
  const isCommandCenterExpanded = commandCenterItems.some((item) => isActive(item.url))

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-64"}
      collapsible="offcanvas"
    >
      <SidebarContent className="bg-background border-r">
        {/* Main Spaces */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {!collapsed && "Main Spaces"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainSpaces.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={getNavCls}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Launch Path Sub-items */}
        {(!collapsed && isLaunchPathExpanded) && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
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

        {/* Command Center Sub-items */}
        {(!collapsed && isCommandCenterExpanded) && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
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

        {/* Other Spaces */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {!collapsed && "Other"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/dashboard" className={getNavCls}>
                    <Database className="h-5 w-5" />
                    {!collapsed && <span className="text-sm">Enterprise Dashboard</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
