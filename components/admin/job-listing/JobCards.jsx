"use client";
import React, { useState } from "react";
import {
  MapPin,
  Filter,
  Clock,
  Briefcase,
  ChevronDown,
  Loader2,
  GraduationCap,
  RefreshCw,
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
  JobCard,
  NoResults,
  SearchBar,
  FilterSelect,
  JobDetailModal,
} from "./JobCard/utils";
import Disclaimer from "../../general/Disclaimer";

// Main Component
export default function JobSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const { data, isLoading } = useGetJobsQuery({ all: true });
  const jobs = data?.jobs || [];
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

    return matches;
  });

  const clearAllFilters = () => {
    setSelectedCategory("");
    setSelectedType("");

    setSearchTerm("");
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedType;

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-6">
            {/* Title Section */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Healthcare Jobs in Kenya
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Discover {filteredJobs.length} verified opportunities across
                Kenya's healthcare sector
              </p>
            </div>

            {/* Disclaimer */}
            <Disclaimer />

            {/* Search Bar */}
            <SearchBar
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by job title, company, or keywords..."
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-200 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-blue-600" />
              <span>Filter Jobs</span>
              {hasActiveFilters && (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-semibold">
                  Active
                </span>
              )}
            </div>
            <ChevronDown
              className={`w-5 h-5 transform transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">Filter Jobs</h2>
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
                  icon={Briefcase}
                />
                <FilterSelect
                  label="Job Type"
                  value={selectedType}
                  options={JOB_TYPES}
                  onChange={(e) => setSelectedType(e.target.value)}
                  icon={Clock}
                />
              </div>
            </div>
          )}

          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5 text-blue-600" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Clear All
                  </button>
                )}
              </div>
              <div className="space-y-6">
                <FilterSelect
                  label="Category"
                  value={selectedCategory}
                  options={CATEGORIES}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  icon={Briefcase}
                />
                <FilterSelect
                  label="Job Type"
                  value={selectedType}
                  options={JOB_TYPES}
                  onChange={(e) => setSelectedType(e.target.value)}
                  icon={Clock}
                />
              </div>

              {/* Active Filters Summary */}
              {hasActiveFilters && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Active Filters
                  </h3>
                  <div className="space-y-2">
                    {searchTerm && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Search:</span>
                        <span className="font-medium text-gray-900 truncate ml-2">
                          "{searchTerm}"
                        </span>
                      </div>
                    )}
                    {selectedCategory && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium text-gray-900">
                          {
                            CATEGORIES.find((c) => c.value === selectedCategory)
                              ?.label
                          }
                        </span>
                      </div>
                    )}
                    {selectedType && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium text-gray-900">
                          {
                            JOB_TYPES.find((t) => t.value === selectedType)
                              ?.label
                          }
                        </span>
                      </div>
                    )}
                    {selectedExperience && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Experience:</span>
                        <span className="font-medium text-gray-900">
                          {
                            EXPERIENCE_LEVELS.find(
                              (e) => e.value === selectedExperience
                            )?.label
                          }
                        </span>
                      </div>
                    )}
                    {selectedLocation && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium text-gray-900">
                          {
                            LOCATIONS.find((l) => l.value === selectedLocation)
                              ?.label
                          }
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    {filteredJobs.length}{" "}
                    {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
                  </h2>
                  {hasActiveFilters && (
                    <p className="text-sm text-gray-600 mt-1">
                      Filtered by:{" "}
                      {[
                        searchTerm && `"${searchTerm}"`,
                        selectedCategory &&
                          CATEGORIES.find((c) => c.value === selectedCategory)
                            ?.label,
                        selectedType &&
                          JOB_TYPES.find((t) => t.value === selectedType)
                            ?.label,
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
                  )}
                </div>
                {/* Quick Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mx-auto">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>New</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Older</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Past</span>
                  </div>
                </div>
                <p className="text-sm text-center font-light text-gray-600">
                  The older the job, the lower the chance of getting hired
                </p>
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Loading healthcare jobs...</p>
                </div>
              </div>
            ) : (
              /* Job Listings Grid */
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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

            {/* Empty State when no jobs available */}
            {!isLoading && jobs.length === 0 && (
              <div className="text-center py-16 px-4">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  No Jobs Available
                </h3>
                <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                  There are currently no job postings available. Please check
                  back later for new opportunities.
                </p>
              </div>
            )}

            {/* Load More Button (if needed) */}
            {filteredJobs.length > 0 && filteredJobs.length >= 20 && (
              <div className="text-center mt-8">
                <button className="px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium shadow-sm">
                  Load More Jobs
                </button>
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
