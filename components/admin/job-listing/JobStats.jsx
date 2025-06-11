import { Briefcase, Edit3, TrendingUp, X } from "lucide-react";

// components/admin/jobs/JobStats.jsx
export default function JobStats({ jobs }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6">
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 md:p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-xs md:text-sm">Total Jobs</p>
            <p className="text-xl md:text-2xl font-bold">{jobs.length}</p>
          </div>
          <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-purple-200" />
        </div>
      </div>
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 md:p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-emerald-100 text-xs md:text-sm">Active</p>
            <p className="text-xl md:text-2xl font-bold">
              {jobs.filter((job) => job.status === "active").length}
            </p>
          </div>
          <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-emerald-200" />
        </div>
      </div>
      <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-4 md:p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-amber-100 text-xs md:text-sm">Draft</p>
            <p className="text-xl md:text-2xl font-bold">
              {jobs.filter((job) => job.status === "draft").length}
            </p>
          </div>
          <Edit3 className="w-6 h-6 md:w-8 md:h-8 text-amber-200" />
        </div>
      </div>
      <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl p-4 md:p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-rose-100 text-xs md:text-sm">Closed</p>
            <p className="text-xl md:text-2xl font-bold">
              {jobs.filter((job) => job.status === "closed").length}
            </p>
          </div>
          <X className="w-6 h-6 md:w-8 md:h-8 text-rose-200" />
        </div>
      </div>
    </div>
  );
}
