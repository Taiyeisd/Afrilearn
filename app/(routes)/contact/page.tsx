"use client";
import { motion } from "framer-motion";
import { Calendar, Shield, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const languages = [
    "English", "Spanish", "French", "German", "Chinese", "Japanese", "Arabic", "Portuguese"
  ];

  const budgetRanges = [
    "Under $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000+"
  ];

  return (
    <div className="min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"
          style={{
            backgroundImage: 'url("/grid.svg")',
            backgroundSize: '30px 30px',
            maskImage: 'radial-gradient(circle at center, transparent 0%, black 100%)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-1/2 right-0 h-[1000px] w-[1000px] rounded-full bg-linear-to-tr from-blue-50 to-indigo-100 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute -bottom-1/2 left-0 h-[1000px] w-[1000px] rounded-full bg-linear-to-br from-sky-50 to-cyan-100 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Start Your Project
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Let&apos;s discuss your e-learning needs and create a customized solution together
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form className="space-y-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                      Organization
                    </label>
                    <input
                      type="text"
                      id="organization"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <input
                      type="text"
                      id="role"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">Project Details</h2>
                <div>
                  <label htmlFor="goals" className="block text-sm font-medium text-gray-700">
                    Project Goals
                  </label>
                  <textarea
                    id="goals"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Describe your project objectives and desired outcomes..."
                  />
                </div>

                <div>
                  <label htmlFor="audience" className="block text-sm font-medium text-gray-700">
                    Target Audience
                  </label>
                  <textarea
                    id="audience"
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Who is this content for?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Required Languages
                  </label>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {languages.map((language) => (
                      <label key={language} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">{language}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select a range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">
                      Desired Timeline
                    </label>
                    <input
                      type="text"
                      id="timeline"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., 3 months, Q1 2026"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="accessibility" className="block text-sm font-medium text-gray-700">
                    Accessibility Requirements
                  </label>
                  <textarea
                    id="accessibility"
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Any specific accessibility standards or requirements?"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <Send className="h-4 w-4" />
                Submit Request
              </button>
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8 lg:sticky lg:top-8"
          >
            {/* Trust Message */}
            <div className="rounded-2xl bg-blue-50 p-6">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Your Data is Safe</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                We take your privacy seriously. All information shared is encrypted and never shared with third parties.
              </p>
            </div>

            {/* Response Time */}
            <div className="rounded-2xl bg-green-50 p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Quick Response</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Our team typically responds within 24 hours during business days.
              </p>
            </div>

            {/* Calendar Embed */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Book a Call</h3>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Prefer to discuss directly? Schedule a discovery call with our team.
              </p>
              <div className="mt-4 aspect-video bg-gray-100">
                {/* Calendly iframe would go here */}
                <div className="flex h-full items-center justify-center text-gray-500">
                  Calendly Embed
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}