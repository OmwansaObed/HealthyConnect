import { connectDB } from "../../../../lib/db";
// import User from "../models/User.js";
import User from "../../../../models/User.js";
import bcrypt from "bcryptjs";
import { NextResponse as Response } from "next/server";
import { sendWelcomeEmail } from "../../../../utils/sendWelcomeEmail";

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();
    console.log("Data to Backend", req);

    if (!username || !email || !password) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    await connectDB();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: false,
    });

    try {
      await sendWelcomeEmail(email, { username: email.split("@")[0] });
      console.log("Welcome email sent successfully");
    } catch (emailError) {
      // Log email error but don't fail the signup
      console.error("Failed to send welcome email:", emailError);
      // You might want to add this to a queue for retry later
    }

    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Sign Up Error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
