import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../lib/auth";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";

const VALID_PROFESSIONS = [
  "nursing",
  "cna",
  "adminisration",
  "medical officer",
  "clinical officer",
  "care giver",
  "home-based caregiver",
  "public health officer",
  "community health worker",
  "pharmacy",
  "laboratory",
  "radiology",
  "nutritionist",
  "dental",
  "physiotherapy",
  "occupational therapy",
  "speech therapy",
  "psychology",
  "psychiatry",
  "medical technician",
  "medical engineer",
  "orthopedics",
  "optometry",
  "anesthesiology",
  "surgery",
  "midwifery",
  "pediatrics",
  "gynecology",
  "general practitioner",
  "health records officer",
  "health administration",
  "hospital porter",
  "hospital cleaner",
  "ambulance driver",
  "emergency medical technician (emt)",
  "telemedicine",
  "health educator",
  "hiv/aids counselor",
  "social worker",
  "vaccination outreach",
  "medical sales rep",
  "health insurance agent",
  "occupational health officer",
  "environmental health officer",
  "biomedical scientist",
  "mortuary attendant",
  "first responder",
  "coho",
];

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

    // Ensure profession is always an array for backward compatibility
    if (typeof user.profession === "string") {
      user.profession = user.profession ? [user.profession] : [];
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
    const { username, email, professions, currentPassword, newPassword } = body; // Changed 'profession' to 'professions'

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

    // Validate professions array
    let validatedProfessions = [];
    if (professions && Array.isArray(professions)) {
      // Remove duplicates and validate each profession
      const uniqueProfessions = [...new Set(professions)];
      const invalidProfessions = uniqueProfessions.filter(
        (prof) => !VALID_PROFESSIONS.includes(prof)
      );

      if (invalidProfessions.length > 0) {
        return NextResponse.json(
          {
            success: false,
            error: `Invalid professions: ${invalidProfessions.join(", ")}`,
          },
          { status: 400 }
        );
      }

      validatedProfessions = uniqueProfessions;
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
      profession: validatedProfessions,
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
