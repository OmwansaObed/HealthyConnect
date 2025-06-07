"use client";
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleGoogleLogin = () => {
    try {
      signIn("google", { callbackUrl: "/", prompt: "select_account" });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("An error occurred during Google login");
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError(null);
    // Handle email login logic here
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    console.log("signIn response:", response);
    if (response.status !== 200) {
      console.error("Login error:", response.error);
      toast.error(response.error);
      setLoading(false);
      setError(response?.error);
    } else if (response?.ok === true) {
      console.log("Login successful");
      toast.success("Login successful!");
      router.push("/");
      setEmail("");
      setPassword("");
      setLoading(false);
      setError(null);
    } else {
      toast.error("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-t from-blue-100 to-white min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 ">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#0A2647]">Login</h1>
          <p className="text-[#144272] mt-2">Sign in to your account</p>
        </div>

        <div className="space-y-6">
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-blue-500 rounded-lg hover:cursor-pointer hover:bg-red-100/10 transition-colors duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-[#0A2647] font-medium">
              Sign in with Google
            </span>
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#2c3ab3]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#F5F6FA] text-blue-500">or</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#144272] mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-blue-500 rounded-lg focus:ring-2 focus:ring-[#205295] focus:border-[#205295] outline-none transition-colors bg-white text-[#0A2647]"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#144272] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-blue-500 rounded-lg focus:ring-2 focus:ring-[#205295] focus:border-[#205295] outline-none transition-colors bg-white text-[#0A2647]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-[#205295]"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={handleEmailLogin}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
            >
              Sign In
            </button>
          </div>

          <div className="text-center">
            <p className="text-[#144272] text-sm">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-blue-500 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
          {error && (
            <div className="text-[#EA4335] bg-[#FDEDED] py-3 text-sm text-center mt-2 rounded">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
