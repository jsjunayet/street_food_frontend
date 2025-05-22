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
import { useUser } from "@/context/UserContext";
import {
  BarChart2,
  CheckCircle,
  Disc2Icon,
  Grid,
  Home,
  MessageSquare,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const pathname = usePathname();
  const { user } = useUser();
  console.log(user, "dasdharod user");

  const isActive = (path: string) => {
    return pathname === path;
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
    {
      title: "Coupon",
      path: "/dashboard/coupon",
      icon: <Disc2Icon className="h-5 w-5" />,
    },
  ];

  return (
    <Sidebar>
      <Link href={"/"}>
        <div className="p-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#FF6b35]/50 flex items-center justify-center">
            <span className="text-white font-bold">SG</span>
          </div>
          <h1 className="text-xl text-[#FF6b35]/90 font-bold">StreetGrub</h1>
        </div>
      </Link>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    className={isActive(item.path) ? "bg-[#FF6b35]/30" : ""}
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
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default AdminSidebar;
