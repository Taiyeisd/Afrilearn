"use client";
import { motion } from "framer-motion";
import { Star, Check, Shield } from "lucide-react";

const testimonials = [
  {
    content: "The team's attention to detail and commitment to accessibility made our course materials truly inclusive.",
    author: "Michael Rodriguez",
    role: "Director of Training",
    company: "Global Tech Solutions",
  },
  {
    content: "Outstanding localization quality. Our international teams finally have equal access to training resources.",
    author: "Emma Chen",
    role: "L&D Manager",
    company: "innovate.io",
  },
  {
    content: "The multimedia elements and interactive components have transformed our boring compliance training.",
    author: "David Smith",
    role: "Compliance Officer",
    company: "SecureBank",
  },
];

const badges = [
  { icon: Shield, label: "ISO 27001 Certified" },
  { icon: Check, label: "WCAG 2.1 AA Compliant" },
  { icon: Star, label: "Quality Assured" },
];

export default function SocialProof() {
  return (
    <section className="relative py-24 sm:py-32 bg-linear-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            See what our clients say about their experience working with us
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-16 grid max-w-xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200"
            >
              <div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  {testimonial.content}
                </p>
              </div>
              <div className="mt-8 border-t border-gray-100 pt-6">
                <p className="text-base font-semibold text-gray-900">
                  {testimonial.author}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {testimonial.role} · {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Compliance Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-lg grid-cols-1 items-center gap-8 sm:grid-cols-3">
              {badges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center justify-center gap-3 rounded-xl bg-gray-50 px-6 py-4"
                >
                  <badge.icon className="h-6 w-6 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">
                    {badge.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}