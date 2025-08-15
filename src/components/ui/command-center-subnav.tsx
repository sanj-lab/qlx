// @new - Command Center specific subnav tabs
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface CommandCenterSubnavProps {
  className?: string;
}

export function CommandCenterSubnav({ className }: CommandCenterSubnavProps) {
  const location = useLocation();
  
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', path: '/command-center/dashboard' },
    { id: 'drift', label: 'Regulatory Drift', path: '/command-center/drift' },
    { id: 'filings', label: 'Filing Planner', path: '/command-center/filings' },
    { id: 'vault', label: 'Legal Vault', path: '/command-center/vault' }
  ];

  const currentTab = tabs.find(tab => location.pathname === tab.path)?.id || '';

  return (
    <Tabs value={currentTab} className={cn("w-full", className)}>
      <TabsList className="grid w-full grid-cols-4">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} asChild>
            <Link to={tab.path} className="text-xs">
              {tab.label}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}