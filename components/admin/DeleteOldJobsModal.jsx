import React, { useState } from "react";
import { X, Trash2, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const DeleteOldJobsModal = ({ isOpen, onClose, onSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteResult, setDeleteResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleDeleteOldJobs = async () => {
    setIsDeleting(true);
    setDeleteResult(null);

    try {
      const response = await fetch(
        `/api/job/cleanup?token=${process.env.NEXT_PUBLIC_CLEANUP_SECRET}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setDeleteResult({
          success: true,
          message: data.message,
          count: data.message.match(/\d+/)?.[0] || "0",
        });
        setShowResult(true);
        // Call onSuccess callback if provided
        if (onSuccess) {
          setTimeout(() => {
            onSuccess(data);
          }, 2000);
        }
      } else {
        setDeleteResult({
          success: false,
          message: data.error || "Failed to delete old jobs",
        });
        setShowResult(true);
      }
    } catch (error) {
      setDeleteResult({
        success: false,
        message: error.message || "An error occurred while deleting jobs",
      });
      setShowResult(true);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (!isDeleting) {
      setShowResult(false);
      setDeleteResult(null);
      onClose();
    }
  };

  const resetAndClose = () => {
    setShowResult(false);
    setDeleteResult(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 transform transition-all">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            {showResult ? "Cleanup Result" : "Delete Old Jobs"}
          </h3>
          <button
            onClick={handleClose}
            disabled={isDeleting}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {!showResult ? (
            <>
              {/* Warning Content */}
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    Are you sure?
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    This action will permanently delete all job listings that
                    are older than 10 days. This cannot be undone. Make sure you
                    want to proceed with this cleanup operation.
                  </p>
                </div>
              </div>

              {/* Warning Info Box */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="text-amber-800 font-medium text-sm mb-1">
                      What will be deleted:
                    </h5>
                    <ul className="text-amber-700 text-sm space-y-1">
                      <li>• All job listings created more than 10 days ago</li>
                      <li>• Associated job applications and data</li>
                      <li>• This action is irreversible</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Result Content */
            <div className="text-center py-4">
              <div
                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  deleteResult?.success ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {deleteResult?.success ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-600" />
                )}
              </div>

              <h4
                className={`text-lg font-semibold mb-2 ${
                  deleteResult?.success ? "text-green-900" : "text-red-900"
                }`}
              >
                {deleteResult?.success
                  ? "Cleanup Completed!"
                  : "Cleanup Failed"}
              </h4>

              <p
                className={`text-sm mb-4 ${
                  deleteResult?.success ? "text-green-700" : "text-red-700"
                }`}
              >
                {deleteResult?.message}
              </p>

              {deleteResult?.success && deleteResult?.count && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-green-800 text-sm font-medium">
                    🗑️ {deleteResult.count} old job
                    {deleteResult.count !== "1" ? "s" : ""} successfully removed
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-100">
          {!showResult ? (
            <>
              <button
                onClick={handleClose}
                disabled={isDeleting}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteOldJobs}
                disabled={isDeleting}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  isDeleting
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                <Trash2 className="w-4 h-4" />
                <span>{isDeleting ? "Deleting..." : "Delete Old Jobs"}</span>
              </button>
            </>
          ) : (
            <button
              onClick={resetAndClose}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteOldJobsModal;
