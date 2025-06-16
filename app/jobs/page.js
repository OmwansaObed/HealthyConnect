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
import { GiLaserWarning } from "react-icons/gi";
import { MdScience } from "react-icons/md";
import { useGetJobsQuery } from "../../redux/api/jobApiSlice";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Disclaimer from "../../components/general/Disclaimer";
import {
  calculateJobStatus,
  formatDate,
  getJobTypeColor,
  getStatusBadge,
  formatExperience,
  formatPreference,
  formatLanguage,
} from "../../utils/cardContent.js";

import {
  CATEGORIES,
  JOB_TYPES,
  EXPERIENCE_LEVELS,
  LOCATIONS,
} from "../../utils/constants";

import { FilterSelect, SearchBar } from "../../components/general/CardContent";

const JobCard = ({ job }) => {
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
            {job.type.replace("-", " ").toUpperCase()}
          </span>
          <span className="mx-2">•</span>
          <span className="capitalize">{job.category}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <div className="p-1 bg-green-100 rounded-lg mr-2">
            <MapPin className="w-3 h-3 text-green-600" />
          </div>
          <span>
            {job.location?.state}
            {job.location?.county && `, ${job.location.county}`}
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
        <button className="flex-2 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold text-sm whitespace-nowrap shadow">
          <Phone className="w-4 h-4" />
          <span>{job.phone}</span>
        </button>
      </div>
    </div>
  );
};

const Pagination = ({ page, totalPages, totalCount, limit, setPage }) => (
  <div className="mt-8 flex items-center justify-between">
    <div className="text-sm text-gray-600">
      Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{" "}
      <span className="font-medium">{Math.min(page * limit, totalCount)}</span>{" "}
      of <span className="font-medium">{totalCount}</span> results
    </div>

    <div className="flex space-x-2">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className={`px-3 py-1.5 rounded-lg border ${
          page === 1
            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        }`}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => setPage(pageNum)}
          className={`px-3 py-1.5 rounded-lg border ${
            page === pageNum
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className={`px-3 py-1.5 rounded-lg border ${
          page === totalPages
            ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        }`}
      >
        Next
      </button>
    </div>
  </div>
);

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
  const [page, setPage] = useState(1);
  const limit = 10;
  const router = useRouter();

  // const { data: session } = getSession();
  // if (!session) {
  //   router.push("/login");
  // }
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // API call for jobs
  const { data, isLoading } = useGetJobsQuery({ page, limit });
  const jobs = data?.jobs ?? [];
  const totalPages = data?.totalPages || 1;
  const totalCount = data?.totalCount || 0;

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

    // Location filter
    if (matches && selectedLocation) {
      const locationLower = selectedLocation.toLowerCase();
      matches =
        job.location.state.toLowerCase().includes(locationLower) ||
        job.location.county?.toLowerCase().includes(locationLower);
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
        <Disclaimer />

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

          {/* Jobs List */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {isLoading ? (
                <div className="col-span-full flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
              ) : (
                <NoResults clearAllFilters={clearAllFilters} />
              )}
            </div>

            {!isLoading && filteredJobs.length > 0 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                totalCount={totalCount}
                limit={limit}
                setPage={setPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
