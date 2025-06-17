"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import JobCards from "../../components/admin/job-listing/JobCards";
import JobModal from "../../components/admin/job-listing/JobModal";

// Import your jobs API hook (adjust path as needed)
import { useGetJobsQuery } from "../../redux/api/jobApiSlice";
import { toast } from "sonner";
import { Briefcase, Users, X } from "lucide-react";
import Disclaimer from "../../components/general/Disclaimer";

// Pagination Component
const Pagination = ({ page, totalPages, totalCount, limit, setPage }) => {
  // Function to generate page numbers to display
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];

    // If total pages is small (7 or less), show all pages
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
      return range;
    }

    // Always include first page
    range.push(1);

    // Calculate start and end of middle range around current page
    const start = Math.max(2, page - delta);
    const end = Math.min(totalPages - 1, page + delta);

    // Add ellipsis after first page if there's a gap
    if (start > 2) {
      range.push("...");
    }

    // Add middle range (pages around current page)
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        // Don't duplicate first/last page
        range.push(i);
      }
    }

    // Add ellipsis before last page if there's a gap
    if (end < totalPages - 1) {
      range.push("...");
    }

    // Always include last page (if more than 1 page total)
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-gray-600 order-2 sm:order-1">
        Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to{" "}
        <span className="font-medium">
          {Math.min(page * limit, totalCount)}
        </span>{" "}
        of <span className="font-medium">{totalCount}</span> results
      </div>

      <div className="flex items-center space-x-1 order-1 sm:order-2">
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

        {visiblePages.map((pageNum, index) => {
          // Handle ellipsis
          if (pageNum === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-1.5 text-gray-500"
              >
                ...
              </span>
            );
          }

          // Handle page numbers
          return (
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
          );
        })}

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
};

export default function JobListingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState("cards"); // cards or table
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "view" | "edit" | "delete"
  const [selectedJob, setSelectedJob] = useState(null);

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 10; // Jobs per page

  // Fetch jobs from API with pagination
  const { data, isLoading, error, refetch } = useGetJobsQuery({ page, limit });
  const jobs = data?.jobs || [];
  const totalPages = data?.totalPages || 1;
  const totalCount = data?.totalCount || 0;

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location?.state?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || job.status === filterStatus;
    const matchesType = filterType === "all" || job.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  // Open modal with job details
  const openModal = (type, job) => {
    setModalType(type);
    setSelectedJob(job);
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
    setModalType("");
  };

  // Handle job deletion
  const handleDeleteJob = async (jobId, jobTitle) => {
    const job = jobs.find((j) => j._id === jobId);
    openModal("delete", job);
  };

  // Confirm deletion
  const confirmDelete = async () => {
    if (!selectedJob) return;
    try {
      await deleteJob(selectedJob._id).unwrap();
      toast.success(`Job "${selectedJob.title}" deleted successfully`);
      closeModal();
      refetch();
    } catch (error) {
      toast.error("Failed to delete job");
      console.error("Delete error:", error);
    }
  };

  // Handle job actions
  const handleViewJob = (jobId) => {
    const job = jobs.find((j) => j._id === jobId);
    openModal("view", job);
  };

  const handleEditJob = (jobId) => {
    const job = jobs.find((j) => j._id === jobId);
    openModal("edit", job);
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    const statusColors = {
      active:
        "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200",
      inactive:
        "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800 border border-slate-200",
      closed:
        "bg-gradient-to-r from-rose-100 to-red-100 text-rose-800 border border-rose-200",
      draft:
        "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200",
    };
    return (
      statusColors[status?.toLowerCase()] ||
      "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800 border border-slate-200"
    );
  };

  // Get status color for mobile cards
  const getStatusColor = (status) => {
    const colors = {
      active: "border-l-emerald-500 bg-emerald-50",
      inactive: "border-l-slate-500 bg-slate-50",
      closed: "border-l-rose-500 bg-rose-50",
      draft: "border-l-amber-500 bg-amber-50",
    };
    return colors[status?.toLowerCase()] || "border-l-slate-500 bg-slate-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex from-purple-50 via-blue-50 to-cyan-50">
      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Mobile Header */}

        {/* Page Content */}
        <div className="px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Desktop Header */}
          <Disclaimer />
          {/* Jobs Display */}
          {isLoading ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading jobs...</p>
            </div>
          ) : error ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-12 text-center">
              <div className="text-red-500 mb-4">
                <X className="w-12 h-12 mx-auto mb-2" />
                <p className="font-medium">Failed to load jobs</p>
                <p className="text-sm text-gray-500 mt-1">
                  Please try refreshing the page
                </p>
              </div>
              <button
                onClick={() => refetch()}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                Retry
              </button>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-12 text-center">
              <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">
                {searchTerm || filterStatus !== "all" || filterType !== "all"
                  ? "No jobs match your filters"
                  : "No jobs found"}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {searchTerm || filterStatus !== "all" || filterType !== "all"
                  ? "Try adjusting your search or filters"
                  : "Create your first job posting to get started"}
              </p>
            </div>
          ) : (
            <>
              {viewMode === "cards" && (
                <JobCards
                  jobs={filteredJobs}
                  handleViewJob={handleViewJob}
                  handleEditJob={handleEditJob}
                  handleDeleteJob={handleDeleteJob}
                  getStatusColor={getStatusColor}
                  getStatusBadge={getStatusBadge}
                />
              )}
            </>
          )}

          {/* Pagination Component */}
          <Pagination
            page={page}
            totalPages={totalPages}
            totalCount={totalCount}
            limit={limit}
            setPage={setPage}
          />

          {/* Results Summary */}
          {!isLoading && !error && filteredJobs.length > 0 && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
                <Users className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Page {page} of {totalPages} • {totalCount} total jobs
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Component */}
      <JobModal
        modalOpen={modalOpen}
        modalType={modalType}
        selectedJob={selectedJob}
        closeModal={closeModal}
        confirmDelete={confirmDelete}
        getStatusBadge={getStatusBadge}
        refetch={refetch}
      />
    </div>
  );
}
