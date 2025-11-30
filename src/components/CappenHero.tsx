import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const AnimatedWord = ({ word, delay }: { word: string; delay: number }) => {
  const letters = word.split("");
  
  return (
    <span className="inline-block overflow-hidden">
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: "100%", rotateX: -90, opacity: 0 }}
          animate={{ y: 0, rotateX: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: delay + index * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{
            y: -10,
            color: "hsl(var(--primary))",
            transition: { duration: 0.3 }
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
};

export const CappenHero = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const title = [
    "AN INDEPENDENT",
    "CREATIVE STUDIO",
    "SPECIALIZED IN",
    "DIGITAL EXPERIENCES."
  ];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden pt-20">
      {/* Repeating marquee text */}
      <div className="w-full overflow-hidden mb-12">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-xl font-light mx-4">
              START A PROJECT:
            </span>
          ))}
        </motion.div>
      </div>

      {/* Main hero text */}
      <motion.div
        className="text-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <h1 className="text-[12vw] leading-[0.9] font-light mb-8">
          {title.map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              {line.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-[0.2em]">
                  <AnimatedWord 
                    word={word} 
                    delay={0.7 + lineIndex * 0.3 + wordIndex * 0.1} 
                  />
                </span>
              ))}
              {lineIndex < title.length - 1 && <br />}
            </span>
          ))}
        </h1>
      </motion.div>

      {/* Bottom email */}
      <motion.div
        className="absolute bottom-12 text-xl font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        contact@wengy.co
      </motion.div>
    </section>
  );
};
