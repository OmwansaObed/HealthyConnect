"use client";

import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
