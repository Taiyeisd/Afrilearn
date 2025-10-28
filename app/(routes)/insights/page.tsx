"use client";
import { motion } from "framer-motion";
import { Calendar, Clock, Download, ArrowRight, Globe, Accessibility, Bot } from "lucide-react";
 
// Sample data - in a real app, this would come from an API or CMS
const featuredContent = {
  title: "The Future of AI in Educational Content Creation",
  description: "Comprehensive guide on leveraging AI for creating engaging, personalized learning experiences.",
  coverImage: "/insights/ai-education-cover.jpg",
  downloadLink: "#",
};

const insightCategories = [
  { name: "AI in Education", icon: Bot, count: 12 },
  { name: "Localization Wins", icon: Globe, count: 8 },
  { name: "Accessibility in Learning", icon: Accessibility, count: 15 },
];

const blogPosts = [
  {
    id: 1,
    title: "Transforming Corporate Training with AI-Powered Personalization",
    excerpt: "Discover how artificial intelligence is revolutionizing the way organizations deliver training content...",
    category: "AI in Education",
    author: "Dr. Sarah Chen",
    date: "2025-10-25",
    readTime: "8 min read",
    image: "/insights/blog-1.jpg",
  },
  {
    id: 2,
    title: "Success Story: Localizing Medical Training Across 12 Languages",
    excerpt: "Learn how a leading healthcare provider maintained content accuracy while scaling across multiple regions...",
    category: "Localization Wins",
    author: "Mark Rodriguez",
    date: "2025-10-22",
    readTime: "6 min read",
    image: "/insights/blog-2.jpg",
  },
  {
    id: 3,
    title: "Building WCAG 2.2 Compliant E-Learning Experiences",
    excerpt: "A comprehensive guide to creating accessible learning content that meets the latest standards...",
    category: "Accessibility in Learning",
    author: "Alex Thompson",
    date: "2025-10-20",
    readTime: "10 min read",
    image: "/insights/blog-3.jpg",
  },
  // Add more blog posts as needed
];

export default function InsightsPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
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
            Insights & Resources
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Expert perspectives on e-learning, localization, and accessibility
          </p>
        </motion.div>

        {/* Featured Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 rounded-2xl bg-blue-50 p-8 lg:p-12"
        >
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="aspect-video overflow-hidden rounded-xl bg-gray-200">
              <div className="h-full w-full animate-pulse" />
            </div>
            <div className="mt-8 lg:mt-0">
              <h2 className="text-3xl font-bold text-gray-900">{featuredContent.title}</h2>
              <p className="mt-4 text-lg text-gray-600">{featuredContent.description}</p>
              <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                <Download className="h-4 w-4" />
                Download Free Guide
              </button>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mt-16 grid gap-4 sm:grid-cols-3"
        >
          {insightCategories.map((category) => (
            <motion.div
              key={category.name}
              variants={fadeInUp}
              className="group flex items-center justify-between rounded-xl bg-white/50 p-6 backdrop-blur-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <category.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} articles</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" />
            </motion.div>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={fadeInUp}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white/50 backdrop-blur-sm shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden">
                <div className="h-full w-full bg-gray-200 animate-pulse" />
              </div>
              <div className="flex-1 p-6">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    {post.category}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-blue-600">
                  {post.title}
                </h3>
                <p className="mt-2 text-gray-600 line-clamp-2">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                </div>
              </div>
              <div className="p-6 pt-0">
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-500">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}