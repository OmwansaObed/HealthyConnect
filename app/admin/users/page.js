"use client";
import React, { useState, useMemo } from "react";
import {
  Users,
  Search,
  Filter,
  Edit,
  Trash2,
  Download,
  Mail,
  Shield,
  ShieldCheck,
  Eye,
  Plus,
  RefreshCw,
  X,
  AlertTriangle,
} from "lucide-react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useBulkDeleteUsersMutation,
  useUpdateUserMutation,
} from "../../../redux/api/usersApiSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import JobViewModal from "../../../components/admin/job-listing/JobViewModal";

export default function UsersAdminDashboard({
  getStatusBadge,
  getStatusColor,
  showViewModal,
  setShowViewModal,
  selectedJob,
}) {
  const { data: users = [], isLoading, error } = useGetUsersQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bulkActionType, setBulkActionType] = useState("");

  // update User states
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    profession: "",
    isAdmin: false,
  });

  const route = useRouter();

  const professions = [
    { value: "nurse", label: "Nurse" },
    { value: "medical-officer-intern", label: "Medical Officer Intern" },
    { value: "Medica-officer", label: "Medical Officer" },
    { value: "phsychiatrist", label: "Psychiatrist" },
    { value: "physi-ortho", label: "Physio-Ortho" },
    { value: "pharmtechs", label: "Pharmacy Technician" },
    { value: "labtechs", label: "Lab Technician" },
    {
      value: "registerd-clinical-officer",
      label: "Registered Clinical Officer",
    },
    { value: "coho", label: "CoHo" },
    { value: "theatretechs", label: "Theatre Technician" },
    { value: "ambulance-crews", label: "Ambulance Crew" },
    { value: "casuals", label: "Casuals" },
    { value: "chvs", label: "CHVs" },
    { value: "student", label: "Student" },
    { value: "dentists", label: "Dentist" },
    { value: "public-health-officers", label: "Public Health Officer" },
    { value: "psychology", label: "Psychology" },
  ];

  // custom hooks
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [bulkDeleteUsers, { isLoading: isBulkDeleting }] =
    useBulkDeleteUsersMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const filteredUsers = useMemo(() => {
    let filtered = users.filter((user) => {
      const matchesSearch =
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProfession =
        selectedProfession === "all" || user.profession === selectedProfession;
      return matchesSearch && matchesProfession;
    });
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "name":
          return a.username.localeCompare(b.username);
        case "email":
          return a.email.localeCompare(b.email);
        default:
          return 0;
      }
    });
    return filtered;
  }, [users, searchTerm, selectedProfession, sortBy]);
  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers.length === filteredUsers.length
        ? []
        : filteredUsers.map((user) => user._id)
    );
  };

  const handleBulkAction = (action) => {
    setModalType("bulk");
    setBulkActionType(action);
    setShowModal(true);
  };

  const executeUserAction = async () => {
    if (modalType === "delete" && selectedUser) {
      setLoading(true);
      try {
        await deleteUser(selectedUser._id).unwrap();
        setShowModal(false);
        setSelectedUser(null);
        toast.success("User deleted successfully!");
      } catch (error) {
        console.error("Failed to delete user:", error);
        toast.error(error?.data?.message || "Failed to delete user");
      } finally {
        setLoading(false);
      }
    } else if (modalType === "bulk" && bulkActionType === "delete") {
      setLoading(true);
      try {
        await bulkDeleteUsers(selectedUsers).unwrap();
        setShowModal(false);
        setSelectedUsers([]);
        toast.success(`${selectedUsers.length} users deleted successfully!`);
      } catch (error) {
        console.error("Failed to delete users:", error);
        toast.error(error?.data?.message || "Failed to delete users");
      } finally {
        setLoading(false);
      }
    } else if (modalType === "edit" && selectedUser) {
      setLoading(true);
      try {
        // validate form
        if (!editForm.profession) {
          toast.error("Please fill in all fields");
          return;
        }

        // update user
        await updateUser({
          id: selectedUser._id,
          ...editForm,
        }).unwrap();
        setShowModal(false);
        setSelectedUser(null);
        toast.success("User updated successfully!");
      } catch (error) {
        console.error("Failed to update user:", error);
        toast.error(error?.data?.error || "Failed to update user");
      } finally {
        setLoading(false);
      }
    } else {
      // Handle other modal types (create, email)
      setLoading(true);
      setTimeout(() => {
        setShowModal(false);
        setSelectedUser(null);
        setLoading(false);
      }, 1000);
    }
  };
  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUserAction = (action, user) => {
    setModalType(action);
    setSelectedUser(user);
    if (action === "edit" && user) {
      setEditForm({
        username: user.username || "",
        email: user.email || "",
        profession: user.profession || "",
        isAdmin: !!user.isAdmin,
      });
    }
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Users Management
                </h1>
                <p className="text-gray-600">
                  Manage healthcare professionals and administrators
                </p>
              </div>
            </div>
            <button
              onClick={() => route.push("/admin/users/add-user")}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add User</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.length}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Admins</p>
                <p className="text-2xl font-bold text-purple-600">
                  {users.filter((u) => u.isAdmin).length}
                </p>
              </div>
              <ShieldCheck className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border mb-6">
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
              </div>
              <div className="flex space-x-2">
                {selectedUsers.length > 0 && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleBulkAction("delete")}
                      disabled={isBulkDeleting}
                      className={`px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center ${
                        isBulkDeleting ? "opacity-50" : ""
                      }`}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      <span>
                        {isBulkDeleting
                          ? "Deleting..."
                          : `Delete (${selectedUsers.length})`}
                      </span>
                    </button>
                  </div>
                )}
                <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button
                  onClick={() => setLoading(true)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  />
                </button>
              </div>
            </div>
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profession
                    </label>
                    <select
                      value={selectedProfession}
                      onChange={(e) => setSelectedProfession(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Professions</option>
                      {professions.map((prof) => (
                        <option key={prof.value} value={prof.value}>
                          {prof.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="name">Name A-Z</option>
                      <option value="email">Email A-Z</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedUsers.length === filteredUsers.length &&
                        filteredUsers.length > 0
                      }
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Profession
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user._id)}
                        onChange={() => handleSelectUser(user._id)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {user.username?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {user.username}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">
                        {professions.find((p) => p.value === user.profession)
                          ?.label || user.profession}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        {user.isAdmin && (
                          <Shield className="w-4 h-4 text-purple-600" />
                        )}
                        <span
                          className={
                            user.isAdmin
                              ? "text-purple-600 font-medium"
                              : "text-gray-600"
                          }
                        >
                          {user.isAdmin ? "Admin" : "User"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleUserAction("view", user)}
                          className="p-1 text-gray-400 hover:text-blue-600"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUserAction("edit", user)}
                          className="p-1 text-gray-400 hover:text-emerald-600"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUserAction("email", user)}
                          className="p-1 text-gray-400 hover:text-orange-600"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleUserAction("delete", user)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                No users found matching your criteria
              </p>
            </div>
          )}
        </div>
        {/* Pagination (optional, not implemented) */}
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {modalType === "delete"
                  ? "Delete User"
                  : modalType === "edit"
                  ? "Edit User"
                  : modalType === "view"
                  ? "User Details"
                  : modalType === "email"
                  ? "Send Email"
                  : "Create User"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {modalType === "delete" && (
              <div>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete user "{selectedUser?.username}
                  " ? This action cannot be undone.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={executeUserAction}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            )}
            {modalType === "view" && selectedUser && (
              // <div className="space-y-4">
              //   <div className="flex items-center space-x-3 mb-4">
              //     <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              //       {selectedUser.username.charAt(0).toUpperCase()}
              //     </div>
              //     <div>
              //       <h4 className="font-bold text-gray-900">
              //         {selectedUser.username}
              //       </h4>
              //       <p className="text-gray-600">{selectedUser.email}</p>
              //     </div>
              //   </div>
              //   <div className="space-y-2">
              //     <div className="flex justify-between">
              //       <span className="text-gray-600">Profession:</span>
              //       <span className="font-medium">
              //         {professions.find(
              //           (p) => p.value === selectedUser.profession
              //         )?.label || selectedUser.profession}
              //       </span>
              //     </div>
              //     <div className="flex justify-between">
              //       <span className="text-gray-600">Role:</span>
              //       <span className="font-medium">
              //         {selectedUser.isAdmin ? "Admin" : "User"}
              //       </span>
              //     </div>
              //     <div className="flex justify-between">
              //       <span className="text-gray-600">Joined:</span>
              //       <span className="font-medium">
              //         {formatDate(selectedUser.createdAt)}
              //       </span>
              //     </div>
              //   </div>
              // </div>
              <JobViewModal
                job={selectedJob}
                isOpen={showViewModal}
                onClose={() => setShowViewModal(false)}
                getStatusColor={getStatusColor}
                getStatusBadge={getStatusBadge}
              />
            )}
            {(modalType === "edit" || modalType === "create") && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={editForm.username}
                    onChange={handleEditInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profession
                  </label>
                  <select
                    name="profession"
                    value={editForm.profession}
                    onChange={handleEditInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Profession</option>
                    {professions.map((prof) => (
                      <option key={prof.value} value={prof.value}>
                        {prof.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="isAdmin"
                    checked={editForm.isAdmin}
                    onChange={handleEditInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label className="text-sm font-medium text-gray-700">
                    Admin User
                  </label>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={executeUserAction}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading
                      ? "Saving..."
                      : modalType === "create"
                      ? "Create"
                      : "Save"}
                  </button>
                </div>
              </div>
            )}
            {modalType === "email" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <input
                    type="email"
                    value={selectedUser?.email || ""}
                    disabled
                    className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Email subject"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write your message here..."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={executeUserAction}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{loading ? "Sending..." : "Send Email"}</span>
                  </button>
                </div>
              </div>
            )}
            {modalType === "bulk" && bulkActionType === "delete" && (
              <div>
                <div className="flex items-start mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-gray-600">
                    Are you sure you want to delete {selectedUsers.length}{" "}
                    selected users? This action cannot be undone.
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={executeUserAction}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    {loading
                      ? "Deleting..."
                      : `Delete (${selectedUsers.length})`}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
