import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, MessageSquare, Star, User, X } from "lucide-react";
import React from "react";

interface ActivityItem {
  id: string;
  type: "approve" | "reject" | "premium" | "user" | "comment";
  title: string;
  time: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "approve":
        return <Check className="h-4 w-4 text-foodie-green" />;
      case "reject":
        return <X className="h-4 w-4 text-foodie-red" />;
      case "premium":
        return <Star className="h-4 w-4 text-purple-500" />;
      case "user":
        return <User className="h-4 w-4 text-blue-500" />;
      case "comment":
        return <MessageSquare className="h-4 w-4 text-foodie-orange" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3">
              <div className="rounded-full p-2 bg-muted">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
