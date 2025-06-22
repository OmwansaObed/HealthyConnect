import {
  Award,
  Briefcase,
  CheckCircle,
  Heart,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { GiLaserWarning } from "react-icons/gi";
import { MdScience } from "react-icons/md";

const CATEGORIES = [
  { value: "nursing", label: "Nursing", icon: Heart },
  { value: "medical Officer", label: "Medical Officer", icon: Award },
  { value: "pharmacy", label: "Pharmacy", icon: CheckCircle },
  { value: "laboratory", label: "Laboratory", icon: MdScience },
  { value: "radiology", label: "Radiology", icon: GiLaserWarning },
  { value: "medical engineer", label: "Medical Engineer", icon: Settings },
  { value: "dental", label: "Dental", icon: Shield },
  { value: "administration", label: "Administration", icon: Briefcase },
  { value: "orthopedics", label: "Orthopedics", icon: Users },
];

const JOB_TYPES = [
  { value: "locum", label: "Locum" },
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "temporary", label: "Temporary" },
  { value: "internship", label: "Internship" },
];

const EXPERIENCE_LEVELS = [
  { value: "entry-level", label: "Entry Level" },
  { value: "1+", label: "1+ Years" },
  { value: "2+", label: "2+ Years" },
  { value: "3+", label: "3+ Years" },
  { value: "4+", label: "4+ Years" },
  { value: "5+", label: "5+ Years" },
];

const LOCATIONS = [
  { value: "nairobi", label: "Nairobi" },
  { value: "mombasa", label: "Mombasa" },
  { value: "kisumu", label: "Kisumu" },
  { value: "nakuru", label: "Nakuru" },
  { value: "eldoret", label: "Eldoret" },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  return `${Math.ceil(diffDays / 30)} months ago`;
};

const formatExperience = (experience) => {
  if (!experience) return "";
  const expMap = {
    entry: "Entry Level",
    mid: "Mid Level",
    senior: "Senior Level",
    executive: "Executive Level",
  };
  return expMap[experience] || experience;
};
const formatPreference = (preference) => {
  if (!preference) return "";
  if (typeof preference !== "string") return "";
  return preference.charAt(0).toUpperCase() + preference.slice(1);
};

const formatLanguage = (language) => {
  if (!language) return "";
  const langMap = {
    english: "English",
    swahili: "Swahili",
    both: "English & Swahili",
  };
  return langMap[language] || language;
};

const getJobTypeColor = (type) => {
  const colorMap = {
    "full-time": "bg-green-50 text-green-700 border-green-200",
    "part-time": "bg-blue-50 text-blue-700 border-blue-200",
    contract: "bg-purple-50 text-purple-700 border-purple-200",
    temporary: "bg-orange-50 text-orange-700 border-orange-200",
    internship: "bg-pink-50 text-pink-700 border-pink-200",
  };
  return colorMap[type] || "bg-gray-50 text-gray-700 border-gray-200";
};

const calculateJobStatus = (createdAt) => {
  const now = new Date();
  const postDate = new Date(createdAt);
  const daysDiff = Math.ceil((now - postDate) / (1000 * 60 * 60 * 24));

  if (daysDiff <= 1) return "new";
  if (daysDiff <= 2) return "older";
  if (daysDiff <= 30) return "past";
  return "older";
};

const getStatusBadge = (status) => {
  const statusMap = {
    new: "bg-green-100 text-green-800 border-green-200",
    past: "bg-red-100 text-red-800 border-red-200",
    older: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };
  return statusMap[status] || statusMap.older;
};

const getStatusText = (status) => {
  const textMap = {
    new: "New",
    past: "Past",
    older: "Older",
  };
  return textMap[status] || "Active";
};

export {
  CATEGORIES,
  JOB_TYPES,
  EXPERIENCE_LEVELS,
  LOCATIONS,
  formatDate,
  formatExperience,
  formatPreference,
  formatLanguage,
  getJobTypeColor,
  calculateJobStatus,
  getStatusBadge,
  getStatusText,
};
