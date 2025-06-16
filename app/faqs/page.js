"use client";
import {
  ChevronDown,
  ChevronUp,
  Search,
  User,
  Briefcase,
  Building,
  CreditCard,
  Shield,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

// Import animation variants
import {
  staggerContainer,
  textVariant,
  fadeIn,
  slideIn,
  motion,
} from "../../utils/motion";

// Wrapping motion components
const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;
const MotionButton = motion.button;

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openFAQ, setOpenFAQ] = useState(null);

  const categories = [
    { id: "all", name: "All Questions", icon: MessageCircle },
    { id: "account", name: "Account & Profile", icon: User },
    { id: "job-search", name: "Job Search", icon: Briefcase },
    { id: "facilities", name: "For Facilities", icon: Building },
    { id: "payments", name: "Payments & Billing", icon: CreditCard },
    { id: "privacy", name: "Privacy & Security", icon: Shield },
  ];

  const faqData = [
    // Account & Profile
    {
      id: 1,
      category: "account",
      question: "How do I create a HealthyConnect account?",
      answer:
        "To create an account, click the 'Sign Up' button on our homepage. You'll need to provide your email, create a password, and verify your email address. For healthcare professionals, you'll also need to upload your professional credentials for verification.",
    },
    {
      id: 2,
      category: "account",
      question: "How do I update my profile information?",
      answer:
        "Go to your dashboard and click on 'Profile Settings'. You can update your personal information, professional credentials, work experience, and preferences. Remember to save your changes before leaving the page.",
    },
    {
      id: 3,
      category: "account",
      question: "What if I forget my password?",
      answer:
        "Click on 'Forgot Password' on the login page. Enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password.",
    },
    {
      id: 4,
      category: "account",
      question: "How do I verify my professional credentials?",
      answer:
        "Upload clear photos or scans of your professional licenses, certificates, and relevant qualifications in the 'Credentials' section of your profile. Our verification team reviews documents within 2-3 business days.",
    },

    // Job Search
    {
      id: 5,
      category: "job-search",
      question: "How do I search for jobs on HealthyConnect?",
      answer:
        "Use the search bar on the jobs page to find opportunities by keyword, location, or job type. You can filter results by specialty, experience level, salary range, and work schedule to find positions that match your preferences.",
    },
    {
      id: 6,
      category: "job-search",
      question: "What types of healthcare jobs are available?",
      answer:
        "We offer opportunities across all healthcare sectors including nursing, medical officers, clinical officers, caregivers, pharmacy, laboratory, radiology, and many specialized fields. Both permanent and locum positions are available.",
    },
    {
      id: 7,
      category: "job-search",
      question: "How do I apply for a job?",
      answer:
        "Click on a job listing to view full details, then click 'Apply Now'. You'll need to submit your application with your updated profile information. Some employers may request additional documents or a cover letter.",
    },
    {
      id: 8,
      category: "job-search",
      question: "Can I save jobs to apply later?",
      answer:
        "Yes! Click the heart icon on any job listing to save it to your 'Saved Jobs' list. You can access saved jobs from your dashboard at any time.",
    },
    {
      id: 9,
      category: "job-search",
      question: "How do I track my job applications?",
      answer:
        "Go to your dashboard and click on 'My Applications' to see all jobs you've applied for, their status (pending, reviewed, shortlisted, etc.), and any messages from employers.",
    },

    // For Facilities
    {
      id: 10,
      category: "facilities",
      question: "How can my healthcare facility post job openings?",
      answer:
        "Create a facility account and complete your organization's verification process. Once verified, you can post unlimited job openings, manage applications, and communicate directly with candidates through our platform.",
    },
    {
      id: 11,
      category: "facilities",
      question: "What information should I include in a job posting?",
      answer:
        "Include detailed job descriptions, required qualifications, experience level, salary range, work schedule, location, and any special requirements. The more detailed your posting, the better quality candidates you'll attract.",
    },
    {
      id: 12,
      category: "facilities",
      question: "How do I manage applications from candidates?",
      answer:
        "Access your facility dashboard to view all applications for your job postings. You can filter candidates, review profiles, schedule interviews, and communicate directly through our messaging system.",
    },
    {
      id: 13,
      category: "facilities",
      question: "Is there a limit to how many jobs I can post?",
      answer:
        "No, verified healthcare facilities can post unlimited job openings. However, we recommend keeping job postings current and removing filled positions to maintain an accurate listing.",
    },

    // Payments & Billing
    {
      id: 14,
      category: "payments",
      question: "Is HealthyConnect free to use?",
      answer:
        "Yes, creating an account and searching for jobs is completely free for healthcare professionals. Some premium features like profile boosting may have associated costs, which will be clearly communicated.",
    },
    {
      id: 15,
      category: "payments",
      question: "Are there fees for healthcare facilities?",
      answer:
        "Basic job posting is free for verified healthcare facilities. We may offer premium services like featured job listings or advanced recruitment tools for a fee, but basic functionality remains free.",
    },
    {
      id: 16,
      category: "payments",
      question: "How do I handle payments for locum work?",
      answer:
        "HealthyConnect facilitates connections between healthcare professionals and facilities. Payment arrangements are made directly between you and the hiring facility. We recommend discussing payment terms before accepting any position.",
    },

    // Privacy & Security
    {
      id: 17,
      category: "privacy",
      question: "How is my personal information protected?",
      answer:
        "We use industry-standard encryption and security measures to protect your data. Your personal information is never shared without your consent, and you control what information is visible to potential employers.",
    },
    {
      id: 18,
      category: "privacy",
      question: "Who can see my profile information?",
      answer:
        "Only verified healthcare facilities can view your professional profile when you apply for their positions. You can adjust your privacy settings to control what information is publicly visible.",
    },
    {
      id: 19,
      category: "privacy",
      question: "Can I delete my account?",
      answer:
        "Yes, you can delete your account at any time from your account settings. This will permanently remove your profile and all associated data from our platform.",
    },
    {
      id: 20,
      category: "privacy",
      question: "How do you verify healthcare facilities?",
      answer:
        "We verify all healthcare facilities by checking their business registration, licenses, and legitimacy. Only verified facilities can post jobs and contact candidates, ensuring a safe environment for job seekers.",
    },
  ];

  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (faqId) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <MotionSection
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer(0.2, 0.5)}
        className="bg-blue-600 py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MotionH1
            variants={textVariant(0.5)}
            className="text-5xl font-bold text-white mb-6"
          >
            Frequently Asked <span className="text-yellow-400">Questions</span>
          </MotionH1>
          <MotionP
            variants={textVariant(0.7)}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
          >
            Find quick answers to common questions about using HealthyConnect
          </MotionP>

          {/* Search Bar */}
          <MotionDiv variants={fadeIn("up", "tween", 1, 1)}>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search FAQ..."
                className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-0 shadow-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </MotionDiv>
        </div>
      </MotionSection>

      {/* Categories */}
      <MotionSection
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer(0.1, 0.3)}
        className="py-12 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <MotionButton
                key={category.id}
                variants={fadeIn("up", "spring", 0.2 * (index + 1), 1)}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-lg transform scale-105"
                    : "bg-white text-gray-700 hover:bg-blue-50 shadow-sm hover:shadow-md"
                }`}
              >
                <category.icon className="w-5 h-5 mr-2" />
                {category.name}
              </MotionButton>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* FAQ Items */}
      <MotionSection
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={staggerContainer(0.1, 0.3)}
        className="py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <MotionDiv variants={fadeIn("up", "tween", 0.4, 1)}>
            <div className="space-y-4">
              {filteredFAQs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No FAQs found matching your search.
                  </p>
                </div>
              ) : (
                filteredFAQs.map((faq, index) => (
                  <MotionDiv
                    key={faq.id}
                    variants={fadeIn("up", "spring", 0.1 * (index + 1), 1)}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      {openFAQ === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>

                    {openFAQ === faq.id && (
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </MotionDiv>
                ))
              )}
            </div>
          </MotionDiv>
        </div>
      </MotionSection>
    </div>
  );
};

export default FAQ;
