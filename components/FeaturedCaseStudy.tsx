"use client";
import { motion } from "framer-motion";
import { ArrowRight, Users, Globe, ChartLine } from "lucide-react";

export default function FeaturedCaseStudy() {
  return (
    <section className="relative py-24 sm:py-32 bg-linear-to-b from-white to-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Transforming Global Learning at{" "}
              <span className="text-blue-600">Soteria Learning</span>
            </h2>
            
            <blockquote className="mt-6">
              <p className="text-xl font-medium italic text-gray-900">
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis at amet ab accusamus odio molestiae quidem. Doloremque iusto velit veniam!"
              </p>
              <footer className="mt-4">
                <p className="text-base font-semibold text-gray-900">Taiye Aransiola</p>
                <p className="text-sm text-gray-600">Co-Founder, Soteria EdTech</p>
              </footer>
            </blockquote>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm ring-1 ring-gray-900/5">
                <dt className="text-sm font-medium text-gray-600">Engagement</dt>
                <dd className="mt-1">
                  <span className="text-3xl font-semibold tracking-tight text-blue-600">+127%</span>
                  <span className="ml-2 text-sm text-gray-600">increase</span>
                </dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm ring-1 ring-gray-900/5">
                <dt className="text-sm font-medium text-gray-600">Languages</dt>
                <dd className="mt-1">
                  <span className="text-3xl font-semibold tracking-tight text-emerald-600">12</span>
                  <span className="ml-2 text-sm text-gray-600">supported</span>
                </dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm ring-1 ring-gray-900/5">
                <dt className="text-sm font-medium text-gray-600">Time Saved</dt>
                <dd className="mt-1">
                  <span className="text-3xl font-semibold tracking-tight text-orange-600">68%</span>
                  <span className="ml-2 text-sm text-gray-600">reduction</span>
                </dd>
              </div>
            </div>

            <motion.div 
              className="mt-10"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <a
                href="/case-studies/techcorp"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500"
              >
                Read the full case study
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:mt-0"
          >
            <div className="relative overflow-hidden rounded-2xl bg-blue-600 shadow-xl lg:h-full">
              <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-indigo-600 opacity-90" />
              
              {/* Achievement Cards */}
              <div className="relative grid grid-cols-1 gap-6 p-8 sm:grid-cols-2">
                <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                  <ChartLine className="h-8 w-8 text-blue-200" /> 
                  <h3 className="mt-4 text-lg font-semibold text-white">Increased Completion</h3>
                  <p className="mt-2 text-sm text-blue-100">
                    Course completion rates improved across all regions
                  </p>
                </div>
                <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                  <Users className="h-8 w-8 text-blue-200" />
                  <h3 className="mt-4 text-lg font-semibold text-white">Better Engagement</h3>
                  <p className="mt-2 text-sm text-blue-100">
                    Higher participation in course discussions
                  </p>
                </div>
                <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                  <Globe className="h-8 w-8 text-blue-200" />
                  <h3 className="mt-4 text-lg font-semibold text-white">Global Reach</h3>
                  <p className="mt-2 text-sm text-blue-100">
                    Seamless delivery across 12 languages
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}