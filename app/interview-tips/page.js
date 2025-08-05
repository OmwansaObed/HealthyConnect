"use client";
import React, { useState } from "react";
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Heart,
  Shield,
  Activity,
  MessageSquare,
  Target,
  Lightbulb,
  FileText,
  Calendar,
  MapPin,
  Zap,
} from "lucide-react";

const InterviewTipsPage = () => {
  const [expandedTip, setExpandedTip] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState("nursing");

  const interviewTips = [
    {
      id: 1,
      title: "Research the Healthcare Facility",
      icon: BookOpen,
      summary:
        "Understand the organization's mission, values, and recent achievements",
      details: [
        "Visit the facility's website and read their mission statement",
        "Research recent news articles or press releases about the organization",
        "Understand their specialties and patient demographics",
        "Learn about their values and how they align with your career goals",
        "Check their social media presence for recent updates",
      ],
    },
    {
      id: 2,
      title: "Prepare for Common Healthcare Interview Questions",
      icon: MessageSquare,
      summary: "Practice answers to typical healthcare-specific questions",
      details: [
        "Why did you choose healthcare as a career?",
        "How do you handle high-stress situations?",
        "Describe a time you dealt with a difficult patient or family member",
        "How do you prioritize tasks during a busy shift?",
        "What's your approach to continuing education and professional development?",
      ],
    },
    {
      id: 3,
      title: "Showcase Your Clinical Skills",
      icon: Activity,
      summary: "Demonstrate your technical competencies and certifications",
      details: [
        "Bring copies of all relevant certifications and licenses",
        "Prepare specific examples of clinical procedures you've performed",
        "Discuss any specialized training or continuing education",
        "Mention any quality improvement initiatives you've participated in",
        "Highlight experience with specific medical equipment or software",
      ],
    },
    {
      id: 4,
      title: "Demonstrate Cultural Competency",
      icon: Users,
      summary: "Show your ability to work with diverse patient populations",
      details: [
        "Discuss experience working with patients from different backgrounds",
        "Explain how you adapt communication styles for different patients",
        "Share examples of culturally sensitive care you've provided",
        "Mention any language skills or cultural training you have",
        "Describe how you handle cultural or religious preferences in care",
      ],
    },
    {
      id: 5,
      title: "Prepare Questions to Ask",
      icon: Target,
      summary: "Show genuine interest by asking thoughtful questions",
      details: [
        "What does a typical day look like in this role?",
        "How does the facility support professional development?",
        "What are the biggest challenges facing the department currently?",
        "How do you measure success in this position?",
        "What opportunities are there for career advancement?",
      ],
    },
    {
      id: 6,
      title: "Professional Presentation",
      icon: Shield,
      summary: "Dress appropriately and maintain professional demeanor",
      details: [
        "Wear clean, pressed professional attire (scrubs if appropriate)",
        "Ensure good personal hygiene and grooming",
        "Arrive 10-15 minutes early",
        "Bring multiple copies of your resume and references",
        "Maintain good posture and eye contact throughout the interview",
      ],
    },
  ];

  const salaryData = {
    nursing: {
      title: "Nursing Positions",
      icon: Heart,
      ranges: [
        {
          level: "Registered Nurse (Entry Level)",
          range: "KSh 25,000 - 45,000",
        },
        {
          level: "Registered Nurse (Experienced)",
          range: "KSh 65,000 - 85,000",
        },
        {
          level: "Specialized Nurse (ICU, OR, ER)",
          range: "KSh 75,000 - 100,000",
        },
        { level: "Nurse Supervisor", range: "KSh 90,000 - 120,000" },
        { level: "Nurse Manager", range: "KSh 120,000 - 180,000" },
      ],
    },
    medical: {
      title: "Medical Officers",
      icon: Shield,
      ranges: [
        { level: "Medical Officer (Intern)", range: "KSh 80,000 - 100,000" },
        { level: "Medical Officer (General)", range: "KSh 120,000 - 180,000" },
        {
          level: "Medical Officer (Specialized)",
          range: "KSh 180,000 - 250,000",
        },
        { level: "Senior Medical Officer", range: "KSh 250,000 - 350,000" },
        { level: "Consultant", range: "KSh 350,000 - 500,000+" },
      ],
    },
    clinical: {
      title: "Clinical Officers",
      icon: Activity,
      ranges: [
        {
          level: "Clinical Officer (Entry Level)",
          range: "KSh 25,000 - 50,000",
        },
        {
          level: "Clinical Officer (Experienced)",
          range: "KSh 50,000 - 70,000",
        },
        { level: "Senior Clinical Officer", range: "KSh 70,000 - 90,000" },
        { level: "Clinical Officer In-Charge", range: "KSh 90,000 - 120,000" },
        {
          level: "Clinical Officer Specialist",
          range: "KSh 100,000 - 140,000",
        },
      ],
    },
    technician: {
      title: "Medical Technicians",
      icon: Zap,
      ranges: [
        { level: "Lab Technician", range: "KSh 20,000 - 45,000" },
        { level: "Radiology Technician", range: "KSh 35,000 - 55,000" },
        { level: "Pharmacy Technician", range: "KSh 28,000 - 40,000" },
        { level: "Senior Technician", range: "KSh 45,000 - 65,000" },
        { level: "Chief Technician", range: "KSh 60,000 - 85,000" },
      ],
    },
  };

  const careerHighlights = [
    {
      category: "Growth Opportunities",
      icon: TrendingUp,
      color: "bg-emerald-500",
      highlights: [
        "Healthcare sector growing at 12% annually in Kenya",
        "Increasing demand for specialized healthcare professionals",
        "Opportunities for international placements and exchange programs",
        "Government initiatives supporting healthcare infrastructure development",
      ],
    },
    {
      category: "Professional Development",
      icon: Award,
      color: "bg-blue-500",
      highlights: [
        "Continuous learning through medical conferences and workshops",
        "Certification programs for specialized skills",
        "Leadership development opportunities",
        "Research and publication opportunities in medical journals",
      ],
    },
    {
      category: "Job Security",
      icon: Shield,
      color: "bg-purple-500",
      highlights: [
        "Healthcare is a recession-proof industry",
        "High demand for skilled healthcare professionals",
        "Government and private sector employment opportunities",
        "Potential for self-employment and private practice",
      ],
    },
    {
      category: "Personal Fulfillment",
      icon: Heart,
      color: "bg-red-500",
      highlights: [
        "Direct impact on patients' lives and well-being",
        "Opportunity to serve communities and make a difference",
        "Diverse work environments from rural clinics to urban hospitals",
        "Collaborative work with multidisciplinary healthcare teams",
      ],
    },
  ];

  const toggleTip = (tipId) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  const TipCard = ({ tip }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Clickable Header Only */}
      <div
        className="p-6 cursor-pointer select-none hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100"
        onClick={() => toggleTip(tip.id)}
      >
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <tip.icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">{tip.title}</h3>
              <div
                className={`transform transition-transform duration-200 ${
                  expandedTip === tip.id ? "rotate-180" : ""
                }`}
              >
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </div>
            </div>
            <p className="text-gray-600 mt-2">{tip.summary}</p>
          </div>
        </div>
      </div>

      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expandedTip === tip.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="space-y-3">
              {tip.details.map((detail, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

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
            Healthcare Career
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Success Guide
            </span>
          </h1>
          <p
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Master your healthcare interviews, understand salary expectations,
            and explore career advancement opportunities
          </p>
        </div>
      </section>

      {/* Interview Tips Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Interview Tips for
              <span className="text-blue-600"> Healthcare Professionals</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Prepare for success with our comprehensive interview guide
              tailored specifically for healthcare careers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {interviewTips.map((tip, index) => (
              <div
                key={tip.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <TipCard tip={tip} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Salary Guide Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Healthcare Salary
              <span className="text-green-600"> Guide</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understand competitive salary ranges across different healthcare
              positions in Kenya
            </p>
          </div>

          {/* Salary Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(salaryData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setSelectedCareer(key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedCareer === key
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                }`}
              >
                <data.icon className="w-5 h-5" />
                <span>{data.title}</span>
              </button>
            ))}
          </div>

          {/* Salary Ranges Display */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 transition-all duration-400">
            <div className="flex items-center mb-6">
              {React.createElement(salaryData[selectedCareer].icon, {
                className: "w-8 h-8 text-blue-600 mr-3",
              })}
              <h3 className="text-2xl font-bold text-gray-900">
                {salaryData[selectedCareer].title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {salaryData[selectedCareer].ranges.map((range, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-200 hover:scale-105 hover:shadow-lg animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">
                        {range.level}
                      </h4>
                      <p className="text-2xl font-bold text-green-600">
                        {range.range}
                      </p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Salary ranges vary based on experience,
                location, facility type, and additional qualifications. Public
                facilities may offer higher compensation compared to private
                institutions in most setups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Highlights Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Healthcare Career
              <span className="text-purple-600"> Highlights</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the rewarding aspects of building a career in healthcare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {careerHighlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-6">
                  <div
                    className={`w-12 h-12 ${highlight.color} rounded-xl flex items-center justify-center mr-4`}
                  >
                    <highlight.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {highlight.category}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {highlight.highlights.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Advance Your Healthcare Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Apply these tips and insights to land your dream healthcare position
            and build a fulfilling career
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.jobseeker.com/app/resumes/start"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              CV Builder
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

export default InterviewTipsPage;
