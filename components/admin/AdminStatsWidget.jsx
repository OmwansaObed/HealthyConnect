"use client";

import { useState, useEffect, useRef } from "react";
import { useGetJobsQuery } from "../../redux/api/jobApiSlice";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  Activity,
  Briefcase,
  Heart,
  Shield,
  TrendingDown,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { useInView } from "framer-motion"; // You might need to install framer-motion or use an alternative

// AnimatedCounter Component
const AnimatedCounter = ({
  end,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [lastEnd, setLastEnd] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  useEffect(() => {
    // Reset animation when end value changes significantly or when first coming into view
    const shouldAnimate =
      (isInView && !hasStarted) || (end !== lastEnd && end !== "0");

    if (shouldAnimate && end && end !== "0") {
      // Add delay before starting animation
      const timer = setTimeout(() => {
        setHasStarted(true);
        setLastEnd(end);
        let startTime;

        let endValue;
        const isPercentage = end.includes("%");
        const isK = end.includes("K");

        if (isK) {
          endValue = parseFloat(end.replace(/[^\d.]/g, "")) * 1000;
        } else if (isPercentage) {
          endValue = parseFloat(end.replace(/[^\d.]/g, ""));
        } else {
          endValue = parseFloat(end.replace(/[^\d.]/g, ""));
        }

        // Don't animate if the value is 0 or invalid
        if (endValue === 0) {
          setCount(0);
          return;
        }

        const animate = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min(
            (timestamp - startTime) / (duration * 1000),
            1
          );
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          setCount(Math.floor(easeOutQuart * endValue));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isInView, end, duration, delay, hasStarted, lastEnd]);

  const formatNumber = (num) => {
    if (end.includes("K")) {
      const kValue = num / 1000;
      return kValue >= 10 ? Math.floor(kValue) + "K" : kValue.toFixed(1) + "K";
    }
    if (end.includes("%")) return num + "%";
    return num.toLocaleString();
  };

  const formattedCount = formatNumber(count);
  const hasPlus = end.includes("+");

  return (
    <span ref={ref}>
      {prefix}
      {formattedCount}
      {hasPlus && "+"}
      {suffix}
    </span>
  );
};

const AdminStatsWidget = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useGetJobsQuery({ page, limit });
  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetUsersQuery();

  const jobs = data?.jobs ?? [];
  const totalPages = data?.page || 1;
  const totalCount = jobs.length;

  const totalUsers = userData?.length || 0;

  const jobsChangePercentage = 12;
  const activeUsersChangePercentage = 8;

  // Calculate new jobs this month
  const newJobsThisMonth = jobs.filter((job) => {
    const jobDate = new Date(job.createdAt);
    const currentDate = new Date();
    return (
      jobDate.getMonth() === currentDate.getMonth() &&
      jobDate.getFullYear() === currentDate.getFullYear()
    );
  }).length;

  // Calculate total applications
  const totalApplications = jobs.reduce(
    (acc, job) => acc + (job.applications?.length || 0),
    0
  );

  const stats = [
    {
      title: "Total Jobs",
      value: totalCount.toString(),
      change: `${jobsChangePercentage}%`,
      trend: jobsChangePercentage >= 0 ? "up" : "down",
      icon: Briefcase,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Users",
      value:
        totalUsers > 1000
          ? `${(totalUsers / 1000).toFixed(1)}K`
          : totalUsers.toString(),
      change: `${activeUsersChangePercentage}%`,
      trend: activeUsersChangePercentage >= 0 ? "up" : "down",
      icon: Users,
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      title: "New Jobs This Month",
      value: newJobsThisMonth.toString(),
      change: "+5%",
      trend: "up",
      icon: Activity,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Applications (Coming Soon)",
      value: totalApplications.toString(),
      change: "0%",
      trend: "up",
      icon: Heart,
      color: "bg-red-500",
      bgColor: "bg-red-50",
    },
  ];

  // Generate recent activities from jobs data
  const recentActivities = jobs.slice(0, 4).map((job, index) => ({
    id: job._id || index,
    type: "job_posted",
    message: `New ${job.title} position posted at ${
      job.postedBy || job.location?.county
    }`,
    time: formatTimeAgo(job.createdAt),
    icon: Briefcase,
    color: "text-blue-600",
  }));

  // Helper function to format time ago
  function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? "" : "s"} ago`;
  }

  // Don't render animated counter until we have real data
  if (isLoading || userLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
        <div className="text-gray-600 text-lg font-medium">
          Loading stats...
        </div>
        <div className="text-gray-400 text-sm mt-1">Please wait a moment</div>
      </div>
    );
  }
  if (isError)
    return (
      <div className="text-center py-8 text-red-500">Error loading stats</div>
    );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}
              >
                <stat.icon
                  className={`w-6 h-6 ${stat.color.replace("bg-", "text-")}`}
                />
              </div>
              <div
                className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                <AnimatedCounter
                  end={stat.value}
                  duration={2.5 + Math.random() * 0.5} // Random duration between 2.5-3s
                  delay={index * 250 + Math.random() * 100} // Staggered delay with some randomness
                />
              </h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div
                  className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center`}
                >
                  <activity.icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 text-sm">{activity.message}</p>
                  <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">
              No recent activities
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminStatsWidget;
