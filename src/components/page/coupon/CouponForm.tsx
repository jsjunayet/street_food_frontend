"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const handleApplyCoupon = async (e) => {
    e.stopPropagation();
    if (!couponCode.trim()) {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const mockCoupons = {
        JUNAYET: 20,
        WELCOME10: 10,
        STREETFOOD25: 25,
      };

      const code = couponCode.toUpperCase();
      const discount = mockCoupons[code as keyof typeof mockCoupons];

      if (discount) {
        setIsApplied(true);
        setAppliedDiscount(discount);
        onApplyCoupon(discount);
      } else {
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
