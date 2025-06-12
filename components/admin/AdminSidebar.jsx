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
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Menu configuration - easier to maintain
const MENU_ITEMS = [
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
  {
    id: "users",
    label: "Users",
    icon: Users,
    href: "/admin/users",
  },
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

// Mobile toggle button component
const MobileToggle = ({ isOpen, onToggle }) => (
  <button
    onClick={onToggle}
    className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 hover:shadow-xl"
    aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
  >
    {isOpen ? (
      <X className="w-6 h-6 text-gray-600" />
    ) : (
      <Menu className="w-6 h-6 text-gray-600" />
    )}
  </button>
);

// Header component
const SidebarHeader = () => (
  <div className="p-6 border-b border-gray-200">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
        <Heart className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-gray-900">HealthyConnect</h2>
        <p className="text-xs text-gray-500">Admin Panel</p>
      </div>
    </div>
  </div>
);

// Navigation item component
const NavItem = ({ item, isActive, onClick }) => {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`
        w-full flex items-center justify-between px-4 py-3 rounded-xl 
        transition-all duration-200 group
        ${
          isActive
            ? "bg-blue-50 text-blue-600 border border-blue-200 shadow-sm"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm"
        }
      `}
    >
      <div className="flex items-center space-x-3">
        <Icon
          className={`
            w-5 h-5 transition-colors duration-200
            ${
              isActive
                ? "text-blue-600"
                : "text-gray-500 group-hover:text-gray-700"
            }
          `}
        />
        <span className="font-medium">{item.label}</span>
      </div>
      {item.badge && (
        <span
          className={`
            px-2 py-1 text-xs rounded-full font-medium transition-colors duration-200
            ${
              isActive
                ? "bg-blue-100 text-blue-700"
                : "bg-red-500 text-white group-hover:bg-red-600"
            }
          `}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
};

// Footer/Support section component
const SidebarFooter = () => (
  <div className="p-4 border-t border-gray-200">
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
      <h3 className="font-medium text-gray-900 mb-2">Need Help?</h3>
      <p className="text-sm text-gray-600 mb-3">Contact our support team</p>
      <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-sm hover:shadow-md">
        Get Support
      </button>
    </div>
  </div>
);

// Main AdminSidebar component
const AdminSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  // Determine active menu item based on pathname
  const getActiveItem = useCallback((currentPath) => {
    const currentItem = MENU_ITEMS.find((item) => {
      if (currentPath === item.href) return true;
      if (
        currentPath.startsWith(item.href) &&
        item.href !== "/admin/dashboard"
      ) {
        return true;
      }
      return false;
    });
    return currentItem?.id || "dashboard";
  }, []);

  // Update active item when pathname changes
  useEffect(() => {
    setActiveItem(getActiveItem(pathname));
  }, [pathname, getActiveItem]);

  // Close sidebar on mobile when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Toggle sidebar visibility
  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Handle navigation item click
  const handleNavClick = useCallback(() => {
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, []);

  // Handle backdrop click
  const handleBackdropClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      <MobileToggle isOpen={isOpen} onToggle={toggleSidebar} />

      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm  bg-opacity-30 z-40 md:hidden"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static left-0 top-0 h-full md:h-screen 
          bg-white shadow-xl md:shadow-lg border-r border-gray-200 z-50 
          transition-transform duration-300 ease-in-out w-64
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        aria-label="Admin navigation"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <SidebarHeader />

          {/* Navigation Menu */}
          <nav
            className="flex-1 p-4 space-y-2 overflow-y-auto"
            role="navigation"
          >
            {MENU_ITEMS.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                isActive={activeItem === item.id}
                onClick={handleNavClick}
              />
            ))}
          </nav>

          {/* Footer */}
          <SidebarFooter />
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
