import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { useToast } from "../hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "premium";
  status: "active" | "suspended";
  joined: string;
  posts: number;
}

interface UserTableProps {
  users: User[];
  onStatusChange: (id: string, status: "active" | "suspended") => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onStatusChange }) => {
  const { toast } = useToast();

  const handleStatusChange = (
    userId: string,
    currentStatus: "active" | "suspended"
  ) => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    onStatusChange(userId, newStatus);

    toast({
      title: `User ${newStatus === "active" ? "activated" : "suspended"}`,
      description: `The user has been ${
        newStatus === "active" ? "activated" : "suspended"
      }.`,
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Posts</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={user.role === "admin" ? "default" : "outline"}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    user.status === "active"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell>{user.joined}</TableCell>
              <TableCell>{user.posts}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange(user.id, user.status)}
                >
                  {user.status === "active" ? "Suspend" : "Activate"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
