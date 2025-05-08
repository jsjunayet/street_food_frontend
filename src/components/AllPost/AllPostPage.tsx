"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/UserContext";
import { createPost } from "@/services/postService";
import { uploadImagesToCloudinary } from "@/utlity/cloudinary";
import { Filter, MapPin, Search, Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import FoodPostCard from "./FoodPostCard";
const categories = [
  "All",
  "Mexican",
  "Thai",
  "Indian",
  "Chinese",
  "Italian",
  "Japanese",
  "American",
];
const AllPostPage = ({ posts, categoriess }) => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostLocation, setNewPostLocation] = useState("");
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [price, setPrice] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState("");

  const fileInputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPremium, setShowPremium] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]); // min and max prices
  const [popularOnly, setPopularOnly] = useState(false); // show only posts with 5+ upvotes

  // Filter spots based on search, category, and premium status
  const filteredSpots = posts.filter((spot) => {
    const matchesSearch =
      spot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || spot.category === selectedCategory;

    const matchesPremium = showPremium ? spot.isPremium : true;

    const matchesPrice =
      !spot.price ||
      (spot.price >= priceRange[0] && spot.price <= priceRange[1]);

    const matchesPopularity = popularOnly ? (spot.upVotes || 0) >= 5 : true;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPremium &&
      matchesPrice &&
      matchesPopularity
    );
  });

  const handleFileSelect = (e) => {
    const filesArray = Array.from(e.target.files);
    if (filesArray.length > 4) {
      toast.error("You can only upload up to 4 images");
      return;
    }
    setSelectedFiles(filesArray);
    const newImageUrls = filesArray.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls(newImageUrls);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });

          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          )
            .then((res) => res.json())
            .then((data) => {
              const locationName =
                data.address.city ||
                data.address.town ||
                data.address.suburb ||
                "Current location";
              setNewPostLocation(locationName);
              toast.success(`Location detected: ${locationName}`);
            })
            .catch(() => {
              setNewPostLocation(
                `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`
              );
              toast.success("Coordinates detected");
            });
        },
        () => {
          toast.error("Couldn't access your location");
          setLocationDialogOpen(true);
        }
      );
    } else {
      toast.error("Geolocation is not supported");
      setLocationDialogOpen(true);
    }
  };

  const handleCreatePost = async () => {
    const uploadedUrls = await uploadImagesToCloudinary(selectedFiles);

    const payload = {
      title,
      description: newPostContent,
      price: parseFloat(price) || 0,
      location: newPostLocation,
      image:
        uploadedUrls[0] ||
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300",
      categoryId: selectedCategory,
    };
    console.log(payload);

    const res = await createPost(payload);
    console.log(res);
    toast.success("Post created!");
    setTitle("");
    setNewPostContent("");
    setPrice("");
    setNewPostLocation("");
    setSelectedCategory("");
    setSelectedFiles([]);
    setImagePreviewUrls([]);
    // Optionally reset form
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Food Discoveries Feed
        </h1>

        {/* Create Post Card */}
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={user?.image} />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">Share your food discovery</h3>
                {newPostLocation && (
                  <div className="text-sm text-gray-500 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {newPostLocation}
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Input
              className="mb-4"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Textarea
              className="mb-4"
              placeholder="Describe the food you discovered..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />

            <Input
              className="mb-4"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            {/* shadcn Select */}

            <Select
              className=" "
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="mb-4 w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Image Previews */}
            {imagePreviewUrls.length > 0 && (
              <div className="mb-4 grid grid-cols-2 gap-2">
                {imagePreviewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative h-32 rounded overflow-hidden"
                  >
                    <Image
                      height={500}
                      width={500}
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                      onClick={() => {
                        setImagePreviewUrls(
                          imagePreviewUrls.filter((_, i) => i !== index)
                        );
                        setSelectedFiles(
                          selectedFiles.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              {/* Button group */}
              <div className="flex flex-wrap gap-2">
                <Input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                />
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" /> Photo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={getCurrentLocation}
                >
                  📍 Use Current Location
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLocationDialogOpen(true)}
                >
                  ✍️ Enter Manually
                </Button>
              </div>

              {/* Post button */}
              <div className="self-end sm:self-auto">
                <Button
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  onClick={handleCreatePost}
                  disabled={!title.trim() || !newPostContent.trim()}
                >
                  Post
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filtering Post Card */}
        <div className="mt-8 ">
          {/* Search and Filters */}
          <div className="mb-6 space-y-4 bg-[#FFFFFF] p-6 rounded-lg border">
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for street food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6b35]"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  className={
                    selectedCategory === category
                      ? "bg-[#FF6b35] hover:bg-[#FF6b35]/90"
                      : "text-gray-700 border-gray-300"
                  }
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
            <div>
              <div className=" space-x-4">
                <label className="text-sm">Price Range:</label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <span>
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </div>

              <div className="flex gap-2 mt-2">
                <Button
                  variant={popularOnly ? "default" : "outline"}
                  onClick={() => setPopularOnly(!popularOnly)}
                  size="sm"
                >
                  🔥 Popular Only
                </Button>

                <Button
                  onClick={() => setShowPremium(!showPremium)}
                  variant={showPremium ? "default" : "outline"}
                  className={`ml-auto ${
                    showPremium
                      ? "bg-[#FFC15E] text-black hover:bg-[#FFC15E]/90"
                      : "text-gray-700 border-gray-300"
                  }`}
                  size="sm"
                >
                  <Filter className="w-4 h-4 mr-1" />
                  Premium Only
                </Button>
              </div>
            </div>
          </div>

          {/* Food Spots Grid */}
          {filteredSpots.length > 0 ? (
            <div className="">
              {filteredSpots.map((post) => (
                <FoodPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">
                No food spots found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>

        {/* Post Feed */}
        {/* <div className="space-y-6">
          {posts?.map((post) => (
            <FoodPostCard key={post.id} post={post} />
          ))}
        </div> */}

        {/* Manual Location Dialog */}
        <Dialog open={locationDialogOpen} onOpenChange={setLocationDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter Your Location</DialogTitle>
              <DialogDescription>
                We couldn't detect your location automatically. Please enter it
                manually.
              </DialogDescription>
            </DialogHeader>
            <Input
              value={newPostLocation}
              onChange={(e) => setNewPostLocation(e.target.value)}
              placeholder="e.g. Downtown Market, Dhaka"
            />
            <DialogFooter>
              <Button onClick={() => setLocationDialogOpen(false)}>Done</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AllPostPage;
