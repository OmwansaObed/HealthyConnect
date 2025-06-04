"use client";
import React, { useState } from "react";
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
} from "lucide-react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { data: session } = useSession();

  const navLinks = [
    { name: "Find Jobs", href: "/jobs", icon: Briefcase },
    { name: "Categories", href: "/categories", icon: Grid3X3 },
  ];

  const handleProfileMenuToggle = () => setProfileMenuOpen((prev) => !prev);
  const handleProfileMenuClose = () => setProfileMenuOpen(false);
  const closeMobileMenu = () => setIsMenuOpen(false);

  const NavLinks = ({ mobile = false }) =>
    navLinks.map((link) => {
      const Icon = link.icon;
      return (
        <Link
          key={link.name}
          href={link.href}
          className={`group flex items-center space-x-2 font-medium transition-all duration-200 ${
            mobile
              ? "px-4 py-3 text-white hover:text-blue-200 hover:bg-white/10 rounded-lg"
              : "px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
          }`}
          onClick={closeMobileMenu}
        >
          <Icon className="w-4 h-4" />
          <span>{link.name}</span>
        </Link>
      );
    });

  const AuthButtons = () =>
    session ? (
      <div className="flex items-center space-x-4 ">
        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg">
          <Bell className="w-5 h-5" />
        </button>
        <div className="relative">
          <button
            onClick={handleProfileMenuToggle}
            className="flex items-center space-x-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">
              {session.user?.name?.split(" ")[0] || "Profile"}
            </span>
          </button>

          {profileMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={handleProfileMenuClose}
                aria-label="Close profile menu"
              />
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                <div className="p-2">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {session.user?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {session.user?.email}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors mt-2"
                    onClick={handleProfileMenuClose}
                  >
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                    onClick={handleProfileMenuClose}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleProfileMenuClose();
                      signOut();
                    }}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    ) : (
      <div className="flex items-center space-x-3">
        <button
          onClick={() => signIn()}
          className="px-6 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors rounded-lg hover:bg-blue-50"
        >
          Sign In
        </button>
        <Link
          href="/auth/signup"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
        >
          Sign Up
        </Link>
      </div>
    );

  const MobileAuth = () =>
    session ? (
      <div className="space-y-3 bg-gradient-to-br from-blue-50 to-white border-t rounded-md shadow-lg border-blue-100">
        <div className="flex items-center px-4 py-3 bg-white/10 rounded-lg">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-black font-medium">{session.user?.name}</p>
            <p className="text-gray-700 text-sm">{session.user?.email}</p>
          </div>
        </div>
        <button className="flex items-center space-x-3 px-4 py-3 text-gray-800 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors w-full">
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
        </button>
        <Link
          href="/profile"
          className="flex items-center space-x-3 px-4 py-3 text-gray-800 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
          onClick={closeMobileMenu}
        >
          <User className="w-5 h-5" />
          <span>My Profile</span>
        </Link>
        <Link
          href="/settings"
          className="flex items-center space-x-3 px-4 py-3 text-gray-800 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
          onClick={closeMobileMenu}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
        <button
          onClick={() => {
            closeMobileMenu();
            signOut();
          }}
          className="flex items-center space-x-3 w-full px-4 py-3 text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    ) : (
      <div className="space-y-3">
        <button
          onClick={() => {
            closeMobileMenu();
            signIn();
          }}
          className="block w-full px-6 py-3 text-center text-blue-50 hover:text-white border border-blue-300 rounded-lg hover:bg-white/10 font-medium transition-colors"
        >
          Sign In
        </button>
        <Link
          href="/auth/signup"
          className="block w-full px-6 py-3 text-center bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors"
          onClick={closeMobileMenu}
        >
          Sign Up
        </Link>
      </div>
    );

  return (
    <>
      <nav className="bg-gradient-to-br  to-white border-t  bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="text-2xl">
                <span className="font-bold text-blue-600">Healthy</span>
                <span className="font-light text-gray-700">Connect</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              <NavLinks />
            </div>

            <div className="hidden md:block">
              <AuthButtons />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {session && (
                <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-lg">
                  <Bell className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
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

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800">
            <div className="flex flex-col h-full">
              <div className="flex-1 flex flex-col justify-center px-6 space-y-2">
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
