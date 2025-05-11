"use client";
import CategoryManager from "@/components/dashboard/CategoryManager";
import { Category } from "@/types";
interface CategoryManagerProps {
  initialCategories: Category[];
}
const Categories: React.FC<CategoryManagerProps> = ({ initialCategories }) => {
  return (
    <div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Categories Management</h1>
          <p className="text-muted-foreground">
            Create and manage content categories.
          </p>
        </div>

        <CategoryManager initialCategories={initialCategories} />
      </div>
    </div>
  );
};

export default Categories;
