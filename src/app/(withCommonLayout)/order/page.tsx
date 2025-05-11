import OrderPage from "@/components/order/OrderPage";
import { subscription, verifyUser } from "@/services/AuthService";
interface PageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}
const Order = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = await searchParams;
  const { order_id } = resolvedSearchParams;
  if (!order_id || Array.isArray(order_id)) {
    return (
      <div className=" min-h-screen font-semibold text-3xl flex justify-center items-center">
        No valid order ID provided.
      </div>
    );
  }
  await verifyUser(order_id); // ✅ orderId is guaranteed to be string here

  const payment = await subscription();
  return (
    <div>
      <OrderPage subscription={payment.data} />
    </div>
  );
};

export default Order;
