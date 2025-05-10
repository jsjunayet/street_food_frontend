"use client";
import PostCard from "@/components/dashboard/PostCard";
import PostDetail from "@/components/dashboard/PostDetails";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { deletedComment, updateComment } from "@/services/commentservice";
import { postAprroved, premiumAprroved } from "@/services/postService";
import { Post, PostStatus } from "@/types";
import { Download, Filter, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Posts = ({ allposts, comment }) => {
  const [posts, setPosts] = useState<Post[]>(allposts);
  const [selectedTab, setSelectedTab] = useState<"all" | PostStatus>("all");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const handleStatusChange = async (id: string, status: PostStatus) => {
    await postAprroved(id, status);
  };

  const handlePremiumToggle = async (id: string) => {
    await premiumAprroved(id);
  };

  const filteredPosts = posts?.filter((post) => {
    if (selectedTab === "all") return true;
    return post.status === selectedTab;
  });

  const selectedPost = selectedPostId
    ? posts.find((post) => post.id === selectedPostId)
    : null;
  console.log(selectedPost);
  const postComments = selectedPost?.comments || [];
  // console.log(postComments);

  const openPostDetail = (id: string) => {
    setSelectedPostId(id);
  };
  const handleEditComment = async (id: string, commentText: string) => {
    const res = await updateComment(id, commentText);
    console.log(res, id);
    toast.success("Comment updated");
  };
  const handleDeleteComment = async (id: string) => {
    const res = await deletedComment(id);
    console.log(res, id);
    toast.error("Comment deleted");
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Posts Management</h1>
            <p className="text-muted-foreground">
              Review, approve, and manage food posts.
            </p>
          </div>

          <Button
            variant="outline"
            className="flex items-center gap-2 self-start"
          >
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search posts..." className="pl-9" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select defaultValue="date-desc">
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Latest</SelectItem>
                <SelectItem value="date-asc">Oldest</SelectItem>
                <SelectItem value="title-asc">Title A-Z</SelectItem>
                <SelectItem value="title-desc">Title Z-A</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="baking">Baking</SelectItem>
                <SelectItem value="drinks">Drinks</SelectItem>
                <SelectItem value="nutrition">Nutrition</SelectItem>
                <SelectItem value="cooking">Cooking</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="food-history">Food History</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" className="hidden sm:flex">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue="all"
          onValueChange={(value) => setSelectedTab(value as any)}
        >
          <TabsList>
            <TabsTrigger value="all">
              All
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {posts.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {posts.filter((p) => p.status === "pending").length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {posts.filter((p) => p.status === "approved").length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {posts.filter((p) => p.status === "rejected").length}
              </span>
            </TabsTrigger>
          </TabsList>

          {["all", "pending", "approved", "rejected"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    author={post.author || "Unknown author"}
                    category={post.category || "Food"}
                    imageUrl={post.imageUrl || post.image || ""}
                    excerpt={post.excerpt || post.description || ""}
                    status={post.status as PostStatus}
                    isPremium={post.isPremium}
                    date={
                      post.date ||
                      new Date(post.createdAt || "").toLocaleDateString()
                    }
                    onStatusChange={handleStatusChange}
                    onPremiumToggle={handlePremiumToggle}
                    onClick={() => openPostDetail(post.id)}
                  />
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No posts found</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {selectedPost && (
        <PostDetail
          open={!!selectedPostId}
          onOpenChange={(open) => !open && setSelectedPostId(null)}
          post={{
            id: selectedPost.id,
            title: selectedPost.title,
            author: selectedPost.author || "Unknown author",
            category: selectedPost.category || "Food",
            imageUrl: selectedPost.imageUrl || selectedPost.image || "",
            content: selectedPost.content || selectedPost.description,
            excerpt: selectedPost.excerpt || selectedPost.description || "",
            status: selectedPost.status as PostStatus,
            isPremium: selectedPost.isPremium,
            date:
              selectedPost.date ||
              new Date(selectedPost.createdAt || "").toLocaleDateString(),
          }}
          comments={postComments}
          onApprove={(id) => handleStatusChange(id, "approved")}
          onReject={(id) => handleStatusChange(id, "rejected")}
          onPremiumToggle={handlePremiumToggle}
          onDeleteComment={handleDeleteComment}
          onEditComment={handleEditComment}
        />
      )}
    </div>
  );
};

export default Posts;
