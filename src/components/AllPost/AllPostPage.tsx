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
import { Category } from "@/types";
import { uploadImagesToCloudinary } from "@/utlity/cloudinary";
import { Filter, MapPin, Search, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import FoodPostCard, { IPost } from "./FoodPostCard";
interface IAllPostPros {
  posts: IPost[];
  categoriess: Category[];
}
const AllPostPage: React.FC<IAllPostPros> = ({ posts, categoriess }) => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostLocation, setNewPostLocation] = useState("");
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  console.log(coordinates);
  const [price, setPrice] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showPremium, setShowPremium] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [popularOnly, setPopularOnly] = useState(false);
  const [loading, setloading] = useState(false);

  const handleFileSelect = (e: any) => {
    const filesArray = Array.from(e.target.files) as File[];
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
    setloading(true);
    const uploadedUrls = await uploadImagesToCloudinary(selectedFiles);

    const payload = {
      title,
      description: newPostContent,
      price: parseFloat(price) || 0,
      location: newPostLocation,
      image:
        uploadedUrls[0] ||
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300",
      categoryId: selectedCategoryId,
    };

    const res = await createPost(payload); // এখন কোন error থাকবে না

    if (res.success) {
      toast.success("Post created!");
      setloading(false);
      setTitle("");
      setNewPostContent("");
      setPrice("");
      setNewPostLocation("");
      setSelectedCategoryId("");
      setSelectedFiles([]);
      setImagePreviewUrls([]);
    } else {
      setloading(false);
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("search");
    if (query) {
      setSearchQuery(query);
    }
  }, []);
  const filteredSpots = posts?.filter((spot) => {
    const matchesSearch =
      spot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedFilter === "All"
        ? true
        : selectedFilter === "Others"
        ? !categoriess.some((cat) => cat.id === spot.categoryId)
        : spot.categoryId === selectedFilter;

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 md:px-4 px-2">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Food Discoveries Feed
        </h1>

        {/* Create Post Card */}
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={user?.image ?? ""} />
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

            <Select
              value={selectedCategoryId}
              onValueChange={setSelectedCategoryId}
            >
              <SelectTrigger className="mb-4 w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categoriess?.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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

              <div className="self-end sm:self-auto">
                <Button
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  onClick={handleCreatePost}
                  disabled={loading || !title.trim() || !newPostContent.trim()}
                >
                  {loading ? "Posting...." : "Post"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filter Bar */}
        <div className="mb-6 space-y-4 bg-white p-6 rounded-lg border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setSelectedFilter("All")}
              variant={selectedFilter === "All" ? "default" : "outline"}
            >
              All
            </Button>
            {categoriess?.map((cat) => (
              <Button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                variant={selectedFilter === cat.id ? "default" : "outline"}
              >
                {cat.name}
              </Button>
            ))}
          </div>

          <div>
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
              🔥 Popular Only 5+
            </Button>
            <Button
              onClick={() => setShowPremium(!showPremium)}
              variant={showPremium ? "default" : "outline"}
              size="sm"
            >
              <Filter className="w-4 h-4 mr-1" />
              Premium Only
            </Button>
          </div>
        </div>

        {/* Posts Feed */}
        {filteredSpots?.length > 0 ? (
          <div className="space-y-6">
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

        {/* Manual Location Dialog */}
        <Dialog open={locationDialogOpen} onOpenChange={setLocationDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter Your Location</DialogTitle>
              <DialogDescription>
                Couldn&apos;t detect location. Please enter manually.
              </DialogDescription>
            </DialogHeader>
            <Input
              value={newPostLocation}
              onChange={(e) => setNewPostLocation(e.target.value)}
              placeholder="e.g. New Market, Dhaka"
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
