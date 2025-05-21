"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Faqpage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Enhanced FAQ data with more street food discovery related questions
  const faqItems = [
    {
      question: "What is StreetGrub?",
      answer:
        "StreetGrub is a platform that connects food lovers with the best street food vendors, food trucks, and pop-up restaurants in their area. We provide reviews, locations, menus, and community discussions around your local street food scene.",
      category: "general",
    },
    {
      question: "How do I create an account?",
      answer:
        "Creating an account is easy! Click the 'Sign Up' button in the top right corner of the homepage. You can sign up using your email address and password. Follow the prompts to complete your profile setup.",
      category: "account",
    },
    {
      question:
        "What's the difference between Premium and Standard memberships?",
      answer:
        "Premium members enjoy exclusive benefits including access to secret food spots, special vendor discounts, no ads, advanced reservation capabilities for popular vendors, and monthly credits for orders. Premium membership costs $5.99/month or $59.99/year.",
      category: "membership",
    },
    {
      question: "How do I upgrade to a Premium account?",
      answer:
        "To upgrade to Premium, navigate to your profile page and click on the 'Upgrade to Premium' button. You'll be directed to our secure payment gateway where you can complete your subscription purchase. Once payment is confirmed, your account will be instantly upgraded.",
      category: "membership",
    },
    {
      question: "Can I post my own food discoveries?",
      answer:
        "Yes! After creating an account, you can share your street food discoveries by clicking the 'Post Discovery' button on the homepage or your profile. Include a title, description, location, price range, photos, and select a category. Your post will be reviewed by our admin team before going live.",
      category: "posting",
    },
    {
      question: "How long does it take for my post to be approved?",
      answer:
        "Our admin team typically reviews posts within 24-48 hours. Once approved, your post will appear on the platform. If rejected, you'll receive a notification with the reason, allowing you to make corrections and resubmit if appropriate.",
      category: "posting",
    },
    {
      question: "How do I find food spots near me?",
      answer:
        "Simply use the search feature on our homepage or open the map view. You can filter by cuisine type, distance, price range, and current availability. Our real-time tracking also shows you which trucks are currently open and serving.",
      category: "usage",
    },
    {
      question: "Is StreetGrub available in my city?",
      answer:
        "StreetGrub is rapidly expanding! We currently operate in over 50 major cities across North America, Europe, and Asia. Check our 'Locations' page to see if your city is covered. If not, join our waitlist and we'll notify you when we launch in your area.",
      category: "service",
    },
    {
      question: "How does the voting system work?",
      answer:
        "Each food spot can be upvoted or downvoted by registered users. This helps the community identify the most popular and well-loved vendors. You can also leave detailed reviews with a star rating (1-5) to provide more context about your experience.",
      category: "usage",
    },
    {
      question: "Why can't I see certain food posts?",
      answer:
        "Some exceptionally unique or exclusive food spots are marked as 'Premium Content' and are only visible to our Premium subscribers. This helps support our platform while providing additional value to our Premium members.",
      category: "content",
    },
    {
      question: "How do vendors join StreetGrub?",
      answer:
        "Food vendors can apply through our 'Vendor Portal' section. We review applications to ensure quality standards, require proper licensing documentation, and conduct a brief orientation. Once approved, vendors can manage their profile, update menus, announce locations, and interact with customers.",
      category: "vendors",
    },
    {
      question: "Are the reviews verified?",
      answer:
        "Yes, all reviews on StreetGrub are from verified customers who have checked in or ordered from the vendor through our platform. This helps maintain review integrity and provides authentic feedback for both customers and vendors.",
      category: "usage",
    },
    {
      question: "How do I report an issue with an order or vendor?",
      answer:
        "You can report issues through the 'Help' section in your account dashboard. For order-specific problems, navigate to your order history and select 'Report an Issue.' We aim to respond to all reports within 24 hours.",
      category: "support",
    },
    {
      question: "Can I order food for delivery through StreetGrub?",
      answer:
        "Yes, many of our vendors offer delivery options. When browsing vendors, look for the delivery icon to see if delivery is available. Delivery radius and fees vary by vendor and location.",
      category: "service",
    },
    {
      question: "How do I update my dietary preferences?",
      answer:
        "You can update your dietary preferences in your account settings under 'Food Preferences.' This helps us customize recommendations and filter options that match your dietary needs such as vegetarian, vegan, gluten-free, or allergen concerns.",
      category: "account",
    },
  ];

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "general", name: "General" },
    { id: "account", name: "Account" },
    { id: "service", name: "Services" },
    { id: "usage", name: "Using StreetGrub" },
    { id: "membership", name: "Membership" },
    { id: "posting", name: "Posting Content" },
    { id: "content", name: "Premium Content" },
    { id: "vendors", name: "For Vendors" },
    { id: "support", name: "Support" },
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFAQs = faqItems.filter(
    (item) =>
      (activeCategory === "all" || item.category === activeCategory) &&
      (searchQuery === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-streetgrub-darkblue mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Find answers to common questions about StreetGrub, our services,
              and how to make the most of your street food discovery experience.
            </p>
          </div>

          <div className="mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for answers..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    activeCategory === category.id ? "default" : "outline"
                  }
                  className={`text-sm ${
                    activeCategory === category.id
                      ? " bg-[#EB6535] hover:bg-[#EB6535]/90"
                      : ""
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-lg text-gray-500">
                  No matching questions found.
                </p>
                <Button
                  className="mt-4 bg-streetgrub-orange hover:bg-streetgrub-orange/90"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-lg font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      <p className="pt-2 pb-4">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>

          <div className="mt-12 bg-streetgrub-lightgray p-6 rounded-lg border text-center">
            <h3 className="text-xl font-semibold text-streetgrub-darkblue mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-4">
              Our support team is here to help you with any questions or
              concerns you may have.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-[#EB6535] hover:bg-[#EB6535]/90">
                Contact Support
              </Button>
              <Button variant="outline">Submit a Request</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqpage;
