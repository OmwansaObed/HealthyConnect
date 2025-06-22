"use client";
import React, { useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/api/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    setError(null);

    signIn("google", {
      callbackUrl: "/",
      prompt: "select_account",
    });
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!response?.ok) {
        const errorMessage =
          response?.error || "Login failed. Please try again.";
        console.error("Login error:", errorMessage);
        setError(errorMessage);
        toast.error(errorMessage);
        setSuccess(null);
        return;
      }

      const session = await getSession();

      if (session?.user) {
        dispatch(setUser(session.user));
        toast.success("Login successful!");
        router.push("/");
        setEmail("");
        setPassword("");
        setError(null);
        setSuccess("Login successful!");
      } else {
        toast.error("Session not found after login.");
      }
    } catch (err) {
      console.error("Unexpected login error:", err);
      toast.error("An unexpected error occurred.");
      setError("An unexpected error occurred.");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-t from-blue-100 to-white min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#0A2647]">Welcome Back</h1>
          <p className="text-[#144272] mt-2">Sign in to your account</p>
        </div>

        <div className="space-y-6 bg-white p-8 rounded-xl shadow-md border border-blue-100">
          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className={`w-full flex items-center justify-center gap-3 py-3 px-4 border border-blue-500 rounded-lg transition-colors duration-200 ${
              googleLoading || loading
                ? "opacity-70 cursor-not-allowed bg-gray-50"
                : "hover:bg-blue-50"
            }`}
            aria-label="Continue with Google"
          >
            {googleLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
            ) : (
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
            )}
            <span className="text-[#0A2647] font-medium">
              {googleLoading ? "Signing in..." : "Continue with Google"}
            </span>
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#144272] mb-1"
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
                  disabled={loading || googleLoading}
                  required
                  className={`w-full pl-10 pr-4 py-3 border border-blue-500 rounded-lg focus:ring-2 focus:ring-[#205295] focus:border-[#205295] outline-none transition-colors bg-white text-[#0A2647] ${
                    loading || googleLoading
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#144272] mb-1"
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
                  disabled={loading || googleLoading}
                  required
                  className={`w-full pl-10 pr-12 py-3 border border-blue-500 rounded-lg focus:ring-2 focus:ring-[#205295] focus:border-[#205295] outline-none transition-colors bg-white text-[#0A2647] ${
                    loading || googleLoading
                      ? "opacity-70 cursor-not-allowed"
                      : ""
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading || googleLoading}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-[#205295] ${
                    loading || googleLoading
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
              type="submit"
              disabled={loading || googleLoading}
              className={`w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${
                loading || googleLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="text-center">
            <p className="text-[#144272] text-sm">
              Don&apos;t have an account?
              <Link
                href="/auth/signup"
                className={`text-blue-500 hover:underline font-medium ${
                  loading || googleLoading
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-600 bg-red-50 py-2 px-3 text-sm text-center rounded border border-red-200">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-600 bg-green-50 py-2 px-3 text-sm text-center rounded border border-green-200">
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
