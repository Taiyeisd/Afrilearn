"use client";
import { motion } from "framer-motion";
import { TrendingUp, Accessibility, Clock } from "lucide-react";

const outcomes = [
  {
    metric: "98%",
    label: "Engagement Lift",
    description: "Increase in learner engagement across all courses",
    icon: TrendingUp,
    color: "from-blue-500 to-indigo-600",
    highlight: "98% higher completion rates"
  },
  {
    metric: "100%",
    label: "Accessibility Rate",
    description: "WCAG 2.1 AA compliant content delivery",
    icon: Accessibility,
    color: "from-emerald-500 to-teal-600",
    highlight: "Full compliance achieved"
  },
  {
    metric: "99%",
    label: "On-Time Delivery",
    description: "Projects completed within agreed timelines",
    icon: Clock,
    color: "from-orange-500 to-amber-600",
    highlight: "Consistent delivery"
  }
];

export default function OutcomeSnapshot() {
  return (
    <section className="relative py-24 sm:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white/80" />
        <div className="absolute h-full w-full">
          {/* Animated Gradient Mesh */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-linear-to-r from-blue-400/30 to-emerald-400/30 blur-3xl" />
            <div className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-linear-to-r from-orange-400/30 to-pink-400/30 blur-3xl" />
          </div>
        </div>
      </div>

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
            Delivering Measurable Results
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our data-driven approach ensures consistent, high-quality outcomes across all learning initiatives
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-3"
        >
          {outcomes.map((outcome, index) => (
            <motion.div
              key={outcome.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg ring-1 ring-gray-200/50"
            >
              {/* Decorative Gradient Background */}
              <div className={`absolute right-0 top-0 h-24 w-24 opacity-20 bg-linear-to-br ${outcome.color}`} />
              
              {/* Icon */}
              <div className={`relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${outcome.color}`}>
                <outcome.icon className="h-6 w-6 text-white" />
              </div>

              {/* Metric */}
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                className="mt-6 text-4xl font-bold tracking-tight text-gray-900"
              >
                {outcome.metric}
              </motion.p>

              {/* Label & Description */}
              <div className="mt-1">
                <h3 className="text-lg font-semibold text-gray-900">{outcome.label}</h3>
                <p className="mt-2 text-base text-gray-600">{outcome.description}</p>
                <p className="mt-4 text-sm font-medium text-blue-600">{outcome.highlight}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <a
            href="/case-studies"
            className="text-sm font-semibold leading-6 text-blue-600 hover:text-blue-500"
          >
            View our case studies <span aria-hidden="true">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}