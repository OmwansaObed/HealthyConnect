"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import JobCards from "../../components/admin/job-listing/JobCards";
import JobModal from "../../components/admin/job-listing/JobModal";
import { useGetJobsQuery } from "../../redux/api/jobApiSlice";
import { toast } from "sonner";
import { Briefcase, Users, X } from "lucide-react";

import { useSelector } from "react-redux";

export default function JobListingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState("cards"); // cards or table
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "view" | "edit" | "delete"
  const [selectedJob, setSelectedJob] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const router = useRouter();

  // get user from local storage
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  // Fetch all jobs from API (no pagination)
  const { data, isLoading, error, refetch } = useGetJobsQuery();
  const jobs = data?.jobs || [];
  const totalCount = jobs.length;

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

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, filterStatus, filterType]);

  // Calculate pagination
  const pageCount = Math.ceil(filteredJobs.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentJobs = filteredJobs.slice(offset, offset + itemsPerPage);

  // Handle page click
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

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

  // Confirm deletion
  const confirmDelete = async () => {
    if (!selectedJob) return;
    try {
      // await deleteJob(selectedJob._id).unwrap();
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
        {/* Page Content */}
        <div className="px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto">
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
                  jobs={currentJobs}
                  handleViewJob={handleViewJob}
                  handleEditJob={handleEditJob}
                  getStatusColor={getStatusColor}
                  getStatusBadge={getStatusBadge}
                />
              )}
            </>
          )}

          {/* Results Summary */}
          {!isLoading && !error && filteredJobs.length > 0 && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
                <Users className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Showing{" "}
                  {Math.min(
                    currentPage * itemsPerPage + 1,
                    filteredJobs.length
                  )}
                  -
                  {Math.min(
                    (currentPage + 1) * itemsPerPage,
                    filteredJobs.length
                  )}{" "}
                  of {filteredJobs.length} results
                  {filteredJobs.length !== totalCount &&
                    ` (filtered from ${totalCount})`}
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
