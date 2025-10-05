"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { ReactNode } from "react";
import { useCurrentUser } from "@/constantes/api/dashboard";
import Image from "next/image";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading } = useCurrentUser();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
            <SidebarTrigger className="-ml-3 hover:teext-foreground cursor-pointer  " />
            <div className="flex-1 flex justify-between items-center">
               <div className="flex flex-col items-start">
              <h2 className="text-lg font-semibold">Dashboard</h2>
              <p className="text-sm text-muted-foreground">Bem-vindo de volta</p>

              </div>

              {/* Área do usuário */}
              {loading ? (
                <span>Carregando...</span>
              ) : user ? (
                <div className="flex items-center gap-3">
                  {user.avatarUrl ? (
                    <Image
                      width={32}
                      height={32}
                      src={user.avatarUrl}
                      alt={user.name || "Usuário"}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium">
                      {user.name?.[0] || "U"}
                    </div>
                  )}
                  <span className="font-medium">{user.name || "Usuário"}</span>
                </div>
              ) : (
                <span>Usuário não encontrado</span>
              )}
            </div>
          </header>

          <main className="flex-1 p-6 bg-secondary/30">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
