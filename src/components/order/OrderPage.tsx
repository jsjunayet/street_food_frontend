import SubscriptionCard, { SubscriptionProps } from "./SubscriptionCard";

const OrderPage: React.FC<SubscriptionProps> = ({ subscription }) => {
  return (
    <div className="min-h-screen ">
      <div className=" max-w-7xl mx-auto py-16 px-4 md:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Subscription Vista
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage your subscriptions with a beautiful and intuitive interface
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <SubscriptionCard subscription={subscription} />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
