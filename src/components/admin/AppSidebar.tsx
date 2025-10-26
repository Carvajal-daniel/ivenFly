"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { LucideIcon } from "lucide-react";
import {
  Home,
  Settings,
  Users,
  FileText,
  TrendingUp,
  BriefcaseBusiness,
  LogOut,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrentUser } from "@/constantes/api/useCurrentUser";
import { ThemeToggle } from "../ThemeToggle";

// --- TIPOS ---
interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface User {
  name: string;
  email: string;
  avatar?: string;
}

// --- UTIL ---
const getUserInitials = (name: string): string =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

// --- ITENS DE MENU ---
const menuItems: MenuItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  {
    title: "Cadastrar empresa",
    url: "/dashboard/business",
    icon: BriefcaseBusiness,
  },
  { title: "Insights", url: "/dashboard/insights", icon: TrendingUp },
  { title: "Reports", url: "/dashboard/reports", icon: FileText },
  { title: "Users", url: "/dashboard/users", icon: Users },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

// --- SKELETON PERFIL ---
function UserProfileSkeleton({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div
      className={`flex items-center p-3 mb-2 mx-3 transition-all duration-300 ${
        isCollapsed ? "justify-center" : "gap-3"
      }`}
    >
      <Skeleton
        className={`${
          isCollapsed ? "h-9 w-9" : "h-10 w-10"
        } rounded-full shrink-0`}
      />
      {!isCollapsed && (
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      )}
    </div>
  );
}

// --- PERFIL DO USUÁRIO ---
interface UserProfileSectionProps {
  user: User | null;
  loading: boolean;
  isCollapsed: boolean;
}

function UserProfileSection({
  user,
  loading,
  isCollapsed,
}: UserProfileSectionProps) {
  if (loading) return <UserProfileSkeleton isCollapsed={isCollapsed} />;
  if (!user) return null;

  const initials = getUserInitials(user.name);
  const handleLogout = () => console.log("Logout clicked");
  const handleSettings = () => redirect("/dashboard/settings");

  return (
    <>

      <DropdownMenu>

        <DropdownMenuTrigger asChild>
          <button
            className={`flex items-center gap-3 p-3 mb-2  rounded-xl transition-all duration-300 hover:bg-white/10 cursor-pointer group focus:outline-none focus:ring-1 focus:ring-primary w-full ${
              isCollapsed ? "justify-center " : ""
            }`}
          >
            <Avatar className="h-10 w-10 border-2 border-purple-400 shadow-lg shrink-0">
              <AvatarFallback className="bg-purple-600 text-white font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0 flex-1 text-left ">
                <span className="font-semibold text-white truncate text-sm leading-tight">
                  {user.name}
                </span>
                <span className="text-xs text-slate-400 truncate">
                  {user.email}
                </span>
              </div>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56 text-white">
          <DropdownMenuItem onClick={handleSettings}>
            <Settings className="mr-2 h-4 w-4 text-white" /> Configurações
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-600 focus:text-red-600"
          >
            
            <LogOut className="mr-2 h-4 w-4" /> Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

// --- ITEM DE MENU ---
function MenuItemComponent({
  item,
  isActive,
  isCollapsed,
}: {
  item: MenuItem;
  isActive: boolean;
  isCollapsed: boolean;
}) {
  const { toggleSidebar, isMobile } = useSidebar(); // pegar estado mobile
  
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={item.title}>
        <Link
          href={item.url}
          onClick={() => {
            // Fecha o sidebar apenas no mobile
            if (isMobile && !isCollapsed) toggleSidebar();
          }}
          className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 ease-out overflow-hidden ${
            isActive
            ? isCollapsed
            ? "bg-none"
            : "bg-primary/10 text-primary"
            : "hover:bg-slate-800/50 text-slate-400 hover:text-slate-200"
          }`}
        >
          <item.icon
            className={`h-5 w-5 transition-all duration-300 ${
              isActive
              ? "text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] scale-110"
              : "group-hover:text-blue-300 group-hover:scale-110"
            }`}
          />
          {!isCollapsed && (
            <span
            className={`font-medium transition-all duration-300 ${
              isActive ? "text-white" : ""
            }`}
            >
              {item.title}
            </span>
          )}
        </Link>
      </SidebarMenuButton>
      
    </SidebarMenuItem>
  );
}


// --- SIDEBAR PRINCIPAL ---
export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const { user, loading } = useCurrentUser();
  const isCollapsed = state === "collapsed";

  const isItemActive = (item: MenuItem): boolean =>
    item.url === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(item.url);

  return (
    <div className="relative">
      {/* Botão flutuante sobre o sidebar */}

      <Sidebar
        collapsible="icon"
        className="  border-r border-slate-200/60 dark:border-slate-800/60 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      >
        <SidebarContent>
          <SidebarGroup>
            <UserProfileSection
              user={user}
              loading={loading}
              isCollapsed={isCollapsed}
            />
            <div className="h-px bg-white/10 mx-4 my-4" />
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2 ">
                {menuItems.map((item) => (
                  <MenuItemComponent
                  key={item.url}
                  item={item}
                  isActive={isItemActive(item)}
                  isCollapsed={isCollapsed}
                  />
                ))}
              </SidebarMenu>
                
                {

                  
                  isCollapsed ? null : (
                    <div className="px-4 mb-4 mt-20">
                  <ThemeToggle  />
                </div>
              )
            }
     
            </SidebarGroupContent>
           
          </SidebarGroup>
          <div className="mt-auto p-4">
            <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          </div>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
