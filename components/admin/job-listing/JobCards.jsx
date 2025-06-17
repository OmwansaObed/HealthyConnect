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
  Phone,
  GraduationCap,
  User,
  MessageCircle,
  Globe,
  Eye,
} from "lucide-react";
import { useGetJobsQuery } from "../../../redux/api/jobApiSlice";

import {
  CATEGORIES,
  JOB_TYPES,
  EXPERIENCE_LEVELS,
  LOCATIONS,
} from "../../../utils/constants";
import {
  formatDate,
  formatExperience,
  formatPreference,
  formatLanguage,
  getJobTypeColor,
  calculateJobStatus,
  getStatusBadge,
} from "../../../utils/cardContent";

import {
  FilterSelect,
  SearchBar,
} from "../../../components/general/CardContent";
import Disclaimer from "../../../components/general/Disclaimer";

// Job Detail Modal Component
const JobDetailModal = ({ job, isOpen, onClose }) => {
  if (!isOpen || !job) return null;

  const category = CATEGORIES.find((c) => c.value === job.category);
  const IconComponent = category?.icon || Briefcase;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 p-6 flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {job.title}
            </h2>
            {job.postedBy && (
              <p className="text-gray-600 text-sm">by {job.postedBy}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status and Basic Info */}
          <div className="flex flex-wrap gap-3">
            <span
              className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusBadge(
                calculateJobStatus(job.createdAt)
              )}`}
            >
              {calculateJobStatus(job.createdAt).toUpperCase()}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${getJobTypeColor(
                job.type
              )} border`}
            >
              {job.type.replace("-", " ").toUpperCase()}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
              {job.category}
            </span>
          </div>

          {/* Key Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Location */}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPin className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Location</p>
                <p className="text-sm text-gray-600">
                  {job.location?.state}
                  {job.location?.county && `, ${job.location.county}`}
                </p>
              </div>
            </div>

            {/* Experience */}
            {formatExperience(job.experience) && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <GraduationCap className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Experience
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatExperience(job.experience)}
                  </p>
                </div>
              </div>
            )}

            {/* Salary */}
            {job.salary && job.salary !== "not-listed" && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Salary</p>
                  <p className="text-sm text-gray-600">{job.salary}</p>
                </div>
              </div>
            )}

            {/* Language */}
            {formatLanguage(job.preferredCommunicationLanguage) && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Globe className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Language</p>
                  <p className="text-sm text-gray-600">
                    {formatLanguage(job.preferredCommunicationLanguage)}{" "}
                    preferred
                  </p>
                </div>
              </div>
            )}

            {/* Posted Date */}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Posted</p>
                <p className="text-sm text-gray-600">
                  {formatDate(job.createdAt)}
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Phone className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Contact</p>
                <p className="text-sm text-gray-600">{job.phone}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {job.description && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Job Description
              </h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  {job.description}
                </p>
              </div>
            </div>
          )}

          {/* Preferences */}
          {formatPreference(job.preference) && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Employer Preferences
              </h3>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-2">
                  <User className="w-4 h-4 text-blue-600 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    {formatPreference(job.preference)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const JobCard = ({ job, onViewDetails }) => {
  const category = CATEGORIES.find((c) => c.value === job.category);
  const IconComponent = category?.icon || Briefcase;

  // Calculate dynamic status based on posting date
  const jobStatus = calculateJobStatus(job.createdAt);

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

        {job.salary && job.salary !== "not-listed" && (
          <div className="flex items-center text-sm text-gray-600">
            <div className="p-1 bg-emerald-100 rounded-lg mr-2">
              <DollarSign className="w-3 h-3 text-emerald-600" />
            </div>
            <span>{job.salary}</span>
          </div>
        )}

        {formatExperience(job.experience) && (
          <div className="flex items-center text-sm text-gray-600">
            <div className="p-1 bg-orange-100 rounded-lg mr-2">
              <GraduationCap className="w-3 h-3 text-orange-600" />
            </div>
            <span>{formatExperience(job.experience)}</span>
          </div>
        )}

        {formatLanguage(job.preferredCommunicationLanguage) && (
          <div className="flex items-center text-sm text-gray-600">
            <div className="p-1 bg-indigo-100 rounded-lg mr-2">
              <Globe className="w-3 h-3 text-indigo-600" />
            </div>
            <span>
              {formatLanguage(job.preferredCommunicationLanguage)} preferred
            </span>
          </div>
        )}

        {formatPreference(job.preference) && (
          <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
            <div className="flex items-center mb-1">
              <User className="w-3 h-3 mr-1" />
              <span className="font-medium">Preferences:</span>
            </div>
            <span>{formatPreference(job.preference)}</span>
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

      <div className="flex space-x-2">
        <button
          onClick={() => onViewDetails(job)}
          className="flex-1 p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors border border-blue-200"
          title="View Details"
        >
          <Eye className="w-4 h-4 mx-auto" />
        </button>
        <a
          href={`tel:${job.phone}`}
          className="flex-2 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold text-sm whitespace-nowrap shadow"
        >
          <Phone className="w-4 h-4" />
          <span>{job.phone || "Contact"}</span>
        </a>
      </div>
    </div>
  );
};

const NoResults = ({ clearAllFilters }) => (
  <div className="col-span-full text-center py-12 px-4">
    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
    </div>
    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
      No jobs found
    </h3>
    <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-md mx-auto">
      Try adjusting your search criteria or filters to find more opportunities.
    </p>
    <button
      onClick={clearAllFilters}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
    >
      Clear All Filters
    </button>
  </div>
);
// Main Component
export default function JobSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const { data } = useGetJobsQuery({ all: true });
  const jobs = data?.jobs || [];
  // Using mock data for demonstration
  // const jobs = mockJobs;
  const isLoading = false;

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    let matches = true;

    // Search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      matches =
        job.title.toLowerCase().includes(searchLower) ||
        job.description?.toLowerCase().includes(searchLower) ||
        job.postedBy?.toLowerCase().includes(searchLower);
    }

    // Category filter
    if (matches && selectedCategory) {
      matches = job.category === selectedCategory;
    }

    // Job type filter
    if (matches && selectedType) {
      matches = job.type === selectedType;
    }

    // Experience filter
    if (matches && selectedExperience) {
      matches = job.experience === selectedExperience;
    }

    return matches;
  });

  const clearAllFilters = () => {
    setSelectedCategory("");
    setSelectedType("");
    setSelectedExperience("");
    setSelectedLocation("");
    setSearchTerm("");
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                Find Your Perfect Healthcare Job
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Discover {filteredJobs.length} opportunities across Kenya&apos;s
                healthcare sector
              </p>
            </div>
            <Disclaimer />
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/50 font-medium text-gray-700"
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
            <div className="lg:hidden bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/50 p-4 mb-4">
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
                <FilterSelect
                  label="Category"
                  value={selectedCategory}
                  options={CATEGORIES}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                <FilterSelect
                  label="Job Type"
                  value={selectedType}
                  options={JOB_TYPES}
                  onChange={(e) => setSelectedType(e.target.value)}
                />
                <FilterSelect
                  label="Experience"
                  value={selectedExperience}
                  options={EXPERIENCE_LEVELS}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                />
                <FilterSelect
                  label="Location"
                  value={selectedLocation}
                  options={LOCATIONS}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/50 p-6 sticky top-6">
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
                <FilterSelect
                  label="Category"
                  value={selectedCategory}
                  options={CATEGORIES}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                <FilterSelect
                  label="Job Type"
                  value={selectedType}
                  options={JOB_TYPES}
                  onChange={(e) => setSelectedType(e.target.value)}
                />
                <FilterSelect
                  label="Experience"
                  value={selectedExperience}
                  options={EXPERIENCE_LEVELS}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                />
                <FilterSelect
                  label="Location"
                  value={selectedLocation}
                  options={LOCATIONS}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {filteredJobs.length}{" "}
                  {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
                </h2>
                {searchTerm ||
                selectedCategory ||
                selectedType ||
                selectedExperience ||
                selectedLocation ? (
                  <p className="text-sm text-gray-500 mt-1">
                    Showing results for:{" "}
                    {[
                      searchTerm && `"${searchTerm}"`,
                      selectedCategory &&
                        CATEGORIES.find((c) => c.value === selectedCategory)
                          ?.label,
                      selectedType &&
                        JOB_TYPES.find((t) => t.value === selectedType)?.label,
                      selectedExperience &&
                        EXPERIENCE_LEVELS.find(
                          (e) => e.value === selectedExperience
                        )?.label,
                      selectedLocation &&
                        LOCATIONS.find((l) => l.value === selectedLocation)
                          ?.label,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white/80 backdrop-blur-sm">
                  <option>Most Recent</option>
                  <option>Highest Salary</option>
                  <option>Most Relevant</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
            ) : (
              /* Job Listings */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <JobCard
                      key={job._id}
                      job={job}
                      onViewDetails={handleViewDetails}
                    />
                  ))
                ) : (
                  <NoResults clearAllFilters={clearAllFilters} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Job Detail Modal */}
      <JobDetailModal
        job={selectedJob}
        isOpen={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}
