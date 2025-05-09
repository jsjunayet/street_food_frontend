"use client";
import UserTable from "@/components/dashboard/UserTable";
import { mockUsers } from "@/components/data/mockData";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, UserStatus } from "@/types";
import { Search } from "lucide-react";
import { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleStatusChange = (id: string, status: UserStatus) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, status } : user))
    );
  };

  const activeUsers = users.filter((user) => user.status === "active");
  const suspendedUsers = users.filter((user) => user.status === "suspended");

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
          <Input placeholder="Search users..." className="pl-9" />
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">
              All Users
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {users.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="active">
              Active
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {activeUsers.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="suspended">
              Suspended
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {suspendedUsers.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <UserTable users={users} onStatusChange={handleStatusChange} />
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            <UserTable
              users={activeUsers}
              onStatusChange={handleStatusChange}
            />
          </TabsContent>

          <TabsContent value="suspended" className="mt-6">
            <UserTable
              users={suspendedUsers}
              onStatusChange={handleStatusChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Users;
