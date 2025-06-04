import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      state: { type: String, required: true },
      county: { type: String },
    },
    type: {
      type: String,
      enum: [
        "locum",
        "full-time",
        "part-time",
        "contract",
        "temporary",
        "internship",
      ],
      required: true,
    },
    experience: {
      type: String, // e.g. "2+ years", "Entry Level"
      required: true,
    },
    minAge: {
      type: Number,
      default: 18,
    },
    age: {
      type: Number,
    },
    category: {
      enum: [
        "nursing",
        "medical Officer",
        "pharmacy",
        "laboratory",
        "radiology",
        "medical engineer",
        "dental",
        "administration",
        "",
      ],
      required: true,
    },
    salary: {
      type: String,
      default: "Not listed",
    },
    preferredCommunicationLanguage: {
      type: String,
      default: "English",
    },
    description: {
      type: String,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
