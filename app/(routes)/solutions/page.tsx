"use client";
import { motion } from "framer-motion";
import { 
  BookOpen, Users, Building2, GraduationCap,
  CheckCircle, ArrowRight
} from "lucide-react";

const personas = [
  {
    id: "lms-admins",
    title: "LMS Administrators",
    icon: BookOpen,
    description: "Streamline content integration and ensure seamless learning experiences across your platforms.",
    problems: [
      "Complex SCORM implementation",
      "Inconsistent content quality",
      "Integration challenges",
      "Limited tracking capabilities",
      "Accessibility compliance"
    ],
    benefits: [
      "Guaranteed SCORM compliance",
      "Seamless LMS integration",
      "Real-time progress tracking",
      "Built-in accessibility"
    ]
  },
  {
    id: "corporate",
    title: "Corporate Organizations",
    icon: Building2,
    description: "Transform your workforce training with customized, engaging, and measurable learning solutions.",
    problems: [
      "Low engagement rates",
      "Inconsistent training quality",
      "Global deployment challenges",
      "Limited ROI visibility",
      "Outdated content"
    ],
    benefits: [
      "Increased completion rates",
      "Measurable ROI metrics",
      "Global content delivery",
      "Interactive assessments"
    ]
  },
  {
    id: "educational",
    title: "Educational Organizations",
    icon: GraduationCap,
    description: "Modernize your curriculum with accessible, engaging, and technologically advanced learning materials.",
    problems: [
      "Digital transformation needs",
      "Accessibility requirements",
      "Student engagement",
      "Content scalability",
      "Technology integration"
    ],
    benefits: [
      "Modern learning experiences",
      "WCAG 2.1 AA compliance",
      "Improved student outcomes",
      "Scalable solutions"
    ]
  },
  {
    id: "training",
    title: "Training Institutions",
    icon: Users,
    description: "Deliver professional training programs with efficiency, consistency, and measurable results.",
    problems: [
      "Content production delays",
      "Quality inconsistency",
      "Limited resources",
      "Certification tracking",
      "SME collaboration"
    ],
    benefits: [
      "Rapid content production",
      "Consistent quality",
      "Expert collaboration",
      "Certification management"
    ]
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function SolutionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-linear-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('/hero-mesh.svg')] bg-cover bg-center bg-no-repeat opacity-30" />
          <div className="absolute inset-0 bg-[url('/noise-texture.svg')] opacity-10" />
          <div className="absolute inset-0 bg-linear-to-b from-white/80 via-blue-50/50 to-white dark:from-gray-900/90 dark:via-gray-900/50 dark:to-gray-800/90" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mx-auto max-w-2xl lg:text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
            >
              Tailored Solutions for{" "}
              <span className="bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Every Learning Need
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
            >
              Choose your path to transformative learning experiences with our specialized solutions designed for your unique challenges.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Personas Grid */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
            >
              {/* Decorative Background */}
              <div className="absolute right-0 top-0 h-24 w-24 opacity-10">
                <div className="absolute h-full w-full bg-linear-to-br from-blue-600 to-cyan-600" />
              </div>

              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-cyan-600">
                  <persona.icon className="h-6 w-6 text-white" />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                  {persona.title}
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {persona.description}
                </p>

                {/* Problems We Solve */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Problems We Solve
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {persona.problems.map((problem, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
                      >
                        <CheckCircle className="h-5 w-5 text-blue-600" />
                        {problem}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Key Benefits
                  </h3>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {persona.benefits.map((benefit, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800"
                      >
                        <p className="text-sm text-gray-900 dark:text-white">{benefit}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-8"
                >
                  <a
                    href={`/solutions/${persona.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500"
                  >
                    Request Proposal
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative isolate bg-linear-to-b from-blue-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Ready to Transform Your Learning Experience?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Let&apos;s discuss how we can help you achieve your learning objectives.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex justify-center gap-4"
            >
              <a
                href="/contact"
                className="rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
              >
                Schedule a Consultation
              </a>
              <a
                href="/case-studies"
                className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                View Case Studies
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}