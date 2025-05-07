import Category from "@/components/page/home/Category";
import FoodSpotList from "@/components/page/home/foodSpotList/FoodspotList";
import GoPremium from "@/components/page/home/GoPremium";
import FeaturedSpots from "@/components/page/home/hero/FeatureSport";
import HeroSection from "@/components/page/home/hero/Hero";
import Footer from "@/components/share/Footer";
import Navbar from "@/components/share/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <div className=" max-w-7xl mx-auto py-12">
          <FeaturedSpots />
          <Category />

          <FoodSpotList />

          <GoPremium />
        </div>
      </main>

      <Footer />
    </div>
  );
}
