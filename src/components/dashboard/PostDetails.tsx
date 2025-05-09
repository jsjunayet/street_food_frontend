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
import { Check, Download, MessageSquare, Star, X } from "lucide-react";
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
};

const PostDetail: React.FC<PostDetailProps> = ({
  open,
  onOpenChange,
  post,
  comments,
  onApprove,
  onReject,
  onPremiumToggle,
}) => {
  const [activeTab, setActiveTab] = useState<string>("content");

  const handleApprove = () => {
    onApprove(post.id);
    toast.success("Post approved successfully");
  };

  const handleReject = () => {
    onReject(post.id);
    toast.error("Post rejected");
  };

  const handlePremiumToggle = () => {
    onPremiumToggle(post.id, !post.isPremium);
    toast.info(
      `Post ${!post.isPremium ? "marked as premium" : "removed from premium"}`
    );
  };

  const handleDownloadReport = () => {
    toast.success("Report downloaded successfully");
    // In a real app, this would trigger a file download
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
            <span>By {post.author}</span>
            <span className="mx-2">•</span>
            <span>{post.category}</span>
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
              <TabsTrigger value="reports">Reports</TabsTrigger>
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
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                <p className="text-lg font-medium mb-2">Excerpt:</p>
                <p className="mb-6">{post.excerpt}</p>

                <p className="text-lg font-medium mb-2">Full Content:</p>
                <p>
                  {post.content ||
                    "This is a placeholder for the full content of the post. In a real application, this would contain the complete article text with formatting."}
                </p>
              </TabsContent>

              <TabsContent value="comments" className="mt-0 space-y-4 h-full">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <Card key={comment.id} className="border">
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">
                            {comment.date}
                          </span>
                        </div>
                        <p className="text-sm">{comment.content}</p>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            Flag
                          </Button>
                          <Button variant="outline" size="sm">
                            Delete
                          </Button>
                          <Button variant="outline" size="sm">
                            Approve
                          </Button>
                        </div>
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

              <TabsContent
                value="reports"
                className="mt-0 p-6 space-y-6 h-full"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Available Reports</h3>
                  <Button
                    variant="outline"
                    onClick={handleDownloadReport}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download All
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="border p-4 rounded-md flex justify-between items-center hover:bg-muted/50 cursor-pointer">
                    <div>
                      <p className="font-medium">Post Engagement Report</p>
                      <p className="text-sm text-muted-foreground">
                        Views, likes, shares, and reading time
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="border p-4 rounded-md flex justify-between items-center hover:bg-muted/50 cursor-pointer">
                    <div>
                      <p className="font-medium">Comment Analysis</p>
                      <p className="text-sm text-muted-foreground">
                        Sentiment and moderation data
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="border p-4 rounded-md flex justify-between items-center hover:bg-muted/50 cursor-pointer">
                    <div>
                      <p className="font-medium">Content Quality Score</p>
                      <p className="text-sm text-muted-foreground">
                        Readability and SEO metrics
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <DialogFooter className="flex justify-between gap-4 pt-4 border-t">
          <div className="flex gap-2">
            <Button
              variant={post.isPremium ? "default" : "outline"}
              size="sm"
              onClick={handlePremiumToggle}
              className="flex items-center gap-1"
            >
              <Star className="h-4 w-4" />
              {post.isPremium ? "Remove Premium" : "Mark as Premium"}
            </Button>
          </div>

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
