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
        "nurse",
        "medical-officer-intern",
        "Medica-officer",
        "phsychiatrist",
        "physi-ortho",
        "pharmtechs",
        "labtechs",
        "registerd-clinical-officer",
        "coho",
        "theatretechs",
        "ambulance-crews",
        "casuals",
        "chvs",
        "student",
        "dentists",
        "public-health-officers",
        "psychology",
      ],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
