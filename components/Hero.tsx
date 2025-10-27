"use client";
import { motion } from "framer-motion";
import { BookOpen, Globe, Code, Sparkles, Lightbulb, ArrowRight } from "lucide-react";

interface HeroProps {
  title?: string;
  subtitle?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

// Floating icons configuration
const floatingIcons = [
  { Icon: BookOpen, delay: 0.2, x: "10%", y: "20%" },
  { Icon: Globe, delay: 0.3, x: "85%", y: "15%" },
  { Icon: Code, delay: 0.4, x: "75%", y: "75%" },
  { Icon: Sparkles, delay: 0.5, x: "15%", y: "85%" },
  { Icon: Lightbulb, delay: 0.6, x: "90%", y: "45%" },
];

const defaultProps = {
  title: "Transform Your Learning Experience",
  subtitle: "Expert course development, multimedia production, and localization services that deliver measurable results for your organization.",
  primaryCTA: {
    text: "Book a Discovery Call",
    href: "/contact"
  },
  secondaryCTA: {
    text: "Start Scoping Your Project",
    href: "/services"
  }
};

export default function Hero({ 
  title = defaultProps.title,
  subtitle = defaultProps.subtitle,
  primaryCTA = defaultProps.primaryCTA,
  secondaryCTA = defaultProps.secondaryCTA 
}: HeroProps) {
  return (
    <div className="relative isolate min-h-[90vh] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Modern Mesh Gradient Background */}
        <div 
          className="absolute inset-0 bg-[url('/hero-mesh.svg')] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundBlendMode: 'soft-light',
          }}
        />
        
        {/* Noise Texture Overlay */}
        <div 
          className="absolute inset-0 bg-[url('/noise-texture.svg')] opacity-20"
          style={{
            backgroundBlendMode: 'overlay',
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-white/80 via-blue-50/50 to-white dark:from-gray-900/90 dark:via-gray-900/50 dark:to-gray-800/90" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 mask-[linear-gradient(180deg,white,rgba(255,255,255,0))]"
        />

        {/* Gradient Spheres */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -left-[50%] top-0 h-[1000px] w-[1000px] rounded-full bg-gradient-radial from-blue-400 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -right-[50%] bottom-0 h-[1000px] w-[1000px] rounded-full bg-gradient-radial from-purple-400 to-transparent"
        />

        {/* Floating Icons */}
        {floatingIcons.map(({ Icon, delay, x, y }, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{
              delay,
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute"
            style={{ left: x, top: y }}
          >
            <Icon className="h-8 w-8 text-blue-600" />
          </motion.div>
        ))}

      
      </div>

      {/* Main Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl">
              <span className="block">
                Transform Your{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Learning
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="absolute bottom-0 left-0 z-0 h-3 w-full origin-left bg-blue-100 dark:bg-blue-900/20"
                  />
                </span>
              </span>
              <span className="mt-2 block bg-linear-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Experience
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={primaryCTA.href}
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-colors hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              {primaryCTA.text}
            </motion.a>
            <motion.a
              whileHover={{ x: 5 }}
              href={secondaryCTA.href}
              className="group inline-flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white"
            >
              {secondaryCTA.text}
              <motion.span
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full"
          viewBox="0 0 1440 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2 }}
            d="M0,32 C320,72 480,72 720,32 C960,-8 1120,-8 1440,32 L1440,74 L0,74 Z"
            fill="white"
            className="dark:fill-gray-800"
          />
        </svg>
      </div>
    </div>
  );
}