import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import {
  createComment,
  createRating,
  createVote,
} from "@/services/postService";
import { formatDistanceToNow } from "date-fns";
import {
  Flag,
  MapPin,
  MessageSquare,
  Navigation,
  Send,
  Share,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import PremiumBadge from "../share/PremiumBage";

interface User {
  name: string;
  avatar: string;
}

interface Coordinates {
  lat: number;
  lng: number;
}

export interface IPost {
  id: string; // UUID from Prisma
  title: string;
  description: string;
  location: string;
  price: number;
  image: string;
  categoryId: string;
  isPremium: boolean;
  approved: boolean;
  updatedAt: string; // Date as string if fetched via JSON
  userId: string;
  // Optionally include relations if needed
  user?: {
    id: string;
    email: string;
    role: "USER" | "ADMIN";
  };
  category?: {
    id: string;
    name: string;
  };
  votes?: {
    vote: "UP" | "DOWN";
  }[];
  ratings?: {
    rating: number;
  }[];
  comments?: {
    commentText: string;
    createdAt: string;
  }[];
}

interface FoodPostCardProps {
  post: IPost;
}

const FoodPostCard: React.FC<FoodPostCardProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const { user } = useUser();
  const [newComment, setNewComment] = useState("");
  const [showRatingPanel, setShowRatingPanel] = useState(false);
  const handleVote = async (type: "UP" | "DOWN", postId: string) => {
    const data = {
      postId,
      vote: type,
    };
    await createVote(data);
  };

  const handleAddComment = async (postId: string) => {
    const payload = { postId, commentText: newComment };
    await createComment(payload);
    setNewComment("");
  };
  const handleRatePost = async (postId: string, start: number) => {
    const payload = { postId, rating: start };
    await createRating(payload);
  };

  const handleShareClick = () => {
    // Create a shareable URL with the post ID
    const shareUrl = `${window.location.origin}/allpost?postId=${post.id}`;

    // Try to use the Web Share API if available
    if (navigator.share) {
      navigator
        .share({
          title: `Food Discovery by ${post.user.name}`,
          text: post.description.substring(0, 100) + "...",
          url: shareUrl,
        })
        .then(() => toast.success("Post shared successfully"))
        .catch((error) => {
          console.error("Error sharing:", error);
          copyToClipboard(shareUrl);
        });
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Share link copied to clipboard!");
      },
      () => {
        toast.error("Failed to copy link");
      }
    );
  };

  const handleLocationClick = (location: string) => {
    const query = encodeURIComponent(location);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank"
    );
  };

  // Generate star rating display
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        );
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }

    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  // Rating panel to allow users to rate posts
  const renderRatingPanel = () => {
    return (
      <div className="bg-gray-100 p-3 rounded-lg mb-4">
        <p className="text-sm mb-2 font-medium">Rate this food experience:</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => {
                handleRatePost(post.id, star);
                setShowRatingPanel(false);
                toast.success(`You rated this ${star} stars`);
              }}
              className="focus:outline-none"
            >
              <Star
                className={`h-8 w-8 transition-colors duration-200 hover:fill-yellow-400 hover:text-yellow-400`}
              />
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="md:flex justify-between items-start">
          <div className="flex items-center justify-center md:justify-normal gap-4">
            <Avatar className=" h-12 w-12">
              <AvatarImage src={post.user.avatar} alt={post.user?.email} />
              <AvatarFallback>{post.user?.email.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{post.user?.name}</div>
              <div className=" text-sm text-gray-500">
                <span>
                  {" "}
                  {formatDistanceToNow(new Date(post?.createdAt), {
                    addSuffix: true,
                  })}
                </span>

                <button
                  onClick={() => handleLocationClick(post.location)}
                  className="flex items-center text-blue-600 hover:underline cursor-pointer"
                >
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{post.location}</span>
                  <Navigation className="h-3 w-3 ml-1" />
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex items-center justify-center md:justify-normal gap-2">
              {renderRating(post.averageRating)}
              <Button variant="ghost" size="sm">
                <Flag className="h-4 w-4" />
              </Button>
            </div>
            {post.isPremium && (
              <div className="mt-1 text-center">
                <PremiumBadge />
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-gray-700 mb-4 whitespace-pre-line font-semibold text-2xl">
          {post.title}
        </h2>
        <p className="text-gray-700 mb-4 whitespace-pre-line">
          {post.description}
        </p>

        {/* {post.images.length > 0 && (
          <div className="mb-4">
            {post.images.length === 1 ? (
              <Image
                height={500}
                width={500}
                src={post.images[0]}
                alt={`Food image`}
                className="rounded-lg w-full object-cover max-h-96"
              />
            ) : (
              <div
                className={`grid grid-cols-${Math.min(
                  post.images.length,
                  2
                )} gap-2`}
              >
                {post.images.map((image, index) => (
                  <Image
                    height={500}
                    width={500}
                    key={index}
                    src={image}
                    alt={`Food image ${index + 1}`}
                    className="rounded-lg w-full object-cover h-48"
                  />
                ))}
              </div>
            )}
          </div>
        )} */}

        <Image
          height={500}
          width={500}
          src={
            "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop"
          }
          alt={`Food image`}
          className="rounded-lg w-full object-cover max-h-96 "
        />

        {showRatingPanel && renderRatingPanel()}

        <div className="flex justify-between text-sm text-gray-500 pt-2">
          <div className=" flex items-center gap-2">
            <span>{post.upVotes} likes</span>
            <span>{post.downVotes} Dislike</span>
          </div>
          <span>{post.totalComments} comments</span>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3 flex flex-col">
        <div className="flex justify-between w-full pb-3">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              // className={vote === "UP" ? "text-blue-600" : ""}
              onClick={() => handleVote("UP", post.id)}
            >
              <ThumbsUp
              // className={`h-4 w-4 mr-2 ${
              //   vote === "UP" ? "fill-blue-600" : ""
              // }`}
              />
              Like
            </Button>

            <Button
              variant="ghost"
              size="sm"
              // className={vote === "DOWN" ? "text-red-600" : ""}
              onClick={() => handleVote("DOWN", post.id)}
            >
              <ThumbsDown
              // className={`h-4 w-4 mr-2 ${
              //   vote === "DOWN" ? "fill-red-600" : ""
              // }`}
              />
              Dislike
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Comment
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowRatingPanel(!showRatingPanel)}
          >
            <Star className="h-4 w-4 mr-2" />
            Rate
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShareClick}>
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {showComments && (
          <div className="w-full">
            {post.comments.map((comment) => (
              <div key={comment.id} className="py-3 border-t">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment?.user?.image} />
                    <AvatarFallback>
                      {comment?.user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-100 rounded-xl p-3">
                      <div className="font-semibold text-sm">
                        {comment?.user?.name}
                      </div>
                      <p className="text-sm">{comment?.commentText}</p>
                    </div>
                    <div className="flex gap-4 mt-1 text-xs text-gray-500">
                      <button>
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })}
                      </button>
                      {/* <button>Like ({comment.likes})</button> */}
                      <button>Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center gap-2 mt-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.image} />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1 relative">
                <Input
                  placeholder="Write a comment..."
                  className="pr-10 bg-gray-100 border-none"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddComment();
                  }}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full text-blue-600"
                  onClick={() => handleAddComment(post.id)}
                  disabled={!newComment.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default FoodPostCard;
