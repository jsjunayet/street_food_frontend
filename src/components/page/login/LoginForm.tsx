"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      console.log("Email:", email);
      console.log("Password:", password);
      setEmail("");
      setPassword("");
    } else {
      console.log("Please fill in all fields");
    }
  };

  const handleDefaultLogin = (type: "admin" | "user" | "premium") => {
    if (type === "admin") {
      setEmail("admin@example.com");
      setPassword("admin123");
    } else if (type === "user") {
      setEmail("user@example.com");
      setPassword("user123");
    } else if (type === "premium") {
      setEmail("premium@example.com");
      setPassword("premium123");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full border">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#333333]">
          Welcome Back
        </h2>

        {/* === New Buttons === */}
        <div className="mb-6 grid grid-cols-3 gap-2">
          <Button
            type="button"
            onClick={() => handleDefaultLogin("admin")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Admin
          </Button>
          <Button
            type="button"
            onClick={() => handleDefaultLogin("user")}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            User
          </Button>
          <Button
            type="button"
            onClick={() => handleDefaultLogin("premium")}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Premium
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6b35]"
              placeholder="youremail@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-[#FF6b35] hover:text-[#D64933]"
              >
                Forgot Password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6b35]"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FF6b35] hover:bg-[#FF6b35]/90"
          >
            Log In
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#FF6b35] hover:text-[#D64933]"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
