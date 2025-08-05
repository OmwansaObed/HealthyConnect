// components/admin/ContactMessagesDashboard.js
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  User,
  Calendar,
  Filter,
  Search,
  Eye,
  Reply,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  RefreshCw,
  Send,
  X,
} from "lucide-react";

const ContactMessagesDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    status: "",
    userType: "",
    search: "",
  });
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Reply functionality states
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [replying, setReplying] = useState(false);
  const [replySuccess, setReplySuccess] = useState(false);

  // Fetch messages
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
        ...(filters.status && { status: filters.status }),
        ...(filters.userType && { userType: filters.userType }),
      });

      const response = await fetch(`/api/contact?${queryParams}`);
      const data = await response.json();

      if (data.success) {
        setMessages(data.data.contacts);
        setStats(data.data.stats);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [currentPage, filters]);

  // Status colors and icons
  const getStatusConfig = (status) => {
    const configs = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      read: { color: "bg-blue-100 text-blue-800", icon: Eye },
      replied: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      resolved: { color: "bg-gray-100 text-gray-800", icon: CheckCircle },
    };
    return configs[status] || configs.pending;
  };

  // User type colors
  const getUserTypeColor = (userType) => {
    const colors = {
      professional: "bg-purple-100 text-purple-800",
      facility: "bg-emerald-100 text-emerald-800",
      other: "bg-gray-100 text-gray-800",
    };
    return colors[userType] || colors.other;
  };

  // Mark message as read
  const markAsRead = async (messageId) => {
    try {
      const response = await fetch(`/api/contact/${messageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "markAsRead" }),
      });

      if (response.ok) {
        fetchMessages(); // Refresh the list
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  // Handle reply submission
  const handleReplySubmit = async () => {
    if (!replyMessage.trim() || !selectedMessage) return;

    setReplying(true);
    try {
      const response = await fetch(
        `/api/contact/${selectedMessage._id}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reply: replyMessage,
            repliedBy: "Admin", // You might want to get this from user context
          }),
        }
      );

      if (response.ok) {
        setReplySuccess(true);
        setReplyMessage("");
        fetchMessages(); // Refresh the list

        // Update the selected message with the new reply
        const updatedMessage = {
          ...selectedMessage,
          reply: replyMessage,
          status: "replied",
          repliedAt: new Date().toISOString(),
          repliedBy: "Admin",
        };
        setSelectedMessage(updatedMessage);

        // Auto-close reply modal after success
        setTimeout(() => {
          setShowReplyModal(false);
          setReplySuccess(false);
        }, 2000);
      } else {
        throw new Error("Failed to send reply");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      // You might want to show an error toast here
    } finally {
      setReplying(false);
    }
  };

  // Open reply modal
  const openReplyModal = (message) => {
    setSelectedMessage(message);
    setShowReplyModal(true);
    setReplyMessage("");
    if (!message.isRead) {
      markAsRead(message._id);
    }
  };

  // Filter messages based on search
  const filteredMessages = messages.filter(
    (message) =>
      !filters.search ||
      message.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      message.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      message.subject.toLowerCase().includes(filters.search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Contact Messages
              </h1>
              <p className="text-gray-600 mt-1">
                Manage and respond to customer inquiries
              </p>
            </div>
            <button
              onClick={fetchMessages}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {stats.statusStats &&
            stats.statusStats.map((stat, index) => {
              const statusConfig = getStatusConfig(stat._id);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={stat._id}
                  className="bg-white rounded-xl p-6 shadow-sm border"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 capitalize">
                        {stat._id} Messages
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.count}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-full ${
                        statusConfig.color.split(" ")[0]
                      }`}
                    >
                      <StatusIcon
                        className={`w-6 h-6 ${
                          statusConfig.color.split(" ")[1]
                        }`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.userType}
                onChange={(e) =>
                  setFilters({ ...filters, userType: e.target.value })
                }
              >
                <option value="">All Types</option>
                <option value="professional">Healthcare Professional</option>
                <option value="facility">Healthcare Facility</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() =>
                  setFilters({ status: "", userType: "", search: "" })
                }
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </motion.div>

        {/* Messages Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMessages.map((message) => {
                    const statusConfig = getStatusConfig(message.status);
                    const StatusIcon = statusConfig.icon;

                    return (
                      <motion.tr
                        key={message._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {message.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {message.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {message.subject}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getUserTypeColor(
                              message.userType
                            )}`}
                          >
                            {message.userType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${statusConfig.color}`}
                          >
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {message.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                setSelectedMessage(message);
                                setShowModal(true);
                                if (!message.isRead) {
                                  markAsRead(message._id);
                                }
                              }}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded"
                              title="View message"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openReplyModal(message)}
                              className="text-green-600 hover:text-green-900 p-1 rounded"
                              title="Reply to message"
                            >
                              <Reply className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredMessages.length === 0 && (
                <div className="text-center py-12">
                  <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No messages found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search criteria or filters.
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Message Detail Modal */}
        {showModal && selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 backdrop-filter backdrop-blur-md shadow-lg flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {selectedMessage.name}
                      </h2>
                      <p className="text-gray-600">{selectedMessage.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Message Details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        User Type
                      </label>
                      <span
                        className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getUserTypeColor(
                          selectedMessage.userType
                        )}`}
                      >
                        {selectedMessage.userType}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <span
                        className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${
                          getStatusConfig(selectedMessage.status).color
                        }`}
                      >
                        {React.createElement(
                          getStatusConfig(selectedMessage.status).icon,
                          { className: "w-3 h-3 mr-1" }
                        )}
                        {selectedMessage.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <p className="text-gray-900 font-medium">
                      {selectedMessage.subject}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-900 whitespace-pre-wrap">
                        {selectedMessage.message}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Submitted
                      </label>
                      <p className="text-gray-600 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(selectedMessage.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {selectedMessage.repliedAt && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Replied
                        </label>
                        <p className="text-gray-600 flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(selectedMessage.repliedAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>

                  {selectedMessage.reply && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reply
                      </label>
                      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                        <p className="text-gray-900 whitespace-pre-wrap">
                          {selectedMessage.reply}
                        </p>
                        {selectedMessage.repliedBy && (
                          <p className="text-sm text-gray-600 mt-2">
                            - {selectedMessage.repliedBy}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      openReplyModal(selectedMessage);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Reply className="w-4 h-4 mr-2" />
                    Reply
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Reply Modal */}
        {showReplyModal && selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 backdrop-filter backdrop-blur-md shadow-lg flex items-center justify-center p-4 z-50"
            onClick={() => setShowReplyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Reply Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Reply className="w-6 h-6 text-blue-600 mr-3" />
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Reply to {selectedMessage.name}
                      </h2>
                      <p className="text-gray-600">
                        Re: {selectedMessage.subject}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowReplyModal(false)}
                    className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Original Message Preview */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600 mb-2">
                    Original message:
                  </p>
                  <p className="text-gray-800 text-sm line-clamp-3">
                    {selectedMessage.message}
                  </p>
                </div>

                {/* Reply Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Reply
                    </label>
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply here..."
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                  </div>

                  {replySuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-green-50 border border-green-200 rounded-lg p-4"
                    >
                      <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                        <p className="text-green-800 font-medium">
                          Reply sent successfully!
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Reply Modal Actions */}
                <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => setShowReplyModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    disabled={replying}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReplySubmit}
                    disabled={!replyMessage.trim() || replying}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {replying ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Reply
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContactMessagesDashboard;
