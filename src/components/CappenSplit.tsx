import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const CappenSplit = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0, 1], [-200, 100]);
  const rightX = useTransform(scrollYProgress, [0, 1], [200, -100]);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center overflow-hidden py-32">
      <div className="w-full max-w-[90vw] mx-auto">
        {/* First row */}
        <div className="flex justify-between items-center mb-8">
          <motion.h2
            style={{ x: leftX }}
            className="text-[15vw] leading-none font-light"
          >
            HUMAN
          </motion.h2>
          <motion.h2
            style={{ x: rightX }}
            className="text-[15vw] leading-none font-light text-primary"
          >
            DIGITAL
          </motion.h2>
        </div>

        {/* Second row */}
        <div className="flex justify-between items-center">
          <motion.h2
            style={{ x: rightX }}
            className="text-[15vw] leading-none font-light text-primary"
          >
            THINKERS
          </motion.h2>
          <motion.h2
            style={{ x: leftX }}
            className="text-[15vw] leading-none font-light"
          >
            MAKERS
          </motion.h2>
        </div>
      </div>
    </section>
  );
};
