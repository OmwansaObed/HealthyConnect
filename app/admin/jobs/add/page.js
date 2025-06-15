"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Plus,
  X,
  Briefcase,
  MapPin,
  Phone,
  Building,
  DollarSign,
  Clock,
  User,
  Globe,
  FileText,
  Settings,
  AlertCircle,
} from "lucide-react";
import { useAddJobMutation } from "../../../../redux/api/jobApiSlice";
import { GiMechanicalArm } from "react-icons/gi";

// Form configuration
const FORM_CONFIG = {
  jobTypes: [
    "locum",
    "full-time",
    "part-time",
    "contract",
    "temporary",
    "internship",
  ],
  experienceLevels: ["entry-level", "1+", "2+", "3+", "4+", "5+"],
  categories: [
    "nursing",
    "medical-Officer",
    "pharmacy",
    "laboratory",
    "radiology",
    "medical-engineer",
    "dental",
    "administration",
    "orthopedics",
    "clinical-officer",
    "care-giver",
    "sale",
  ],
  statusOptions: ["open", "closed", "pending"],
  languages: [
    "kikuyu",
    "swahili",
    "english",
    "kalenjin",
    "kisii",
    "luo",
    "meru",
    "kamba",
    "luhya",
    "masai",
    "somali",
    "other",
  ],
  preferences: {
    gender: ["male", "female", "any"],
    age: ["18-25", "26-35", "36-45", "46-55", "56+", "any"],
    contactType: ["text-or-whatsapp-only", "calls-or-text", "any"],
    time: ["day", "night", "any"],
    certificate: ["diploma", "degree", "masters", "phd", "any"],
  },
};

const initialFormState = {
  title: "",
  location: { state: "", county: "" },
  type: "",
  experience: "",
  category: "",
  salary: "",
  phone: "",
  status: "open",
  preferredCommunicationLanguage: "english",
  description: "",
  postedBy: "",
  preference: {
    gender: "any",
    age: "any",
    contactType: "any",
    time: "any",
    certificate: "any",
    completedRecently: false,
  },
};

// Custom Input Components
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  hint = "",
  icon: Icon,
  ...props
}) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
      {Icon && <Icon className="w-4 h-4 text-gray-500" />}
      {label}
      {required && <span className="text-red-500">*</span>}
      {hint && <span className="text-xs text-gray-500 ml-1">({hint})</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
      {...props}
    />
  </div>
);

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  required = false,
  hint = "",
  icon: Icon,
}) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
      {Icon && <Icon className="w-4 h-4 text-gray-500" />}
      {label}
      {required && <span className="text-red-500">*</span>}
      {hint && <span className="text-xs text-gray-500 ml-1">({hint})</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1).replace(/-/g, " ")}
        </option>
      ))}
    </select>
  </div>
);

