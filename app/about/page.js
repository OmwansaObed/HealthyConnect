"use client";
import React, { useState } from "react";
import { Heart, Users, Shield, Lightbulb } from "lucide-react";

// About Us Component
const AboutUs = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Kimani",
      role: "CEO & Co-Founder",
      bio: "Former Chief Medical Officer with 15+ years in healthcare administration",
      avatar: "SK",
      color: "bg-blue-600",
    },
    {
      name: "Michael Ochieng",
      role: "CTO & Co-Founder",
      bio: "Tech veteran with expertise in healthcare technology solutions",
      avatar: "MO",
      color: "bg-emerald-600",
    },
    {
      name: "Dr. Grace Wanjiku",
      role: "Head of Medical Relations",
      bio: "Specialist in healthcare recruitment and professional development",
      avatar: "GW",
      color: "bg-purple-600",
    },
    {
      name: "James Mwangi",
      role: "Head of Operations",
      bio: "Operations expert focused on optimizing healthcare workforce solutions",
      avatar: "JM",
      color: "bg-orange-600",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Patient-Centered",
      description:
        "Every connection we make ultimately serves better patient care and outcomes.",
      color: "bg-red-500",
    },
    {
      icon: Shield,
      title: "Trust & Integrity",
      description:
        "We maintain the highest standards of professional ethics and transparency.",
      color: "bg-emerald-500",
    },
    {
      icon: Users,
      title: "Community First",
      description:
        "Building strong healthcare communities through meaningful connections.",
      color: "bg-blue-500",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Leveraging technology to solve complex healthcare workforce challenges.",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            About <span className="text-emerald-400">HealthyConnect</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing healthcare recruitment in Kenya by connecting
            passionate healthcare professionals with facilities that need their
            expertise.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Founded in 2023, HealthyConnect emerged from a simple
                  observation: Kenya's healthcare system had incredible
                  professionals and facilities, but they weren't finding each
                  other efficiently.
                </p>
                <p>
                  Our founders, having worked in both clinical and
                  administrative roles, witnessed firsthand the challenges
                  healthcare professionals faced in finding meaningful career
                  opportunities, and the struggles facilities had in recruiting
                  qualified staff.
                </p>
                <p>
                  Today, we've facilitated over 10,000 successful connections
                  between healthcare professionals and facilities across Kenya,
                  contributing to better patient care nationwide.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { number: "10K+", label: "Successful Matches" },
                    { number: "500+", label: "Partner Facilities" },
                    { number: "25K+", label: "Active Professionals" },
                    { number: "47", label: "Counties Covered" },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-white rounded-2xl shadow-sm"
                    >
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {stat.number}
                      </div>
                      <div className="text-gray-600 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core principles guide everything we do at HealthyConnect
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <div
                  className={`w-16 h-16 ${value.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              Healthcare and technology experts passionate about making a
              difference
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg text-center"
              >
                <div
                  className={`w-20 h-20 ${member.color} rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6`}
                >
                  {member.avatar}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
