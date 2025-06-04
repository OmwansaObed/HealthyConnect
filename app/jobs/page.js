"use client";
import React, { useState, useEffect } from "react";
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
  ChevronDown,
  X,
  Star,
  Calendar,
  Building,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { GiLaserWarning } from "react-icons/gi";
import { MdScience } from "react-icons/md";
import { useGetJobsQuery } from "../../redux/api/jobApiSlice";

export default function JobSearchPage() {
  // Replace dummy data and manual loading state with RTK Query
  const { data, isLoading, error } = useGetJobsQuery();
  const jobs = data?.jobs || [];
  console.log("Jobs data:", jobs);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSalaryRange, setSelectedSalaryRange] = useState("");

  const categoryIcons = {
    nursing: Heart,
    "medical-officer": Award,
    "clinical-officers": Shield,
    "lab-technician": MdScience,
    "medical-technicians": Settings,
    coho: Users,
    managerial: Briefcase,
    pharmacy: CheckCircle,
    radiography: GiLaserWarning,
  };

  const categories = [
    { value: "nursing", label: "Nursing" },
    { value: "medical-officer", label: "Medical Officer" },
    { value: "clinical-officers", label: "Clinical Officers" },
    { value: "lab-technician", label: "Lab Technician" },
    { value: "medical-technicians", label: "Medical Technicians" },
    { value: "coho", label: "CoHo" },
    { value: "managerial", label: "Managerial" },
    { value: "pharmacy", label: "Pharmacy" },
    { value: "radiography", label: "Radiography" },
  ];

  const jobTypes = [
    { value: "full-time", label: "Full Time" },
    { value: "part-time", label: "Part Time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
  ];

  const experienceLevels = [
    { value: "entry-level", label: "Entry Level" },
    { value: "mid-level", label: "Mid Level" },
    { value: "senior-level", label: "Senior Level" },
  ];

  const salaryRanges = [
    { value: "0-50000", label: "KSh 0 - 50,000" },
    { value: "50000-100000", label: "KSh 50,000 - 100,000" },
    { value: "100000-150000", label: "KSh 100,000 - 150,000" },
    { value: "150000+", label: "KSh 150,000+" },
  ];

  const locations = [
    { value: "nairobi", label: "Nairobi" },
    { value: "mombasa", label: "Mombasa" },
    { value: "kisumu", label: "Kisumu" },
    { value: "nakuru", label: "Nakuru" },
    { value: "eldoret", label: "Eldoret" },
  ];

  // Filter jobs based on search and filters
  useEffect(() => {
    let filtered = jobs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.postedBy?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((job) => job.category === selectedCategory);
    }

    // Type filter
    if (selectedType) {
      filtered = filtered.filter((job) => job.type === selectedType);
    }

    // Experience filter
    if (selectedExperience) {
      filtered = filtered.filter(
        (job) => job.experience === selectedExperience
      );
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter(
        (job) =>
          job.location.state
            .toLowerCase()
            .includes(selectedLocation.toLowerCase()) ||
          job.location.county
            .toLowerCase()
            .includes(selectedLocation.toLowerCase())
      );
    }

    // Only update state if filteredJobs actually changed
    setFilteredJobs((prev) => {
      // Compare stringified arrays to avoid infinite loop
      if (JSON.stringify(prev) !== JSON.stringify(filtered)) {
        return filtered;
      }
      return prev;
    });
    // Only run when jobs or filters change
  }, [
    jobs,
    searchTerm,
    selectedCategory,
    selectedType,
    selectedExperience,
    selectedLocation,
  ]);

  const clearAllFilters = () => {
    setSelectedCategory("");
    setSelectedType("");
    setSelectedExperience("");
    setSelectedLocation("");
    setSelectedSalaryRange("");
    setSearchTerm("");
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

  const getCategoryIcon = (category) => {
    const IconComponent = categoryIcons[category] || Briefcase;
    return IconComponent;
  };

  const getJobTypeColor = (type) => {
    const colors = {
      "full-time": "bg-green-100 text-green-800",
      "part-time": "bg-blue-100 text-blue-800",
      contract: "bg-purple-100 text-purple-800",
      internship: "bg-orange-100 text-orange-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const getExperienceColor = (experience) => {
    const colors = {
      "entry-level": "bg-emerald-100 text-emerald-800",
      "mid-level": "bg-blue-100 text-blue-800",
      "senior-level": "bg-purple-100 text-purple-800",
    };
    return colors[experience] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                Find Your Perfect Healthcare Job
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Discover {filteredJobs.length} opportunities across Kenya's
                healthcare sector
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs, hospitals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm border font-medium text-gray-700"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 transform transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Mobile Filters Dropdown */}
          {showFilters && (
            <div className="lg:hidden bg-white rounded-xl shadow-sm border p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Job Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    {jobTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Experience Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Levels</option>
                    {experienceLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                      <option key={location.value} value={location.value}>
                        {location.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Job Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    {jobTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Experience Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Levels</option>
                    {experienceLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                      <option key={location.value} value={location.value}>
                        {location.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="w-full lg:w-3/4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600 text-sm sm:text-base">
                  Loading jobs...
                </span>
              </div>
            ) : error ? (
              <div className="text-center py-12 px-4 text-red-600">
                Error loading jobs.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => {
                    const IconComponent = getCategoryIcon(job.category);
                    return (
                      <div
                        key={job._id}
                        className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200 p-4 sm:p-6"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                          {/* Job Icon & Basic Info */}
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>

                            <div className="flex-1 min-w-0">
                              {/* Title & Type */}
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                                  {job.title}
                                </h3>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium self-start ${getJobTypeColor(
                                    job.type
                                  )}`}
                                >
                                  {job.type.replace("-", " ").toUpperCase()}
                                </span>
                              </div>

                              {/* Company & Location */}
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-3">
                                <div className="flex items-center gap-1">
                                  <Building className="w-4 h-4 flex-shrink-0" />
                                  <span className="truncate">
                                    {job.postedBy}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4 flex-shrink-0" />
                                  <span>
                                    {job.location.county}, {job.location.state}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4 flex-shrink-0" />
                                  <span>{formatDate(job.createdAt)}</span>
                                </div>
                              </div>

                              {/* Description */}
                              <p className="text-sm sm:text-base text-gray-700 mb-3 line-clamp-2">
                                {job.description}
                              </p>

                              {/* Experience & Salary */}
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-0">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium self-start ${getExperienceColor(
                                    job.experience
                                  )}`}
                                >
                                  {job.experience
                                    .replace("-", " ")
                                    .toUpperCase()}
                                </span>
                                <div className="flex items-center gap-1 text-sm text-gray-600">
                                  <DollarSign className="w-4 h-4" />
                                  <span className="truncate">{job.salary}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-3 sm:ml-4">
                            <button className="flex-1 sm:flex-none px-4 py-2 sm:px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base whitespace-nowrap">
                              Phone Number
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 px-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                      No jobs found
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto">
                      Try adjusting your search criteria or filters to find more
                      opportunities.
                    </p>
                    <button
                      onClick={clearAllFilters}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
