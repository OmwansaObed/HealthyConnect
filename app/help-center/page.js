"use client";
import {
  Building,
  FileText,
  HelpCircle,
  Search,
  Star,
  Users,
  ArrowRight,
  X,
  Calendar,
  Tag,
  Clock,
  Folder,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock motion variants since we don't have framer-motion
const MotionDiv = ({
  children,
  className,
  variants,
  initial,
  animate,
  whileInView,
  viewport,
  whileHover,
  whileTap,
  onClick,
  ...props
}) => (
  <div className={className} onClick={onClick} {...props}>
    {children}
  </div>
);

const MotionButton = ({
  children,
  className,
  variants,
  initial,
  animate,
  whileHover,
  whileTap,
  onClick,
  ...props
}) => (
  <button className={className} onClick={onClick} {...props}>
    {children}
  </button>
);

const MotionSection = ({
  children,
  className,
  variants,
  initial,
  animate,
  whileInView,
  viewport,
  ...props
}) => (
  <section className={className} {...props}>
    {children}
  </section>
);

const MotionH1 = ({ children, className, variants }) => (
  <h1 className={className}>{children}</h1>
);

const MotionH2 = ({ children, className, variants }) => (
  <h2 className={className}>{children}</h2>
);

const MotionH3 = ({
  children,
  className,
  variants,
  initial,
  animate,
  transition,
}) => <h3 className={className}>{children}</h3>;

const MotionP = ({
  children,
  className,
  variants,
  initial,
  animate,
  transition,
}) => <p className={className}>{children}</p>;

// Help Center Component
const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      preview: "Step-by-step guide to setting up your professional profile...",
      content:
        "Creating your HealthyConnect profile is the first step to finding your dream healthcare job. Start by signing up for an account, then fill out your basic information including your healthcare specialization. Keep your profile updated with any new qualifications or experiences to attract more job opportunities.",
      dateAdded: "2024-01-15",
      tags: ["profile", "setup", "beginner"],
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Tips for writing an effective healthcare CV",
      category: "getting-started",

      preview: "Best practices for showcasing your healthcare experience...",
      content:
        "Your healthcare CV should tell a compelling story of your professional journey. Start with a strong professional summary that highlights your specialties and achievements. Use bullet points to describe your responsibilities and quantify your accomplishments wherever possible. Include relevant certifications, continuing education, and any specialized training that sets you apart. Remember to tailor your CV for each application, focusing on the skills and experiences that are most relevant to the job you're applying for.",
      dateAdded: "2024-01-20",
      tags: ["cv", "resume", "writing", "tips"],
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "How to search and filter job opportunities",
      category: "job-search",

      preview: "Use our advanced search features to find your perfect role...",
      content:
        "Our advanced search functionality helps you find exactly what you're looking for. Use location filters to find jobs near you, salary ranges to match your expectations, and experience level filters to find appropriate positions. Save your searches to get notifications when new matching jobs are posted.",
      dateAdded: "2024-01-25",
      tags: ["search", "filters", "jobs", "opportunities"],
      readTime: "4 min read",
    },
    {
      id: 4,
      title: "Understanding the application process",
      category: "applications",

      preview: "What happens after you submit your application...",
      content:
        "After submitting your application, it goes through several stages. First, our system checks if you meet the basic requirements. Then, the hiring facility rerofile and CV. If selected, you'll receive an interview invitation. Throughout this process, you can track your application status in your dashboard. This feature is currently in beta and will be fully available soon.",
      dateAdded: "2024-02-01",
      tags: ["application", "process", "hiring", "interview"],
      readTime: "6 min read",
    },
    {
      id: 5,
      title: "Managing your account settings",
      category: "account",

      preview: "How to update your profile, preferences, and notifications...",
      content:
        "Keep your account up to date to ensure you don't miss opportunities. In your account settings, you can update your contact information, change your password, and manage your privacy settings. We recommend reviewing these settings monthly.",
      dateAdded: "2024-02-05",
      tags: ["account", "settings", "profile", "notifications"],
      readTime: "3 min read",
    },
    {
      id: 6,
      title: "How to post job openings (For Facilities)",
      category: "facilities",

      preview: "Guide for healthcare facilities to post job opportunities...",
      content:
        "Healthcare facilities can post job openings by creating a facility account. Provide detailed job descriptions, requirements, and benefits. Use our templates to ensure you include all necessary information. Premium facilities get enhanced visibility and priority support. This feature is currently in beta and will be fully available soon.",
      dateAdded: "2024-02-10",
      tags: ["facilities", "posting", "jobs", "employers"],
      readTime: "8 min read",
    },
    {
      id: 7,
      title: "Setting up job alerts and notifications",
      category: "job-search",

      preview: "Never miss out on opportunities with custom job alerts...",
      content:
        "Job alerts ensure you're the first to know about new opportunities. Set up alerts based on your preferred locations, specializations, and work arrangements. You can receive notifications via email or push notifications on your mobile device.",
      dateAdded: "2024-02-15",
      tags: ["alerts", "notifications", "jobs", "mobile"],
      readTime: "4 min read",
    },
    {
      id: 8,
      title: "How to upload and format your resume",
      category: "getting-started",

      preview: "Tips for uploading the perfect resume format...",
      content:
        "Upload your resume in PDF format for best results. Ensure your resume is well-formatted with clear sections for experience, education, and skills. Our system can parse most standard resume formats, but we recommend using our built-in resume builder for optimal compatibility. This feature will soon be in production, allowing you to create a professional resume directly on the platform.",
      dateAdded: "2024-02-20",
      tags: ["resume", "upload", "format", "pdf"],
      readTime: "5 min read",
    },
  ];

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  // Clear just the search
  const clearSearch = () => {
    setSearchQuery("");
  };

  // Open modal with article details
  const openModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  // Enhanced filtering logic
  const filteredArticles = helpArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === "all" || article.category === selectedCategory;

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchLower) ||
      article.preview.toLowerCase().includes(searchLower) ||
      article.content.toLowerCase().includes(searchLower) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });

  // Check if any filters are active
  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "all";
  const totalResults = filteredArticles.length;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <MotionSection className="bg-blue-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MotionH1 className="text-5xl font-bold text-white mb-6">
            Help <span className="text-yellow-400">Center</span>
          </MotionH1>

          <MotionP className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Find answers to common questions and learn how to make the most of
            HealthyConnect
          </MotionP>

          {/* Search Bar */}
          <MotionDiv className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-12 py-4 text-lg rounded-2xl border-0 shadow-lg focus:ring-2 focus:ring-yellow-400 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </MotionDiv>
        </div>
      </MotionSection>

      {/* Categories */}
      <MotionSection className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <MotionButton
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all hover:scale-105 hover:-translate-y-0.5 active:scale-95 ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-blue-50 shadow-sm"
                }`}
              >
                <category.icon className="w-5 h-5 mr-2" />
                {category.name}
              </MotionButton>
            ))}
          </MotionDiv>
        </div>
      </MotionSection>

      {/* Filter Status & Clear Options */}
      {hasActiveFilters && (
        <MotionSection className="py-4 bg-gray-100 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm text-gray-600">
                  Showing {totalResults} result{totalResults !== 1 ? "s" : ""}
                </span>

                {/* Active Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  {selectedCategory !== "all" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Category:{" "}
                      {categories.find((c) => c.id === selectedCategory)?.name}
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {searchQuery && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Search: "{searchQuery}"
                      <button
                        onClick={clearSearch}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>

              {/* Clear All Button */}
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </div>
        </MotionSection>
      )}

      {/* Help Articles */}
      <MotionSection className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <MotionDiv className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or browse different categories.
              </p>
              <button
                onClick={clearAllFilters}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </MotionDiv>
          ) : (
            <MotionDiv className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <MotionDiv
                  key={article.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 hover:-translate-y-1 active:scale-95"
                  onClick={() => openModal(article)}
                >
                  <MotionH3 className="text-xl font-bold text-gray-900 mb-3">
                    {article.title}
                  </MotionH3>

                  <MotionP className="text-gray-600 mb-4">
                    {article.preview}
                  </MotionP>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <MotionDiv className="flex items-center text-blue-600 font-medium hover:translate-x-1 transition-transform">
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </MotionDiv>
                </MotionDiv>
              ))}
            </MotionDiv>
          )}
        </div>
      </MotionSection>

      {/* Modal */}
      {isModalOpen && selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Enhanced backdrop with better blur and animation */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-300" />

          {/* Modal container with improved animations */}
          <div
            className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] shadow-2xl transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced Header with gradient background */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-8 py-6 rounded-t-3xl">
              <div className="flex justify-between items-start">
                <div className="flex-1 mr-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
                    {selectedArticle.title}
                  </h2>

                  {/* Enhanced metadata section */}
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span className="flex items-center bg-white/60 px-3 py-1 rounded-full">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(selectedArticle.dateAdded).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>

                {/* Enhanced close button */}
                <button
                  onClick={closeModal}
                  className="group p-2 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Scrollable content area */}
            <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
              <div className="px-8 py-6">
                {/* Category and Tags Section */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  {/* Enhanced category badge */}
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md">
                      <Folder className="w-4 h-4 mr-2" />
                      {
                        categories.find(
                          (c) => c.id === selectedArticle.category
                        )?.name
                      }
                    </span>
                  </div>

                  {/* Enhanced tags */}
                  {selectedArticle.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedArticle.tags.map((tag, index) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
                          style={{
                            animationDelay: `${index * 100}ms`,
                          }}
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Enhanced Article Content */}
                <div className="prose prose-lg max-w-none">
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100">
                    <p className="text-gray-800 leading-relaxed text-lg font-light whitespace-pre-wrap">
                      {selectedArticle.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Support */}
      <MotionSection className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MotionH2 className="text-4xl font-bold text-white mb-6">
            Still Need Help?
          </MotionH2>

          <MotionP className="text-xl text-blue-100 mb-8">
            Can't find what you're looking for? Our support team is here to
            help.
          </MotionP>
          <Link href="/contact">
            <MotionButton className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 font-bold text-lg shadow-lg transition-all hover:scale-105 hover:-translate-y-1 active:scale-95">
              Contact Support
            </MotionButton>
          </Link>
        </div>
      </MotionSection>
    </div>
  );
};

export default HelpCenter;
