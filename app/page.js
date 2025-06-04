"use client";
import React, { useState } from "react";
import { GiLaserWarning } from "react-icons/gi";
import { MdScience } from "react-icons/md";
import {
  Heart,
  Search,
  MapPin,
  Users,
  TrendingUp,
  Award,
  ChevronRight,
  Star,
  Briefcase,
  Shield,
  Clock,
  ArrowRight,
  CheckCircle,
  Play,
  Quote,
  Settings,
} from "lucide-react";

export default function Homepage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const jobCategories = [
    { name: "Nursing", jobs: 1250, color: "bg-emerald-500", icon: Heart },
    { name: "Medical Officer", jobs: 890, color: "bg-purple-500", icon: Award },
    {
      name: "Clicial Oficcers",
      jobs: 670,
      color: "bg-orange-500",
      icon: Shield,
    },
    {
      name: "Lab Technician",
      jobs: 420,
      color: "bg-yellow-500",
      icon: MdScience,
    },
    {
      name: "Medical Technicians",
      jobs: 420,
      color: "bg-gray-500",
      icon: Settings,
    },
    { name: "CoHo", jobs: 420, color: "bg-pink-500", icon: Users },
    {
      name: "Managerial",
      jobs: 340,
      color: "bg-cyan-500",
      icon: Briefcase,
    },
    { name: "Pharmacy", jobs: 280, color: "bg-indigo-500", icon: CheckCircle },
    {
      name: "Radiograhpy",
      jobs: 280,
      color: "bg-red-500",
      icon: GiLaserWarning,
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Jobs", color: "text-blue-600" },
    {
      number: "25K+",
      label: "Healthcare Professionals",
      color: "text-emerald-600",
    },
    {
      number: "1.2K+",
      label: "Healthcare Facilities",
      color: "text-purple-600",
    },
    { number: "95%", label: "Success Rate", color: "text-orange-600" },
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Emergency Physician",
      company: "City General Hospital",
      content:
        "HealthyConnect helped me find the perfect position that aligned with my career goals. The process was seamless and professional.",
      avatar: "SJ",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Registered Nurse",
      company: "St. Mary's Medical Center",
      content:
        "I was impressed by the quality of opportunities and the personalized support throughout my job search journey.",
      avatar: "MC",
      rating: 5,
    },
    {
      name: "Lisa Rodriguez",
      role: "Physical Therapist",
      company: "Rehabilitation Plus",
      content:
        "The platform made it easy to connect with employers who truly value healthcare professionals. Highly recommend!",
      avatar: "LR",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white ">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Your Dream
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Healthcare Career{" "}
            </span>
            Starts Here
          </h1>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl">
            Connect with top healthcare facilities and discover opportunities
            that match your passion for making a difference in people's lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 font-bold text-lg shadow-lg hover:shadow-xl hover:cursor-pointer  transition-all">
              Get Started
            </button>

            <button className="px-8 py-4 bg-blue-700 border outline-none text-white rounded-xl hover:bg-blue-800 font-bold text-lg hover:cursor-pointer shadow-lg hover:shadow-xl transition-all">
              Browse Jobs
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Job Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Healthcare
              <span className="text-blue-600"> Opportunities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover your perfect role across various healthcare specialties
              and make a meaningful impact in patient care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="group cursor-pointer">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
                    <div
                      className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {category.jobs.toLocaleString()} open positions
                    </p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                      <span>Explore Jobs</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose
                <span className="text-blue-600"> HealthyConnect?</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                We're more than just a job board - we're your partner in
                building a fulfilling healthcare career.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: Shield,
                    title: "Verified Opportunities",
                    description:
                      "All job postings are verified by our healthcare recruitment specialists.",
                    color: "bg-emerald-500",
                  },
                  {
                    icon: Clock,
                    title: "Real-time Matching",
                    description:
                      "Get instant notifications for jobs that match your skills and preferences.",
                    color: "bg-purple-500",
                  },
                  {
                    icon: Users,
                    title: "Career Support",
                    description:
                      "Access to career coaches and professional development resources.",
                    color: "bg-orange-500",
                  },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">
                      Recent Job Match
                    </h3>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                      98% Match
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">
                          Medical Officer - Emergency Department
                        </h4>
                        <p className="text-gray-600">Coptic General Hospital</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        📍 Nairobi, Upperhill
                      </span>
                      <span className="text-gray-600">💰ksh 100k+</span>
                    </div>
                    <button className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Healthcare Professionals
              <span className="text-blue-600"> Say About Us</span>
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied healthcare professionals who found
              their dream jobs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-blue-600 mb-4" />
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {testimonial.content}
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    <p className="text-blue-600 text-sm">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Healthcare Role?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join HealthyConnect today and take the next step in your healthcare
            career journey. Your dream job is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 font-bold text-lg shadow-lg hover:shadow-xl transition-all">
              Create Your Profile
            </button>
            <button className="px-8 py-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
