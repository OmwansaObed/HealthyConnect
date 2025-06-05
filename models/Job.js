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
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(\+254|0)?[7-9]\d{8}$/.test(v);
        },
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
