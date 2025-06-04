import { connectDB } from "@/lib/db";
import User from "../models/User.js";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// GET all users (protected, admin-only)
export async function GET() {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    // Authorization check
    // if (!session || session.user.role !== 'admin') {
    //   return NextResponse.json(
    //     { error: 'Unauthorized' },
    //     { status: 401 }
    //   );
    // }

    const users = await User.find({}).select("-password");
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST create new user (public signup)
export async function POST(request) {
  try {
    await connectDB();
    const { name, email, password } = await request.json();

    console.log("Received data:", { name, email, password });

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    // Create user
    const user = await User.create({ name, email, password });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
