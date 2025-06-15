"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import {
  Heart,
  Award,
  Shield,
  Activity,
  Settings,
  Users,
  Briefcase,
  CheckCircle,
  Zap,
  Stethoscope,
  Microscope,
  Syringe,
  Smile,
  Baby,
  Brain,
  BookOpen,
  Hospital,
  Thermometer,
  Ambulance,
  Globe,
  UserCheck,
  Clock,
  ArrowRight,
  Star,
  Quote,
  MapPin,
  Skull,
} from "lucide-react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { useGetJobsQuery } from "../redux/api/jobApiSlice";
import Disclaimer from "../components/general/Disclaimer";

// Constants
const ANIMATION_VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  },
  cardHover: {
    rest: { scale: 1, y: 0 },
    hover: {
      scale: 1.05,
      y: -10,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  },
};

const STATS_DATA = [
  { number: "50K+", label: "Active Jobs", color: "text-blue-600" },
  {
    number: "25K+",
    label: "Healthcare Professionals",
    color: "text-emerald-600",
  },
  { number: "1200+", label: "Healthcare Facilities", color: "text-purple-600" },
  { number: "95%", label: "Success Rate", color: "text-orange-600" },
];

const JOB_CATEGORIES = [
  { name: "Nursing", jobs: 1250, color: "bg-emerald-500", icon: Heart },
  {
    name: "CNA (Certified Nursing Assistant)",
    jobs: 210,
    color: "bg-amber-600",
    icon: UserCheck,
  },
  { name: "Medical Officer", jobs: 890, color: "bg-purple-500", icon: Award },
  { name: "Clinical Officer", jobs: 670, color: "bg-orange-500", icon: Shield },
  {
    name: "Lab Technician",
    jobs: 420,
    color: "bg-yellow-500",
    icon: Microscope,
  },
  {
    name: "Medical Technician",
    jobs: 300,
    color: "bg-gray-500",
    icon: Settings,
  },
  {
    name: "Community Health Worker",
    jobs: 380,
    color: "bg-pink-500",
    icon: Users,
  },
  {
    name: "Public Health Officer",
    jobs: 400,
    color: "bg-cyan-500",
    icon: Globe,
  },
  { name: "Pharmacy", color: "bg-indigo-500", icon: CheckCircle },
  { name: "Radiography", color: "bg-red-500", icon: Zap },
  { name: "Nutritionist", color: "bg-lime-600", icon: Thermometer },
  { name: "Dental", color: "bg-blue-500", icon: Smile },

  { name: "Mental Health", color: "bg-violet-600", icon: Brain },
  { name: "Health Admin", color: "bg-sky-500", icon: Briefcase },
  { name: "Health Education", color: "bg-teal-600", icon: BookOpen },
  { name: "Ambulance/EMT", color: "bg-neutral-500", icon: Ambulance },
  { name: "Health Records", color: "bg-slate-500", icon: Activity },
  { name: "OrthoPaedics", color: "bg-zinc-600", icon: Skull },
];
const FEATURES_DATA = [
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
];

const TESTIMONIALS_DATA = [
  {
    name: "Dr. Sarah Mutisya",
    role: "Emergency Physician",
    company: "Nairobi Hospital",
    content:
      "HealthyConnect helped me find the perfect position that aligned with my career goals. The process was seamless and professional.",
    avatar: "SM",
    rating: 5,
  },
  {
    name: "Michael Wahome",
    role: "Registered Nurse",
    company: "St. Mary's Medical Center",
    content:
      "I was impressed by the quality of opportunities and the personalized support throughout my job search journey.",
    avatar: "MW",
    rating: 5,
  },
  {
    name: "Lisa Nakami",
    role: "Physical Therapist",
    company: "Mathare Hospital",
    content:
      "The platform made it easy to connect with employers who truly value healthcare professionals. Highly recommend!",
    avatar: "LN",
    rating: 5,
  },
];

// Utility Components
const AnimatedCounter = ({ end, duration = 2, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      let startTime;

      let endValue;
      const isPercentage = end.includes("%");
      const isK = end.includes("K");

      if (isK) {
        endValue = parseFloat(end.replace(/[^\d.]/g, "")) * 1000;
      } else if (isPercentage) {
        endValue = parseFloat(end.replace(/[^\d.]/g, ""));
      } else {
        endValue = parseFloat(end.replace(/[^\d.]/g, ""));
      }

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min(
          (timestamp - startTime) / (duration * 1000),
          1
        );
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * endValue));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration, hasStarted]);

  const formatNumber = (num) => {
    if (end.includes("K")) {
      const kValue = num / 1000;
      return kValue >= 10 ? Math.floor(kValue) + "K" : kValue.toFixed(1) + "K";
    }
    if (end.includes("%")) return num + "%";
    return num.toLocaleString();
  };

  const formattedCount = formatNumber(count);
  const hasPlus = end.includes("+");

  return (
    <span ref={ref}>
      {prefix}
      {formattedCount}
      {hasPlus && "+"}
      {suffix}
    </span>
  );
};

