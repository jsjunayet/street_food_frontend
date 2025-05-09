"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BarChart2,
  CheckCircle,
  Grid,
  Home,
  MessageSquare,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AdminSidebar = () => {
  const router = useRouter();

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <Home className="h-5 w-5" />,
    },
    {
      title: "Posts Approval",
      path: "/dashboard/postApproval",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      title: "Comments",
      path: "/dashboard/comments",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Categories",
      path: "/dashboard/categories",
      icon: <Grid className="h-5 w-5" />,
    },
    {
      title: "Users",
      path: "/dashboard/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      path: "/dashboard/analytics",
      icon: <BarChart2 className="h-5 w-5" />,
    },
  ];

  return (
    <Sidebar>
      <div className="p-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-foodie-green flex items-center justify-center">
          <span className="text-white font-bold">F</span>
        </div>
        <h1 className="text-xl font-bold">Foodie Admin</h1>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    className={isActive(item.path) ? "bg-sidebar-accent" : ""}
                    asChild
                  >
                    <Link href={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="mt-auto p-4 border-t">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-300"></div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@foodie.com</p>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default AdminSidebar;
