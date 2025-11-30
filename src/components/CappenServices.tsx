import { motion, AnimatePresence } from "framer-motion";
import { InteractiveText } from "./InteractiveText";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const services = [
  {
    title: "BRAND STRATEGY",
    description: "We craft distinctive brand identities that resonate with your audience. Our strategic approach includes brand positioning, messaging frameworks, and comprehensive guidelines."
  },
  {
    title: "DIGITAL PRODUCTS",
    description: "End-to-end product design and development. From concept to launch, we build scalable digital solutions that deliver exceptional user experiences."
  },
  {
    title: "USER EXPERIENCE",
    description: "Research-driven UX design that prioritizes user needs. We create intuitive interfaces through wireframing, prototyping, and rigorous user testing."
  },
  {
    title: "CREATIVE DIRECTION",
    description: "Visionary creative leadership for your projects. We define aesthetic direction, oversee execution, and ensure consistency across all touchpoints."
  },
  {
    title: "DEVELOPMENT",
    description: "High-performance web and mobile development. We build with cutting-edge technologies, ensuring speed, security, and seamless functionality."
  },
  {
    title: "MOTION DESIGN",
    description: "Dynamic animations and motion graphics that bring your brand to life. From micro-interactions to full video production."
  },
];

export const CappenServices = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="min-h-screen flex items-center justify-center py-32 px-6">
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative border border-border cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <motion.div
                className="absolute inset-0 bg-primary origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: expandedIndex === index ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />
              
              <div className="relative z-10 p-12">
                <div className="flex justify-between items-start">
                  <h3 className={`text-4xl md:text-4xl font-light transition-colors duration-300 ${
                    expandedIndex === index ? "text-background" : "text-foreground group-hover:text-primary"
                  }`}>
                    <InteractiveText text={service.title} />
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={expandedIndex === index ? "text-background" : "text-foreground"}
                  >
                    <ChevronDown className="w-6 h-6" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        exit={{ y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="text-lg font-light leading-relaxed mt-6 text-background"
                      >
                        {service.description}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
