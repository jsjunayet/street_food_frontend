"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/types";
import OrderPage from "../order/OrderPage";
import SubscriptionForm from "./SubscriptionForm";
interface PremiumPageProps {
  payment: {
    paymentStatus: boolean;
    user: User;
    paymentMethod: string;
    subscriptedAt: string | number | Date;
    price: number;
    plan?: string;
  };
}
const PremiumPage: React.FC<PremiumPageProps> = ({ payment }) => {
  return (
    <div>
      {payment?.paymentStatus ? (
        <OrderPage subscription={payment} />
      ) : (
        <div className=" py-8 min-h-screen mx-2 lg:mx-0">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Unlock Premium Content
            </h1>

            <div className="grid gap-8">
              {/* Premium Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className=" border border-yellow-400">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Exclusive Spots
                    </CardTitle>
                    <CardDescription>
                      Access to premium-only food spots and hidden gems
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border border-yellow-400">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                        <circle cx="17" cy="7" r="5" />
                      </svg>
                      Priority Access
                    </CardTitle>
                    <CardDescription>
                      Early notification for new street food events
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="border border-yellow-400">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M20 7h-9" />
                        <path d="M14 17H5" />
                        <circle cx="17" cy="17" r="3" />
                        <circle cx="7" cy="7" r="3" />
                      </svg>
                      No Ads
                    </CardTitle>
                    <CardDescription>
                      Ad-free browsing experience throughout the platform
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {/* Subscription Form */}
              <Card className=" border-t-4 border-t-yellow-400">
                <CardHeader>
                  <CardTitle>Premium Membership</CardTitle>
                  <CardDescription>
                    Get unlimited access to all premium features for only 1000
                    Taka
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SubscriptionForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumPage;
