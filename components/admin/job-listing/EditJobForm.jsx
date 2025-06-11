// components/admin/jobs/EditJobForm.jsx
import React, { useState } from "react";
import { useUpdateJobMutation } from "../../../redux/api/jobApiSlice";
import { toast } from "sonner";

export default function EditJobForm({ job, closeModal, refetchJobs }) {
  const [formData, setFormData] = useState({
    title: job.title || "",
    company: job.company || "",
    description: job.description || "",
    type: job.type || "",
    category: job.category || "",
    location: {
      state: job.location?.state || "",
      county: job.location?.county || "",
    },
    status: job.status || "active",
  });

  const [updateJob] = useUpdateJobMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            >
              <option value="">Select Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="remote">Remote</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              name="location.state"
              value={formData.location.state}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              County
            </label>
            <input
              type="text"
              name="location.county"
              value={formData.location.county}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
