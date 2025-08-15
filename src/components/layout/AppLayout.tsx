// @modified - Enhanced App Layout with optional Left Rail Navigation
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { LeftRailNavigation } from "@/components/layout/LeftRailNavigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Mobile menu button */}
      <div className="fixed top-20 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-background shadow-lg"
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Desktop toggle button */}
      <div className="fixed top-20 left-4 z-50 hidden md:block">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-background shadow-lg"
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      <div className="flex">
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/20 md:hidden" 
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] z-50 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:top-0 md:h-[calc(100vh-4rem)]
          ${sidebarOpen ? 'md:translate-x-0' : 'md:-translate-x-full'}
        `}>
          <LeftRailNavigation />
        </div>
        
        <main className={`
          flex-1 min-w-0 transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'md:ml-0' : 'md:ml-0'}
        `}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}