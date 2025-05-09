import Category from "@/components/page/home/Category";
import GoPremium from "@/components/page/home/GoPremium";
import FeaturedSpots from "@/components/page/home/hero/FeatureSport";
import HeroSection from "@/components/page/home/hero/Hero";
import { singleUserget } from "@/services/AuthService";

export default async function Home() {
  const res = await singleUserget();
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HeroSection />
        <div className=" max-w-7xl mx-auto py-12">
          <FeaturedSpots user={res.data} />
          <Category />

          {/* <FoodSpotList /> */}

          <GoPremium />
        </div>
      </main>
    </div>
  );
}
