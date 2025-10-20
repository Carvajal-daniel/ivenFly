
"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { AppSidebar } from "@/components/admin/AppSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
     
      <div className="flex min-h-screen w-full bg-background relative"> 
        

        <AppSidebar />
        
        
        <div className="flex-1 flex flex-col min-w-0"> 
          <header className="sticky top-0 z-10 h-16 border-b border-border bg-card/80 backdrop-blur-sm flex items-center px-4 gap-4 shadow-sm">
            <SidebarTrigger className="text-white hover:bg-accent hover:text-white transition-colors">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
          </header>
          
          <main className="flex-1 overflow-auto animate-fade-in">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}