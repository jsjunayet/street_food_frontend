"use client";
import { IPost } from "@/components/AllPost/FoodPostCard";
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
  Calendar,
  Crown,
  Lock,
  MapPin,
  MessageCircle,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
interface IComment {
  id: string;
  commentText: string;
  createdAt: string;
  postTitle: string;
}

interface IUserData {
  id: string;
  name: string;
  image: string;
  isPremium: boolean;
  createdAt: string;
  posts: IPost[];
  comments: IComment[];
}

interface ProfilePageProps {
  userData: IUserData;
}
const ProfilePage: React.FC<ProfilePageProps> = ({ userData }) => {
  const [activeTab, setActiveTab] = useState("overview");
  console.log(userData);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Premium/Non-Premium Banner */}
        {userData?.isPremium ? (
          <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white p-4 rounded-lg mb-6 shadow-lg">
            <div className="md:flex items-center justify-between">
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
                className="bg-white w-full sm:w-auto  text-amber-600 hover:bg-gray-100"
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
                    <AvatarImage src={userData?.image} alt={userData?.name} />
                    <AvatarFallback>{userData?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {userData?.isPremium && (
                    <span className="absolute bottom-0 right-0 bg-yellow-500 p-1 rounded-full">
                      <Crown className="h-4 w-4 text-white" />
                    </span>
                  )}
                </div>

                <h2 className="mt-4 text-xl font-semibold text-streetgrub-darkblue">
                  {userData?.name}
                </h2>

                <p className="text-gray-500 text-sm">@{userData?.name}</p>

                {userData?.isPremium ? (
                  <Badge className="mt-2 bg-streetgrub-yellow text-streetgrub-darkblue hover:bg-streetgrub-yellow/80">
                    <Crown className="h-3 w-3 mr-1" /> Premium Member
                  </Badge>
                ) : (
                  <Badge className="mt-2 bg-gray-200 text-gray-700 hover:bg-gray-200/80">
                    Basic Member
                  </Badge>
                )}

                {/* <p className="mt-4 text-gray-600">{userData.bio}</p> */}

                <div className="flex items-center space-x-1 mt-2 text-gray-500 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{"Dhaka, Bangladesh"}</span>
                </div>

                <div className="text-gray-500 text-sm mt-1 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Member since {userData?.createdAt}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 w-full mt-6 text-center">
                  <div>
                    <p className="font-semibold text-streetgrub-darkblue">
                      {userData?.posts.length}
                    </p>
                    <p className="text-xs text-gray-500">Posts</p>
                  </div>
                  <div>
                    <p className="font-semibold text-streetgrub-darkblue">
                      {userData?.comments.length}
                    </p>
                    <p className="text-xs text-gray-500">Comments</p>
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
                <div className="w-full overflow-x-auto md:overflow-visible">
                  <TabsList className="grid grid-cols-4 min-w-[360px] md:min-w-full">
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
                      Posts ({userData?.posts?.length})
                    </TabsTrigger>
                    <TabsTrigger
                      value="comments"
                      className="data-[state=active]:bg-[#EB6535] data-[state=active]:text-white"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Comments ({userData?.comments?.length})
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Popular Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {userData?.posts.slice(0, 2).map((post: IPost) => (
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
                                {post?.comments?.length}
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
                                {post?.upVotes}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Comments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-4">
                        {userData?.comments.slice(0, 2).map((comment: any) => (
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
                                {comment?.postTitle}
                              </a>
                            </p>
                            <p className="mt-1 text-gray-600 line-clamp-2">
                              {comment?.commentText}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {comment?.createdAt}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Premium Content Section - Only visible for premium users or as teaser for non-premium */}
                <div className="mt-6">
                  <Card
                    className={
                      userData?.isPremium
                        ? "border-yellow-300"
                        : "border-gray-200"
                    }
                  >
                    <CardHeader
                      className={userData?.isPremium ? "bg-yellow-50" : ""}
                    >
                      <div className="flex items-center">
                        <Crown
                          className={`mr-2 h-5 w-5 ${
                            userData?.isPremium
                              ? "text-yellow-500"
                              : "text-gray-400"
                          }`}
                        />
                        <CardTitle>Premium Content</CardTitle>
                      </div>
                      <CardDescription>
                        {userData?.isPremium
                          ? "Exclusive food spots only available to premium members"
                          : "Upgrade to premium to unlock exclusive food spots"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {userData?.isPremium ? (
                        <div className="space-y-4">
                          {userData.posts.map((item: IPost) => (
                            <div
                              key={item.id}
                              className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <Badge className="mb-2 bg-yellow-100 text-yellow-800 border-yellow-300">
                                    Premium
                                  </Badge>
                                  <h3 className="font-medium">{item?.title}</h3>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {userData?.posts?.slice(0, 1)?.map((item: IPost) => (
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
                                    {item?.description.substring(0, 50)}...
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
                              Unlock {20} Premium Food Spots
                            </h3>
                            <p className="text-gray-600 mb-4">
                              Upgrade your account to access exclusive food
                              spots and insider tips.
                            </p>
                            <Link href={"/premium"}>
                              <Button className="bg-[#EB6535] hover:bg-[#EB6535]/90">
                                Upgrade to Premium
                              </Button>
                            </Link>
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
                      {userData?.posts?.map((post: IPost) => (
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
                                  {post?.title}
                                </h3>
                              </a>
                              {post?.isPremium && (
                                <Badge className="ml-2 bg-yellow-100 text-yellow-800 border-yellow-300">
                                  Premium
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {new Date(post?.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-6 mt-4">
                            <span className="flex items-center text-sm text-gray-500">
                              <MessageCircle className="mr-1 h-4 w-4" />
                              {post.comments?.length} Comments
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
                              {post?.upVotes} Likes
                            </span>
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
                      {userData?.comments?.map((comment: any) => (
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
                              {comment?.postTitle}
                            </a>
                          </p>
                          <p className="mt-2 text-gray-600">
                            {comment?.commentText}
                          </p>
                          <div className="flex justify-between items-center mt-4">
                            <p className="text-sm text-gray-500">
                              {comment?.createdAt}
                            </p>
                          </div>
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
