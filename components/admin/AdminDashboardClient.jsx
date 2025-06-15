"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  BarChart3,
  Briefcase,
  Building,
  CheckCircle,
  Clock,
  Download,
  Edit,
  Eye,
  Filter,
  MoreVertical,
  Plus,
  Users,
  Trash2,
} from "lucide-react";

import AdminStatsWidget from "./AdminStatsWidget";
import DeleteOldJobsModal from "./DeleteOldJobsModal"; // Import the modal

import { useGetJobsQuery } from "../../redux/api/jobApiSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminDashboardClient = () => {
  const quickActions = [
    {
      title: "Post New Job",
      description: "Create a new job listing",
      icon: Plus,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      href: "jobs/add",
    },
    {
      title: "Add Facility(Coming Soon)",
      description: "Register new healthcare facility",
      icon: Building,
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
      href: "#",
    },
    {
      title: "View Reports",
      description: "Check analytics and insights",
      icon: BarChart3,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      href: "analytics",
    },
    {
      title: "Manage Users",
      description: "Review user accounts",
      icon: Users,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      href: "users",
    },
  ];

  const [page, setPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const limit = 10;

  const { data, refetch } = useGetJobsQuery({ page, limit });
  const jobs = data?.jobs ?? [];

  const router = useRouter();

  const lastThreeJobs = jobs.slice(-3);
  const { data: session } = useSession();

  // Handle successful deletion
  const handleDeleteSuccess = (result) => {
    // Refresh the jobs data
    refetch();
    // Close modal after showing result
    setTimeout(() => {
      setShowDeleteModal(false);
    }, 2000);
  };

  function GreetingHeader() {
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
      const hour = new Date().getHours();

      if (hour < 12) {
        setGreeting("Good morning");
      } else if (hour < 18) {
        setGreeting("Good afternoon");
      } else {
        setGreeting("Good evening");
      }
    }, []);

    if (session?.user) {
      return (
        <h2 className="text-2xl font-bold mb-2">
          {greeting}, {session.user.name}! 👋
        </h2>
      );
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex">
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 p-4 sm:p-6 space-y-6 overflow-auto">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
              <GreetingHeader />

              <p className="text-blue-100 mb-4">
                Here&apos;s what&apos;s happening with your platform today.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Last login: Today at 9:30 AM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>All systems operational</span>
                </div>
              </div>
            </div>

            <AdminStatsWidget />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">
                  Quick Actions
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <Link
                      key={index}
                      href={action.href}
                      className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-left group block"
                    >
                      <div
                        className={`w-10 h-10 ${action.bgColor} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                      >
                        <action.icon
                          className={`w-5 h-5 ${action.color.replace(
                            "bg-",
                            "text-"
                          )}`}
                        />
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        {action.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {action.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">
                    Recent Job Listings
                  </h3>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      <Filter className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  {lastThreeJobs.length > 0 ? (
                    lastThreeJobs.map((job, index) => (
                      <div
                        key={index}
                        className="p-6 border-b border-gray-50 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                                <Briefcase className="w-6 h-6 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 mb-1">
                                  {job.title}
                                </h4>
                                <p className="text-sm text-gray-600 mb-2">
                                  {job.postedBy}
                                </p>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                  <span>
                                    📍 {job.location?.county || job.postedBy}
                                  </span>
                                  <span>💰 {job.salary || "Not Listed"}</span>
                                  <span>
                                    👥 {job.applications || "(Coming Soon)"}{" "}
                                    Applications{" "}
                                  </span>
                                  <span>🕒 {job.createdAt}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <span className="text-sm text-gray-500">
                              Powered By:{" "}
                              <span className="font-bold text-blue-500">
                                Healthy
                              </span>
                              Connect
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      <Briefcase className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>No recent jobs found</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <button
                  onClick={() => router.push("/admin/jobs")}
                  className="w-full py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  View All Jobs
                </button>

                {/* Delete Old Jobs Button - Now opens modal */}
                <div className="border-t border-gray-100 pt-4">
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="w-full py-3 bg-red-500 text-white hover:bg-red-600 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Jobs Older Than 10 Days</span>
                  </button>

                  <p className="text-xs text-gray-500 mt-2 text-center">
                    This will permanently remove old job listings from the
                    database
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Delete Old Jobs Modal */}
      <DeleteOldJobsModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
};

export default AdminDashboardClient;
