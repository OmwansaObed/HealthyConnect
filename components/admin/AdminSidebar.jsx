"use client";

import {
  BarChart3,
  Briefcase,
  Building,
  Calendar,
  Heart,
  Home,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import { useState } from "react";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/" },
    {
      id: "jobs",
      label: "Job Listings",
      icon: Briefcase,
      href: "/jobs",
      badge: "24",
    },
    { id: "users", label: "Users", icon: Users, href: "/users" },
    {
      id: "facilities",
      label: "Facilities",
      icon: Building,
      href: "/facilities",
    },
    {
      id: "applications",
      label: "Applications",
      icon: Heart,
      href: "/applications",
      badge: "12",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
    },
    { id: "calendar", label: "Calendar", icon: Calendar, href: "/calendar" },
    {
      id: "messages",
      label: "Messages",
      icon: MessageSquare,
      href: "/messages",
      badge: "5",
    },
    { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-opacity-30 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full bg-white shadow-lg border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  HealthyConnect
                </h2>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                  activeItem === item.id
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
              <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Contact our support team
              </p>
              <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Get Support
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
