"use client";
import { motion } from "framer-motion";
import { Filter, ArrowRight, Laptop, Globe } from "lucide-react";

// Sample data - in a real app, this would come from an API or CMS
const caseStudies = [
  {
    id: 1,
    title: "Global Corporate Training Transformation",
    summary: "How we helped a Fortune 500 company digitize their entire training program",
    thumbnail: "/case-studies/corporate-training.jpg",
    industry: "Corporate",
    language: ["English", "Spanish", "French"],
    serviceType: "E-Learning Development",
    metrics: {
      engagement: "+45%",
      accessibility: "98%",
      delivery: "2 weeks ahead",
    },
  },
  {
    id: 2,
    title: "Multilingual Education Platform",
    summary: "Scaling educational content across 12 languages while maintaining quality",
    thumbnail: "/case-studies/education-platform.jpg",
    industry: "Education",
    language: ["Multiple"],
    serviceType: "Content Localization",
    metrics: {
      engagement: "+60%",
      accessibility: "100%",
      delivery: "On time",
    },
  },
  {
    id: 3,
    title: "Interactive Medical Training",
    summary: "Creating engaging medical procedures training with advanced simulations",
    thumbnail: "/case-studies/medical-training.jpg",
    industry: "Healthcare",
    language: ["English"],
    serviceType: "Multimedia & Video",
    metrics: {
      engagement: "+75%",
      accessibility: "97%",
      delivery: "3 days early",
    },
  },
  // Add more case studies as needed
];

const industries = ["All", "Corporate", "Education", "Healthcare", "Technology"];
const serviceTypes = ["All", "E-Learning Development", "Content Localization", "Multimedia & Video", "SME Collaboration"];

export default function CaseStudiesPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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
            Case Studies
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Discover how we&apos;ve helped organizations transform their learning experiences
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-wrap gap-4 justify-center"
        >
          <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm ring-1 ring-gray-900/5">
            <Filter className="h-4 w-4 text-gray-500" />
            <select className="bg-transparent border-none text-sm focus:ring-0">
              <option value="">All Industries</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm ring-1 ring-gray-900/5">
            <Filter className="h-4 w-4 text-gray-500" />
            <select className="bg-transparent border-none text-sm focus:ring-0">
              <option value="">All Services</option>
              {serviceTypes.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              variants={fadeInUp}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden">
                <div className="h-full w-full bg-gray-200 animate-pulse" />
              </div>
              <div className="flex-1 p-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Laptop className="h-4 w-4" />
                    {study.industry}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    {Array.isArray(study.language) ? study.language.join(", ") : study.language}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{study.title}</h3>
                <p className="mt-2 text-gray-600">{study.summary}</p>
                
                {/* Metrics */}
                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                  <div>
                    <p className="text-sm text-gray-500">Engagement</p>
                    <p className="font-semibold text-blue-600">{study.metrics.engagement}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Accessibility</p>
                    <p className="font-semibold text-blue-600">{study.metrics.accessibility}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Delivery</p>
                    <p className="font-semibold text-blue-600">{study.metrics.delivery}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-500">
                  Read Case Study
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}