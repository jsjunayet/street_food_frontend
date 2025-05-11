"use client";
import { Badge } from "@/components/ui/badge";
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
import { Bell, Download, HelpCircle, LogOut, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const AdminHeader = () => {
  const pathname = usePathname();
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
              className="text-white hover:bg-slate-600 relative"
            >
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="py-2">
                <div>
                  <p className="font-medium">New post submitted</p>
                  <p className="text-sm text-muted-foreground">
                    The Art of Perfect Pasta requires approval
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2">
                <div>
                  <p className="font-medium">Comment flagged</p>
                  <p className="text-sm text-muted-foreground">
                    A comment on Summer Cocktails was reported
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2">
                <div>
                  <p className="font-medium">New user registered</p>
                  <p className="text-sm text-muted-foreground">
                    Emma Wilson joined as premium user
                  </p>
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-slate-600"
        >
          <HelpCircle className="h-5 w-5" />
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
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="h-4 w-4 mr-2" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
