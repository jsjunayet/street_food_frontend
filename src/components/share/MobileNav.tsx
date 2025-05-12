"use client";

import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/services/AuthService";
import { IUser } from "@/types";
import { FolderKanban, Home, ShieldCheck, Star, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function MobileNav() {
  const pathname = usePathname();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    fetchData();
  }, []);

  const routes = [
    { name: "Home", href: "/", icon: Home },
    { name: "AllPost", href: "/allpost", icon: FolderKanban },
    { name: "Premium", href: "/premium", icon: Star },
    { name: "About", href: "/about", icon: User },
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: ShieldCheck,
      role: "ADMIN", // 🔐 only for admins
    },
  ];

  const filteredRoutes = routes.filter(
    (route) => !route.role || route.role === user?.role
  );

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t z-40">
      <nav className="flex justify-around items-center h-16">
        {filteredRoutes.map((route) => {
          const isActive =
            route.href === "/"
              ? pathname === "/"
              : pathname.startsWith(route.href);

          return (
            <Link
              key={route.name}
              href={route.href}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-2 text-xs transition-colors",
                isActive
                  ? "text-orange-500/70"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <route.icon className="h-5 w-5 mb-1" />
              <span>{route.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
