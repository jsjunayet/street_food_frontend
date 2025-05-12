"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  createCategory,
  deletedCategory,
  updateCategory,
} from "@/services/categoryservice";
import { Category } from "@/types";
import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface CategoryManagerProps {
  initialCategories: Category[];
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  initialCategories,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = async () => {
    console.log("handle submit");
    if (!categoryName.trim()) return;

    if (editingId) {
      await updateCategory(editingId, categoryName);
    } else {
      await createCategory(categoryName);
    }

    setCategoryName("");
    setEditingId(null);
  };

  const handleEdit = (id: string, name: string) => {
    setEditingId(id);
    setCategoryName(name);
  };

  const handleDelete = async (id: string) => {
    const res = await deletedCategory(id);
    if (res.success) {
      toast.success("User deleted");
    } else {
      toast.error(`${res.data.meta.constraint}` || "Something is Wrong");
    }
    if (editingId === id) {
      setEditingId(null);
      setCategoryName("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 mb-6">
          <Input
            placeholder="Category name..."
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="max-w-sm"
          />
          <Button onClick={handleSubmit}>
            {editingId ? "Update Category" : "Add Category"}
          </Button>
        </div>

        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left px-4 py-2">Name</th>
                <th className="text-left px-4 py-2">Posts</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {initialCategories?.map((category: Category) => (
                <tr key={category.id}>
                  <td className="px-4 py-2">{category.name}</td>
                  <td className="px-4 py-2">{category?._count?.posts}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(category.id, category.name)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryManager;
