export * from "./user";

export type PostStatus = "pending" | "approved" | "rejected";

export type UserRole = "admin" | "user" | "premium";

export type UserStatus = "active" | "suspended" | "banned";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus | string;
  joined: string;
  posts: number;
};

export type ActivityItemType =
  | "approve"
  | "reject"
  | "premium"
  | "user"
  | "comment";

export type ActivityItem = {
  id: string;
  type: ActivityItemType;
  title: string;
  time: string;
};

export type Comment = {
  id: string;
  author: string;
  content: string;
  postTitle: string;
  date: string;
};

export type Post = {
  id: string;
  title: string;
  author: string;
  category: string;
  imageUrl: string;
  excerpt: string;
  status: PostStatus;
  isPremium: boolean;
  date: string;
  content?: string;
};
