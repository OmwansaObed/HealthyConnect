export default function JobViewSwitcher({ viewMode, setViewMode }) {
  return (
    <div className="flex rounded-xl border border-gray-200 bg-white/70 backdrop-blur-sm overflow-hidden mb-6">
      <button
        onClick={() => setViewMode("cards")}
        className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
          viewMode === "cards"
            ? "bg-purple-600 text-white"
            : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        Cards
      </button>
      <button
        onClick={() => setViewMode("table")}
        className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
          viewMode === "table"
            ? "bg-purple-600 text-white"
            : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        Table
      </button>
    </div>
  );
}
