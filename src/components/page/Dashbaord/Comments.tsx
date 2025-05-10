"use client";
import CommentCard from "@/components/dashboard/CommentCart";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { deletedComment, updateComment } from "@/services/commentservice";
import { MessageSquare, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Comments = ({ Postcomments }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // // Load comments from backend data
  // useEffect(() => {
  //   // In a real app, these would be API calls
  //   const transformedComments = transformComments(
  //     backendCommentsData.data,
  //     backendUsersData.data,
  //     backendPostsData.data
  //   );
  //   setComments(transformedComments);
  // }, []);

  // const handleApprove = (id: string) => {
  //   setApprovedComments([...approvedComments, id]);
  //   setDeletedComments(deletedComments.filter((commentId) => commentId !== id));
  // };

  const handleDelete = async (id: string) => {
    await deletedComment(id);
    toast.error("Comment deleted");
  };

  const handleEdit = async (id: string, commentText: string) => {
    await updateComment(id, commentText);
    toast.success("Comment updated");
  };

  // Filter comments based on search query
  // const comments = searchQuery
  //   ? comments?.filter(
  //       (comment) =>
  //         comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         comment.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //         (comment.postTitle &&
  //           comment.postTitle.toLowerCase().includes(searchQuery.toLowerCase()))
  //     )
  //   : comments;

  // const pendingComments = comments.filter(
  //   (comment) =>
  //     !approvedComments.includes(comment.id) &&
  //     !deletedComments.includes(comment.id)
  // );

  // const approvedCommentsList = comments.filter((comment) =>
  //   approvedComments.includes(comment.id)
  // );

  // const deletedCommentsList = comments.filter((comment) =>
  //   deletedComments.includes(comment.id)
  // );

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
            <TabsTrigger value="pending" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              All
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {Postcomments?.length}
              </span>
            </TabsTrigger>

            {/* <TabsTrigger value="deleted" className="flex items-center gap-1">
              Deleted
              <span className="ml-1 text-xs bg-muted rounded-full px-2">
                {deletedCommentsList.length}
              </span>
            </TabsTrigger> */}
          </TabsList>

          <TabsContent value="All" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Postcomments?.map((comment) => (
                <CommentCard
                  key={comment.id}
                  id={comment.id}
                  author={comment.user.email}
                  content={comment.commentText}
                  postTitle={comment.post.title}
                  date={comment.createdAt}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>

            {Postcomments?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No pending comments</p>
              </div>
            )}
          </TabsContent>
          {/* <TabsContent value="deleted" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deletedCommentsList.map((comment) => (
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

            {deletedCommentsList.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No deleted comments</p>
              </div>
            )}
          </TabsContent> */}
        </Tabs>
      </div>
    </div>
  );
};

export default Comments;
