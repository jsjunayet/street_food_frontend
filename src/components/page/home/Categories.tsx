import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Categories = () => {
  return (
    <div>
      <div className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#333333]">
            Explore by Category
          </h2>
          <Link href={"/allpost"}>
            <Button
              variant="ghost"
              className="text-[#FF6B35] hover:text-[#FF6B35]/90 flex items-center gap-2"
            >
              All Categories <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
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

export default Categories;
