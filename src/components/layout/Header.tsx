import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Shield, FileText, Scale, Database, Cpu, Settings, LogOut, User, Bell, AlertTriangle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { user, login, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [secureMode, setSecureMode] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (method: 'wallet' | 'email') => {
    // Mock login
    login({
      id: '1',
      name: 'Legal Expert',
      email: 'expert@company.com',
      avatar: 'LE'
    });
    setShowLoginModal(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left side - Logo and Sidebar trigger */}
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="h-8 w-8" />
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Quentlex</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-medium">
                  Products
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuItem asChild>
                  <Link to="/launch-path" className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <div>
                      <div className="font-medium">Launch Path</div>
                      <div className="text-sm text-muted-foreground">From idea to incorporation</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/command-center/dashboard" className="flex items-center space-x-2">
                    <Database className="w-4 h-4" />
                    <div>
                      <div className="font-medium">Command Center</div>
                      <div className="text-sm text-muted-foreground">Compliance mission control</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/co-review" className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <div>
                      <div className="font-medium">Co-Review</div>
                      <div className="text-sm text-muted-foreground">Expert legal collaboration</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/proofs" className="flex items-center space-x-2">
                    <Scale className="w-4 h-4" />
                    <div>
                      <div className="font-medium">Proofs</div>
                      <div className="text-sm text-muted-foreground">Zero-knowledge compliance</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/deal-desk" className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4" />
                    <div>
                      <div className="font-medium">Deal Desk</div>
                      <div className="text-sm text-muted-foreground">Investor negotiations</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-medium">
                  Coming Soon
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuItem disabled>
                  <Database className="w-4 h-4 mr-2" />
                  <div>
                    <div className="font-medium text-muted-foreground">Legal DAO Registry</div>
                    <div className="text-sm text-muted-foreground">Q1 2026</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <Cpu className="w-4 h-4 mr-2" />
                  <div>
                    <div className="font-medium text-muted-foreground">Token Policy Engine</div>
                    <div className="text-sm text-muted-foreground">Q4 2025</div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <Settings className="w-4 h-4 mr-2" />
                  <div>
                    <div className="font-medium text-muted-foreground">Custom Compliance API</div>
                    <div className="text-sm text-muted-foreground">Q2 2026</div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* User Avatar / Login */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            {user && (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative h-10 w-10 rounded-full"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  </span>
                </Button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-background border rounded-lg shadow-lg p-4 z-50">
                    <h4 className="font-semibold mb-3">Legal Alerts</h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      <div className="p-3 bg-destructive/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="w-4 h-4 text-destructive" />
                          <span className="font-medium text-sm">MiCA Compliance Update</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          New requirements effective July 15, 2024 - Review your whitepapers
                        </p>
                        <span className="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                      <div className="p-3 bg-warning/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className="w-4 h-4 text-warning" />
                          <span className="font-medium text-sm">Contract Review Due</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Series A term sheet requires legal review by EOD
                        </p>
                        <span className="text-xs text-muted-foreground">4 hours ago</span>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Shield className="w-4 h-4 text-primary" />
                          <span className="font-medium text-sm">TEE Analysis Complete</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Your compliance proof has been generated successfully
                        </p>
                        <span className="text-xs text-muted-foreground">1 day ago</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/alerting')}>
                        View All Alerts
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="secure-mode" className="text-sm font-medium cursor-pointer">
                        Secure Mode (TEE)
                      </label>
                      <Switch
                        id="secure-mode"
                        checked={secureMode}
                        onCheckedChange={setSecureMode}
                      />
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/command-center/dashboard')}>
                    <Database className="mr-2 h-4 w-4" />
                    Command Center
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <User className="mr-2 h-4 w-4" />
                    Enterprise Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/organization-settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Organization Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => navigate('/auth')} className="h-10">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Access Quentlex</DialogTitle>
            <DialogDescription>
              Connect your wallet or sign in with email to access advanced features.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button
              onClick={() => handleLogin('wallet')}
              className="w-full"
              variant="outline"
            >
              <Shield className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
            <Button
              onClick={() => handleLogin('email')}
              className="w-full"
            >
              <User className="w-4 h-4 mr-2" />
              Sign in with Email
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}