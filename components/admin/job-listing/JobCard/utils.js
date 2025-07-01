import {
  calculateJobStatus,
  CATEGORIES,
  getStatusText,
  formatDate,
  formatExperience,
  formatLanguage,
  formatPreference,
  getJobTypeColor,
  getStatusBadge,
} from "../../.././../utils/constants";

import {
  AlertCircle,
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  Eye,
  Globe,
  GraduationCap,
  MapPin,
  Phone,
  RefreshCw,
  Search,
  User,
  Users,
  Award,
  MessageCircle,
  X,
} from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search jobs by title, company, or keywords...",
}) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Search className="h-5 w-5 text-gray-400" />
    </div>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 transition-all duration-200"
    />
  </div>
);

const FilterSelect = ({ label, value, options, onChange, icon: Icon }) => (
  <div className="space-y-2">
    <label className=" text-sm font-semibold text-gray-700 flex items-center gap-2">
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition-all duration-200"
    >
      <option value="">All {label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const NoResults = ({ clearAllFilters }) => (
  <div className="col-span-full text-center py-16 px-4">
    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <Search className="w-12 h-12 text-blue-500" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">
      No matching jobs found
    </h3>
    <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
      We couldn't find any jobs matching your current search criteria. Try
      adjusting your filters or search terms to discover more opportunities.
    </p>
    <button
      onClick={clearAllFilters}
      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
    >
      <RefreshCw className="w-5 h-5" />
      Reset All Filters
    </button>
  </div>
);

// Helper function to format preference values
const formatPreferenceValue = (key, value) => {
  if (!value || value === "any") return "No preference";

  switch (key) {
    case "gender":
      return value === "male" ? "Male" : value === "female" ? "Female" : "Any";
    case "age":
      return value === "any" ? "No preference" : `${value} years old`;
    case "contactType":
      return value === "text-or-whatsapp-only"
        ? "Text/WhatsApp Only"
        : value === "calls-or-text"
        ? "Calls or Text"
        : "Any method";
    case "time":
      return value === "day"
        ? "Day shift"
        : value === "night"
        ? "Night shift"
        : "Any time";
    case "certificate":
      return value.charAt(0).toUpperCase() + value.slice(1);
    case "completedRecently":
      return value
        ? "Recently completed training preferred"
        : "Experience level flexible";
    default:
      return value;
  }
};

const JobDetailModal = ({ job, isOpen, onClose }) => {
  if (!isOpen || !job) return null;

  const category = CATEGORIES.find((c) => c.value === job.category);
  const IconComponent = category?.icon || Briefcase;
  const jobStatus = calculateJobStatus(job.createdAt);

  const whatsappLink = job.phone
    ? (() => {
        // Remove all non-digit characters
        let digits = job.phone.replace(/\D/g, "");
        // Replace leading '01' with '254'
        if (digits.startsWith("01")) {
          digits = "254" + digits.slice(2);
        } else if (digits.startsWith("07")) {
          // Remove leading zero for '07' numbers and add country code
          digits = "254" + digits.slice(1);
        } else if (!digits.startsWith("254")) {
          // Add country code if not present
          digits = "254" + digits;
        }
        return `https://wa.me/${digits}`;
      })()
    : null;

  // Check if there are any specific preferences set
  const hasSpecificPreferences =
    job.preference &&
    Object.entries(job.preference).some(([key, value]) => {
      if (key === "completedRecently") return value === true;
      return value && value !== "any" && value !== "";
    });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-lg">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold leading-tight">
                    {job.title}
                  </h2>
                  {job.postedBy && (
                    <p className="text-blue-100 text-sm">by {job.postedBy}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(
                    jobStatus
                  )}`}
                >
                  {getStatusText(jobStatus)}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getJobTypeColor(
                    job.type
                  )}`}
                >
                  {job.type?.replace("-", " ").toUpperCase() || "N/A"}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Location */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Location</p>
                  <p className="font-semibold text-gray-900">
                    {job.location?.state || "Kenya"}
                    {job.location?.county && `, ${job.location.county}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Salary */}
            {job.salary && job.salary !== "not-listed" && (
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Salary</p>
                    <p className="font-semibold text-gray-900">{job.salary}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Experience */}
            {formatExperience(job.experience) && (
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Experience
                    </p>
                    <p className="font-semibold text-gray-900">
                      {formatExperience(job.experience)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Language */}
            {formatLanguage(job.preferredCommunicationLanguage) && (
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Globe className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Language
                    </p>
                    <p className="font-semibold text-gray-900">
                      {formatLanguage(job.preferredCommunicationLanguage)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Posted Date */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Posted</p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(job.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact */}
            {job.phone && (
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Contact</p>
                    <p className="font-semibold text-gray-900">{job.phone}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {job.description && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Job Description
              </h3>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {job.description}
                </p>
              </div>
            </div>
          )}

          {/* Detailed Employer Preferences */}
          {hasSpecificPreferences && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Employer Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Gender Preference */}
                {job.preference?.gender && job.preference.gender !== "any" && (
                  <div className="bg-pink-50 rounded-xl p-4 border border-pink-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-pink-100 rounded-lg">
                        <User className="w-4 h-4 text-pink-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Gender
                        </p>
                        <p className="font-semibold text-pink-800">
                          {formatPreferenceValue(
                            "gender",
                            job.preference.gender
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Age Preference */}
                {job.preference?.age && job.preference.age !== "any" && (
                  <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-yellow-100 rounded-lg">
                        <Calendar className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Age Range
                        </p>
                        <p className="font-semibold text-yellow-800">
                          {formatPreferenceValue("age", job.preference.age)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Type Preference */}
                {job.preference?.contactType &&
                  job.preference.contactType !== "any" && (
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <MessageCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Contact Method
                          </p>
                          <p className="font-semibold text-green-800">
                            {formatPreferenceValue(
                              "contactType",
                              job.preference.contactType
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                {/* Time Preference */}
                {job.preference?.time && job.preference.time !== "any" && (
                  <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 rounded-lg">
                        <Clock className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Preferred Time
                        </p>
                        <p className="font-semibold text-indigo-800">
                          {formatPreferenceValue("time", job.preference.time)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Certificate Preference */}
                {job.preference?.certificate &&
                  job.preference.certificate !== "any" && (
                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Award className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">
                            Education Level
                          </p>
                          <p className="font-semibold text-purple-800">
                            {formatPreferenceValue(
                              "certificate",
                              job.preference.certificate
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                {/* Recently Completed Training */}
                {job.preference?.completedRecently && (
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 md:col-span-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <GraduationCap className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Training Status
                        </p>
                        <p className="font-semibold text-emerald-800">
                          Recently completed training preferred
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* No specific preferences message */}
          {!hasSpecificPreferences && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Employer Preferences
              </h3>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-gray-600 text-center">
                  No specific preferences set - Open to all qualified candidates
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            {job.phone && (
              <a
                href={`tel:${job.phone}`}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            )}

            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            )}

            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobCard = ({ job, onViewDetails }) => {
  const category = CATEGORIES.find((c) => c.value === job.category);
  const IconComponent = category?.icon || Briefcase;
  const jobStatus = calculateJobStatus(job.createdAt);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Status Bar */}
      <div
        className={`h-1 ${
          jobStatus === "new"
            ? "bg-green-500"
            : jobStatus === "recent"
            ? "bg-blue-500"
            : jobStatus === "active"
            ? "bg-yellow-500"
            : "bg-gray-400"
        }`}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <IconComponent className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-blue-600 capitalize">
                {job.category}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1 leading-tight">
              {job.title}
            </h3>
            {job.postedBy && (
              <p className="text-gray-500 text-sm">by {job.postedBy}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <span
              className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusBadge(
                jobStatus
              )}`}
            >
              {getStatusText(jobStatus)}
            </span>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getJobTypeColor(
                job.type
              )}`}
            >
              {job.type?.replace("-", " ").toUpperCase() || "N/A"}
            </span>
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-3 mb-6">
          {/* Location */}
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-green-600 mr-2" />
            <span>
              {job.location?.state || "Kenya"}
              {job.location?.county && `, ${job.location.county}`}
            </span>
          </div>
          {/* Salary */}
          {job.salary && job.salary !== "not-listed" && (
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="w-4 h-4 text-emerald-600 mr-2" />
              <span className="font-medium">{job.salary}</span>
            </div>
          )}
          {/* Experience */}
          {formatExperience(job.experience) && (
            <div className="flex items-center text-sm text-gray-600">
              <GraduationCap className="w-4 h-4 text-orange-600 mr-2" />
              <span>{formatExperience(job.experience)} years experience</span>
            </div>
          )}
          {/* Language */}
          {formatLanguage(job.preferredCommunicationLanguage) && (
            <div className="flex items-center text-sm text-gray-600">
              <Globe className="w-4 h-4 text-indigo-600 mr-2" />
              <span>
                {formatLanguage(job.preferredCommunicationLanguage)} preferred
              </span>
            </div>
          )}
          {/* Posted Date */}
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 text-purple-600 mr-2" />
            <span>Posted {formatDate(job.createdAt)}</span>
          </div>
        </div>

        {/* Description Preview */}
        {job.description && (
          <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed">
            {job.description}
          </p>
        )}

        {/* Preferences */}
        {formatPreference(job.preference) && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                Preference: {formatPreference(job.preference)}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onViewDetails(job)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200 font-medium"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          {job.phone && (
            <a
              href={`tel:${job.phone}`}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold shadow-md hover:shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">{job.phone}</span>
              <span className="sm:hidden">Call</span>
            </a>
          )}
        </div>
      </div>
      {job.phone && (
        <p className="text-sm text-center pb-5 text-gray-500">
          Click the green button to call <strong>{job.phone}</strong>
        </p>
      )}
    </div>
  );
};

export { JobCard, NoResults, SearchBar, FilterSelect, JobDetailModal };
