import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Check, Edit, Trash2, X } from "lucide-react";
import React, { useState } from "react";

interface CommentCardProps {
  id: string;
  author: string;
  content: string;
  postTitle?: string;
  date: string;
  onDelete: (id: string) => void;
  onEdit?: (id: string, newContent: string) => void;
}

const CommentCard: React.FC<CommentCardProps> = ({
  id,
  author,
  content,
  postTitle,
  date,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedContent(content); // Reset to original content
  };

  const handleSaveEdit = () => {
    if (onEdit) {
      onEdit(id, editedContent);
      setIsEditing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="font-medium">{author}</span>
            {postTitle && (
              <>
                <span className="mx-1 text-muted-foreground">on</span>
                <span className="font-medium text-muted-foreground">
                  {postTitle}
                </span>
              </>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {formatDate(date)}
          </span>
        </div>

        {isEditing ? (
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="mt-2"
            rows={3}
            placeholder="Edit your comment..."
          />
        ) : (
          <p className="text-sm">{content}</p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isEditing ? (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleCancelEdit}>
              <X className="mr-1 h-4 w-4" />
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleSaveEdit}>
              <Check className="mr-1 h-4 w-4" />
              Save
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2">
            {onEdit && (
              <Button variant="outline" size="sm" onClick={handleEditClick}>
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleDelete}>
              <Trash2 className="mr-1 h-4 w-4" />
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CommentCard;
