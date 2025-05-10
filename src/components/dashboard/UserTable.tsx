import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, UserRole } from "@/types";
import { ChevronDown, Edit, Star, Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface UserTableProps {
  users: User[];
  onStatusChange: (id: string, status: "active" | "suspended") => void;
  onDeleteUser?: (id: string) => void;
  onUpdateRole?: (id: string, role: UserRole) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onStatusChange,
  onDeleteUser,
  onUpdateRole,
}) => {
  const handleStatusChange = (
    userId: string,
    currentStatus: "active" | "suspended"
  ) => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    onStatusChange(userId, newStatus);

    toast(`User ${newStatus === "active" ? "activated" : "suspended"}`);
  };

  const handleDeleteUser = (userId: string) => {
    if (onDeleteUser) {
      onDeleteUser(userId);
      toast.error("User deleted");
    }
  };

  const handleUpdateRole = (userId: string, newRole: UserRole) => {
    if (onUpdateRole) {
      onUpdateRole(userId, newRole);
      toast.success(`User role updated to ${newRole}`);
    }
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    if (role === "ADMIN" || role === "admin") return "default";
    return "outline";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
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
            <TableHead>Premium</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            // Determine user status based on data
            const userStatus = user.status || "active";

            return (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {user.image ? (
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img
                          src={user.image}
                          alt={user.name || user.email}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
                        <span className="text-slate-600 text-sm">
                          {user.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-medium">
                        {user.name || "Unnamed User"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      userStatus === "active"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }
                  >
                    {userStatus}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell>
                  {user.isPremium ? (
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 flex items-center gap-1"
                    >
                      <Star className="h-3 w-3" />
                      Premium
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-slate-500">
                      Standard
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleStatusChange(
                          user.id,
                          userStatus as "active" | "suspended"
                        )
                      }
                    >
                      {userStatus === "active" ? "Suspend" : "Activate"}
                    </Button>

                    {onUpdateRole && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Role
                            <ChevronDown className="h-4 w-4 ml-1" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleUpdateRole(user.id, "USER")}
                          >
                            User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleUpdateRole(user.id, "ADMIN")}
                          >
                            Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleUpdateRole(user.id, "premium")}
                          >
                            Premium User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}

                    {onDeleteUser && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
