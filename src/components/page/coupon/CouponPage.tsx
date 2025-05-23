"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createcoupon,
  deletedcoupon,
  updatecoupon,
} from "@/services/CouponService";
import { useState } from "react";
import { toast } from "sonner";
type Coupon = {
  id: string;
  code: string;
  discountPercentage: number;
  validFrom: string;
  validUntil: string; // or `Date` if your API returns actual `Date` objects
  isActive: boolean;
  usageLimit: number | null;
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
};

type Props = {
  coupons: Coupon[];
};

const CouponManagement = ({ coupons }: Props) => {
  console.log(coupons);
  const [newCoupon, setNewCoupon] = useState<{
    code: string;
    discountPercentage: number;
    validUntil: string;
  }>({
    code: "",
    discountPercentage: 10,
    validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .split("T")[0],
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleAddCoupon = async () => {
    if (!newCoupon.code) {
      return;
    }

    if (
      newCoupon.discountPercentage <= 0 ||
      newCoupon.discountPercentage > 100
    ) {
      return;
    }

    const coupon = {
      code: newCoupon.code.toUpperCase(),
      discountPercentage: newCoupon.discountPercentage,
      validFrom: new Date().toISOString(),
      validUntil: new Date(newCoupon.validUntil).toISOString(),
      isActive: true,
      usageLimit: null,
      usageCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setIsLoading(true);
    const result = await createcoupon(coupon);
    if (result.success) {
      toast.success("Successfull added Coupon");
      setNewCoupon({
        code: "",
        discountPercentage: 10,
        validUntil: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        )
          .toISOString()
          .split("T")[0],
      });
      setIsLoading(false);
    } else {
      toast.error("Failed added Coupon");
      setIsLoading(false);
    }
  };

  const toggleCouponStatus = async (id: string) => {
    await updatecoupon(id);
  };

  const deleteCoupon = async (id: string) => {
    await deletedcoupon(id);
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Coupon Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Create New Coupon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Coupon Code
                </label>
                <Input
                  value={newCoupon.code}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, code: e.target.value })
                  }
                  placeholder="e.g. WELCOME10"
                  className="uppercase"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Discount (%)
                </label>
                <Input
                  type="number"
                  value={newCoupon.discountPercentage}
                  onChange={(e) =>
                    setNewCoupon({
                      ...newCoupon,
                      discountPercentage: parseInt(e.target.value) || 0,
                    })
                  }
                  min="1"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Valid Until
                </label>
                <Input
                  type="date"
                  value={newCoupon.validUntil}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, validUntil: e.target.value })
                  }
                />
              </div>
            </div>
            <Button
              disabled={isLoading}
              onClick={handleAddCoupon}
              className="mt-4"
            >
              {isLoading ? "Create Couponing..." : "Create Coupon"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Coupon Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-muted-foreground">
                  Total Coupons
                </span>
                <p className="text-2xl font-bold">{coupons?.length}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Active Coupons
                </span>
                <p className="text-2xl font-bold">
                  {coupons?.filter((c) => c.isActive).length}
                </p>
              </div>
              {/* <div>
                <span className="text-sm text-muted-foreground">
                  Total Redemptions
                </span>
                <p className="text-2xl font-bold">
                  {coupons?.reduce((acc, curr) => acc + curr.usageCount, 0)}
                </p>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Coupons</CardTitle>
        </CardHeader>
        <div className=" md:w-full w-[360px] overflow-x-auto md:overflow-visible">
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Valid Until</TableHead>
                  {/* <TableHead>Used</TableHead> */}
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons?.map((coupon: Coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell className="font-medium">{coupon.code}</TableCell>
                    <TableCell>{coupon.discountPercentage}%</TableCell>
                    <TableCell>{coupon.validUntil}</TableCell>
                    {/* <TableCell>{coupon.usageCount} times</TableCell> */}
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={coupon.isActive}
                          onCheckedChange={() => toggleCouponStatus(coupon.id)}
                        />
                        <span
                          className={
                            coupon.isActive ? "text-green-600" : "text-red-600"
                          }
                        >
                          {coupon.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteCoupon(coupon.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default CouponManagement;
