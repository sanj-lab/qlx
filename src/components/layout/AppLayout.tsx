// @new - Enhanced App Layout with Left Rail Navigation
import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { LeftRailNavigation } from "@/components/layout/LeftRailNavigation";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <LeftRailNavigation />
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}