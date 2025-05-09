"use client";
import CommentCard from "@/components/dashboard/CommentCart";
import { mockComments } from "@/components/data/mockData";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { useState } from "react";

const Comments = () => {
  const [comments, setComments] = useState(mockComments);
  const [approvedComments, setApprovedComments] = useState<string[]>([]);
  const [deletedComments, setDeletedComments] = useState<string[]>([]);

  const handleApprove = (id: string) => {
    setApprovedComments([...approvedComments, id]);
    setDeletedComments(deletedComments.filter((commentId) => commentId !== id));
  };

  const handleDelete = (id: string) => {
    setDeletedComments([...deletedComments, id]);
    setApprovedComments(
      approvedComments.filter((commentId) => commentId !== id)
    );
  };

  const pendingComments = comments.filter(
    (comment) =>
      !approvedComments.includes(comment.id) &&
      !deletedComments.includes(comment.id)
  );

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
          <Input placeholder="Search comments..." className="pl-9" />
        </div>

        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">
              Pending
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {pendingComments.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {approvedComments.length}
              </span>
            </TabsTrigger>
            <TabsTrigger value="deleted">
              Deleted
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {deletedComments.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingComments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  id={comment.id}
                  author={comment.author}
                  content={comment.content}
                  postTitle={comment.postTitle}
                  date={comment.date}
                  onApprove={handleApprove}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {pendingComments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No pending comments</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="approved" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {comments
                .filter((comment) => approvedComments.includes(comment.id))
                .map((comment) => (
                  <CommentCard
                    key={comment.id}
                    id={comment.id}
                    author={comment.author}
                    content={comment.content}
                    postTitle={comment.postTitle}
                    date={comment.date}
                    onApprove={() => {}}
                    onDelete={handleDelete}
                  />
                ))}
            </div>

            {approvedComments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No approved comments</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="deleted" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {comments
                .filter((comment) => deletedComments.includes(comment.id))
                .map((comment) => (
                  <CommentCard
                    key={comment.id}
                    id={comment.id}
                    author={comment.author}
                    content={comment.content}
                    postTitle={comment.postTitle}
                    date={comment.date}
                    onApprove={handleApprove}
                    onDelete={() => {}}
                  />
                ))}
            </div>

            {deletedComments.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No deleted comments</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Comments;
