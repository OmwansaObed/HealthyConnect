import { ChevronDown, Search } from "lucide-react";

// components/admin/jobs/JobFilters.jsx
export default function JobFilters({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filterType,
  setFilterType,
  uniqueStatuses,
  uniqueTypes,
}) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-4 md:p-6 mb-6">
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/70 backdrop-blur-sm transition-all"
          />
        </div>
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full appearance-none bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 pr-8 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            >
              <option value="all">All Status</option>
              {uniqueStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full appearance-none bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 pr-8 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            >
              <option value="all">All Types</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
