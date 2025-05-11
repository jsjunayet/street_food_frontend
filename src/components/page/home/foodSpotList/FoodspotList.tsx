// "use client";

// import { Button } from "@/components/ui/button";
// import { Filter, Search } from "lucide-react";
// import { useState } from "react";
// import FoodSpotCard from "./FoodSpotCard";

// // Sample data - In a real app, this would come from an API
// const foodSpots = [
//   {
//     id: "1",
//     title: "Street Taco Express",
//     description:
//       "Authentic Mexican street tacos with handmade tortillas and traditional fillings.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRhY298ZW58MHx8MHx8fDA%3D",
//     rating: 4.8,
//     priceRange: "$",
//     category: "Mexican",
//     location: "Downtown Street Market",
//     isPremium: false,
//     votes: { upvotes: 142, downvotes: 12 },
//   },
//   {
//     id: "2",
//     title: "Bangkok Noodle Cart",
//     description:
//       "Traditional Thai pad see ew noodles cooked fresh on a street cart with authentic seasonings.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGhhaSUyMG5vb2RsZXN8ZW58MHx8MHx8fDA%3D",
//     rating: 4.6,
//     priceRange: "$$",
//     category: "Thai",
//     location: "Asian Night Market",
//     isPremium: true,
//     votes: { upvotes: 98, downvotes: 5 },
//   },
//   {
//     id: "3",
//     title: "Curry in a Hurry",
//     description:
//       "Quick and delicious Indian curry served with fresh naan straight from the tandoor.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWFuJTIwY3Vycnl8ZW58MHx8MHx8fDA%3D",
//     rating: 4.5,
//     priceRange: "$$",
//     category: "Indian",
//     location: "Spice Alley",
//     isPremium: false,
//     votes: { upvotes: 76, downvotes: 8 },
//   },
//   {
//     id: "4",
//     title: "Dim Sum Delights",
//     description:
//       "Handcrafted dim sum from a multi-generational family recipe, steamed fresh to order.",
//     imageUrl:
//       "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGltJTIwc3VtfGVufDB8fDB8fHww",
//     rating: 4.9,
//     priceRange: "$$$",
//     category: "Chinese",
//     location: "Harbor Food Street",
//     isPremium: true,
//     votes: { upvotes: 221, downvotes: 14 },
//   },
// ];

// // Categories for filtering
// const categories = [
//   "All",
//   "Mexican",
//   "Thai",
//   "Indian",
//   "Chinese",
//   "Italian",
//   "Japanese",
//   "American",
// ];

// const FoodSpotList = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [showPremium, setShowPremium] = useState(false);

//   // Filter spots based on search, category, and premium status
//   const filteredSpots = foodSpots.filter((spot) => {
//     const matchesSearch =
//       spot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       spot.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory =
//       selectedCategory === "All" || spot.category === selectedCategory;
//     const matchesPremium = showPremium ? spot.isPremium : true;

//     return matchesSearch && matchesCategory && matchesPremium;
//   });

//   return (
//     <div className="py-12">
//       <h2 className="text-2xl md:text-3xl font-bold text-[#333333] mb-4">
//         Explore Food Spots
//       </h2>
//       <p className="text-gray-600 mb-8">
//         Browse through our collection of verified street food spots and find
//         your next favorite meal.
//       </p>
//       <div className="mt-8">
//         {/* Search and Filters */}
//         <div className="mb-6 space-y-4">
//           {/* Search bar */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//             <input
//               type="text"
//               placeholder="Search for street food..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6b35]"
//             />
//           </div>

//           {/* Category filters */}
//           <div className="flex flex-wrap gap-2">
//             {categories.map((category) => (
//               <Button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 variant={selectedCategory === category ? "default" : "outline"}
//                 className={
//                   selectedCategory === category
//                     ? "bg-[#FF6b35] hover:bg-[#FF6b35]/90"
//                     : "text-gray-700 border-gray-300"
//                 }
//                 size="sm"
//               >
//                 {category}
//               </Button>
//             ))}

//             <Button
//               onClick={() => setShowPremium(!showPremium)}
//               variant={showPremium ? "default" : "outline"}
//               className={`ml-auto ${
//                 showPremium
//                   ? "bg-[#FFC15E] text-black hover:bg-[#FFC15E]/90"
//                   : "text-gray-700 border-gray-300"
//               }`}
//               size="sm"
//             >
//               <Filter className="w-4 h-4 mr-1" />
//               Premium Only
//             </Button>
//           </div>
//         </div>

//         {/* Food Spots Grid */}
//         {filteredSpots.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredSpots.map((spot) => (
//               <FoodSpotCard key={spot.id} {...spot} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <h3 className="text-lg font-medium text-gray-900">
//               No food spots found
//             </h3>
//             <p className="mt-2 text-sm text-gray-500">
//               Try adjusting your search or filter criteria.
//             </p>
//           </div>
//         )}
//       </div>
//       <div className="text-center mt-12">
//         <Button className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 px-8">
//           Load More
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default FoodSpotList;
