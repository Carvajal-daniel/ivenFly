// src/components/admin/AppSidebar.tsx (Otimização de Tamanho)

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Settings,
  Users,
  FileText,
  TrendingUp,
  BriefcaseBusiness,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Cadastrar empresa", url: "/dashboard/business", icon: BriefcaseBusiness },
  { title: "Insights", url: "/dashboard/insights", icon: TrendingUp },
  { title: "Reports", url: "/dashboard/reports", icon: FileText },
  { title: "Users", url: "/dashboard/users", icon: Users },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar 
      collapsible="icon" 
      className={`
        border-r border-slate-200/60 dark:border-slate-800/60 
        bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
      `}
    >
      <SidebarContent>
        <SidebarGroup>
          {/* Logo Section - Ajustamos o padding para ser compacto */}
          <div className="px-2 py-4 mb-0"> 
            {!isCollapsed ? (
              // CONTEÚDO EXPANDIDO (Mantido como estava)
              <div className="flex items-center gap-3 group px-2"> 
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  <Image 
                    src="/assets/logo2.png" 
                    className="relative h-18 w-16 object-contain drop-shadow-2xl"  
                    alt="Logo" 
                    width={100} 
                    height={100} 
                  />
                </div>
                <span className="text-2xl -ml-4 font-bold text-white">
                  Uplys
                </span>
              </div>
            ) : (
              // ⭐️ CONTEÚDO COLAPSADO: Aumentando o tamanho da imagem para h-12 w-12 ⭐️
              <div className="relative group flex justify-center w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <Image 
                  src="/assets/logo2.png" 
                  className="relative h-12 w-12 object-cover  drop-shadow-xl" 
                  alt="Logo" 
                  width={48} 
                  height={48} 
                />
              </div>
            )}
          </div>

          {/* Menu Items */}
          <SidebarGroupContent >
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => {
                const isActive =
                  item.url === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(item.url) && item.url !== "/dashboard";

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link
                        href={item.url}
                        className={`
                          group relative flex items-center gap-3 rounded-xl px-3 py-3
                          transition-all duration-300 ease-out overflow-hidden
                          ${
                            isActive
                              ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white shadow-lg shadow-blue-500/20"
                              : "hover:bg-slate-800/50 text-slate-400 hover:text-slate-200"
                          }
                        `}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse" />
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-r-full shadow-lg shadow-blue-500/50" />
                          </>
                        )}
                        
                        {/* Icon with glow effect */}
                        <div className="relative z-10">
                          <item.icon 
                            className={`
                              h-5 w-5 transition-all duration-300
                              ${isActive 
                                ? "text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] scale-110" 
                                : "group-hover:text-blue-300 group-hover:scale-110"
                              }
                            `}
                          />
                        </div>
                        
                        {/* Texto do menu - renderizado condicionalmente */}
                        {!isCollapsed && (
                          <span className={`
                            relative z-10 font-medium transition-all duration-300 whitespace-nowrap
                            ${isActive ? "text-white" : ""}
                          `}>
                            {item.title}
                          </span>
                        )}

                        {/* Hover glow effect */}
                        {!isActive && (
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom decoration */}
        <div className="mt-auto p-4">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </div>
      </SidebarContent>
    </Sidebar>
  );
}