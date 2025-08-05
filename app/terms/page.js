"use client";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

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

  // Basic animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Consistent hover effects
  const cardHoverEffect = {
    scale: 1.02,
    y: -4,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3, ease: "easeOut" },
  };

  const textHoverEffect = {
    x: 8,
    color: "#3b82f6",
    transition: { duration: 0.3, ease: "easeOut" },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        className="bg-gray-800 py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-5xl font-bold text-white mb-6"
            variants={titleVariants}
          >
            Terms of <span className="text-blue-400">Service</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            variants={itemVariants}
          >
            Please read these terms carefully before using HealthyConnect
          </motion.p>
          <motion.div className="text-gray-400" variants={itemVariants}>
            <p>Last updated: June 16, 2025</p>
          </motion.div>
        </div>
      </motion.section>

      <div className="bg-red-600 text-white py-2 text-center">
        Do not skip this section
      </div>

      {/* Terms Content */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Important Notice Card */}
          <motion.div
            className="bg-blue-50 border-l-4 border-blue-500 p-8 mb-12 rounded-xl"
            variants={itemVariants}
            whileHover={cardHoverEffect}
          >
            <div className="flex items-start">
              <motion.div
                className="mr-4 mt-1 flex-shrink-0"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                <Shield className="w-6 h-6 text-blue-500" />
              </motion.div>
              <div className="flex-1">
                <motion.h3
                  className="text-lg font-semibold text-blue-900 mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Important Notice
                </motion.h3>
                <motion.p
                  className="text-blue-800 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  These Terms of Service constitute a legally binding agreement
                  between you and HealthyConnect. By using our services, you
                  acknowledge that you have read, understood, and agree to these
                  terms.
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Terms Sections */}
          <motion.div className="space-y-8 mb-12" variants={containerVariants}>
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100"
                variants={itemVariants}
                whileHover={cardHoverEffect}
              >
                <motion.h2
                  className="text-2xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                >
                  {section.title}
                </motion.h2>
                <motion.p
                  className="text-gray-600 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                >
                  {section.content}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="bg-gray-50 rounded-xl p-8"
            variants={itemVariants}
            whileHover={cardHoverEffect}
          >
            <motion.h2
              className="text-2xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Contact Information
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              If you have any questions about these Terms of Service, please
              contact us:
            </motion.p>
            <motion.div
              className="space-y-3 text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <motion.p className="cursor-pointer" whileHover={textHoverEffect}>
                <strong>Email:</strong> healthyconnect010@gmail.com
              </motion.p>
              <motion.p className="cursor-pointer" whileHover={textHoverEffect}>
                <strong>Phone:</strong> +254 794 909 991
              </motion.p>
              <motion.p className="cursor-pointer" whileHover={textHoverEffect}>
                <strong>Address:</strong> Mradi, Embakasi, Nairobi, Kenya
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default TermsOfService;
