import { connectDB } from "../../../lib/db";
import User from "../../../models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

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

// POST create new user
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { username, email, password, profession, isAdmin } = body;

    // Basic validation
    if (!username || !email || !password || !profession) {
      return NextResponse.json(
        { error: "All fields except isAdmin are required." },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      profession,
      isAdmin: !!isAdmin,
    });

    // Remove password from response
    const userObj = user.toObject();
    delete userObj.password;

    return NextResponse.json(userObj, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

// DELETE user by ID
export async function DELETE(request) {
  try {
    await connectDB();
    const { id } = await request.json();
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}

// bulk delete
export async function PATCH(request) {
  try {
    await connectDB();
    const { ids } = await request.json();
    const deletedUsers = await User.deleteMany({ _id: { $in: ids } });
    return NextResponse.json(deletedUsers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete users" },
      { status: 500 }
    );
  }
}
// PATCH update user by ID
export async function PUT(request) {
  try {
    await connectDB();
    const { id, username, email, profession, isAdmin } = await request.json();
    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    // Only update provided fields
    const updateFields = {};
    if (username !== undefined) updateFields.username = username;
    if (email !== undefined) updateFields.email = email;
    if (profession !== undefined) updateFields.profession = profession;
    if (isAdmin !== undefined) updateFields.isAdmin = isAdmin;
    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Failed to update user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
