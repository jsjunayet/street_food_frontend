import AdminHeader from "@/components/AdminLayout/AdminHeader";
import AdminSidebar from "@/components/AdminLayout/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
