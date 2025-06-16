import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [200, "Subject cannot exceed 200 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    userType: {
      type: String,
      enum: ["professional", "facility", "other"],
      default: "professional",
    },
    status: {
      type: String,
      enum: ["pending", "read", "replied", "resolved"],
      default: "pending",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    reply: {
      type: String,
      trim: true,
    },
    repliedAt: {
      type: Date,
    },
    repliedBy: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
ContactSchema.index({ email: 1 });
ContactSchema.index({ status: 1 });
ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ userType: 1 });

// Virtual for formatted creation date
ContactSchema.virtual("formattedCreatedAt").get(function () {
  return this.createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});

// Method to mark as read
ContactSchema.methods.markAsRead = function () {
  this.isRead = true;
  this.status = "read";
  return this.save();
};

// Method to add reply
ContactSchema.methods.addReply = function (reply, repliedBy) {
  this.reply = reply;
  this.repliedBy = repliedBy;
  this.repliedAt = new Date();
  this.status = "replied";
  return this.save();
};

// Static method to get contact statistics
ContactSchema.statics.getStats = async function () {
  const stats = await this.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const userTypeStats = await this.aggregate([
    {
      $group: {
        _id: "$userType",
        count: { $sum: 1 },
      },
    },
  ]);

  return {
    statusStats: stats,
    userTypeStats: userTypeStats,
    total: await this.countDocuments(),
  };
};

export default mongoose.models.Contact ||
  mongoose.model("Contact", ContactSchema);
