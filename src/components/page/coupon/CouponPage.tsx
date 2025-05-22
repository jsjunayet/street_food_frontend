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
import { Coupon } from "@/models/Coupon";
import { useState } from "react";

const dummyCoupons: Coupon[] = [
  {
    id: "1",
    code: "JUNAYET",
    discountPercentage: 20,
    validFrom: new Date("2023-01-01"),
    validUntil: new Date("2025-12-31"),
    isActive: true,
    usageLimit: 100,
    usageCount: 45,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "2",
    code: "WELCOME10",
    discountPercentage: 10,
    validFrom: new Date("2023-01-01"),
    validUntil: new Date("2025-12-31"),
    isActive: true,
    usageLimit: null,
    usageCount: 120,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
];

const CouponManagement = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(dummyCoupons);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountPercentage: 10,
    validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      .toISOString()
      .split("T")[0],
  });

  const handleAddCoupon = () => {
    if (!newCoupon.code) {
      return;
    }

    if (
      newCoupon.discountPercentage <= 0 ||
      newCoupon.discountPercentage > 100
    ) {
      return;
    }

    const coupon: Coupon = {
      id: Math.random().toString(36).substr(2, 9),
      code: newCoupon.code.toUpperCase(),
      discountPercentage: newCoupon.discountPercentage,
      validFrom: new Date(),
      validUntil: new Date(newCoupon.validUntil),
      isActive: true,
      usageLimit: null,
      usageCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setCoupons([...coupons, coupon]);
    setNewCoupon({
      code: "",
      discountPercentage: 10,
      validUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split("T")[0],
    });
  };

  const toggleCouponStatus = (id: string) => {
    setCoupons(
      coupons.map((coupon) => {
        if (coupon.id === id) {
          return {
            ...coupon,
            isActive: !coupon.isActive,
            updatedAt: new Date(),
          };
        }
        return coupon;
      })
    );
  };

  const deleteCoupon = (id: string) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
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
            <Button onClick={handleAddCoupon} className="mt-4">
              Create Coupon
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
                <p className="text-2xl font-bold">{coupons.length}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Active Coupons
                </span>
                <p className="text-2xl font-bold">
                  {coupons.filter((c) => c.isActive).length}
                </p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Total Redemptions
                </span>
                <p className="text-2xl font-bold">
                  {coupons.reduce((acc, curr) => acc + curr.usageCount, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Coupons</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell className="font-medium">{coupon.code}</TableCell>
                  <TableCell>{coupon.discountPercentage}%</TableCell>
                  <TableCell>
                    {coupon.validUntil.toLocaleDateString()}
                  </TableCell>
                  <TableCell>{coupon.usageCount} times</TableCell>
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
      </Card>
    </div>
  );
};

export default CouponManagement;
