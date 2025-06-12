"use client";
import React from "react";
import { Shield, Lock, AlertTriangle, Home, ArrowLeft } from "lucide-react";

const AccessDeniedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50  to-purple-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-16 bg-red-200 rounded-full opacity-20 animate-float-1" />
        <div className="absolute top-40 right-20 w-12 h-12 bg-orange-200 rounded-full opacity-20 animate-float-2" />
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-float-3" />
      </div>

      <div className="max-w-md w-full text-center animate-fade-in">
        {/* Main Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative animate-scale-in">
            <div className="bg-red-100 p-6 rounded-full animate-shake">
              <Shield className="w-16 h-16 text-red-500" />
            </div>
            <div className="absolute -top-2 -right-2 bg-orange-500 p-2 rounded-full animate-bounce-slow">
              <Lock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 animate-slide-up">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-pulse-slow">
            Access Denied
          </h1>

          <div className="flex items-center justify-center gap-2 text-orange-600 mb-6 animate-slide-up-delay-1">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-semibold">You are not allowed</span>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-red-100 hover:scale-105 transition-transform duration-300 animate-slide-up-delay-2">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              🚫 You are not an admin
            </h2>
            <p className="text-gray-600 leading-relaxed">
              This content is restricted to administrators only. You don't have
              the necessary permissions to view this page.
            </p>
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-4 rounded-lg border border-red-200 animate-slide-up-delay-3">
            <p className="text-sm text-gray-600">
              If you believe this is an error, please contact your system
              administrator or try logging in with proper credentials.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-slide-up-delay-4">
          <button
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg flex items-center justify-center gap-2 hover:scale-105 hover:shadow-xl transition-all duration-300 transform active:scale-95"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>

          <button
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg flex items-center justify-center gap-2 hover:scale-105 hover:shadow-xl transition-all duration-300 transform active:scale-95"
            onClick={() => (window.location.href = "/")}
          >
            <Home className="w-5 h-5" />
            Home
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-sm text-gray-500 animate-slide-up-delay-5">
          <p className="animate-opacity-pulse">Error Code: 403 - Forbidden</p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 animate-spin-slow">
        <div className="w-32 h-32 border-2 border-red-200 rounded-full opacity-20" />
      </div>

      <div className="absolute bottom-10 left-10 animate-spin-reverse">
        <div className="w-24 h-24 border-2 border-orange-200 rounded-full opacity-20" />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0) rotate(-180deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes opacity-pulse {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes float-1 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(100px, -50px);
          }
          66% {
            transform: translate(50px, -25px);
          }
        }

        @keyframes float-2 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(-80px, 60px);
          }
          66% {
            transform: translate(-40px, 30px);
          }
        }

        @keyframes float-3 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(60px, -40px);
          }
          66% {
            transform: translate(30px, -20px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-slide-up-delay-1 {
          animation: slide-up 0.6s ease-out 0.2s both;
        }

        .animate-slide-up-delay-2 {
          animation: slide-up 0.6s ease-out 0.4s both;
        }

        .animate-slide-up-delay-3 {
          animation: slide-up 0.6s ease-out 0.6s both;
        }

        .animate-slide-up-delay-4 {
          animation: slide-up 0.6s ease-out 0.8s both;
        }

        .animate-slide-up-delay-5 {
          animation: slide-up 0.6s ease-out 1s both;
        }

        .animate-scale-in {
          animation: scale-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.3s
            both;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out 3s infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-opacity-pulse {
          animation: opacity-pulse 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 25s linear infinite;
        }

        .animate-float-1 {
          animation: float-1 8s ease-in-out infinite;
        }

        .animate-float-2 {
          animation: float-2 6s ease-in-out infinite 1s;
        }

        .animate-float-3 {
          animation: float-3 7s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
};

export default AccessDeniedPage;
