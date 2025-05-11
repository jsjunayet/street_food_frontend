import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { formatDate } from "./FormatDate";
import SubscriptionDetails from "./SubscriptionDetails";

interface User {
  email: string;
}

export interface SubscriptionProps {
  subscription: {
    paymentStatus: boolean;
    user: User;
    paymentMethod: string;
    subscriptedAt: string | number | Date;
    price: number;
    plan?: string;
  };
}

const SubscriptionCard = ({ subscription }: SubscriptionProps) => {
  const isPaid = subscription?.paymentStatus;

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Gradient Header */}
      <div
        className={`h-3 w-full ${
          isPaid
            ? "bg-gradient-to-r from-emerald-400 to-teal-500"
            : "bg-gradient-to-r from-amber-400 to-red-500"
        }`}
      />

      {/* Card Content */}
      <div className="p-6 space-y-4">
        {/* Status Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              className={`h-10 w-10 ${
                isPaid ? "bg-emerald-100" : "bg-amber-100"
              }`}
            >
              {isPaid ? (
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              )}
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg">
                {subscription?.plan || "Premium Plan"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {subscription?.user?.email}
              </p>
            </div>
          </div>

          <Badge
            variant={isPaid ? "outline" : "secondary"}
            className={`${
              isPaid
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
            }`}
          >
            {isPaid ? "Payment Successful" : "Payment Pending"}
          </Badge>
        </div>

        <div className="space-y-3 pt-2">
          <SubscriptionDetails
            paymentMethod={subscription?.paymentMethod}
            date={formatDate(subscription?.subscriptedAt)}
            price={subscription?.price}
          />
        </div>
      </div>
    </Card>
  );
};

export default SubscriptionCard;
