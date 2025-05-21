"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookmarkCheck,
  Calendar,
  Crown,
  DollarSign,
  Lock,
  MapPin,
  MessageCircle,
  User,
} from "lucide-react";
import { useState } from "react";

// Mock data for user profile
const userData = {
  id: "1",
  name: "Jane Doe",
  username: "foodie_jane",
  avatar: "/placeholder.svg",
  bio: "Street food enthusiast and food photographer. Always on the lookout for the next delicious bite!",
  location: "San Francisco, CA",
  joinDate: "January 2023",
  isPremium: false, // Toggle this to see premium vs non-premium
  stats: {
    posts: 24,
    comments: 128,
    followers: 345,
    following: 212,
    favorites: 67,
  },
  recentActivity: [
    {
      id: 1,
      type: "review",
      title: "Amazing Tacos at El Taco Truck",
      date: "2 days ago",
    },
    {
      id: 2,
      type: "comment",
      title: "Replied to 'Best Food Markets in Brooklyn'",
      date: "3 days ago",
    },
    {
      id: 3,
      type: "favorite",
      title: "Added Thai Fusion Truck to favorites",
      date: "5 days ago",
    },
    {
      id: 4,
      type: "photo",
      title: "Uploaded 3 new photos of Burger King",
      date: "1 week ago",
    },
  ],
  posts: [
    {
      id: 1,
      title: "The Best Churros in Town",
      excerpt:
        "Found the most amazing churros at this small stand near the park...",
      comments: 15,
      likes: 42,
      date: "April 15, 2025",
      isPremium: false,
    },
    {
      id: 2,
      title: "Hidden Gem: Korean BBQ Truck",
      excerpt:
        "If you haven't tried the bulgogi from this truck yet, you're missing out...",
      comments: 8,
      likes: 36,
      date: "April 10, 2025",
      isPremium: false,
    },
    {
      id: 3,
      title: "Food Festival Highlights",
      excerpt:
        "Spent the weekend at the international street food festival and here are my top picks...",
      comments: 22,
      likes: 78,
      date: "April 2, 2025",
      isPremium: false,
    },
  ],
  comments: [
    {
      id: 1,
      postTitle: "Best Breakfast Burritos",
      comment:
        "I've tried that place, and you're right - their salsa is amazing!",
      date: "April 14, 2025",
    },
    {
      id: 2,
      postTitle: "Food Truck Regulations",
      comment:
        "As someone who's been going to these trucks for years, I think the new regulations are actually helping improve food safety.",
      date: "April 12, 2025",
    },
    {
      id: 3,
      postTitle: "Veggie Options",
      comment:
        "Thanks for the recommendation! I've been looking for good vegetarian street food options in this area.",
      date: "April 9, 2025",
    },
  ],
  savedItems: [
    {
      id: 1,
      type: "vendor",
      name: "Taco Delite",
      cuisine: "Mexican",
      location: "Mission District",
    },
    {
      id: 2,
      type: "event",
      name: "Annual Food Truck Festival",
      date: "June 15-17, 2025",
      location: "Downtown",
    },
    {
      id: 3,
      type: "recipe",
      name: "Street-style Pad Thai",
      author: "Chef Mike",
      difficulty: "Medium",
    },
  ],
  premiumContent: [
    {
      id: 1,
      title: "Secret Underground Dumpling Bar",
      excerpt:
        "This hidden gem is tucked away in an alley and only sells 100 dumplings per day...",
      location: "Chinatown",
      isPremium: true,
    },
    {
      id: 2,
      title: "Invite-Only Rooftop BBQ Experience",
      excerpt:
        "Once a month, this acclaimed chef hosts an exclusive BBQ night with unique fusion dishes...",
      location: "Downtown",
      isPremium: true,
    },
    {
      id: 3,
      title: "The Secret Menu at Joe's Taco Truck",
      excerpt:
        "Did you know that Joe's has an entirely different menu if you know what to ask for?",
      location: "Waterfront District",
      isPremium: true,
    },
  ],
};

