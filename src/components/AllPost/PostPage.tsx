// "use client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { getAllPost } from "@/services/postService";
// import { Search } from "lucide-react";
// import { useEffect, useState } from "react";
// import FilterSidebar from "./FilterSidebar";
// import FoodPostCard from "./FoodPostCard";
// // import { getAllPost } from "@/services/postService";
// // interface IAllPostPros {
// //   posts: IPost[];
// //   categoriess: Category[];
// // }
// const AllPosts = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const result = await getAllPost();
//         setPosts(result?.data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   console.log(posts);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [filters, setFilters] = useState<Filters>({
//     search: "",
//     categories: [],
//     priceRange: [],
//     rating: null,
//     sortBy: "popular",
//   });
//   // Apply filters to food spots
//   const filteredSpots = posts?.filter((spot) => {
//     // Search filter
//     if (
//       filters.search &&
//       !spot.title.toLowerCase().includes(filters.search.toLowerCase())
//     ) {
//       return false;
//     }

//     // Category filter
//     if (
//       filters.categories.length > 0 &&
//       !filters.categories.includes(spot.category)
//     ) {
//       return false;
//     }

//     // Price range filter
//     if (
//       filters.priceRange.length > 0 &&
//       !filters.priceRange.includes(spot.price)
//     ) {
//       return false;
//     }

//     // Rating filter
//     if (filters.rating !== null && spot.rating < filters.rating) {
//       return false;
//     }

//     return true;
//   });

//   // Sort food spots
//   const sortedSpots = [...filteredSpots].sort((a, b) => {
//     switch (filters.sortBy) {
//       case "popular":
//         return b.rating - a.rating;
//       case "newest":
//         // Assuming each spot has an id that increases with newer spots
//         return b.id - a.id;
//       case "price-low":
//         return a.price.length - b.price.length;
//       case "price-high":
//         return b.price.length - a.price.length;
//       default:
//         return 0;
//     }
//   });

//   return (
//     <div className=" max-w-7xl mx-auto px-4 py-8 md:py-12">
//       <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">
//             Explore Food Spots
//           </h1>
//           <p className="text-muted-foreground mt-1">
//             Discover amazing street food spots shared by our community
//           </p>
//         </div>

//         <div className="flex w-full md:w-auto gap-2">
//           <div className="relative w-full md:w-[300px]">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search food spots..."
//               className="pl-8 pr-4"
//               value={filters.search}
//               onChange={(e) =>
//                 setFilters({ ...filters, search: e.target.value })
//               }
//             />
//           </div>
//           <Button
//             variant="outline"
//             onClick={() => setIsFilterOpen(!isFilterOpen)}
//             className="md:hidden"
//           >
//             Filter
//           </Button>
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Sidebar Filter - Hidden on mobile unless toggled */}
//         <div
//           className={`${
//             isFilterOpen ? "block" : "hidden"
//           } md:block w-full md:w-64 lg:w-72 shrink-0`}
//         >
//           <FilterSidebar
//             filters={filters}
//             setFilters={setFilters}
//             onClose={() => setIsFilterOpen(false)}
//           />
//         </div>

//         {/* Main Content */}
//         <div className="flex-1">
//           {/* Results info */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white border p-4 rounded-xl">
//             <p className="text-sm text-muted-foreground mb-2 sm:mb-0">
//               Showing {sortedSpots.length} of {posts.length} food spots
//             </p>

//             <div className="flex items-center gap-2">
//               <span className="text-sm text-muted-foreground">Sort by:</span>
//               <select
//                 value={filters.sortBy}
//                 onChange={(e) =>
//                   setFilters({ ...filters, sortBy: e.target.value })
//                 }
//                 className="text-sm border rounded py-1 px-2"
//               >
//                 <option value="popular">Most Popular</option>
//                 <option value="newest">Newest</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//               </select>
//             </div>
//           </div>

//           {/* Post Grid */}
//           {sortedSpots.map((post) => (
//             <FoodPostCard key={post.id} post={post} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllPosts;
