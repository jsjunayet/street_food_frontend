import { ActivityItemType, PostStatus, UserRole, UserStatus } from "../types";

export const mockPosts = [
  {
    id: "1",
    title: "The Art of Perfect French Croissants",
    author: "Julia Chen",
    category: "Baking",
    imageUrl:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1526&q=80",
    excerpt:
      "Learn the secrets of creating flaky, buttery croissants from scratch with this step-by-step guide.",
    status: "pending" as PostStatus,
    isPremium: false,
    date: "2 hours ago",
  },
  {
    id: "2",
    title: "10 Summer Cocktails to Beat the Heat",
    author: "Marcus Johnson",
    category: "Drinks",
    imageUrl:
      "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-1.2.1&auto=format&fit=crop&w=1526&q=80",
    excerpt:
      "Cool down with these refreshing cocktail recipes perfect for summer parties and gatherings.",
    status: "approved" as PostStatus,
    isPremium: true,
    date: "1 day ago",
  },
  {
    id: "3",
    title: "Plant-Based Protein Sources for Vegans",
    author: "Sophia Wang",
    category: "Nutrition",
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    excerpt:
      "Discover delicious and nutritious plant-based protein options to incorporate into your vegan diet.",
    status: "approved" as PostStatus,
    isPremium: false,
    date: "3 days ago",
  },
  {
    id: "4",
    title: "The Ultimate Guide to Homemade Pizza",
    author: "Tony Romano",
    category: "Cooking",
    imageUrl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    excerpt:
      "Create restaurant-quality pizza in your own kitchen with these professional tips and tricks.",
    status: "rejected" as PostStatus,
    isPremium: false,
    date: "5 days ago",
  },
  {
    id: "5",
    title: "Global Street Food Tour: Asia Edition",
    author: "Lee Min-ho",
    category: "Travel",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    excerpt:
      "Explore the vibrant street food scenes across Asian countries, from Thailand to Japan.",
    status: "pending" as PostStatus,
    isPremium: false,
    date: "1 week ago",
  },
  {
    id: "6",
    title: "Ancient Fermentation Methods Making a Comeback",
    author: "Emma Wilson",
    category: "Food History",
    imageUrl:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    excerpt:
      "How traditional fermentation techniques are being revived in modern kitchens for health and flavor.",
    status: "approved" as PostStatus,
    isPremium: true,
    date: "2 weeks ago",
  },
];

export const mockComments = [
  {
    id: "1",
    author: "John Smith",
    content:
      "This recipe changed my life! I've never been able to make croissants successfully until now.",
    postTitle: "The Art of Perfect French Croissants",
    date: "1 hour ago",
  },
  {
    id: "2",
    author: "Maria Garcia",
    content:
      "I tried the mojito recipe and it was way too sweet. Would recommend cutting the sugar in half.",
    postTitle: "10 Summer Cocktails to Beat the Heat",
    date: "5 hours ago",
  },
  {
    id: "3",
    author: "David Lee",
    content:
      "Great information! Would love to see more about how to incorporate these proteins into actual meals.",
    postTitle: "Plant-Based Protein Sources for Vegans",
    date: "1 day ago",
  },
  {
    id: "4",
    author: "Sarah Johnson",
    content:
      "The dough recipe didn't work for me. I followed it exactly but it came out too wet.",
    postTitle: "The Ultimate Guide to Homemade Pizza",
    date: "2 days ago",
  },
  {
    id: "5",
    author: "Mike Peterson",
    content:
      "This is offensive and inappropriate content that should be removed immediately.",
    postTitle: "Global Street Food Tour: Asia Edition",
    date: "3 days ago",
  },
];

export const mockUsers = [
  {
    id: "1",
    name: "Julia Chen",
    email: "juliachen@example.com",
    role: "premium" as UserRole,
    status: "active" as UserStatus,
    joined: "Jan 10, 2023",
    posts: 12,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus@example.com",
    role: "admin" as UserRole,
    status: "active" as UserStatus,
    joined: "Nov 5, 2022",
    posts: 24,
  },
  {
    id: "3",
    name: "Sophia Wang",
    email: "sophia@example.com",
    role: "premium" as UserRole,
    status: "active" as UserStatus,
    joined: "Mar 22, 2023",
    posts: 8,
  },
  {
    id: "4",
    name: "Tony Romano",
    email: "tony@example.com",
    role: "user" as UserRole,
    status: "suspended" as UserStatus,
    joined: "Feb 14, 2023",
    posts: 5,
  },
  {
    id: "5",
    name: "Lee Min-ho",
    email: "leeminho@example.com",
    role: "user" as UserRole,
    status: "active" as UserStatus,
    joined: "Apr 30, 2023",
    posts: 3,
  },
];

export const mockCategories = [
  {
    id: "1",
    name: "Baking",
    slug: "baking",
    count: 24,
  },
  {
    id: "2",
    name: "Drinks",
    slug: "drinks",
    count: 18,
  },
  {
    id: "3",
    name: "Nutrition",
    slug: "nutrition",
    count: 15,
  },
  {
    id: "4",
    name: "Cooking",
    slug: "cooking",
    count: 32,
  },
  {
    id: "5",
    name: "Travel",
    slug: "travel",
    count: 9,
  },
  {
    id: "6",
    name: "Food History",
    slug: "food-history",
    count: 7,
  },
];

export const mockActivity = [
  {
    id: "1",
    type: "approve" as ActivityItemType,
    title: 'Approved post "The Art of Perfect French Croissants"',
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "premium" as ActivityItemType,
    title: 'Marked "10 Summer Cocktails to Beat the Heat" as premium',
    time: "3 hours ago",
  },
  {
    id: "3",
    type: "reject" as ActivityItemType,
    title: 'Rejected post "Why Fast Food Is Better Than Home Cooking"',
    time: "5 hours ago",
  },
  {
    id: "4",
    type: "user" as ActivityItemType,
    title: "New user registered: Sarah Johnson",
    time: "1 day ago",
  },
  {
    id: "5",
    type: "comment" as ActivityItemType,
    title: 'Moderated comment on "The Ultimate Guide to Homemade Pizza"',
    time: "2 days ago",
  },
];

export const mockStats = {
  posts: {
    total: 342,
    pending: 18,
    growth: 12,
  },
  users: {
    total: 1526,
    active: 1490,
    growth: 8,
  },
  comments: {
    total: 4728,
    flagged: 23,
    growth: 15,
  },
  premium: {
    total: 78,
    growth: 23,
  },
};
