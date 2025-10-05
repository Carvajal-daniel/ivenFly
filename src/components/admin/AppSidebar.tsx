"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BarChart3,
  Settings,
  Users,
  FileText,
  TrendingUp,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";

const menuItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Insights", url: "/insights", icon: TrendingUp },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Users", url: "/users", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-sidebar-border bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 py-6 mb-2">
            {!isCollapsed ? (
              <div className="flex items-center gap-2">
                <Image 
                  src="/assets/logo.png" 
                  className="h-20 w-20 -ml-3 object-contain"  
                  alt="Logo" 
                  width={100} 
                  height={100} 
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 -ml-7 to-purple-600 bg-clip-text text-transparent">
                  Uplys
                </span>
              </div>
            ) : (
              <Image 
                src="/assets/logo.png" 
                className="h-10 w-10 object-contain mx-auto"  
                alt="Logo" 
                width={40} 
                height={40} 
              />
            )}
          </SidebarGroupLabel>

          <SidebarGroupContent className="px-2">
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const isActive =
                  item.url === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.url);

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <Link
                        href={item.url}
                        className={`
                          group relative flex items-center gap-3 rounded-lg px-3 py-2.5 
                          transition-all duration-200 ease-in-out
                          ${
                            isActive
                              ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 dark:text-blue-400 font-medium shadow-sm"
                              : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                          }
                        `}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-r-full" />
                        )}
                        <item.icon 
                          className={`
                            h-5 w-5 transition-transform duration-200
                            ${isActive ? "scale-110" : "group-hover:scale-105"}
                          `}
                        />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}