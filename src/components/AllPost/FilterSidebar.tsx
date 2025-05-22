"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Filter, Tag, X } from "lucide-react";
import React from "react";

// Category options
const categoryOptions = [
  { value: "Snacks", label: "Snacks" },
  { value: "Meals", label: "Meals" },
  { value: "Sweets", label: "Sweets" },
  { value: "Drinks", label: "Drinks" },
  { value: "Seafood", label: "Seafood" },
];

// Price range options
const priceOptions = [
  { value: "$", label: "Budget ($)" },
  { value: "$$", label: "Mid-Range ($$)" },
  { value: "$$$", label: "Premium ($$$)" },
];

interface FilterSidebarProps {
  filters: {
    search: string;
    categories: string[];
    priceRange: string[];
    rating: number | null;
    sortBy: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      search: string;
      categories: string[];
      priceRange: string[];
      rating: number | null;
      sortBy: string;
    }>
  >;
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  onClose,
}) => {
  // Handle category checkbox changes
  const handleCategoryChange = (category: string) => {
    setFilters((prev) => {
      if (prev.categories.includes(category)) {
        return {
          ...prev,
          categories: prev.categories.filter((c) => c !== category),
        };
      } else {
        return {
          ...prev,
          categories: [...prev.categories, category],
        };
      }
    });
  };

  // Handle price range checkbox changes
  const handlePriceChange = (price: string) => {
    setFilters((prev) => {
      if (prev.priceRange.includes(price)) {
        return {
          ...prev,
          priceRange: prev.priceRange.filter((p) => p !== price),
        };
      } else {
        return {
          ...prev,
          priceRange: [...prev.priceRange, price],
        };
      }
    });
  };

  // Handle rating slider change
  const handleRatingChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      rating: value[0] || null,
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      search: "",
      categories: [],
      priceRange: [],
      rating: null,
      sortBy: "popular",
    });
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4 md:p-6 sticky top-20">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Filters</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Reset all
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="md:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Applied filters */}
      {(filters.categories.length > 0 ||
        filters.priceRange.length > 0 ||
        filters.rating !== null) && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 my-2">
            {filters.categories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {category}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handleCategoryChange(category)}
                />
              </Badge>
            ))}

            {filters.priceRange.map((price) => (
              <Badge
                key={price}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {price}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handlePriceChange(price)}
                />
              </Badge>
            ))}

            {filters.rating !== null && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.rating}+ Stars
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, rating: null }))
                  }
                />
              </Badge>
            )}
          </div>
        </div>
      )}

      <ScrollArea className="h-full">
        <Accordion
          type="multiple"
          defaultValue={["category", "price", "rating"]}
          className="space-y-2"
        >
          {/* Category Filter */}
          <AccordionItem value="category" className="border-b">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                <span className="text-base font-medium">Category</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 mt-2">
                {categoryOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`category-${option.value}`}
                      checked={filters.categories.includes(option.value)}
                      onCheckedChange={() => handleCategoryChange(option.value)}
                    />
                    <label
                      htmlFor={`category-${option.value}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Price Range Filter */}
          <AccordionItem value="price" className="border-b">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                <span className="text-base font-medium">Price Range</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 mt-2">
                {priceOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`price-${option.value}`}
                      checked={filters.priceRange.includes(option.value)}
                      onCheckedChange={() => handlePriceChange(option.value)}
                    />
                    <label
                      htmlFor={`price-${option.value}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Rating Filter */}
          <AccordionItem value="rating" className="border-b">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                <span className="text-base font-medium">Rating</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 mt-2">
                <Slider
                  value={[filters.rating || 0]}
                  max={5}
                  step={1}
                  onValueChange={handleRatingChange}
                  className="mt-6"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Any</span>
                  <span>★ {filters.rating || 0}+</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>

      <div className="mt-6 pt-4 border-t">
        <Button className="w-full" onClick={onClose}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterSidebar;
