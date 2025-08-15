// @new - Shared subnav tabs component for Launch Path
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface SubnavTabsProps {
  className?: string;
}

export function SubnavTabs({ className }: SubnavTabsProps) {
  const location = useLocation();
  
  const tabs = [
    { id: 'idea-fit', label: 'Idea-Stage Fit', path: '/launch-path/idea-fit' },
    { id: 'post-incorp', label: 'Post-Incorporation', path: '/launch-path/post-incorp' },
    { id: 'redline', label: 'Redlining Agent', path: '/launch-path/redline' },
    { id: 'doc-studio', label: 'Doc Studio', path: '/launch-path/doc-studio' }
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