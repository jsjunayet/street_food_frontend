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
import { IUser, UserRole } from "@/types";
import { ChevronDown, Edit, Star, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

interface UserTableProps {
  users: IUser[];
  onDeleteUser?: (id: string) => void;
  onUpdateRole?: (id: string, role: UserRole) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onDeleteUser,
  onUpdateRole,
}) => {
  const handleDeleteUser = (userId: string) => {
    if (onDeleteUser) {
      onDeleteUser(userId);
    }
  };

  const handleUpdateRole = (userId: string, newRole: UserRole) => {
    if (onUpdateRole) {
      onUpdateRole(userId, newRole);
    }
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    if (role === "ADMIN") return "default";
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
    <div className="rounded-md border overflow-x-auto w-full">
      <Table className="min-w-[300px]">
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
          {users?.map((user: IUser) => {
            // Determine user status based on data
            const userStatus = user.status || "active";

            return (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {user.image ? (
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          height={100}
                          width={100}
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
                            onClick={() =>
                              handleUpdateRole(user.id, "USER" as UserRole)
                            }
                          >
                            User
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateRole(user.id, "ADMIN" as UserRole)
                            }
                          >
                            Admin
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
