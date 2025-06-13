"use client";
import {
  Building,
  FileText,
  HelpCircle,
  Search,
  Star,
  Users,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  staggerContainer,
  textVariant,
  fadeIn,
  slideIn,
} from "../../utils/motion";

// Help Center Component
const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Topics", icon: HelpCircle },
    { id: "getting-started", name: "Getting Started", icon: Star },
    { id: "job-search", name: "Job Search", icon: Search },
    { id: "applications", name: "Applications", icon: FileText },
    { id: "account", name: "Account", icon: Users },
    { id: "facilities", name: "For Facilities", icon: Building },
  ];

  const helpArticles = [
    {
      id: 1,
      title: "How to create your HealthyConnect profile",
      category: "getting-started",
      views: 1250,
      helpful: 45,
      preview: "Step-by-step guide to setting up your professional profile...",
    },
    {
      id: 2,
      title: "Tips for writing an effective healthcare CV",
      category: "getting-started",
      views: 980,
      helpful: 38,
      preview: "Best practices for showcasing your healthcare experience...",
    },
    {
      id: 3,
      title: "How to search and filter job opportunities",
      category: "job-search",
      views: 2100,
      helpful: 67,
      preview: "Use our advanced search features to find your perfect role...",
    },
    {
      id: 4,
      title: "Understanding the application process",
      category: "applications",
      views: 1450,
      helpful: 52,
      preview: "What happens after you submit your application...",
    },
    {
      id: 5,
      title: "Managing your account settings",
      category: "account",
      views: 875,
      helpful: 31,
      preview: "How to update your profile, preferences, and notifications...",
    },
    {
      id: 6,
      title: "How to post job openings (For Facilities)",
      category: "facilities",
      views: 650,
      helpful: 28,
      preview: "Guide for healthcare facilities to post job opportunities...",
    },
  ];

  const filteredArticles = helpArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.preview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        className="bg-blue-600 py-20"
        initial="hidden"
        animate="show"
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-5xl font-bold text-white mb-6"
            variants={textVariant(0.1)}
          >
            Help <span className="text-yellow-400">Center</span>
          </motion.h1>

          <motion.p
            className="text-xl text-green-100 mb-8 max-w-3xl mx-auto"
            variants={textVariant(0.2)}
          >
            Find answers to common questions and learn how to make the most of
            HealthyConnect
          </motion.p>

          {/* Search Bar */}
          <motion.div
            className="max-w-2xl mx-auto relative"
            variants={fadeIn("up", "tween", 0.3, 0.6)}
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-0 shadow-lg focus:ring-2 focus:ring-yellow-400 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Categories */}
      <motion.section
        className="py-12 bg-gray-50"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={staggerContainer(0.1, 0.1)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            variants={staggerContainer(0.1, 0)}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-blue-50 shadow-sm"
                }`}
                variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon className="w-5 h-5 mr-2" />
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Help Articles */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer(0.1, 0)}
          >
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.h3
                  className="text-xl font-bold text-gray-900 mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {article.title}
                </motion.h3>

                <motion.p
                  className="text-gray-600 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {article.preview}
                </motion.p>

                <motion.div
                  className="flex items-center justify-between text-sm text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <span>{article.views} views</span>
                  <span>{article.helpful} found helpful</span>
                </motion.div>

                <motion.div
                  className="mt-4 flex items-center text-blue-600 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                  whileHover={{ x: 5 }}
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Support */}
      <motion.section
        className="py-20 bg-blue-600"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl font-bold text-white mb-6"
            variants={textVariant(0.1)}
          >
            Still Need Help?
          </motion.h2>

          <motion.p
            className="text-xl text-blue-100 mb-8"
            variants={textVariant(0.2)}
          >
            Can&apos;t find what you&apos;re looking for? Our support team is
            here to help.
          </motion.p>

          <motion.button
            className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 font-bold text-lg shadow-lg transition-all"
            variants={fadeIn("up", "spring", 0.3, 0.6)}
            whileHover={{
              scale: 1.05,
              y: -3,
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default HelpCenter;
