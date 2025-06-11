"use client";
import { useState } from "react";

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
} from "lucide-react";

import AdminHeader from "./AdminHeader";
import AdminStatsWidget from "./AdminStatsWidget";
import AdminSidebar from "./AdminSidebar";

const AdminDashboardClient = () => {
  const quickActions = [
    {
      title: "Post New Job",
      description: "Create a new job listing",
      icon: Plus,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Add Facility",
      description: "Register new healthcare facility",
      icon: Building,
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      title: "View Reports",
      description: "Check analytics and insights",
      icon: BarChart3,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Manage Users",
      description: "Review user accounts",
      icon: Users,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
    },
  ];

  const recentJobs = [
    {
      id: 1,
      title: "Senior Nurse - ICU",
      facility: "City General Hospital",
      location: "Nairobi, Upperhill",
      salary: "KSh 80,000",
      applications: 12,
      status: "active",
      posted: "2 days ago",
    },
    {
      id: 2,
      title: "Medical Officer - Emergency",
      facility: "St. Mary Medical Center",
      location: "Nairobi, Westlands",
      salary: "KSh 120,000",
      applications: 8,
      status: "active",
      posted: "1 day ago",
    },
    {
      id: 3,
      title: "Lab Technician",
      facility: "Kenyatta Hospital",
      location: "Nairobi, CBD",
      salary: "KSh 45,000",
      applications: 24,
      status: "closed",
      posted: "5 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 space-y-6 overflow-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">Good morning, Admin! 👋</h2>
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
              <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-left group"
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
                  </button>
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
                {recentJobs.map((job) => (
                  <div
                    key={job.id}
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
                              {job.facility}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                              <span>📍 {job.location}</span>
                              <span>💰 {job.salary}</span>
                              <span>👥 {job.applications} applications</span>
                              <span>🕒 {job.posted}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            job.status === "active"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {job.status}
                        </span>
                        <div className="flex space-x-1">
                          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <MoreVertical className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6">
              <button className="w-full py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium">
                View All Jobs
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardClient;
