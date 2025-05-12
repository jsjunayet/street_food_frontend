"use client";
import CommentCard from "@/components/dashboard/CommentCart";
import NotFoundProudct from "@/components/dashboard/NotFoundProudct";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { deletedComment, updateComment } from "@/services/commentservice";
import { Comment } from "@/types";
import { MessageSquare, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface commentsPros {
  Postcomments: Comment[];
}

const Comments: React.FC<commentsPros> = ({ Postcomments }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = async (id: string) => {
    await deletedComment(id);
    toast.error("Comment deleted");
  };

  const handleEdit = async (id: string, commentText: string) => {
    await updateComment(id, commentText);
    toast.success("Comment updated");
  };

  // Filtered comments based on search query
  const filteredComments: Comment[] =
    Postcomments?.filter((comment: Comment) =>
      comment.commentText.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Comments Moderation</h1>
          <p className="text-muted-foreground">
            Review and moderate user comments.
          </p>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search comments..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="All">
          <TabsList>
            <TabsTrigger value="All" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              All
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {filteredComments.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="All" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredComments.map((comment: Comment) => (
                <CommentCard
                  key={comment.id}
                  id={comment.id}
                  author={comment.user.email}
                  content={comment.commentText}
                  postTitle={comment.post.title}
                  date={comment.createdAt.toString()}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>

            {filteredComments.length === 0 && (
              <NotFoundProudct
                title="No comments found"
                details="There are no comment posts yet"
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Comments;