const FloatingElement = ({ className, animationProps }) => (
  <motion.div
    className={className}
    animate={{ y: [-20, 20, -20] }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      ...animationProps,
    }}
  />
);

const StatCard = ({ stat, index }) => (
  <motion.div className="text-center" variants={ANIMATION_VARIANTS.fadeInUp}>
    <div className={`text-4xl font-bold ${stat.color} mb-2`}>
      <AnimatedCounter end={stat.number} duration={2.5} />
    </div>
    <div className="text-gray-600">{stat.label}</div>
  </motion.div>
);

const JobCategoryCard = ({ category, index }) => {
  const IconComponent = category.icon;

  return (
    <motion.div
      className="group cursor-pointer"
      variants={ANIMATION_VARIANTS.fadeInUp}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.div
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        variants={ANIMATION_VARIANTS.cardHover}
        whileHover={{
          borderColor: "#3b82f6",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        <motion.div
          className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-6`}
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <IconComponent className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {category.name}
        </h3>
        <p className="text-green-500 mb-4">open positions available</p>

        <motion.div
          className="flex items-center text-blue-600 font-medium"
          whileHover={{ x: 5 }}
        >
          <span>Explore Jobs</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const FeatureCard = ({ feature, index }) => (
  <motion.div
    className="flex items-start space-x-4"
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.2, duration: 0.6 }}
    viewport={{ once: true }}
  >
    <motion.div
      className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0`}
      whileHover={{ rotate: 5, scale: 1.1 }}
    >
      <feature.icon className="w-6 h-6 text-white" />
    </motion.div>
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  </motion.div>
);

const TestimonialCard = ({ testimonial, index }) => (
  <motion.div
    className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
    variants={ANIMATION_VARIANTS.fadeInUp}
    whileHover={{
      y: -5,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      borderColor: "#3b82f6",
    }}
  >
    <div className="flex items-center mb-4">
      {[...Array(testimonial.rating)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 + index * 0.2 }}
        >
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
        </motion.div>
      ))}
    </div>
    <Quote className="w-8 h-8 text-blue-600 mb-4" />
    <p className="text-gray-600 mb-6 leading-relaxed">{testimonial.content}</p>
    <div className="flex items-center space-x-3">
      <motion.div
        className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold"
        whileHover={{ scale: 1.1 }}
      >
        {testimonial.avatar}
      </motion.div>
      <div>
        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
        <p className="text-gray-600 text-sm">{testimonial.role}</p>
        <p className="text-blue-600 text-sm">{testimonial.company}</p>
      </div>
    </div>
  </motion.div>
);

