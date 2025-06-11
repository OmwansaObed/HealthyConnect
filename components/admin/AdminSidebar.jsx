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
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Home,
      href: "/admin/dashboard",
    },
    {
      id: "jobs",
      label: "Job Listings",
      icon: Briefcase,
      href: "/admin/jobs",
      badge: "24",
    },
    { id: "users", label: "Users", icon: Users, href: "/admin/users" },
    {
      id: "facilities",
      label: "Facilities",
      icon: Building,
      href: "/admin/facilities",
    },
    {
      id: "applications",
      label: "Applications",
      icon: Heart,
      href: "/admin/applications",
      badge: "12",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      href: "/admin/analytics",
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: Calendar,
      href: "/admin/calendar",
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageSquare,
      href: "/admin/messages",
      badge: "5",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

  // Update active item based on current pathname
  useEffect(() => {
    const currentItem = menuItems.find((item) => {
      // Handle exact matches and sub-routes
      if (pathname === item.href) return true;
      if (pathname.startsWith(item.href) && item.href !== "/admin/dashboard")
        return true;
      return false;
    });

    if (currentItem) {
      setActiveItem(currentItem.id);
    } else {
      // Default to dashboard if no match
      setActiveItem("dashboard");
    }
  }, [pathname]);

  const handleLinkClick = () => {
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-30 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static left-0 top-0 h-full md:h-screen 
          bg-white shadow-lg border-r border-gray-200 z-50 
          transition-transform duration-300 ease-in-out w-64
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
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

          {/* Navigation Menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={handleLinkClick}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeItem === item.id
                    ? "bg-blue-50 text-blue-600 border border-blue-200 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon
                    className={`w-5 h-5 ${
                      activeItem === item.id ? "text-blue-600" : "text-gray-500"
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      activeItem === item.id
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Footer/Support Section */}
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
