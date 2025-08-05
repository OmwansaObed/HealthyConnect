"use client";
import {
  Shield,
  FileText,
  Users,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const TermsOfService = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using HealthyConnect, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    },
    {
      title: "2. Description of Service",
      content:
        "HealthyConnect is an online platform that connects healthcare professionals with healthcare facilities in Kenya. We provide job matching services, application management, and recruitment support to both healthcare professionals and facilities.",
    },
    {
      title: "3. User Registration and Accounts",
      content:
        "Users must provide accurate, current, and complete information during registration and maintain the accuracy of such information. You are responsible for safeguarding your password and all activities under your account.",
    },
    {
      title: "4. Professional Verification",
      content:
        "Healthcare professionals must provide valid credentials and licenses. We reserve the right to verify all professional information and may suspend accounts with unverified or false information.",
    },
    {
      title: "5. User Conduct",
      content:
        "Users agree not to use the service for any unlawful purpose or in any way that could damage, disable, or impair the service. Harassment, discrimination, or inappropriate behavior toward other users is strictly prohibited.",
    },
    {
      title: "6. Privacy and Data Protection",
      content:
        "We are committed to protecting your privacy. Personal information is collected and used in accordance with our Privacy Policy. We implement appropriate security measures to protect against unauthorized access.",
    },
    {
      title: "7. Intellectual Property",
      content:
        "All content on HealthyConnect, including text, graphics, logos, and software, is owned by HealthyConnect or its licensors and is protected by copyright and other intellectual property laws.",
    },
    {
      title: "8. Payment Terms",
      content:
        "Healthcare facilities agree to pay fees for successful placements as outlined in their service agreements. All fees are non-refundable unless otherwise specified in writing.",
    },
    {
      title: "9. Limitation of Liability",
      content:
        "HealthyConnect shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service, even if we have been advised of the possibility of such damages.",
    },
    {
      title: "10. Termination",
      content:
        "We may terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out both;
        }
      `}</style>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Terms of
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Service
            </span>
          </h1>
          <p
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Please read these terms carefully before using HealthyConnect
          </p>
          <div
            className="text-blue-200 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <p>Last updated: June 16, 2025</p>
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-2 bg-red-600">
        <div className="max-w-7xl mx-auto  ">
          <div className="text-center text-white">
            <p className="text-lg font-semibold">Do not skip this section</p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Important Notice Card */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-8 mb-12 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-blue-900 mb-3">
                  Important Notice
                </h3>
                <p className="text-blue-800 leading-relaxed">
                  These Terms of Service constitute a legally binding agreement
                  between you and HealthyConnect. By using our services, you
                  acknowledge that you have read, understood, and agree to these
                  terms.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8 mb-12">
            {sections.map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  If you have any questions about these Terms of Service, please
                  contact us:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 transition-all duration-200 hover:scale-105 hover:shadow-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">Email</span>
                </div>
                <p className="text-gray-600">healthyconnect010@gmail.com</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 transition-all duration-200 hover:scale-105 hover:shadow-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-gray-900">Phone</span>
                </div>
                <p className="text-gray-600">+254 794 909 991</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 transition-all duration-200 hover:scale-105 hover:shadow-lg">
                <div className="flex items-center space-x-3 mb-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-gray-900">Address</span>
                </div>
                <p className="text-gray-600">Mradi, Embakasi, Nairobi, Kenya</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join HealthyConnect today and start connecting with healthcare
            opportunities across Kenya
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Sign Up Now
            </a>
            <a
              href="/jobs"
              className="bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              Browse Jobs
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
