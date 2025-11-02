"use client";

import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/AppSidebar";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/constantes/api/useCurrentUser";

interface ProtectedDashboardLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedDashboardLayout({ children }: ProtectedDashboardLayoutProps) {
  const {  loading, isAuthenticated } = useCurrentUser();
  const [showContent, setShowContent] = useState(false);
  const router = useRouter();


  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowContent(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/auth");
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !showContent || !isAuthenticated) return <LoadingSpinner />;

  return (
    <SidebarProvider>
      <AppSidebar />
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  );
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { state, toggleSidebar } = useSidebar(); // Agora dentro do provider
  const isCollapsed = state === "collapsed";

  return (
    <div className="flex flex-col w-full min-h-screen bg-background transition-all duration-300">
      {/* Header */}
      <header className="flex bg-transparent fixed items-center justify-between h-16 border-b border-border px-4 z-40">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="lg"
            onClick={toggleSidebar}
            className="w-10 p-4 rounded-md md:-ml-3 fixed -ml-3 cursor-pointer z-10 hover:bg-accent/50 hover:scale-105 transition-all duration-200 active:scale-95"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              whileHover={{ scale: 1.1 }}
            >
              <ChevronRight className="h-8 w-8 text-foreground/80 drop-shadow-sm" />
            </motion.div>
          </Button>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 overflow-auto animate-fade-in p-6">{children}</main>
    </div>
  );
}
