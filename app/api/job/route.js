import { connectDB } from "../../../lib/db.js";
import Job from "../../../models/Job.js";
import Notification from "../../../models/Notifications.js";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();

    // Only require title - most essential field
    if (!data.title || data.title.trim() === "") {
      return NextResponse.json(
        { error: "Job title is required" },
        { status: 400 }
      );
    }

    // Validate phone number only if it's provided and not empty
    if (data.phone && data.phone.trim() !== "") {
      if (!data.phone.startsWith("07") && !data.phone.startsWith("011")) {
        return NextResponse.json(
          { error: "Phone number must start with 07 or 011" },
          { status: 400 }
        );
      }
    }

    // Clean up the data - the model defaults will handle missing fields
    const cleanedData = {
      ...data,
      title: data.title.trim(),
      // Only include fields that have actual values
      ...(data.description && { description: data.description.trim() }),
      ...(data.phone && { phone: data.phone.trim() }),
      ...(data.postedBy && { postedBy: data.postedBy.trim() }),
      ...(data.salary && { salary: data.salary.trim() }),
      ...(data.type && { type: data.type }),
      ...(data.experience && { experience: data.experience }),
      ...(data.category && { category: data.category }),
      // Handle location
      location: {
        state: data.location?.state?.trim() || "",
        county: data.location?.county?.trim() || "",
      },
      // Handle preferences - use defaults from model if not provided
      preference: {
        gender: data.preference?.gender || "any",
        age: data.preference?.age || "any",
        contactType: data.preference?.contactType || "any",
        time: data.preference?.time || "any",
        certificate: data.preference?.certificate || "any",
        completedRecently: data.preference?.completedRecently || false,
      },
    };

    const job = await Job.create(cleanedData);

    // Create a notification for the new job
    await Notification.create({
      type: "job_posted",
      message: `${job.title} was posted by ${job.postedBy || "Anonymous"}.`,
      jobId: job._id,
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
    console.error("Job creation error:", error);

    // Handle validation errors specifically
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return NextResponse.json(
        { error: `Validation failed: ${validationErrors.join(", ")}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to create job" },
      { status: 500 }
    );
  }
}

// GET request handler to fetch all jobs
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const skip = (page - 1) * limit;

  await connectDB();
  const jobs = await Job.find({})
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Job.countDocuments();

  return NextResponse.json({
    jobs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

// PATCH request handler to update a job by ID
export async function PATCH(request) {
  try {
    await connectDB();
    const { id, ...updateData } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    // Allow updating any subset of fields
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "At least one field to update is required" },
        { status: 400 }
      );
    }

    // Validate phone if it's being updated
    if (updateData.phone && updateData.phone.trim() !== "") {
      if (
        !updateData.phone.startsWith("07") &&
        !updateData.phone.startsWith("011")
      ) {
        return NextResponse.json(
          { error: "Phone number must start with 07 or 011" },
          { status: 400 }
        );
      }
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ job: updatedJob }, { status: 200 });
  } catch (error) {
    console.error("Job update error:", error);

    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return NextResponse.json(
        { error: `Validation failed: ${validationErrors.join(", ")}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to update job" },
      { status: 500 }
    );
  }
}

// DELETE request handler to delete a job by ID
export async function DELETE(request) {
  try {
    await connectDB();
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Job deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Job deletion error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete job" },
      { status: 500 }
    );
  }
}
