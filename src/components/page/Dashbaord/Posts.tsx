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
import { Comment, PostStatus } from "@/types";
import { Category, Post } from "@/types/user";
import { Download, Filter, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PostsProps {
  posts: Post[];
  categories: Category[];
}

const Posts: React.FC<PostsProps> = ({ posts, categories }) => {
  const [selectedTab, setSelectedTab] = useState<"all" | PostStatus>("all");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  const handleStatusChange = async (id: string, status: PostStatus) => {
    await postAprroved(id, status);
  };

  const handlePremiumToggle = async (id: string) => {
    await premiumAprroved(id);
  };

  const handleEditComment = async (id: string, commentText: string) => {
    await updateComment(id, commentText);
    toast.success("Comment updated");
  };

  const handleDeleteComment = async (id: string) => {
    await deletedComment(id);
    toast.error("Comment deleted");
  };

  const openPostDetail = (id: string) => {
    setSelectedPostId(id);
  };

  const filteredPosts = posts
    ?.filter((post) => {
      if (selectedTab !== "all" && post.status !== selectedTab) return false;
      if (
        selectedCategory !== "all" &&
        post.category?.name.toLowerCase() !== selectedCategory.toLowerCase()
      )
        return false;
      if (
        searchText.trim() &&
        !post.title.toLowerCase().includes(searchText.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "date-desc") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sortBy === "date-asc") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
      if (sortBy === "title-asc") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "title-desc") {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

  const selectedPost = selectedPostId
    ? posts.find((post) => post.id === selectedPostId)
    : null;
  const postComments: Comment[] = selectedPost?.comments || [];

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
            <Input
              placeholder="Search posts..."
              className="pl-9"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
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

            <Select
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((item) => (
                  <SelectItem key={item.id} value={`${item.name}`}>
                    {item.name}
                  </SelectItem>
                ))}
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
                {posts?.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {posts?.filter((p) => p.status === "pending").length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {posts?.filter((p) => p.status === "approved").length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {posts?.filter((p) => p.status === "rejected").length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPosts?.map((post) => (
                <PostCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  comments={post.comments}
                  user={post.user || "Unknown author"}
                  category={post.category || "Food"}
                  imageUrl={post.imageUrl || post.image || ""}
                  excerpt={post.excerpt || post.description || ""}
                  status={post.status as PostStatus}
                  isPremium={post.isPremium}
                  createdAt={post.createdAt.toString()}
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

            {filteredPosts?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts found</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {selectedPost && (
        <PostDetail
          open={!!selectedPostId}
          onOpenChange={(open) => !open && setSelectedPostId(null)}
          post={{
            id: selectedPost.id,
            title: selectedPost.title,
            user: selectedPost.user || "Unknown author",
            createdAt: selectedPost.createdAt,
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
          onDeleteComment={handleDeleteComment}
          onEditComment={handleEditComment}
        />
      )}
    </div>
  );
};

export default Posts;
