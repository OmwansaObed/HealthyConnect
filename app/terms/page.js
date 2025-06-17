"use client";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";
import {
  staggerContainer,
  textVariant,
  fadeIn,
  slideIn,
} from "../../utils/motion";

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
      <motion.section
        className="bg-gray-800 py-20"
        initial="hidden"
        animate="show"
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-5xl font-bold text-white mb-6"
            variants={textVariant(0.1)}
          >
            Terms of <span className="text-blue-400">Service</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            variants={textVariant(0.2)}
          >
            Please read these terms carefully before using HealthyConnect
          </motion.p>
          <motion.div
            className="mt-8 text-gray-400"
            variants={fadeIn("up", "tween", 0.3, 0.6)}
          >
            <p>Last updated: January 15, 2025</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Terms Content */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <motion.div
              className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-12 rounded-r-xl"
              variants={slideIn("left", "spring", 0.1, 0.75)}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="flex items-start">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.3,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Shield className="w-6 h-6 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                </motion.div>
                <div>
                  <motion.h3
                    className="text-lg font-semibold text-blue-900 mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    Important Notice
                  </motion.h3>
                  <motion.p
                    className="text-blue-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    These Terms of Service constitute a legally binding
                    agreement between you and HealthyConnect. By using our
                    services, you acknowledge that you have read, understood,
                    and agree to these terms.
                  </motion.p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-8"
              variants={staggerContainer(0.1, 0)}
            >
              {sections.map((section, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
                  variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                  whileHover={{
                    scale: 1.01,
                    y: -2,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <motion.h2
                    className="text-2xl font-bold text-gray-900 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {section.title}
                  </motion.h2>
                  <motion.p
                    className="text-gray-600 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    {section.content}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-12 bg-gray-50 rounded-2xl p-8"
              variants={fadeIn("up", "spring", 0.3, 0.6)}
              whileHover={{
                scale: 1.01,
                transition: { duration: 0.2 },
              }}
            >
              <motion.h2
                className="text-2xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Contact Information
              </motion.h2>
              <motion.p
                className="text-gray-600 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                If you have any questions about these Terms of Service, please
                contact us:
              </motion.p>
              <motion.div
                className="space-y-2 text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <motion.p
                  whileHover={{ x: 5, color: "#3b82f6" }}
                  transition={{ duration: 0.2 }}
                >
                  <strong>Email:</strong>healthyconnect010@gmail.com
                </motion.p>
                <motion.p
                  whileHover={{ x: 5, color: "#3b82f6" }}
                  transition={{ duration: 0.2 }}
                >
                  <strong>Phone:</strong> +254 794 909 991
                </motion.p>
                <motion.p
                  whileHover={{ x: 5, color: "#3b82f6" }}
                  transition={{ duration: 0.2 }}
                >
                  <strong>Address:</strong> Mradi, Embakasi, Nairobi, Kenya
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default TermsOfService;
