import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface CommentCardProps {
  id: string;
  author: string;
  content: string;
  postTitle: string;
  date: string;
  onApprove: (id: string) => void;
  onDelete: (id: string) => void;
}

const CommentCard: React.FC<CommentCardProps> = ({
  id,
  author,
  content,
  postTitle,
  date,
  onApprove,
  onDelete,
}) => {
  const handleApprove = () => {
    onApprove(id);
    toast.success("Comment approved");
  };

  const handleDelete = () => {
    onDelete(id);
    toast.error("Comment deleted");
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="font-medium">{author}</span>
            <span className="mx-1 text-muted-foreground">on</span>
            <span className="font-medium text-muted-foreground">
              {postTitle}
            </span>
          </div>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <p className="text-sm">{content}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleDelete}>
            <X className="mr-1 h-4 w-4" />
            Delete
          </Button>
          <Button variant="default" size="sm" onClick={handleApprove}>
            <Check className="mr-1 h-4 w-4" />
            Approve
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CommentCard;
