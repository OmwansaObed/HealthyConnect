"use client";
import React, { useState } from "react";
import {
  Menu,
  X,
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  Home,
  Users,
  Briefcase,
  Heart,
  BarChart3,
  Calendar,
  MessageSquare,
  Shield,
  TrendingUp,
  TrendingDown,
  Activity,
  UserPlus,
  Building,
  Clock,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  Filter,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";

// AdminHeader Component - CLIENT COMPONENT
const AdminHeader = ({ toggleSidebar, isSidebarOpen }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    {
      id: 1,
      message: "New job application received",
      time: "2 min ago",
      type: "info",
    },
    {
      id: 2,
      message: "System maintenance scheduled",
      time: "1 hour ago",
      type: "warning",
    },
    {
      id: 3,
      message: "Monthly report ready",
      time: "3 hours ago",
      type: "success",
    },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
          >
            {isSidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back, Admin</p>
          </div>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search jobs, users, facilities..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden">
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600 hidden sm:block" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-100">
                  <p className="font-medium text-gray-900">Admin User</p>
                  <p className="text-sm text-gray-500">
                    admin@healthyconnect.com
                  </p>
                </div>
                <div className="py-2">
                  <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