const subscriptionPlans = [
  {
    id: "basic",
    name: "Basic",
    price: "$0",
    billing: "Forever",
    features: [
      "Post food discoveries",
      "Vote on food posts",
      "Comment on posts",
      "Basic search features",
      "Personal profile page",
    ],
    current: !userData.isPremium,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$5.99",
    billing: "per month",
    features: [
      "All Basic features",
      "Access to Premium food spots",
      "Early access to food festivals",
      "Special vendor discounts",
      "Ad-free experience",
      "Premium badge on profile",
    ],
    featured: true,
    current: userData.isPremium,
  },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Premium/Non-Premium Banner */}
        {userData.isPremium ? (
          <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white p-4 rounded-lg mb-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Crown className="h-8 w-8 mr-3" />
                <div>
                  <h2 className="font-bold text-xl">Premium Member</h2>
                  <p>
                    Enjoy exclusive access to premium food spots and features!
                  </p>
                </div>
              </div>
              <Button
                variant="secondary"
                className="bg-white text-amber-600 hover:bg-gray-100"
              >
                Manage Subscription
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-orange-200 rounded-lg mb-6 p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center">
                <Lock className="h-6 w-6 mr-3 text-gray-500" />
                <div>
                  <h2 className="font-medium text-lg">Upgrade to Premium</h2>
                  <p className="text-gray-600">
                    Get access to exclusive food spots and premium features!
                  </p>
                </div>
              </div>
              <Button className="bg-[#EB6535] hover:bg-[#EB6535]/90 w-full sm:w-auto">
                Upgrade Now
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left sidebar - User info */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-20">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-2 border-streetgrub-orange">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {userData.isPremium && (
                    <span className="absolute bottom-0 right-0 bg-yellow-500 p-1 rounded-full">
                      <Crown className="h-4 w-4 text-white" />
                    </span>
                  )}
                </div>

                <h2 className="mt-4 text-xl font-semibold text-streetgrub-darkblue">
                  {userData.name}
                </h2>

                <p className="text-gray-500 text-sm">@{userData.username}</p>

                {userData.isPremium ? (
                  <Badge className="mt-2 bg-streetgrub-yellow text-streetgrub-darkblue hover:bg-streetgrub-yellow/80">
                    <Crown className="h-3 w-3 mr-1" /> Premium Member
                  </Badge>
                ) : (
                  <Badge className="mt-2 bg-gray-200 text-gray-700 hover:bg-gray-200/80">
                    Basic Member
                  </Badge>
                )}

                <p className="mt-4 text-gray-600">{userData.bio}</p>

                <div className="flex items-center space-x-1 mt-2 text-gray-500 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{userData.location}</span>
                </div>

                <div className="text-gray-500 text-sm mt-1 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Member since {userData.joinDate}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full mt-6 text-center">
                  <div>
                    <p className="font-semibold text-streetgrub-darkblue">
                      {userData.stats.posts}
                    </p>
                    <p className="text-xs text-gray-500">Posts</p>
                  </div>
                  <div>
                    <p className="font-semibold text-streetgrub-darkblue">
                      {userData.stats.comments}
                    </p>
                    <p className="text-xs text-gray-500">Comments</p>
                  </div>
                  <div>
                    <p className="font-semibold text-streetgrub-darkblue">
                      {userData.stats.favorites}
                    </p>
                    <p className="text-xs text-gray-500">Favorites</p>
                  </div>
                </div>

                <div className="w-full mt-6 flex">
                  <Button className="w-full bg-[#EB6535] hover:bg-[#EB6535]/90">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-9">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-[#EB6535] data-[state=active]:text-white"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="posts"
                    className="data-[state=active]:bg-[#EB6535] data-[state=active]:text-white"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Posts ({userData.stats.posts})
                  </TabsTrigger>
                  <TabsTrigger
                    value="comments"
                    className="data-[state=active]:bg-[#EB6535] data-[state=active]:text-white"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Comments ({userData.stats.comments})
                  </TabsTrigger>
                  <TabsTrigger
                    value="saved"
                    className="data-[state=active]:bg-[#EB6535] data-[state=active]:text-white"
                  >
                    <BookmarkCheck className="h-4 w-4 mr-2" />
                    Saved
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Popular Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {userData.posts.slice(0, 2).map((post) => (
                          <li
                            key={post.id}
                            className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                          >
                            <a
                              href="#"
                              className="hover:text-streetgrub-orange transition-colors"
                            >
                              <p className="font-medium">{post.title}</p>
                            </a>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                              <span className="flex items-center">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                {post.comments}
                              </span>
                              <span className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                  />
                                </svg>
                                {post.likes}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <Button variant="ghost" className="w-full mt-4">
                        View All Posts
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Comments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {userData.comments.slice(0, 2).map((comment) => (
                          <li
                            key={comment.id}
                            className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                          >
                            <p className="text-sm text-gray-500">
                              On:{" "}
                              <a
                                href="#"
                                className="font-medium text-streetgrub-darkblue hover:text-streetgrub-orange"
                              >
                                {comment.postTitle}
                              </a>
                            </p>
                            <p className="mt-1 text-gray-600 line-clamp-2">
                              {comment.comment}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {comment.date}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <Button variant="ghost" className="w-full mt-4">
                        View All Comments
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Premium Content Section - Only visible for premium users or as teaser for non-premium */}
                <div className="mt-6">
                  <Card
                    className={
                      userData.isPremium
                        ? "border-yellow-300"
                        : "border-gray-200"
                    }
                  >
                    <CardHeader
                      className={userData.isPremium ? "bg-yellow-50" : ""}
                    >
                      <div className="flex items-center">
                        <Crown
                          className={`mr-2 h-5 w-5 ${
                            userData.isPremium
                              ? "text-yellow-500"
                              : "text-gray-400"
                          }`}
                        />
                        <CardTitle>Premium Content</CardTitle>
                      </div>
                      <CardDescription>
                        {userData.isPremium
                          ? "Exclusive food spots only available to premium members"
                          : "Upgrade to premium to unlock exclusive food spots"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {userData.isPremium ? (
                        <div className="space-y-4">
                          {userData.premiumContent.map((item) => (
                            <div
                              key={item.id}
                              className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <Badge className="mb-2 bg-yellow-100 text-yellow-800 border-yellow-300">
                                    Premium
                                  </Badge>
                                  <h3 className="font-medium">{item.title}</h3>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {item.excerpt}
                                  </p>
                                  <div className="flex items-center mt-2 text-sm text-gray-500">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>{item.location}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {userData.premiumContent.slice(0, 1).map((item) => (
                            <div
                              key={item.id}
                              className="border-b border-gray-100 pb-4 opacity-60 hover:opacity-80 transition-opacity"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <Badge className="mb-2 bg-yellow-100 text-yellow-800 border-yellow-300">
                                    Premium
                                  </Badge>
                                  <h3 className="font-medium">{item.title}</h3>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {item.excerpt.substring(0, 50)}...
                                  </p>
                                  <div className="flex items-center mt-2 text-sm text-gray-500">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span>{item.location}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="flex flex-col items-center justify-center p-6 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-center">
                            <Lock className="h-12 w-12 text-gray-400 mb-3" />
                            <h3 className="text-lg font-medium text-gray-800 mb-1">
                              Unlock {userData.premiumContent.length} Premium
                              Food Spots
                            </h3>
                            <p className="text-gray-600 mb-4">
                              Upgrade your account to access exclusive food
                              spots and insider tips.
                            </p>
                            <Button className="bg-[#EB6535] hover:bg-[#EB6535]/90">
                              Upgrade to Premium
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="posts">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Your Posts</CardTitle>
                        <CardDescription>
                          All of your street food reviews and recommendations
                        </CardDescription>
                      </div>
                      <Button className="bg-[#EB6535] hover:bg-[#EB6535]/90">
                        New Post
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {userData.posts.map((post) => (
                        <div
                          key={post.id}
                          className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              <a
                                href="#"
                                className="hover:text-streetgrub-orange transition-colors"
                              >
                                <h3 className="text-xl font-medium">
                                  {post.title}
                                </h3>
                              </a>
                              {post.isPremium && (
                                <Badge className="ml-2 bg-yellow-100 text-yellow-800 border-yellow-300">
                                  Premium
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{post.date}</p>
                          </div>
                          <p className="mt-2 text-gray-600">{post.excerpt}</p>
                          <div className="flex items-center space-x-6 mt-4">
                            <span className="flex items-center text-sm text-gray-500">
                              <MessageCircle className="mr-1 h-4 w-4" />
                              {post.comments} Comments
                            </span>
                            <span className="flex items-center text-sm text-gray-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                              </svg>
                              {post.likes} Likes
                            </span>
                            <Button variant="outline" size="sm">
                              Read More
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comments">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Comments</CardTitle>
                    <CardDescription>
                      Your contributions to discussions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {userData.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                        >
                          <p className="text-sm text-gray-500">
                            On:{" "}
                            <a
                              href="#"
                              className="font-medium text-streetgrub-darkblue hover:text-streetgrub-orange"
                            >
                              {comment.postTitle}
                            </a>
                          </p>
                          <p className="mt-2 text-gray-600">
                            {comment.comment}
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <p className="text-sm text-gray-500">
                              {comment.date}
                            </p>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="saved">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Items</CardTitle>
                    <CardDescription>
                      Vendors, events, and recipes you&apos;ve bookmarked
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {userData.savedItems.map((item) => (
                        <div
                          key={item.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center mb-2">
                            {item.type === "vendor" && (
                              <Badge className="bg-[#EB6535]">Vendor</Badge>
                            )}
                            {item.type === "event" && (
                              <Badge className="bg-streetgrub-yellow text-streetgrub-darkblue">
                                Event
                              </Badge>
                            )}
                            {item.type === "recipe" && (
                              <Badge className="bg-streetgrub-green">
                                Recipe
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          {item.type === "vendor" && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Cuisine: {item.cuisine}
                              </p>
                              <p className="text-sm text-gray-500">
                                Location: {item.location}
                              </p>
                            </div>
                          )}
                          {item.type === "event" && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Date: {item.date}
                              </p>
                              <p className="text-sm text-gray-500">
                                Location: {item.location}
                              </p>
                            </div>
                          )}
                          {item.type === "recipe" && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                By: {item.author}
                              </p>
                              <p className="text-sm text-gray-500">
                                Difficulty: {item.difficulty}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="subscription">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Plans</CardTitle>
                    <CardDescription>
                      Manage your subscription and access premium features
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userData.isPremium && (
                      <Alert className="mb-6 bg-yellow-50 text-yellow-800 border-yellow-300">
                        <Crown className="h-4 w-4" />
                        <AlertTitle>Active Premium Subscription</AlertTitle>
                        <AlertDescription>
                          You&apos;re enjoying all premium features. Your
                          subscription renews on May 21, 2025.
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {subscriptionPlans.map((plan) => (
                        <div
                          key={plan.id}
                          className={`border rounded-lg p-6 relative ${
                            plan.current
                              ? "border-streetgrub-orange bg-orange-50"
                              : plan.featured
                              ? "border-yellow-400 shadow-md"
                              : ""
                          }`}
                        >
                          {plan.current && (
                            <Badge className="absolute top-4 right-4 bg-[#EB6535]">
                              Current Plan
                            </Badge>
                          )}
                          {plan.featured && !plan.current && (
                            <Badge className="absolute top-4 right-4 bg-yellow-400 text-yellow-800">
                              Recommended
                            </Badge>
                          )}

                          <h3 className="text-xl font-semibold mb-2">
                            {plan.name}
                          </h3>
                          <div className="mb-4">
                            <span className="text-3xl font-bold">
                              {plan.price}
                            </span>
                            <span className="text-gray-500">
                              {" "}
                              {plan.billing}
                            </span>
                          </div>

                          <ul className="space-y-3 mb-6">
                            {plan.features.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>

                          {plan.current ? (
                            <Button
                              variant={
                                plan.id === "premium" ? "outline" : "default"
                              }
                              className="w-full"
                              disabled={plan.id === "basic"}
                            >
                              {plan.id === "premium"
                                ? "Manage Subscription"
                                : "Current Plan"}
                            </Button>
                          ) : (
                            <Button
                              className={`w-full ${
                                plan.id === "premium"
                                  ? "bg-[#EB6535] hover:bg-[#EB6535]/90"
                                  : ""
                              }`}
                            >
                              {plan.id === "premium"
                                ? "Upgrade to Premium"
                                : "Downgrade to Basic"}
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-medium mb-4">
                        Premium Benefits
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-start">
                          <Lock className="h-5 w-5 text-streetgrub-orange mr-3 mt-1" />
                          <div>
                            <h4 className="font-medium">Exclusive Content</h4>
                            <p className="text-sm text-gray-600">
                              Access premium-only food spots and secret menus
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Calendar className="h-5 w-5 text-streetgrub-orange mr-3 mt-1" />
                          <div>
                            <h4 className="font-medium">Early Access</h4>
                            <p className="text-sm text-gray-600">
                              Be the first to know about food events and
                              festivals
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <DollarSign className="h-5 w-5 text-streetgrub-orange mr-3 mt-1" />
                          <div>
                            <h4 className="font-medium">Vendor Discounts</h4>
                            <p className="text-sm text-gray-600">
                              Enjoy special discounts from selected food vendors
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
