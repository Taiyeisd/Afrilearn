"use client";
import { motion } from "framer-motion";
import { 
  BookOpen, Film, Globe, Users, 
  BrainCircuit, Sparkles, ArrowRight
} from "lucide-react";

const services = [
  {
    id: "course-development",
    title: "Course Development",
    icon: BookOpen,
    description: "Custom e-learning courses designed for maximum engagement and retention.",
    features: [
      "Interactive learning paths",
      "Gamification elements",
      "Mobile-first design",
      "Assessment modules"
    ],
    gradient: "from-blue-500 to-cyan-500",
    delay: 0.1
  },
  {
    id: "multimedia-video",
    title: "Multimedia & Video",
    icon: Film,
    description: "Engaging multimedia content that brings learning to life.",
    features: [
      "Professional video production",
      "Animation creation",
      "Interactive simulations",
      "Audio narration"
    ],
    gradient: "from-purple-500 to-pink-500",
    delay: 0.2
  },
  {
    id: "localization",
    title: "Localization & Accessibility",
    icon: Globe,
    description: "Make your content accessible to learners worldwide.",
    features: [
      "Multi-language support",
      "Cultural adaptation",
      "WCAG 2.1 compliance",
      "Screen reader optimization"
    ],
    gradient: "from-emerald-500 to-teal-500",
    delay: 0.3
  },
  {
    id: "sme-collaboration",
    title: "SME Collaboration",
    icon: Users,
    description: "Seamless collaboration with subject matter experts.",
    features: [
      "Expert content review",
      "Knowledge capture",
      "Industry validation",
      "Quality assurance"
    ],
    gradient: "from-orange-500 to-amber-500",
    delay: 0.4
  },
  {
    id: "ai-consulting",
    title: "AI-driven Consulting",
    icon: BrainCircuit,
    description: "Leverage AI to optimize your learning strategy.",
    features: [
      "Learning analytics",
      "Personalization engines",
      "Automated assessments",
      "Adaptive learning paths"
    ],
    gradient: "from-indigo-500 to-blue-500",
    delay: 0.5
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function ServicesPage() {
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

        {/* Hero Content */}
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
            >
              Comprehensive{" "}
              <span className="bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Learning Services
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
            >
              From course development to AI-driven solutions, we offer end-to-end services
              to transform your learning programs.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: service.delay }}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200/50 transition-all hover:shadow-xl dark:bg-gray-800 dark:ring-gray-800"
            >
              {/* Background Gradient */}
              <div className="absolute -right-20 -top-20 h-40 w-40 rotate-12 transform opacity-0 transition-opacity duration-300 group-hover:opacity-10">
                <div className={`h-full w-full bg-linear-to-br ${service.gradient}`} />
              </div>

              {/* Icon */}
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br ${service.gradient}`}>
                <service.icon className="h-6 w-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
                {service.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {service.description}
              </p>

              {/* Features */}
              <ul className="mt-8 space-y-3">
                {service.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: service.delay + (index * 0.1) }}
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-300"
                  >
                    <Sparkles className="h-5 w-5 text-blue-600" />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <motion.div 
                className="mt-8"
                whileHover={{ x: 4 }}
              >
                <a
                  href={`/services/${service.id}`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact CTA Section */}
      <div className="relative isolate bg-linear-to-b from-gray-50 to-white py-16 dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Ready to Transform Your Learning Programs?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Book a consultation to discuss your specific needs and discover how we can help.
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
                Book a Consultation
              </a>
              <a
                href="/process"
                className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                View Our Process
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}