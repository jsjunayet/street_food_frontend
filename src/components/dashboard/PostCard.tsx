import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, MoreVertical, Star, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

export type PostStatus = "pending" | "approved" | "rejected";

interface PostCardProps {
  id: string;
  title: string;
  author: string;
  category: string;
  imageUrl: string;
  excerpt: string;
  status: PostStatus;
  isPremium: boolean;
  date: string;
  onStatusChange?: (id: string, status: PostStatus) => void;
  onPremiumToggle?: (id: string, isPremium: boolean) => void;
  onClick?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  title,
  author,
  category,
  imageUrl,
  excerpt,
  status,
  isPremium,
  date,
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
          <Badge variant="outline" className="status-badge status-pending">
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="status-badge status-approved">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="status-badge status-rejected">
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
        <div className=" ">
          <Image
            width={500}
            height={500}
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-2 right-2 flex gap-2">
          {getStatusBadge()}
          {premium && (
            <Badge variant="outline" className="status-badge status-premium">
              <Star className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
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

        <div className="flex items-center text-xs text-muted-foreground mb-2">
          <span>{category}</span>
          <span className="mx-1">•</span>
          <span>By {author}</span>
          <span className="mx-1">•</span>
          <span>{date}</span>
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
