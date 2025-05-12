"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen mt-10 md:px-0 px-2">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-semibold   ">
            AboutPage StreetFlavors
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#FFFFF] p-8 rounded-2xl shadow-lg border border-slate-200"
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center">
              <span className="w-2 h-10 bg-[#FF6b35] rounded-full mr-3"></span>
              Welcome to StreetFlavors
            </h2>
            <p className="text-lg leading-relaxed text-slate-700">
              At{" "}
              <span className="font-semibold text-purple-700">
                StreetFlavors
              </span>
              , we celebrate the authentic taste of local street food. Our
              mission is to bring you bold, vibrant flavors that remind you of
              home, culture, and tradition — all served fresh and hot, just like
              from your favorite street-side vendor.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#FFFFF] p-8 rounded-2xl shadow-lg border border-slate-200"
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center">
              <span className="w-2 h-10 bg-purple-500 rounded-full mr-3"></span>
              Our Mission
            </h2>
            <p className="text-lg leading-relaxed text-slate-700">
              Our mission is to spread joy through the delicious world of street
              food. From crispy samosas to spicy noodles, we aim to offer a wide
              variety of dishes that satisfy cravings and create memorable taste
              experiences — anytime, anywhere.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#FFFFF] p-8 rounded-2xl shadow-lg border border-slate-200 lg:col-span-2"
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center">
              <span className="w-2 h-10 bg-[#FF6b35] rounded-full mr-3"></span>
              Why Choose Us?
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Authentic Flavors",
                  description:
                    "We use traditional recipes and ingredients to serve the real taste of street food.",
                },
                {
                  title: "Wide Variety",
                  description:
                    "From fried snacks to grilled delights, our menu covers every street food favorite.",
                },
                {
                  title: "Hygienic & Fresh",
                  description:
                    "All food is prepared fresh daily with strict hygiene practices in place.",
                },
                {
                  title: "Affordable Prices",
                  description:
                    "Get great taste without breaking the bank — real street food at real prices.",
                },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="bg-white p-4 rounded-lg border border-slate-200 shadow hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">{item.description}</p>
                </motion.li>
              ))}
            </ul>
          </motion.section>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-[#FFFFF] p-8 rounded-2xl shadow-lg border border-slate-200"
        >
          <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center">
            <span className="w-2 h-10 bg-[#FF6b35] rounded-full mr-3"></span>
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Classic Street Foods",
                description:
                  "Chotpoti, fuchka, rolls, kababs, burgers — all under one roof.",
              },
              {
                title: "Fusion Dishes",
                description:
                  "Creative twists on traditional favorites for adventurous foodies.",
              },
              {
                title: "Online Ordering",
                description:
                  "Easy-to-use platform to order your favorite snacks anytime.",
              },
              {
                title: "Fast Delivery",
                description:
                  "We deliver hot and fresh street food to your doorstep in minutes.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <ArrowRight className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-purple-700 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-[#FFFFF] p-8 rounded-2xl shadow-lg border border-slate-200"
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center">
              <span className="w-2 h-10 bg-purple-500 rounded-full mr-3"></span>
              Our Vision
            </h2>
            <p className="text-lg leading-relaxed text-slate-700">
              We dream of becoming the go-to destination for street food lovers.
              By blending tradition with innovation, StreetFlavors aims to
              preserve culture while satisfying modern cravings.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-[#FFFFF] p-8 rounded-2xl shadow-lg border border-slate-200"
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-800 flex items-center">
              <span className="w-2 h-10 bg-pink-500 rounded-full mr-3"></span>
              Meet the Team
            </h2>
            <p className="text-lg leading-relaxed text-slate-700">
              Our team is a passionate group of chefs, foodies, and service
              experts dedicated to bringing you the very best in taste, quality,
              and experience — one plate at a time.
            </p>
          </motion.section>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 bg-[#FF6b35] p-8 rounded-2xl shadow-lg border border-indigo-400/20 text-center"
        >
          <h2 className="text-2xl font-bold mb-6 text-white">Get In Touch</h2>
          <p className="text-lg leading-relaxed text-white max-w-3xl mx-auto">
            Have a question or want to partner with us? Email us at{" "}
            <a
              href="mailto:hello@streetflavors.com"
              className="text-indigo-100 hover:text-white hover:underline transition-colors duration-300 font-medium"
            >
              hello@streetflavors.com
            </a>{" "}
            or visit our contact page to learn more.
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default AboutPage;
