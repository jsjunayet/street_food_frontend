import CouponManagement from "@/components/page/coupon/CouponPage";
import { getAllcoupon } from "@/services/CouponService";

const Coupon = async () => {
  const result = await getAllcoupon();
  return (
    <div>
      <CouponManagement coupons={result?.data} />
    </div>
  );
};

export default Coupon;
