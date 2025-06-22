import {
  X,
  Briefcase,
  MapPin,
  DollarSign,
  Phone,
  Globe,
  User,
  Clock,
  GraduationCap,
  Calendar,
  FileText,
  Settings,
  Shield,
  Users,
  Timer,
  Award,
  MessageCircle,
} from "lucide-react";

// components/admin/jobs/JobViewModal.jsx
export default function JobViewModal({
  job,
  isOpen,
  onClose,
  getStatusColor,
  getStatusBadge,
}) {
  if (!isOpen || !job) return null;

  const formatExperience = (experience) => {
    if (!experience || experience === "not-listed") return "Not specified";
    return experience === "entry-level" ? "Entry Level" : `${experience} years`;
  };

  const formatSalary = (salary) => {
    if (!salary || salary === "not-listed") return "Not disclosed";
    return salary;
  };

  const formatPreference = (preference, field) => {
    if (!preference || !preference[field] || preference[field] === "any") {
      return "No preference";
    }
    return preference[field];
  };

  const formatLanguage = (language) => {
    if (!language || language === "english") return "English";
    return language.charAt(0).toUpperCase() + language.slice(1);
  };

  const formatPhone = (phone) => {
    if (!phone) return "Not provided";
    // Format Kenyan phone numbers
    if (phone.startsWith("+254")) {
      return phone
        .replace("+254", "+254 ")
        .replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
    }
    if (phone.startsWith("0")) {
      return phone.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
    }
    return phone;
  };

  const getPreferenceIcon = (field) => {
    switch (field) {
      case "gender":
        return <Users className="w-4 h-4" />;
      case "age":
        return <User className="w-4 h-4" />;
      case "certificate":
        return <GraduationCap className="w-4 h-4" />;
      case "time":
        return <Clock className="w-4 h-4" />;
      case "contactType":
        return <MessageCircle className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  const getPreferenceColor = (field) => {
    switch (field) {
      case "gender":
        return "text-pink-600 bg-pink-100";
      case "age":
        return "text-blue-600 bg-blue-100";
      case "certificate":
        return "text-purple-600 bg-purple-100";
      case "time":
        return "text-orange-600 bg-orange-100";
      case "contactType":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div
          className={`p-6 border-l-4 ${getStatusColor(
            job.status
          )} bg-gradient-to-r from-gray-50 to-white`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {job.title}
                </h2>
                <span
                  className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusBadge(
                    job.status
                  )}`}
                >
                  {job.status}
                </span>
              </div>
              <p className="text-gray-600">
                Posted by <span className="font-medium">{job.postedBy}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Posted on{" "}
                {new Date(job.createdAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Job Details */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  Job Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium capitalize bg-blue-100 text-blue-800 px-2 py-1 rounded-lg text-sm">
                      {job.type}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium capitalize bg-green-100 text-green-800 px-2 py-1 rounded-lg text-sm">
                      {job.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">
                      {formatExperience(job.experience)} years experience
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Salary:</span>
                    <span className="font-medium text-emerald-600">
                      {formatSalary(job.salary)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-600" />
                  Location
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">State:</span>
                    <span className="font-medium">{job.location?.state}</span>
                  </div>
                  {job.location?.county && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">County:</span>
                      <span className="font-medium">{job.location.county}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-cyan-600" />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium font-mono bg-cyan-50 text-cyan-700 px-2 py-1 rounded">
                      {formatPhone(job.phone)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Preferred Language:</span>
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4 text-indigo-600" />
                      <span className="font-medium">
                        {formatLanguage(job.preferredCommunicationLanguage)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Job Description */}
              {job.description && (
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-purple-600" />
                    Job Description
                  </h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {job.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Candidate Preferences */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-pink-600" />
                  Candidate Preferences
                </h3>
                <div className="space-y-3">
                  {/* Gender Preference */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`p-1 rounded-lg ${getPreferenceColor(
                          "gender"
                        )}`}
                      >
                        {getPreferenceIcon("gender")}
                      </div>
                      <span className="text-gray-600">Gender:</span>
                    </div>
                    <span className="font-medium capitalize">
                      {formatPreference(job.preference, "gender")}
                    </span>
                  </div>

                  {/* Age Preference */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`p-1 rounded-lg ${getPreferenceColor(
                          "age"
                        )}`}
                      >
                        {getPreferenceIcon("age")}
                      </div>
                      <span className="text-gray-600">Age Range:</span>
                    </div>
                    <span className="font-medium">
                      {formatPreference(job.preference, "age")}
                    </span>
                  </div>

                  {/* Education Preference */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`p-1 rounded-lg ${getPreferenceColor(
                          "certificate"
                        )}`}
                      >
                        {getPreferenceIcon("certificate")}
                      </div>
                      <span className="text-gray-600">Education:</span>
                    </div>
                    <span className="font-medium capitalize">
                      {formatPreference(job.preference, "certificate")}
                    </span>
                  </div>

                  {/* Shift Preference */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`p-1 rounded-lg ${getPreferenceColor(
                          "time"
                        )}`}
                      >
                        {getPreferenceIcon("time")}
                      </div>
                      <span className="text-gray-600">Shift:</span>
                    </div>
                    <span className="font-medium capitalize">
                      {formatPreference(job.preference, "time")}
                    </span>
                  </div>

                  {/* Contact Preference */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`p-1 rounded-lg ${getPreferenceColor(
                          "contactType"
                        )}`}
                      >
                        {getPreferenceIcon("contactType")}
                      </div>
                      <span className="text-gray-600">Contact Type:</span>
                    </div>
                    <span className="font-medium">
                      {formatPreference(job.preference, "contactType")?.replace(
                        /-/g,
                        " "
                      )}
                    </span>
                  </div>

                  {/* Recent Graduate Preference */}
                  {job.preference?.completedRecently && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-1 rounded-lg text-amber-600 bg-amber-100">
                          <Award className="w-4 h-4" />
                        </div>
                        <span className="text-gray-600">Recent Graduates:</span>
                      </div>
                      <span className="font-medium text-amber-600">
                        Preferred
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Timestamps */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                  Timeline
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span className="font-medium">
                      {new Date(job.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="font-medium">
                      {new Date(job.updatedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-6 py-4">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
