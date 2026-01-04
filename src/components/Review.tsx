import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

const testimonials = [
  {
	id: 1,
	name: "ALEXEY RUDENKO",
	role: "CO-FOUNDER, PRIME BUILD",
	quote:
	  "What impressed me is transparency — weekly reports, metrics, and no unrealistic promises. Just data, work and growth. We’re already scaling campaigns together.",
	project: "META ADS",
  },
  {
	id: 2,
	name: "DMITRY SAVCHENKO",
	role: "CO-FOUNDER, TECHNOVA",
	quote:
	  "Our ads were chaotic before. Wengy stepped in, organized accounts, launched new strategies and finally our traffic became profitable. Easy communication, quick responses and clear strategy behind every step.",
	project: "GOOGLE ADS",
  },
  {
	id: 3,
	name: "GEORGI MAMULASHVILI",
	role: "FOUNDER, HOME STYLE GEORGIA",
	quote:
	  "Wengy took over our Meta campaigns and things finally started to move. Clear structure, constant communication, and stable lead flow — exactly what we were looking for.",
	project: "META ADS",
  },
  {
	id: 4,
	name: "NATALI GVINIASVILI",
	role: "OWNER, BEAUTY CORNER",
	quote:
	  "We came for TikTok Ads to scale faster and cheaper. The team nailed the creative direction from the first batch — views came instantly and leads followed. Easy to work with, fast and proactive.",
	project: "TIKTOK ADS",
  },
];

export const CappenTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
	setDirection(1);
	setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
	setDirection(-1);
	setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
	enter: (direction: number) => ({
	  x: direction > 0 ? 100 : -100,
	  opacity: 0,
	}),
	center: {
	  x: 0,
	  opacity: 1,
	},
	exit: (direction: number) => ({
	  x: direction < 0 ? 100 : -100,
	  opacity: 0,
	}),
  };

  const current = testimonials[currentIndex];

  return (
	<section className="min-h-screen flex items-center justify-center py-32 px-6 relative overflow-hidden">
	  <div className="w-full max-w-6xl mx-auto relative z-10">
		<motion.div
		  className="mb-16"
		  initial={{ opacity: 0, y: 30 }}
		  whileInView={{ opacity: 1, y: 0 }}
		  viewport={{ once: true }}
		  transition={{ duration: 0.8 }}
		>
		  <span className="text-sm tracking-[0.3em] text-muted-foreground">
			Review
		  </span>
		  <h2 className="text-4xl md:text-6xl lg:text-7xl font-light mt-4">
			WHAT CLIENTS SAY
		  </h2>
		</motion.div>

		<div className="relative min-h-[400px]">
		  <AnimatePresence mode="wait" custom={direction}>
			<motion.div
			  key={current.id}
			  custom={direction}
			  variants={variants}
			  initial="enter"
			  animate="center"
			  exit="exit"
			  transition={{
				x: { type: "spring", stiffness: 300, damping: 30 },
				opacity: { duration: 0.3 },
			  }}
			  className="absolute inset-0"
			>
			  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
				<div className="lg:col-span-2">
				  <motion.div
					initial={{ scale: 0, rotate: -180 }}
					animate={{ scale: 1, rotate: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
				  >
					<Quote className="w-12 h-12 text-primary" />
				  </motion.div>
				</div>

				<div className="lg:col-span-7">
				  <motion.p
					className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
				  >
					"{current.quote}"
				  </motion.p>
				</div>

				<div className="lg:col-span-3">
				  <motion.div
					className="border-l border-border pl-6"
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6, delay: 0.4 }}
				  >
					<p className="text-xl font-light mb-2">{current.name}</p>
					<p className="text-sm text-muted-foreground mb-4">{current.role}</p>
					<span className="inline-block px-3 py-1 border border-border text-xs tracking-widest">
					  {current.project}
					</span>
				  </motion.div>
				</div>
			  </div>
			</motion.div>
		  </AnimatePresence>
		</div>

		<motion.div
		  className="flex items-center justify-between mt-10"
		  initial={{ opacity: 0 }}
		  whileInView={{ opacity: 1 }}
		  viewport={{ once: true }}
		  transition={{ duration: 0.8, delay: 0.3 }}
		>
		  <div className="flex items-baseline gap-3">
			<span className="text-4xl font-light">
			  {String(currentIndex + 1).padStart(2, "0")}
			</span>
			<span className="text-sm text-muted-foreground">
			  / {String(testimonials.length).padStart(2, "0")}
			</span>
		  </div>

		  <div className="flex gap-4">
			<motion.button
			  onClick={prev}
			  className="w-12 h-12 rounded-full border border-border flex items-center justify-center group transition-colors hover:bg-primary hover:border-primary"
			  whileHover={{ scale: 1.05 }}
			  whileTap={{ scale: 0.95 }}
			>
			  <ArrowLeft className="w-5 h-5 transition-colors group-hover:text-background" />
			</motion.button>
			<motion.button
			  onClick={next}
			  className="w-12 h-12 rounded-full border border-border flex items-center justify-center group transition-colors hover:bg-primary hover:border-primary"
			  whileHover={{ scale: 1.05 }}
			  whileTap={{ scale: 0.95 }}
			>
			  <ArrowRight className="w-5 h-5 transition-colors group-hover:text-background" />
			</motion.button>
		  </div>
		</motion.div>

		<div className="flex justify-center gap-3 mt-10">
		  {testimonials.map((_, index) => (
			<motion.button
			  key={index}
			  onClick={() => {
				setDirection(index > currentIndex ? 1 : -1);
				setCurrentIndex(index);
			  }}
			  className={`w-2 h-2 rounded-full transition-all duration-300 ${
				index === currentIndex
				  ? "bg-primary w-8"
				  : "bg-border hover:bg-muted-foreground"
			  }`}
			  whileHover={{ scale: 1.2 }}
			  whileTap={{ scale: 0.9 }}
			/>
		  ))}
		</div>
	  </div>
	</section>
  );
};