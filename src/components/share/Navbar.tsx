"use client";
import { Button } from "@/components/ui/button";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuAnimating(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsMenuAnimating(false);
      }, 300);
    } else {
      setIsMenuOpen(true);
    }
  };

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-[#FF6b35] rounded-full p-1">
            <div className="w-6 h-6 text-white flex items-center justify-center font-bold">
              SG
            </div>
          </div>
          <span className="text-xl font-poppins font-bold  font-serif text-[#333333]">
            StreetGrub
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className=" font-serif text-[#333333] hover:text-[#FF6b35] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/explore"
            className=" font-serif text-[#333333] hover:text-[#FF6b35] transition-colors"
          >
            Explore
          </Link>
          <Link
            href="/categories"
            className=" font-serif text-[#333333] hover:text-[#FF6b35] transition-colors"
          >
            Categories
          </Link>
          <Link
            href="/premium"
            className=" font-serif text-[#333333] hover:text-[#FF6b35] transition-colors"
          >
            Premium
          </Link>
        </div>

        {/* Desktop Search & Auth */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className=" font-serif text-[#333333] border-gray-200"
          >
            <Search className="h-4 w-4" />
          </Button>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/profile">
                <div className="w-9 h-9 rounded-full bg-[#FFC15E]  font-serif text-[#333333] flex items-center justify-center">
                  JD
                </div>
              </Link>
              <Button
                variant="ghost"
                onClick={() => setIsLoggedIn(false)}
                className=" font-serif text-[#333333]"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => setIsLoggedIn(true)}
                className=" font-serif text-[#333333]"
              >
                Login
              </Button>
              <Link href={"/signup"}>
                <Button className="bg-[#FF6b35] text-white hover:bg-[#FF6b35]/90">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden  font-serif text-[#333333]"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu with Animation */}
      {(isMenuOpen || isMenuAnimating) && (
        <div
          className={`md:hidden bg-white shadow-lg py-4 px-5 absolute w-full transition-all duration-300 ease-in-out ${
            isMenuAnimating
              ? "animate-slide-out opacity-0"
              : "animate-slide-in opacity-100"
          }`}
        >
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className=" font-serif text-[#333333] hover:text-[#FF6b35] transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/explore"
              className=" font-serif text-[#333333] hover:text-[#FF6b35] transition-colors"
              onClick={toggleMenu}
            >
              Explore
            </Link>
            <Link
              href="/categories"
              className=" font-serif text-[#333333] hover:text-[#FF6b35] transition-colors"
              onClick={toggleMenu}
            >
              Categories
            </Link>
            <Link
              href="/premium"
              className=" font-serif text-[#333333] hover:text-[#FF6b35] transition-colors"
              onClick={toggleMenu}
            >
              Premium
            </Link>

            <div className="pt-2 border-t border-gray-100">
              {isLoggedIn ? (
                <div className="flex flex-col space-y-3">
                  <Link
                    href="/profile"
                    onClick={toggleMenu}
                    className="flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FFC15E]  font-serif text-[#333333] flex items-center justify-center">
                      JD
                    </div>
                    <span>Profile</span>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsLoggedIn(false);
                      toggleMenu();
                    }}
                    className="justify-start p-0  font-serif text-[#333333] hover:text-[#FF6b35]"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsLoggedIn(true);
                      toggleMenu();
                    }}
                    className="justify-start p-0  font-serif text-[#333333] hover:text-[#FF6b35]"
                  >
                    Login
                  </Button>
                  <Link href={"/signup"}>
                    <Button className="bg-[#FF6b35] text-white hover:bg-[#FF6b35]/90 w-full">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
