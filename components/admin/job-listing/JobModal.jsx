import {
  AlertTriangle,
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  X,
} from "lucide-react";
import EditJobForm from "./EditJobForm";

// components/admin/jobs/JobModal.jsx
export default function JobModal({
  modalOpen,
  modalType,
  selectedJob,
  closeModal,
  confirmDelete,
  getStatusBadge,
  refetch,
}) {
  if (!modalOpen || !selectedJob) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {modalType === "view" && "Job Details"}
            {modalType === "edit" && "Edit Job"}
            {modalType === "delete" && "Delete Job"}
          </h2>
          <button
            onClick={closeModal}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {selectedJob && (
            <>
              {/* View Modal */}
              {modalType === "view" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedJob.title}
                      </h3>
                      {selectedJob.postedBy && (
                        <p className="text-gray-600 text-lg">
                          {selectedJob.postedBy}
                        </p>
                      )}
                    </div>
                    <span
                      className={`inline-flex px-4 py-2 text-sm font-medium rounded-full ${getStatusBadge(
                        selectedJob.status
                      )}`}
                    >
                      {selectedJob.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Briefcase className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Job Type</p>
                          <p className="font-medium">{selectedJob.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Briefcase className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Category</p>
                          <p className="font-medium">{selectedJob.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <MapPin className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">
                            {selectedJob.location?.state}
                            {selectedJob.location?.county &&
                              `, ${selectedJob.location.county}`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                          <Calendar className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Posted</p>
                          <p className="font-medium">
                            {new Date(
                              selectedJob.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-rose-100 rounded-lg">
                          <Clock className="w-5 h-5 text-rose-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Last Updated</p>
                          <p className="font-medium">
                            {new Date(
                              selectedJob.updatedAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {selectedJob.description && (
                    <div className="mt-6">
                      <h4 className="font-bold text-gray-900 mb-2">
                        Job Description
                      </h4>
                      <div
                        className="prose max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: selectedJob.description,
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
              {/* Delete Confirmation Modal */}
              {modalType === "delete" && (
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-red-100 rounded-full">
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Delete "{selectedJob.title}"?
                      </h3>
                      <p className="text-gray-600 mt-1">
                        This action cannot be undone. All data associated with
                        this job will be permanently removed.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
                    <button
                      onClick={closeModal}
                      className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:from-red-700 hover:to-rose-700 transition-all"
                    >
                      Delete Job
                    </button>
                  </div>
                </div>
              )}
              {modalType === "edit" && (
                <EditJobForm
                  job={selectedJob}
                  closeModal={closeModal}
                  refetchJobs={refetch}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
