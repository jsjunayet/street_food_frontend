"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

// Define background images with high-quality food photography
const heroBackgrounds = [
  {
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    title: "Discover Authentic Street Food",
  },
  {
    url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    title: "Experience Local Culinary Treasures",
  },
  {
    url: "https://t3.ftcdn.net/jpg/05/42/04/64/360_F_542046471_kusFXMbS8gBCXjFGAJVZ0fhUOfzxeXGQ.jpg",
    title: "Find Hidden Food Gems",
  },
];

const HeroSection: React.FC = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [titleVisible, setTitleVisible] = useState(true);
  const [currentTitle, setCurrentTitle] = useState(heroBackgrounds[0].title);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle slide changes with coordinated animations
  const handleSlideChange = useCallback(
    (index: number) => {
      if (timerRef.current) clearTimeout(timerRef.current);

      const nextIndex = index >= heroBackgrounds.length ? 0 : index;

      setTitleVisible(false);

      setTimeout(() => {
        setCurrentTitle(heroBackgrounds[nextIndex].title);
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          setTitleVisible(true);
        }, 300);
      }, 500);

      setTimeout(() => {
        setCurrentBg(nextIndex);
        timerRef.current = setTimeout(() => {
          handleSlideChange(nextIndex + 1);
        }, 7000);
      }, 1000);
    },
    [setCurrentTitle, setCurrentBg]
  );
  useEffect(() => {
    const autoRotate = () => {
      timerRef.current = setTimeout(() => {
        handleSlideChange(
          currentBg + 1 >= heroBackgrounds.length ? 0 : currentBg + 1
        );
      }, 7000);
    };

    autoRotate();

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentBg, handleSlideChange]);

  return (
    <div className="relative bg-black text-white overflow-hidden min-h-screen">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {heroBackgrounds.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              currentBg === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="w-full h-full overflow-hidden">
              <Image
                src={bg.url}
                height={800}
                width={100}
                alt={`Food Scene ${index + 1}`}
                className={`w-full h-full object-cover ${
                  currentBg === index ? "animate-zoom" : ""
                }`}
              />
            </div>
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"></div>
      </div>

      {/* Carousel Navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {heroBackgrounds.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentBg === index
                ? "bg-orange-500 w-10"
                : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center py-0 xl:py-32 px-4 container mx-auto min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo Animation */}
          <div className="flex justify-center xl:mb-8 mb-6 animate-float">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-4 border border-orange-500/30">
              <div className="xl:text-5xl text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Food Fusion
              </div>
            </div>
          </div>

          {/* Title Animation with Skeleton Loading */}
          <div className="h-20 md:h-24 flex justify-center items-center mb-6">
            {isLoading ? (
              <div className="animate-pulse w-full max-w-2xl mx-auto">
                <Skeleton className="h-10 md:h-14 w-3/4 mx-auto rounded-md bg-white/10 mb-2" />
                <Skeleton className="h-10 md:h-14 w-1/2 mx-auto rounded-md bg-white/10" />
              </div>
            ) : (
              <h1
                className={`text-4xl md:text-6xl font-bold transition-all duration-500 ease-in-out ${
                  titleVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-8"
                }`}
              >
                {currentTitle}
              </h1>
            )}
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-200 xl:mb-10 mb-6  max-w-2xl mx-auto ">
            Find the best hidden food gems, share your discoveries, and unlock
            premium spots with our community of food lovers around the world.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative animate-fade-in backdrop-blur-sm bg-white/10 rounded-full p-1 border border-white/20">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for street food or location..."
              className="w-full pl-14 pr-32 py-5 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/90"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-full px-6 py-6 text-white">
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
