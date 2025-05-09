import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    positive: boolean;
  };
  icon: React.ReactNode;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  className,
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className="p-2 bg-primary/10 rounded-full">{icon}</div>
        </div>
      </CardContent>
      {change && (
        <CardFooter className="px-6 py-2 bg-muted/30">
          <p className="text-xs flex items-center">
            <span
              className={cn(
                "mr-1 text-xs",
                change.positive ? "text-green-500" : "text-red-500"
              )}
            >
              {change.positive ? "+" : ""}
              {change.value}
            </span>
            vs last week
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default StatCard;
