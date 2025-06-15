import { connectDB } from "../../../../lib/db";
import Job from "../../../../models/Job";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (token !== process.env.NEXT_PUBLIC_CLEANUP_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const tenDaysAgo = new Date();
  tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

  const result = await Job.deleteMany({ createdAt: { $lt: tenDaysAgo } });

  return Response.json({ message: `${result.deletedCount} old jobs deleted.` });
}
