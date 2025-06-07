import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNotifications() {
      setLoading(true);
      setError(null);
      try {
        axios.get("/api/notifications").then((response) => {
          setNotifications(response.data.notifications);
        });
      } catch (err) {
        setError("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    }
    fetchNotifications();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full max-w-md mx-auto mt-8">
      <h2 className="text-lg font-bold mb-4">Notifications</h2>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : notifications.length === 0 ? (
        <div className="text-gray-500">No notifications.</div>
      ) : (
        <ul className="space-y-3">
          {notifications.map((notif) => (
            <li
              key={notif._id}
              className="border-b pb-2 last:border-b-0 last:pb-0"
            >
              <div className="font-medium text-gray-800">{notif.message}</div>
              <div className="text-xs text-gray-400">
                {new Date(notif.createdAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
