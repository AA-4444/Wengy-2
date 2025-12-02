import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";


const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768); // < md
      }
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
};

type AnimatedLetterProps = {
  letter: string;
  delay: number;
  isMobile: boolean;
};

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({
  letter,
  delay,
  isMobile,
}) => {
 
  if (!isMobile) {
    return (
      <motion.span
        className="inline-block"
        initial={{ y: "100%", rotateX: -90, opacity: 0 }}
        animate={{ y: 0, rotateX: 0, opacity: 1 }}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{
          y: -10,
          color: "hsl(var(--primary))",
          transition: { duration: 0.3 },
        }}
      >
        {letter}
      </motion.span>
    );
  }

  
  const controls = useAnimation();

  useEffect(() => {
    const introDuration = 0.8;

   
    controls.start({
      y: 0,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: introDuration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    });

    
    const totalDelayMs = (delay + introDuration) * 1000;

    const timer = setTimeout(() => {
      controls.start({
        y: [0, -6, 0],
        color: ["#ffffff", "hsl(var(--primary))", "#ffffff"],
        rotateX: 0,
        opacity: 1,
        transition: {
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      });
    }, totalDelayMs);

    return () => clearTimeout(timer);
  }, [controls, delay]);

  return (
    <motion.span
      className="inline-block"
      initial={{ y: "110%", rotateX: -90, opacity: 0 }}
      animate={controls}
    >
      {letter}
    </motion.span>
  );
};

const AnimatedWord = ({
  word,
  delay,
  isMobile,
}: {
  word: string;
  delay: number;
  isMobile: boolean;
}) => {
  const letters = word.split("");

  return (
    <span className="inline-block overflow-hidden">
      {letters.map((letter, index) => (
        <AnimatedLetter
          key={index}
          letter={letter === " " ? "\u00A0" : letter}
          delay={delay + index * 0.12} 
          isMobile={isMobile}
        />
      ))}
    </span>
  );
};

export const CappenHero: React.FC = () => {
  const isMobile = useIsMobile();

  const title = [
    "AN",
    "INDEPENDENT",
    "CREATIVE",
    "STUDIO",
    "SPECIALIZED",
    "IN",
    "DIGITAL",
    "EXPERIENCES.",
  ];

  return (
    <section
      className="
        min-h-screen
        flex flex-col
        justify-start md:justify-center
        items-center
        relative overflow-hidden
        pt-28 md:pt-20
      "
    >
      {/* Marquee */}
      <div className="w-full overflow-hidden mb-12">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
        >
          {[0, 1].map((loop) => (
            <div key={loop} className="flex">
              {[...Array(10)].map((_, i) => (
                <span key={`${loop}-${i}`} className="text-xl font-light mx-4">
                  START A PROJECT:
                </span>
              ))}
            </div>
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
        
        <h1 className="text-[10vw] sm:text-[12vw] leading-[0.9] font-light mb-8">
          {title.map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              {line.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-[0.2em]">
                  <AnimatedWord
                    word={word}
                    delay={0.7 + lineIndex * 0.3 + wordIndex * 0.1}
                    isMobile={isMobile}
                  />
                </span>
              ))}
            </span>
          ))}
        </h1>
      </motion.div>

      {/* Bottom email */}
      <motion.a
        href="mailto:contact@wengy.co"
        className="
          text-sm sm:text-base md:text-xl
          font-light
          hover:underline underline-offset-4

          absolute bottom-20 left-1/2 -translate-x-1/2
          md:static md:mt-12 md:translate-x-0 md:left-auto
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        wengy.agency@gmail.com
      </motion.a>
    </section>
  );
};