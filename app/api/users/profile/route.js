import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";

// GET /api/users/profile
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findById(session.user.id).select("-password");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("GET /api/users/profile error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// PUT /api/users/profile
export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { username, email, profession, currentPassword, newPassword } = body;

    // Basic validation
    if (!username?.trim() || !email?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Username and email are required",
        },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email format",
        },
        { status: 400 }
      );
    }

    // Check for existing email/username
    const [existingEmail, existingUsername] = await Promise.all([
      User.findOne({ email, _id: { $ne: session.user.id } }),
      User.findOne({ username, _id: { $ne: session.user.id } }),
    ]);

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "Email already in use",
        },
        { status: 400 }
      );
    }

    if (existingUsername) {
      return NextResponse.json(
        {
          success: false,
          error: "Username already taken",
        },
        { status: 400 }
      );
    }

    const updateData = {
      username: username.trim(),
      email: email.trim(),
      profession: profession || "",
      updatedAt: new Date(),
    };

    // Handle password change if requested
    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json(
          {
            success: false,
            error: "Password must be at least 6 characters",
          },
          { status: 400 }
        );
      }

      if (!currentPassword) {
        return NextResponse.json(
          {
            success: false,
            error: "Current password required",
          },
          { status: 400 }
        );
      }

      const currentUser = await User.findById(session.user.id);
      if (!currentUser) {
        return NextResponse.json(
          {
            success: false,
            error: "User not found",
          },
          { status: 404 }
        );
      }

      const isMatch = await bcrypt.compare(
        currentPassword,
        currentUser.password
      );
      if (!isMatch) {
        return NextResponse.json(
          {
            success: false,
            error: "Current password is incorrect",
          },
          { status: 400 }
        );
      }

      updateData.password = await bcrypt.hash(newPassword, 12);
    }

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      updateData,
      { new: true, select: "-password" }
    );

    // await Notifications.create({
    //       type: "job_posted",
    //       message: `${job.title} was posted by ${job.postedBy || "Anonymous"}.`,
    //       jobId: job._id,
    //     });
    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("PUT /api/users/profile error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}
