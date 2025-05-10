"use client";
import UserTable from "@/components/dashboard/UserTable";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { deletedUser, roleUpate } from "@/services/userService";
import { User, UserRole, UserStatus } from "@/types";
import { Search, ShieldCheck, Star, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Backend user data
const backendUsersData = {
  success: true,
  message: "All user retreive successfully",
  data: [
    // This is just a sample of the first user, the actual data will be used in the component
    {
      id: "24869117-186b-403e-9788-2df5f67ad9bf",
      email: "shiblu@example.com",
      password: "$2b$10$SOH1R6umopRvL4nNeCxaT.nNbMrANs1IFf8SNVS7heIT8B/Hea4UW",
      role: "USER",
      isPremium: false,
      image: null,
      name: null,
      createdAt: "2025-04-30T18:31:38.332Z",
      updatedAt: "2025-04-30T18:31:38.332Z",
      subscription: null,
    },
    // The rest of the data will be loaded in the component
  ],
};

// Transform backend users to our frontend format
const transformUsers = (backendUsers: any[]): User[] => {
  return backendUsers.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    isPremium: user.isPremium,
    image: user.image,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    subscription: user.subscription,
    // Default status to 'active' for now
    status: "active" as UserStatus,
    // Add any other needed fields
    posts: 0, // Placeholder since we don't have this data
  }));
};

const Users = ({ users }) => {
  console.log(users);
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
  const filteredUsers = searchQuery
    ? users.filter(
        (user) =>
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.name &&
            user.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : users;

  const premiumUsers = filteredUsers?.filter((user) => user.isPremium);
  const AdminUsers = filteredUsers?.filter((user) => user.role === "ADMIN");
  const NormalUser = filteredUsers?.filter((user) => user.role === "USER");

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
            <UserTable
              users={filteredUsers}
              onDeleteUser={handleDeleteUser}
              onUpdateRole={handleUpdateRole}
            />
          </TabsContent>

          <TabsContent value="premium" className="mt-6">
            <UserTable
              users={premiumUsers}
              onDeleteUser={handleDeleteUser}
              onUpdateRole={handleUpdateRole}
            />
          </TabsContent>
          <TabsContent value="admin" className="mt-6">
            <UserTable
              users={AdminUsers}
              onDeleteUser={handleDeleteUser}
              onUpdateRole={handleUpdateRole}
            />
          </TabsContent>
          <TabsContent value="user" className="mt-6">
            <UserTable
              users={NormalUser}
              onDeleteUser={handleDeleteUser}
              onUpdateRole={handleUpdateRole}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Users;
