import { Separator } from "@/components/ui/separator";
import { Calendar, Coins, CreditCard } from "lucide-react";

interface SubscriptionDetailsProps {
  paymentMethod: string;
  date: string;
  price: number;
}

const SubscriptionDetails = ({
  paymentMethod,
  date,
  price,
}: SubscriptionDetailsProps) => {
  return (
    <div className="space-y-4">
      <Separator className="my-2" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-muted p-2 rounded-full">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Payment Method</p>
            <p className="font-medium">{paymentMethod}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-muted p-2 rounded-full">
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Subscribed On</p>
            <p className="font-medium">{date}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-muted p-2 rounded-full">
            <Coins className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Amount</p>
            <p className="font-bold text-lg">৳{price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SubscriptionDetails;
