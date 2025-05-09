"use client";
import CategoryManager from "@/components/dashboard/CategoryManager";
import { mockCategories } from "@/components/data/mockData";

const Categories = () => {
  return (
    <div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Categories Management</h1>
          <p className="text-muted-foreground">
            Create and manage content categories.
          </p>
        </div>

        <CategoryManager initialCategories={mockCategories} />
      </div>
    </div>
  );
};

export default Categories;
