import { Shield } from "lucide-react";

// Terms of Service Component
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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Terms of <span className="text-blue-400">Service</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Please read these terms carefully before using HealthyConnect
          </p>
          <div className="mt-8 text-gray-400">
            <p>Last updated: January 15, 2025</p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-12 rounded-r-xl">
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    Important Notice
                  </h3>
                  <p className="text-blue-800">
                    These Terms of Service constitute a legally binding
                    agreement between you and HealthyConnect. By using our
                    services, you acknowledge that you have read, understood,
                    and agree to these terms.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Contact Information
              </h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p>
                  <strong>Email:</strong> legal@healthyconnect.co.ke
                </p>
                <p>
                  <strong>Phone:</strong> +254 794 909 991
                </p>
                <p>
                  <strong>Address:</strong> Mradi, Embakasi, Nairobi, Kenya
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
