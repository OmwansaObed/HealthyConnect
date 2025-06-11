import { connectDB } from "../../../lib/db.js";
import Job from "../../../models/Job.js";
import Notification from "../../../models/Notifications.js";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();
  try {
    const data = await request.json();

    if (!data.title || !data.description)
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );

    const job = await Job.create(data);

    // Create a notification for the new job
    await Notification.create({
      type: "job_posted",
      message: `${job.title} was posted by ${job.postedBy}.`,
      jobId: job._id,
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
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
    // Allow updating any subset of fields (even just one)
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "At least one field to update is required" },
        { status: 400 }
      );
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
    return NextResponse.json(
      { error: error.message || "Failed to delete job" },
      { status: 500 }
    );
  }
}
