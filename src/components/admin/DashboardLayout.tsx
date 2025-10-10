"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { ReactNode } from "react";
import { useCurrentUser } from "@/constantes/api/useCurrentUser";
import Image from "next/image";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading } = useCurrentUser();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50 dark:bg-black">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60 px-6 shadow-sm">
            <SidebarTrigger className="-ml-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors" />
            <div className="flex-1 flex justify-between items-center">
              <div className="flex flex-col items-start">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bem-vindo de volta</p>
              </div>

              {/* Área do usuário */}
              {loading ? (
                <span className="text-gray-600 dark:text-gray-400">Carregando...</span>
              ) : user ? (
                <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 transition-colors">
                  {user.avatarUrl ? (
                    <Image
                      width={32}
                      height={32}
                      src={user.avatarUrl}
                      alt={user.name || "Usuário"}
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 flex items-center justify-center text-sm font-medium text-white shadow-lg">
                      {user.name?.[0] || "U"}
                    </div>
                  )}
                  <span className="font-medium text-gray-900 dark:text-white">{user.name || "Usuário"}</span>
                </div>
              ) : (
                <span className="text-gray-600 dark:text-gray-400">Usuário não encontrado</span>
              )}
            </div>
          </header>

          <main className="flex-1 p-6 bg-gray-50 dark:bg-black">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}