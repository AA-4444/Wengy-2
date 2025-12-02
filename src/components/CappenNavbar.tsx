import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { InteractiveText } from "./InteractiveText";

export const CappenNavbar = () => {
  const [scrollCount, setScrollCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      setScrollCount(scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">

      <motion.nav
        className="
          pointer-events-auto
          px-8 py-6
          flex justify-between items-center
          bg-transparent
          pt-[calc(env(safe-area-inset-top)+1rem)]
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* LEFT */}
        <motion.div
          className="text-xl font-light tracking-wider"
          whileHover={{ scale: 1.05 }}
        >
          <InteractiveText text="WENGY" />
        </motion.div>

        {/* CENTER SCROLL процент */}
        <div className="text-6xl font-light tabular-nums">
          {scrollCount.toString().padStart(2, "0")}
        </div>

        {/* RIGHT — CONTACT */}
        <motion.a
          href="#contact"
          className="text-xl font-light tracking-wider hover:text-primary transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          <InteractiveText text="CONTACT" />
        </motion.a>
      </motion.nav>
    </div>
  );
};