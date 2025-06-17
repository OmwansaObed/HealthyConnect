import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profession: {
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
      ],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
