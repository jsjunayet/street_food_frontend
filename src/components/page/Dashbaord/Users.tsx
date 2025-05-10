"use client";
import UserTable from "@/components/dashboard/UserTable";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, UserRole, UserStatus } from "@/types";
import { Search, Star, User as UserIcon, UserX } from "lucide-react";
import { useEffect, useState } from "react";

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

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Load users from backend data
  useEffect(() => {
    // In a real app, this would be an API call
    const transformedUsers = transformUsers(backendUsersData.data);
    setUsers(transformedUsers);
  }, []);

  const handleStatusChange = (id: string, status: UserStatus) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, status } : user))
    );
  };

  const handleDeleteUser = (id: string) => {
    // In a real app, you would call an API to delete the user
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleUpdateRole = (id: string, role: UserRole) => {
    // In a real app, you would call an API to update the role
    setUsers(users.map((user) => (user.id === id ? { ...user, role } : user)));
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

  const activeUsers = filteredUsers.filter(
    (user) => !user.status || user.status === "active"
  );
  const suspendedUsers = filteredUsers.filter(
    (user) => user.status === "suspended"
  );
  const premiumUsers = filteredUsers.filter((user) => user.isPremium);

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
                {filteredUsers.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="active" className="flex items-center gap-1">
              Active
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {activeUsers.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="suspended" className="flex items-center gap-1">
              <UserX className="h-4 w-4" />
              Suspended
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {suspendedUsers.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              Premium
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {premiumUsers.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <UserTable
              users={filteredUsers}
              onStatusChange={handleStatusChange}
              onDeleteUser={handleDeleteUser}
              onUpdateRole={handleUpdateRole}
            />
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            <UserTable
              users={activeUsers}
              onStatusChange={handleStatusChange}
              onDeleteUser={handleDeleteUser}
              onUpdateRole={handleUpdateRole}
            />
          </TabsContent>

          <TabsContent value="suspended" className="mt-6">
            <UserTable
              users={suspendedUsers}
              onStatusChange={handleStatusChange}
              onDeleteUser={handleDeleteUser}
              onUpdateRole={handleUpdateRole}
            />
          </TabsContent>

          <TabsContent value="premium" className="mt-6">
            <UserTable
              users={premiumUsers}
              onStatusChange={handleStatusChange}
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
