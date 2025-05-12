"use client";
import NotFoundProudct from "@/components/dashboard/NotFoundProudct";
import UserTable from "@/components/dashboard/UserTable";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { deletedUser, roleUpate } from "@/services/userService";
import { IUser, UserRole } from "@/types";
import { Search, ShieldCheck, Star, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface IusersProps {
  users: IUser[];
}
const Users: React.FC<IusersProps> = ({ users }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteUser = async (id: string) => {
    const res = await deletedUser(id);
    if (res.success) {
      toast.success("User deleted");
    } else {
      toast.error(`${res.data.meta.constraint}` || "Something is Wrong");
    }
  };

  const handleUpdateRole = async (id: string, role: UserRole) => {
    const res = await roleUpate(id, role);
    console.log(res, "role");
    toast.success(`User role updated to ${role}`);
  };

  // Filter users based on search query
  const filteredUsers: IUser[] = searchQuery
    ? users.filter(
        (user: IUser) =>
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.name &&
            user.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : users;

  const premiumUsers: IUser[] = filteredUsers?.filter(
    (user: IUser) => user.isPremium
  );
  const AdminUsers: IUser[] = filteredUsers?.filter(
    (user: IUser) => user.role === "ADMIN"
  );
  const NormalUser: IUser[] = filteredUsers?.filter(
    (user: IUser) => user.role === "USER"
  );

  return (
    <div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Users Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts and permissions.
          </p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-1">
              <UserIcon className="h-4 w-4" />
              All Users
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {filteredUsers?.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              Premium
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {premiumUsers?.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4" /> ADMIN
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {AdminUsers?.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="user" className="flex items-center gap-1">
              <UserIcon className="h-4 w-4" /> USER
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {NormalUser?.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {filteredUsers?.length > 0 ? (
              <UserTable
                users={filteredUsers}
                onDeleteUser={handleDeleteUser}
                onUpdateRole={handleUpdateRole}
              />
            ) : (
              <NotFoundProudct
                title="No users found"
                details="Try adjusting your search or filters."
              />
            )}
          </TabsContent>

          <TabsContent value="premium" className="mt-6">
            {premiumUsers?.length > 0 ? (
              <UserTable
                users={premiumUsers}
                onDeleteUser={handleDeleteUser}
                onUpdateRole={handleUpdateRole}
              />
            ) : (
              <NotFoundProudct
                title="No premium users"
                details="No users with premium access at the moment."
              />
            )}
          </TabsContent>

          <TabsContent value="admin" className="mt-6">
            {AdminUsers?.length > 0 ? (
              <UserTable
                users={AdminUsers}
                onDeleteUser={handleDeleteUser}
                onUpdateRole={handleUpdateRole}
              />
            ) : (
              <NotFoundProudct
                title="No admin users"
                details="No admin roles assigned yet."
              />
            )}
          </TabsContent>

          <TabsContent value="user" className="mt-6">
            {NormalUser?.length > 0 ? (
              <UserTable
                users={NormalUser}
                onDeleteUser={handleDeleteUser}
                onUpdateRole={handleUpdateRole}
              />
            ) : (
              <NotFoundProudct
                title="No regular users"
                details="Try adding more users or removing filters."
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Users;
