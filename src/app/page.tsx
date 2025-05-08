import Category from "@/components/page/home/Category";
import GoPremium from "@/components/page/home/GoPremium";
import FeaturedSpots from "@/components/page/home/hero/FeatureSport";
import HeroSection from "@/components/page/home/hero/Hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HeroSection />
        <div className=" max-w-7xl mx-auto py-12">
          <FeaturedSpots />
          <Category />

          {/* <FoodSpotList /> */}

          <GoPremium />
        </div>
      </main>
    </div>
  );
}
