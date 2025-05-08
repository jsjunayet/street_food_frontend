import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import FoodSpotCard from "../foodSpotList/FoodSpotCard";

// Sample featured food spots data
const featuredSpots = [
  {
    id: "1",
    title: "Street Taco Express",
    description:
      "Authentic Mexican street tacos with handmade tortillas and traditional fillings.",
    imageUrl:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRhY298ZW58MHx8MHx8fDA%3D",
    rating: 4.8,
    priceRange: "$",
    category: "Mexican",
    location: "Downtown Street Market",
    isPremium: false,
    votes: { upvotes: 142, downvotes: 12 },
  },
  {
    id: "2",
    title: "Bangkok Noodle Cart",
    description:
      "Traditional Thai pad see ew noodles cooked fresh on a street cart with authentic seasonings.",
    imageUrl:
      "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhhaSUyMG5vb2RsZXN8ZW58MHx8MHx8fDA%3D",
    rating: 4.6,
    priceRange: "$$",
    category: "Thai",
    location: "Asian Night Market",
    isPremium: true,
    votes: { upvotes: 98, downvotes: 5 },
  },
  {
    id: "3",
    title: "Curry in a Hurry",
    description:
      "Quick and delicious Indian curry served with fresh naan straight from the tandoor.",
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWFuJTIwY3Vycnl8ZW58MHx8MHx8fDA%3D",
    rating: 4.5,
    priceRange: "$$",
    category: "Indian",
    location: "Spice Alley",
    isPremium: false,
    votes: { upvotes: 76, downvotes: 8 },
  },
];

const premiumSpots = [
  {
    id: "4",
    title: "Dim Sum Delights",
    description:
      "Handcrafted dim sum from a multi-generational family recipe, steamed fresh to order.",
    imageUrl:
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGltJTIwc3VtfGVufDB8fDB8fHww",
    rating: 4.9,
    priceRange: "$$$",
    category: "Chinese",
    location: "Harbor Food Street",
    isPremium: true,
    votes: { upvotes: 221, downvotes: 14 },
  },
  {
    id: "5",
    title: "Artisanal Gelato Cart",
    description:
      "Small-batch gelato made with organic ingredients and unique flavor combinations.",
    imageUrl:
      "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z2VsYXRvfGVufDB8fDB8fHww",
    rating: 4.7,
    priceRange: "$$",
    category: "Desserts",
    location: "Riverside Pier",
    isPremium: true,
    votes: { upvotes: 155, downvotes: 18 },
  },
];

const FeaturedSpots = () => {
  return (
    <div className="py-16">
      {/* Regular Featured Spots Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-street-dark">
            Popular Food Spots
          </h2>
          <Link href={"/allpost"}>
            <Button
              variant="ghost"
              className="text-street-orange hover:text-street-orange/90 flex items-center gap-2"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredSpots.map((spot) => (
            <FoodSpotCard key={spot.id} {...spot} />
          ))}
        </div>
      </div>

      {/* Premium Spots Section */}
      <div className="relative overflow-hidden bg-gray-100 rounded-xl p-6 md:p-10">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-street-yellow/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-street-orange/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-street-dark">
              Premium Spots
            </h2>
            <span className="premium-gradient text-xs font-bold py-1 px-3 rounded-full animate-pulse-slow">
              Unlock Now
            </span>
          </div>

          <p className="text-gray-600 mb-8 max-w-2xl">
            Discover exclusive, curated street food experiences that are only
            available to our premium members. Upgrade your account to unlock
            these hidden gems!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {premiumSpots.map((spot) => (
              <div key={spot.id} className="relative group overflow-hidden">
                {/* Show the card normally */}
                <FoodSpotCard {...spot} className="premium-card" />

                {/* Overlay with blur effect - only covers the card content */}
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm group-hover:backdrop-blur-md transition-all duration-300 rounded-lg flex flex-col items-center justify-center">
                  <div className="text-center px-6 py-8 bg-white/10 backdrop-blur rounded-lg max-w-[80%] transform transition-transform duration-300 group-hover:scale-105">
                    <div className="bg-white/20 p-3 rounded-full inline-block mb-4">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-white text-lg font-bold mb-2">
                      Premium Content
                    </h3>
                    <Button className="bg-street-yellow text-black hover:bg-street-yellow/90">
                      Upgrade to Access
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSpots;
