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
      type: String,
      enum: [
        "entry-level",
        "1+ year ",
        "2+ years",
        "3+ years",
        "4+ years",
        "5+ years",
      ],
    },
    age: {
      type: Number,
    },
    category: {
      type: String,
      enum: [
        "nursing",
        "medical Officer",
        "pharmacy",
        "laboratory",
        "radiology",
        "medical engineer",
        "dental",
        "administration",
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
      enum: [
        "kikuyu",
        "swahili",
        "english",
        "kalenjin",
        "kisii",
        "luo",
        "meru",
        "kamba",
        "luhya",
        "masai",
        "somali",
        "other",
      ],
    },
    description: {
      type: String,
    },
    postedBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
