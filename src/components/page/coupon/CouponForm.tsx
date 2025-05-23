"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAllcoupon } from "@/services/CouponService";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface CouponFormProps {
  onApplyCoupon: (discount: number) => void;
  className?: string;
}
const CouponForm: React.FC<CouponFormProps> = ({
  onApplyCoupon,
  className,
}) => {
  const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState<
    { code: string; discountPercentage: number; isActive: boolean }[]
  >([]);
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await getAllcoupon();
        setCoupons(res.data);
      } catch (error) {
        console.error("Failed to fetch coupons", error);
      }
    };

    fetchCoupons();
  }, []);
  const handleApplyCoupon = async (e: any) => {
    e.stopPropagation();
    if (!couponCode.trim()) {
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      const matchedCoupon = coupons?.find(
        (coupon) => coupon.code === couponCode && coupon.isActive === true
      );
      setIsApplied(false);
      if (matchedCoupon) {
        setAppliedDiscount(matchedCoupon.discountPercentage);
        onApplyCoupon(matchedCoupon.discountPercentage);
        setCouponCode("");
      } else {
        toast.error("Invalid coupon code");
      }

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-2">
        <Label htmlFor="coupon-code" className="text-base font-medium">
          Promo Code
        </Label>
      </div>

      {!isApplied ? (
        <div className="flex space-x-2">
          <Input
            id="coupon-code"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="uppercase"
          />
          <Button
            onClick={handleApplyCoupon}
            disabled={isLoading}
            className="whitespace-nowrap"
          >
            {isLoading ? "Validating..." : "Apply"}
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-green-50 rounded-md p-3 border border-green-200">
          <div>
            <p className="font-medium">{couponCode.toUpperCase()}</p>
            <p className="text-sm text-green-700">
              {appliedDiscount}% discount applied
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponForm;
