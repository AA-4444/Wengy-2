import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "We focus exclusively on Performance Marketing and Marketing Audits. Performance Marketing includes managing and optimizing campaigns on Meta, TikTok, and Google with a strict goal of measurable growth. Marketing Audits provide a deep analysis of your current marketing setup and a clear roadmap for scalable improvements.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Performance Marketing runs on monthly cycles with continuous optimization. First measurable improvements usually appear within 1–3 weeks. Marketing Audits are delivered within 3–5 business days, including a full breakdown and growth plan.",
  },
  {
    question: "What is your process?",
    answer:
      "Audit: 1) Data collection, 2) Deep analysis of campaigns, creatives, audiences, funnel, and tracking, 3) Identifying wasted budget and missed opportunities, 4) Delivery of a step-by-step improvement plan. Performance Marketing: 1) Strategy and funnel mapping, 2) Creative testing & production guidance, 3) Campaign launch, 4) Continuous optimization & scaling, 5) Weekly reporting and KPI tracking.",
  },
  {
    question: "Do you work with startups or only established companies?",
    answer:
      "We work with both. Startups benefit from our structured launch systems, while established businesses rely on us to reduce CPL/CPA, fix inefficiencies, and scale results. Our systems adapt to any stage of growth.",
  },
  {
    question: "What makes your agency different?",
    answer:
      "We specialize instead of offering dozens of services. We focus solely on performance marketing — data, testing, optimization, and results. No guesswork, no fluff. Clients stay because we are transparent, fast, ROI-driven, and numbers-focused.",
  },
  {
    question: "How do you handle project communication?",
    answer:
      "You get a dedicated manager, weekly KPI-focused performance updates, fast communication via WhatsApp/Telegram, and monthly calls to analyze results and plan next steps. You always know what is happening and why.",
  },
];

export const CappenFAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

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
          <h2 className="text-[6vw] font-light mb-4">FREQUENTLY ASKED</h2>
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
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
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
