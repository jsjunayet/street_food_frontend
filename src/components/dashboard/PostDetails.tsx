import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, MessageSquare, Star, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

export type Comment = {
  id: string;
  author: string;
  content: string;
  date: string;
};

export type PostDetailProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: {
    id: string;
    title: string;
    author: string;
    category: string;
    imageUrl: string;
    content?: string;
    excerpt: string;
    status: "pending" | "approved" | "rejected";
    isPremium: boolean;
    date: string;
  };
  comments: Comment[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onPremiumToggle: (id: string, isPremium: boolean) => void;
  onEditComment: (id: string, newContent: string) => void;
  onDeleteComment: (id: string) => void;
};

const PostDetail: React.FC<PostDetailProps> = ({
  open,
  onOpenChange,
  post,
  comments,
  onApprove,
  onReject,
  onPremiumToggle,
  onDeleteComment,
  onEditComment,
}) => {
  const [activeTab, setActiveTab] = useState<string>("content");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState<string>("");

  const handleApprove = () => {
    onApprove(post.id);
  };

  const handleReject = () => {
    onReject(post.id);
  };

  const handlePremiumToggle = () => {
    onPremiumToggle(post.id, !post.isPremium);
    toast.info(
      `Post ${!post.isPremium ? "marked as premium" : "removed from premium"}`
    );
  };

  const getStatusBadge = () => {
    switch (post.status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-300"
          >
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 border-green-300"
          >
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 border-red-300"
          >
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl">{post.title}</DialogTitle>
            <div className="flex gap-2">
              {getStatusBadge()}
              {post.isPremium && (
                <Badge
                  variant="outline"
                  className="bg-blue-100 text-blue-800 border-blue-300"
                >
                  <Star className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
          </div>

          <div className="flex items-center text-sm text-muted-foreground mt-2">
            <span>By {post?.author?.name}</span>
            <span className="mx-2">•</span>
            <span>{post?.category?.name}</span>
            <span className="mx-2">•</span>
            <span>{post.date}</span>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs
            defaultValue="content"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full h-full"
          >
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="comments" className="flex items-center gap-1">
                Comments
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-muted text-xs">
                  {comments.length}
                </span>
              </TabsTrigger>
            </TabsList>

            <div
              className="overflow-y-auto"
              style={{ height: "calc(100% - 45px)" }}
            >
              <TabsContent
                value="content"
                className="mt-0 p-4 border rounded-md h-full"
              >
                <div className="aspect-video mb-4">
                  <Image
                    height={500}
                    width={500}
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                <p className="text-lg font-medium mb-2">Excerpt:</p>
                <p className="mb-6">{post.excerpt}</p>

                <p className="text-lg font-medium mb-2">Full Content:</p>
                <p>
                  {post.description ||
                    "This is a placeholder for the full content of the post. In a real application, this would contain the complete article text with formatting."}
                </p>
              </TabsContent>

              <TabsContent
                value="comments"
                className="mt-0 h-[200px] overflow-y-auto space-y-4 pr-2"
              >
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <Card key={comment.id} className="border">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">
                            {comment?.user?.email}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
                        {editingCommentId === comment.id ? (
                          <div className="space-y-2">
                            <textarea
                              value={editedText}
                              onChange={(e) => setEditedText(e.target.value)}
                              className="w-full border rounded-md p-2 text-sm"
                              rows={3}
                            />
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => {
                                  onEditComment(comment.id, editedText);
                                  setEditingCommentId(null);
                                }}
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingCommentId(null)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm">{comment.commentText}</p>
                            <div className="flex gap-2 mt-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setEditingCommentId(comment.id);
                                  setEditedText(comment.commentText);
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onDeleteComment(comment.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mb-2 opacity-20" />
                    <p>No comments for this post</p>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <DialogFooter className="flex justify-between gap-4 pt-4 border-t">
          {post.status === "pending" ? (
            <div className="flex gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleReject}
                className="flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Reject
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleApprove}
                className="flex items-center gap-1"
              >
                <Check className="h-4 w-4" />
                Approve
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetail;
