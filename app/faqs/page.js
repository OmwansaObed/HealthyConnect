"use client";
import {
  Building,
  FileText,
  HelpCircle,
  Search,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";

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
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Help <span className="text-yellow-400">Center</span>
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Find answers to common questions and learn how to make the most of
            HealthyConnect
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-0 shadow-lg focus:ring-2 focus:ring-yellow-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-blue-50 shadow-sm"
                }`}
              >
                <category.icon className="w-5 h-5 mr-2" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Help Articles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.preview}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{article.views} views</span>
                  <span>{article.helpful} found helpful</span>
                </div>
                <div className="mt-4 flex items-center text-blue-600 font-medium">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Still Need Help?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Can't find what you're looking for? Our support team is here to
            help.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 font-bold text-lg shadow-lg transition-all">
            Contact Support
          </button>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
