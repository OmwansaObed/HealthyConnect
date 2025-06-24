"use client";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn, textVariant } from "../../utils/motion";
import { toast } from "sonner";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    userType: "professional",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = axios.post("/api/contact", formData);
      toast.success("Form submitted successfully");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        userType: "professional",
      });

      if (response.status === 200) {
        toast.success("Form submitted successfully");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form");
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      details: "+254 794 909 991",
      description: "Mon-Fri, 8AM-6PM EAT",
      color: "bg-blue-600",
      href: "tel:+254794909991",
      isClickable: true,
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "healthyconnect010@gmail.com",
      description: "We'll respond within 24 hours",
      color: "bg-emerald-600",
      href: "mailto:healthyconnect010@gmail.com",
      isClickable: true,
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "Nairobi, Kenya",
      description: "Virtual Office",
      color: "bg-purple-600",
      href: "https://maps.google.com/?q=Nairobi,Kenya",
      isClickable: true,
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 8AM-6PM",
      description: "Saturday: 9AM-2PM",
      color: "bg-orange-600",
      href: null,
      isClickable: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer(0.1, 0.2)}
        className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            variants={textVariant(0.2)}
            className="text-5xl font-bold text-white mb-6"
          >
            Get In <span className="text-yellow-400">Touch</span>
          </motion.h1>
          <motion.p
            variants={textVariant(0.4)}
            className="text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Have questions? Need support? We&apos;re here to help you succeed in
            your healthcare career journey.
          </motion.p>
        </div>
      </motion.section>

      {/* Contact Methods */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer()}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const ContactElement = method.isClickable ? "a" : "div";
              const contactProps = method.isClickable
                ? {
                    href: method.href,
                    target: method.href?.startsWith("http")
                      ? "_blank"
                      : "_self",
                    rel: method.href?.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined,
                  }
                : {};

              return (
                <motion.div
                  key={index}
                  variants={fadeIn("up", "tween", index * 0.2 + 0.4, 1)}
                  whileHover={{ y: -10 }}
                  className="relative"
                >
                  <ContactElement
                    {...contactProps}
                    className={`block text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all ${
                      method.isClickable
                        ? "cursor-pointer hover:bg-gray-50 transform hover:scale-105"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-16 h-16 ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
                    >
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {method.title}
                    </h3>
                    <p className="text-lg font-medium text-gray-800 mb-2">
                      {method.details}
                    </p>
                    <p className="text-gray-600">{method.description}</p>
                    {method.isClickable && (
                      <div className="mt-3 text-sm text-blue-600 font-medium">
                        Tap to {method.title.toLowerCase()}
                      </div>
                    )}
                  </ContactElement>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Contact Form */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer()}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn("up", "tween", 0.2, 1)}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Send Us a Message
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we&apos;ll get back to you as soon as
              possible
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn("up", "tween", 0.4, 1)}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={fadeIn("right", "tween", 0.4, 1)}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </motion.div>
                <motion.div variants={fadeIn("left", "tween", 0.4, 1)}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={fadeIn("right", "tween", 0.6, 1)}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I am a...
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                    value={formData.userType}
                    onChange={(e) =>
                      setFormData({ ...formData, userType: e.target.value })
                    }
                  >
                    <option value="professional">
                      Healthcare Professional
                    </option>
                    <option value="facility">Healthcare Facility</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>
                <motion.div variants={fadeIn("left", "tween", 0.6, 1)}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                </motion.div>
              </div>

              <motion.div variants={fadeIn("up", "tween", 0.8, 1)}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Please describe how we can help you..."
                />
              </motion.div>

              <motion.button
                variants={fadeIn("up", "tween", 1, 1)}
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-lg shadow-lg transition-all flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
