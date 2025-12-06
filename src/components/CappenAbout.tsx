import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { useRef } from "react";
import bgVideo from "@/assets/video.mp4";

export const CappenAbout = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [4, 0, 0, 4]);
  const rotateX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [10, 0, 0, -10]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <motion.div
        style={{
          y,
          scale,
          opacity,
          filter,
          rotateX,
          transformPerspective: 1200,
        }}
        className="relative z-10 max-w-6xl mx-auto text-center px-6"
      >
        <motion.h2
          className="text-[8vw] leading-[1.1] font-light mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
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
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          We are a visionary independent digital product studio working at the
          intersection of strategy, design, and technology. We lead organizations
          into their digital future.
        </motion.p>
      </motion.div>
    </section>
  );
};