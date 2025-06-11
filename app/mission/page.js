import { Heart, Users, Building, Target } from "lucide-react";

const Mission = () => {
  const goals = [
    {
      icon: Target,
      title: "Bridge the Gap",
      description:
        "Connect skilled healthcare professionals with facilities that need their expertise across Kenya.",
      color: "bg-blue-500",
    },
    {
      icon: Heart,
      title: "Improve Patient Care",
      description:
        "Ensure every Kenyan has access to quality healthcare by optimizing workforce distribution.",
      color: "bg-red-500",
    },
    {
      icon: Users,
      title: "Empower Professionals",
      description:
        "Provide healthcare workers with career growth opportunities and professional development.",
      color: "bg-emerald-500",
    },
    {
      icon: Building,
      title: "Support Facilities",
      description:
        "Help healthcare facilities find qualified staff quickly and efficiently.",
      color: "bg-purple-500",
    },
  ];

  const impacts = [
    {
      metric: "40%",
      description: "Reduction in average time to fill healthcare positions",
    },
    {
      metric: "85%",
      description: "Of placed professionals still in their roles after 1 year",
    },
    {
      metric: "92%",
      description: "Facility satisfaction rate with our placements",
    },
    {
      metric: "15K+",
      description: "Healthcare professionals actively using our platform",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Our <span className="text-yellow-400">Mission</span>
          </h1>
          <p className="text-2xl text-emerald-100 max-w-4xl mx-auto leading-relaxed font-medium">
            To revolutionize healthcare in Kenya by ensuring the right
            healthcare professionals are in the right places, ultimately
            improving patient outcomes and saving lives.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Vision
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              A Kenya where every healthcare facility is fully staffed with
              qualified, passionate professionals, and every healthcare worker
              has access to meaningful career opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How We're Making It Happen
            </h2>
            <p className="text-xl text-gray-600">
              Our strategic approach to transforming healthcare recruitment
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {goals.map((goal, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div
                  className={`w-16 h-16 ${goal.color} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <goal.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {goal.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {goal.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Impact So Far
            </h2>
            <p className="text-xl text-gray-600">
              Measurable results in transforming Kenya's healthcare workforce
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impacts.map((impact, index) => (
              <div
                key={index}
                className="text-center p-8 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl"
              >
                <div className="text-4xl font-bold text-blue-600 mb-4">
                  {impact.metric}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {impact.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Whether you're a healthcare professional looking for your next
            opportunity or a facility seeking qualified staff, you're part of
            our mission to transform healthcare in Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 font-bold text-lg shadow-lg transition-all">
              Get Started Today
            </button>
            <button className="px-8 py-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 font-bold text-lg shadow-lg transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Mission;
