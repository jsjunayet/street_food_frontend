import { IPost } from "@/components/AllPost/FoodPostCard";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import FoodSpotCard from "../foodSpotList/FoodSpotCard";
interface FeaturedSpotsProps {
  user: IUser;
  posts: IPost[];
}
const FeaturedSpots: React.FC<FeaturedSpotsProps> = ({ user, posts }) => {
  const safePosts = Array.isArray(posts) ? posts : [];

  const premiumPosts =
    safePosts
      .filter((post) => post.isPremium)
      .sort((a, b) => b.upVotes - a.upVotes)
      .slice(0, 2) || [];

  const nonPremiumPosts =
    safePosts
      .filter((post) => !post.isPremium)
      .sort((a, b) => b.upVotes - a.upVotes)
      .slice(0, 3) || [];

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
              className="text-[#FF6B35] hover:text-[#FF6B35]/90 flex items-center gap-2"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {nonPremiumPosts?.map((spot) => (
            <FoodSpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      </div>

      {/* Premium Spots Section */}
      <div
        className={`relative overflow-hidden  bg-gray-100 rounded-xl p-6 md:p-10`}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-street-yellow/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-street-orange/20 rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-street-dark">
              Premium Spots
            </h2>
            <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-bold rounded-full shadow-md py-1 px-2">
              {" "}
              Unlock Now
            </span>
          </div>

          <p className="text-gray-600 mb-8 max-w-2xl">
            Discover exclusive, curated street food experiences that are only
            available to our premium members. Upgrade your account to unlock
            these hidden gems!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {premiumPosts?.map((spot: IPost) => (
              <div key={spot.id} className="relative group overflow-hidden">
                {/* Show the card normally */}
                <FoodSpotCard spot={spot} />

                {/* Overlay with blur effect - only covers the card content */}
                {!user?.isPremium && (
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-sm group-hover:backdrop-blur-md transition-all duration-300 rounded-lg flex flex-col items-center justify-center">
                    <div className="text-center px-6 py-8 bg-white/10 backdrop-blur rounded-lg max-w-[80%] transform transition-transform duration-300 group-hover:scale-105">
                      <Link href={"/premium"}>
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
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSpots;
