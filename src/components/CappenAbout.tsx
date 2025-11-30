import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const CappenAbout = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center py-32 px-6">
      <motion.div
        style={{ scale, opacity }}
        className="max-w-6xl mx-auto text-center"
      >
        <motion.h2
          className="text-[8vw] leading-[1.1] font-light mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          IT'S ALL ABOUT
          <br />
          MAKING THINGS
          <br />
          <span className="text-primary">HAPPEN.</span>
        </motion.h2>

        <motion.p
          className="text-2xl md:text-3xl font-light leading-relaxed max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          We are a visionary independent digital product studio working at the
          intersection of strategy, design, and technology. We lead organizations
          into their digital future.
        </motion.p>
      </motion.div>
    </section>
  );
};
