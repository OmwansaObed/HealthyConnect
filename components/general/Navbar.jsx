"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  Heart,
  Briefcase,
  Grid3X3,
  User,
  Settings,
  LogOut,
  Bell,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import dynamic from "next/dynamic";
import { clearUser } from "../../redux/api/userSlice";
import { useDispatch } from "react-redux";

const Notifications = dynamic(() => import("./Notifications"), { ssr: false });

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unread, setUnread] = useState(false);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const navLinks = [
    { name: "Find Jobs", href: "/jobs", icon: Briefcase },
    { name: "Categories", href: "/categories", icon: Grid3X3 },
  ];

  const handleProfileMenuToggle = () => setProfileMenuOpen((prev) => !prev);
  const handleProfileMenuClose = () => setProfileMenuOpen(false);
  const closeMobileMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    try {
      // Close any open menus
      handleProfileMenuClose();
      closeMobileMenu();

      // Clear Redux state
      dispatch(clearUser());

      // Sign out from NextAuth
      await signOut({ callbackUrl: "/auth/login" });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const NavLinks = ({ mobile = false }) =>
    navLinks.map((link) => {
      const Icon = link.icon;
      return (
        <Link
          key={link.name}
          href={link.href}
          className={`group flex items-center space-x-3 font-medium transition-all duration-300 transform hover:scale-105 ${
            mobile
              ? "px-5 py-4 text-white hover:text-blue-200 hover:bg-white/10 rounded-xl text-lg shadow-sm hover:shadow-md backdrop-blur-sm border border-transparent hover:border-white/20"
              : "px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg shadow-sm hover:shadow-md"
          }`}
          onClick={closeMobileMenu}
        >
          <Icon
            className={`${
              mobile ? "w-5 h-5" : "w-4 h-4"
            } transition-all duration-300 group-hover:rotate-3`}
          />
          <span>{link.name}</span>
        </Link>
      );
    });

  const handleBellClick = () => {
    setShowNotifications((prev) => !prev);
    if (unread) {
      setUnread(false);
      localStorage.setItem("lastNotificationRead", new Date().toISOString());
    }
  };

  const NotificationBell = ({ mobile = false }) => (
    <div className="relative">
      <button
        className={`relative p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transform hover:scale-110 ${
          mobile
            ? "hover:bg-white/10 text-white shadow-lg backdrop-blur-sm"
            : "hover:bg-blue-50 text-gray-700 shadow-sm hover:shadow-md"
        } ${unread ? "animate-pulse" : ""}`}
        onClick={mobile ? () => setUnread(false) : handleBellClick}
      >
        <Bell
          className={`w-5 h-5 transition-all duration-300 ${
            unread
              ? mobile
                ? "text-yellow-300 animate-bounce"
                : "text-red-600 animate-bounce"
              : mobile
              ? "text-white"
              : "text-gray-700"
          }`}
        />
        {unread && (
          <>
            <span
              className={`absolute -top-1 -right-1 block w-3 h-3 rounded-full ring-2 ${
                mobile ? "bg-yellow-400 ring-blue-600" : "bg-red-600 ring-white"
              }`}
            />
            <span
              className={`absolute -top-1 -right-1 block w-3 h-3 rounded-full animate-ping ${
                mobile ? "bg-yellow-400" : "bg-red-600"
              }`}
            />
          </>
        )}
      </button>
      {!mobile && showNotifications && (
        <div className="absolute right-0 mt-2 z-50">
          <Notifications />
        </div>
      )}
    </div>
  );

  const AuthButtons = () => {
    if (session) {
      return (
        <div className="flex items-center space-x-4">
          <NotificationBell />
          <div className="relative">
            <button
              onClick={handleProfileMenuToggle}
              className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium">
                {session.user?.name?.split(" ")[0] ||
                  session.user?.email.split("@")[0]}
              </span>
            </button>

            {profileMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={handleProfileMenuClose}
                  aria-label="Close profile menu"
                />
                <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                  <div className="p-3">
                    <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-3">
                      <p className="text-sm font-bold text-gray-900">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {session.user?.email}
                      </p>
                    </div>

                    {session.user?.role === true && (
                      <Link
                        href="/admin/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md mb-2"
                        onClick={handleProfileMenuClose}
                      >
                        <Shield className="w-5 h-5" />
                        <span className="font-medium">Admin Dashboard</span>
                      </Link>
                    )}

                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md"
                      onClick={handleProfileMenuClose}
                    >
                      <User className="w-5 h-5" />
                      <span className="font-medium">My Profile</span>
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 mt-2 transform hover:scale-105 shadow-sm hover:shadow-md"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-4 z-10">
        <button
          onClick={() => signIn()}
          className="px-6 py-3 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 rounded-xl hover:bg-blue-50 transform hover:scale-105 shadow-sm hover:shadow-md backdrop-blur-sm"
        >
          Sign In
        </button>
        <Link
          href="/auth/signup"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm"
        >
          Sign Up
        </Link>
      </div>
    );
  };

  const MobileAuth = () =>
    session ? (
      <div className="space-y-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center px-4 py-4 bg-white/10 rounded-xl border border-white/20 shadow-md">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-lg">{session.user?.name}</p>
            <p className="text-blue-100 text-sm">{session.user?.email}</p>
          </div>
        </div>

        {session.user?.role === true && (
          <Link
            href="/admin/dashboard"
            className="flex items-center space-x-3 px-4 py-4 text-emerald-200 hover:text-emerald-100 hover:bg-emerald-500/20 rounded-xl transition-all duration-300 border border-transparent hover:border-emerald-400/30 shadow-sm hover:shadow-md transform hover:scale-105"
            onClick={closeMobileMenu}
          >
            <Shield className="w-5 h-5" />
            <span className="text-lg font-medium">Admin Dashboard</span>
          </Link>
        )}

        <Link
          href="/profile"
          className="flex items-center space-x-3 px-4 py-4 text-white hover:text-blue-200 hover:bg-white/10 rounded-xl transition-all duration-300 border border-transparent hover:border-white/20 shadow-sm hover:shadow-md transform hover:scale-105"
          onClick={closeMobileMenu}
        >
          <User className="w-5 h-5" />
          <span className="text-lg font-medium">My Profile</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full px-4 py-4 text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-xl transition-all duration-300 border border-transparent hover:border-red-400/30 shadow-sm hover:shadow-md transform hover:scale-105"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-lg font-medium">Sign Out</span>
        </button>
      </div>
    ) : (
      <div className="space-y-4">
        <button
          onClick={() => {
            closeMobileMenu();
            signIn();
          }}
          className="block w-full px-6 py-4 text-center text-white hover:text-blue-100 border-2 border-white/30 rounded-2xl hover:bg-white/10 font-bold transition-all duration-300 text-lg transform hover:scale-105 backdrop-blur-sm shadow-lg hover:shadow-xl"
        >
          Sign In
        </button>
        <Link
          href="/auth/signup"
          className="block w-full px-6 py-4 text-center bg-white text-blue-600 rounded-2xl hover:bg-blue-50 font-bold transition-all duration-300 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
          onClick={closeMobileMenu}
        >
          Sign Up
        </Link>
      </div>
    );

  useEffect(() => {
    let interval;
    async function checkNotifications() {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        const lastRead = localStorage.getItem("lastNotificationRead");
        let hasNew = false;
        if (
          Array.isArray(data.notifications) &&
          data.notifications.length > 0
        ) {
          if (!lastRead) {
            hasNew = true;
          } else {
            const lastReadDate = new Date(lastRead);
            hasNew = data.notifications.some(
              (n) => new Date(n.createdAt) > lastReadDate
            );
          }
        }
        setUnread(hasNew);
      } catch {
        setUnread(false);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [!!session]);

  return (
    <>
      <nav className="border-b border-gray-200 sticky top-0 z-50 shadow-lg backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 transform">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl">
                <span className="font-bold text-blue-600">Healthy</span>
                <span className="font-light text-gray-700">Connect</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-2">
              <NavLinks />
            </div>

            <div className="hidden md:block">
              <AuthButtons />
            </div>

            <div className="md:hidden flex items-center space-x-3">
              {session && <NotificationBell mobile={false} />}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-all duration-300 hover:bg-blue-50 rounded-xl shadow-sm hover:shadow-md transform hover:scale-110"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
            <div className="flex flex-col h-full animate-in slide-in-from-top duration-500">
              <div className="flex-1 flex flex-col justify-center px-6 space-y-3">
                <div className="mb-8 text-center">
                  <div className="inline-flex items-center space-x-3 group">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shadow-xl backdrop-blur-sm">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl">
                      <span className="font-bold text-white">Healthy</span>
                      <span className="font-light text-blue-100">Connect</span>
                    </div>
                  </div>
                </div>
                <NavLinks mobile={true} />
              </div>
              <div className="px-6 pb-8">
                <MobileAuth />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
