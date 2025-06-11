"use client";
import {
  ArrowRight,
  Building,
  FileText,
  HelpCircle,
  Search,
  Star,
  Users,
  X,
  Clock,
  Eye,
  ThumbsUp,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Help Center Component
const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

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
      readTime: "5 min read",
      preview: "Step-by-step guide to setting up your professional profile...",
      content: `
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-blue-100 to-green-100 p-6 rounded-xl">
            <div class="flex items-center mb-4">
              <div class="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <h3 class="text-xl font-bold text-gray-800">Getting Started</h3>
            </div>
            <p class="text-gray-700">Creating your HealthyConnect profile is the first step to finding your dream healthcare job. Follow these simple steps to get started.</p>
          </div>
          
          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
            <div class="flex items-center mb-3">
              <AlertCircle class="w-5 h-5 text-yellow-600 mr-2" />
              <h4 class="font-semibold text-yellow-800  ">Before You Begin</h4>
            </div>
            <p class="text-yellow-700">Make sure you have your professional credentials, certifications, and work history ready.</p>
          </div>

          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">1</div>
              <div>
                <h4 class="font-semibold text-gray-800 mb-2">Create Your Account</h4>
                <p class="text-gray-600">Visit the HealthyConnect homepage and click "Sign Up". Enter your email address and create a secure password.</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">2</div>
              <div>
                <h4 class="font-semibold text-gray-800 mb-2">Complete Your Profile</h4>
                <p class="text-gray-600">Add your personal information, professional experience, and upload a professional photo.</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">3</div>
              <div>
                <h4 class="font-semibold text-gray-800 mb-2">Add Your Credentials</h4>
                <p class="text-gray-600">Upload your licenses, certifications, and any relevant healthcare credentials.</p>
              </div>
            </div>
          </div>

          <div class="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-xl">
            <div class="flex items-center mb-3">
              <CheckCircle class="w-5 h-5 text-green-600 mr-2" />
              <h4 class="font-semibold text-green-800">Pro Tip</h4>
            </div>
            <p class="text-green-700">Complete profiles get 3x more views from employers. Take the time to fill out all sections thoroughly!</p>
          </div>
        </div>
      `,
    },
    {
      id: 2,
      title: "Tips for writing an effective healthcare CV",
      category: "getting-started",
      views: 980,
      helpful: 38,
      readTime: "7 min read",
      preview: "Best practices for showcasing your healthcare experience...",
      content: `
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl">
            <div class="flex items-center mb-4">
              <div class="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
              <h3 class="text-xl font-bold text-gray-800">CV Writing Excellence</h3>
            </div>
            <p class="text-gray-700">Your CV is your first impression with potential employers. Make it count with these proven strategies.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-blue-50 p-4 rounded-xl">
              <h4 class="font-semibold text-blue-800 mb-2">✅ Do Include</h4>
              <ul class="text-blue-700 space-y-1">
                <li>• Relevant certifications</li>
                <li>• Specific healthcare skills</li>
                <li>• Quantified achievements</li>
                <li>• Professional experience</li>
              </ul>
            </div>
            <div class="bg-red-50 p-4 rounded-xl">
              <h4 class="font-semibold text-red-800 mb-2">❌ Avoid</h4>
              <ul class="text-red-700 space-y-1">
                <li>• Generic job descriptions</li>
                <li>• Irrelevant work history</li>
                <li>• Spelling/grammar errors</li>
                <li>• Outdated information</li>
              </ul>
            </div>
          </div>

          <div class="bg-gradient-to-r from-orange-100 to-yellow-100 p-6 rounded-xl">
            <h4 class="font-semibold text-orange-800 mb-3">📝 Key Sections to Include</h4>
            <div class="space-y-3">
              <div class="flex items-center">
                <div class="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                <span class="text-orange-700">Professional Summary</span>
              </div>
              <div class="flex items-center">
                <div class="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <span class="text-yellow-700">Core Competencies</span>
              </div>
              <div class="flex items-center">
                <div class="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span class="text-green-700">Professional Experience</span>
              </div>
              <div class="flex items-center">
                <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span class="text-blue-700">Education & Certifications</span>
              </div>
            </div>
          </div>
        </div>
      `,
    },
    {
      id: 3,
      title: "How to search and filter job opportunities",
      category: "job-search",
      views: 2100,
      helpful: 67,
      readTime: "4 min read",
      preview: "Use our advanced search features to find your perfect role...",
      content: `
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-teal-100 to-cyan-100 p-6 rounded-xl">
            <div class="flex items-center mb-4">
              <div class="w-3 h-3 bg-teal-500 rounded-full mr-3"></div>
              <h3 class="text-xl font-bold text-gray-800">Smart Job Search</h3>
            </div>
            <p class="text-gray-700">Master our search tools to find opportunities that match your skills and preferences perfectly.</p>
          </div>
          
          <div class="bg-indigo-50 border border-indigo-200 p-6 rounded-xl">
            <div class="flex items-center mb-4">
              <Search class="w-6 h-6 text-indigo-600 mr-3" />
              <h4 class="font-semibold text-indigo-800">Search Filters</h4>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div class="bg-white p-3 rounded-lg border border-indigo-100">
                <span class="text-indigo-700 font-medium">Location</span>
              </div>
              <div class="bg-white p-3 rounded-lg border border-indigo-100">
                <span class="text-indigo-700 font-medium">Salary Range</span>
              </div>
              <div class="bg-white p-3 rounded-lg border border-indigo-100">
                <span class="text-indigo-700 font-medium">Job Type</span>
              </div>
              <div class="bg-white p-3 rounded-lg border border-indigo-100">
                <span class="text-indigo-700 font-medium">Experience Level</span>
              </div>
              <div class="bg-white p-3 rounded-lg border border-indigo-100">
                <span class="text-indigo-700 font-medium">Facility Type</span>
              </div>
              <div class="bg-white p-3 rounded-lg border border-indigo-100">
                <span class="text-indigo-700 font-medium">Schedule</span>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl">
            <h4 class="font-semibold text-emerald-800 mb-3">🔍 Advanced Search Tips</h4>
            <div class="space-y-3 text-emerald-700">
              <p>• Use quotation marks for exact phrases like "ICU nurse"</p>
              <p>• Combine multiple keywords with OR (e.g., "RN OR nurse")</p>
              <p>• Save your favorite searches for quick access</p>
              <p>• Set up job alerts to get notified of new opportunities</p>
            </div>
          </div>
        </div>
      `,
    },
    {
      id: 4,
      title: "Understanding the application process",
      category: "applications",
      views: 1450,
      helpful: 52,
      readTime: "6 min read",
      preview: "What happens after you submit your application...",
      content: `
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-rose-100 to-pink-100 p-6 rounded-xl">
            <div class="flex items-center mb-4">
              <div class="w-3 h-3 bg-rose-500 rounded-full mr-3"></div>
              <h3 class="text-xl font-bold text-gray-800">Application Journey</h3>
            </div>
            <p class="text-gray-700">Understanding each step of the application process helps you stay informed and prepared.</p>
          </div>
          
          <div class="space-y-4">
            <div class="bg-white border-l-4 border-blue-400 p-4 rounded-r-xl shadow-sm">
              <div class="flex items-center mb-2">
                <div class="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">1</div>
                <h4 class="font-semibold text-blue-800">Application Submitted</h4>
              </div>
              <p class="text-blue-700 ml-9">You'll receive an immediate confirmation email with your application reference number.</p>
            </div>
            
            <div class="bg-white border-l-4 border-yellow-400 p-4 rounded-r-xl shadow-sm">
              <div class="flex items-center mb-2">
                <div class="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">2</div>
                <h4 class="font-semibold text-yellow-800">Initial Review</h4>
              </div>
              <p class="text-yellow-700 ml-9">HR team reviews your application within 2-3 business days.</p>
            </div>
            
            <div class="bg-white border-l-4 border-purple-400 p-4 rounded-r-xl shadow-sm">
              <div class="flex items-center mb-2">
                <div class="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">3</div>
                <h4 class="font-semibold text-purple-800">Screening Call</h4>
              </div>
              <p class="text-purple-700 ml-9">If selected, you'll be contacted for a preliminary phone screening.</p>
            </div>
            
            <div class="bg-white border-l-4 border-green-400 p-4 rounded-r-xl shadow-sm">
              <div class="flex items-center mb-2">
                <div class="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">4</div>
                <h4 class="font-semibold text-green-800">Final Decision</h4>
              </div>
              <p class="text-green-700 ml-9">You'll be notified of the final decision within 1-2 weeks of your interview.</p>
            </div>
          </div>
        </div>
      `,
    },
    {
      id: 5,
      title: "Managing your account settings",
      category: "account",
      views: 875,
      helpful: 31,
      readTime: "3 min read",
      preview: "How to update your profile, preferences, and notifications...",
      content: `
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-violet-100 to-purple-100 p-6 rounded-xl">
            <div class="flex items-center mb-4">
              <div class="w-3 h-3 bg-violet-500 rounded-full mr-3"></div>
              <h3 class="text-xl font-bold text-gray-800">Account Management</h3>
            </div>
            <p class="text-gray-700">Keep your account updated and customize your experience with these settings.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
              <div class="flex items-center mb-4">
                <Users class="w-6 h-6 text-blue-600 mr-3" />
                <h4 class="font-semibold text-blue-800">Profile Settings</h4>
              </div>
              <ul class="space-y-2 text-blue-700">
                <li>• Update personal information</li>
                <li>• Change profile photo</li>
                <li>• Edit professional summary</li>
                <li>• Manage visibility settings</li>
              </ul>
            </div>
            
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
              <div class="flex items-center mb-4">
                <HelpCircle class="w-6 h-6 text-green-600 mr-3" />
                <h4 class="font-semibold text-green-800">Notification Preferences</h4>
              </div>
              <ul class="space-y-2 text-green-700">
                <li>• Job alert frequency</li>
                <li>• Email preferences</li>
                <li>• SMS notifications</li>
                <li>• Application updates</li>
              </ul>
            </div>
          </div>

          <div class="bg-orange-50 border border-orange-200 p-6 rounded-xl">
            <div class="flex items-center mb-4">
              <Info class="w-6 h-6 text-orange-600 mr-3" />
              <h4 class="font-semibold text-orange-800">Privacy & Security</h4>
            </div>
            <p class="text-orange-700 mb-4">Your privacy is important to us. Control who can see your profile and how your data is used.</p>
            <div class="space-y-2">
              <div class="flex items-center">
                <div class="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                <span class="text-orange-700">Two-factor authentication</span>
              </div>
              <div class="flex items-center">
                <div class="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                <span class="text-orange-700">Password security</span>
              </div>
              <div class="flex items-center">
                <div class="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                <span class="text-orange-700">Data export options</span>
              </div>
            </div>
          </div>
        </div>
      `,
    },
    {
      id: 6,
      title: "How to post job openings (For Facilities)",
      category: "facilities",
      views: 650,
      helpful: 28,
      readTime: "8 min read",
      preview: "Guide for healthcare facilities to post job opportunities...",
      content: `
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-xl">
            <div class="flex items-center mb-4">
              <div class="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
              <h3 class="text-xl font-bold text-gray-800">Facility Job Posting</h3>
            </div>
            <p class="text-gray-700">Attract top healthcare talent by creating compelling job postings that stand out.</p>
          </div>
          
          <div class="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl border border-cyan-100">
            <div class="flex items-center mb-4">
              <Building class="w-6 h-6 text-cyan-600 mr-3" />
              <h4 class="font-semibold text-cyan-800">Job Posting Essentials</h4>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-3">
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                  <span class="text-cyan-700">Clear job title</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span class="text-blue-700">Detailed job description</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                  <span class="text-indigo-700">Required qualifications</span>
                </div>
              </div>
              <div class="space-y-3">
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span class="text-purple-700">Competitive salary range</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                  <span class="text-pink-700">Benefits package</span>
                </div>
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  <span class="text-red-700">Application deadline</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl">
            <h4 class="font-semibold text-emerald-800 mb-4">💡 Tips for Success</h4>
            <div class="space-y-3">
              <div class="bg-white p-4 rounded-lg border border-emerald-100">
                <h5 class="font-medium text-emerald-800 mb-2">Use Keywords</h5>
                <p class="text-emerald-700 text-sm">Include relevant healthcare terms and specialties to improve searchability.</p>
              </div>
              <div class="bg-white p-4 rounded-lg border border-emerald-100">
                <h5 class="font-medium text-emerald-800 mb-2">Highlight Benefits</h5>
                <p class="text-emerald-700 text-sm">Showcase unique perks, growth opportunities, and work-life balance.</p>
              </div>
              <div class="bg-white p-4 rounded-lg border border-emerald-100">
                <h5 class="font-medium text-emerald-800 mb-2">Be Specific</h5>
                <p class="text-emerald-700 text-sm">Provide clear requirements and expectations to attract qualified candidates.</p>
              </div>
            </div>
          </div>
        </div>
      `,
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

  const openModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

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
                onClick={() => openModal(article)}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.preview}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  {/* <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>{article.views}</span>
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    <span>{article.helpful}</span>
                  </div> */}
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedArticle && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedArticle.title}
                  </h2>
                  <div className="flex items-center space-x-6 text-blue-100">
                    {/* <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      <span>{selectedArticle.views} views</span>
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      <span>{selectedArticle.helpful} helpful</span>
                    </div> */}
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{selectedArticle.readTime}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div
                dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
              />

              {/* Feedback Section */}
              {/* <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-100">
                <h4 className="font-semibold text-gray-800 mb-4">
                  Was this article helpful?
                </h4>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all">
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    Yes, helpful
                  </button>
                  <button className="flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-all">
                    <X className="w-4 h-4 mr-2" />
                    Needs improvement
                  </button>
                </div>
              </div> */}
            </div>

            {/* Modal Footer */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Still need help?{" "}
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Contact Support
                  </button>
                </div>
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
          <button
            onClick={() => router.push("/contact")}
            className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 font-bold text-lg shadow-lg transition-all"
          >
            Contact Support
          </button>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
