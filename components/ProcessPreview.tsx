"use client";
import { motion } from "framer-motion";
import { 
  FileText, Palette, Layout, Code, 
  TestTube, Award, Globe, Rocket
} from "lucide-react";

const processSteps = [
  { icon: FileText, label: "Brief", description: "Requirements gathering" },
  { icon: Palette, label: "Design", description: "Learning experience design" },
  { icon: Layout, label: "Storyboard", description: "Content structuring" },
  { icon: Code, label: "Alpha", description: "Initial development" },
  { icon: TestTube, label: "Beta", description: "Testing & feedback" },
  { icon: Award, label: "Gold", description: "Final polishing" },
  { icon: Globe, label: "Localize", description: "Multi-language support" },
  { icon: Rocket, label: "Launch", description: "Deployment & tracking" },
];

export default function ProcessPreview() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our 8-Step Delivery Process
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            A proven methodology that ensures consistent quality and timely delivery
          </p>
        </motion.div>

        <div className="relative mt-16">
          {/* Connection Line */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-gradient-to-r from-blue-600/0 via-blue-600/50 to-blue-600/0" />

          {/* Process Steps */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-8"
          >
            {processSteps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col items-center"
              >
                {/* Step Number */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
                  <step.icon className="h-6 w-6" />
                </div>
                
                {/* Step Label */}
                <h3 className="text-sm font-semibold text-gray-900">{step.label}</h3>
                <p className="mt-1 text-xs text-gray-600">{step.description}</p>

                {/* Hover Card with More Info */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="absolute -bottom-24 left-1/2 z-10 hidden -translate-x-1/2 transform rounded-lg bg-white p-4 shadow-xl ring-1 ring-gray-900/5 sm:group-hover:block"
                >
                  <p className="text-sm text-gray-600">
                    Step {index + 1}: {step.label}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Expedited Timeline Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mx-auto mt-16 max-w-xl text-center"
        >
          <div className="rounded-full bg-blue-50 px-6 py-3">
            <p className="text-sm font-medium text-blue-600">
              Need it faster? Ask about our expedited timeline options →
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}