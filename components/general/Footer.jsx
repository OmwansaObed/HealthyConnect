import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Heart,
  ArrowRight,
  Instagram,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-tl from-blue-100 to-white border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="text-3xl">
                <span className="font-bold text-blue-600">Healthy</span>
                <span className="font-light text-gray-700">Connect</span>
              </div>
            </div>
            <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
              Connecting healthcare professionals with meaningful career
              opportunities. Find your next role or discover top talent in the
              healthcare industry.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-600" />
                </div>
                <a href="mailto:healthyconnect010@gmail.com">
                  healthyconnect010@gmail.com
                </a>
              </div>
              <a
                href="tel:+254794909991"
                className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-blue-600" />
                </div>
                <span>+254 794 909 991</span>
              </a>

              <div className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <span>Mradi, Embakasi, Nairobi</span>
              </div>
            </div>
          </div>

          {/* Job Seekers */}
          <div>
            <h3 className="text-blue-700 font-bold text-lg mb-6">
              For Job Seekers
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Browse Jobs", href: "/jobs" },
                { name: "Healthcare Careers", href: "/interview-tips" },
                { name: "Salary Guide", href: "/interview-tips" },
                {
                  name: "Resume Builder",
                  href: "https://www.jobseeker.com/app/resumes/start",
                },
                { name: "Interview Tips", href: "/interview-tips" },
                { name: "Career Resources", href: "/interview-tips" },
              ].map(({ name, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Employers */}
          {/* <div>
            <h3 className="text-blue-700 font-bold text-lg mb-6">
              For Employers
            </h3>
            <ul className="space-y-3">
              {[
                "Post a Job",
                "Search Candidates",
                "Pricing Plans",
                "Hiring Solutions",
                "Company Profiles",
                "Recruitment Tips",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div> */}
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 pt-8 border-t border-blue-200">
          {/* Popular Categories */}
          {/* <div>
            <h3 className="text-blue-700 font-bold text-lg mb-6">
              Popular Categories
            </h3>
            <ul className="space-y-3">
              {[
                "Nursing Jobs",
                "Physician Jobs",
                "Allied Health",
                "Healthcare Admin",
                "Mental Health",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Company */}
          <div>
            <h3 className="text-blue-700 font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", link: "/about" },
                { name: "Our Mission", link: "/mission" },
                { name: "Careers", link: "/jobs" },
                { name: "Contact", link: "/contact" },
              ].map(({ name, link }) => (
                <li key={name}>
                  <a
                    href={link}
                    className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-blue-700 font-bold text-lg mb-6">Support</h3>
            <ul className="space-y-3">
              {[
                { name: "Help Center", link: "/help-center" },
                { name: "FAQs", link: "/faqs" },

                { name: "Terms of Service", link: "/terms" },
                { name: "Cookie Policy", link: "/cookies" },
              ].map(({ name, link }) => (
                <li key={name}>
                  <a
                    href={link}
                    className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div>
            <h3 className="text-blue-700 font-bold text-lg mb-6">
              Stay Connected
            </h3>
            <div className="flex space-x-3 mb-6">
              <a
                href="https://instagram.com/gamestar010"
                className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://x.com/CartoonAfi46044"
                className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.facebook.com/gamestar.aficionado/"
                className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
            </div>
            <div className="bg-white rounded-lg p-4 px-5 shadow-sm border border-blue-100">
              <p className="text-gray-600 text-sm mb-3">
                Get the latest healthcare job opportunities delivered to your
                inbox.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm border border-blue-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-r-lg hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-blue-200 text-center">
          <p className="text-gray-600 text-sm">
            © 2024 HealthyConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
