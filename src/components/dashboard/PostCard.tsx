import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post } from "@/types/user";
import { Check, MoreVertical, Star, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

export type PostStatus = "pending" | "approved" | "rejected";

interface PostCardProps extends Post {
  onStatusChange?: (id: string, status: PostStatus) => void;
  onPremiumToggle?: (id: string, isPremium: boolean) => void;
  onClick?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  user,
  category,
  imageUrl,
  excerpt,
  status,
  isPremium,
  date,
  comments,
  onStatusChange,
  onPremiumToggle,
  onClick,
}) => {
  const [currentStatus, setCurrentStatus] = useState<PostStatus>(status);
  const [premium, setPremium] = useState<boolean>(isPremium);

  const handleStatusChange = (newStatus: PostStatus) => {
    setCurrentStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(id, newStatus);
    }

    const message =
      newStatus === "approved" ? "Post approved successfully" : "Post rejected";

    toast[newStatus === "approved" ? "success" : "error"](message);
  };

  const togglePremium = () => {
    const newPremiumStatus = !premium;
    setPremium(newPremiumStatus);
    if (onPremiumToggle) {
      onPremiumToggle(id, newPremiumStatus);
    }

    toast.info(
      `Post ${newPremiumStatus ? "marked as premium" : "removed from premium"}`
    );
  };

  const getStatusBadge = () => {
    switch (currentStatus) {
      case "pending":
        return (
          <Badge variant="outline" className=" bg-yellow-500/80">
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-700/80">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-700/70">
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-video  relative">
        <div className="h-72">
          <Image
            width={500}
            height={500}
            src={imageUrl || ""}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-2 right-2 flex gap-2">
          {getStatusBadge()}
          {premium && (
            <Badge variant="outline" className=" bg-yellow-400/80">
              <Star className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex justify-between">
            <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusChange("approved");
                }}
              >
                <Check className="mr-2 h-4 w-4" />
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusChange("rejected");
                }}
              >
                <X className="mr-2 h-4 w-4" />
                Reject
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  togglePremium();
                }}
              >
                <Star className="mr-2 h-4 w-4" />
                {premium ? "Remove Premium" : "Mark as Premium"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className=" flex justify-between items-center">
          <div className="flex items-center text-xs text-muted-foreground mb-2">
            <span>{category?.name}</span>
            <span className="mx-1">•</span>
            <span>By {user?.name}</span>
            <span className="mx-1">•</span>
            <span>{date}</span>
          </div>
          <p className="font-semibold text-sm line-clamp-1">
            comment: {comments?.length}
          </p>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
      </CardContent>
      <CardFooter
        className="p-4 pt-0 flex justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {currentStatus === "pending" && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange("rejected");
              }}
            >
              <X className="mr-1 h-4 w-4" />
              Reject
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleStatusChange("approved");
              }}
            >
              <Check className="mr-1 h-4 w-4" />
              Approve
            </Button>
          </div>
        )}
        {currentStatus !== "pending" && (
          <Button
            variant={premium ? "outline" : "default"}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              togglePremium();
            }}
          >
            <Star className="mr-1 h-4 w-4" />
            {premium ? "Remove Premium" : "Mark as Premium"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
