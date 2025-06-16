// components/admin/jobs/EditJobForm.jsx
import React, { useState } from "react";
import { useUpdateJobMutation } from "../../../redux/api/jobApiSlice";
import { toast } from "sonner";

export default function EditJobForm({ job, closeModal, refetchJobs }) {
  const [formData, setFormData] = useState({
    title: job.title || "",
    description: job.description || "",
    type: job.type || "",
    experience: job.experience || "",
    category: job.category || "",
    salary: job.salary || "",
    phone: job.phone || "",
    preferredCommunicationLanguage:
      job.preferredCommunicationLanguage || "english",
    postedBy: job.postedBy || "Anonymous",
    location: {
      state: job.location?.state || "",
      county: job.location?.county || "",
    },
    preference: {
      gender: job.preference?.gender || "any",
      age: job.preference?.age || "any",
      contactType: job.preference?.contactType || "any",
      time: job.preference?.time || "any",
      certificate: job.preference?.certificate || "any",
      completedRecently: job.preference?.completedRecently || false,
    },
  });

  const [updateJob] = useUpdateJobMutation();

  const CATEGORY_OPTIONS = [
    { value: "", label: "Select a category" },
    { value: "nursing", label: "Nursing" },
    { value: "cna", label: "Certified Nursing Assistant (CNA)" },
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
    { value: "medical sales rep", label: "Medical Sales Rep" },
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

  const LANGUAGE_OPTIONS = [
    { value: "english", label: "English" },
    { value: "swahili", label: "Swahili" },
    { value: "kikuyu", label: "Kikuyu" },
    { value: "kalenjin", label: "Kalenjin" },
    { value: "kisii", label: "Kisii" },
    { value: "luo", label: "Luo" },
    { value: "meru", label: "Meru" },
    { value: "kamba", label: "Kamba" },
    { value: "luhya", label: "Luhya" },
    { value: "masai", label: "Masai" },
    { value: "somali", label: "Somali" },
    { value: "other", label: "Other" },
  ];

  // Consistent input class for all form controls
  const inputClassName =
    "w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200";

  // Consistent label class
  const labelClassName = "block text-sm font-medium text-gray-700 mb-2";

  // Consistent section header class
  const sectionHeaderClassName =
    "text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-4";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateJob({ id: job._id, ...formData }).unwrap();
      toast.success(`Job "${formData.title}" updated successfully`);
      closeModal();
      refetchJobs();
    } catch (error) {
      toast.error(error?.data?.error || "Failed to update job");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="bg-white flex flex-col h-full">
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <div>
            <h3 className={sectionHeaderClassName}>Basic Information</h3>

            <div className="space-y-4">
              <div>
                <label className={labelClassName}>
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputClassName}
                  required
                />
              </div>

              <div>
                <label className={labelClassName}>Posted By</label>
                <input
                  type="text"
                  name="postedBy"
                  value={formData.postedBy}
                  onChange={handleChange}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={labelClassName}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className={inputClassName}
                  placeholder="Enter job description..."
                />
              </div>
            </div>
          </div>

          {/* Job Details Section */}
          <div>
            <h3 className={sectionHeaderClassName}>Job Details</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClassName}>Job Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={inputClassName}
                  >
                    <option value="">Select Type</option>
                    <option value="locum">Locum</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="temporary">Temporary</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className={labelClassName}>Experience Level</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={inputClassName}
                  >
                    <option value="">Select Experience</option>
                    <option value="entry-level">Entry Level</option>
                    <option value="1+">1+ Years</option>
                    <option value="2+">2+ Years</option>
                    <option value="3+">3+ Years</option>
                    <option value="4+">4+ Years</option>
                    <option value="5+">5+ Years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClassName}>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputClassName}
                >
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClassName}>Salary</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className={inputClassName}
                  placeholder="e.g., KSh 50,000 - 80,000"
                />
              </div>
            </div>
          </div>

          {/* Location Section */}
          <div>
            <h3 className={sectionHeaderClassName}>Location</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClassName}>State</label>
                <input
                  type="text"
                  name="location.state"
                  value={formData.location.state}
                  onChange={handleChange}
                  className={inputClassName}
                  placeholder="e.g., Nairobi"
                />
              </div>

              <div>
                <label className={labelClassName}>County</label>
                <input
                  type="text"
                  name="location.county"
                  value={formData.location.county}
                  onChange={handleChange}
                  className={inputClassName}
                  placeholder="e.g., Nairobi County"
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className={sectionHeaderClassName}>Contact Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClassName}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClassName}
                  placeholder="e.g., +254712345678"
                />
              </div>

              <div>
                <label className={labelClassName}>
                  Preferred Communication Language
                </label>
                <select
                  name="preferredCommunicationLanguage"
                  value={formData.preferredCommunicationLanguage}
                  onChange={handleChange}
                  className={inputClassName}
                >
                  {LANGUAGE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Candidate Preferences Section */}
          <div>
            <h3 className={sectionHeaderClassName}>Candidate Preferences</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className={labelClassName}>Gender Preference</label>
                  <select
                    name="preference.gender"
                    value={formData.preference.gender}
                    onChange={handleChange}
                    className={inputClassName}
                  >
                    <option value="any">Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className={labelClassName}>Age Preference</label>
                  <select
                    name="preference.age"
                    value={formData.preference.age}
                    onChange={handleChange}
                    className={inputClassName}
                  >
                    <option value="any">Any</option>
                    <option value="18-25">18-25</option>
                    <option value="26-35">26-35</option>
                    <option value="36-45">36-45</option>
                    <option value="46-55">46-55</option>
                    <option value="56+">56+</option>
                  </select>
                </div>

                <div>
                  <label className={labelClassName}>Contact Type</label>
                  <select
                    name="preference.contactType"
                    value={formData.preference.contactType}
                    onChange={handleChange}
                    className={inputClassName}
                  >
                    <option value="any">Any</option>
                    <option value="text-or-whatsapp-only">
                      Text/WhatsApp Only
                    </option>
                    <option value="calls-or-text">Calls or Text</option>
                  </select>
                </div>

                <div>
                  <label className={labelClassName}>Work Time</label>
                  <select
                    name="preference.time"
                    value={formData.preference.time}
                    onChange={handleChange}
                    className={inputClassName}
                  >
                    <option value="any">Any</option>
                    <option value="day">Day</option>
                    <option value="night">Night</option>
                  </select>
                </div>

                <div>
                  <label className={labelClassName}>Certificate Level</label>
                  <select
                    name="preference.certificate"
                    value={formData.preference.certificate}
                    onChange={handleChange}
                    className={inputClassName}
                  >
                    <option value="any">Any</option>
                    <option value="diploma">Diploma</option>
                    <option value="degree">Degree</option>
                    <option value="masters">Masters</option>
                    <option value="phd">PhD</option>
                  </select>
                </div>

                <div className="flex items-center pt-6">
                  <input
                    type="checkbox"
                    id="completedRecently"
                    name="preference.completedRecently"
                    checked={formData.preference.completedRecently}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="completedRecently"
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    Recently Completed Studies
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Fixed Footer with Action Buttons */}
      <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex-shrink-0">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-md hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
