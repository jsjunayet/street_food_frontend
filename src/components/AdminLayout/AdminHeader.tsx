"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthService";
import { Download, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const AdminHeader = () => {
  const pathname = usePathname();
  const { setUser } = useUser();
  const router = useRouter();
  const getPageTitle = () => {
    switch (pathname) {
      case "/":
        return "Dashboard";
      case "/posts":
        return "Posts Approval";
      case "/comments":
        return "Comments";
      case "/categories":
        return "Categories";
      case "/users":
        return "Users";
      case "/analytics":
        return "Analytics";
      default:
        return "Dashboard";
    }
  };
  const handleLogout = async () => {
    logout();
    setUser(null);
    router.push("/");
  };

  return (
    <header className="border-b h-16 bg-[#FF6b35]/80 text-white px-6 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-white hover:bg-slate-600" />
        <h1 className="text-xl font-medium hidden md:block">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-slate-600"
        >
          <Download className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-slate-600"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"profile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                variant="ghost"
                className=" w-full"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span>Log out</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
