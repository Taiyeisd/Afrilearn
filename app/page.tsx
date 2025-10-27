"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ServicesSection from "@/components/ServicesSection";
import OutcomeSnapshot from "@/components/OutcomeSnapshot";
import FeaturedCaseStudy from "@/components/FeaturedCaseStudy";
import ProcessPreview from "@/components/ProcessPreview";
import SocialProof from "@/components/SocialProof";
import FooterCTA from "@/components/FooterCTA";

// Fix hydration issues by using constant values
const fadeIn = {
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

const trustLogos = [
  { src: "/logos/placeholder1.svg", alt: "Company 1" },
  { src: "/logos/placeholder2.svg", alt: "Company 2" },
  { src: "/logos/placeholder3.svg", alt: "Company 3" },
  { src: "/logos/placeholder4.svg", alt: "Company 4" },
];
 

const dotPositions = [
  { x: 15, y: 25 }, { x: 85, y: 15 }, { x: 45, y: 75 },
  { x: 25, y: 85 }, { x: 75, y: 45 }, { x: 35, y: 65 },
  { x: 65, y: 35 }, { x: 90, y: 75 }, { x: 10, y: 45 },
  { x: 50, y: 95 }, { x: 40, y: 15 }, { x: 80, y: 85 },
  { x: 20, y: 55 }, { x: 60, y: 25 }, { x: 30, y: 75 },
  { x: 70, y: 45 }, { x: 85, y: 65 }, { x: 15, y: 35 },
  { x: 55, y: 85 }, { x: 95, y: 25 }
];

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Grid Pattern SVG Background */}
          <div className="absolute inset-0 bg-grid-pattern mask-[radial-gradient(ellipse_at_center,transparent_20%,black)]" 
               style={{
                 backgroundImage: 'url("/patterns/hero-pattern.svg")',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
               }}
          />
          
          {/* Animated Gradient Blobs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute -top-1/2 right-0 h-[1000px] w-[1000px] rounded-full bg-linear-to-tr from-blue-50 to-indigo-100 blur-3xl dark:from-blue-900/30 dark:to-indigo-900/30"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute -bottom-1/2 left-0 h-[1000px] w-[1000px] rounded-full bg-linear-to-br from-sky-50 to-cyan-100 blur-3xl dark:from-sky-900/30 dark:to-cyan-900/30"
          />
          
          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            {/* Floating Dots */}
            {dotPositions.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-blue-500/20"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
            
            {/* Abstract Lines */}
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M0,100 Q400,150 800,100 T1600,100"
                stroke="url(#line-gradient)"
                strokeWidth="0.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.2 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="line-gradient" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#34D399" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>

        {/* Main Hero Content */}
        <Hero />

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <TrustBar logos={trustLogos} />
        </motion.div>

        {/* Services Section */}
        <ServicesSection />

        {/* Outcome Snapshot Section */}
        <OutcomeSnapshot />

        {/* Featured Case Study */}
        <FeaturedCaseStudy />

        {/* Process Preview */}
        <ProcessPreview />

        {/* Social Proof */}
        <SocialProof />

        {/* Footer CTA */}
        <FooterCTA />
      </div>
    </main>
  );
}
