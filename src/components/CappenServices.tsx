import { motion, AnimatePresence } from "framer-motion";
import { InteractiveText } from "./InteractiveText";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const services = [
  {
    title: "MARKETING AUDIT",
    description:
      "A deep diagnostic of your entire marketing ecosystem — campaigns, audiences, tracking, funnel, website, and messaging. You receive a clear roadmap to eliminate wasted spend and unlock faster growth.",
  },
  {
    title: "PERFORMANCE STRATEGY",
    description:
      "We build data-driven advertising strategies designed to reduce costs, increase conversions, and create predictable growth. Every strategy is tailored to your niche, audience, and business goals.",
  },
  {
    title: "CAMPAIGN MANAGEMENT",
    description:
      "End-to-end management of Meta, TikTok, and Google Ads. We handle setup, testing, optimization, and scaling — ensuring your budget works at maximum efficiency.",
  },
  {
    title: "FUNNEL & USER JOURNEY ANALYSIS",
    description:
      "We analyze how users move through your funnel, identify drop-off points, fix inefficiencies, and improve the path from click to sale. Better flow means higher profitability.",
  },
  {
    title: "CREATIVE PERFORMANCE",
    description:
      "We create, test, and refine high-performing ad creatives that drive real business results. Every concept is built around data, psychology, and continuous A/B testing.",
  },
  {
    title: "TRACKING & DATA SETUP",
    description:
      "We ensure your analytics, pixels, events, and conversions are configured correctly — giving you clean, reliable data to scale with confidence.",
  },
];

export const CappenServices = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="min-h-screen flex items-center justify-center py-24 px-4 sm:px-6">
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() =>
                setExpandedIndex(expandedIndex === index ? null : index)
              }
            >
              {/* background animation */}
              <motion.div
                className="absolute inset-0 bg-primary origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: expandedIndex === index ? 1 : 0 }}
                transition={{ duration: 0.35 }}
              />

              <div className="relative z-10 p-6 sm:p-8 md:p-12">
                <div className="flex justify-between items-start gap-4">
                  <h3
                    className={`
                      text-lg sm:text-xl md:text-3xl
                      font-light leading-snug
                      transition-colors duration-300
                      text-balance
                      ${
                        expandedIndex === index
                          ? "text-background"
                          : "text-foreground group-hover:text-primary"
                      }
                    `}
                  >
                    <InteractiveText text={service.title} />
                  </h3>

                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={
                      expandedIndex === index
                        ? "text-background"
                        : "text-foreground"
                    }
                  >
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <motion.p
                        initial={{ y: 16 }}
                        animate={{ y: 0 }}
                        exit={{ y: 16 }}
                        transition={{ duration: 0.25 }}
                        className="mt-6 text-base sm:text-lg font-light leading-relaxed text-background"
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