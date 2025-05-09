import OrderPage from "@/components/order/OrderPage";
import { subscription, verifyUser } from "@/services/AuthService";

interface OrderProps {
  searchParams: { order_id?: string };
}

const Order = async ({ searchParams }: OrderProps) => {
  const orderId = await searchParams?.order_id;
  if (!orderId) {
    return (
      <div className=" min-h-screen font-semibold text-3xl flex justify-center items-center">
        No order ID provided.
      </div>
    );
  }
  const res = await verifyUser(orderId);
  console.log(res);

  const payment = await subscription();
  console.log(payment);
  return (
    <div>
      <OrderPage result={payment.data} />
    </div>
  );
};

export default Order;
