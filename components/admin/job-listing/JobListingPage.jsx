// components/admin/jobs/JobListingPage.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import JobStats from "./JobStats";
import JobFilters from "./JobFilters";
import JobViewSwitcher from "./JobViewSwitcher";
import JobCards from "./JobCards";
import JobTable from "./JobTable";
import JobModal from "./JobModal";

// Import your jobs API hook (adjust path as needed)
import {
  useGetJobsQuery,
  useDeleteJobMutation,
} from "../../../redux/api/jobApiSlice";
import { toast } from "sonner";
import {
  Briefcase,
  Menu,
  Plus,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Pagination Component

export default function JobListingPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [filterStatus, setFilterStatus] = useState("all");
  // const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState("cards"); // cards or table
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "view" | "edit" | "delete"
  const [selectedJob, setSelectedJob] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 10; // Jobs per page

  const { data, isLoading, error, refetch } = useGetJobsQuery({ page, limit });
  const jobs = data?.jobs || [];
  const totalPages = data?.totalPages || 1;
  const totalCount = data?.total || 0;

  const [deleteJob] = useDeleteJobMutation();

  // Sidebar toggle for mobile
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

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

  console.log("Current Page:", page);
  console.log("Jobs:", jobs);

  return (
    <div className="min-h-screen bg-gradient-to-br flex from-purple-50 via-blue-50 to-cyan-50">
      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Mobile Header */}
        <div className="md:hidden bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-white">Job Listings</h1>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-xl text-white hover:bg-white/20 transition-colors"
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Desktop Header */}
          <div className="hidden md:flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent">
                  Job Listings
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage and monitor all job postings
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/admin/jobs/add")}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add New Job</span>
            </button>
          </div>

          {/* Stats Cards */}
          <JobStats jobs={jobs} totalCount={totalCount} />

          {/* Mobile Add Button */}
          <div className="md:hidden mb-6">
            <button
              onClick={() => router.push("/admin/jobs/add")}
              className="w-full px-6 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Job</span>
            </button>
          </div>

          {/* View Switcher */}
          <JobViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />

          {/* Jobs Display */}
          {isLoading ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading healthcare jobs...</p>
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
          ) : jobs.length === 0 ? (
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
                  jobs={jobs}
                  handleViewJob={handleViewJob}
                  handleEditJob={handleEditJob}
                  handleDeleteJob={handleDeleteJob}
                  getStatusColor={getStatusColor}
                  getStatusBadge={getStatusBadge}
                />
              )}
              {viewMode === "table" && (
                <JobTable
                  jobs={jobs}
                  handleViewJob={handleViewJob}
                  handleEditJob={handleEditJob}
                  handleDeleteJob={handleDeleteJob}
                  getStatusBadge={getStatusBadge}
                  getStatusColor={getStatusColor}
                />
              )}
            </>
          )}

          {/* Results Summary */}
          {!isLoading && !error && jobs.length > 0 && (
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
