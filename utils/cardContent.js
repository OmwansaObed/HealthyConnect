const calculateJobStatus = (createdAt) => {
  const now = new Date();
  const postDate = new Date(createdAt);

  // Reset both dates to midnight (00:00) for calendar-day comparison
  now.setHours(0, 0, 0, 0);
  postDate.setHours(0, 0, 0, 0);

  const diffInMs = now - postDate;
  const daysDifference = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (daysDifference === 0) {
    return "high"; // Today
  } else if (daysDifference === 1) {
    return "medium"; // Yesterday
  } else {
    return "low"; // Older
  }
};

const formatDate = (dateString) => {
  const inputDate = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const input = inputDate.toDateString();
  const current = today.toDateString();
  const prev = yesterday.toDateString();

  if (input === current) return "Today";
  if (input === prev) return "Yesterday";

  const diffTime = Math.abs(today - inputDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 7) return `${diffDays} days ago`;

  return inputDate.toLocaleDateString();
};

const getJobTypeColor = (type) => {
  const colors = {
    "full-time": "bg-green-100 text-green-800 border-green-200",
    "part-time": "bg-blue-100 text-blue-800 border-blue-200",
    contract: "bg-purple-100 text-purple-800 border-purple-200",
    temporary: "bg-orange-100 text-orange-800 border-orange-200",
    internship: "bg-pink-100 text-pink-800 border-pink-200",
    locum: "bg-indigo-100 text-indigo-800 border-indigo-200",
  };
  return colors[type] || "bg-gray-100 text-gray-800 border-gray-200";
};
const getStatusBadge = (status) => {
  const colors = {
    high: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const formatExperience = (experience) => {
  if (!experience || experience === "not-listed") return null;
  return experience === "entry-level"
    ? "Entry Level"
    : `${experience} experience`;
};

const formatPreference = (preference) => {
  if (!preference) return null;

  const prefs = [];
  if (preference.gender && preference.gender !== "any") {
    prefs.push(`Gender: ${preference.gender}`);
  }
  if (preference.age && preference.age !== "any") {
    prefs.push(`Age: ${preference.age}`);
  }
  if (preference.certificate && preference.certificate !== "any") {
    prefs.push(`Education: ${preference.certificate}`);
  }
  if (preference.time && preference.time !== "any") {
    prefs.push(`Shift: ${preference.time}`);
  }
  if (preference.completedRecently) {
    prefs.push("Recent graduates preferred");
  }
  return prefs.length > 0 ? prefs.join(" • ") : null;
};

const formatLanguage = (language) => {
  if (!language || language === "english") return null;
  return language.charAt(0).toUpperCase() + language.slice(1);
};

export {
  calculateJobStatus,
  formatDate,
  getJobTypeColor,
  getStatusBadge,
  formatExperience,
  formatPreference,
  formatLanguage,
};