const ActionButton = ({ variant = "primary", children, ...props }) => {
  const baseClasses = "px-8 py-4 rounded-xl font-bold text-lg shadow-lg";
  const variants = {
    primary: "bg-white text-blue-600",
    secondary: "bg-blue-700 border outline-none text-white",
    success: "bg-emerald-500 text-white",
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Section Components
const HeroSection = () => (
  <motion.section
    className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <div
      className="absolute inset-0 opacity-20"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />

    <FloatingElement
      className="absolute top-20 left-20 w-20 h-20 bg-white bg-opacity-10 rounded-full"
      animationProps={{}}
    />
    <FloatingElement
      className="absolute top-40 right-32 w-16 h-16 bg-emerald-400 bg-opacity-20 rounded-full"
      animationProps={{ duration: 3, delay: 1 }}
    />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center justify-center text-center">
      <motion.h1
        className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Your Dream{" "}
        <motion.span
          className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Healthcare Career
        </motion.span>{" "}
        Starts Here
      </motion.h1>

      <motion.p
        className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Connect with top healthcare facilities and discover opportunities that
        match your passion for making a difference in people's lives.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <ActionButton
          variant="primary"
          onClick={() => {
            const element = document.getElementById("explore-opportunities");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          Get Started
        </ActionButton>

        <Link href="/jobs">
          <ActionButton variant="secondary">Browse Jobs</ActionButton>
        </Link>
      </motion.div>
    </div>
  </motion.section>
);

const StatsSection = ({ onClick }) => (
  <motion.section
    className="py-16 bg-gray-50"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={ANIMATION_VARIANTS.staggerContainer}
    onClick={onClick}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS_DATA.map((stat, index) => (
          <StatCard key={index} stat={stat} index={index} />
        ))}
      </div>
    </div>
  </motion.section>
);

const JobCategoriesSection = ({ onClick }) => (
  <motion.section
    id="get-started"
    className="py-20"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={ANIMATION_VARIANTS.staggerContainer}
    onClick={onClick}
  >
    <div
      id="explore-opportunities"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        className="text-center mb-16"
        variants={ANIMATION_VARIANTS.fadeInUp}
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Explore Healthcare
          <span className="text-blue-600"> Opportunities</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover your perfect role across various healthcare specialties and
          make a meaningful impact in patient care.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={ANIMATION_VARIANTS.staggerContainer}
      >
        {JOB_CATEGORIES.map((category, index) => (
          <JobCategoryCard key={index} category={category} index={index} />
        ))}
      </motion.div>
    </div>
  </motion.section>
);

const FeaturesSection = ({ lastJob, isLoading }) => (
  <motion.section
    className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={ANIMATION_VARIANTS.staggerContainer}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div variants={ANIMATION_VARIANTS.fadeInUp}>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Why Choose<span className="text-blue-600"> HealthyConnect?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We're more than just a job board - we're your partner in building a
            fulfilling healthcare career.
          </p>

          <div className="space-y-6">
            {FEATURES_DATA.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </motion.div>

        <motion.div className="relative" variants={ANIMATION_VARIANTS.fadeInUp}>
          <motion.div
            className="bg-white rounded-3xl p-8 shadow-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {isLoading ? "Loading..." : "Latest Job Match"}
                </h3>
                <motion.span
                  className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  98% Match
                </motion.span>
              </div>

              {isLoading ? (
                <div className="space-y-4 animate-pulse">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ) : lastJob ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center"
                      whileHover={{ rotate: 5 }}
                    >
                      <Heart className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-gray-900 line-clamp-1">
                        {lastJob.title || "Healthcare Position"}
                      </h4>
                      <p className="text-gray-600 line-clamp-1">
                        {lastJob.postedBy || "Healthcare Facility"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {lastJob?.location.county || "Nairobi, Kenya"}
                    </span>
                    <span className="text-gray-600 flex items-center">
                      💰 {lastJob.salary || "Negotiable"}
                    </span>
                  </div>
                  <Link href={`/jobs`}>
                    <ActionButton
                      variant="primary"
                      className="w-full py-3 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      View Details
                    </ActionButton>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center"
                      whileHover={{ rotate: 5 }}
                    >
                      <Heart className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-gray-900">
                        Medical Officer - Emergency Department
                      </h4>
                      <p className="text-gray-600">Coptic General Hospital</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">📍 Nairobi, Upperhill</span>
                    <span className="text-gray-600">💰 Ksh 100k+</span>
                  </div>
                  <ActionButton variant="primary" className="w-full py-3">
                    Browse Jobs
                  </ActionButton>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </motion.section>
);

const TestimonialsSection = () => (
  <motion.section
    className="py-20"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={ANIMATION_VARIANTS.staggerContainer}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-16"
        variants={ANIMATION_VARIANTS.fadeInUp}
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          What Healthcare Professionals
          <span className="text-blue-600"> Say About Us</span>
        </h2>
        <p className="text-xl text-gray-600">
          Join thousands of satisfied healthcare professionals who found their
          dream jobs
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={ANIMATION_VARIANTS.staggerContainer}
      >
        {TESTIMONIALS_DATA.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  </motion.section>
);

const CTASection = () => (
  <motion.section
    className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={ANIMATION_VARIANTS.fadeInUp}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.h2
        className="text-4xl font-bold text-white mb-6"
        variants={ANIMATION_VARIANTS.fadeInUp}
      >
        Ready to Find Your Perfect Healthcare Role?
      </motion.h2>
      <motion.p
        className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
        variants={ANIMATION_VARIANTS.fadeInUp}
      >
        Join HealthyConnect today and take the next step in your healthcare
        career journey. Your dream job is just a click away.
      </motion.p>
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        variants={ANIMATION_VARIANTS.fadeInUp}
      >
        <a
          href="https://www.jobseeker.com/app/resumes/start"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ActionButton variant="primary">CV Builder</ActionButton>
        </a>

        <Link href="/jobs">
          <ActionButton variant="success">Search Jobs</ActionButton>
        </Link>
      </motion.div>
    </div>
  </motion.section>
);

export default function Homepage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 1000; // Fetch all jobs to get accurate category counts

  // Fetch all jobs from API
  const { data, isLoading } = useGetJobsQuery({ page, limit });
  const jobs = data?.jobs ?? [];

  const lastJob = jobs[0];

  return (
    <>
      <HeroSection />
      {/* disclaimer div */}
      <Disclaimer />
      <StatsSection />
      <JobCategoriesSection onClick={() => router.push("/categories")} />
      <FeaturesSection lastJob={lastJob} isLoading={isLoading} />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
