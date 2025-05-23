"use client";
import { Button } from "@/components/ui/button";
import { getAllcategory } from "@/services/categoryservice";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
type CategoryType = {
  id: string;
  name: string;
  image?: string;
  _count?: {
    posts: number;
  };
};
const Categories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getAllcategory();
      setCategories(result.data || []);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const skeletons = Array.from({ length: 4 });

  return (
    <div>
      <div className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#333333]">
            Explore by Category
          </h2>
          <Link href="/allpost">
            <Button
              variant="ghost"
              className="text-[#FF6B35] hover:text-[#FF6B35]/90 flex items-center gap-2"
            >
              All Categories <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? skeletons.map((_, idx) => (
                <div
                  key={idx}
                  className="h-48 rounded-lg bg-gray-200 animate-pulse relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <div className="h-4 w-1/2 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 w-1/4 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))
            : categories.map((category: CategoryType) => (
                <div
                  key={category.id}
                  className="relative group overflow-hidden rounded-lg h-48"
                >
                  <Image
                    height={500}
                    width={500}
                    src={category.image || "/default.jpg"}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h3 className="text-white text-lg font-bold">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {category?._count?.posts || 0} spots
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
