import { connectDB } from "../../../../lib/db.js";
import Job from "../../../../models/Job.js";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await connectDB();
  const { id } = params;
  try {
    // Increment views and return the job
    const job = await Job.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }
    return NextResponse.json(job);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch job" },
      { status: 500 }
    );
  }
}
