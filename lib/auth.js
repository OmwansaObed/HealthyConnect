// lib/auth.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "./db";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { welcomeTemplate } from "../utils/templates/welcomeTemplate";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 20000,
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user) throw new Error("User not found");
        if (!user.password) throw new Error("Please sign in with Google");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          role: user.isAdmin,
          profession: user.profession,
          createdAt: user.createdAt,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      await connectDB();

      // If this is the first time the user is signing in
      if (user && account) {
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.isAdmin;
          token.profession = dbUser.profession;
          token.createdAt = dbUser.createdAt;
          token.username = dbUser.username;
        }
      }
      // For subsequent requests, token will already have the user data
      else if (token.email && !token.id) {
        // Fallback: if token doesn't have user data, fetch from DB
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.isAdmin;
          token.profession = dbUser.profession;
          token.createdAt = dbUser.createdAt;
          token.username = dbUser.username;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.profession = token.profession;
        session.user.createdAt = token.createdAt;
        session.user.username = token.username || session.user.name;
      }
      return session;
    },
    // ADD THIS REDIRECT CALLBACK
    async redirect({ url, baseUrl }) {
      // If the url is relative, make it absolute
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // If url is on the same origin, allow it
      else if (new URL(url).origin === baseUrl) return url;
      // Otherwise redirect to homepage
      return baseUrl;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          await connectDB();

          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create new user
            const newUser = await User.create({
              username: user.name || user.email?.split("@")[0],
              email: user.email,
              isAdmin: false,
              createdAt: new Date(),
            });

            console.log("New Google user created:", newUser.email);

            // Send welcome email via your API endpoint
            try {
              const response = await fetch(
                `${process.env.NEXTAUTH_URL}/api/email`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    to: user.email,
                    subject: "Welcome to HealthyConnect!",
                    html: welcomeTemplate(
                      user.name || user.email?.split("@")[0]
                    ),
                  }),
                }
              );

              if (response.ok) {
                console.log("Welcome email sent to Google user:", user.email);
              } else {
                console.error("Failed to send welcome email via API");
              }
            } catch (emailError) {
              console.error("Error calling email API:", emailError);
            }
          } else {
            console.log("Existing Google user signed in:", existingUser.email);
          }

          return true;
        } catch (error) {
          console.error("Error in Google signIn callback:", error);
          return false; // This will prevent the sign-in
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
