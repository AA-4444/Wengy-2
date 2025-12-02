// src/components/Loading.tsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
	const interval = setInterval(() => {
	  setProgress((prev) => {
		if (prev >= 100) {
		  clearInterval(interval);
		  return 100;
		}
		return prev + 1;
	  });
	}, 20);

	return () => clearInterval(interval);
  }, []);

  return (
	<motion.div
	  className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50"
	  initial={{ opacity: 0 }}
	  animate={{ opacity: 1 }}
	  exit={{ opacity: 0 }}
	  transition={{ duration: 0.5 }}
	>
	  {/* TEXT LOADING */}
	  <motion.div
		className="mb-16"
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.8, delay: 0.2 }}
	  >
		<h1 className="text-[8vw] md:text-[6vw] font-light tracking-wider">
		  {["L", "O", "A", "D", "I", "N", "G"].map((letter, index) => (
			<motion.span
			  key={index}
			  className="inline-block"
			  initial={{ opacity: 0, y: 50 }}
			  animate={{ opacity: 1, y: 0 }}
			  transition={{
				duration: 0.5,
				delay: 0.4 + index * 0.1,
				ease: [0.22, 1, 0.36, 1],
			  }}
			>
			  {letter}
			</motion.span>
		  ))}
		</h1>
	  </motion.div>

	  {/* PROGRESS BAR */}
	  <motion.div
		className="w-64 md:w-96 h-[1px] bg-border relative overflow-hidden"
		initial={{ scaleX: 0 }}
		animate={{ scaleX: 1 }}
		transition={{ duration: 0.8, delay: 0.6 }}
	  >
		<motion.div
		  className="absolute inset-0 bg-primary origin-left"
		  style={{ scaleX: progress / 100 }}
		  transition={{ duration: 0.1 }}
		/>
	  </motion.div>

	  {/* PERCENT */}
	  <motion.div
		className="mt-8 text-2xl md:text-3xl font-light tabular-nums"
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.5, delay: 1 }}
	  >
		{progress.toString().padStart(2, "0")}%
	  </motion.div>

	  {/* DOTS */}
	  <motion.div
		className="absolute bottom-20 flex gap-3"
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 0.5, delay: 1.2 }}
	  >
		{[0, 1, 2].map((i) => (
		  <motion.div
			key={i}
			className="w-2 h-2 rounded-full bg-foreground"
			animate={{
			  scale: [1, 1.5, 1],
			  opacity: [0.3, 1, 0.3],
			}}
			transition={{
			  duration: 1.5,
			  repeat: Infinity,
			  delay: i * 0.2,
			  ease: "easeInOut",
			}}
		  />
		))}
	  </motion.div>
	</motion.div>
  );
};