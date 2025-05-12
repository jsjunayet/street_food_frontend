"use client";
import NotFoundProudct from "@/components/dashboard/NotFoundProudct";
import PostCard from "@/components/dashboard/PostCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import StatCard from "@/components/dashboard/StartCard";
import { mockActivity, mockStats } from "@/components/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { postAprroved, premiumAprroved } from "@/services/postService";
import { PostStatus } from "@/types";
import { Post } from "@/types/user";
import { FileText, MessageSquare, Star, Users } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Jan", posts: 24, users: 40 },
  { name: "Feb", posts: 30, users: 45 },
  { name: "Mar", posts: 28, users: 48 },
  { name: "Apr", posts: 32, users: 51 },
  { name: "May", posts: 40, users: 66 },
  { name: "Jun", posts: 38, users: 62 },
];
interface IDashbaordProps {
  posts: Post[];
}
const Dashboard: React.FC<IDashbaordProps> = ({ posts }) => {
  const handleStatusChange = async (id: string, status: PostStatus) => {
    await postAprroved(id, status);
  };

  const handlePremiumToggle = async (id: string) => {
    await premiumAprroved(id);
  };
  const pendingPost: Post[] =
    posts
      ?.filter((post: Post) => post.status === "pending")
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ) || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your foodie admin control panel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Posts"
          value={mockStats.posts.total}
          change={{ value: mockStats.posts.growth + "%", positive: true }}
          icon={<FileText className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title="Total Users"
          value={mockStats.users.total}
          change={{ value: mockStats.users.growth + "%", positive: true }}
          icon={<Users className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title="Total Comments"
          value={mockStats.comments.total}
          change={{ value: mockStats.comments.growth + "%", positive: true }}
          icon={<MessageSquare className="h-5 w-5 text-primary" />}
        />
        <StatCard
          title="Premium Content"
          value={mockStats.premium.total}
          change={{ value: mockStats.premium.growth + "%", positive: true }}
          icon={<Star className="h-5 w-5 text-primary" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Content Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="posts"
                  name="Posts"
                  stroke="#6A8D73"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  name="Users"
                  stroke="#D0712A"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <RecentActivity activities={mockActivity} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">All Recently Post</h2>

        {pendingPost.length === 0 ? (
          <NotFoundProudct
            title={"No pending posts found"}
            details={" All content has been reviewed and approved."}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingPost.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                comments={post.comments}
                user={post.user || "Unknown author"}
                category={post.category || "Food"}
                imageUrl={post.imageUrl || post.image || ""}
                excerpt={post.excerpt || post.description || ""}
                status={post.status as PostStatus}
                isPremium={post.isPremium}
                createdAt={post.createdAt.toString()}
                date={
                  post.date ||
                  new Date(post.createdAt || "").toLocaleDateString()
                }
                onStatusChange={handleStatusChange}
                onPremiumToggle={handlePremiumToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
