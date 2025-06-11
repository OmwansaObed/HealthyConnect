"use client";
import { useState } from "react";

const CookiePolicy = () => {
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  const cookieTypes = [
    {
      type: "Necessary Cookies",
      description:
        "These cookies are essential for the website to function properly. They enable basic functions like page navigation and access to secure areas.",
      examples: ["Authentication", "Security", "Session management"],
      required: true,
      color: "bg-red-500",
    },
    {
      type: "Analytics Cookies",
      description:
        "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
      examples: ["Google Analytics", "Page views", "User behavior"],
      required: false,
      color: "bg-blue-500",
    },
    {
      type: "Marketing Cookies",
      description:
        "These cookies are used to track visitors across websites to display relevant advertisements and measure campaign effectiveness.",
      examples: ["Ad targeting", "Conversion tracking", "Social media"],
      required: false,
      color: "bg-purple-500",
    },
    {
      type: "Functional Cookies",
      description:
        "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.",
      examples: [
        "Language preferences",
        "UI customization",
        "Feature settings",
      ],
      required: false,
      color: "bg-emerald-500",
    },
  ];

  const handlePreferenceChange = (type, value) => {
    setPreferences((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Cookie <span className="text-yellow-400">Policy</span>
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            Learn about how we use cookies to improve your experience on
            HealthyConnect
          </p>
          <div className="mt-8 text-orange-200">
            <p>Last updated: January 15, 2025</p>
          </div>
        </div>
      </section>

      {/* What are Cookies */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-50 border-l-4 border-orange-500 p-8 rounded-r-xl mb-12">
            <div className="flex items-start">
              <Cookie className="w-8 h-8 text-orange-500 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-orange-900 mb-4">
                  What are Cookies?
                </h2>
                <p className="text-orange-800 leading-relaxed">
                  Cookies are small text files that are stored on your device
                  when you visit our website. They help us provide you with a
                  better experience by remembering your preferences, analyzing
                  how you use our site, and personalizing content for you.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {cookieTypes.map((cookieType, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 ${cookieType.color} rounded-full mr-4`}
                    ></div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {cookieType.type}
                    </h3>
                  </div>
                  <div className="flex items-center">
                    {cookieType.required ? (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                        Required
                      </span>
                    ) : (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={
                            preferences[
                              cookieType.type.toLowerCase().split(" ")[0]
                            ]
                          }
                          onChange={(e) =>
                            handlePreferenceChange(
                              cookieType.type.toLowerCase().split(" ")[0],
                              e.target.checked
                            )
                          }
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-4">
                  {cookieType.description}
                </p>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Examples:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cookieType.examples.map((example, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cookie Management */}
          <div className="mt-12 bg-gray-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Managing Your Cookie Preferences
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                You can control and manage cookies in various ways. Please note
                that removing or blocking cookies may impact your user
                experience and parts of our website may no longer be fully
                accessible.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Browser Settings
                  </h3>
                  <p className="text-sm text-gray-600">
                    Most browsers allow you to refuse or delete cookies. Methods
                    for doing so vary from browser to browser. Please visit your
                    browser&apos;s help menu for instructions.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Third-Party Tools
                  </h3>
                  <p className="text-sm text-gray-600">
                    You can opt out of third-party cookies by visiting the
                    Digital Advertising Alliance&apos;s opt-out page or similar
                    industry opt-out mechanisms.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 font-medium transition-all">
                Save Preferences
              </button>
              <button className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 font-medium transition-all">
                Accept All
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Questions About Our Cookie Policy?
            </h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about our use of cookies, please contact
              us:
            </p>
            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Email:</strong> privacy@healthyconnect.co.ke
              </p>
              <p>
                <strong>Phone:</strong> +254 700 123 456
              </p>
              <p>
                <strong>Address:</strong> ABC Place, Upper Hill, Nairobi, Kenya
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicy;
