"use client";
import { Heart, Users, Building, Target } from "lucide-react";
import { motion } from "framer-motion";
import {
  staggerContainer,
  textVariant,
  fadeIn,
  slideIn,
} from "../../utils/motion";

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
      <motion.section
        className="bg-emerald-600 py-20"
        initial="hidden"
        animate="show"
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            className="text-5xl font-bold text-white mb-6"
            variants={textVariant(0.1)}
          >
            Our <span className="text-yellow-400">Mission</span>
          </motion.h1>
          <motion.p
            className="text-2xl text-emerald-100 max-w-4xl mx-auto leading-relaxed font-medium"
            variants={textVariant(0.2)}
          >
            To revolutionize healthcare in Kenya by ensuring the right
            healthcare professionals are in the right places, ultimately
            improving patient outcomes and saving lives.
          </motion.p>
        </div>
      </motion.section>

      {/* Vision Section */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-6"
              variants={textVariant(0.1)}
            >
              Our Vision
            </motion.h2>
            <motion.p
              className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              variants={textVariant(0.2)}
            >
              A Kenya where every healthcare facility is fully staffed with
              qualified, passionate professionals, and every healthcare worker
              has access to meaningful career opportunities.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Goals Section */}
      <motion.section
        className="py-20 bg-gray-50"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-4"
              variants={textVariant(0.1)}
            >
              How We&apos;re Making It Happen
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600"
              variants={textVariant(0.2)}
            >
              Our strategic approach to transforming healthcare recruitment
            </motion.p>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={staggerContainer(0.1, 0)}
          >
            {goals.map((goal, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg"
                variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
              >
                <motion.div
                  className={`w-16 h-16 ${goal.color} rounded-2xl flex items-center justify-center mb-6`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: index * 0.1 + 0.3,
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <goal.icon className="w-8 h-8 text-white" />
                </motion.div>
                <motion.h3
                  className="text-2xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {goal.title}
                </motion.h3>
                <motion.p
                  className="text-gray-600 text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {goal.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Impact Section */}
      <motion.section
        className="py-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold text-gray-900 mb-4"
              variants={textVariant(0.1)}
            >
              Our Impact So Far
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600"
              variants={textVariant(0.2)}
            >
              Measurable results in transforming Kenya's healthcare workforce
            </motion.p>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer(0.1, 0)}
          >
            {impacts.map((impact, index) => (
              <motion.div
                key={index}
                className="text-center p-8 bg-blue-50 rounded-2xl"
                variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                whileHover={{
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.2 },
                }}
              >
                <motion.div
                  className="text-4xl font-bold text-blue-600 mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: index * 0.1 + 0.3,
                    type: "spring",
                    stiffness: 300,
                  }}
                  whileHover={{ scale: 1.1 }}
                >
                  {impact.metric}
                </motion.div>
                <motion.p
                  className="text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {impact.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-20 bg-blue-600"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={staggerContainer(0.1, 0.2)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl font-bold text-white mb-6"
            variants={textVariant(0.1)}
          >
            Join Our Mission
          </motion.h2>
          <motion.p
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
            variants={textVariant(0.2)}
          >
            Whether you&apos;re a healthcare professional looking for your next
            opportunity or a facility seeking qualified staff, you&apos;re part
            of our mission to transform healthcare in Kenya.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeIn("up", "spring", 0.3, 0.6)}
          >
            <motion.button
              className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 font-bold text-lg shadow-lg transition-all"
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.button>
            <motion.button
              className="px-8 py-4 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 font-bold text-lg shadow-lg transition-all"
              whileHover={{
                scale: 1.05,
                y: -3,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Mission;
