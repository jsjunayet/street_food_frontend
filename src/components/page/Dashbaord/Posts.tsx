"use client";
import PostCard from "@/components/dashboard/PostCard";
import PostDetail from "@/components/dashboard/PostDetails";
import { mockComments, mockPosts } from "@/components/data/mockData";
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
import { PostStatus } from "@/types";
import { Download, Filter, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Posts = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [selectedTab, setSelectedTab] = useState<"all" | PostStatus>("all");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const handleStatusChange = (id: string, status: PostStatus) => {
    setPosts(
      posts.map((post) => (post.id === id ? { ...post, status } : post))
    );
  };

  const handlePremiumToggle = (id: string, isPremium: boolean) => {
    setPosts(
      posts.map((post) => (post.id === id ? { ...post, isPremium } : post))
    );
  };

  const filteredPosts = posts.filter((post) => {
    if (selectedTab === "all") return true;
    return post.status === selectedTab;
  });

  const selectedPost = selectedPostId
    ? posts.find((post) => post.id === selectedPostId)
    : null;

  const postComments = selectedPostId
    ? mockComments
        .filter((comment) => comment.postTitle === selectedPost?.title)
        .slice(0, 3)
    : [];

  const handleDownloadReport = () => {
    toast.success("Posts report downloaded successfully");
  };

  const openPostDetail = (id: string) => {
    setSelectedPostId(id);
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
            onClick={handleDownloadReport}
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
                    author={post.author}
                    category={post.category}
                    imageUrl={post.imageUrl}
                    excerpt={post.excerpt}
                    status={post.status}
                    isPremium={post.isPremium}
                    date={post.date}
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
          post={selectedPost}
          comments={postComments}
          onApprove={(id) => handleStatusChange(id, "approved")}
          onReject={(id) => handleStatusChange(id, "rejected")}
          onPremiumToggle={handlePremiumToggle}
        />
      )}
    </div>
  );
};

export default Posts;
