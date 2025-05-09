import PremiumBadge from "@/components/share/PremiumBage";
import { ArrowDown, ArrowUp, Star } from "lucide-react";
import Image from "next/image";

interface FoodSpotCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  averageRating: number;
  priceRange: string;
  category: string[];
  location: string;
  isPremium?: boolean;
  upVotes: number;
  downVotes: number;
  totalComments: number;
  className?: string;
}

const FoodSpotCard = ({
  id,
  title,
  description,
  image,
  averageRating,
  priceRange,
  category,
  location,
  isPremium,
  upVotes,
  downVotes,
  totalComments,
  className = "",
}: FoodSpotCardProps) => {
  return (
    <div
      className={`bg-white rounded-lg overflow-hidden food-card-shadow relative ${className}`}
    >
      {/* Premium Badge */}
      {isPremium && (
        <div className="absolute top-3 left-3 z-10">
          <PremiumBadge />
        </div>
      )}

      {/* Food Image */}

      <div className="aspect-video relative overflow-hidden">
        <Image
          height={400}
          width={400}
          src={
            image ||
            "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRhY298ZW58MHx8MHx8fDA%3D"
          }
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent h-16"></div>
        <div className="absolute bottom-2 left-3 flex items-center gap-1">
          <div className="bg-white/90 rounded-full px-2 py-1 text-xs font-medium">
            {category["name"]}
          </div>
          <div className="bg-white/90 rounded-full px-2 py-1 text-xs font-medium">
            {priceRange}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-street-dark hover:text-street-orange transition-colors truncate">
            {title}
          </h3>

          <div className="flex items-center bg-street-cream rounded-full px-2 py-0.5">
            <Star className="h-4 w-4 text-street-orange fill-street-orange" />
            <span className="ml-1 text-sm font-medium">{averageRating}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>

        <div className="flex items-center mt-3 text-sm text-gray-500">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <span className="truncate">{location}</span>
        </div>

        {/* Voting and Actions */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1 text-gray-500 hover:text-street-orange transition-colors">
              <ArrowUp className="h-4 w-4" />
              <span className="text-xs font-medium">{upVotes}</span>
            </button>
            <button className="flex items-center gap-1 text-gray-500 hover:text-street-red transition-colors">
              <ArrowDown className="h-4 w-4" />
              <span className="text-xs font-medium">{downVotes}</span>
            </button>
          </div>
          <div className="text-street-orange hover:text-street-red transition-colors text-sm font-medium">
            {totalComments} comments
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodSpotCard;
