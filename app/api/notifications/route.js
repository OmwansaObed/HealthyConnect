import { connectDB } from "../../../lib/db.js";
import Notification from "../../../models/Notifications.js";
import { NextResponse } from "next/server";

// GET: Fetch latest notifications (most recent 20)
export async function GET() {
  await connectDB();
  const notifications = await Notification.find({})
    .sort({ createdAt: -1 })
    .limit(20);
  return NextResponse.json({ notifications });
}
