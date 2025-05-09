import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const Category = () => {
  return (
    <div>
      <div className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-4">
            How StreetGrub Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover, share, and enjoy the best street food experiences around
            you with our simple process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-[#FFFBF1] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#FF6b35] text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Discover Spots</h3>
            <p className="text-gray-600">
              Browse through our curated list of street food spots or search for
              specific cuisines.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="bg-[#FFFBF1] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#FF6B35] text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Rate & Review</h3>
            <p className="text-gray-600">
              Share your experiences by rating and reviewing the spots you've
              visited.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="bg-[#FFFBF1] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#FF6B35] text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Share Discoveries</h3>
            <p className="text-gray-600">
              Found a hidden gem? Add new spots to our platform and help others
              discover great food.
            </p>
          </div>
        </div>
      </div>
      <div className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#333333]">
            Explore by Category
          </h2>
          <Button
            variant="ghost"
            className="text-[#FF6B35] hover:text-[#FF6B35]/90 flex items-center gap-2"
          >
            All Categories <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Category Card 1 */}
          <div className="relative group overflow-hidden rounded-lg h-48">
            <Image
              height={500}
              width={500}
              src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt="Mexican"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 w-full">
              <h3 className="text-white text-lg font-bold">Mexican</h3>
              <p className="text-white/80 text-sm">24 spots</p>
            </div>
          </div>

          {/* Category Card 2 */}
          <div className="relative group overflow-hidden rounded-lg h-48">
            <Image
              height={500}
              width={500}
              src="https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt="Thai"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 w-full">
              <h3 className="text-white text-lg font-bold">Thai</h3>
              <p className="text-white/80 text-sm">18 spots</p>
            </div>
          </div>

          {/* Category Card 3 */}
          <div className="relative group overflow-hidden rounded-lg h-48">
            <Image
              height={500}
              width={500}
              src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt="Indian"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 w-full">
              <h3 className="text-white text-lg font-bold">Indian</h3>
              <p className="text-white/80 text-sm">15 spots</p>
            </div>
          </div>

          {/* Category Card 4 */}
          <div className="relative group overflow-hidden rounded-lg h-48">
            <Image
              height={500}
              width={500}
              src="https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
              alt="Chinese"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-4 w-full">
              <h3 className="text-white text-lg font-bold">Chinese</h3>
              <p className="text-white/80 text-sm">22 spots</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
