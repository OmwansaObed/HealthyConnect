"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  MapPin,
  Filter,
  Clock,
  DollarSign,
  Users,
  Heart,
  Award,
  Shield,
  Settings,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Loader2,
  Phone,
  GraduationCap,
  User,
  Globe,
  Calendar,
  ChevronRight,
  TrendingUp,
  Building2,
  UserCheck,
  ShieldCheck,
  UserX,
} from "lucide-react";
import { useGetJobsQuery } from "../../redux/api/jobApiSlice";
import Disclaimer from "../../components/general/Disclaimer";

const calculateJobStatus = (createdAt) => {
  const now = new Date();
  const postDate = new Date(createdAt);
  const daysDifference = Math.floor((now - postDate) / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    return "high";
  } else if (daysDifference === 1) {
    return "medium";
  } else {
    return "low";
  }
};

// Get status badge colors
const getStatusBadge = (status) => {
  const colors = {
    high: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};
// Constants
const CATEGORIES = [
  {
    value: "nursing",
    label: "Nursing",
    icon: Heart,
    description:
      "Patient care, medical assistance, and healthcare support roles",
    color: "from-red-400 to-pink-500",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
  },
  {
    value: "cna",
    label: "CNA",
    icon: UserCheck,
    description: "Certified Nursing Assistants providing basic patient care",
    color: "from-emerald-400 to-green-500",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    value: "medical Officer",
    label: "Medical Officer",
    icon: Award,
    description: "Licensed physicians and medical practitioners",
    color: "from-blue-400 to-indigo-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    value: "clinical officer",
    label: "Clinical Officer",
    icon: Shield,
    description: "General health diagnosis and treatment practitioners",
    color: "from-orange-400 to-yellow-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    value: "pharmacy",
    label: "Pharmacy",
    icon: CheckCircle,
    description: "Pharmaceutical services and medication management",
    color: "from-green-400 to-emerald-500",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    value: "laboratory",
    label: "Laboratory",
    icon: Search,
    description: "Medical testing, diagnostics, and lab analysis",
    color: "from-purple-400 to-violet-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    value: "radiology",
    label: "Radiology",
    icon: Building2,
    description: "Medical imaging and diagnostic radiology services",
    color: "from-orange-400 to-red-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    value: "medical engineer",
    label: "Medical Engineer",
    icon: Settings,
    description: "Biomedical equipment and healthcare technology",
    color: "from-gray-400 to-slate-500",
    bgColor: "bg-gray-50",
    iconColor: "text-gray-600",
  },
  {
    value: "dental",
    label: "Dental",
    icon: ShieldCheck,
    description: "Oral health, dental care, and dental hygiene services",
    color: "from-teal-400 to-cyan-500",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    value: "care giver",
    label: "Caregiver",
    icon: UserX,
    description: "Non-medical assistance in home or clinical settings",
    color: "from-pink-400 to-rose-500",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    value: "administration",
    label: "Administration",
    icon: Briefcase,
    description: "Healthcare management and administrative support",
    color: "from-yellow-400 to-orange-500",
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    value: "orthopedics",
    label: "Orthopedics",
    icon: Users,
    description: "Musculoskeletal care and orthopedic services",
    color: "from-indigo-400 to-purple-500",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    value: "sale",
    label: "Medical Sales",
    icon: DollarSign,
    description: "Sales of medical equipment and pharmaceutical products",
    color: "from-lime-400 to-green-500",
    bgColor: "bg-lime-50",
    iconColor: "text-lime-600",
  },
];

const CategoryCard = ({ category, jobCount, onSelect }) => {
  const IconComponent = category.icon;

  return (
    <div
      onClick={() => onSelect(category.value)}
      className={`${category.bgColor} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/50 hover:scale-105 group`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}
        >
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{jobCount}</div>
          <div className="text-sm text-gray-600">Open positions</div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
        {category.label}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {category.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span>High demand</span>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
};

const JobCard = ({ job }) => {
  const category = CATEGORIES.find((c) => c.value === job.category);
  const IconComponent = category?.icon || Briefcase;

  // Calculate dynamic status based on posting date
  const jobStatus = calculateJobStatus(job.createdAt);

  const getJobTypeColor = (type) => {
    const colors = {
      "full-time": "bg-green-100 text-green-800 border-green-200",
      "part-time": "bg-blue-100 text-blue-800 border-blue-200",
      contract: "bg-purple-100 text-purple-800 border-purple-200",
      locum: "bg-indigo-100 text-indigo-800 border-indigo-200",
    };
    return colors[type] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div
      className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border-l-4 ${
        jobStatus === "high"
          ? "border-l-green-500"
          : jobStatus === "medium"
          ? "border-l-yellow-500"
          : "border-l-red-500"
      } border border-white/50 p-6 hover:shadow-xl transition-all duration-200 hover:scale-105`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2">
            {job.title}
          </h3>
          {job.postedBy && (
            <p className="text-gray-500 text-xs">by {job.postedBy}</p>
          )}
        </div>
        <span
          className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(
            jobStatus
          )}`}
        >
          {jobStatus}
        </span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-sm text-gray-600">
          <div className="p-1 bg-blue-100 rounded-lg mr-2">
            <IconComponent className="w-3 h-3 text-blue-600" />
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-semibold ${getJobTypeColor(
              job.type
            )} border`}
          >
            {job.type?.replace("-", " ").toUpperCase() || "N/A"}
          </span>
          <span className="mx-2">•</span>
          <span className="capitalize">{job.category}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <div className="p-1 bg-green-100 rounded-lg mr-2">
            <MapPin className="w-3 h-3 text-green-600" />
          </div>
          <span>
            {(job.location?.state || "Kenya") +
              ", " +
              (job.location?.county || "")}
          </span>
        </div>

        {job.salary && (
          <div className="flex items-center text-sm text-gray-600">
            <div className="p-1 bg-emerald-100 rounded-lg mr-2">
              <DollarSign className="w-3 h-3 text-emerald-600" />
            </div>
            <span>{job.salary}</span>
          </div>
        )}

        <div className="flex items-center text-sm text-gray-600">
          <div className="p-1 bg-purple-100 rounded-lg mr-2">
            <Calendar className="w-3 h-3 text-purple-600" />
          </div>
          <span>{formatDate(job.createdAt)}</span>
        </div>
      </div>

      {job.description && (
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {job.description}
        </p>
      )}

      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold text-sm shadow">
        <Phone className="w-4 h-4" />
        <span>{job.phone || "Contact for details"}</span>
      </button>
    </div>
  );
};

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 1000; // Fetch all jobs to get accurate category counts

  // Fetch all jobs from API
  const { data, isLoading, error } = useGetJobsQuery({ page, limit });
  const jobs = data?.jobs ?? [];
  const totalCount = data?.total || 0;

  // Calculate job counts by category from real data
  const jobCountsByCategory = useMemo(() => {
    const counts = {};

    // Initialize all categories with 0
    CATEGORIES.forEach((category) => {
      counts[category.value] = 0;
    });

    // Count jobs by category
    jobs.forEach((job) => {
      if (job.category && counts.hasOwnProperty(job.category)) {
        counts[job.category]++;
      }
    });

    return counts;
  }, [jobs]);

  // Filter jobs by selected category
  const categoryJobs = useMemo(() => {
    if (!selectedCategory) return [];
    return jobs.filter((job) => job.category === selectedCategory);
  }, [jobs, selectedCategory]);

  // Filter jobs by search term
  const filteredJobsBySearch = useMemo(() => {
    if (!searchTerm) return categoryJobs;
    const searchLower = searchTerm.toLowerCase();
    return categoryJobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(searchLower) ||
        job.description?.toLowerCase().includes(searchLower) ||
        job.postedBy?.toLowerCase().includes(searchLower)
    );
  }, [categoryJobs, searchTerm]);

  const handleCategorySelect = (categoryValue) => {
    setSelectedCategory(categoryValue);
    setSearchTerm(""); // Reset search when selecting category
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSearchTerm("");
  };

  // Loading state for initial data fetch
  if (isLoading && !selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading job categories...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Error Loading Data
          </h3>
          <p className="text-gray-600">
            Unable to fetch job categories. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (selectedCategory) {
    const category = CATEGORIES.find((c) => c.value === selectedCategory);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <button
              onClick={handleBackToCategories}
              className="flex items-center text-blue-600 hover:text-blue-700 mb-4 font-medium"
            >
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Back to Categories
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}
              >
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {category.label} Jobs
                </h1>
                <p className="text-gray-600">
                  {filteredJobsBySearch.length} available positions
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {filteredJobsBySearch.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobsBySearch.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {searchTerm ? "No jobs found" : "No jobs available"}
              </h3>
              <p className="text-gray-600">
                {searchTerm
                  ? "Try adjusting your search term"
                  : `No ${category.label.toLowerCase()} positions are currently available`}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Healthcare Job Categories
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Explore opportunities across Kenya's healthcare sector
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                <span>{CATEGORIES.length} Categories</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                <span>{totalCount} Total Jobs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* disclaimer div */}
      <Disclaimer />

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.value}
              category={category}
              jobCount={jobCountsByCategory[category.value] || 0}
              onSelect={handleCategorySelect}
            />
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-white/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Trusted Network
                </h3>
                <p className="text-gray-600 text-sm">
                  Connect with verified healthcare employers across Kenya
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Growing Opportunities
                </h3>
                <p className="text-gray-600 text-sm">
                  Access the latest job openings in healthcare
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Secure Platform
                </h3>
                <p className="text-gray-600 text-sm">
                  Your information is protected and secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
