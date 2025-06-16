import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      state: {
        type: String,
        default: "",
      },
      county: {
        type: String,
        default: "",
      },
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
        "", // Allow empty string for no selection
      ],
      default: "",
    },
    experience: {
      type: String,
      enum: ["entry-level", "1+", "2+", "3+", "4+", "5+", ""],
      default: "",
    },
    category: {
      type: String,
      enum: [
        "nursing",
        "cna",
        "adminisration",
        "medical officer",
        "clinical officer",
        "care giver",
        "home-based caregiver",
        "public health officer",
        "community health worker",
        "pharmacy",
        "laboratory",
        "radiology",
        "nutritionist",
        "dental",
        "physiotherapy",
        "occupational therapy",
        "speech therapy",
        "psychology",
        "psychiatry",
        "medical technician",
        "medical engineer",
        "orthopedics",
        "optometry",
        "anesthesiology",
        "surgery",
        "midwifery",
        "pediatrics",
        "gynecology",
        "general practitioner",
        "health records officer",
        "health administration",
        "hospital porter",
        "hospital cleaner",
        "ambulance driver",
        "emergency medical technician (emt)",
        "telemedicine",
        "health educator",
        "hiv/aids counselor",
        "social worker",
        "vaccination outreach",
        "medical sales rep",
        "health insurance agent",
        "occupational health officer",
        "environmental health officer",
        "biomedical scientist",
        "mortuary attendant",
        "first responder",
        "", // Allow empty string for no selection
      ],
      default: "",
    },

    salary: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      required: false, // Changed from required: true
      default: "",
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
      default: "",
    },
    postedBy: {
      type: String,
      default: "Anonymous",
    },
    preference: {
      gender: {
        type: String,
        enum: ["male", "female", "any"],
        default: "any",
      },
      age: {
        type: String,
        enum: ["18-25", "26-35", "36-45", "46-55", "56+", "any"],
        default: "any",
      },
      contactType: {
        type: String,
        enum: ["text-or-whatsapp-only", "calls-or-text", "any"],
        default: "any",
      },
      time: {
        type: String,
        enum: ["day", "night", "any"],
        default: "any",
      },
      certificate: {
        type: String,
        enum: ["diploma", "degree", "masters", "phd", "any"],
        default: "any",
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
