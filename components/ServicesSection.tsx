import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Book, Video, Globe } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
}

const ServiceCard = ({ title, description, icon, color }: ServiceCardProps) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg"
  >
    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-opacity-10" style={{ backgroundColor: color }} />
    <div className={`relative mb-6 inline-block rounded-xl p-3`} style={{ backgroundColor: `${color}20` }}>
      <div className="h-6 w-6" style={{ color: color }}>
        {icon}
      </div>
    </div>
    <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const ServicesSection = () => {
  const services = [
    {
      title: 'Course Development',
      description: 'Custom learning experiences designed for engagement and retention, with mobile-first approach.',
      icon: <Book className="h-full w-full" />,
      color: '#4F46E5'
    },
    {
      title: 'Multimedia Production',
      description: 'High-quality video content and interactive elements that enhance learning outcomes.',
      icon: <Video className="h-full w-full" />,
      color: '#EA580C'
    },
    {
      title: 'Content Localization',
      description: 'Professional translation and cultural adaptation services for global reach.',
      icon: <Globe className="h-full w-full" />,
      color: '#059669'
    }
  ];

  return (
    <section className="relative overflow-hidden py-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-white via-blue-50/50 to-white" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What We Do
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Transform your learning content with our comprehensive suite of services,
            designed to engage, educate, and inspire learners worldwide.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/services"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-gray-700"
          >
            View All Services
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;