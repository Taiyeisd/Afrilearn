"use client";
import { motion } from "framer-motion";
import { BadgeCheck, Rocket, PenTool, Layout, Eye, Award, Globe, Zap } from "lucide-react";

export default function ProcessPage() {
  const processSteps = [
    { icon: PenTool, title: "Brief", description: "Initial consultation and project scoping" },
    { icon: Layout, title: "Design", description: "Learning architecture and UX planning" },
    { icon: PenTool, title: "Storyboard", description: "Content mapping and visual layout" },
    { icon: Eye, title: "Alpha", description: "First draft development and review" },
    { icon: BadgeCheck, title: "Beta", description: "Refinement and stakeholder feedback" },
    { icon: Award, title: "Gold", description: "Final polishing and quality assurance" },
    { icon: Globe, title: "Localize", description: "Multi-language adaptation" },
    { icon: Rocket, title: "Launch", description: "Deployment and monitoring" },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mx-auto max-w-2xl text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Our Process
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            A proven 8-step methodology delivering excellence in e-learning solutions
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={fadeInUp}
              className="relative flex flex-col items-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-sm ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mb-4 rounded-full bg-blue-100 p-3">
                <step.icon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-center text-sm text-gray-500">{step.description}</p>
              <div className="absolute -left-4 top-1/2 h-0.5 w-8 bg-blue-200 hidden lg:block">
                {index > 0 && <div className="absolute -left-2 -top-1 h-2 w-2 rounded-full bg-blue-400" />}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Expedited Timeline Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-20 mx-auto max-w-3xl rounded-2xl bg-blue-50 p-8 text-center"
        >
          <div className="flex justify-center">
            <Zap className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Need it faster?</h2>
          <p className="mt-2 text-gray-600">
            We offer expedited timelines for urgent projects without compromising quality.
          </p>
          <button className="mt-6 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            Discuss Your Timeline
          </button>
        </motion.div>
      </div>
    </div>
  );
}