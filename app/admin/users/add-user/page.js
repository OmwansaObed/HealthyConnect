"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAddUserMutation } from "../../../../redux/api/usersApiSlice";
import { toast } from "sonner";
import AdminSidebar from "../../../../components/admin/AdminSidebar";
import { Menu, X } from "lucide-react";

export default function AddUserPage() {
  const router = useRouter();
  const [addUser, { isLoading, error }] = useAddUserMutation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    profession: "",
    isAdmin: false,
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

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
    { value: "coHo", label: "CoHo" },
    { value: "theatretechs", label: "Theatre Technician" },
    { value: "ambulance-crews", label: "Ambulance Crew" },
    { value: "casuals", label: "Casuals" },
    { value: "chvs", label: "CHVs" },
    { value: "student", label: "Student" },
    { value: "dentists", label: "Dentist" },
    { value: "public-health-officers", label: "Public Health Officer" },
    { value: "psychology", label: "Psychology" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    if (!form.username || !form.email || !form.profession || !form.password) {
      setFormError("All fields except 'isAdmin' are required.");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await addUser({
        username: form.username,
        email: form.email,
        profession: form.profession,
        isAdmin: form.isAdmin,
        password: form.password,
      }).unwrap();
      toast.success("User added successfully!");
      router.push("/admin/users");
      setSuccess(true);
    } catch (err) {
      setFormError(err?.data?.error || "Failed to add user.");
      toast.error(formError || "Failed to add user.");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content Area */}
      <div className="flex-1 md:ml-64">
        {/* Mobile Header */}
        <div className="md:hidden bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">
              Add New User
            </h1>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {isSidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="p-6">
          <div className="max-w-2xl mx-auto">
            {/* Desktop Header */}
            <div className="hidden md:block mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Add New User</h1>
              <p className="text-gray-600 mt-2">
                Create a new user account for the HealthyConnect platform
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username *
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={form.username}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter username"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profession *
                  </label>
                  <select
                    name="profession"
                    value={form.profession}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  >
                    <option value="">Select Profession</option>
                    {professions.map((prof) => (
                      <option key={prof.value} value={prof.value}>
                        {prof.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter password"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isAdmin"
                    checked={form.isAdmin}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-3 text-sm font-medium text-gray-700">
                    Grant Admin Privileges
                  </label>
                </div>

                {formError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{formError}</p>
                  </div>
                )}

                {success && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-600 text-sm">
                      User added successfully!
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="button"
                    onClick={() => router.push("/admin/users")}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Adding User...
                      </span>
                    ) : (
                      "Add User"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
