import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Calendar,
  Users,
  Settings,
  Menu,
  Search,
  Bell,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { NavLink } from "./NavLink";

interface DashboardShellProps {
  children: React.ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: "Visão Geral", path: "/dashboard" },
  { icon: BarChart3, label: "Análises", path: "/analytics" },
  { icon: Calendar, label: "Reservas", path: "/bookings" },
  { icon: Users, label: "Clientes", path: "/customers" },
  { icon: Settings, label: "Configurações", path: "/dashboard/settings" },
  { icon: Settings, label: "Cadastrar", path: "/dashboard/business" },

];

export function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 240 : 80 }}
        className="hidden lg:flex flex-col border-r border-border bg-card"
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <motion.div
            initial={false}
            animate={{ opacity: sidebarOpen ? 1 : 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            {sidebarOpen && (
              <span className="font-semibold text-lg bg-gradient-primary bg-clip-text text-transparent">
                Uplys
              </span>
            )}
          </motion.div>
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex"
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                !sidebarOpen && "rotate-180"
              )}
            />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <NavLink
                to={item.path}
                end
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground transition-all hover:bg-accent/50 hover:text-accent-foreground"
                activeClassName="bg-primary/10 text-primary font-medium shadow-card"
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            {sidebarOpen && <span>Sair</span>}
          </Button>
        </div>
      </motion.aside>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-72 bg-card border-r border-border z-50 lg:hidden flex flex-col"
            >
              <div className="flex h-16 items-center justify-between px-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <span className="text-white font-bold text-sm">U</span>
                  </div>
                  <span className="font-semibold text-lg bg-gradient-primary bg-clip-text text-transparent">
                    Uplys
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </div>

              <nav className="flex-1 space-y-1 p-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-muted-foreground transition-all hover:bg-accent/50 hover:text-accent-foreground"
                    activeClassName="bg-primary/10 text-primary font-medium shadow-card"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>

              <div className="p-4 border-t border-border">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-4 lg:px-6">
          <Button
            variant="ghost"
            size="lg"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1 flex items-center gap-2 max-w-md">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="h-9 bg-background/50 border-none focus-visible:ring-1"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="lg" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white text-xs">
                3
              </Badge>
            </Button>

            <Avatar className="h-9 w-9 border-2 border-primary/20">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-primary text-white">
                AD
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-4 lg:p-6 space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
