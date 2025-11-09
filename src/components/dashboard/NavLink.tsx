"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends Omit<LinkProps, "href"> {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  /**
   * se true, requer correspondência exata entre pathname e `to`
   * se false (default), considera prefix match (ex: /analytics ativa /analytics/reports)
   */
  end?: boolean;
  onClick?: () => void;
}

export function NavLink({
  to,
  children,
  className,
  activeClassName = "text-primary font-medium shadow-card bg-primary/10",
  end = false,
  onClick,
  ...linkProps
}: NavLinkProps) {
  const pathname = usePathname() ?? "/";

  const normalize = (p: string) => {
    try {
      // remove query/hash, garante barra inicial
      const u = new URL(p, typeof window !== "undefined" ? window.location.origin : "http://example.com");
      return u.pathname.replace(/\/+$/, "") || "/";
    } catch {
      return p.replace(/\/+$/, "") || "/";
    }
  };

  const current = normalize(pathname);
  const target = normalize(to);

  const isActive = end ? current === target : current === target || current.startsWith(target === "/" ? "/" : target + "/");

  return (
    <Link
      href={to}
      {...linkProps}
      className={cn(className, isActive ? activeClassName : "")}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
