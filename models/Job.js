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
      enum: ["entry-level", "1+", "2+", "3+", "4+", "5+"],
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
    phone: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^(\+254|0)?[7-9]\d{8}$/.test(v),
        message: (props) =>
          `${props.value} is not a valid Kenyan phone number!`,
      },
    },
    status: {
      type: String,
      enum: ["open", "closed", "pending"],
      default: "open",
    },
    preferredCommunicationLanguage: {
      type: String,
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
      default: "english",
    },
    description: {
      type: String,
    },
    postedBy: {
      type: String,
      required: true,
    },
    preference: {
      gender: {
        type: String,
        enum: ["male", "female"],
      },
      age: {
        type: String,
        enum: ["18-25", "26-35", "36-45", "46-55", "56+"],
      },
      contactType: {
        type: String,
        enum: ["text-only", "calls-only", "any"],
        default: "any",
      },
      time: {
        type: String,
        enum: ["day", "night", "any"],
        default: "any",
      },
      certificate: {
        type: String,
        enum: ["diploma", "degree", "masters", "phd"],
      },
      completedRecently: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
