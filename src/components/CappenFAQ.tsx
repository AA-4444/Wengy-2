import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We offer comprehensive digital services including brand strategy, digital product design and development, user experience design, creative direction, web and mobile development, and motion design. Each service is tailored to meet your specific business needs."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on scope and complexity. A brand identity project typically takes 6-8 weeks, while a full digital product can take 3-6 months. We'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "What is your design process?",
    answer: "Our process begins with discovery and research, followed by strategy development, design exploration, iterative refinement, and final delivery. We maintain close collaboration with clients throughout, ensuring alignment with your vision and goals."
  },
  {
    question: "Do you work with startups or only established companies?",
    answer: "We work with businesses of all sizes, from ambitious startups to established enterprises. Our flexible approach allows us to scale our services to match your budget and timeline while maintaining our high standards."
  },
  {
    question: "What makes your agency different?",
    answer: "We combine strategic thinking with exceptional craft. Our team brings together diverse expertise in design, technology, and business strategy. We focus on creating work that not only looks beautiful but drives measurable results."
  },
  {
    question: "How do you handle project communication?",
    answer: "We believe in transparent, regular communication. You'll have a dedicated project lead, weekly check-ins, and access to a shared project workspace. We adapt our communication style to match your preferences and availability."
  }
];

export const CappenFAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-[6vw] font-light mb-4">
            FREQUENTLY ASKED
          </h2>
          <p className="text-xl text-muted-foreground font-light">
            Everything you need to know
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border-b border-border last:border-0"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full py-8 flex justify-between items-center text-left group hover:text-primary transition-colors duration-300"
              >
                <h3 className="text-2xl md:text-3xl font-light pr-8">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  {expandedIndex === index ? (
                    <Minus className="w-6 h-6" />
                  ) : (
                    <Plus className="w-6 h-6" />
                  )}
                </motion.div>
              </button>

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
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      exit={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-lg font-light leading-relaxed pb-8 text-muted-foreground"
                    >
                      {faq.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
