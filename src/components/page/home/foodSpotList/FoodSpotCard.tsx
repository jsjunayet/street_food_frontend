import PremiumBadge from "@/components/share/PremiumBage";
import { ArrowDown, ArrowUp, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface FoodSpotCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  priceRange: string;
  category: string;
  location: string;
  isPremium?: boolean;
  votes: {
    upvotes: number;
    downvotes: number;
  };
  className?: string;
}

const FoodSpotCard = ({
  id,
  title,
  description,
  imageUrl,
  rating,
  priceRange,
  category,
  location,
  isPremium = false,
  votes,
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
      <Link href={`/food/${id}`}>
        <div className="aspect-video relative overflow-hidden">
          <Image
            height={400}
            width={400}
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent h-16"></div>
          <div className="absolute bottom-2 left-3 flex items-center gap-1">
            <div className="bg-white/90 rounded-full px-2 py-1 text-xs font-medium">
              {category}
            </div>
            <div className="bg-white/90 rounded-full px-2 py-1 text-xs font-medium">
              {priceRange}
            </div>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link href={`/food/${id}`}>
            <h3 className="text-lg font-bold text-street-dark hover:text-street-orange transition-colors truncate">
              {title}
            </h3>
          </Link>
          <div className="flex items-center bg-street-cream rounded-full px-2 py-0.5">
            <Star className="h-4 w-4 text-street-orange fill-street-orange" />
            <span className="ml-1 text-sm font-medium">
              {rating.toFixed(1)}
            </span>
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
              <span className="text-xs font-medium">{votes.upvotes}</span>
            </button>
            <button className="flex items-center gap-1 text-gray-500 hover:text-street-red transition-colors">
              <ArrowDown className="h-4 w-4" />
              <span className="text-xs font-medium">{votes.downvotes}</span>
            </button>
          </div>
          <Link
            href={`/food/${id}`}
            className="text-street-orange hover:text-street-red transition-colors text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodSpotCard;
