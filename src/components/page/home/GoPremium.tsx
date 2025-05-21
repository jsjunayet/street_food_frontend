import { Button } from "@/components/ui/button";
import Link from "next/link";

const GoPremium = () => {
  return (
    <div className="pt-14">
      <div className="bg-[#333333]  rounded-xl overflow-hidden">
        <div className="relative py-12 px-6 md:p-12">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B35]/10 rounded-full -translate-y-1/3 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFC15E]/10 rounded-full translate-y-1/3 -translate-x-1/3"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
              Become a Premium Member Today!
            </h2>
            <p className="text-gray-300 mb-8">
              Unlock exclusive food spots, get priority access to new listings,
              and support our community of food enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={"/premium"}>
                <Button className="bg-[#FFC15E] cursor-pointer text-black hover:bg-[#FFC15E]/90 px-8 py-6 text-lg">
                  Go Premium
                </Button>
              </Link>
              <Button
                variant="outline"
                className="bg-[#FF6B35] text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoPremium;