const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  hint = "",
  icon: Icon,
}) => (
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
      {Icon && <Icon className="w-4 h-4 text-gray-500" />}
      {label}
      {hint && <span className="text-xs text-gray-500 ml-1">({hint})</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
    />
  </div>
);

const CheckboxField = ({ label, name, checked, onChange, hint = "" }) => (
  <div className="flex items-start gap-3">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mt-1"
    />
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700 cursor-pointer">
        {label}
      </label>
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  </div>
);

// Form Section Component
const FormSection = ({ title, icon: Icon, children, className = "" }) => (
  <div
    className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm ${className}`}
  >
    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
      {Icon && <Icon className="w-5 h-5 text-blue-600" />}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    {children}
  </div>
);

// Main Component
export default function AddJobPage() {
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [addJob, { isLoading }] = useAddJobMutation();
  const router = useRouter();

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setForm((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Title is required
    if (!form.title?.trim()) {
      newErrors.title = "Job title is required";
    }

    // Phone validation (only if provided)
    if (
      form.phone?.trim() &&
      !form.phone.startsWith("07") &&
      !form.phone.startsWith("011")
    ) {
      newErrors.phone = "Phone number must start with 07 or 011";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      await addJob(form).unwrap();
      toast.success("Job posted successfully!");
      router.push("/admin/jobs");
    } catch (error) {
      const errorMessage = error?.data?.error || "Failed to create job";
      toast.error(errorMessage);
      console.error("Job creation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm(initialFormState);
    setErrors({});
    toast.info("Form reset successfully");
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex-1 md:ml-64">
        {/* Main Content */}
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-6 sm:mb-8">
              <div className="flex items-start gap-3 mb-3 sm:mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <GiMechanicalArm className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Add New Job
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base leading-snug sm:leading-normal mt-1">
                    Create a new job posting. Only job title is required – you
                    can add more details later.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <FormSection title="Basic Information" icon={Briefcase}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <InputField
                      label="Job Title"
                      name="title"
                      value={form.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Senior Nurse, Medical Officer"
                      required
                      icon={Briefcase}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <InputField
                    label="Company / Facility"
                    name="postedBy"
                    value={form.postedBy}
                    onChange={handleInputChange}
                    placeholder="e.g. Kenyatta Hospital"
                    hint="Optional"
                    icon={Building}
                  />

                  <SelectField
                    label="Job Category"
                    name="category"
                    value={form.category}
                    onChange={handleInputChange}
                    options={FORM_CONFIG.categories}
                    placeholder="Select category"
                    hint="Optional"
                    icon={Briefcase}
                  />

                  <SelectField
                    label="Job Type"
                    name="type"
                    value={form.type}
                    onChange={handleInputChange}
                    options={FORM_CONFIG.jobTypes}
                    placeholder="Select job type"
                    hint="Optional"
                    icon={Clock}
                  />

                  <SelectField
                    label="Experience Level"
                    name="experience"
                    value={form.experience}
                    onChange={handleInputChange}
                    options={FORM_CONFIG.experienceLevels}
                    placeholder="Select experience level"
                    hint="Optional"
                    icon={User}
                  />
                </div>
              </FormSection>

              {/* Location & Contact */}
              <FormSection title="Location & Contact" icon={MapPin}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    label="State / County"
                    name="location.state"
                    value={form.location.state}
                    onChange={handleInputChange}
                    placeholder="e.g. Nairobi"
                    hint="Optional"
                    icon={MapPin}
                  />

                  <InputField
                    label="Sub-County"
                    name="location.county"
                    value={form.location.county}
                    onChange={handleInputChange}
                    placeholder="e.g. Westlands"
                    hint="Optional"
                  />

                  <InputField
                    label="Phone Number"
                    name="phone"
                    value={form.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. 0712345678"
                    hint="Must start with 07 or 011 if provided"
                    icon={Phone}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.phone}
                    </p>
                  )}

                  <InputField
                    label="Salary"
                    name="salary"
                    value={form.salary}
                    onChange={handleInputChange}
                    placeholder="e.g. 50,000 KES/month"
                    hint="Optional - leave blank if not specified"
                    icon={DollarSign}
                  />
                </div>
              </FormSection>

              {/* Job Details */}
              <FormSection title="Job Details" icon={FileText}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectField
                      label="Job Status"
                      name="status"
                      value={form.status}
                      onChange={handleInputChange}
                      options={FORM_CONFIG.statusOptions}
                      icon={Settings}
                    />

                    <SelectField
                      label="Preferred Communication Language"
                      name="preferredCommunicationLanguage"
                      value={form.preferredCommunicationLanguage}
                      onChange={handleInputChange}
                      options={FORM_CONFIG.languages}
                      icon={Globe}
                    />
                  </div>

                  <TextAreaField
                    label="Job Description"
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    placeholder="Describe the role, requirements, responsibilities, benefits, etc."
                    hint="Optional - but recommended for better applications"
                    rows={5}
                    icon={FileText}
                  />
                </div>
              </FormSection>

              {/* Candidate Preferences */}
              <FormSection title="Candidate Preferences" icon={User}>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    These preferences help match the right candidates to your
                    job posting.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <SelectField
                      label="Gender Preference"
                      name="preference.gender"
                      value={form.preference.gender}
                      onChange={handleInputChange}
                      options={FORM_CONFIG.preferences.gender}
                    />

                    <SelectField
                      label="Age Range"
                      name="preference.age"
                      value={form.preference.age}
                      onChange={handleInputChange}
                      options={FORM_CONFIG.preferences.age}
                    />

                    <SelectField
                      label="Contact Preference"
                      name="preference.contactType"
                      value={form.preference.contactType}
                      onChange={handleInputChange}
                      options={FORM_CONFIG.preferences.contactType}
                    />

                    <SelectField
                      label="Work Time"
                      name="preference.time"
                      value={form.preference.time}
                      onChange={handleInputChange}
                      options={FORM_CONFIG.preferences.time}
                    />

                    <SelectField
                      label="Education Level"
                      name="preference.certificate"
                      value={form.preference.certificate}
                      onChange={handleInputChange}
                      options={FORM_CONFIG.preferences.certificate}
                    />
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <CheckboxField
                      label="Prefer recent graduates"
                      name="preference.completedRecently"
                      checked={form.preference.completedRecently}
                      onChange={handleInputChange}
                      hint="Candidates who completed their studies recently"
                    />
                  </div>
                </div>
              </FormSection>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => router.push("/admin/jobs")}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Reset Form
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none flex items-center justify-center gap-2"
                >
                  {isSubmitting || isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Posting Job...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Post Job
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
