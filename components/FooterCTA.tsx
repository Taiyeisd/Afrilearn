"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FooterCTA() {
  return (
    <section className="relative isolate">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/30 via-indigo-500/30 to-purple-500/30 opacity-10" />
        <div className="absolute left-0 top-0 -z-10 h-96 w-96 -translate-x-1/2 bg-linear-to-r from-blue-500/50 to-indigo-500/50 opacity-20 blur-3xl" />
        <div className="absolute right-0 bottom-0 -z-10 h-96 w-96 translate-x-1/2 bg-linear-to-r from-indigo-500/50 to-purple-500/50 opacity-20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Book a discovery call today and let's discuss how we can help you achieve your learning objectives.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="rounded-full bg-blue-600 px-8 py-3.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Schedule Discovery Call
            </motion.a>
            <motion.a
              whileHover={{ x: 4 }}
              href="/process"
              className="flex items-center gap-2 text-sm font-semibold text-gray-900"
            >
              Learn about our process
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex items-center justify-center gap-8"
          >
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-green-100 p-1">
                <div className="h-2 w-2 rounded-full bg-green-600" />
              </div>
              <span className="text-sm text-gray-600">Available 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-blue-100 p-1">
                <div className="h-2 w-2 rounded-full bg-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Response within 24h</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}