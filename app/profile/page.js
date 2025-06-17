"use client";
import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Briefcase,
  Edit3,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Calendar,
  Shield,
  Phone,
  MapPin,
  GraduationCap,
  Camera,
  Loader2,
  Eye,
  EyeOff,
  Lock,
  Sparkles,
  Heart,
} from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "sonner";
import {
  motion,
  staggerContainer,
  textVariant,
  fadeIn,
  slideIn,
} from "../../utils/motion";

const PROFESSIONS = [
  { value: "nursing", label: "Nursing" },
  { value: "cna", label: "CNA (Certified Nursing Assistant)" },
  { value: "administration", label: "Administration" },
  { value: "medical officer", label: "Medical Officer" },
  { value: "clinical officer", label: "Clinical Officer" },
  { value: "care giver", label: "Care Giver" },
  { value: "home-based caregiver", label: "Home-based Caregiver" },
  { value: "public health officer", label: "Public Health Officer" },
  { value: "community health worker", label: "Community Health Worker" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "laboratory", label: "Laboratory" },
  { value: "radiology", label: "Radiology" },
  { value: "nutritionist", label: "Nutritionist" },
  { value: "dental", label: "Dental" },
  { value: "physiotherapy", label: "Physiotherapy" },
  { value: "occupational therapy", label: "Occupational Therapy" },
  { value: "speech therapy", label: "Speech Therapy" },
  { value: "psychology", label: "Psychology" },
  { value: "psychiatry", label: "Psychiatry" },
  { value: "medical technician", label: "Medical Technician" },
  { value: "medical engineer", label: "Medical Engineer" },
  { value: "orthopedics", label: "Orthopedics" },
  { value: "optometry", label: "Optometry" },
  { value: "anesthesiology", label: "Anesthesiology" },
  { value: "surgery", label: "Surgery" },
  { value: "midwifery", label: "Midwifery" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "gynecology", label: "Gynecology" },
  { value: "general practitioner", label: "General Practitioner" },
  { value: "health records officer", label: "Health Records Officer" },
  { value: "health administration", label: "Health Administration" },
  { value: "hospital porter", label: "Hospital Porter" },
  { value: "hospital cleaner", label: "Hospital Cleaner" },
  { value: "ambulance driver", label: "Ambulance Driver" },
  {
    value: "emergency medical technician (emt)",
    label: "Emergency Medical Technician (EMT)",
  },
  { value: "telemedicine", label: "Telemedicine" },
  { value: "health educator", label: "Health Educator" },
  { value: "hiv/aids counselor", label: "HIV/AIDS Counselor" },
  { value: "social worker", label: "Social Worker" },
  { value: "vaccination outreach", label: "Vaccination Outreach" },
  { value: "medical sales rep", label: "Medical Sales Representative" },
  { value: "health insurance agent", label: "Health Insurance Agent" },
  {
    value: "occupational health officer",
    label: "Occupational Health Officer",
  },
  {
    value: "environmental health officer",
    label: "Environmental Health Officer",
  },
  { value: "biomedical scientist", label: "Biomedical Scientist" },
  { value: "mortuary attendant", label: "Mortuary Attendant" },
  { value: "first responder", label: "First Responder" },
];

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    profession: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch user profile
  useEffect(() => {
    let isMounted = true;
    const fetchUserProfile = async () => {
      try {
        setFetching(true);
        const response = await fetch("/api/users/profile");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch profile");
        }

        if (isMounted && data.success) {
          setFormData({
            username: data.user.username || "",
            email: data.user.email || "",
            profession: data.user.profession || "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      } catch (error) {
        if (isMounted) {
          const errorMsg = "Failed to fetch profile data";
          setMessage({ type: "error", text: errorMsg });
          toast.error(errorMsg);
        }
      } finally {
        if (isMounted) setFetching(false);
      }
    };

    if (session?.user?.id) {
      fetchUserProfile();
    }

    return () => {
      isMounted = false;
    };
  }, [session?.user?.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      if (
        formData.newPassword &&
        formData.newPassword !== formData.confirmPassword
      ) {
        const errorMsg = "New passwords do not match";
        setMessage({ type: "error", text: errorMsg });
        toast.error(errorMsg);
        return;
      }

      const updateData = {
        username: formData.username || session?.user?.username,
        email: formData.email || session?.user?.email,
        profession: formData.profession || session?.user?.profession,
        ...(formData.newPassword && {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      };

      const { data } = await axios.put("/api/users/profile", updateData);

      if (data.success) {
        if (session) {
          await update({
            ...session,
            user: {
              ...session.user,
              username: formData.username,
              email: formData.email,
              profession: formData.profession,
            },
          });
        }

        const successMsg = data.message || "Profile updated successfully!";
        setMessage({
          type: "success",
          text: successMsg,
        });
        toast.success(successMsg);
        setIsEditing(false);

        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
        toast.success("Profile updated successfully!");
      } else {
        const errorMsg = data.error || "Failed to update profile";
        setMessage({ type: "error", text: errorMsg });
        toast.error(errorMsg);
      }
    } catch (error) {
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.error || error.message
        : error instanceof Error
        ? error.message
        : "Failed to update profile";

      setMessage({ type: "error", text: errorMessage });
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      username: session?.user?.username || session?.user?.name || "",
      email: session?.user?.email || "",
      profession: session?.user?.profession || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsEditing(false);
    setMessage({ type: "", text: "" });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getProfessionLabel = (value) => {
    const profession = PROFESSIONS.find((p) => p.value === value);
    return profession ? profession.label : value;
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-white to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-gray-600">
            Being Logged In Gives You Benefits..., Are You Logged In?
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/50 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <motion.div variants={textVariant(0.2)}>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2 sm:gap-3">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                My Profile
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Manage your account information
              </p>
            </motion.div>

            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-start sm:justify-end">
              {session?.user?.isAdmin && (
                <motion.span
                  className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200/50 whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Shield className="w-3 h-3 mr-1 sm:mr-1.5 text-purple-600" />
                  Admin
                </motion.span>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Content */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10"
        variants={staggerContainer(0.1, 0.2)}
        initial="hidden"
        animate="show"
      >
        {/* Message */}
        {message.text && (
          <motion.div
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
              message.type === "success"
                ? "bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800"
                : "bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-800"
            }`}
            variants={fadeIn("down", "spring", 0, 0.6)}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <span>{message.text}</span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Avatar & Basic Info */}
          <motion.div
            className="lg:col-span-1"
            variants={fadeIn("right", "spring", 0.3, 0.8)}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300">
              <div className="text-center">
                <div className="relative inline-block">
                  <motion.div
                    className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {(
                      formData.username ||
                      session?.user?.name ||
                      session?.user?.email
                    )
                      ?.charAt(0)
                      ?.toUpperCase() || "U"}
                  </motion.div>
                  {isEditing && (
                    <motion.button
                      className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-2 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Camera className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>

                <motion.h3
                  className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1"
                  whileHover={{ scale: 1.05 }}
                >
                  {formData.username || session?.user?.name || "User"}
                </motion.h3>
                <p className="text-gray-600 mb-4 font-medium">
                  {getProfessionLabel(formData.profession) ||
                    "Healthcare Professional"}
                </p>

                <div className="space-y-3 text-sm">
                  <motion.div
                    className="flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>Joined {formatDate(session?.user?.createdAt)}</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center justify-center gap-2 text-gray-600 hover:text-purple-600 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Mail className="w-4 h-4 text-purple-500" />
                    <span>{formData.email}</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            className="lg:col-span-2"
            variants={fadeIn("left", "spring", 0.3, 0.8)}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500" />
                Profile Information
              </h3>

              <div className="space-y-6">
                {/* Username */}
                <motion.div variants={fadeIn("up", "spring", 0.4, 0.6)}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2 text-blue-500" />
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 hover:border-blue-400"
                    placeholder="Enter your username"
                  />
                </motion.div>

                {/* Email */}
                <motion.div variants={fadeIn("up", "spring", 0.5, 0.6)}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2 text-purple-500" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 hover:border-purple-400"
                    placeholder="Enter your email"
                  />
                </motion.div>

                {/* Profession */}
                <motion.div variants={fadeIn("up", "spring", 0.6, 0.6)}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="w-4 h-4 inline mr-2 text-green-500" />
                    Profession
                  </label>
                  <select
                    name="profession"
                    value={formData.profession}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 hover:border-green-400"
                  >
                    <option value="">Select your profession</option>
                    {PROFESSIONS.map((profession) => (
                      <option key={profession.value} value={profession.value}>
                        {profession.label}
                      </option>
                    ))}
                  </select>
                </motion.div>

                {/* Password Change Section */}
                {isEditing && (
                  <motion.div
                    className="border-t border-gray-200 pt-6"
                    variants={fadeIn("up", "spring", 0.7, 0.6)}
                  >
                    <h4 className="text-lg font-medium bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-orange-500" />
                      Change Password
                    </h4>
                    <div className="space-y-4">
                      {/* Current Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent pr-12 transition-all duration-200 hover:border-orange-400"
                            placeholder="Enter current password"
                          />
                          <motion.button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </motion.button>
                        </div>
                      </div>

                      {/* New Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-orange-400"
                          placeholder="Enter new password"
                        />
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-orange-400"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                {!isEditing ? (
                  <motion.button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl whitespace-nowrap"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Edit3 className="w-3 sm:w-4 h-3 sm:h-4" />
                    <span className="text-sm sm:text-base">Edit Profile</span>
                  </motion.button>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <motion.button
                      onClick={handleCancel}
                      className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors font-medium whitespace-nowrap"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <X className="w-3 sm:w-4 h-3 sm:h-4 text-gray-600" />
                      <span className="text-sm sm:text-base">Cancel</span>
                    </motion.button>
                    <motion.button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium disabled:opacity-50 shadow-lg hover:shadow-xl whitespace-nowrap"
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? (
                        <Loader2 className="w-3 sm:w-4 h-3 sm:h-4 animate-spin" />
                      ) : (
                        <Save className="w-3 sm:w-4 h-3 sm:h-4" />
                      )}
                      <span className="text-sm sm:text-base">Save Changes</span>
                    </motion.button>
                  </div>
                )}
                {!isEditing && (
                  <div className="flex  items-center gap-2  align-center mt-6">
                    <MapPin className="w-3 sm:w-4 h-3 sm:h-4 text-green-500" />
                    <p className="text-sm font-light sm:text-base text-gray-600 mt-2">
                      Use the edit button to update your profile.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
