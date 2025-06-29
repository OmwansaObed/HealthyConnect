import { Briefcase } from "lucide-react";

// components/admin/jobs/JobStats.jsx
export default function JobStats({ jobs }) {
  return (
    <div className="mb-6">
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-4 md:p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-xs md:text-sm">Total Jobs</p>
            <p className="text-xl md:text-2xl font-bold">{jobs.length}</p>
          </div>
          <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-purple-200" />
        </div>
      </div>
    </div>
  );
}
