"use client";

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

const AdminStatsWidget = () => {
  const stats = [
    {
      title: "Total Jobs",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: Briefcase,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Users",
      value: "18,923",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Applications",
      value: "4,621",
      change: "+24%",
      trend: "up",
      icon: Heart,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      title: "Success Rate",
      value: "94.5%",
      change: "-2%",
      trend: "down",
      icon: Activity,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "new_user",
      message: "Dr. Sarah Johnson joined as Medical Officer",
      time: "2 minutes ago",
      icon: UserPlus,
      color: "text-emerald-600",
    },
    {
      id: 2,
      type: "job_posted",
      message: "New Nursing position posted at City Hospital",
      time: "15 minutes ago",
      icon: Briefcase,
      color: "text-blue-600",
    },
    {
      id: 3,
      type: "application",
      message: "5 new applications for Lab Technician role",
      time: "1 hour ago",
      icon: Heart,
      color: "text-purple-600",
    },
    {
      id: 4,
      type: "facility",
      message: "St. Mary Medical Center verified",
      time: "2 hours ago",
      icon: Shield,
      color: "text-orange-600",
    },
  ];

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
                {stat.value}
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
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {recentActivities.map((activity) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStatsWidget;
